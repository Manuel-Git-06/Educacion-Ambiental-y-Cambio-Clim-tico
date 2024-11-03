document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = successModal.querySelector('.close-modal');

    // Validación y envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Aquí iría la lógica para enviar el formulario al servidor
            const formData = new FormData(this);
            
            // Simulación de envío
            setTimeout(() => {
                showSuccessModal();
                contactForm.reset();
            }, 1000);
        }
    });

    // Validación del formulario
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'Este campo es obligatorio');
                isValid = false;
            } else {
                removeError(field);
                
                // Validación específica para email
                if (field.type === 'email' && !validateEmail(field.value)) {
                    showError(field, 'Por favor, introduce un email válido');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    // Validación de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Mostrar error en campo
    function showError(field, message) {
        removeError(field);
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    // Remover error de campo
    function removeError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Mostrar modal de éxito
    function showSuccessModal() {
        successModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            successModal.classList.add('active');
        }, 10);
    }

    // Cerrar modal
    function closeModal() {
        successModal.classList.remove('active');
        setTimeout(() => {
            successModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    closeModalBtn.addEventListener('click', closeModal);
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showError(this, 'Este campo es obligatorio');
            } else if (this.type === 'email' && !validateEmail(this.value)) {
                showError(this, 'Por favor, introduce un email válido');
            } else {
                removeError(this);
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                removeError(this);
            }
        });
    });
}); 