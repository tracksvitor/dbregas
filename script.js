// --- CONTROLE DO POPUP DO VÍDEO ---
const modal = document.getElementById('video-modal');
const openBtn = document.getElementById('open-video-btn');
const closeBtn = document.querySelector('.close-btn');
const videoIframe = document.getElementById('video-iframe');

const youtubeEmbedUrl = "https://www.youtube.com/embed/rqvDPaIMFXs?autoplay=1";

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    videoIframe.src = youtubeEmbedUrl;
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    videoIframe.src = "";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        videoIframe.src = "";
    }
});


// --- CARREGAMENTO DINÂMICO DA AGENDA (.JSON) ---
document.addEventListener("DOMContentLoaded", () => {
    const agendaContainer = document.getElementById("agenda-shows");

    // Busca o arquivo agenda.json que está na mesma pasta
    fetch("agenda.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar o arquivo de agenda.");
            }
            return response.json();
        })
        .then(shows => {
            // Se a agenda estiver vazia no JSON
            if (shows.length === 0) {
                agendaContainer.innerHTML = '<p style="text-align:center; font-size:13px; color:#bfa3a6;">Nenhum show agendado no momento.</p>';
                return;
            }

            // Limpa o container e monta os shows linha por linha
            agendaContainer.innerHTML = "";
            shows.forEach(show => {
                const showItem = document.createElement("div");
                showItem.className = "show-item";
                
                showItem.innerHTML = `
                    <span class="show-date">${show.data}</span>
                    <span class="show-local">${show.local}</span>
                `;
                
                agendaContainer.appendChild(showItem);
            });
        })
        .catch(error => {
            console.error("Erro:", error);
            agendaContainer.innerHTML = '<p style="text-align:center; font-size:13px; color:#ff073a;">Erro ao carregar os próximos shows.</p>';
        });
});