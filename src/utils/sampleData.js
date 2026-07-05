// Raw seed definitions — no IDs are included because they are created at seed time

export const sampleCategoryNames = [
  'Smoothies', 'Drinks', 'Fast Food', 'Cigarettes'
]

export const sampleProductDefs = [
  { name: 'Berry Smoothie',     category: 'Smoothies',  price: 180, available: true },
  { name: 'Mango Smoothie',     category: 'Smoothies',  price: 170, available: true },
  { name: 'Chocolate Shake',    category: 'Smoothies',  price: 190, available: true },
  { name: 'Orange Juice',       category: 'Drinks',    price: 80,  available: true },
  { name: 'Lemonade',          category: 'Drinks',    price: 70,  available: true },
  { name: 'Iced Tea',           category: 'Drinks',    price: 60,  available: true },
  { name: 'Soda',              category: 'Drinks',    price: 50,  available: true },
  { name: 'Burger',             category: 'Fast Food',  price: 150, available: true },
  { name: 'Pizza Slice',        category: 'Fast Food',  price: 120, available: true },
  { name: 'Fries',              category: 'Fast Food',  price: 80,  available: true },
  { name: 'Chicken Wings',      category: 'Fast Food',  price: 180, available: true },
  { name: 'Hot Dog',            category: 'Fast Food',  price: 90,  available: true },
  { name: 'Cigarettes',         category: 'Cigarettes',     price: 120, available: true },
  { name: 'Lighter',            category: 'Cigarettes',     price: 30,  available: true }
]

// Sale definitions: daysAgo + item names & quantities
// The seeding logic in AppContext resolves names to generated product IDs at seed time
export const sampleSaleDefs = [
  { daysAgo: 0, items: [{ name: 'Berry Smoothie', qty: 2 }, { name: 'Burger', qty: 1 }] },
  { daysAgo: 0, items: [{ name: 'Mango Smoothie', qty: 1 }, { name: 'Pizza Slice', qty: 1 }] },
  { daysAgo: 1, items: [{ name: 'Orange Juice', qty: 3 }] },
  { daysAgo: 2, items: [{ name: 'Chocolate Shake', qty: 2 }, { name: 'Fries', qty: 2 }] },
  { daysAgo: 7, items: [{ name: 'Lemonade', qty: 1 }, { name: 'Chicken Wings', qty: 1 }] },
  { daysAgo: 7, items: [{ name: 'Iced Tea', qty: 2 }, { name: 'Hot Dog', qty: 1 }] }
]
