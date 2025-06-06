<h2 align="center">Bakery Web Application.</h2>

# Bakery Web Application

<p align="center">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
</p>

Brownie Tiruchengode is a fully responsive, single-page website built using vanilla HTML, CSS, and JavaScript. Designed for a home-based baking business, this modern landing page highlights delicious handmade treats with smooth UI/UX and interactive features.

It showcases products like brownies and cakes, offers an e-commerce-like experience (without a backend), and is perfect for attracting and engaging local customers. Whether on mobile or desktop, the site ensures a seamless browsing experience.

## 🚀 Live Demo

**You can view the live version of the site here:**

[**https://sharan-kumar-r.github.io/Baking-Business/**](https://sharan-kumar-r.github.io/Baking-Business/)

## 📸 Screenshots


| Desktop View |
| :---: | 
| ![Desktop Screenshot](https://github.com/Sharan-Kumar-R/Baking-Business/blob/main/Desktop_View.png) |


## ✨ Key Features

*   **Fully Responsive Design:** A mobile-first approach ensures the site looks great on all devices, from small phones to large desktops.
*   **Modern Dark Theme:** A visually appealing dark theme with gold and berry accents for a premium feel.
*   **Interactive Product Cards:** Users can browse products with hover effects and quick actions.
*   **Persistent Shopping Cart:** Add items to a shopping cart. The cart's state is saved in the browser's `localStorage`, so items are not lost on page reload.
*   **Persistent Wishlist:** Save favorite items to a wishlist, which is also saved using `localStorage`.
*   **Dynamic Modals:** Sleek, animated modals for the cart, wishlist, and checkout/order form.
*   **On-Scroll Animations:** Elements animate into view as the user scrolls down the page, powered by the `IntersectionObserver` API for optimal performance.
*   **Interactive Testimonial Slider:** A custom-built, touch-friendly slider for customer reviews.
*   **Client-Side Form Handling:** A functional contact form and order form that provide user feedback on the front end.

## 🛠️ Technologies Used

*   **HTML5:** For the structure and content of the website.
*   **CSS3:** For all the styling, including:
    *   **Flexbox** and **CSS Grid** for modern, responsive layouts.
    *   **Custom Properties (Variables)** for a maintainable and consistent theme.
    *   **Transitions & Animations** for a smooth, dynamic user experience.
*   **Vanilla JavaScript (ES6+):** For all interactivity, including:
    *   DOM manipulation to dynamically update the UI.
    *   `localStorage` for persistent cart and wishlist functionality.
    *   `IntersectionObserver` for performant scroll animations.
*   **Font Awesome:** For all the icons used throughout the site.
*   **Animate.css:** For some of the pre-built element animations.
*   **Google Fonts:** For custom typography (`Playfair Display`, `Poppins`, `Dancing Script`).

## 🔧 Setup and Installation

To run this project locally, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sharan-Kumar-R/Baking-Business.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Baking-Business
    ```
3.  **Open `index.html` in your web browser.**
    *   For the best experience (and to avoid any potential CORS issues with local files), it's recommended to use a live server. If you are using VS Code, you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

## 📁 Project Structure

```
/
├── index.html      # The main HTML file
├── style.css       # All custom CSS styles
├── script.js       # All JavaScript logic
└── README.md       # This file
```

## 🌟 Future Improvements

While this is a complete front-end project, here are some features that could be added with a backend:

*   **Full Backend Integration:** Use Node.js/Express to handle orders and contact form submissions.
*   **Database:** Integrate a database like MongoDB or PostgreSQL to store products, user data, and orders.
*   **User Authentication:** Allow users to sign up, log in, and have their own persistent cart across devices.
*   **Payment Gateway:** Integrate a payment system like Stripe or PayPal.

