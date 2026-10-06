// Main Application Logic & UI Controller
// Coordinates Pantry State, Recommendation Engine, Cooking History, Cuisine Filters, and Custom Recipes

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial State & Storage Sync
  const defaultPantry = ["eggs", "butter", "garlic", "bread", "salt", "black pepper", "soy sauce", "rice"];
  
  let storedPantry = null;
  try {
    const raw = localStorage.getItem("pantrychef_ingredients");
    if (raw) storedPantry = JSON.parse(raw);
  } catch (e) {
    console.warn("Storage load error", e);
  }
  const userPantry = new Set(storedPantry && storedPantry.length > 0 ? storedPantry : defaultPantry);

  // Favorites
  let favorites = new Set();
  try {
    const rawFav = localStorage.getItem("pantrychef_favorites");
    if (rawFav) favorites = new Set(JSON.parse(rawFav));
  } catch (e) {
    console.warn("Favs load error", e);
  }

  // Cooking History (Seed realistic initial entries if first time so user immediately sees feature)
  let cookingHistory = [];
  try {
    const rawHist = localStorage.getItem("pantrychef_cooking_history");
    if (rawHist) {
      cookingHistory = JSON.parse(rawHist);
    } else {
      // Seed default history: Yesterday cooked Italian pasta, 3 days ago cooked Scrambled Eggs
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
      cookingHistory = [
        {
          id: "hist-1",
          recipeId: "spaghetti-aglio-e-olio",
          recipeTitle: "Spaghetti Aglio e Olio",
          cuisine: "Italian",
          category: "Dinner",
          cookedAt: yesterday,
          image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80",
          calories: 420,
          protein: "11g"
        },
        {
          id: "hist-2",
          recipeId: "classic-scrambled-eggs",
          recipeTitle: "Soft & Creamy Scrambled Eggs",
          cuisine: "Continental",
          category: "Breakfast",
          cookedAt: threeDaysAgo,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
          calories: 220,
          protein: "14g"
        }
      ];
      localStorage.setItem("pantrychef_cooking_history", JSON.stringify(cookingHistory));
    }
  } catch (e) {
    console.warn("History load error", e);
  }

  // Active Filter state
  const filters = {
    cuisine: "All",
    category: "All",
    maxTime: "All",
    dietary: "All",
    searchQuery: "",
    assumeStaples: true,
    showFavoritesOnly: false
  };

  // Cooking Modal State
  let currentModalRecipe = null;
  let currentServings = 2;
  let timerInterval = null;
  let timerSeconds = 300;
  let timerIsRunning = false;

  // Initialize Agent with all standard + custom recipes
  const agent = new FoodRecommendationAgent(getAllRecipes(), COMMON_PANTRY_STAPLES);

  // DOM Elements - Left Pantry
  const pantryCategoriesContainer = document.getElementById("pantryCategoriesContainer");
  const activeTagsContainer = document.getElementById("activeTagsContainer");
  const activeTagsList = document.getElementById("activeTagsList");
  const selectedCountBadge = document.getElementById("selectedCountBadge");
  const customIngredientInput = document.getElementById("customIngredientInput");
  const addCustomIngredientBtn = document.getElementById("addCustomIngredientBtn");
  const clearPantryBtn = document.getElementById("clearPantryBtn");
  const staplesToggle = document.getElementById("staplesToggle");
  const quickStaplesPresetBtn = document.getElementById("quickStaplesPresetBtn");

  // DOM Elements - Main Feed & Toolbars
  const recipeGrid = document.getElementById("recipeGrid");
  const emptyState = document.getElementById("emptyState");
  const emptyStateDesc = document.getElementById("emptyStateDesc");
  const emptyStateAddRecipeBtn = document.getElementById("emptyStateAddRecipeBtn");
  const emptyStateAddBtnText = document.getElementById("emptyStateAddBtnText");
  const resultsCountText = document.getElementById("resultsCountText");
  const cuisineTabsContainer = document.getElementById("cuisineTabsContainer");
  const categoryTabsContainer = document.getElementById("categoryTabsContainer");
  const timeFilter = document.getElementById("timeFilter");
  const dietFilter = document.getElementById("dietFilter");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const favoritesToggleBtn = document.getElementById("favoritesToggleBtn");
  const favoritesCountBadge = document.getElementById("favoritesCountBadge");
  const surpriseBtn = document.getElementById("surpriseBtn");

  // History Banner & Header Elements
  const openHistoryBtn = document.getElementById("openHistoryBtn");
  const historyCountBadge = document.getElementById("historyCountBadge");
  const historySpotlightSection = document.getElementById("historySpotlightSection");
  const historyRationaleText = document.getElementById("historyRationaleText");
  const historyCardsGrid = document.getElementById("historyCardsGrid");
  const viewAllHistoryBtn = document.getElementById("viewAllHistoryBtn");

  // Add Recipe Modal Elements
  const openAddRecipeBtn = document.getElementById("openAddRecipeBtn");
  const addRecipeModal = document.getElementById("addRecipeModal");
  const closeAddRecipeBtn = document.getElementById("closeAddRecipeBtn");
  const cancelAddRecipeBtn = document.getElementById("cancelAddRecipeBtn");
  const addRecipeForm = document.getElementById("addRecipeForm");
  const formTitle = document.getElementById("formTitle");
  const formCuisine = document.getElementById("formCuisine");
  const formCategory = document.getElementById("formCategory");
  const formPrepTime = document.getElementById("formPrepTime");
  const formCookTime = document.getElementById("formCookTime");
  const formCalories = document.getElementById("formCalories");
  const formDesc = document.getElementById("formDesc");
  const formIngredientsRows = document.getElementById("formIngredientsRows");
  const formAddIngRowBtn = document.getElementById("formAddIngRowBtn");
  const formSteps = document.getElementById("formSteps");
  const formChefTip = document.getElementById("formChefTip");
  const formImage = document.getElementById("formImage");

  // Cooking History Modal Elements
  const historyModal = document.getElementById("historyModal");
  const closeHistoryBtn = document.getElementById("closeHistoryBtn");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const historyItemsList = document.getElementById("historyItemsList");
  const historySummaryText = document.getElementById("historySummaryText");

  // Agent Banner Elements
  const agentGreeting = document.getElementById("agentGreeting");
  const agentHeadline = document.getElementById("agentHeadline");
  const agentAdvice = document.getElementById("agentAdvice");
  const readyCounterBadge = document.getElementById("readyCounterBadge");
  const readyCounterText = document.getElementById("readyCounterText");

  // Cooking Modal Elements
  const cookingModal = document.getElementById("cookingModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalFavBtn = document.getElementById("modalFavBtn");
  const modalDoneBtn = document.getElementById("modalDoneBtn");
  const modalRecipeImage = document.getElementById("modalRecipeImage");
  const modalRecipeCategory = document.getElementById("modalRecipeCategory");
  const modalRecipeCuisine = document.getElementById("modalRecipeCuisine");
  const modalMatchBadge = document.getElementById("modalMatchBadge");
  const modalRecipeTitle = document.getElementById("modalRecipeTitle");
  const modalRecipeDesc = document.getElementById("modalRecipeDesc");
  const modalTotalTime = document.getElementById("modalTotalTime");
  const modalCalories = document.getElementById("modalCalories");
  const modalProtein = document.getElementById("modalProtein");
  const servingsCount = document.getElementById("servingsCount");
  const servingsMinusBtn = document.getElementById("servingsMinusBtn");
  const servingsPlusBtn = document.getElementById("servingsPlusBtn");
  const modalIngredientsList = document.getElementById("modalIngredientsList");
  const modalStepsList = document.getElementById("modalStepsList");
  const stepsProgressText = document.getElementById("stepsProgressText");
  const modalChefTip = document.getElementById("modalChefTip");
  const modalChefTipCard = document.getElementById("modalChefTipCard");
  const modalSubstitutionAlert = document.getElementById("modalSubstitutionAlert");
  const modalSubstitutionsList = document.getElementById("modalSubstitutionsList");

  // Timer Elements
  const timerDisplay = document.getElementById("timerDisplay");
  const timerStartBtn = document.getElementById("timerStartBtn");
  const timerResetBtn = document.getElementById("timerResetBtn");
  const timerPreset5 = document.getElementById("timerPreset5");
  const timerPreset10 = document.getElementById("timerPreset10");

  // Chat Elements
  const chatModal = document.getElementById("chatModal");
  const openChatBtn = document.getElementById("openChatBtn");
  const closeChatBtn = document.getElementById("closeChatBtn");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const chatQuickPrompts = document.querySelectorAll(".chat-quick-prompt");

  // --- PERSISTENCE HELPERS ---
  function savePantryState() {
    try {
      localStorage.setItem("pantrychef_ingredients", JSON.stringify(Array.from(userPantry)));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }

  function saveFavoritesState() {
    try {
      localStorage.setItem("pantrychef_favorites", JSON.stringify(Array.from(favorites)));
    } catch (e) {
      console.warn("Favs save error", e);
    }
    updateFavoritesBadge();
  }

  function saveHistoryState() {
    try {
      localStorage.setItem("pantrychef_cooking_history", JSON.stringify(cookingHistory));
    } catch (e) {
      console.warn("History save error", e);
    }
    updateHistoryBadge();
  }

  function updateFavoritesBadge() {
    if (favorites.size > 0) {
      favoritesCountBadge.textContent = favorites.size;
      favoritesCountBadge.classList.remove("hidden");
    } else {
      favoritesCountBadge.classList.add("hidden");
    }
  }

  function updateHistoryBadge() {
    historyCountBadge.textContent = cookingHistory.length;
  }

  // --- CUISINE TABS RENDERING ---
  function renderCuisineTabs() {
    cuisineTabsContainer.innerHTML = "";
    CUISINE_CATEGORIES.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      const isActive = filters.cuisine.toLowerCase() === cat.id.toLowerCase();
      btn.className = `cuisine-pill px-3 py-1 rounded-full font-medium transition flex items-center gap-1.5 ${
        isActive 
          ? "bg-slate-900 text-white shadow-sm" 
          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
      }`;
      btn.innerHTML = `<span>${cat.icon}</span> <span>${cat.label}</span>`;
      btn.addEventListener("click", () => {
        filters.cuisine = cat.id;
        renderCuisineTabs();
        updateAppView();
      });
      cuisineTabsContainer.appendChild(btn);
    });
  }

  // --- PANTRY RENDERING ---
  function renderPantryCategories() {
    pantryCategoriesContainer.innerHTML = "";

    Object.entries(INGREDIENT_CATEGORIES).forEach(([categoryName, items]) => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "pantry-group";

      const title = document.createElement("h3");
      title.className = "text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between";
      title.innerHTML = `<span>${categoryName}</span>`;
      groupDiv.appendChild(title);

      const chipsWrap = document.createElement("div");
      chipsWrap.className = "flex flex-wrap gap-1.5";

      items.forEach(item => {
        const isSelected = userPantry.has(item.id.toLowerCase());
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = `chip text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition ${
          isSelected 
            ? "selected" 
            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
        }`;
        chip.innerHTML = `<span class="chip-icon">${item.icon}</span> <span>${item.label}</span>`;
        chip.addEventListener("click", () => toggleIngredient(item.id));
        chipsWrap.appendChild(chip);
      });

      groupDiv.appendChild(chipsWrap);
      pantryCategoriesContainer.appendChild(groupDiv);
    });

    renderActiveTags();
  }

  function renderActiveTags() {
    activeTagsList.innerHTML = "";
    const list = Array.from(userPantry);

    selectedCountBadge.textContent = `${list.length} selected`;

    if (list.length === 0) {
      activeTagsContainer.classList.add("hidden");
      return;
    }

    activeTagsContainer.classList.remove("hidden");

    list.forEach(item => {
      const tag = document.createElement("span");
      tag.className = "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-orange-100 text-orange-800 font-medium";
      tag.innerHTML = `<span>${item}</span><button class="hover:text-red-600 focus:outline-none ml-0.5"><i class="fa-solid fa-xmark text-[9px]"></i></button>`;
      tag.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleIngredient(item);
      });
      activeTagsList.appendChild(tag);
    });
  }

  function toggleIngredient(ingredientId) {
    const key = ingredientId.toLowerCase().trim();
    if (userPantry.has(key)) {
      userPantry.delete(key);
    } else {
      userPantry.add(key);
    }
    savePantryState();
    renderPantryCategories();
    updateAppView();
  }

  function addCustomIngredient(rawName) {
    if (!rawName) return;
    const name = rawName.trim().toLowerCase();
    if (name.length > 0) {
      userPantry.add(name);
      savePantryState();
      renderPantryCategories();
      updateAppView();
      customIngredientInput.value = "";
    }
  }

  // --- HISTORY SPOTLIGHT RENDERING ON HOME PAGE ---
  function renderHistorySpotlight() {
    const historyData = agent.getHistoryRecommendations(cookingHistory, Array.from(userPantry), staplesToggle.checked);
    
    if (!historyData || !historyData.topPicks || historyData.topPicks.length === 0) {
      historySpotlightSection.classList.add("hidden");
      return;
    }

    historySpotlightSection.classList.remove("hidden");
    historyRationaleText.textContent = `${historyData.headline} ${historyData.rationale}`;
    historyCardsGrid.innerHTML = "";

    historyData.topPicks.forEach(item => {
      const { recipe, matchPercentage, isReady } = item;
      const card = document.createElement("div");
      card.className = "bg-white p-3 rounded-xl border border-blue-200/80 hover:border-blue-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between";
      
      let badge = isReady 
        ? `<span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">100% Ready</span>`
        : `<span class="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">${matchPercentage}% Match</span>`;

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-700">${recipe.cuisine}</span>
            ${badge}
          </div>
          <h4 class="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1 leading-snug hover:text-blue-600 transition">
            ${recipe.title}
          </h4>
          <p class="text-[11px] text-slate-500 mt-0.5"><i class="fa-regular fa-clock mr-1"></i>${recipe.prepTime + recipe.cookTime} mins • ${recipe.calories} kcal</p>
        </div>
        <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span class="text-slate-400">Balanced Choice</span>
          <span class="font-bold text-blue-600 hover:underline flex items-center gap-1">Cook <i class="fa-solid fa-arrow-right text-[9px]"></i></span>
        </div>
      `;

      card.addEventListener("click", () => openRecipeModal(recipe));
      historyCardsGrid.appendChild(card);
    });
  }

  // --- RECOMMENDATION & GRID RENDERING ---
  function updateAppView() {
    const pantryArray = Array.from(userPantry);
    filters.assumeStaples = staplesToggle.checked;

    let evaluatedRecommendations = agent.getRecommendations(pantryArray, filters);

    // Filter favorites if toggle is active
    if (filters.showFavoritesOnly) {
      evaluatedRecommendations = evaluatedRecommendations.filter(item => favorites.has(item.recipe.id));
    }

    renderAgentBanner(pantryArray, evaluatedRecommendations);
    renderHistorySpotlight();
    renderRecipeGrid(evaluatedRecommendations);
  }

  function renderAgentBanner(pantryArray, recommendations) {
    const narrative = agent.generateAgentNarrative(pantryArray, recommendations, cookingHistory);
    
    agentGreeting.textContent = narrative.greeting;
    agentHeadline.innerHTML = narrative.headline;
    agentAdvice.innerHTML = narrative.advice.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    const readyCount = recommendations.filter(r => r.isReady).length;
    if (readyCount > 0) {
      readyCounterBadge.classList.remove("hidden");
      readyCounterText.textContent = `${readyCount} recipe${readyCount > 1 ? "s" : ""} 100% ready`;
    } else {
      readyCounterBadge.classList.add("hidden");
    }
  }

  function renderRecipeGrid(recommendations) {
    recipeGrid.innerHTML = "";
    resultsCountText.textContent = `Showing ${recommendations.length} recipe${recommendations.length !== 1 ? "s" : ""}`;

    if (recommendations.length === 0) {
      recipeGrid.classList.add("hidden");
      emptyState.classList.remove("hidden");

      if (filters.searchQuery) {
        emptyStateDesc.textContent = `No recipes found matching "${filters.searchQuery}".`;
        emptyStateAddBtnText.textContent = `Add "${filters.searchQuery}" to Database`;
      } else {
        emptyStateDesc.textContent = `Try adjusting your pantry selection or clear some filters to see classic recipes.`;
        emptyStateAddBtnText.textContent = `Add Recipe to Database`;
      }
      return;
    }

    recipeGrid.classList.remove("hidden");
    emptyState.classList.add("hidden");

    recommendations.forEach(item => {
      const { recipe, matchPercentage, isReady, isAlmostReady, missingRequired } = item;
      const isFav = favorites.has(recipe.id);
      const totalTime = recipe.prepTime + recipe.cookTime;

      const card = document.createElement("div");
      card.className = "recipe-card bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm cursor-pointer group";

      // Card Header Image & Badges
      const imgWrap = document.createElement("div");
      imgWrap.className = "relative h-44 w-full bg-slate-100 overflow-hidden";
      
      let badgeHtml = "";
      if (isReady) {
        badgeHtml = `<span class="badge-ready px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><i class="fa-solid fa-circle-check text-[10px]"></i> 100% Ready to Cook</span>`;
      } else if (isAlmostReady) {
        badgeHtml = `<span class="badge-almost px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><i class="fa-solid fa-triangle-exclamation text-[10px]"></i> Need ${missingRequired[0].name}</span>`;
      } else {
        badgeHtml = `<span class="badge-low px-2 py-0.5 rounded-full text-xs font-semibold">${matchPercentage}% Match</span>`;
      }

      imgWrap.innerHTML = `
        <img 
          src="${recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'}" 
          alt="${recipe.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        <div class="absolute top-3 left-3">
          ${badgeHtml}
        </div>
        <button 
          class="fav-card-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow transition"
          data-id="${recipe.id}"
        >
          <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart ${isFav ? 'text-red-500' : ''} text-sm"></i>
        </button>
        <div class="absolute bottom-2.5 left-3 text-white text-xs font-semibold flex items-center gap-2">
          <span class="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm"><i class="fa-regular fa-clock mr-1"></i>${totalTime} mins</span>
          <span>•</span>
          <span class="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">${recipe.cuisine}</span>
        </div>
      `;

      // Card Body
      const body = document.createElement("div");
      body.className = "p-4 flex-1 flex flex-col justify-between";

      // Tags
      const tagsHtml = (recipe.tags || []).slice(0, 2).map(tag => 
        `<span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">${tag}</span>`
      ).join(" ");

      // Missing ingredients preview or readiness message
      let missingSnippet = "";
      if (isReady) {
        missingSnippet = `<p class="text-xs text-emerald-600 font-medium flex items-center gap-1.5 mt-2"><i class="fa-solid fa-check text-[10px]"></i> All required ingredients available in your pantry!</p>`;
      } else {
        const missingNames = missingRequired.map(m => m.name).join(", ");
        missingSnippet = `<p class="text-xs text-amber-700 font-medium flex items-center gap-1.5 mt-2"><i class="fa-solid fa-cart-shopping text-[10px]"></i> Missing: <span class="underline">${missingNames}</span></p>`;
      }

      body.innerHTML = `
        <div>
          <div class="flex items-center gap-1.5 mb-1.5">
            ${tagsHtml}
            <span class="text-[10px] font-semibold text-slate-400">• ${recipe.category}</span>
          </div>
          <h4 class="font-bold text-slate-900 text-base group-hover:text-orange-600 transition leading-snug">
            ${recipe.title}
          </h4>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            ${recipe.description}
          </p>
          ${missingSnippet}
        </div>

        <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="text-xs text-slate-600 font-medium">
            <span><i class="fa-solid fa-fire text-amber-500 mr-1 text-[11px]"></i>${recipe.calories} kcal</span>
            <span class="mx-1">•</span>
            <span>${recipe.protein} protein</span>
          </div>
          <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 group-hover:bg-orange-500 text-orange-600 group-hover:text-white rounded-lg text-xs font-bold transition">
            <span>Cook</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </span>
        </div>
      `;

      card.appendChild(imgWrap);
      card.appendChild(body);

      // Card Click: Open Cooking Mode Modal
      card.addEventListener("click", (e) => {
        if (e.target.closest(".fav-card-btn")) return;
        openRecipeModal(recipe);
      });

      // Favorite Button Click
      const favBtn = card.querySelector(".fav-card-btn");
      favBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(recipe.id);
      });

      recipeGrid.appendChild(card);
    });
  }

  function toggleFavorite(recipeId) {
    if (favorites.has(recipeId)) {
      favorites.delete(recipeId);
    } else {
      favorites.add(recipeId);
    }
    saveFavoritesState();
    updateAppView();
    if (currentModalRecipe && currentModalRecipe.id === recipeId) {
      updateModalFavButton();
    }
  }

  // --- COOKING MODE MODAL & HISTORY LOGGING ---
  function openRecipeModal(recipe) {
    currentModalRecipe = recipe;
    currentServings = 2;
    servingsCount.textContent = currentServings;

    modalRecipeImage.src = recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
    modalRecipeTitle.textContent = recipe.title;
    modalRecipeDesc.textContent = recipe.description;
    modalRecipeCategory.textContent = recipe.category;
    modalRecipeCuisine.textContent = recipe.cuisine;

    const totalTime = recipe.prepTime + recipe.cookTime;
    modalTotalTime.innerHTML = `<i class="fa-regular fa-clock text-orange-500 text-xs"></i> ${totalTime} mins`;
    modalCalories.innerHTML = `<i class="fa-solid fa-fire text-amber-500 text-xs"></i> ${recipe.calories} kcal`;
    modalProtein.innerHTML = `<i class="fa-solid fa-dumbbell text-indigo-500 text-xs"></i> ${recipe.protein}`;

    // Match status in modal
    const pantryArray = Array.from(userPantry);
    const evalResult = agent.evaluateRecipe(recipe, new Set(pantryArray), staplesToggle.checked);
    if (evalResult.isReady) {
      modalMatchBadge.className = "px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white";
      modalMatchBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> 100% Ready`;
    } else {
      modalMatchBadge.className = "px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white";
      modalMatchBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${evalResult.matchPercentage}% Matched`;
    }

    // Chef Tip
    if (recipe.chefTip) {
      modalChefTipCard.classList.remove("hidden");
      modalChefTip.textContent = recipe.chefTip;
    } else {
      modalChefTipCard.classList.add("hidden");
    }

    // Missing Items & Substitutions
    if (evalResult.missingRequired.length > 0) {
      modalSubstitutionAlert.classList.remove("hidden");
      modalSubstitutionsList.innerHTML = evalResult.missingRequired.map(item => {
        return `<li><strong>${item.name}:</strong> Missing from pantry.${item.substitute ? ` Swap with: <em>${item.substitute}</em>` : " Grab this from your local store."}</li>`;
      }).join("");
    } else {
      modalSubstitutionAlert.classList.add("hidden");
    }

    renderModalIngredients();
    renderModalSteps();
    resetTimer(recipe.cookTime * 60);
    updateModalFavButton();

    cookingModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeCookingModal() {
    cookingModal.classList.add("hidden");
    document.body.style.overflow = "";
    pauseTimer();
    currentModalRecipe = null;
  }

  function updateModalFavButton() {
    if (!currentModalRecipe) return;
    const isFav = favorites.has(currentModalRecipe.id);
    modalFavBtn.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart ${isFav ? 'text-red-500' : ''} text-base"></i>`;
  }

  function logCookingDone() {
    if (!currentModalRecipe) return;
    
    // Add to history
    const historyEntry = {
      id: Date.now().toString(),
      recipeId: currentModalRecipe.id,
      recipeTitle: currentModalRecipe.title,
      cuisine: currentModalRecipe.cuisine,
      category: currentModalRecipe.category,
      cookedAt: new Date().toISOString(),
      image: currentModalRecipe.image,
      calories: currentModalRecipe.calories,
      protein: currentModalRecipe.protein
    };

    cookingHistory.unshift(historyEntry);
    saveHistoryState();

    alert(`🎉 Awesome job! "${currentModalRecipe.title}" has been logged to your cooking history. Chef AI will balance your future recommendations!`);
    closeCookingModal();
    updateAppView();
  }

  function renderModalIngredients() {
    if (!currentModalRecipe) return;
    modalIngredientsList.innerHTML = "";

    const scaleFactor = currentServings / 2;

    currentModalRecipe.ingredients.forEach((ing) => {
      const isAvailable = userPantry.has(ing.name.toLowerCase()) || 
        (staplesToggle.checked && (ing.staple || COMMON_PANTRY_STAPLES.includes(ing.name.toLowerCase())));

      const itemDiv = document.createElement("label");
      itemDiv.className = `flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition ${
        isAvailable ? "bg-slate-50 border-slate-200" : "bg-amber-50/50 border-amber-200"
      }`;

      let amountStr = ing.amount;
      if (scaleFactor !== 1) {
        amountStr = `${scaleFactor}x (${ing.amount})`;
      }

      itemDiv.innerHTML = `
        <input type="checkbox" ${isAvailable ? 'checked' : ''} class="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300">
        <div class="flex-1 flex items-center justify-between">
          <span class="font-medium text-slate-800 capitalize">${ing.name}</span>
          <span class="text-slate-500 text-[11px]">${amountStr}</span>
        </div>
      `;

      modalIngredientsList.appendChild(itemDiv);
    });
  }

  function renderModalSteps() {
    if (!currentModalRecipe) return;
    modalStepsList.innerHTML = "";

    const totalSteps = currentModalRecipe.steps.length;
    let completedSteps = 0;

    currentModalRecipe.steps.forEach((stepText, idx) => {
      const stepRow = document.createElement("label");
      stepRow.className = "flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition";

      stepRow.innerHTML = `
        <input type="checkbox" class="step-checkbox mt-0.5 w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300">
        <span class="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
          <strong class="text-slate-900 mr-1.5 font-bold">Step ${idx + 1}:</strong>${stepText}
        </span>
      `;

      const chk = stepRow.querySelector(".step-checkbox");
      chk.addEventListener("change", () => {
        if (chk.checked) completedSteps++;
        else completedSteps--;
        stepsProgressText.textContent = `${completedSteps} of ${totalSteps} steps completed`;
        if (completedSteps === totalSteps) {
          stepsProgressText.innerHTML = `<span class="text-emerald-600 font-bold"><i class="fa-solid fa-circle-check"></i> Great job! Dish is ready to serve!</span>`;
        }
      });

      modalStepsList.appendChild(stepRow);
    });

    stepsProgressText.textContent = `0 of ${totalSteps} steps completed`;
  }

  // --- KITCHEN TIMER LOGIC ---
  function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function startTimer() {
    if (timerIsRunning) {
      pauseTimer();
      return;
    }
    timerIsRunning = true;
    timerStartBtn.textContent = "Pause";
    timerStartBtn.className = "px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition";

    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
      } else {
        pauseTimer();
        alert("⏰ Ring ring! Cooking timer is complete!");
      }
    }, 1000);
  }

  function pauseTimer() {
    timerIsRunning = false;
    clearInterval(timerInterval);
    timerStartBtn.textContent = "Start";
    timerStartBtn.className = "px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition";
  }

  function resetTimer(newSeconds = 300) {
    pauseTimer();
    timerSeconds = newSeconds;
    updateTimerDisplay();
  }

  // --- COOKING HISTORY MODAL ---
  function openHistoryModal() {
    historyItemsList.innerHTML = "";
    historySummaryText.textContent = `${cookingHistory.length} meal${cookingHistory.length !== 1 ? 's' : ''} logged`;

    if (cookingHistory.length === 0) {
      historyItemsList.innerHTML = `
        <div class="text-center py-12 text-slate-400">
          <i class="fa-solid fa-bowl-food text-4xl mb-3 text-slate-300"></i>
          <p class="text-sm font-semibold text-slate-600">No cooking history yet</p>
          <p class="text-xs text-slate-400 mt-1 max-w-xs mx-auto">When you finish cooking a dish, click "I'm Done Cooking!" to build your history log!</p>
        </div>
      `;
    } else {
      cookingHistory.forEach(entry => {
        const itemRow = document.createElement("div");
        itemRow.className = "bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3 hover:border-slate-300 transition";

        // Date formatting
        let dateFormatted = "Recently";
        if (entry.cookedAt) {
          const d = new Date(entry.cookedAt);
          dateFormatted = d.toLocaleDateString(undefined, { 
            weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
          });
        }

        itemRow.innerHTML = `
          <div class="flex items-center gap-3">
            <img 
              src="${entry.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'}" 
              alt="${entry.recipeTitle}" 
              class="w-12 h-12 rounded-xl object-cover flex-shrink-0"
            >
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">${entry.cuisine}</span>
                <span class="text-[11px] text-slate-400">${dateFormatted}</span>
              </div>
              <h4 class="font-bold text-slate-900 text-sm mt-0.5">${entry.recipeTitle}</h4>
              <p class="text-[11px] text-slate-500">${entry.calories} kcal • ${entry.protein} protein</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <button class="cook-again-btn px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1">
              <i class="fa-solid fa-rotate-right text-[10px]"></i>
              <span>Cook Again</span>
            </button>
          </div>
        `;

        // Cook again click: find recipe and open modal
        itemRow.querySelector(".cook-again-btn").addEventListener("click", () => {
          const all = getAllRecipes();
          const target = all.find(r => r.id === entry.recipeId) || {
            id: entry.recipeId,
            title: entry.recipeTitle,
            cuisine: entry.cuisine,
            category: entry.category,
            prepTime: 5,
            cookTime: 10,
            difficulty: "Easy",
            calories: entry.calories,
            protein: entry.protein,
            image: entry.image,
            description: "Cooked previously from your recipe history.",
            ingredients: [
              { name: "garlic", amount: "2 cloves", required: true },
              { name: "cooking oil", amount: "1 tbsp", required: true, staple: true }
            ],
            steps: ["Prepare ingredients and cook according to your personal taste!"],
            tags: ["History Favorite"]
          };
          closeHistoryModal();
          openRecipeModal(target);
        });

        historyItemsList.appendChild(itemRow);
      });
    }

    historyModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeHistoryModal() {
    historyModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // --- ADD CUSTOM RECIPE MODAL ---
  function openAddRecipeModal(prefilledTitle = "") {
    if (prefilledTitle) {
      formTitle.value = prefilledTitle;
    }
    addRecipeModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    formTitle.focus();
  }

  function closeAddRecipeModal() {
    addRecipeModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function addIngredientRow(name = "", amount = "") {
    const row = document.createElement("div");
    row.className = "flex items-center gap-2 ing-form-row";
    row.innerHTML = `
      <input type="text" placeholder="Ingredient name (e.g. noodles, tofu)" value="${name}" class="ing-name flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none" required>
      <input type="text" placeholder="Amount (e.g. 150g, 1 cup)" value="${amount}" class="ing-amount w-32 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none" required>
      <button type="button" class="remove-ing-row text-slate-400 hover:text-red-500 p-1"><i class="fa-solid fa-trash text-xs"></i></button>
    `;
    row.querySelector(".remove-ing-row").addEventListener("click", () => {
      row.remove();
    });
    formIngredientsRows.appendChild(row);
  }

  // Handle Add Recipe Submission
  addRecipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = formTitle.value.trim();
    if (!title) return;

    // Collect ingredients
    const ingRows = formIngredientsRows.querySelectorAll(".ing-form-row");
    const ingredients = [];
    ingRows.forEach(r => {
      const n = r.querySelector(".ing-name").value.trim().toLowerCase();
      const a = r.querySelector(".ing-amount").value.trim();
      if (n) {
        ingredients.push({
          name: n,
          amount: a || "as needed",
          required: true
        });
      }
    });

    if (ingredients.length === 0) {
      alert("Please add at least 1 ingredient.");
      return;
    }

    // Split steps
    const rawSteps = formSteps.value.split("\n").map(s => s.trim()).filter(s => s.length > 0);
    const steps = rawSteps.length > 0 ? rawSteps : ["Prepare ingredients and cook until golden and delicious."];

    // Pick fallback cuisine image if not provided
    const cuisine = formCuisine.value;
    let fallbackImg = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80";
    if (cuisine === "Indian") fallbackImg = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80";
    else if (cuisine === "Italian") fallbackImg = "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=600&auto=format&fit=crop&q=80";
    else if (cuisine === "Chinese") fallbackImg = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80";
    else if (cuisine === "Mexican") fallbackImg = "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=600&auto=format&fit=crop&q=80";

    const customId = "custom-" + Date.now();
    const newRecipe = {
      id: customId,
      title: title,
      category: formCategory.value,
      cuisine: cuisine,
      prepTime: parseInt(formPrepTime.value, 10) || 5,
      cookTime: parseInt(formCookTime.value, 10) || 15,
      difficulty: "Easy",
      calories: parseInt(formCalories.value, 10) || 320,
      protein: "14g",
      image: formImage.value.trim() || fallbackImg,
      description: formDesc.value.trim(),
      ingredients: ingredients,
      steps: steps,
      tags: ["Custom Recipe", cuisine, formCategory.value],
      chefTip: formChefTip.value.trim() || "Taste and adjust seasonings right before serving!"
    };

    saveCustomRecipe(newRecipe);
    agent.setRecipes(getAllRecipes());

    alert(`🎉 Recipe "${title}" has been saved to your database!`);
    addRecipeForm.reset();
    closeAddRecipeModal();

    // Reset search query and show the new recipe
    filters.searchQuery = "";
    searchInput.value = "";
    clearSearchBtn.classList.add("hidden");
    updateAppView();

    // Open the new recipe modal right away
    openRecipeModal(newRecipe);
  });

  // --- CHAT WITH CHEF LOGIC ---
  function openChat() {
    chatModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    chatInput.focus();
  }

  function closeChat() {
    chatModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function appendChatMessage(sender, text) {
    const row = document.createElement("div");
    row.className = `flex items-start gap-2.5 ${sender === 'user' ? 'justify-end' : ''}`;

    if (sender === "user") {
      row.innerHTML = `
        <div class="chat-bubble-user p-3 text-xs sm:text-sm max-w-[85%]">
          ${text}
        </div>
      `;
    } else {
      let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n•/g, '<br>•');

      row.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs flex-shrink-0">
          👨‍🍳
        </div>
        <div class="chat-bubble-agent p-3 text-slate-800 text-xs sm:text-sm max-w-[85%] leading-relaxed">
          ${formatted}
        </div>
      `;
    }

    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserChatSubmit(message) {
    if (!message || !message.trim()) return;
    appendChatMessage("user", message);
    chatInput.value = "";

    setTimeout(() => {
      const response = agent.chatWithChef(message, Array.from(userPantry), cookingHistory);
      appendChatMessage("agent", response);
    }, 350);
  }

  // --- EVENT LISTENERS ---

  // Custom Ingredient Add
  addCustomIngredientBtn.addEventListener("click", () => {
    addCustomIngredient(customIngredientInput.value);
  });
  customIngredientInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomIngredient(customIngredientInput.value);
    }
  });

  // Clear Pantry
  clearPantryBtn.addEventListener("click", () => {
    if (confirm("Reset and clear all selected pantry items?")) {
      userPantry.clear();
      savePantryState();
      renderPantryCategories();
      updateAppView();
    }
  });

  // Staples Toggle
  staplesToggle.addEventListener("change", () => {
    updateAppView();
  });

  // Quick Staples Presets Button
  quickStaplesPresetBtn.addEventListener("click", () => {
    COMMON_PANTRY_STAPLES.forEach(s => userPantry.add(s));
    savePantryState();
    renderPantryCategories();
    updateAppView();
  });

  // Category Filter Pills
  categoryTabsContainer.addEventListener("click", (e) => {
    const pill = e.target.closest(".category-pill");
    if (!pill) return;
    
    document.querySelectorAll(".category-pill").forEach(p => {
      p.className = "category-pill px-3.5 py-1.5 rounded-full font-medium transition bg-slate-100 hover:bg-slate-200 text-slate-700";
    });
    pill.className = "category-pill px-3.5 py-1.5 rounded-full font-medium transition bg-slate-900 text-white";

    filters.category = pill.dataset.cat;
    updateAppView();
  });

  // Prep Time & Diet Dropdowns
  timeFilter.addEventListener("change", (e) => {
    filters.maxTime = e.target.value;
    updateAppView();
  });
  dietFilter.addEventListener("change", (e) => {
    filters.dietary = e.target.value;
    updateAppView();
  });

  // Search Bar
  searchInput.addEventListener("input", (e) => {
    filters.searchQuery = e.target.value.trim();
    if (filters.searchQuery.length > 0) {
      clearSearchBtn.classList.remove("hidden");
    } else {
      clearSearchBtn.classList.add("hidden");
    }
    updateAppView();
  });
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    filters.searchQuery = "";
    clearSearchBtn.classList.add("hidden");
    updateAppView();
  });

  // Favorites Toggle
  favoritesToggleBtn.addEventListener("click", () => {
    filters.showFavoritesOnly = !filters.showFavoritesOnly;
    if (filters.showFavoritesOnly) {
      favoritesToggleBtn.classList.remove("bg-slate-100", "text-slate-700");
      favoritesToggleBtn.classList.add("bg-red-500", "text-white");
    } else {
      favoritesToggleBtn.classList.remove("bg-red-500", "text-white");
      favoritesToggleBtn.classList.add("bg-slate-100", "text-slate-700");
    }
    updateAppView();
  });

  // Surprise Me Button
  surpriseBtn.addEventListener("click", () => {
    const recs = agent.getRecommendations(Array.from(userPantry), { assumeStaples: staplesToggle.checked });
    const ready = recs.filter(r => r.isReady);
    const candidates = ready.length > 0 ? ready : recs;
    if (candidates.length > 0) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)].recipe;
      openRecipeModal(pick);
    }
  });

  // Servings Scaler Buttons
  servingsMinusBtn.addEventListener("click", () => {
    if (currentServings > 1) {
      currentServings--;
      servingsCount.textContent = currentServings;
      renderModalIngredients();
    }
  });
  servingsPlusBtn.addEventListener("click", () => {
    if (currentServings < 8) {
      currentServings++;
      servingsCount.textContent = currentServings;
      renderModalIngredients();
    }
  });

  // Modal Controls
  modalCloseBtn.addEventListener("click", closeCookingModal);
  modalDoneBtn.addEventListener("click", logCookingDone);
  modalFavBtn.addEventListener("click", () => {
    if (currentModalRecipe) toggleFavorite(currentModalRecipe.id);
  });

  // Timer Buttons
  timerStartBtn.addEventListener("click", startTimer);
  timerResetBtn.addEventListener("click", () => resetTimer(currentModalRecipe ? currentModalRecipe.cookTime * 60 : 300));
  timerPreset5.addEventListener("click", () => resetTimer(300));
  timerPreset10.addEventListener("click", () => resetTimer(600));

  // Chat Modal Controls
  openChatBtn.addEventListener("click", openChat);
  closeChatBtn.addEventListener("click", closeChat);
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUserChatSubmit(chatInput.value);
  });
  chatQuickPrompts.forEach(btn => {
    btn.addEventListener("click", () => {
      handleUserChatSubmit(btn.textContent.replace(/^[^\w]+/, ''));
    });
  });

  // History Modal Controls
  openHistoryBtn.addEventListener("click", openHistoryModal);
  viewAllHistoryBtn.addEventListener("click", openHistoryModal);
  closeHistoryBtn.addEventListener("click", closeHistoryModal);
  clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Clear all cooking history?")) {
      cookingHistory = [];
      saveHistoryState();
      openHistoryModal();
      updateAppView();
    }
  });

  // Add Recipe Modal Controls
  openAddRecipeBtn.addEventListener("click", () => openAddRecipeModal());
  emptyStateAddRecipeBtn.addEventListener("click", () => openAddRecipeModal(filters.searchQuery));
  closeAddRecipeBtn.addEventListener("click", closeAddRecipeModal);
  cancelAddRecipeBtn.addEventListener("click", closeAddRecipeModal);
  formAddIngRowBtn.addEventListener("click", () => addIngredientRow());

  // Setup dynamic ingredient row deletion
  document.querySelectorAll(".remove-ing-row").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".ing-form-row").remove();
    });
  });

  // Close modals on outside click or Esc
  window.addEventListener("click", (e) => {
    if (e.target === cookingModal) closeCookingModal();
    if (e.target === chatModal) closeChat();
    if (e.target === historyModal) closeHistoryModal();
    if (e.target === addRecipeModal) closeAddRecipeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCookingModal();
      closeChat();
      closeHistoryModal();
      closeAddRecipeModal();
    }
  });

  // Global reset helper
  window.resetFilters = function() {
    filters.cuisine = "All";
    filters.category = "All";
    filters.maxTime = "All";
    filters.dietary = "All";
    filters.searchQuery = "";
    filters.showFavoritesOnly = false;
    searchInput.value = "";
    timeFilter.value = "All";
    dietFilter.value = "All";
    favoritesToggleBtn.className = "flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-medium transition";
    
    renderCuisineTabs();

    document.querySelectorAll(".category-pill").forEach((p, idx) => {
      if (idx === 0) p.className = "category-pill px-3.5 py-1.5 rounded-full font-medium transition bg-slate-900 text-white";
      else p.className = "category-pill px-3.5 py-1.5 rounded-full font-medium transition bg-slate-100 hover:bg-slate-200 text-slate-700";
    });
    updateAppView();
  };

  // --- INITIAL MOUNT ---
  updateFavoritesBadge();
  updateHistoryBadge();
  renderCuisineTabs();
  renderPantryCategories();
  updateAppView();
});
