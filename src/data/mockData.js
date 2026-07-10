export const categories = [{
  id: "burger",
  name: "Burgers",
  icon: "🍔"
}, {
  id: "pizza",
  name: "Pizza",
  icon: "🍕"
}, {
  id: "crepes",
  name: "Crepes",
  icon: "🥞"
}, {
  id: "drinks",
  name: "Drinks",
  icon: "🥤"
}, {
  id: "tacos",
  name: "Tacos",
  icon: "🌮"
}, {
  id: "sushi",
  name: "Sushi",
  icon: "🍣"
}, {
  id: "dessert",
  name: "Desserts",
  icon: "🍩"
}, {
  id: "healthy",
  name: "Healthy",
  icon: "🥗"
}];
export const foodTrucks = [{
  id: "1",
  name: "Smoky Joe's BBQ",
  image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600&h=400&fit=crop",
  cuisine: "BBQ",
  rating: 4.8,
  reviewCount: 342,
  distance: "0.3 mi",
  priceRange: "$$",
  isOpen: true,
  hours: "11:00 AM - 9:00 PM",
  location: "Downtown Food Park",
  description: "Authentic smoked meats with homemade sauces. Our brisket has won 3 local awards.",
  menu: [{
    id: "m1",
    name: "Smoked Brisket Plate",
    description: "12-hour smoked brisket with coleslaw and cornbread",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&h=200&fit=crop",
    category: "Mains",
    popular: true
  }, {
    id: "m2",
    name: "Pulled Pork Sandwich",
    description: "Tender pulled pork with tangy BBQ sauce",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=300&h=200&fit=crop",
    category: "Mains"
  }, {
    id: "m3",
    name: "Loaded Fries",
    description: "Fries topped with cheese, bacon, and jalapeños",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop",
    category: "Sides",
    popular: true
  }, {
    id: "m4",
    name: "Cornbread Muffin",
    description: "Sweet honey cornbread",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
    category: "Sides"
  }, {
    id: "m5",
    name: "Sweet Tea",
    description: "Classic southern sweet tea",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop",
    category: "Drinks"
  }, {
    id: "m6",
    name: "Lemonade",
    description: "Fresh-squeezed lemonade",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
    category: "Drinks"
  }]
}, {
  id: "2",
  name: "Taco Libre",
  image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&h=400&fit=crop",
  cuisine: "Mexican",
  rating: 4.6,
  reviewCount: 218,
  distance: "0.5 mi",
  priceRange: "$",
  isOpen: true,
  hours: "10:00 AM - 10:00 PM",
  location: "Main Street Market",
  description: "Street-style tacos with authentic Mexican flavors. Fresh tortillas made daily.",
  menu: [{
    id: "t1",
    name: "Street Tacos (3)",
    description: "Choice of carne asada, chicken, or al pastor",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop",
    category: "Mains",
    popular: true
  }, {
    id: "t2",
    name: "Burrito Supreme",
    description: "Loaded burrito with rice, beans, and guac",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop",
    category: "Mains"
  }, {
    id: "t3",
    name: "Chips & Guac",
    description: "Fresh tortilla chips with house guacamole",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&h=200&fit=crop",
    category: "Sides"
  }, {
    id: "t4",
    name: "Horchata",
    description: "Traditional cinnamon rice drink",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=300&h=200&fit=crop",
    category: "Drinks",
    popular: true
  }]
}, {
  id: "3",
  name: "Rolling Sushi",
  image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop",
  cuisine: "Japanese",
  rating: 4.9,
  reviewCount: 156,
  distance: "0.8 mi",
  priceRange: "$$$",
  isOpen: true,
  hours: "11:30 AM - 8:30 PM",
  location: "Harbor Walk",
  description: "Premium sushi rolls made with the freshest fish. Omakase specials daily.",
  menu: [{
    id: "s1",
    name: "Dragon Roll",
    description: "Shrimp tempura, avocado, eel sauce",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
    category: "Mains",
    popular: true
  }, {
    id: "s2",
    name: "Spicy Tuna Roll",
    description: "Fresh tuna with spicy mayo and cucumber",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=200&fit=crop",
    category: "Mains"
  }, {
    id: "s3",
    name: "Edamame",
    description: "Steamed and salted soybeans",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=300&h=200&fit=crop",
    category: "Sides"
  }, {
    id: "s4",
    name: "Miso Soup",
    description: "Traditional miso with tofu and seaweed",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=300&h=200&fit=crop",
    category: "Sides"
  }, {
    id: "s5",
    name: "Green Tea",
    description: "Hot or iced Japanese green tea",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&h=200&fit=crop",
    category: "Drinks"
  }]
}, {
  id: "4",
  name: "The Crepe Cart",
  image: "https://images.unsplash.com/photo-1623654692924-886bd4f0b9ee?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  cuisine: "French",
  rating: 4.7,
  reviewCount: 189,
  distance: "1.2 mi",
  priceRange: "$$",
  isOpen: false,
  hours: "8:00 AM - 6:00 PM",
  location: "University Square",
  description: "Authentic French crepes, both sweet and savory. Made with imported French flour.",
  menu: [{
    id: "c1",
    name: "Nutella Banana Crepe",
    description: "Classic Nutella with fresh banana slices",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=300&h=200&fit=crop",
    category: "Mains",
    popular: true
  }, {
    id: "c2",
    name: "Ham & Cheese Crepe",
    description: "Savory crepe with ham, gruyère, and béchamel",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1647563186842-64d898764d5e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Mains"
  }, {
    id: "c3",
    name: "Mixed Berry Crepe",
    description: "Strawberries, blueberries, and whipped cream",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&h=200&fit=crop",
    category: "Desserts",
    popular: true
  }, {
    id: "c4",
    name: "French Hot Chocolate",
    description: "Rich, thick European-style hot chocolate",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=200&fit=crop",
    category: "Drinks"
  }]
}, {
  id: "5",
  name: "Burger Bus",
  image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop",
  cuisine: "American",
  rating: 4.5,
  reviewCount: 421,
  distance: "0.6 mi",
  priceRange: "$$",
  isOpen: true,
  hours: "11:00 AM - 11:00 PM",
  location: "Central Park South",
  description: "Gourmet burgers with locally sourced beef. Voted #1 food truck 2025.",
  menu: [{
    id: "b1",
    name: "Classic Smash Burger",
    description: "Double smashed patties with American cheese",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
    category: "Mains",
    popular: true
  }, {
    id: "b2",
    name: "Truffle Mushroom Burger",
    description: "Truffle aioli, sautéed mushrooms, Swiss cheese",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&h=200&fit=crop",
    category: "Mains"
  }, {
    id: "b3",
    name: "Onion Rings",
    description: "Beer-battered crispy onion rings",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=200&fit=crop",
    category: "Sides"
  }, {
    id: "b4",
    name: "Milkshake",
    description: "Thick vanilla, chocolate, or strawberry shake",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop",
    category: "Drinks",
    popular: true
  }]
}, {
  id: "6",
  name: "Green Machine",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  cuisine: "Healthy",
  rating: 4.4,
  reviewCount: 97,
  distance: "1.0 mi",
  priceRange: "$$",
  isOpen: true,
  hours: "7:00 AM - 5:00 PM",
  location: "Riverside Walk",
  description: "Fresh, organic bowls and smoothies for the health-conscious foodie.",
  menu: [{
    id: "g1",
    name: "Açaí Bowl",
    description: "Açaí blend topped with granola, banana, and berries",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=200&fit=crop",
    category: "Mains",
    popular: true
  }, {
    id: "g2",
    name: "Buddha Bowl",
    description: "Quinoa, roasted veggies, hummus, tahini dressing",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
    category: "Mains"
  }, {
    id: "g3",
    name: "Green Smoothie",
    description: "Spinach, banana, mango, and almond milk",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=200&fit=crop",
    category: "Drinks",
    popular: true
  }]
}];
export const sampleOrders = [{
  id: "ORD-001",
  items: [{
    ...foodTrucks[0].menu[0],
    quantity: 1,
    truckId: "1",
    truckName: "Smoky Joe's BBQ"
  }, {
    ...foodTrucks[0].menu[2],
    quantity: 2,
    truckId: "1",
    truckName: "Smoky Joe's BBQ"
  }],
  total: 30.97,
  status: "delivered",
  estimatedTime: "25 min",
  date: "2026-03-07",
  truckName: "Smoky Joe's BBQ"
}, {
  id: "ORD-002",
  items: [{
    ...foodTrucks[1].menu[0],
    quantity: 2,
    truckId: "2",
    truckName: "Taco Libre"
  }],
  total: 19.98,
  status: "on-the-way",
  estimatedTime: "10 min",
  date: "2026-03-08",
  truckName: "Taco Libre"
}];