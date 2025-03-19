
function loadTimeline() {
    Papa.parse("blog_data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            const timeline = document.querySelector('.timeline');
            results.data.forEach((entry, index) => {
                if (!entry.date || !entry.title) return;

                // Create timeline item
                const item = document.createElement('div');
                item.className = 'timeline-item';

                // Decide top or bottom placement
                const positionClass = index % 2 === 0 ? 'top' : 'bottom';

                item.innerHTML = `
                    <div class="card ${positionClass}" onclick="openModal('${entry.date}', '${entry.title}', '${entry.til}')">
                        <h4>${entry.date}</h4>
                        <p>${entry.title}</p>
                    </div>
                    <div class="icon"><svg>...</svg></div>
                    <div class="connector"></div>
                `;

                timeline.appendChild(item);
            });
        }
    });
}

function openModal(date, title, til) {
    document.getElementById('modalTitle').innerText = `${date} - ${title}`;
    document.getElementById('tabContent').innerText = til;
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

window.onload = loadTimeline;
