
    const videoContainer = document.getElementById('video-container');
    const loadVideoBtns = document.querySelectorAll('.load-video-btn');
    loadVideoBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            // Evita que o link abra uma nova página
            event.preventDefault();
            
            // Obtém o ID do vídeo do atributo de dados
            const videoId = button.getAttribute('data-video-id');
            
            // O código HTML do vídeo do YouTube
            const videoEmbedCode = `
                <iframe
                    class="w-full h-full"
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            `;
            
            // Substitui o conteúdo do contêiner pelo código do vídeo
            videoContainer.innerHTML = videoEmbedCode;
            
            // Opcional: Remove a classe de centralização
            videoContainer.classList.remove('flex', 'items-center', 'justify-center');
        });
    });
