document.addEventListener('DOMContentLoaded', function() {
    const videoModal = document.getElementById('videoModal');
    const modalIframe = videoModal.querySelector('iframe');
    const tutorialBtns = document.querySelectorAll('.tutorial-btn');
    const closeModalBtn = videoModal.querySelector('.close-modal');

    function openModal(videoId) {
        // Construir la URL del video
        const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        
        // Establecer el src del iframe
        modalIframe.src = videoUrl;
        
        // Mostrar el modal
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        // Limpiar el src del iframe
        modalIframe.src = '';
        
        // Ocultar el modal
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    tutorialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const videoId = this.dataset.video;
            if (videoId) {
                openModal(videoId);
            }
        });
    });

    // Cerrar modal con el botón
    closeModalBtn.addEventListener('click', closeModal);

    // Cerrar modal haciendo clic fuera
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevenir que el clic en el contenido del modal cierre el modal
    videoModal.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
}); 