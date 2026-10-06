// Comprehensive database of basic and everyday recipes
// Each recipe includes required ingredients, optional/seasoning ingredients,
// steps, tags, nutrition, and substitution tips.

const COMMON_PANTRY_STAPLES = [
  "salt", "black pepper", "water", "cooking oil", "sugar", "butter"
];

const RECIPES_DATA = [
  // --- EGG RECIPES ---
  {
    id: "classic-scrambled-eggs",
    title: "Soft & Creamy Scrambled Eggs",
    category: "Breakfast",
    cuisine: "Continental",
    prepTime: 3,
    cookTime: 5,
    difficulty: "Easy",
    calories: 220,
    protein: "14g",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
    description: "Fluffy, tender, velvety scrambled eggs cooked low and slow with butter.",
    ingredients: [
      { name: "eggs", amount: "3 large", required: true },
      { name: "butter", amount: "1 tbsp", required: true, staple: true },
      { name: "milk", amount: "1 tbsp", required: false },
      { name: "salt", amount: "a pinch", required: true, staple: true },
      { name: "black pepper", amount: "to taste", required: false, staple: true },
      { name: "cheese", amount: "2 tbsp shredded (optional)", required: false }
    ],
    steps: [
      "Whisk eggs with a pinch of salt and a splash of milk (optional) in a bowl until uniform.",
      "Melt butter in a non-stick pan over medium-low heat.",
      "Pour in eggs and let sit undisturbed for 20 seconds.",
      "Gently push curds from edges toward center with a spatula until soft folds form.",
      "Remove from heat while still slightly glossy (they finish cooking on the plate). Season with black pepper."
    ],
    tags: ["High-Protein", "Quick (<15m)", "Vegetarian", "Keto"],
    chefTip: "Take them off the heat right before they look completely done. Residual heat keeps cooking them!",
    substitutions: {
      "butter": "olive oil or vegetable oil",
      "milk": "cream, yogurt, or skip entirely"
    }
  },
  {
    id: "classic-french-omelette",
    title: "Golden Herb & Cheese Omelette",
    category: "Breakfast",
    cuisine: "French",
    prepTime: 4,
    cookTime: 6,
    difficulty: "Easy",
    calories: 260,
    protein: "16g",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop&q=80",
    description: "Smooth, golden exterior with a melty cheese center and fresh herbs.",
    ingredients: [
      { name: "eggs", amount: "2-3", required: true },
      { name: "butter", amount: "1 tbsp", required: true, staple: true },
      { name: "cheese", amount: "1/4 cup shredded", required: false },
      { name: "onion", amount: "2 tbsp finely chopped (optional)", required: false },
      { name: "tomato", amount: "2 tbsp diced (optional)", required: false },
      { name: "salt", amount: "to taste", required: true, staple: true },
      { name: "black pepper", amount: "to taste", required: true, staple: true }
    ],
    steps: [
      "Beat eggs with salt and pepper until thoroughly mixed and slightly frothy.",
      "Heat butter in a skillet over medium heat until foamy.",
      "Pour in eggs and swirl the pan to spread evenly. Lift edges to let uncooked egg flow underneath.",
      "When top is just set, sprinkle cheese and veggies on one half.",
      "Fold the other half over and slide onto a warm plate."
    ],
    tags: ["High-Protein", "Quick (<15m)", "Vegetarian", "Gluten-Free"],
    chefTip: "Use medium heat to keep the omelette tender and prevent browning if you want a classic French texture.",
    substitutions: {
      "cheese": "nutritional yeast or diced paneer/tofu"
    }
  },
  {
    id: "classic-shakshuka",
    title: "Skillet Shakshuka (Eggs in Spiced Tomato Sauce)",
    category: "Breakfast",
    cuisine: "Mediterranean",
    prepTime: 8,
    cookTime: 15,
    difficulty: "Medium",
    calories: 310,
    protein: "15g",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600&auto=format&fit=crop&q=80",
    description: "Poached eggs nestled in a simmered sauce of tomatoes, bell pepper, onions, and spices.",
    ingredients: [
      { name: "eggs", amount: "3-4", required: true },
      { name: "tomato", amount: "3 large chopped or 1 can", required: true },
      { name: "onion", amount: "1 medium diced", required: true },
      { name: "bell pepper", amount: "1 diced", required: false },
      { name: "garlic", amount: "3 cloves minced", required: true },
      { name: "olive oil", amount: "2 tbsp", required: true, staple: true },
      { name: "cumin", amount: "1 tsp", required: false },
      { name: "salt", amount: "to taste", required: true, staple: true },
      { name: "bread", amount: "for serving", required: false }
    ],
    steps: [
      "Heat olive oil in a skillet. Sauté onions and bell peppers for 5 minutes until softened.",
      "Add minced garlic, cumin, and salt; cook for 1 minute until fragrant.",
      "Pour in chopped tomatoes and simmer for 10 minutes until thick and jammy.",
      "Make small wells in the sauce with a spoon and crack an egg into each well.",
      "Cover skillet and cook on low heat for 5-8 minutes until egg whites are set but yolks still runny.",
      "Serve hot right out of the skillet with crusty bread."
    ],
    tags: ["High-Protein", "Vegetarian", "Nutritious"],
    chefTip: "Don't overcook the eggs; runny yolks blend into the tomato sauce to make it exceptionally rich.",
    substitutions: {
      "bell pepper": "zucchini, mushrooms, or chili flakes"
    }
  },
  {
    id: "egg-fried-rice",
    title: "Quick 10-Minute Egg Fried Rice",
    category: "Lunch",
    cuisine: "Chinese",
    prepTime: 5,
    cookTime: 7,
    difficulty: "Easy",
    calories: 380,
    protein: "13g",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80",
    description: "The quintessential pantry rescue: day-old rice stir-fried with scrambled eggs, garlic, and soy sauce.",
    ingredients: [
      { name: "rice", amount: "2 cups cooked (cold)", required: true },
      { name: "eggs", amount: "2-3 beaten", required: true },
      { name: "garlic", amount: "2 cloves minced", required: true },
      { name: "onion", amount: "1/2 cup diced", required: false },
      { name: "soy sauce", amount: "1.5 tbsp", required: true },
      { name: "cooking oil", amount: "2 tbsp", required: true, staple: true },
      { name: "black pepper", amount: "to taste", required: true, staple: true },
      { name: "carrot", amount: "1/4 cup diced (optional)", required: false }
    ],
    steps: [
      "Heat 1 tbsp oil in a wok or large pan over high heat. Add beaten eggs, scramble quickly for 1 minute, and set aside.",
      "Add remaining 1 tbsp oil to the pan. Sauté garlic and onions for 1-2 minutes.",
      "Add cold cooked rice. Break up any clumps with a spatula and toss vigorously on high heat for 3 minutes.",
      "Drizzle soy sauce and black pepper over the rice; toss thoroughly.",
      "Fold in the cooked scrambled eggs and toss for another 30 seconds before serving."
    ],
    tags: ["Quick (<15m)", "Budget-Friendly", "Comfort Food"],
    chefTip: "Always use cold, leftover cooked rice so the grains stay separate and don't turn mushy!",
    substitutions: {
      "soy sauce": "tamari, salt + pinch of sugar, or Worcestershire sauce"
    }
  },

  // --- PASTA & NOODLES ---
  {
    id: "spaghetti-aglio-e-olio",
    title: "Spaghetti Aglio e Olio",
    category: "Dinner",
    cuisine: "Italian",
    prepTime: 5,
    cookTime: 10,
    difficulty: "Easy",
    calories: 420,
    protein: "11g",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80",
    description: "Classic Italian perfection with just pasta, fragrant garlic slices gently sizzled in olive oil, and chili.",
    ingredients: [
      { name: "pasta", amount: "200g (spaghetti or any pasta)", required: true },
      { name: "garlic", amount: "5-6 cloves thinly sliced", required: true },
      { name: "olive oil", amount: "1/4 cup good quality", required: true, staple: true },
      { name: "chili", amount: "1/2 tsp chili flakes or 1 fresh chili", required: false },
      { name: "salt", amount: "for boiling water and seasoning", required: true, staple: true },
      { name: "black pepper", amount: "to taste", required: false, staple: true },
      { name: "cheese", amount: "grated parmesan (optional)", required: false }
    ],
    steps: [
      "Bring a large pot of salted water to a rolling boil. Cook pasta until al dente (1-2 min less than box instructions).",
      "Reserve 1/2 cup of starchy pasta water, then drain pasta.",
      "In a wide skillet, combine olive oil and sliced garlic over gentle medium-low heat. Let garlic turn lightly golden (don't burn!).",
      "Add chili flakes for 20 seconds, then splash in 1/4 cup reserved pasta water to emulsify the sauce.",
      "Add drained pasta to the skillet and toss vigorously until a glossy sauce coats every strand. Season and serve."
    ],
    tags: ["Quick (<15m)", "Vegetarian", "Vegan-Friendly", "Italian Classic"],
    chefTip: "Garlic turns bitter if browned too fast. Keep heat gentle so it infuses the olive oil with sweet garlic aroma.",
    substitutions: {
      "pasta": "noodles, ramen, or zucchini spirals"
    }
  },
  {
    id: "classic-tomato-basil-pasta",
    title: "Classic Marinara Tomato Pasta",
    category: "Dinner",
    cuisine: "Italian",
    prepTime: 5,
    cookTime: 15,
    difficulty: "Easy",
    calories: 390,
    protein: "12g",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=600&auto=format&fit=crop&q=80",
    description: "Hearty, comforting pasta tossed in a rich, garlicky slow-simmered tomato sauce.",
    ingredients: [
      { name: "pasta", amount: "200g", required: true },
      { name: "tomato", amount: "4 ripe tomatoes or 1 can crushed", required: true },
      { name: "onion", amount: "1 small finely chopped", required: false },
      { name: "garlic", amount: "3 cloves minced", required: true },
      { name: "olive oil", amount: "2 tbsp", required: true, staple: true },
      { name: "salt", amount: "1 tsp", required: true, staple: true },
      { name: "sugar", amount: "1/2 tsp (balances acidity)", required: false, staple: true },
      { name: "cheese", amount: "grated (optional)", required: false }
    ],
    steps: [
      "Boil pasta in salted water until al dente. Reserve 1/4 cup water, then drain.",
      "Heat olive oil in a pan. Sauté garlic and chopped onion until soft and translucent (3 mins).",
      "Add tomatoes, salt, and a pinch of sugar. Simmer for 10-12 minutes until sauce thickens.",
      "Toss pasta and a splash of reserved water into the sauce.",
      "Garnish with grated cheese or fresh herbs if available and serve warm."
    ],
    tags: ["Vegetarian", "Family Favorite", "Comfort Food"],
    chefTip: "A tiny pinch of sugar balances tomato acidity and unlocks deep tomato sweetness.",
    substitutions: {
      "tomato": "tomato paste + water, or canned marinara"
    }
  },
  {
    id: "creamy-garlic-butter-noodles",
    title: "Creamy Garlic Butter & Cheese Noodles",
    category: "Dinner",
    cuisine: "Continental",
    prepTime: 3,
    cookTime: 10,
    difficulty: "Easy",
    calories: 450,
    protein: "14g",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&auto=format&fit=crop&q=80",
    description: "Rich, luscious comfort food using pantry basics: butter, garlic, pasta, and cheese.",
    ingredients: [
      { name: "pasta", amount: "200g (any pasta or noodles)", required: true },
      { name: "butter", amount: "3 tbsp", required: true, staple: true },
      { name: "garlic", amount: "4 cloves finely minced", required: true },
      { name: "cheese", amount: "1/2 cup grated cheddar or parmesan", required: true },
      { name: "milk", amount: "1/4 cup (optional for extra creaminess)", required: false },
      { name: "black pepper", amount: "to taste", required: true, staple: true },
      { name: "salt", amount: "to taste", required: true, staple: true }
    ],
    steps: [
      "Cook pasta in salted water until tender; reserve 1/2 cup pasta cooking water.",
      "Melt butter in a pan over medium heat. Add garlic and cook gently for 1-2 minutes until fragrant.",
      "Pour in milk (or 1/4 cup pasta water), bring to gentle simmer.",
      "Add drained pasta and grated cheese. Stir vigorously until cheese melts into a silky sauce.",
      "Crack fresh black pepper over top and serve immediately."
    ],
    tags: ["Quick (<15m)", "Comfort Food", "Vegetarian"],
    chefTip: "Starchy pasta water is liquid gold! It bonds butter and cheese into an emulsion instead of an oily puddle.",
    substitutions: {
      "milk": "splash of pasta water, or heavy cream"
    }
  },

  // --- RICE DISHES ---
  {
    id: "classic-jeera-rice",
    title: "Aromatic Jeera Rice (Cumin Rice)",
    category: "Lunch",
    cuisine: "Indian",
    prepTime: 5,
    cookTime: 15,
    difficulty: "Easy",
    calories: 280,
    protein: "5g",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80",
    description: "Fluffy basmati rice tempered with golden cumin seeds and aromatic ghee or butter.",
    ingredients: [
      { name: "rice", amount: "1 cup raw (or 2.5 cups cooked)", required: true },
      { name: "cumin", amount: "1.5 tsp cumin seeds", required: true },
      { name: "butter", amount: "1.5 tbsp (or ghee/oil)", required: true, staple: true },
      { name: "salt", amount: "1 tsp", required: true, staple: true },
      { name: "water", amount: "2 cups", required: true, staple: true },
      { name: "onion", amount: "1/2 sliced (optional)", required: false }
    ],
    steps: [
      "Rinse rice until water runs clear; soak for 15 minutes if time permits.",
      "Heat butter or oil in a pot over medium heat. Add cumin seeds and let them sizzle for 30 seconds until aromatic.",
      "Add sliced onion if using, and sauté until lightly caramelized.",
      "Add drained rice and roast for 1 minute in the spiced fat.",
      "Pour in 2 cups water and salt. Bring to a boil, then reduce heat to low, cover with tight lid, and simmer 12 minutes.",
      "Turn off heat and let steam covered for 5 minutes. Fluff gently with a fork."
    ],
    tags: ["Vegetarian", "Vegan-Friendly", "Gluten-Free", "Indian Staple"],
    chefTip: "Roasting the rice grains in butter for 60 seconds before adding water keeps grains separate and fluffy.",
    substitutions: {
      "butter": "cooking oil or ghee"
    }
  },
  {
    id: "homestyle-dal-khichdi",
    title: "Homestyle Dal Khichdi (Lentil & Rice Bowl)",
    category: "Dinner",
    cuisine: "Indian",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Easy",
    calories: 340,
    protein: "14g",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    description: "Ultimate Indian soul food: nourishing one-pot porridge of lentils, rice, turmeric, and cumin.",
    ingredients: [
      { name: "rice", amount: "1/2 cup", required: true },
      { name: "lentils", amount: "1/2 cup yellow moong or toor dal", required: true },
      { name: "onion", amount: "1 chopped", required: false },
      { name: "tomato", amount: "1 chopped", required: false },
      { name: "garlic", amount: "3 cloves", required: false },
      { name: "ginger", amount: "1 inch minced", required: false },
      { name: "cumin", amount: "1 tsp", required: true },
      { name: "turmeric", amount: "1/2 tsp", required: true },
      { name: "butter", amount: "1 tbsp", required: true, staple: true },
      { name: "salt", amount: "1.5 tsp", required: true, staple: true }
    ],
    steps: [
      "Wash rice and lentils together and drain.",
      "Heat butter or oil in a pressure cooker or heavy pot. Add cumin seeds and let crackle.",
      "Add ginger, garlic, and onions; sauté until soft. Add chopped tomato, turmeric, and salt.",
      "Add washed rice and lentils. Add 3.5 to 4 cups of water.",
      "Pressure cook for 3-4 whistles (or simmer covered in pot for 25 mins) until soft and creamy.",
      "Drizzle a spoonful of melted butter on top before serving warm."
    ],
    tags: ["High-Protein", "Comfort Food", "Gluten-Free", "Vegetarian"],
    chefTip: "For an extra comforting texture, cook with 4 cups of water so it develops a creamy risotto-like consistency.",
    substitutions: {
      "lentils": "chickpeas, split peas, or oats"
    }
  },
  {
    id: "garlic-butter-chicken-rice",
    title: "One-Pan Garlic Butter Chicken & Rice",
    category: "Dinner",
    cuisine: "Continental",
    prepTime: 10,
    cookTime: 22,
    difficulty: "Medium",
    calories: 520,
    protein: "36g",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    description: "Juicy seared chicken breast cooked over buttery, savory garlic infused rice.",
    ingredients: [
      { name: "chicken", amount: "300g diced or breast fillets", required: true },
      { name: "rice", amount: "1 cup", required: true },
      { name: "garlic", amount: "4 cloves minced", required: true },
      { name: "butter", amount: "2 tbsp", required: true, staple: true },
      { name: "onion", amount: "1/2 diced", required: false },
      { name: "salt", amount: "to taste", required: true, staple: true },
      { name: "black pepper", amount: "to taste", required: true, staple: true },
      { name: "cooking oil", amount: "1 tbsp", required: true, staple: true }
    ],
    steps: [
      "Season chicken with salt, pepper, and 1 tsp garlic.",
      "Heat 1 tbsp oil in a skillet. Sear chicken for 3-4 minutes per side until golden; remove and set aside.",
      "In the same pan, melt butter. Add onions and remaining garlic; cook for 2 minutes.",
      "Add rinsed rice and toast for 1 minute. Add 2 cups water (or broth) and 1/2 tsp salt.",
      "Bring to simmer, nestle seared chicken into the rice, cover tightly, and cook on low for 18 minutes.",
      "Rest 5 minutes off heat, then fluff and serve."
    ],
    tags: ["High-Protein", "One-Pan", "Hearty Dinner"],
    chefTip: "The fond (browned bits) left in the pan from searing the chicken gives the rice incredible flavor!",
    substitutions: {
      "chicken": "paneer cubes, tofu, or mushrooms"
    }
  },

  // --- BREADS, TOASTS & SANDWICHES ---
  {
    id: "gourmet-grilled-cheese",
    title: "Golden Crispy Grilled Cheese Sandwich",
    category: "Snack",
    cuisine: "American",
    prepTime: 3,
    cookTime: 6,
    difficulty: "Easy",
    calories: 360,
    protein: "14g",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80",
    description: "Golden buttery, crunchy crust on the outside with molten, stretchy cheese inside.",
    ingredients: [
      { name: "bread", amount: "2 slices", required: true },
      { name: "cheese", amount: "2 slices or 1/2 cup shredded cheddar/mozzarella", required: true },
      { name: "butter", amount: "1.5 tbsp softened", required: true, staple: true },
      { name: "black pepper", amount: "a pinch", required: false, staple: true }
    ],
    steps: [
      "Spread butter evenly onto one side of each bread slice.",
      "Place one slice buttered-side-down into a cold skillet.",
      "Pile the cheese onto the bread and top with the second slice, buttered-side-facing up.",
      "Turn skillet to medium-low heat. Cook for 3-4 minutes until bottom is deep golden brown.",
      "Carefully flip and cook other side for 2-3 minutes until cheese is completely melted.",
      "Slice diagonally and enjoy the cheese pull!"
    ],
    tags: ["Quick (<15m)", "Vegetarian", "Kids Favorite"],
    chefTip: "Starting in a lukewarm skillet allows the cheese to melt fully before the bread burns.",
    substitutions: {
      "butter": "mayo (creates an exceptionally crisp exterior crust!)"
    }
  },
  {
    id: "classic-french-toast",
    title: "Custardy Cinnamon French Toast",
    category: "Breakfast",
    cuisine: "French",
    prepTime: 5,
    cookTime: 6,
    difficulty: "Easy",
    calories: 310,
    protein: "10g",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&auto=format&fit=crop&q=80",
    description: "Bread soaked in a sweet egg-and-milk custard, fried golden in sizzling butter.",
    ingredients: [
      { name: "bread", amount: "3-4 slices", required: true },
      { name: "eggs", amount: "2 large", required: true },
      { name: "milk", amount: "1/3 cup", required: true },
      { name: "sugar", amount: "1 tbsp", required: false, staple: true },
      { name: "butter", amount: "1.5 tbsp", required: true, staple: true },
      { name: "salt", amount: "tiny pinch", required: false, staple: true }
    ],
    steps: [
      "In a shallow dish, whisk together eggs, milk, sugar, and a pinch of salt.",
      "Dip each bread slice into custard for 15-20 seconds per side so it absorbs the mixture.",
      "Melt butter in a skillet over medium heat.",
      "Cook bread slices for 2-3 minutes per side until puffed, golden, and caramelized.",
      "Serve warm with honey, syrup, or fruit."
    ],
    tags: ["Sweet Breakfast", "Quick (<15m)", "Vegetarian"],
    chefTip: "Slightly stale or dry bread works best because it drinks up the custard without disintegrating.",
    substitutions: {
      "milk": "water + 1 tsp butter, oat milk, or almond milk"
    }
  },
  {
    id: "crispy-garlic-bread",
    title: "Bakery-Style Crispy Garlic Bread",
    category: "Snack",
    cuisine: "Italian",
    prepTime: 5,
    cookTime: 7,
    difficulty: "Easy",
    calories: 220,
    protein: "5g",
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?w=600&auto=format&fit=crop&q=80",
    description: "Toasty bread slathered with roasted garlic butter and herbs.",
    ingredients: [
      { name: "bread", amount: "4 slices or 1 baguette", required: true },
      { name: "garlic", amount: "3-4 cloves finely crushed", required: true },
      { name: "butter", amount: "3 tbsp softened", required: true, staple: true },
      { name: "salt", amount: "pinch", required: false, staple: true },
      { name: "cheese", amount: "grated mozzarella (optional)", required: false }
    ],
    steps: [
      "In a small bowl, mash softened butter with crushed garlic and a pinch of salt.",
      "Generously spread the garlic butter over bread slices.",
      "(Optional) Top with shredded cheese for cheesy garlic bread.",
      "Toast in a skillet on low heat covered with a lid for 4-5 minutes, or bake at 200°C (400°F) for 7 minutes until edges are crisp and golden."
    ],
    tags: ["Quick (<15m)", "Vegetarian", "Party Snack"],
    chefTip: "Rubbing the bread with a cut raw garlic clove before buttering boosts the fragrance tenfold.",
    substitutions: {
      "butter": "olive oil for garlic crostini"
    }
  },

  // --- PANCAKES & CREPES ---
  {
    id: "fluffy-basic-pancakes",
    title: "Classic Fluffy Golden Pancakes",
    category: "Breakfast",
    cuisine: "American",
    prepTime: 5,
    cookTime: 8,
    difficulty: "Easy",
    calories: 290,
    protein: "7g",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80",
    description: "Tender, pillowy, golden homemade pancakes with ingredients already in your pantry.",
    ingredients: [
      { name: "flour", amount: "1 cup all-purpose or wheat", required: true },
      { name: "milk", amount: "3/4 cup", required: true },
      { name: "eggs", amount: "1", required: true },
      { name: "sugar", amount: "1.5 tbsp", required: true, staple: true },
      { name: "butter", amount: "2 tbsp melted", required: true, staple: true },
      { name: "salt", amount: "1/4 tsp", required: true, staple: true }
    ],
    steps: [
      "In a bowl, combine flour, sugar, and salt.",
      "In another bowl, whisk egg, milk, and melted butter.",
      "Pour wet ingredients into dry ingredients. Stir gently until just combined (lumps are totally fine, don't overmix!).",
      "Heat a lightly greased skillet over medium heat.",
      "Pour 1/4 cup batter for each pancake. Cook until bubbles form on surface (approx 2 mins).",
      "Flip and cook for 1-2 minutes more until golden brown."
    ],
    tags: ["Vegetarian", "Sweet Breakfast", "Pantry Classic"],
    chefTip: "Never overmix pancake batter! Tiny lumps keep the pancakes soft and fluffy instead of rubbery.",
    substitutions: {
      "milk": "water + 1 tbsp butter, or plant milk",
      "eggs": "1/4 cup yogurt or half mashed banana"
    }
  },

  // --- POTATO DISHES ---
  {
    id: "crispy-pan-fried-potatoes",
    title: "Crispy Garlic Herb Roasted Potatoes",
    category: "Side Dish",
    cuisine: "Continental",
    prepTime: 5,
    cookTime: 15,
    difficulty: "Easy",
    calories: 210,
    protein: "4g",
    image: "https://images.unsplash.com/photo-1518013034458-30b0ee243591?w=600&auto=format&fit=crop&q=80",
    description: "Crispy browned edges with fluffy, melt-in-your-mouth potato centers.",
    ingredients: [
      { name: "potato", amount: "3 medium diced into cubes", required: true },
      { name: "cooking oil", amount: "2 tbsp", required: true, staple: true },
      { name: "garlic", amount: "3 cloves minced", required: true },
      { name: "salt", amount: "1 tsp", required: true, staple: true },
      { name: "black pepper", amount: "1/2 tsp", required: true, staple: true },
      { name: "butter", amount: "1 tbsp for finishing", required: false, staple: true }
    ],
    steps: [
      "Cut potatoes into bite-sized 1-inch cubes. Pat dry with paper towel.",
      "Heat cooking oil in a wide skillet over medium-high heat.",
      "Add potatoes in a single layer. Let them cook undisturbed for 4-5 minutes until golden underneath.",
      "Flip and continue cooking for another 8-10 minutes, stirring occasionally until fork tender and crisp.",
      "Add minced garlic, butter, salt, and pepper in the final 2 minutes so garlic doesn't burn."
    ],
    tags: ["Vegetarian", "Vegan", "Gluten-Free", "Budget-Friendly"],
    chefTip: "Drying potatoes thoroughly before adding to the hot pan is the secret to guaranteed crispiness.",
    substitutions: {
      "garlic": "garlic powder or rosemary"
    }
  },
  {
    id: "classic-mashed-potatoes",
    title: "Velvety Garlic Mashed Potatoes",
    category: "Side Dish",
    cuisine: "Continental",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Easy",
    calories: 240,
    protein: "4g",
    image: "https://images.unsplash.com/photo-1514944298352-7b003a3d2c18?w=600&auto=format&fit=crop&q=80",
    description: "Creamy, buttery mashed potatoes whipped with warm milk and roasted garlic.",
    ingredients: [
      { name: "potato", amount: "4 medium peeled and quartered", required: true },
      { name: "butter", amount: "3 tbsp", required: true, staple: true },
      { name: "milk", amount: "1/3 cup warm", required: true },
      { name: "garlic", amount: "2 cloves minced (optional)", required: false },
      { name: "salt", amount: "1 tsp", required: true, staple: true },
      { name: "black pepper", amount: "1/4 tsp", required: false, staple: true }
    ],
    steps: [
      "Place potatoes in a pot of cold salted water. Bring to a boil and cook for 15 minutes until tender when pierced with a fork.",
      "Drain thoroughly and return potatoes to the warm pot to steam off excess moisture for 1 minute.",
      "Add butter and warm milk. Mash with potato masher or fork until silky smooth.",
      "Season with salt, pepper, and optional sautéed garlic. Serve steaming hot."
    ],
    tags: ["Comfort Food", "Vegetarian", "Gluten-Free"],
    chefTip: "Always warm your milk and butter before adding them to hot potatoes so they absorb smoothly.",
    substitutions: {
      "milk": "yogurt, cream, or cooking water with extra butter"
    }
  },
  {
    id: "jeera-aloo",
    title: "Homestyle Aloo Jeera (Cumin Spiced Potatoes)",
    category: "Lunch",
    cuisine: "Indian",
    prepTime: 5,
    cookTime: 12,
    difficulty: "Easy",
    calories: 190,
    protein: "3g",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    description: "Tender potato chunks tossed with toasted cumin seeds, turmeric, and tangy seasoning.",
    ingredients: [
      { name: "potato", amount: "3 boiled and cubed", required: true },
      { name: "cumin", amount: "1.5 tsp cumin seeds", required: true },
      { name: "turmeric", amount: "1/2 tsp", required: true },
      { name: "cooking oil", amount: "1.5 tbsp", required: true, staple: true },
      { name: "chili", amount: "1 green chili chopped", required: false },
      { name: "salt", amount: "1 tsp", required: true, staple: true },
      { name: "lemon", amount: "1 tsp juice (optional)", required: false }
    ],
    steps: [
      "Heat oil in a pan over medium heat. Add cumin seeds and let them sizzle until golden brown.",
      "Add chopped green chili and turmeric powder.",
      "Add boiled potato cubes and salt. Gently toss to coat all cubes evenly in the spice-infused oil.",
      "Pan-fry on medium heat for 6-8 minutes until edges turn lightly crispy.",
      "Squeeze a dash of lemon juice on top before serving with roti, bread, or rice."
    ],
    tags: ["Vegan", "Gluten-Free", "Quick (<15m)", "Indian Staple"],
    chefTip: "Boil the potatoes ahead of time or use leftover boiled potatoes for the crispiest coating.",
    substitutions: {
      "cumin": "mustard seeds or nigella seeds"
    }
  },

  // --- CURRIES & DALS ---
  {
    id: "classic-dal-tadka",
    title: "Classic Restaurant-Style Dal Tadka",
    category: "Dinner",
    cuisine: "Indian",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Medium",
    calories: 270,
    protein: "16g",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",
    description: "Yellow lentils cooked silky smooth and tempered with sizzling ghee, garlic, and cumin.",
    ingredients: [
      { name: "lentils", amount: "1 cup yellow toor or moong dal", required: true },
      { name: "onion", amount: "1 finely chopped", required: true },
      { name: "tomato", amount: "1 chopped", required: true },
      { name: "garlic", amount: "4 cloves sliced", required: true },
      { name: "ginger", amount: "1 inch minced", required: false },
      { name: "cumin", amount: "1 tsp", required: true },
      { name: "turmeric", amount: "1/2 tsp", required: true },
      { name: "butter", amount: "2 tbsp (or ghee/oil)", required: true, staple: true },
      { name: "salt", amount: "1.5 tsp", required: true, staple: true }
    ],
    steps: [
      "Cook lentils with 3 cups water, turmeric, and 1 tsp salt in pressure cooker (3 whistles) or pot until soft.",
      "Whisk dal lightly with a spoon to make it smooth and creamy.",
      "In a small pan, heat butter or ghee. Add cumin seeds and sliced garlic; fry until golden and fragrant.",
      "Add chopped onions and sauté until golden, then add tomato and cook for 3 minutes until soft.",
      "Pour this aromatic sizzling tempering ('tadka') over the cooked dal.",
      "Stir gently and simmer for 2 minutes. Serve with hot steamed rice or flatbread."
    ],
    tags: ["High-Protein", "Vegetarian", "Indian Staple", "Gluten-Free"],
    chefTip: "Browning the sliced garlic in butter until crisp-golden gives Dal Tadka its unmistakable signature flavor.",
    substitutions: {
      "lentils": "chickpeas or red split lentils"
    }
  },
  {
    id: "quick-chana-masala",
    title: "Quick 20-Minute Chana Masala (Chickpea Curry)",
    category: "Dinner",
    cuisine: "Indian",
    prepTime: 5,
    cookTime: 15,
    difficulty: "Easy",
    calories: 320,
    protein: "15g",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?w=600&auto=format&fit=crop&q=80",
    description: "Protein-rich chickpeas simmered in an aromatic onion, ginger, garlic, and tomato gravy.",
    ingredients: [
      { name: "chickpeas", amount: "1 can (or 1.5 cups boiled)", required: true },
      { name: "onion", amount: "1 large finely diced", required: true },
      { name: "tomato", amount: "2 pureed or 1/2 can crushed", required: true },
      { name: "garlic", amount: "3 cloves minced", required: true },
      { name: "ginger", amount: "1 inch grated", required: false },
      { name: "cumin", amount: "1 tsp", required: true },
      { name: "turmeric", amount: "1/2 tsp", required: true },
      { name: "cooking oil", amount: "2 tbsp", required: true, staple: true },
      { name: "salt", amount: "1 tsp", required: true, staple: true }
    ],
    steps: [
      "Heat oil in a pan. Add cumin seeds, then sauté onions until golden brown (5 mins).",
      "Stir in minced garlic, ginger, and turmeric; cook for 1 minute.",
      "Add tomato puree and salt. Cook until oil separates from the masala gravy (4 mins).",
      "Add drained chickpeas and 1/2 cup water. Lightly mash a few chickpeas with the back of spoon to thicken sauce.",
      "Cover and simmer for 8 minutes to let flavors meld. Serve with rice or flatbread."
    ],
    tags: ["High-Protein", "Vegan", "Gluten-Free", "Pantry Hero"],
    chefTip: "Mashing just 2 tablespoons of chickpeas right into the gravy makes the sauce naturally thick and luscious.",
    substitutions: {
      "chickpeas": "black beans, kidney beans, or lentils"
    }
  },
  {
    id: "simple-homestyle-chicken-curry",
    title: "Homestyle Onion-Tomato Chicken Curry",
    category: "Dinner",
    cuisine: "Indian",
    prepTime: 10,
    cookTime: 25,
    difficulty: "Medium",
    calories: 410,
    protein: "34g",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
    description: "Tender bone-in or boneless chicken simmered in a spiced golden onion-tomato sauce.",
    ingredients: [
      { name: "chicken", amount: "400g bite-sized pieces", required: true },
      { name: "onion", amount: "2 medium finely chopped", required: true },
      { name: "tomato", amount: "2 chopped", required: true },
      { name: "garlic", amount: "4 cloves minced", required: true },
      { name: "ginger", amount: "1 inch grated", required: false },
      { name: "turmeric", amount: "1/2 tsp", required: true },
      { name: "cumin", amount: "1 tsp", required: true },
      { name: "cooking oil", amount: "2 tbsp", required: true, staple: true },
      { name: "salt", amount: "1.5 tsp", required: true, staple: true }
    ],
    steps: [
      "Heat oil in a heavy-bottomed pot. Add cumin seeds, followed by chopped onions.",
      "Sauté onions on medium heat until rich deep golden brown (approx 8 mins).",
      "Add garlic, ginger, turmeric, and chopped tomatoes. Cook until tomatoes soften and release oil.",
      "Add chicken pieces and salt. Sauté on medium-high heat for 5 minutes until chicken turns opaque.",
      "Add 1 cup of water, cover with lid, and simmer on low for 15-18 minutes until chicken is tender and juicy.",
      "Garnish with black pepper or fresh herbs and serve with rice."
    ],
    tags: ["High-Protein", "Gluten-Free", "Hearty Dinner"],
    chefTip: "The secret to an intensely flavorful curry is patiently browning the onions. Don't rush this step!",
    substitutions: {
      "chicken": "paneer, mushrooms, or boiled eggs"
    }
  },
  {
    id: "quick-paneer-bhurji",
    title: "10-Minute Paneer / Tofu Bhurji (Spiced Scramble)",
    category: "Breakfast",
    cuisine: "Indian",
    prepTime: 5,
    cookTime: 8,
    difficulty: "Easy",
    calories: 320,
    protein: "19g",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
    description: "Crumbled fresh cottage cheese or firm tofu quickly tossed with onions, tomatoes, and warm spices.",
    ingredients: [
      { name: "paneer", amount: "200g crumbled (or firm tofu)", required: true },
      { name: "onion", amount: "1 chopped", required: true },
      { name: "tomato", amount: "1 chopped", required: true },
      { name: "garlic", amount: "2 cloves minced", required: false },
      { name: "cumin", amount: "1/2 tsp", required: false },
      { name: "turmeric", amount: "1/4 tsp", required: true },
      { name: "butter", amount: "1.5 tbsp (or oil)", required: true, staple: true },
      { name: "salt", amount: "1 tsp", required: true, staple: true }
    ],
    steps: [
      "Heat butter or oil in a skillet over medium heat.",
      "Sauté onions and garlic for 3 minutes until translucent.",
      "Add chopped tomatoes, turmeric, and salt; cook for 2 minutes until tomatoes soften.",
      "Add crumbled paneer or tofu. Toss well on medium flame for 3 minutes.",
      "Don't overcook so paneer remains tender and juicy. Serve hot with toast or paratha."
    ],
    tags: ["High-Protein", "Quick (<15m)", "Vegetarian", "Keto"],
    chefTip: "Keep cooking time under 4 minutes after adding paneer, otherwise it releases water and becomes chewy.",
    substitutions: {
      "paneer": "firm tofu, eggs (for egg bhurji), or boiled potatoes"
    }
  },

  // --- SOUPS & SALADS ---
  {
    id: "creamy-roasted-tomato-soup",
    title: "Classic Creamy Tomato Soup & Croutons",
    category: "Soup",
    cuisine: "Continental",
    prepTime: 5,
    cookTime: 15,
    difficulty: "Easy",
    calories: 180,
    protein: "4g",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
    description: "Silky, comforting roasted tomato soup made with butter, garlic, and onions.",
    ingredients: [
      { name: "tomato", amount: "5 ripe chopped", required: true },
      { name: "onion", amount: "1 medium sliced", required: true },
      { name: "garlic", amount: "3 cloves crushed", required: true },
      { name: "butter", amount: "1.5 tbsp", required: true, staple: true },
      { name: "salt", amount: "1 tsp", required: true, staple: true },
      { name: "black pepper", amount: "1/2 tsp", required: true, staple: true },
      { name: "sugar", amount: "1/2 tsp", required: false, staple: true },
      { name: "bread", amount: "for croutons", required: false }
    ],
    steps: [
      "Melt butter in a soup pot. Add garlic and onion; sauté for 3 minutes until soft.",
      "Add chopped tomatoes, salt, sugar, and 1 cup water.",
      "Cover and simmer for 12 minutes until tomatoes are completely tender.",
      "Blend using an immersion blender or standard blender until silky smooth.",
      "Return to pot, season with freshly cracked black pepper, and serve with toasted bread."
    ],
    tags: ["Comfort Food", "Vegetarian", "Quick (<15m)"],
    chefTip: "Pair with a grilled cheese sandwich for the undisputed king of rainy day comfort meals.",
    substitutions: {
      "butter": "olive oil for a vegan soup"
    }
  },
  {
    id: "mediterranean-cucumber-tomato-salad",
    title: "Crisp Cucumber, Tomato & Feta Salad",
    category: "Salad",
    cuisine: "Mediterranean",
    prepTime: 7,
    cookTime: 0,
    difficulty: "Easy",
    calories: 150,
    protein: "4g",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    description: "Refreshing, crisp raw salad with diced cucumbers, sweet tomatoes, olive oil, and lemon.",
    ingredients: [
      { name: "cucumber", amount: "1 large diced", required: true },
      { name: "tomato", amount: "2 diced", required: true },
      { name: "onion", amount: "1/2 thinly sliced", required: false },
      { name: "olive oil", amount: "1.5 tbsp", required: true, staple: true },
      { name: "lemon", amount: "1 tbsp juice", required: true },
      { name: "salt", amount: "to taste", required: true, staple: true },
      { name: "black pepper", amount: "to taste", required: true, staple: true },
      { name: "cheese", amount: "feta or paneer cubes (optional)", required: false }
    ],
    steps: [
      "Wash and dice cucumber and tomatoes into bite-sized cubes.",
      "Thinly slice onion and place in a large mixing bowl with vegetables.",
      "In a small cup, whisk together olive oil, lemon juice, salt, and freshly ground black pepper.",
      "Drizzle dressing over the vegetables and toss gently.",
      "Top with crumbled cheese or herbs if available and serve fresh."
    ],
    tags: ["No-Cook", "Quick (<15m)", "Vegan-Friendly", "Healthy"],
    chefTip: "Dress the salad right before serving so cucumbers stay crunchy and don't leak excess water.",
    substitutions: {
      "lemon": "apple cider vinegar or red wine vinegar"
    }
  },

  // --- SNACKS & QUICK FIXES ---
  {
    id: "guacamole-and-chips",
    title: "Fresh Lime Guacamole & Toast",
    category: "Snack",
    cuisine: "Mexican",
    prepTime: 5,
    cookTime: 0,
    difficulty: "Easy",
    calories: 220,
    protein: "3g",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    description: "Creamy mashed ripe avocado with lime, garlic, diced onions, and salt.",
    ingredients: [
      { name: "avocado", amount: "2 ripe", required: true },
      { name: "onion", amount: "2 tbsp finely diced", required: false },
      { name: "tomato", amount: "2 tbsp seeded & diced", required: false },
      { name: "garlic", amount: "1 clove finely minced", required: false },
      { name: "lemon", amount: "1 tbsp lime or lemon juice", required: true },
      { name: "salt", amount: "1/2 tsp", required: true, staple: true },
      { name: "bread", amount: "toasted slices", required: false }
    ],
    steps: [
      "Cut avocados in half, remove pit, and scoop flesh into a bowl.",
      "Coarsely mash with a fork, keeping some texture.",
      "Fold in diced onion, tomato, garlic, lemon juice, and salt.",
      "Taste and adjust seasoning. Spread over warm toast or serve with chips."
    ],
    tags: ["No-Cook", "Vegan", "Healthy Fats", "Quick (<15m)"],
    chefTip: "Leaving the avocado slightly chunky gives it a much better mouthfeel than over-pureeing.",
    substitutions: {
      "avocado": "green peas mashed with lemon & olive oil"
    }
  },
  {
    id: "5-minute-chocolate-mug-cake",
    title: "5-Minute Molten Chocolate Mug Cake",
    category: "Dessert",
    cuisine: "Continental",
    prepTime: 3,
    cookTime: 2,
    difficulty: "Easy",
    calories: 320,
    protein: "5g",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop&q=80",
    description: "Warm, fudgy chocolate cake made in a microwave mug with basic pantry staples.",
    ingredients: [
      { name: "flour", amount: "3 tbsp", required: true },
      { name: "sugar", amount: "2 tbsp", required: true, staple: true },
      { name: "milk", amount: "3 tbsp", required: true },
      { name: "butter", amount: "1.5 tbsp melted (or oil)", required: true, staple: true },
      { name: "cocoa", amount: "1 tbsp (or chocolate piece)", required: false },
      { name: "salt", amount: "tiny pinch", required: false, staple: true }
    ],
    steps: [
      "In a microwave-safe mug, whisk together flour, sugar, cocoa (or grated chocolate), and a pinch of salt.",
      "Add milk and melted butter or oil. Stir with a small fork until completely smooth and batter forms.",
      "Microwave on high for 70 to 80 seconds.",
      "Let cool for 2 minutes before eating directly from the mug."
    ],
    tags: ["Dessert", "Quick (<15m)", "Late Night Craving", "Vegetarian"],
    chefTip: "Drop a piece of chocolate or a spoon of peanut butter into the center before microwaving for a molten core!",
    substitutions: {
      "milk": "water or coffee",
      "cocoa": "chocolate chips, hazelnut spread, or vanilla extract"
    }
  },
  {
    id: "crispy-vegetable-quesadilla",
    title: "Crispy Cheese & Veggie Quesadilla",
    category: "Snack",
    cuisine: "Mexican",
    prepTime: 5,
    cookTime: 6,
    difficulty: "Easy",
    calories: 340,
    protein: "14g",
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=600&auto=format&fit=crop&q=80",
    description: "Toasted tortilla or flatbread folded over gooey melted cheese, bell pepper, and onions.",
    ingredients: [
      { name: "tortilla", amount: "2 tortillas (or flatbread/roti)", required: true },
      { name: "cheese", amount: "1/2 cup shredded", required: true },
      { name: "onion", amount: "1/4 cup sliced", required: false },
      { name: "bell pepper", amount: "1/4 cup sliced", required: false },
      { name: "butter", amount: "1 tbsp (or oil)", required: true, staple: true },
      { name: "salt", amount: "to taste", required: false, staple: true }
    ],
    steps: [
      "Heat 1/2 tbsp butter or oil in a pan over medium heat.",
      "Place one tortilla in the pan. Sprinkle half the cheese, then vegetables, then remaining cheese.",
      "Top with the second tortilla (or fold one tortilla in half).",
      "Cook for 3 minutes until bottom is golden and crisp.",
      "Carefully flip and cook other side for 2-3 minutes until cheese is fully melted.",
      "Cut into wedges and serve with salsa or yogurt."
    ],
    tags: ["Quick (<15m)", "Vegetarian", "Comfort Food"],
    chefTip: "Putting cheese on both the top and bottom acts as the 'glue' that seals the fillings inside.",
    substitutions: {
      "tortilla": "leftover roti or flatbread"
    }
  },

  // --- CHINESE CUISINE RECIPES ---
  {
    id: "chili-garlic-noodles",
    title: "10-Minute Chili Garlic Street Noodles",
    category: "Dinner",
    cuisine: "Chinese",
    prepTime: 3,
    cookTime: 7,
    difficulty: "Easy",
    calories: 360,
    protein: "9g",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
    description: "Sizzling garlic, crushed chili, and savory soy sauce tossed with hot noodles.",
    ingredients: [
      { name: "pasta", amount: "150g (noodles or spaghetti)", required: true },
      { name: "garlic", amount: "4 cloves finely minced", required: true },
      { name: "soy sauce", amount: "2 tbsp", required: true },
      { name: "chili", amount: "1 tsp chili flakes or 1 red chili", required: true },
      { name: "cooking oil", amount: "2 tbsp", required: true, staple: true },
      { name: "sugar", amount: "1/2 tsp", required: false, staple: true },
      { name: "onion", amount: "2 tbsp sliced (scallion or onion)", required: false }
    ],
    steps: [
      "Boil noodles or pasta according to package instructions until tender. Drain and set aside.",
      "In a heatproof bowl or skillet, place minced garlic, chili flakes, and sugar.",
      "Heat 2 tbsp cooking oil until smoking hot. Carefully pour hot sizzling oil over the garlic and chili mixture to bloom the aromas.",
      "Stir in soy sauce to form a rich sauce.",
      "Toss the drained hot noodles into the chili garlic sauce until evenly coated. Garnish with sliced onion and serve!"
    ],
    tags: ["Quick (<15m)", "Vegan", "Budget-Friendly", "Chinese Classic"],
    chefTip: "Pouring screaming-hot oil directly over raw minced garlic cooks it instantly and removes raw bitterness.",
    substitutions: {
      "pasta": "ramen noodles, rice noodles, or flat pasta"
    }
  },
  {
    id: "chinese-veg-fried-rice",
    title: "Restaurant-Style Chinese Veg Fried Rice",
    category: "Lunch",
    cuisine: "Chinese",
    prepTime: 8,
    cookTime: 7,
    difficulty: "Easy",
    calories: 330,
    protein: "8g",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80",
    description: "Smoky wok-tossed cold rice with crisp carrots, bell peppers, garlic, and soy sauce.",
    ingredients: [
      { name: "rice", amount: "2 cups cooked cold rice", required: true },
      { name: "garlic", amount: "4 cloves minced", required: true },
      { name: "onion", amount: "1/2 cup diced", required: true },
      { name: "carrot", amount: "1/3 cup finely diced", required: true },
      { name: "bell pepper", amount: "1/3 cup finely diced", required: false },
      { name: "soy sauce", amount: "1.5 tbsp", required: true },
      { name: "cooking oil", amount: "2 tbsp", required: true, staple: true },
      { name: "black pepper", amount: "1/2 tsp", required: true, staple: true },
      { name: "salt", amount: "1/2 tsp", required: true, staple: true }
    ],
    steps: [
      "Heat cooking oil in a wok or large pan on high flame until very hot.",
      "Add minced garlic and onions; stir-fry rapidly for 1 minute.",
      "Add diced carrots and bell peppers; stir-fry for 2 minutes keeping veggies crisp.",
      "Add the cold cooked rice, breaking any clusters with spatula.",
      "Drizzle soy sauce, black pepper, and salt around the edges of the pan so sauce sizzles and caramelizes.",
      "Toss vigorously on high heat for 2 minutes to get that signature smoky wok aroma before serving."
    ],
    tags: ["Quick (<15m)", "Vegan", "Wok Classic", "Chinese Classic"],
    chefTip: "Keep your flame on maximum and keep tossing continuously — that's the secret to Chinese 'wok hei' smokiness!",
    substitutions: {
      "bell pepper": "green beans, cabbage, or sweet corn"
    }
  },
  {
    id: "chinese-egg-drop-soup",
    title: "Silky Chinese Egg Drop Soup",
    category: "Soup",
    cuisine: "Chinese",
    prepTime: 3,
    cookTime: 7,
    difficulty: "Easy",
    calories: 140,
    protein: "9g",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
    description: "Velvety, soothing broth with ribbons of cooked egg flowers, garlic, and ginger.",
    ingredients: [
      { name: "eggs", amount: "2 beaten", required: true },
      { name: "garlic", amount: "2 cloves minced", required: true },
      { name: "ginger", amount: "1/2 tsp grated", required: false },
      { name: "soy sauce", amount: "1 tbsp", required: true },
      { name: "water", amount: "2.5 cups", required: true, staple: true },
      { name: "black pepper", amount: "1/4 tsp", required: true, staple: true },
      { name: "salt", amount: "to taste", required: true, staple: true },
      { name: "flour", amount: "1 tsp (or cornstarch) mixed in 2 tbsp water", required: false }
    ],
    steps: [
      "In a pot, combine water, minced garlic, ginger, and soy sauce. Bring to a gentle boil.",
      "Stir in the flour/cornstarch slurry and simmer for 1-2 minutes until soup lightly thickens.",
      "Reduce heat to low. Whisk the soup in a circular whirlpool with a spoon.",
      "Slowly stream in beaten eggs while gently stirring to create delicate, silky egg ribbons.",
      "Season with salt and black pepper; turn off heat immediately and serve piping hot."
    ],
    tags: ["Quick (<15m)", "High-Protein", "Comfort Soup", "Chinese Classic"],
    chefTip: "Pour the egg in a very thin, slow stream while swirling the soup — this creates feather-light ribbons rather than dense lumps.",
    substitutions: {
      "flour": "cornstarch or arrowroot powder"
    }
  },
  {
    id: "garlic-soy-veg-stir-fry",
    title: "Crispy Garlic Soy Veggie Stir-Fry",
    category: "Dinner",
    cuisine: "Chinese",
    prepTime: 7,
    cookTime: 6,
    difficulty: "Easy",
    calories: 190,
    protein: "5g",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    description: "Vibrant bell peppers, carrots, and onions quickly stir-fried with fragrant garlic and savory soy sauce.",
    ingredients: [
      { name: "bell pepper", amount: "1 sliced", required: true },
      { name: "carrot", amount: "1 thinly sliced", required: true },
      { name: "onion", amount: "1 sliced", required: true },
      { name: "garlic", amount: "4 cloves sliced", required: true },
      { name: "soy sauce", amount: "2 tbsp", required: true },
      { name: "cooking oil", amount: "1.5 tbsp", required: true, staple: true },
      { name: "black pepper", amount: "1/2 tsp", required: true, staple: true },
      { name: "sugar", amount: "1/2 tsp", required: false, staple: true }
    ],
    steps: [
      "Slice all vegetables into uniform matchsticks or strips.",
      "Heat cooking oil in a wide skillet or wok on high heat until shimmering.",
      "Add sliced garlic and onions; sauté for 45 seconds until fragrant.",
      "Add carrots and bell peppers; toss constantly on high heat for 3-4 minutes so they stay tender-crisp.",
      "Stir in soy sauce, pinch of sugar, and black pepper. Toss for 1 minute and serve immediately with rice."
    ],
    tags: ["Quick (<15m)", "Vegan", "Gluten-Free Option", "Healthy"],
    chefTip: "Do not overcrowd the pan and cook on high heat to sear the veggies instead of steaming them.",
    substitutions: {
      "bell pepper": "broccoli, mushrooms, or baby corn"
    }
  },
  {
    id: "sweet-and-sour-paneer-tofu",
    title: "Sweet & Tangy Glazed Paneer / Tofu",
    category: "Dinner",
    cuisine: "Chinese",
    prepTime: 5,
    cookTime: 10,
    difficulty: "Easy",
    calories: 340,
    protein: "18g",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
    description: "Crispy seared cubes of paneer or tofu coated in a glossy, sweet-and-sour garlic sauce.",
    ingredients: [
      { name: "paneer", amount: "200g cubed (or firm tofu)", required: true },
      { name: "bell pepper", amount: "1 diced", required: true },
      { name: "onion", amount: "1/2 diced", required: true },
      { name: "garlic", amount: "3 cloves minced", required: true },
      { name: "soy sauce", amount: "1.5 tbsp", required: true },
      { name: "sugar", amount: "1 tbsp", required: true, staple: true },
      { name: "lemon", amount: "1 tbsp juice (or vinegar)", required: true },
      { name: "cooking oil", amount: "2 tbsp", required: true, staple: true }
    ],
    steps: [
      "Heat 1 tbsp oil in a skillet. Sear paneer or tofu cubes for 3-4 minutes until golden on all sides. Remove to plate.",
      "In the same pan, heat 1 tbsp oil. Sauté garlic, onions, and bell pepper chunks on high flame for 2 minutes.",
      "In a small bowl, whisk soy sauce, sugar, lemon juice, and 2 tbsp water.",
      "Pour sauce into the pan and let it bubble into a glossy glaze (1-2 minutes).",
      "Toss the golden paneer cubes back into the sauce until thoroughly coated. Serve hot!"
    ],
    tags: ["High-Protein", "Vegetarian", "Chinese Classic", "Quick (<15m)"],
    chefTip: "Pat paneer or tofu completely dry before searing so it forms a crisp crust that absorbs the glaze.",
    substitutions: {
      "paneer": "tofu, chicken cubes, or mushrooms"
    }
  }
];

// Supported Cuisine Categories
const CUISINE_CATEGORIES = [
  { id: "All", label: "All Cuisines", icon: "🌍" },
  { id: "Indian", label: "Indian Food", icon: "🇮🇳" },
  { id: "Italian", label: "Italian Food", icon: "🇮🇹" },
  { id: "Chinese", label: "Chinese Cuisine", icon: "🇨🇳" },
  { id: "Mexican", label: "Mexican Food", icon: "🇲🇽" },
  { id: "Continental", label: "Continental", icon: "🍽️" },
  { id: "Mediterranean", label: "Mediterranean", icon: "🥗" }
];

// Organized list of ingredient categories for the interactive pantry selector
const INGREDIENT_CATEGORIES = {
  "Proteins & Dairy": [
    { id: "eggs", label: "Eggs", icon: "🥚" },
    { id: "chicken", label: "Chicken", icon: "🍗" },
    { id: "paneer", label: "Paneer / Tofu", icon: "🧀" },
    { id: "cheese", label: "Cheese", icon: "🧀" },
    { id: "milk", label: "Milk", icon: "🥛" },
    { id: "yogurt", label: "Yogurt", icon: "🥣" },
    { id: "lentils", label: "Lentils (Dal)", icon: "🍲" },
    { id: "chickpeas", label: "Chickpeas (Chana)", icon: "🧆" }
  ],
  "Vegetables": [
    { id: "onion", label: "Onion", icon: "🧅" },
    { id: "garlic", label: "Garlic", icon: "🧄" },
    { id: "tomato", label: "Tomato", icon: "🍅" },
    { id: "potato", label: "Potato", icon: "🥔" },
    { id: "bell pepper", label: "Bell Pepper", icon: "🫑" },
    { id: "carrot", label: "Carrot", icon: "🥕" },
    { id: "ginger", label: "Ginger", icon: "🫚" },
    { id: "chili", label: "Green Chili", icon: "🌶️" },
    { id: "cucumber", label: "Cucumber", icon: "🥒" },
    { id: "avocado", label: "Avocado", icon: "🥑" }
  ],
  "Grains & Staples": [
    { id: "rice", label: "Rice", icon: "🍚" },
    { id: "pasta", label: "Pasta / Noodles", icon: "🍝" },
    { id: "bread", label: "Bread / Toast", icon: "🍞" },
    { id: "flour", label: "Flour (Atta / Maida)", icon: "🌾" },
    { id: "tortilla", label: "Tortilla / Roti", icon: "🫓" }
  ],
  "Spices & Pantry Essentials": [
    { id: "butter", label: "Butter / Ghee", icon: "🧈" },
    { id: "cooking oil", label: "Cooking Oil", icon: "🫗" },
    { id: "olive oil", label: "Olive Oil", icon: "🫒" },
    { id: "salt", label: "Salt", icon: "🧂" },
    { id: "black pepper", label: "Black Pepper", icon: "⚫" },
    { id: "cumin", label: "Cumin Seeds / Jeera", icon: "🌿" },
    { id: "turmeric", label: "Turmeric (Haldi)", icon: "🟡" },
    { id: "soy sauce", label: "Soy Sauce", icon: "🍶" },
    { id: "sugar", label: "Sugar", icon: "🍬" },
    { id: "lemon", label: "Lemon / Lime", icon: "🍋" }
  ]
};

// Database helper functions for user-added custom recipes
function getCustomRecipes() {
  try {
    const raw = localStorage.getItem("pantrychef_custom_recipes");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Error loading custom recipes", e);
    return [];
  }
}

function saveCustomRecipe(recipe) {
  try {
    const list = getCustomRecipes();
    list.unshift(recipe);
    localStorage.setItem("pantrychef_custom_recipes", JSON.stringify(list));
    return list;
  } catch (e) {
    console.warn("Error saving custom recipe", e);
    return [];
  }
}

function getAllRecipes() {
  const custom = getCustomRecipes();
  return [...custom, ...RECIPES_DATA];
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { 
    RECIPES_DATA, 
    INGREDIENT_CATEGORIES, 
    COMMON_PANTRY_STAPLES, 
    CUISINE_CATEGORIES,
    getAllRecipes, 
    getCustomRecipes, 
    saveCustomRecipe 
  };
}
