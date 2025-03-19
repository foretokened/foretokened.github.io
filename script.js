
function loadTimeline() {
    Papa.parse("blog_data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            const timeline = document.querySelector('.timeline');
            results.data.forEach((entry, index) => {
                if (!entry.date || !entry.title) return;
                const item = document.createElement('div');
                item.className = 'timeline-item';
                const positionClass = index % 2 === 0 ? 'top' : 'bottom';
                item.innerHTML = `
                    <div class="card ${positionClass}" onclick="openModal('${entry.date}', '${entry.title}', \`${entry.til}\`, \`${entry.application}\`, \`${entry.references}\`, \`${entry.code_snippet}\`)">
                        <h4>${entry.date}</h4>
                        <p>${entry.title}</p>
                    </div>
                    <div class="connector"></div>
                    <div class="icon"></div>
                `;
                timeline.appendChild(item);
            });
        }
    });
}
function openModal(date, title, til, app, refs, code) {
    document.getElementById('modalTitle').innerText = `${date} - ${title}`;
    window.modalData = { til, app, refs, code };
    showTab('til');
    document.getElementById('modal').classList.add('show');
}
function closeModal() {
    document.getElementById('modal').classList.remove('show');
}
function showTab(tab) {
    const content = {
        til: window.modalData.til,
        application: window.modalData.app,
        references: window.modalData.refs,
        code: window.modalData.code.replace(/```[\s\S]*?\n|```/g, '')
    };
    document.getElementById('tabContent').innerText = content[tab];
}
window.onload = loadTimeline;
