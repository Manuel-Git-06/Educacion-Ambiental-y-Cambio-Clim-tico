document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const newTopicBtn = document.getElementById('newTopicBtn');
    const modal = document.getElementById('newTopicModal');
    const closeModal = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const newTopicForm = document.getElementById('newTopicForm');
    const categoryLinks = document.querySelectorAll('.categories-list a');
    const filterSelect = document.querySelector('.filter-select');

    // Funciones del modal
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        newTopicForm.reset();
    }

    // Event Listeners para el modal
    newTopicBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalHandler);
    cancelBtn.addEventListener('click', closeModalHandler);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    // Manejo del formulario
    newTopicForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí iría la lógica para enviar el nuevo tema
        const formData = {
            title: document.getElementById('topicTitle').value,
            category: document.getElementById('topicCategory').value,
            content: document.getElementById('topicContent').value
        };

        console.log('Nuevo tema:', formData);
        closeModalHandler();
    });

    // Filtrado por categorías
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los links
            categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Añadir clase active al link seleccionado
            this.parentElement.classList.add('active');
            
            const category = this.dataset.category;
            console.log('Filtrar por categoría:', category);
            
            // Aquí iría la lógica para filtrar las discusiones
        });
    });

    // Ordenar discusiones
    filterSelect.addEventListener('change', function() {
        const orderBy = this.value;
        console.log('Ordenar por:', orderBy);
        
        // Aquí iría la lógica para ordenar las discusiones
    });

    // Animación suave para las cards
    const discussionCards = document.querySelectorAll('.discussion-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    discussionCards.forEach(card => {
        observer.observe(card);
    });
}); 