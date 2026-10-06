// Food Recommendation Agent Engine ("Chef Remy AI")
// Matches pantry ingredients with recipes, finds substitutions, analyzes cooking history, and provides advice.

class FoodRecommendationAgent {
  constructor(recipes, commonStaples) {
    this.recipes = recipes;
    this.commonStaples = new Set(commonStaples.map(s => s.toLowerCase()));
  }

  setRecipes(newRecipes) {
    this.recipes = newRecipes;
  }

  /**
   * Evaluate a recipe against selected ingredients
   */
  evaluateRecipe(recipe, userPantry, assumeStaples = true) {
    const requiredItems = recipe.ingredients.filter(ing => ing.required);
    const optionalItems = recipe.ingredients.filter(ing => !ing.required);

    let requiredMatched = 0;
    let missingRequired = [];
    let missingOptional = [];

    requiredItems.forEach(ing => {
      const name = ing.name.toLowerCase();
      const isStaple = ing.staple || this.commonStaples.has(name);
      const isAvailable = userPantry.has(name) || (assumeStaples && isStaple);

      if (isAvailable) {
        requiredMatched++;
      } else {
        missingRequired.push({
          name: ing.name,
          amount: ing.amount,
          substitute: recipe.substitutions ? recipe.substitutions[ing.name] : null
        });
      }
    });

    optionalItems.forEach(ing => {
      const name = ing.name.toLowerCase();
      const isStaple = ing.staple || this.commonStaples.has(name);
      const isAvailable = userPantry.has(name) || (assumeStaples && isStaple);

      if (!isAvailable) {
        missingOptional.push({
          name: ing.name,
          amount: ing.amount,
          substitute: recipe.substitutions ? recipe.substitutions[ing.name] : null
        });
      }
    });

    const totalRequired = requiredItems.length;
    const matchPercentage = totalRequired > 0 
      ? Math.round((requiredMatched / totalRequired) * 100) 
      : 100;

    const isReady = missingRequired.length === 0;
    const isAlmostReady = missingRequired.length === 1;

    return {
      recipe,
      matchPercentage,
      isReady,
      isAlmostReady,
      missingRequired,
      missingOptional,
      totalRequired,
      requiredMatched
    };
  }

  /**
   * Recommend recipes ranked by match quality, readiness, cuisine, and optional dietary/time filters
   */
  getRecommendations(userIngredients = [], filters = {}) {
    const pantrySet = new Set(userIngredients.map(i => i.toLowerCase().trim()));
    const assumeStaples = filters.assumeStaples !== false;

    let evaluated = this.recipes.map(recipe => 
      this.evaluateRecipe(recipe, pantrySet, assumeStaples)
    );

    // Filter by Cuisine Category if specified
    if (filters.cuisine && filters.cuisine !== "All") {
      evaluated = evaluated.filter(item => 
        item.recipe.cuisine && item.recipe.cuisine.toLowerCase() === filters.cuisine.toLowerCase()
      );
    }

    // Filter by Meal Category if specified
    if (filters.category && filters.category !== "All") {
      evaluated = evaluated.filter(item => item.recipe.category.toLowerCase() === filters.category.toLowerCase());
    }

    // Filter by Max Time
    if (filters.maxTime && filters.maxTime !== "All") {
      const maxMinutes = parseInt(filters.maxTime, 10);
      evaluated = evaluated.filter(item => (item.recipe.prepTime + item.recipe.cookTime) <= maxMinutes);
    }

    // Filter by Dietary tag
    if (filters.dietary && filters.dietary !== "All") {
      evaluated = evaluated.filter(item => 
        item.recipe.tags.some(tag => tag.toLowerCase().includes(filters.dietary.toLowerCase()))
      );
    }

    // Search query filter
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      evaluated = evaluated.filter(item => 
        item.recipe.title.toLowerCase().includes(q) ||
        item.recipe.description.toLowerCase().includes(q) ||
        (item.recipe.cuisine && item.recipe.cuisine.toLowerCase().includes(q)) ||
        (item.recipe.category && item.recipe.category.toLowerCase().includes(q)) ||
        item.recipe.ingredients.some(ing => ing.name.toLowerCase().includes(q))
      );
    }

    // Sort: 100% ready first, then by matchPercentage descending, then lowest missing count
    evaluated.sort((a, b) => {
      if (a.isReady && !b.isReady) return -1;
      if (!a.isReady && b.isReady) return 1;
      if (b.matchPercentage !== a.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }
      return a.missingRequired.length - b.missingRequired.length;
    });

    return evaluated;
  }

  /**
   * History-Aware Recommendation Engine:
   * Recommends dishes based on what user cooked in recent days (cuisine balancing, variety, favorite re-cooks)
   */
  getHistoryRecommendations(cookingHistory = [], userIngredients = [], assumeStaples = true) {
    if (!cookingHistory || cookingHistory.length === 0) {
      return null;
    }

    const pantrySet = new Set(userIngredients.map(i => i.toLowerCase().trim()));
    const lastCooked = cookingHistory[0]; // most recent
    const lastCuisine = (lastCooked.cuisine || "").toLowerCase();

    // Tally frequency of cuisines cooked
    const cuisineCounts = {};
    const recipeCookCounts = {};
    cookingHistory.forEach(entry => {
      const c = (entry.cuisine || "Other").toLowerCase();
      cuisineCounts[c] = (cuisineCounts[c] || 0) + 1;
      recipeCookCounts[entry.recipeId] = (recipeCookCounts[entry.recipeId] || 0) + 1;
    });

    // 1. Determine contrasting or complementary cuisine
    let targetCuisine = "";
    let varietyAdvice = "";

    if (lastCuisine.includes("italian")) {
      targetCuisine = "Indian";
      varietyAdvice = "Since you had hearty Italian recently, switch gears with a comforting, spiced Indian meal!";
    } else if (lastCuisine.includes("indian")) {
      targetCuisine = "Chinese";
      varietyAdvice = "You cooked delicious Indian food recently! How about a light, sizzling Chinese street noodle or stir-fry today?";
    } else if (lastCuisine.includes("chinese")) {
      targetCuisine = "Italian";
      varietyAdvice = "You enjoyed Chinese cuisine last time. A golden Italian pasta or toasted garlic bread would provide wonderful variety!";
    } else {
      // Default to Indian or Chinese if last was Continental/Mexican
      targetCuisine = "Indian";
      varietyAdvice = "Spice up your day with an authentic homestyle Indian curry or dal!";
    }

    // Filter candidate recipes matching target cuisine or complementary dishes
    let candidateRecs = this.recipes
      .filter(r => r.id !== lastCooked.recipeId)
      .map(r => this.evaluateRecipe(r, pantrySet, assumeStaples));

    // Sort candidates: prioritizing target cuisine, then pantry match
    candidateRecs.sort((a, b) => {
      const aIsTarget = (a.recipe.cuisine || "").toLowerCase() === targetCuisine.toLowerCase();
      const bIsTarget = (b.recipe.cuisine || "").toLowerCase() === targetCuisine.toLowerCase();
      if (aIsTarget && !bIsTarget) return -1;
      if (!aIsTarget && bIsTarget) return 1;
      if (a.isReady && !b.isReady) return -1;
      if (!a.isReady && b.isReady) return 1;
      return b.matchPercentage - a.matchPercentage;
    });

    const topPicks = candidateRecs.slice(0, 3);

    // Format human-friendly time since last cooked
    let timeAgoText = "recently";
    if (lastCooked.cookedAt) {
      const diffHours = (Date.now() - new Date(lastCooked.cookedAt).getTime()) / (1000 * 60 * 60);
      if (diffHours < 24) timeAgoText = "earlier today";
      else if (diffHours < 48) timeAgoText = "yesterday";
      else timeAgoText = `${Math.floor(diffHours / 24)} days ago`;
    }

    return {
      lastCookedTitle: lastCooked.recipeTitle,
      lastCookedCuisine: lastCooked.cuisine,
      timeAgoText,
      targetCuisine,
      headline: `Because you cooked ${lastCooked.recipeTitle} (${lastCooked.cuisine}) ${timeAgoText}:`,
      rationale: varietyAdvice,
      topPicks
    };
  }

  /**
   * Generate conversational insight commentary from Chef Remy
   */
  generateAgentNarrative(userIngredients, recommendations, cookingHistory = []) {
    if (userIngredients.length === 0) {
      return {
        greeting: "👋 Welcome to your AI Kitchen Assistant!",
        headline: "Pick the ingredients in your kitchen to get started.",
        advice: "Tap any ingredients from the pantry board or search above. I will automatically calculate what you can cook right now with zero food waste!"
      };
    }

    const readyDishes = recommendations.filter(r => r.isReady);
    const almostDishes = recommendations.filter(r => r.isAlmostReady);
    const ingList = userIngredients.slice(0, 4).join(", ") + (userIngredients.length > 4 ? ` and ${userIngredients.length - 4} more` : "");

    // Include cooking history context if available
    let historyContext = "";
    if (cookingHistory && cookingHistory.length > 0) {
      const last = cookingHistory[0];
      historyContext = ` (Last cooked: ${last.recipeTitle})`;
    }

    if (readyDishes.length > 0) {
      const topDish = readyDishes[0].recipe;
      const totalTime = topDish.prepTime + topDish.cookTime;
      return {
        greeting: `👨‍🍳 Great pantry! With ${ingList}${historyContext}:`,
        headline: `You can cook ${readyDishes.length} recipe${readyDishes.length > 1 ? "s" : ""} immediately!`,
        advice: `Top pick: **${topDish.title}** (${topDish.cuisine}) ready in just ${totalTime} minutes. All key ingredients are on hand!`,
        recommendedId: topDish.id
      };
    } else if (almostDishes.length > 0) {
      const topAlmost = almostDishes[0];
      const missingName = topAlmost.missingRequired[0].name;
      const sub = topAlmost.missingRequired[0].substitute;
      return {
        greeting: `💡 Almost there! With ${ingList}:`,
        headline: `You're just 1 ingredient away from ${almostDishes.length} classic dishes!`,
        advice: `For **${topAlmost.recipe.title}** (${topAlmost.recipe.cuisine}), you only need **${missingName}**${sub ? ` (or swap with: *${sub}*)` : ""}.`,
        recommendedId: topAlmost.recipe.id
      };
    } else {
      return {
        greeting: "🛒 Let's expand your pantry a bit!",
        headline: "No complete matches found with the current combination.",
        advice: "Try adding a primary base like eggs, pasta, bread, or rice, and common veggies like onion or tomato!"
      };
    }
  }

  /**
   * Handle user conversational queries in the interactive Chef Chat
   */
  chatWithChef(query, userIngredients, cookingHistory = []) {
    const q = query.toLowerCase();
    const pantrySet = new Set(userIngredients.map(i => i.toLowerCase().trim()));

    // History query
    if (q.includes("history") || q.includes("yesterday") || q.includes("cooked before") || q.includes("last cook") || q.includes("previous")) {
      if (cookingHistory && cookingHistory.length > 0) {
        const recent = cookingHistory.slice(0, 4).map(h => {
          const dateStr = h.cookedAt ? new Date(h.cookedAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : "Recently";
          return `• **${h.recipeTitle}** (${h.cuisine}) — *${dateStr}*`;
        }).join("\n");
        return `📜 **Your Recent Cooking History:**\n\n${recent}\n\nBased on your history, I recommend trying a different cuisine today (e.g., if you had pasta, try a warm Indian Dal or Chinese fried rice)!`;
      } else {
        return "📜 You haven't logged any cooked meals yet! When you finish preparing a dish in Cooking Mode, tap **'I'm Done Cooking!'** to automatically save it to your history.";
      }
    }

    // Cuisine specific queries
    if (q.includes("indian")) {
      const indianDishes = this.recipes.filter(r => (r.cuisine || "").toLowerCase() === "indian");
      const readyIndian = indianDishes.filter(r => this.evaluateRecipe(r, pantrySet).isReady);
      if (readyIndian.length > 0) {
        return `🇮🇳 **Indian Dishes Ready in Your Kitchen:**\n\n` + readyIndian.map(r => `• **${r.title}** (${r.prepTime + r.cookTime} mins)`).join("\n") + `\n\nUse the **Indian Food** filter on the home page to view full details!`;
      }
      return `🇮🇳 Our top basic Indian recipes include **Dal Tadka**, **Chana Masala**, **Jeera Rice**, and **Paneer Bhurji**. Add lentils, chickpeas, or onions to cook them right now!`;
    }

    if (q.includes("chinese")) {
      const chineseDishes = this.recipes.filter(r => (r.cuisine || "").toLowerCase() === "chinese");
      const readyChinese = chineseDishes.filter(r => this.evaluateRecipe(r, pantrySet).isReady);
      if (readyChinese.length > 0) {
        return `🇨🇳 **Chinese Cuisine Ready Now:**\n\n` + readyChinese.map(r => `• **${r.title}** (${r.prepTime + r.cookTime} mins)`).join("\n") + `\n\nClick the **Chinese Cuisine** tab to start cooking!`;
      }
      return `🇨🇳 Try our classic Chinese recipes: **Chili Garlic Noodles**, **Wok Egg Fried Rice**, **Veg Fried Rice**, and **Silky Egg Drop Soup**!`;
    }

    if (q.includes("italian")) {
      return `🇮🇹 Classic Italian comfort dishes: **Spaghetti Aglio e Olio**, **Marinara Tomato Basil Pasta**, and **Bakery Garlic Bread**!`;
    }

    // Quick meals query
    if (q.includes("quick") || q.includes("fast") || q.includes("15") || q.includes("10 min") || q.includes("under 15")) {
      const quickRecipes = this.recipes.filter(r => (r.prepTime + r.cookTime) <= 15);
      const readyQuick = quickRecipes.filter(r => {
        const evalRes = this.evaluateRecipe(r, pantrySet);
        return evalRes.isReady;
      });

      if (readyQuick.length > 0) {
        const names = readyQuick.map(r => `• **${r.title}** (${r.cuisine}, ${r.prepTime + r.cookTime} mins)`).join("\n");
        return `⚡ **Fast & Ready to Cook!** Based on your pantry, here are quick dishes ready in under 15 minutes:\n\n${names}\n\nClick any card on the home page to cook!`;
      } else {
        const topQuick = quickRecipes.slice(0, 3).map(r => `• **${r.title}** (${r.prepTime + r.cookTime} mins)`).join("\n");
        return `⚡ Here are the fastest everyday basic recipes:\n\n${topQuick}\n\nAdd ingredients like **eggs, bread, pasta, or potatoes** to unlock them!`;
      }
    }

    // High Protein query
    if (q.includes("protein") || q.includes("gym") || q.includes("fitness") || q.includes("muscle")) {
      const proteinDishes = this.recipes.filter(r => r.tags.some(t => t.toLowerCase().includes("protein")));
      const readyProtein = proteinDishes.filter(r => this.evaluateRecipe(r, pantrySet).isReady);

      if (readyProtein.length > 0) {
        const list = readyProtein.map(r => `• **${r.title}** (${r.protein} protein, ${r.calories} kcal)`).join("\n");
        return `💪 **High-Protein Options Ready Now:**\n\n${list}\n\nThese will give you sustained energy and clean macronutrients!`;
      } else {
        return `💪 For high protein, our top basic recipes are **Soft Scrambled Eggs (14g)**, **Dal Khichdi (14g)**, **Chana Masala (15g)**, and **Chicken Curry (34g)**. Add eggs, chicken, lentils, or paneer to your pantry board!`;
      }
    }

    // Substitution question
    if (q.includes("substitute") || q.includes("replace") || q.includes("instead of") || q.includes("don't have")) {
      for (const recipe of this.recipes) {
        if (recipe.substitutions) {
          for (const [ingredient, sub] of Object.entries(recipe.substitutions)) {
            if (q.includes(ingredient)) {
              return `🔄 **Pantry Hack for ${ingredient}:**\nYou can substitute **${ingredient}** with **${sub}**! It works wonderfully without compromising the flavor.`;
            }
          }
        }
      }
      return "🔄 Common pantry substitutions:\n• **Butter** ➔ Cooking oil, ghee, or mayo for sandwiches.\n• **Milk** ➔ Water + a dab of butter, yogurt, or plant milk.\n• **Eggs in baking** ➔ 1/4 cup yogurt or mashed banana.\n• **Chicken** ➔ Paneer, firm tofu, or hearty mushrooms.";
    }

    // Dessert / Sweet tooth
    if (q.includes("dessert") || q.includes("sweet") || q.includes("cake") || q.includes("pancake")) {
      return "🥞 Got a sweet craving? Try our **5-Minute Chocolate Mug Cake** (needs flour, sugar, milk, butter) or **Classic Fluffy Golden Pancakes** or **Cinnamon French Toast**! Check the Dessert & Breakfast filters above.";
    }

    // General recommendation
    const recommendations = this.getRecommendations(userIngredients);
    const ready = recommendations.filter(r => r.isReady);
    if (ready.length > 0) {
      const pick = ready[Math.floor(Math.random() * ready.length)].recipe;
      return `🎉 **Chef's Recommendation:**\nHow about making **${pick.title}**? It's a ${pick.cuisine} staple that takes only ${pick.prepTime + pick.cookTime} minutes, packed with flavor and uses ingredients you already have!`;
    } else {
      return `🍳 I reviewed your pantry! Currently you have: **${userIngredients.join(", ") || "no ingredients selected"}**.\n\nTry selecting staples like **eggs, bread, onions, garlic, and rice** to see 15+ delicious recipes unlock instantly!`;
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { FoodRecommendationAgent };
}
