// Products data
const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    image: "https://via.placeholder.com/300",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness, receive notifications, and more with this sleek smart watch.",
    price: 249.99,
    image: "https://via.placeholder.com/300",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Laptop Backpack",
    description: "Durable and water-resistant backpack with padded compartments for your laptop and accessories.",
    price: 79.99,
    image: "https://via.placeholder.com/300",
    category: "Accessories",
  },
  {
    id: "4",
    name: "Wireless Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 39.99,
    image: "https://via.placeholder.com/300",
    category: "Electronics",
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360° sound and 12-hour battery life.",
    price: 89.99,
    image: "https://via.placeholder.com/300",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Fitness Tracker",
    description: "Track your steps, heart rate, and sleep with this waterproof fitness tracker.",
    price: 59.99,
    image: "https://via.placeholder.com/300",
    category: "Electronics",
  },
  {
    id: "7",
    name: "Coffee Mug",
    description: "Ceramic coffee mug with temperature control to keep your drinks hot for hours.",
    price: 24.99,
    image: "https://via.placeholder.com/300",
    category: "Home",
  },
  {
    id: "8",
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness and color temperature.",
    price: 49.99,
    image: "https://via.placeholder.com/300",
    category: "Home",
  },
]

// Save products to localStorage for offline access
localStorage.setItem("products", JSON.stringify(products))

// Get products from localStorage
function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]")
}

// Get

