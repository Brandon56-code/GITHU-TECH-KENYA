// GITHU TECH Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginPanel = document.getElementById('loginPanel');
    const signupPanel = document.getElementById('signupPanel');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    // Panel Switching
    function switchToSignUp() {
        loginPanel.style.display = 'none';
        signupPanel.style.display = 'block';
        signupPanel.style.animation = 'slideUp 0.5s ease';
    }

    function switchToLogin() {
        signupPanel.style.display = 'none';
        loginPanel.style.display = 'block';
        loginPanel.style.animation = 'slideUp 0.5s ease';
    }

    // Event Listeners for Panel Switching
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            switchToSignUp();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            switchToLogin();
        });
    }

    // Password Toggle Functionality
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]');
            const icon = this.querySelector('i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Login Form Handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const remember = document.getElementById('remember') ? document.getElementById('remember').checked : false;

            // Simple validation
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            if (password.length < 6) {
                showNotification('Password must be at least 6 characters.', 'error');
                return;
            }

            // Simulate login (replace with actual authentication)
            const submitBtn = loginForm.querySelector('.btn-login-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            submitBtn.disabled = true;
            btnText.textContent = 'Signing in...';
            btnIcon.innerHTML = '<span class="loading-spinner"></span>';

            // Simulate API call
            setTimeout(() => {
                submitBtn.disabled = false;
                btnText.textContent = 'Sign In';
                btnIcon.innerHTML = '<i class="fas fa-arrow-right"></i>';

                // Store remember preference
                if (remember) {
                    localStorage.setItem('rememberEmail', email);
                } else {
                    localStorage.removeItem('rememberEmail');
                }

                showNotification('Login successful! Redirecting to dashboard...', 'success');

                // Redirect after success (uncomment for actual implementation)
                // setTimeout(() => window.location.href = 'dashboard.html', 1500);
            }, 2000);
        });
    }

    // Signup Form Handling
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validation
            if (name.length < 2) {
                showNotification('Please enter your full name.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            if (password.length < 8) {
                showNotification('Password must be at least 8 characters.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showNotification('Passwords do not match.', 'error');
                return;
            }

            // Check password strength
            if (!validatePasswordStrength(password)) {
                showNotification('Password must contain uppercase, lowercase, and numbers.', 'error');
                return;
            }

            // Simulate signup (replace with actual registration)
            const submitBtn = signupForm.querySelector('.btn-login-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            submitBtn.disabled = true;
            btnText.textContent = 'Creating account...';
            btnIcon.innerHTML = '<span class="loading-spinner"></span>';

            // Simulate API call
            setTimeout(() => {
                submitBtn.disabled = false;
                btnText.textContent = 'Create Account';
                btnIcon.innerHTML = '<i class="fas fa-user-plus"></i>';

                showNotification('Account created successfully! Please login.', 'success');

                // Switch to login panel
                setTimeout(() => switchToLogin(), 1500);
            }, 2000);
        });
    }

    // Email Validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Password Strength Validation
    function validatePasswordStrength(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        return hasUpperCase && hasLowerCase && hasNumbers;
    }

    // Notification System
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 20px 30px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            font-weight: 500;
        `;

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            .notification.shake {
                animation: shake 0.3s ease;
            }
        `;
        document.head.appendChild(style);

        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail && document.getElementById('loginEmail')) {
        document.getElementById('loginEmail').value = rememberedEmail;
        if (document.getElementById('remember')) {
            document.getElementById('remember').checked = true;
        }
    }

    // Input focus effects
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Social Login Handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' :
                            this.classList.contains('facebook') ? 'Facebook' : 'Twitter';

            showNotification(`${provider} login coming soon!`, 'info');
        });
    });

    // Add loading state to buttons on hover
    const submitButtons = document.querySelectorAll('.btn-login-submit');
    submitButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.backgroundSize = '200% 200%';
        });

        button.addEventListener('mouseleave', function() {
            this.style.backgroundSize = '100% 100%';
        });
    });

    // Prevent form submission on enter key for better UX
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT' && !e.target.closest('form')) {
            e.preventDefault();
        }
    });

    // Log successful load
    console.log('GITHU TECH login page loaded successfully!');
});
