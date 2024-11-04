document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const shareProjectBtn = document.getElementById('shareProjectBtn');
    const modal = document.getElementById('shareProjectModal');
    const closeModal = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const projectForm = document.getElementById('projectForm');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        projectForm.reset();
    }

    shareProjectBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalHandler);
    cancelBtn.addEventListener('click', closeModalHandler);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    // Form handling
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí iría la lógica para enviar el proyecto
        const formData = new FormData(this);
        console.log('Nuevo proyecto:', Object.fromEntries(formData));
        
        closeModalHandler();
    });

    // Image preview
    const imageInput = document.getElementById('projectImage');
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Aquí podrías mostrar una vista previa de la imagen
                console.log('Imagen cargada:', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Lazy loading para imágenes
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Animaciones de entrada
    const cards = document.querySelectorAll('.article-card, .project-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    const filterSelect = document.getElementById('filterSelect');
    
    filterSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        
        // Aquí puedes añadir la lógica de filtrado
        if(selectedValue) {
            console.log(`Filtrando por: ${selectedValue}`);
            // Implementar la lógica de filtrado
            filterContent(selectedValue);
        }
    });

    function filterContent(filter) {
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            if(filter === '') {
                article.style.display = 'block';
            } else {
                if(article.dataset.category === filter) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            }
        });
    }

    const sortSelect = document.getElementById('sortSelect');
    
    sortSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        
        if(selectedValue) {
            sortContent(selectedValue);
        }
    });

    function sortContent(sortBy) {
        const container = document.querySelector('.articles-grid');
        const articles = Array.from(container.querySelectorAll('.article-card'));

        articles.sort((a, b) => {
            switch(sortBy) {
                case 'fecha-reciente':
                    return new Date(b.dataset.fecha) - new Date(a.dataset.fecha);
                case 'fecha-antigua':
                    return new Date(a.dataset.fecha) - new Date(b.dataset.fecha);
                case 'alfabetico-asc':
                    return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
                case 'alfabetico-desc':
                    return b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent);
                case 'popularidad':
                    return parseInt(b.dataset.vistas) - parseInt(a.dataset.vistas);
                case 'valoracion':
                    return parseFloat(b.dataset.valoracion) - parseFloat(a.dataset.valoracion);
                default:
                    return 0;
            }
        });

        // Limpiar y reordenar
        articles.forEach(article => container.appendChild(article));
    }
}); 