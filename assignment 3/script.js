// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    // Form elements
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Error message elements
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    
    // Individual field error elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    // Password show/hide functionality
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
    });
    
    // Phone number input restriction (only numbers, max 10 digits)
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length > 10) {
            value = value.slice(0, 10); // Limit to 10 digits
        }
        e.target.value = value;
    });
    
    // Real-time validation
    fullNameInput.addEventListener('blur', function() {
        validateFullName();
    });
    
    emailInput.addEventListener('blur', function() {
        validateEmail();
    });
    
    phoneInput.addEventListener('blur', function() {
        validatePhone();
    });
    
    passwordInput.addEventListener('blur', function() {
        validatePassword();
    });
    
    confirmPasswordInput.addEventListener('blur', function() {
        validateConfirmPassword();
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        hideMessage(errorMessage);
        hideMessage(successMessage);
        
        // Validate all fields
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        // Check if all validations pass
        if (isFullNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            showMessage(successMessage, 'Registration successful! Welcome aboard!');
            form.reset();
            clearAllErrors();
        } else {
            showMessage(errorMessage, 'Please fix the errors above and try again.');
        }
    });
    
    // Validation functions
    function validateFullName() {
        const value = fullNameInput.value.trim();
        if (value === '') {
            showFieldError(fullNameInput, fullNameError, 'Full name is required.');
            return false;
        } else if (value.length < 2) {
            showFieldError(fullNameInput, fullNameError, 'Full name must be at least 2 characters.');
            return false;
        } else {
            showFieldSuccess(fullNameInput, fullNameError);
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showFieldError(emailInput, emailError, 'Email is required.');
            return false;
        } else if (!emailRegex.test(value)) {
            showFieldError(emailInput, emailError, 'Please enter a valid email address (e.g., user@example.com).');
            return false;
        } else {
            showFieldSuccess(emailInput, emailError);
            return true;
        }
    }
    
    function validatePhone() {
        const value = phoneInput.value.trim();
        
        if (value === '') {
            showFieldError(phoneInput, phoneError, 'Phone number is required.');
            return false;
        } else if (value.length !== 10) {
            showFieldError(phoneInput, phoneError, 'Phone number must be exactly 10 digits.');
            return false;
        } else {
            showFieldSuccess(phoneInput, phoneError);
            return true;
        }
    }
    
    function validatePassword() {
        const value = passwordInput.value;
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        
        if (value === '') {
            showFieldError(passwordInput, passwordError, 'Password is required.');
            return false;
        } else if (value.length < minLength) {
            showFieldError(passwordInput, passwordError, `Password must be at least ${minLength} characters long.`);
            return false;
        } else if (!hasUpperCase) {
            showFieldError(passwordInput, passwordError, 'Password must contain at least one uppercase letter.');
            return false;
        } else if (!hasLowerCase) {
            showFieldError(passwordInput, passwordError, 'Password must contain at least one lowercase letter.');
            return false;
        } else if (!hasNumbers) {
            showFieldError(passwordInput, passwordError, 'Password must contain at least one number.');
            return false;
        } else {
            showFieldSuccess(passwordInput, passwordError);
            return true;
        }
    }
    
    function validateConfirmPassword() {
        const value = confirmPasswordInput.value;
        const passwordValue = passwordInput.value;
        
        if (value === '') {
            showFieldError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
            return false;
        } else if (value !== passwordValue) {
            showFieldError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
            return false;
        } else {
            showFieldSuccess(confirmPasswordInput, confirmPasswordError);
            return true;
        }
    }
    
    // Helper functions
    function showFieldError(inputElement, errorElement, message) {
        inputElement.classList.add('input-error');
        inputElement.classList.remove('input-success');
        errorElement.textContent = message;
    }
    
    function showFieldSuccess(inputElement, errorElement) {
        inputElement.classList.remove('input-error');
        inputElement.classList.add('input-success');
        errorElement.textContent = '';
    }
    
    function showMessage(messageElement, text) {
        messageElement.textContent = text;
        messageElement.classList.remove('hidden');
        
        // Auto-hide success message after 5 seconds
        if (messageElement === successMessage) {
            setTimeout(() => {
                hideMessage(messageElement);
            }, 5000);
        }
    }
    
    function hideMessage(messageElement) {
        messageElement.classList.add('hidden');
        messageElement.textContent = '';
    }
    
    function clearAllErrors() {
        const allInputs = [fullNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput];
        const allErrors = [fullNameError, emailError, phoneError, passwordError, confirmPasswordError];
        
        allInputs.forEach(input => {
            input.classList.remove('input-error', 'input-success');
        });
        
        allErrors.forEach(error => {
            error.textContent = '';
        });
    }
});
