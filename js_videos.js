document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.querySelector('.comments-list');

    // Manejar el envío de comentarios
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;

        // Crear el nuevo comentario
        const newComment = createCommentElement(name, comment);
        
        // Añadir el comentario a la lista
        commentsList.insertBefore(newComment, commentsList.firstChild);

        // Limpiar el formulario
        commentForm.reset();
    });

    // Función para crear el elemento del comentario
    function createCommentElement(name, comment) {
        const div = document.createElement('div');
        div.className = 'comment-item';
        
        const currentDate = new Date().toLocaleDateString();
        
        div.innerHTML = `
            <div class="comment-header">
                <h4>${name}</h4>
                <span class="comment-date">${currentDate}</span>
            </div>
            <p>${comment}</p>
        `;

        return div;
    }
}); 