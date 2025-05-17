document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Wishlist & Cart from localStorage ---
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- Toast Notification Function ---
    const toastNotification = document.getElementById('toast-notification');
    function showToast(message, duration = 3000) {
        if (!toastNotification) return;
        toastNotification.textContent = message;
        toastNotification.classList.add('show');
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, duration);
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Hero Particles ---
    const particlesContainer = document.getElementById('hero-particles-container');
    if (particlesContainer) {
        const numParticles = 30;
        for (let i = 0; i < numParticles; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particlesContainer.appendChild(particle);
        }
    }

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.product-card, .featured-item, .about-text, .about-image, .offer-card, .testimonial-card, .gallery-item, .contact-info, .form-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // --- Stats Counter ---
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = +stat.dataset.target;
        let count = 0;
        const duration = 2000;
        if (target === 0) { stat.textContent = 0; return; }
        const stepTime = Math.max(1, Math.abs(Math.floor(duration / target)));
        const timer = setInterval(() => {
            count++;
            stat.textContent = count;
            if (count >= target) { stat.textContent = target; clearInterval(timer); }
        }, stepTime);
    });

    // --- Testimonial Slider ---
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (slider && prevBtn && nextBtn) {
        const testimonialCards = slider.querySelectorAll('.testimonial-card');
        let cardWidth = 0;
        let currentIndex = 0;

        function calculateCardWidthAndGap() {
            if (testimonialCards.length > 0) {
                const cardStyle = getComputedStyle(testimonialCards[0]);
                const sliderStyle = getComputedStyle(slider);
                const gapValue = parseFloat(sliderStyle.gap);

                if (!isNaN(gapValue) && gapValue > 0) {
                     cardWidth = testimonialCards[0].offsetWidth + gapValue;
                } else {
                    const marginRight = parseFloat(cardStyle.marginRight) || 0;
                    const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
                    cardWidth = testimonialCards[0].offsetWidth + marginRight + marginLeft;
                }
            } else {
                cardWidth = 0;
            }
        }

        function updateSliderButtons() {
            if (testimonialCards.length === 0 || cardWidth === 0) {
                if(prevBtn) prevBtn.disabled = true;
                if(nextBtn) nextBtn.disabled = true;
                return;
            }

            prevBtn.disabled = currentIndex === 0;

            const visibleCards = Math.floor(slider.clientWidth / cardWidth);
            if (!isFinite(visibleCards) || visibleCards <= 0) {
                nextBtn.disabled = false;
                return;
            }
            nextBtn.disabled = currentIndex >= testimonialCards.length - visibleCards || testimonialCards.length <= visibleCards;
        }

        if (testimonialCards.length > 0) {
            calculateCardWidthAndGap();

            nextBtn.addEventListener('click', () => {
                calculateCardWidthAndGap();
                if (cardWidth === 0) return;
                const visibleCards = Math.floor(slider.clientWidth / cardWidth);
                 if (!isFinite(visibleCards) || visibleCards <= 0) return;

                if (currentIndex < testimonialCards.length - visibleCards) {
                     currentIndex++;
                     slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
                updateSliderButtons();
            });

            prevBtn.addEventListener('click', () => {
                calculateCardWidthAndGap();
                if (cardWidth === 0) return;
                 if (currentIndex > 0) {
                    currentIndex--;
                    slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                }
                updateSliderButtons();
            });

            updateSliderButtons();
            window.addEventListener('resize', () => {
                calculateCardWidthAndGap();
                if (cardWidth > 0) {
                    currentIndex = Math.round(slider.scrollLeft / cardWidth);
                }
                updateSliderButtons();
            });
            slider.addEventListener('scroll', () => {
                 if (cardWidth > 0) {
                    currentIndex = Math.round(slider.scrollLeft / cardWidth);
                }
                updateSliderButtons();
            });
        } else {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        }
    }


    // --- Wishlist Functionality ---
    const wishlistIcon = document.getElementById('wishlist-icon');
    const wishlistModal = document.getElementById('wishlist-modal');
    const closeWishlistModalBtn = document.getElementById('close-wishlist-modal');
    const wishlistItemsContainer = document.getElementById('wishlist-items-container');
    const wishlistCountBadge = document.getElementById('wishlist-count');

    function updateWishlistCount() {
        wishlistCountBadge.textContent = wishlist.length;
    }

    function renderWishlistItems() {
        wishlistItemsContainer.innerHTML = '';
        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<p class="empty-message">Your wishlist is empty. Start adding your favourite treats!</p>';
            return;
        }
        wishlist.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('wishlist-item');
            itemEl.innerHTML = `
                <div class="item-image"><img src="${item.imageSrc}" alt="${item.name}"></div>
                <div class="item-details">
                    <h5>${item.name}</h5>
                    <p>₹${item.price}</p>
                </div>
                <div class="item-actions">
                    <button class="remove-from-wishlist-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i> Remove</button>
                </div>
            `;
            wishlistItemsContainer.appendChild(itemEl);
        });
        addWishlistRemoveEventListeners();
    }

    function toggleWishlistItem(productId, productCard) {
        const itemIndex = wishlist.findIndex(item => item.id === productId);
        const productData = {
            id: productId,
            name: productCard.dataset.name,
            price: productCard.dataset.price,
            imageSrc: productCard.dataset.imageSrc
        };

        if (itemIndex > -1) {
            wishlist.splice(itemIndex, 1); // Remove from wishlist
            showToast(`${productData.name} removed from wishlist!`);
        } else {
            wishlist.push(productData); // Add to wishlist
            showToast(`${productData.name} added to wishlist!`);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        updateWishlistButtonStates();
        renderWishlistItems(); // Re-render if modal is open or will be opened
    }

    function addWishlistRemoveEventListeners() {
        document.querySelectorAll('.remove-from-wishlist-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                const productCard = document.querySelector(`.product-card[data-id="${productId}"]`); // Find original card
                toggleWishlistItem(productId, productCard); // This will remove it and update UI
            });
        });
    }

    function updateWishlistButtonStates() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.id;
            const wishlistBtn = card.querySelector('.wishlist-btn');
            if (!wishlistBtn) return; // Guard clause
            const heartIcon = wishlistBtn.querySelector('i');
            if (wishlist.some(item => item.id === productId)) {
                wishlistBtn.classList.add('active');
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
            } else {
                wishlistBtn.classList.remove('active');
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
            }
        });
    }

    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.currentTarget.closest('.product-card');
            const productId = productCard.dataset.id;
            toggleWishlistItem(productId, productCard);
        });
    });

    if (wishlistIcon && wishlistModal && closeWishlistModalBtn) {
        wishlistIcon.addEventListener('click', (e) => { e.preventDefault(); renderWishlistItems(); wishlistModal.classList.add('show'); });
        closeWishlistModalBtn.addEventListener('click', () => wishlistModal.classList.remove('show'));
        wishlistModal.addEventListener('click', (e) => { if (e.target === wishlistModal) wishlistModal.classList.remove('show'); });
    }


    // --- Cart Functionality ---
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCartModalBtn = document.getElementById('close-cart-modal');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCountBadge = document.getElementById('cart-count');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    function updateCartCount() {
        cartCountBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalPriceEl.textContent = `₹${total.toFixed(2)}`;
        checkoutBtn.disabled = cart.length === 0;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty. Add some delicious items!</p>';
            updateCartTotal();
            return;
        }
        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
                <div class="item-image"><img src="${item.imageSrc}" alt="${item.name}"></div>
                <div class="item-details">
                    <h5>${item.name}</h5>
                    <p>₹${item.price} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="decrease-qty-btn" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="item-quantity-input" readonly>
                    <button class="increase-qty-btn" data-id="${item.id}">+</button>
                </div>
                <div class="item-actions">
                    <button class="remove-from-cart-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
        addCartActionListeners();
        updateCartTotal();
    }

    function addToCart(productId, productCard) {
        const existingItem = cart.find(item => item.id === productId);
        const productData = {
            id: productId,
            name: productCard.dataset.name,
            price: parseFloat(productCard.dataset.price),
            imageSrc: productCard.dataset.imageSrc
        };

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...productData, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartTotal();
        showToast(`${productData.name} added to cart!`);
        renderCartItems(); // Re-render if modal is open
    }

    function addCartActionListeners() {
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                showToast(`Item removed from cart.`);
                renderCartItems();
                updateCartCount();
            });
        });
        document.querySelectorAll('.increase-qty-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                const item = cart.find(i => i.id === productId);
                if (item) item.quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
                updateCartCount();
            });
        });
        document.querySelectorAll('.decrease-qty-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                const item = cart.find(i => i.id === productId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                } else if (item && item.quantity === 1) { // Remove if quantity becomes 0
                    cart = cart.filter(i => i.id !== productId);
                     showToast(`Item removed from cart.`);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
                updateCartCount();
            });
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.currentTarget.closest('.product-card');
            const productId = productCard.dataset.id;
            addToCart(productId, productCard);
        });
    });

    if (cartIcon && cartModal && closeCartModalBtn) {
        cartIcon.addEventListener('click', (e) => { e.preventDefault(); renderCartItems(); cartModal.classList.add('show'); });
        closeCartModalBtn.addEventListener('click', () => cartModal.classList.remove('show'));
        cartModal.addEventListener('click', (e) => { if (e.target === cartModal) cartModal.classList.remove('show'); });
    }

    // --- Order Now Modal (enhanced for checkout) ---
    const openModalBtn = document.getElementById('open-modal-btn'); // General Order Now Button
    const orderModal = document.getElementById('order-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const orderForm = document.getElementById('modal-order-form');
    const modalOrderSummaryGroup = document.getElementById('modal-order-summary-group');
    const modalOrderSummaryItems = document.getElementById('modal-order-summary-items');
    const modalOrderTotal = document.getElementById('modal-order-total');
    const modalCakeSelect = document.getElementById('modal-cake');
    const modalQuantityInput = document.getElementById('modal-quantity');


    function openCheckoutModal(isGeneralOrder = false) {
        orderModal.classList.add('show');
        if (cart.length > 0 && !isGeneralOrder) {
            modalOrderSummaryGroup.style.display = 'block';
            modalOrderSummaryItems.innerHTML = cart.map(item => `<div>${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}</div>`).join('');
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            modalOrderTotal.textContent = `₹${total.toFixed(2)}`;
            modalCakeSelect.disabled = true;
            modalQuantityInput.disabled = true;
            modalCakeSelect.value = "";
            modalQuantityInput.value = 1;

        } else {
            modalOrderSummaryGroup.style.display = 'none';
            modalOrderSummaryItems.innerHTML = '';
            modalOrderTotal.textContent = '';
            modalCakeSelect.disabled = false;
            modalQuantityInput.disabled = false;
        }
        // Do not reset the form here, only specific fields if needed
        // orderForm.reset(); // This clears user input fields too early.
        // Clear only cart-specific fields if they were used
        if (isGeneralOrder) {
             modalCakeSelect.value = "";
             modalQuantityInput.value = 1;
        }
    }

    if (checkoutBtn) { // Checkout button from Cart Modal
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                cartModal.classList.remove('show'); // Close cart modal
                openCheckoutModal(false); // false means it's from cart
            } else {
                showToast("Your cart is empty. Add items before checking out.");
            }
        });
    }
    if (openModalBtn) { // General "Order Now" button in nav
         openModalBtn.addEventListener('click', () => {
            openCheckoutModal(true); // true means it's a general order, not from cart
        });
    }

    if (orderModal && closeModalBtn) {
        closeModalBtn.addEventListener('click', () => orderModal.classList.remove('show'));
        orderModal.addEventListener('click', (e) => { if (e.target === orderModal) orderModal.classList.remove('show'); });
    }
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Order request submitted! We will contact you shortly.');
            orderModal.classList.remove('show');

            // Clear cart if order was from cart (check if summary was displayed)
            if(modalOrderSummaryGroup.style.display === 'block' && cart.length > 0) {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                updateCartTotal();
                renderCartItems();
            }
            orderForm.reset(); // Now reset the form after submission
        });
    }


    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        });
        backToTopBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // --- Contact Form Submission (Placeholder) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                showToast('Please fill in all required fields (Name, Email, Message).');
                return;
            }
            showToast('Message sent! Thank you for contacting us.');
            contactForm.reset();
        });
    }

    // --- Update Copyright Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    // --- Initial UI Updates ---
    updateWishlistCount();
    updateWishlistButtonStates();
    updateCartCount();
    updateCartTotal();
});