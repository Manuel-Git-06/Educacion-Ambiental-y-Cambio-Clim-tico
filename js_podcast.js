document.addEventListener('DOMContentLoaded', function() {
    // Manejo del reproductor de audio
    const audioPlayer = document.querySelector('.audio-player');
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí iría la lógica para cargar y reproducir el episodio correspondiente
            const episodeUrl = this.dataset.episode;
            if (episodeUrl) {
                audioPlayer.src = episodeUrl;
                audioPlayer.play();
            }
        });
    });

    // Sistema de comentarios
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.querySelector('.comments-list');

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;

        addComment(name, comment);
        this.reset();
    });

    function addComment(name, comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        
        const date = new Date().toLocaleDateString();
        
        commentElement.innerHTML = `
            <div class="comment-header">
                <strong>${name}</strong>
                <span>${date}</span>
            </div>
            <p>${comment}</p>
        `;

        commentsList.insertBefore(commentElement, commentsList.firstChild);
    }

    // Seguimiento de progreso del episodio
    audioPlayer.addEventListener('timeupdate', function() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        // Aquí puedes actualizar una barra de progreso personalizada si lo deseas
    });
}); 