
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
                    <div class="card ${positionClass}" onclick="openModal('${entry.date}', '${entry.title}', '${entry.til}', '${entry.application}', '${entry.references}', '${entry.code}')">
                        <h4>${entry.date}</h4>
                        <p>${entry.title}</p>
                    </div>
                    <div class="icon"></div>
                    <div class="connector"></div>
                `;

                timeline.appendChild(item);
            });
        }
    });
}

function openModal(date, title, til, application, references, code) {
    document.getElementById('modalTitle').innerText = `${date} - ${title}`;
    document.getElementById('modal').style.display = 'block';
    showTab('til', {til, application, references, code});
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function showTab(tabName, content) {
    const tabContent = document.getElementById('tabContent');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="showTab('${tabName}')"]`).classList.add('active');

    switch(tabName) {
        case 'til':
            tabContent.innerText = content.til;
            break;
        case 'application':
            tabContent.innerText = content.application;
            break;
        case 'references':
            tabContent.innerHTML = content.references;
            break;
        case 'code':
            tabContent.innerHTML = `<pre><code>${content.code}</code></pre>`;
            break;
    }
}

window.onload = loadTimeline;