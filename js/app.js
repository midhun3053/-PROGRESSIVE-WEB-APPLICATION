// Global app functionality

// Check if the browser is online or offline
function updateOnlineStatus() {
  if (navigator.onLine) {
    document.body.classList.remove("offline")
  } else {
    document.body.classList.add("offline")
  }
}

window.addEventListener("online", updateOnlineStatus)
window.addEventListener("offline", updateOnlineStatus)
updateOnlineStatus()

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle")
const navList = document.querySelector(".nav-list")

if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("menu-open")
    navList.classList.toggle("active")
  })
}

// Theme toggle
const themeToggle = document.querySelector(".theme-toggle")
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }
}

// Check for saved theme preference or use the system preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  setTheme(savedTheme)
} else if (prefersDarkScheme.matches) {
  setTheme("dark")
}

// Toggle theme when button is clicked
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  })
}

// Update cart count
function updateCartCount() {
  const cartCountElements = document.querySelectorAll(".cart-count")
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const count = cart.reduce((total, item) => total + item.quantity, 0)

  cartCountElements.forEach((element) => {
    element.textContent = count
  })
}

// Call this on page load
updateCartCount()

// Toast notifications
function showToast(title, message, type = "success", duration = 3000) {
  const toastContainer = document.querySelector(".toast-container")

  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`

  toast.innerHTML = `
    <div class="toast-icon">
      ${
        type === "success"
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
      }
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `

  toastContainer.appendChild(toast)

  // Add close event
  const closeButton = toast.querySelector(".toast-close")
  closeButton.addEventListener("click", () => {
    toast.style.animation = "slideOut 0.3s ease forwards"
    setTimeout(() => {
      toast.remove()
    }, 300)
  })

  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = "slideOut 0.3s ease forwards"
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove()
        }
      }, 300)
    }
  }, duration)
}

// PWA installation
let deferredPrompt

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault()
  // Stash the event so it can be triggered later
  deferredPrompt = e

  // Show the install button
  const installButton = document.getElementById("install-button")
  if (installButton) {
    installButton.style.display = "inline-flex"

    installButton.addEventListener("click", () => {
      // Show the install prompt
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt")
          showToast("App Installed", "The app has been successfully installed on your device.")
        } else {
          console.log("User dismissed the install prompt")
        }

        // Clear the saved prompt since it can't be used again
        deferredPrompt = null

        // Hide the install button
        installButton.style.display = "none"
      })
    })
  }
})

// Hide install button if app is already installed
window.addEventListener("appinstalled", () => {
  const installButton = document.getElementById("install-button")
  if (installButton) {
    installButton.style.display = "none"
  }
  deferredPrompt = null
})

// Request notification permission
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.")
        subscribeToPushNotifications()
      } else {
        console.log("Notification permission denied.")
      }
    })
  }
}

// Subscribe to push notifications
async function subscribeToPushNotifications() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U",
        ),
      })

      console.log("Push notification subscription successful:", subscription)

      // Here you would send the subscription to your server
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   body: JSON.stringify(subscription),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      showToast("Notifications Enabled", "You will now receive push notifications for order updates and promotions.")
    } catch (error) {
      console.error("Error subscribing to push notifications:", error)
    }
  }
}

// Helper function to convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// Request notification permission after a delay
setTimeout(() => {
  requestNotificationPermission()
}, 5000)

