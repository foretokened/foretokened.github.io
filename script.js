
function fetchCSVAndRender() {
    Papa.parse("blog_data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            const timeline = document.getElementById('timeline');
            results.data.forEach((entry) => {
                if (!entry.date || !entry.title) return;
                const item = document.createElement('div');
                item.className = 'timeline-item';
                item.innerHTML = `
                    <div class="card">
                        <h4>${entry.date}</h4>
                        <p>${entry.title}</p>
                    </div>
                    <div class="circle"></div>
                `;
                item.onclick = () => openModal(entry);
                timeline.appendChild(item);
            });
        }
    });
}
function openModal(entry) {
    document.getElementById('modalTitle').innerText = `${entry.date} — ${entry.title}`;
    window.currentEntry = entry;
    showTab('til');
    document.getElementById('modal').classList.remove('hidden');
}
function showTab(tab) {
    const content = {
        til: window.currentEntry.til,
        application: window.currentEntry.application,
        references: window.currentEntry.references,
        code: window.currentEntry.code_snippet.replace(/```[\s\S]*?\n|```/g, '')
    };
    document.getElementById('tabContent').innerText = content[tab];
}
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}
window.onload = fetchCSVAndRender;
