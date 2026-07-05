// Raw seed definitions — no IDs are included because they are created at seed time

export const sampleCategoryNames = [
  'Coffee', 'Tea', 'Pastries', 'Sandwiches', 'Smoothies', 'Snacks'
]

export const sampleProductDefs = [
  { name: 'Espresso',          category: 'Coffee',     price: 90,  available: true },
  { name: 'Cappuccino',        category: 'Coffee',     price: 140, available: true },
  { name: 'Latte',             category: 'Coffee',     price: 150, available: true },
  { name: 'Americano',         category: 'Coffee',     price: 110, available: true },
  { name: 'Green Tea',         category: 'Tea',        price: 80,  available: true },
  { name: 'Masala Chai',       category: 'Tea',        price: 85,  available: true },
  { name: 'Croissant',         category: 'Pastries',   price: 70,  available: true },
  { name: 'Blueberry Muffin',  category: 'Pastries',   price: 65,  available: true },
  { name: 'Veg Sandwich',      category: 'Sandwiches', price: 120, available: true },
  { name: 'Chicken Sandwich',  category: 'Sandwiches', price: 160, available: true },
  { name: 'Berry Blast',       category: 'Smoothies',  price: 180, available: true },
  { name: 'Chocolate Shake',   category: 'Smoothies',  price: 170, available: true },
  { name: 'Potato Chips',      category: 'Snacks',     price: 40,  available: true },
  { name: 'Chocolate Brownie', category: 'Snacks',     price: 90,  available: true }
]

// Sale definitions: daysAgo + item names & quantities
// The seeding logic in AppContext resolves names to generated product IDs at seed time
export const sampleSaleDefs = [
  { daysAgo: 0, items: [{ name: 'Cappuccino', qty: 2 }, { name: 'Croissant', qty: 1 }] },
  { daysAgo: 0, items: [{ name: 'Latte', qty: 1 }, { name: 'Veg Sandwich', qty: 1 }] },
  { daysAgo: 1, items: [{ name: 'Espresso', qty: 3 }] },
  { daysAgo: 2, items: [{ name: 'Berry Blast', qty: 2 }, { name: 'Blueberry Muffin', qty: 2 }] },
  { daysAgo: 7, items: [{ name: 'Americano', qty: 1 }, { name: 'Chocolate Brownie', qty: 1 }] },
  { daysAgo: 7, items: [{ name: 'Masala Chai', qty: 2 }, { name: 'Potato Chips', qty: 3 }] }
]
