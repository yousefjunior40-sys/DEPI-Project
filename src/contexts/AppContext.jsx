import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

// ─────────────────────────────────────────────────────────────────────────────
// Seed data — loaded once on first visit
// ─────────────────────────────────────────────────────────────────────────────
function buildSeedData() {
  const users = [
  // ── Platform Admin ──────────────────────────────────────────────────────
  {
    id: 'user_admin',
    name: 'Platform Admin',
    email: 'admin@truckspot.com',
    password: 'admin123',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-01T00:00:00Z'
  },
  // ── Vendors ─────────────────────────────────────────────────────────────
  {
    id: 'user_vendor1',
    name: 'Joe Smith',
    email: 'vendor1@truckspot.com',
    password: 'vendor123',
    role: 'vendor',
    phone: '+20 100 123 4567',
    status: 'active',
    truckId: '1',
    governorate: 'Cairo',
    area: 'nasr-city',
    createdAt: '2025-01-15T00:00:00Z'
  }, {
    id: 'user_vendor2',
    name: 'Ali Hassan',
    email: 'vendor2@truckspot.com',
    password: 'vendor123',
    role: 'vendor',
    phone: '+20 100 234 5678',
    status: 'active',
    truckId: '2',
    governorate: 'Cairo',
    area: 'heliopolis',
    createdAt: '2025-01-20T00:00:00Z'
  }, {
    id: 'user_vendor3',
    name: 'Yuki Tanaka',
    email: 'vendor3@truckspot.com',
    password: 'vendor123',
    role: 'vendor',
    phone: '+20 100 345 6789',
    status: 'active',
    truckId: '3',
    governorate: 'Cairo',
    area: 'maadi',
    createdAt: '2025-02-01T00:00:00Z'
  }, {
    id: 'user_vendor4',
    name: 'Marie Dubois',
    email: 'vendor4@truckspot.com',
    password: 'vendor123',
    role: 'vendor',
    phone: '+20 100 456 7890',
    status: 'active',
    truckId: '4',
    governorate: 'Cairo',
    area: 'zamalek',
    createdAt: '2025-02-10T00:00:00Z'
  }, {
    id: 'user_vendor5',
    name: 'Mark Johnson',
    email: 'vendor5@truckspot.com',
    password: 'vendor123',
    role: 'vendor',
    phone: '+20 100 567 8901',
    status: 'active',
    truckId: '5',
    governorate: 'Cairo',
    area: 'mohandessin',
    createdAt: '2025-02-15T00:00:00Z'
  }, {
    id: 'user_vendor6',
    name: 'Nour Ahmed',
    email: 'vendor6@truckspot.com',
    password: 'vendor123',
    role: 'vendor',
    phone: '+20 100 678 9012',
    status: 'active',
    truckId: '6',
    governorate: 'Cairo',
    area: 'dokki',
    createdAt: '2025-02-20T00:00:00Z'
  },
  // ── Customers ────────────────────────────────────────────────────────────
  {
    id: 'user_customer1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'customer123',
    role: 'customer',
    phone: '+20 100 987 6543',
    status: 'active',
    governorate: 'Cairo',
    area: 'nasr-city',
    address: '15 Abbas El Akkad St, Nasr City',
    coordinates: {
      lat: 30.0669,
      lng: 31.3429
    },
    createdAt: '2025-03-01T00:00:00Z'
  }, {
    id: 'user_customer2',
    name: 'Sarah Mohamed',
    email: 'sarah@example.com',
    password: 'customer123',
    role: 'customer',
    phone: '+20 100 456 7890',
    status: 'active',
    governorate: 'Cairo',
    area: 'heliopolis',
    address: '5 Merghany St, Heliopolis',
    coordinates: {
      lat: 30.0906,
      lng: 31.319
    },
    createdAt: '2025-03-10T00:00:00Z'
  }];
  const trucks = [{
    id: '1',
    name: "Smoky Joe's BBQ",
    description: "Authentic smoked meats with homemade sauces. Our brisket has won 3 local awards.",
    cuisine: 'BBQ',
    ownerId: 'user_vendor1',
    image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=400&fit=crop'],
    rating: 4.8,
    reviewCount: 342,
    priceRange: '$$',
    isOpen: true,
    hours: '11:00 AM - 9:00 PM',
    location: 'Nasr City',
    area: 'nasr-city',
    governorate: 'Cairo',
    address: 'City Stars Mall Food Court, Omar Ibn El Khattab St',
    coordinates: {
      lat: 30.0731,
      lng: 31.3453
    },
    prepTime: 20,
    phone: '+20 100 123 4567',
    status: 'active',
    createdAt: '2025-01-15T00:00:00Z',
    menu: [{
      id: 'm1',
      name: 'Smoked Brisket Plate',
      description: '12-hour smoked brisket with coleslaw and cornbread',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&h=200&fit=crop',
      category: 'Mains',
      popular: true,
      available: true
    }, {
      id: 'm2',
      name: 'Pulled Pork Sandwich',
      description: 'Tender pulled pork with tangy BBQ sauce',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=300&h=200&fit=crop',
      category: 'Mains',
      available: true
    }, {
      id: 'm3',
      name: 'Loaded Fries',
      description: 'Fries topped with cheese, bacon, and jalapeños',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop',
      category: 'Sides',
      popular: true,
      available: true
    }, {
      id: 'm4',
      name: 'Cornbread Muffin',
      description: 'Sweet honey cornbread',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
      category: 'Sides',
      available: true
    }, {
      id: 'm5',
      name: 'Sweet Tea',
      description: 'Classic southern sweet tea',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop',
      category: 'Drinks',
      available: true
    }, {
      id: 'm6',
      name: 'Lemonade',
      description: 'Fresh-squeezed lemonade',
      price: 3.49,
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop',
      category: 'Drinks',
      available: true
    }]
  }, {
    id: '2',
    name: 'Taco Libre',
    description: 'Street-style tacos with authentic Mexican flavors. Fresh tortillas made daily.',
    cuisine: 'Mexican',
    ownerId: 'user_vendor2',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&h=400&fit=crop'],
    rating: 4.6,
    reviewCount: 218,
    priceRange: '$',
    isOpen: true,
    hours: '10:00 AM - 10:00 PM',
    location: 'Heliopolis',
    area: 'heliopolis',
    governorate: 'Cairo',
    address: 'Orouba St, Heliopolis',
    coordinates: {
      lat: 30.0906,
      lng: 31.319
    },
    prepTime: 15,
    phone: '+20 100 234 5678',
    status: 'active',
    createdAt: '2025-01-20T00:00:00Z',
    menu: [{
      id: 't1',
      name: 'Street Tacos (3)',
      description: 'Choice of carne asada, chicken, or al pastor',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop',
      category: 'Mains',
      popular: true,
      available: true
    }, {
      id: 't2',
      name: 'Burrito Supreme',
      description: 'Loaded burrito with rice, beans, and guac',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop',
      category: 'Mains',
      available: true
    }, {
      id: 't3',
      name: 'Chips & Guac',
      description: 'Fresh tortilla chips with house guacamole',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&h=200&fit=crop',
      category: 'Sides',
      available: true
    }, {
      id: 't4',
      name: 'Horchata',
      description: 'Traditional cinnamon rice drink',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=300&h=200&fit=crop',
      category: 'Drinks',
      popular: true,
      available: true
    }]
  }, {
    id: '3',
    name: 'Rolling Sushi',
    description: 'Premium sushi rolls made with the freshest fish. Omakase specials daily.',
    cuisine: 'Japanese',
    ownerId: 'user_vendor3',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop'],
    rating: 4.9,
    reviewCount: 156,
    priceRange: '$$$',
    isOpen: true,
    hours: '11:30 AM - 8:30 PM',
    location: 'Maadi',
    area: 'maadi',
    governorate: 'Cairo',
    address: 'Road 9, Maadi',
    coordinates: {
      lat: 29.9602,
      lng: 31.2569
    },
    prepTime: 25,
    phone: '+20 100 345 6789',
    status: 'active',
    createdAt: '2025-02-01T00:00:00Z',
    menu: [{
      id: 's1',
      name: 'Dragon Roll',
      description: 'Shrimp tempura, avocado, eel sauce',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
      category: 'Mains',
      popular: true,
      available: true
    }, {
      id: 's2',
      name: 'Spicy Tuna Roll',
      description: 'Fresh tuna with spicy mayo and cucumber',
      price: 13.99,
      image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=200&fit=crop',
      category: 'Mains',
      available: true
    }, {
      id: 's3',
      name: 'Edamame',
      description: 'Steamed and salted soybeans',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=300&h=200&fit=crop',
      category: 'Sides',
      available: true
    }, {
      id: 's4',
      name: 'Miso Soup',
      description: 'Traditional miso with tofu and seaweed',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=300&h=200&fit=crop',
      category: 'Sides',
      available: true
    }, {
      id: 's5',
      name: 'Green Tea',
      description: 'Hot or iced Japanese green tea',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&h=200&fit=crop',
      category: 'Drinks',
      available: true
    }]
  }, {
    id: '4',
    name: 'The Crepe Cart',
    description: 'Authentic French crepes, both sweet and savory. Made with imported French flour.',
    cuisine: 'French',
    ownerId: 'user_vendor4',
    image: 'https://images.unsplash.com/photo-1683731512622-2d18dad8999d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: ['https://images.unsplash.com/photo-1683731512622-2d18dad8999d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    rating: 4.7,
    reviewCount: 189,
    priceRange: '$$',
    isOpen: false,
    hours: '8:00 AM - 6:00 PM',
    location: 'Zamalek',
    area: 'zamalek',
    governorate: 'Cairo',
    address: '26th of July Corridor, Zamalek',
    coordinates: {
      lat: 30.0578,
      lng: 31.223
    },
    prepTime: 12,
    phone: '+20 100 456 7890',
    status: 'active',
    createdAt: '2025-02-10T00:00:00Z',
    menu: [{
      id: 'c1',
      name: 'Nutella Banana Crepe',
      description: 'Classic Nutella with fresh banana slices',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=300&h=200&fit=crop',
      category: 'Mains',
      popular: true,
      available: true
    }, {
      id: 'c2',
      name: 'Ham & Cheese Crepe',
      description: 'Savory crepe with ham, gruyère, and béchamel',
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1647563186842-64d898764d5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Mains',
      available: true
    }, {
      id: 'c3',
      name: 'Mixed Berry Crepe',
      description: 'Strawberries, blueberries, and whipped cream',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&h=200&fit=crop',
      category: 'Desserts',
      popular: true,
      available: true
    }, {
      id: 'c4',
      name: 'French Hot Chocolate',
      description: 'Rich, thick European-style hot chocolate',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=200&fit=crop',
      category: 'Drinks',
      available: true
    }]
  }, {
    id: '5',
    name: 'Burger Bus',
    description: 'Gourmet burgers with locally sourced beef. Voted #1 food truck 2025.',
    cuisine: 'American',
    ownerId: 'user_vendor5',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop'],
    rating: 4.5,
    reviewCount: 421,
    priceRange: '$$',
    isOpen: true,
    hours: '11:00 AM - 11:00 PM',
    location: 'Mohandessin',
    area: 'mohandessin',
    governorate: 'Cairo',
    address: 'Gameat El Dowal El Arabia St, Mohandessin',
    coordinates: {
      lat: 30.0548,
      lng: 31.2027
    },
    prepTime: 18,
    phone: '+20 100 567 8901',
    status: 'active',
    createdAt: '2025-02-15T00:00:00Z',
    menu: [{
      id: 'b1',
      name: 'Classic Smash Burger',
      description: 'Double smashed patties with American cheese',
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
      category: 'Mains',
      popular: true,
      available: true
    }, {
      id: 'b2',
      name: 'Truffle Mushroom Burger',
      description: 'Truffle aioli, sautéed mushrooms, Swiss cheese',
      price: 13.99,
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&h=200&fit=crop',
      category: 'Mains',
      available: true
    }, {
      id: 'b3',
      name: 'Onion Rings',
      description: 'Beer-battered crispy onion rings',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=200&fit=crop',
      category: 'Sides',
      available: true
    }, {
      id: 'b4',
      name: 'Milkshake',
      description: 'Thick vanilla, chocolate, or strawberry shake',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop',
      category: 'Drinks',
      popular: true,
      available: true
    }]
  }, {
    id: '6',
    name: 'Green Machine',
    description: 'Fresh, organic bowls and smoothies for the health-conscious foodie.',
    cuisine: 'Healthy',
    ownerId: 'user_vendor6',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop'],
    rating: 4.4,
    reviewCount: 97,
    priceRange: '$$',
    isOpen: true,
    hours: '7:00 AM - 5:00 PM',
    location: 'Dokki',
    area: 'dokki',
    governorate: 'Cairo',
    address: 'Tahrir Square Area, Dokki',
    coordinates: {
      lat: 30.0411,
      lng: 31.2108
    },
    prepTime: 10,
    phone: '+20 100 678 9012',
    status: 'active',
    createdAt: '2025-02-20T00:00:00Z',
    menu: [{
      id: 'g1',
      name: 'Açaí Bowl',
      description: 'Açaí blend topped with granola, banana, and berries',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=200&fit=crop',
      category: 'Mains',
      popular: true,
      available: true
    }, {
      id: 'g2',
      name: 'Buddha Bowl',
      description: 'Quinoa, roasted veggies, hummus, tahini dressing',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
      category: 'Mains',
      available: true
    }, {
      id: 'g3',
      name: 'Green Smoothie',
      description: 'Spinach, banana, mango, and almond milk',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=200&fit=crop',
      category: 'Drinks',
      popular: true,
      available: true
    }]
  }];
  const now = new Date().toISOString();
  const yesterday = new Date(Date.now() - 86400000).toISOString();
  const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString();
  const orders = [{
    id: 'ORD-2501-001',
    customerId: 'user_customer1',
    customerName: 'John Doe',
    customerPhone: '+20 100 987 6543',
    truckId: '1',
    truckName: "Smoky Joe's BBQ",
    vendorId: 'user_vendor1',
    orderType: 'delivery',
    items: [{
      id: 'm1',
      name: 'Smoked Brisket Plate',
      description: '12-hour smoked brisket',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&h=200&fit=crop',
      category: 'Mains',
      popular: true,
      quantity: 1,
      truckId: '1',
      truckName: "Smoky Joe's BBQ"
    }, {
      id: 'm3',
      name: 'Loaded Fries',
      description: 'Fries with toppings',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop',
      category: 'Sides',
      popular: true,
      quantity: 2,
      truckId: '1',
      truckName: "Smoky Joe's BBQ"
    }],
    subtotal: 30.97,
    deliveryFee: 2.99,
    serviceFee: 1.49,
    total: 35.45,
    status: 'delivered',
    deliveryAddress: '15 Abbas El Akkad St, Nasr City',
    paymentMethod: 'card',
    estimatedTime: '30 min',
    createdAt: twoDaysAgo,
    updatedAt: twoDaysAgo
  }, {
    id: 'ORD-2501-002',
    customerId: 'user_customer2',
    customerName: 'Sarah Mohamed',
    customerPhone: '+20 100 456 7890',
    truckId: '2',
    truckName: 'Taco Libre',
    vendorId: 'user_vendor2',
    orderType: 'delivery',
    items: [{
      id: 't1',
      name: 'Street Tacos (3)',
      description: 'Street tacos',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop',
      category: 'Mains',
      popular: true,
      quantity: 2,
      truckId: '2',
      truckName: 'Taco Libre'
    }],
    subtotal: 19.98,
    deliveryFee: 2.99,
    serviceFee: 1.49,
    total: 24.46,
    status: 'out_for_delivery',
    deliveryAddress: '5 Merghany St, Heliopolis',
    paymentMethod: 'cash',
    assignedDriverId: 'driver_2',
    estimatedTime: '15 min',
    createdAt: yesterday,
    updatedAt: yesterday
  }, {
    id: 'ORD-2501-003',
    customerId: 'user_customer1',
    customerName: 'John Doe',
    customerPhone: '+20 100 987 6543',
    truckId: '3',
    truckName: 'Rolling Sushi',
    vendorId: 'user_vendor3',
    orderType: 'delivery',
    items: [{
      id: 's1',
      name: 'Dragon Roll',
      description: 'Shrimp tempura roll',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
      category: 'Mains',
      popular: true,
      quantity: 1,
      truckId: '3',
      truckName: 'Rolling Sushi'
    }, {
      id: 's3',
      name: 'Edamame',
      description: 'Steamed soybeans',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=300&h=200&fit=crop',
      category: 'Sides',
      quantity: 1,
      truckId: '3',
      truckName: 'Rolling Sushi'
    }],
    subtotal: 20.98,
    deliveryFee: 2.99,
    serviceFee: 1.49,
    total: 25.46,
    status: 'preparing',
    deliveryAddress: '15 Abbas El Akkad St, Nasr City',
    paymentMethod: 'card',
    estimatedTime: '25 min',
    createdAt: now,
    updatedAt: now
  }];
  const reviews = [{
    id: 'rev_001',
    orderId: 'ORD-2501-001',
    truckId: '1',
    customerId: 'user_customer1',
    customerName: 'John Doe',
    rating: 5,
    comment: "Absolutely incredible brisket! The 12-hour smoke really shows — tender, juicy, and full of flavor. Loaded fries were amazing too. Will definitely be back!",
    vendorReply: "Thank you so much, John! We pour our heart into every smoke session. See you next time! 🔥",
    createdAt: twoDaysAgo
  }, {
    id: 'rev_002',
    orderId: 'ORD-2501-002',
    truckId: '2',
    customerId: 'user_customer2',
    customerName: 'Sarah Mohamed',
    rating: 4,
    comment: 'Great tacos with authentic flavors. The horchata was refreshing. Delivery was a bit slow but the food made up for it.',
    createdAt: yesterday
  }];
  const drivers = [{
    id: 'driver_1',
    name: 'Ahmed Hassan',
    phone: '+20 100 111 2222',
    status: 'available',
    vehicleType: 'Motorbike'
  }, {
    id: 'driver_2',
    name: 'Mohamed Ali',
    phone: '+20 100 333 4444',
    status: 'on_delivery',
    currentOrderId: 'ORD-2501-002',
    vehicleType: 'Motorbike'
  }, {
    id: 'driver_3',
    name: 'Omar Khaled',
    phone: '+20 100 555 6666',
    status: 'available',
    vehicleType: 'Car'
  }];
  return {
    users,
    trucks,
    orders,
    reviews,
    drivers,
    notifications: []
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Context Definition
// ─────────────────────────────────────────────────────────────────────────────
const DATA_KEY = 'truckspot_v1_data';
const AUTH_KEY = 'truckspot_v1_auth';
function loadData() {
  const seed = buildSeedData();
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.users) && Array.isArray(parsed.trucks) && Array.isArray(parsed.orders) && Array.isArray(parsed.reviews) && Array.isArray(parsed.drivers)) {
        // Graceful migration: add notifications if missing
        if (!Array.isArray(parsed.notifications)) {
          parsed.notifications = [];
        }

        // Migrate Crepe Cart image if it uses the old broken URL or is empty
        let migrated = false;
        parsed.trucks = parsed.trucks.map(truck => {
          if (truck.id === '4') {
            let updatedTruck = {
              ...truck
            };
            if (truck.image.includes('photo-1496280307390') || truck.image.includes('photo-1519676867240') || !truck.image) {
              migrated = true;
              updatedTruck.image = 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=600&h=400&q=80';
              updatedTruck.images = ['https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=600&h=400&q=80'];
            }
            if (Array.isArray(truck.menu)) {
              updatedTruck.menu = truck.menu.map(menuItem => {
                if (menuItem.id === 'c2' && (menuItem.image.includes('photo-1647563186842') || menuItem.image.includes('photo-1522764725576') || !menuItem.image)) {
                  migrated = true;
                  return {
                    ...menuItem,
                    image: 'https://images.unsplash.com/photo-1621303837875-09b9d3e89657?auto=format&fit=crop&w=600&h=400&q=80'
                  };
                }
                return menuItem;
              });
            }
            return updatedTruck;
          }
          return truck;
        });
        if (migrated) {
          localStorage.setItem(DATA_KEY, JSON.stringify(parsed));
        }
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
  }
  localStorage.setItem(DATA_KEY, JSON.stringify(seed));
  return seed;
}
function loadUserId() {
  return localStorage.getItem(AUTH_KEY);
}
// We need CartItem type here

const AppContext = createContext(undefined);
export const AppProvider = ({
  children
}) => {
  const [data, setData] = useState(() => loadData());
  const [currentUserId, setCurrentUserId] = useState(() => loadUserId());
  const currentUser = currentUserId ? data.users.find(u => u.id === currentUserId) ?? null : null;

  // Persist data to localStorage whenever it changes
  const updateData = useCallback(updater => {
    setData(prev => {
      const next = updater(prev);
      localStorage.setItem(DATA_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // Synchronize state across multiple open tabs/windows
  useEffect(() => {
    const handleStorage = e => {
      if (e.key === DATA_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setData(parsed);
        } catch (err) {
          console.error("Error parsing synced data from localStorage:", err);
        }
      }
      if (e.key === AUTH_KEY) {
        setCurrentUserId(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Initialize processed notifications to prevent duplicate toasts for historical alerts
  const processedNotifIds = useRef(new Set());
  useEffect(() => {
    if (data.notifications) {
      data.notifications.forEach(n => {
        processedNotifIds.current.add(n.id);
      });
    }
  }, []);

  // Toast observer for the active logged-in user
  useEffect(() => {
    if (!currentUserId || !data.notifications) return;
    data.notifications.forEach(n => {
      if (n.userId === currentUserId && !n.read && !processedNotifIds.current.has(n.id)) {
        processedNotifIds.current.add(n.id);
        // Trigger a fresh toast notification for this user
        toast.info(n.message);
      } else {
        processedNotifIds.current.add(n.id);
      }
    });
  }, [data.notifications, currentUserId]);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const login = useCallback((email, password) => {
    const emailClean = email.trim().toLowerCase();
    const user = data.users.find(u => u.email.trim().toLowerCase() === emailClean);
    if (!user) {
      return {
        success: false,
        error: 'Email does not exist.'
      };
    }
    if (user.password !== password) {
      return {
        success: false,
        error: 'Incorrect password.'
      };
    }
    if (user.status === 'banned') {
      return {
        success: false,
        error: 'This account has been suspended.'
      };
    }
    localStorage.setItem(AUTH_KEY, user.id);
    setCurrentUserId(user.id);
    return {
      success: true
    };
  }, [data.users]);
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setCurrentUserId(null);
  }, []);
  const register = useCallback(form => {
    const exists = data.users.some(u => u.email.toLowerCase() === form.email.toLowerCase());
    if (exists) return {
      success: false,
      error: 'An account with this email already exists.'
    };
    const userId = `user_${Date.now()}`;
    const now = new Date().toISOString();
    let newUser = {
      id: userId,
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role === 'vendor' ? 'vendor' : 'customer',
      phone: form.phone,
      status: form.role === 'vendor' ? 'pending_approval' : 'active',
      governorate: form.governorate ?? 'Cairo',
      area: form.area ?? '',
      address: form.address ?? '',
      createdAt: now
    };
    let newTruck = null;
    if (form.role === 'vendor') {
      const truckId = `truck_${Date.now()}`;
      newUser = {
        ...newUser,
        truckId
      };
      newTruck = {
        id: truckId,
        name: form.truckName ?? 'My Food Truck',
        description: form.truckDescription ?? '',
        cuisine: form.truckCuisine ?? 'Various',
        ownerId: userId,
        image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600&h=400&fit=crop',
        images: [],
        rating: 0,
        reviewCount: 0,
        priceRange: '$$',
        isOpen: false,
        hours: form.truckHours ?? '9:00 AM - 9:00 PM',
        location: form.truckArea ?? '',
        area: form.truckArea ?? '',
        governorate: 'Cairo',
        address: form.truckAddress ?? '',
        coordinates: {
          lat: 30.0444,
          lng: 31.2357
        },
        // Default: Cairo center
        prepTime: 20,
        phone: form.truckPhone ?? form.phone ?? '',
        menu: [],
        status: 'pending',
        createdAt: now
      };
    }
    updateData(prev => ({
      ...prev,
      users: [...prev.users, newUser],
      trucks: newTruck ? [...prev.trucks, newTruck] : prev.trucks
    }));

    // Auto-login
    localStorage.setItem(AUTH_KEY, userId);
    setCurrentUserId(userId);
    return {
      success: true
    };
  }, [data.users, updateData]);
  const updateProfile = useCallback((userId, updates) => {
    updateData(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === userId ? {
        ...u,
        ...updates
      } : u)
    }));
  }, [updateData]);

  // ── Trucks ─────────────────────────────────────────────────────────────────
  const updateTruck = useCallback((id, updates) => {
    updateData(prev => ({
      ...prev,
      trucks: prev.trucks.map(t => t.id === id ? {
        ...t,
        ...updates
      } : t)
    }));
  }, [updateData]);
  const approveTruck = useCallback(id => {
    updateData(prev => {
      const truck = prev.trucks.find(t => t.id === id);
      if (!truck) return prev;
      const updatedTrucks = prev.trucks.map(t => t.id === id ? {
        ...t,
        status: 'active'
      } : t);
      const updatedUsers = prev.users.map(u => u.truckId === id ? {
        ...u,
        status: 'active'
      } : u);
      return {
        ...prev,
        trucks: updatedTrucks,
        users: updatedUsers
      };
    });
  }, [updateData]);
  const rejectTruck = useCallback(id => {
    updateData(prev => ({
      ...prev,
      trucks: prev.trucks.map(t => t.id === id ? {
        ...t,
        status: 'rejected'
      } : t)
    }));
  }, [updateData]);
  const suspendTruck = useCallback(id => {
    updateData(prev => ({
      ...prev,
      trucks: prev.trucks.map(t => t.id === id ? {
        ...t,
        status: 'suspended',
        isOpen: false
      } : t)
    }));
  }, [updateData]);
  const deleteTruck = useCallback(id => {
    updateData(prev => ({
      ...prev,
      trucks: prev.trucks.filter(t => t.id !== id)
    }));
  }, [updateData]);
  const addTruckMenuItem = useCallback((truckId, item) => {
    const newItem = {
      ...item,
      id: `item_${Date.now()}`,
      available: true
    };
    updateData(prev => ({
      ...prev,
      trucks: prev.trucks.map(t => t.id === truckId ? {
        ...t,
        menu: [...t.menu, newItem]
      } : t)
    }));
  }, [updateData]);
  const updateTruckMenuItem = useCallback((truckId, itemId, updates) => {
    updateData(prev => ({
      ...prev,
      trucks: prev.trucks.map(t => t.id === truckId ? {
        ...t,
        menu: t.menu.map(m => m.id === itemId ? {
          ...m,
          ...updates
        } : m)
      } : t)
    }));
  }, [updateData]);
  const deleteTruckMenuItem = useCallback((truckId, itemId) => {
    updateData(prev => ({
      ...prev,
      trucks: prev.trucks.map(t => t.id === truckId ? {
        ...t,
        menu: t.menu.filter(m => m.id !== itemId)
      } : t)
    }));
  }, [updateData]);

  // ── Orders ─────────────────────────────────────────────────────────────────
  const createOrder = useCallback(payload => {
    const now = new Date().toISOString();
    const order = {
      ...payload,
      id: `ORD-${Date.now()}`,
      status: 'pending',
      estimatedTime: '25-35 min',
      createdAt: now,
      updatedAt: now
    };
    updateData(prev => {
      const nextOrders = [...prev.orders, order];
      const truck = prev.trucks.find(t => t.id === order.truckId);
      const ownerId = truck?.ownerId;
      const nextNotifs = [...prev.notifications];

      // Always notify the truck owner
      if (ownerId) {
        nextNotifs.unshift({
          id: `notif_${Date.now()}_vendor_${Math.random().toString(36).slice(2, 6)}`,
          userId: ownerId,
          message: `New ${order.orderType} order ${order.id} received from ${order.customerName}!`,
          type: 'order',
          read: false,
          createdAt: now,
          orderId: order.id,
          link: `/vendor/orders`
        });
      }

      // Notify admin only for delivery orders (admin coordinates delivery)
      if (order.orderType === 'delivery') {
        const admins = prev.users.filter(u => u.role === 'admin');
        admins.forEach(admin => {
          nextNotifs.unshift({
            id: `notif_${Date.now()}_admin_${Math.random().toString(36).slice(2, 6)}`,
            userId: admin.id,
            message: `New delivery order ${order.id} placed for ${order.truckName}. Requires delivery coordination.`,
            type: 'order',
            read: false,
            createdAt: now,
            orderId: order.id,
            link: `/platform-admin/orders`
          });
        });
      }
      toast.success(order.orderType === 'pickup' ? `Pickup order placed! The truck owner will start preparing.` : `Delivery order placed! Pending acceptance.`);
      return {
        ...prev,
        orders: nextOrders,
        notifications: nextNotifs
      };
    });
    return order;
  }, [updateData]);
  const updateOrderStatus = useCallback((orderId, status) => {
    updateData(prev => {
      const order = prev.orders.find(o => o.id === orderId);
      if (!order) return prev;
      const now = new Date().toISOString();
      const nextOrders = prev.orders.map(o => o.id === orderId ? {
        ...o,
        status,
        updatedAt: now
      } : o);
      const nextNotifs = [...prev.notifications];

      // Notify customer on status update
      nextNotifs.unshift({
        id: `notif_${Date.now()}_status_${Math.random().toString(36).slice(2, 6)}`,
        userId: order.customerId,
        message: `Your order ${order.id} has been ${status === 'accepted' ? 'accepted' : status.replace("_", " ")}!`,
        type: 'order',
        read: false,
        createdAt: now,
        orderId: order.id,
        link: `/order/${order.id}`
      });

      // Notify vendor if admin accepted/cancelled
      const truck = prev.trucks.find(t => t.id === order.truckId);
      if (truck && (status === 'accepted' || status === 'cancelled')) {
        nextNotifs.unshift({
          id: `notif_${Date.now()}_vendor_${Math.random().toString(36).slice(2, 6)}`,
          userId: truck.ownerId,
          message: `Order ${order.id} has been ${status} by admin.`,
          type: 'order',
          read: false,
          createdAt: now,
          orderId: order.id,
          link: `/vendor/orders`
        });
      }
      if (status === 'accepted') {
        toast.success(`Order ${order.id} accepted! Auto-tracking has started.`);
      } else if (status === 'cancelled') {
        toast.error(`Order ${order.id} has been cancelled.`);
      } else {
        toast.info(`Order ${order.id} is now ${status.replace("_", " ")}`);
      }
      return {
        ...prev,
        orders: nextOrders,
        notifications: nextNotifs
      };
    });
  }, [updateData]);
  const assignDriver = useCallback((orderId, driverId) => {
    updateData(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === orderId ? {
        ...o,
        assignedDriverId: driverId,
        updatedAt: new Date().toISOString()
      } : o),
      drivers: prev.drivers.map(d => d.id === driverId ? {
        ...d,
        status: 'on_delivery',
        currentOrderId: orderId
      } : d)
    }));
  }, [updateData]);
  const createReview = useCallback(payload => {
    updateData(prev => {
      const existingIndex = prev.reviews.findIndex(r => r.orderId === payload.orderId);
      let updatedReviews = [...prev.reviews];
      const now = new Date().toISOString();
      if (existingIndex >= 0) {
        updatedReviews[existingIndex] = {
          ...updatedReviews[existingIndex],
          rating: payload.rating,
          comment: payload.comment,
          createdAt: now
        };
      } else {
        const newReview = {
          ...payload,
          id: `rev_${Date.now()}`,
          createdAt: now
        };
        updatedReviews.push(newReview);
      }
      const truckReviews = updatedReviews.filter(r => r.truckId === payload.truckId);
      const avgRating = truckReviews.length > 0 ? truckReviews.reduce((sum, r) => sum + r.rating, 0) / truckReviews.length : 0;
      return {
        ...prev,
        reviews: updatedReviews,
        trucks: prev.trucks.map(t => t.id === payload.truckId ? {
          ...t,
          rating: Math.round(avgRating * 10) / 10,
          reviewCount: truckReviews.length
        } : t)
      };
    });
  }, [updateData]);
  const replyToReview = useCallback((reviewId, reply) => {
    updateData(prev => ({
      ...prev,
      reviews: prev.reviews.map(r => r.id === reviewId ? {
        ...r,
        vendorReply: reply
      } : r)
    }));
  }, [updateData]);

  // ── Users (admin) ──────────────────────────────────────────────────────────
  const banUser = useCallback(userId => {
    updateData(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === userId ? {
        ...u,
        status: 'banned'
      } : u)
    }));
  }, [updateData]);
  const unbanUser = useCallback(userId => {
    updateData(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === userId ? {
        ...u,
        status: 'active'
      } : u)
    }));
  }, [updateData]);
  const deleteUser = useCallback(userId => {
    updateData(prev => ({
      ...prev,
      users: prev.users.filter(u => u.id !== userId)
    }));
  }, [updateData]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const getTruck = useCallback(id => data.trucks.find(t => t.id === id), [data.trucks]);
  const getVendorTruck = useCallback(vendorId => data.trucks.find(t => t.ownerId === vendorId), [data.trucks]);
  const getOrder = useCallback(id => data.orders.find(o => o.id === id), [data.orders]);
  const getCustomerOrders = useCallback(customerId => data.orders.filter(o => o.customerId === customerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [data.orders]);
  const getTruckOrders = useCallback(truckId => data.orders.filter(o => o.truckId === truckId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [data.orders]);
  const getTruckReviews = useCallback(truckId => data.reviews.filter(r => r.truckId === truckId), [data.reviews]);
  const getUserById = useCallback(id => data.users.find(u => u.id === id), [data.users]);
  const getDriver = useCallback(id => data.drivers.find(d => d.id === id), [data.drivers]);

  // ── Notifications ──────────────────────────────────────────────────────────
  const addNotification = useCallback(n => {
    const notification = {
      ...n,
      id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    updateData(prev => ({
      ...prev,
      notifications: [notification, ...prev.notifications]
    }));
  }, [updateData]);
  const markNotificationRead = useCallback(id => {
    updateData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? {
        ...n,
        read: true
      } : n)
    }));
  }, [updateData]);
  const markAllNotificationsRead = useCallback(userId => {
    updateData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.userId === userId ? {
        ...n,
        read: true
      } : n)
    }));
  }, [updateData]);
  const getUserNotifications = useCallback(userId => data.notifications.filter(n => n.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [data.notifications]);

  // ── Add Driver ─────────────────────────────────────────────────────────────
  const addDriver = useCallback(driver => {
    const newDriver = {
      ...driver,
      id: `driver_${Date.now()}`
    };
    updateData(prev => ({
      ...prev,
      drivers: [...prev.drivers, newDriver]
    }));
  }, [updateData]);

  // ── Order Auto-Progression ─────────────────────────────────────────────────
  const toastQueueRef = useRef([]);
  useEffect(() => {
    const interval = setInterval(() => {
      updateData(prev => {
        const now = Date.now();
        let changed = false;
        const nextNotifs = [...prev.notifications];
        const nowStr = new Date().toISOString();
        const pendingToasts = [];
        const orders = prev.orders.map(order => {
          if (['cancelled', 'delivered', 'pending'].includes(order.status)) return order;
          if (order.orderType === 'pickup' && order.status === 'ready') return order;
          const elapsed = now - new Date(order.updatedAt).getTime();
          const truck = prev.trucks.find(t => t.id === order.truckId);
          const prepMs = (truck?.prepTime ?? 20) * 60 * 1000;
          let newStatus = order.status;
          let estimatedTime = order.estimatedTime;
          if (order.status === 'accepted' && elapsed > 15000) {
            newStatus = 'preparing';
            const mins = Math.ceil(prepMs / 60000);
            estimatedTime = `${mins} min`;
          } else if (order.status === 'preparing' && elapsed > prepMs) {
            newStatus = 'ready';
            estimatedTime = order.orderType === 'pickup' ? 'Ready' : '5 min';
          } else if (order.status === 'ready' && elapsed > 60000 && order.orderType !== 'pickup') {
            newStatus = 'out_for_delivery';
            estimatedTime = '10-15 min';
          } else if (order.status === 'out_for_delivery' && elapsed > 180000 && order.orderType !== 'pickup') {
            newStatus = 'delivered';
            estimatedTime = undefined;
          }
          if (newStatus !== order.status) {
            changed = true;

            // Notify customer in notification center
            nextNotifs.unshift({
              id: `notif_${Date.now()}_prog_${Math.random().toString(36).slice(2, 6)}`,
              userId: order.customerId,
              message: `Your order ${order.id} status is now: ${newStatus.replace("_", " ")}!`,
              type: 'order',
              read: false,
              createdAt: nowStr,
              orderId: order.id,
              link: `/order/${order.id}`
            });

            // Notify vendor on key transitions (ready, delivered)
            if (truck && (newStatus === 'ready' || newStatus === 'delivered')) {
              nextNotifs.unshift({
                id: `notif_${Date.now()}_vprog_${Math.random().toString(36).slice(2, 6)}`,
                userId: truck.ownerId,
                message: `Order ${order.id} is now ${newStatus === 'ready' ? 'ready for pickup' : 'delivered'}!`,
                type: 'order',
                read: false,
                createdAt: nowStr,
                orderId: order.id,
                link: `/vendor/orders`
              });
            }

            // Queue toast for display after state update
            const statusLabels = {
              preparing: '👨‍🍳 Your food is being prepared',
              ready: '📦 Order is ready for pickup',
              out_for_delivery: '🚚 Order is on the way',
              delivered: '🎉 Order delivered!'
            };
            pendingToasts.push(statusLabels[newStatus] || `Order ${order.id} is now ${newStatus.replace("_", " ")}`);
            return {
              ...order,
              status: newStatus,
              estimatedTime,
              updatedAt: nowStr
            };
          }
          return order;
        });
        if (changed) {
          toastQueueRef.current = pendingToasts;
        }
        return changed ? {
          ...prev,
          orders,
          notifications: nextNotifs
        } : prev;
      });

      // Fire queued toasts outside of state updater
      if (toastQueueRef.current.length > 0) {
        toastQueueRef.current.forEach(msg => toast.info(msg));
        toastQueueRef.current = [];
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [updateData]);
  const value = {
    currentUser,
    data,
    login,
    logout,
    register,
    updateProfile,
    updateTruck,
    approveTruck,
    rejectTruck,
    suspendTruck,
    deleteTruck,
    addTruckMenuItem,
    updateTruckMenuItem,
    deleteTruckMenuItem,
    createOrder,
    updateOrderStatus,
    assignDriver,
    createReview,
    replyToReview,
    banUser,
    unbanUser,
    deleteUser,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    getUserNotifications,
    addDriver,
    getTruck,
    getVendorTruck,
    getOrder,
    getCustomerOrders,
    getTruckOrders,
    getTruckReviews,
    getUserById,
    getDriver
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};