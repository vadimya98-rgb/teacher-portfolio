async function loadData(url) {
    const res = await fetch(url);
    return res.json();
}

async function renderAll() {
    const about = await loadData('content/about.json');
    document.getElementById('about-content').innerHTML = `
        <p><strong>${about.name}</strong></p>
        <p>${about.school}</p>
        <p>Образование: ${about.education}</p>
        <p>Квалификация: ${about.qualification}</p>
        <p>Стаж: ${about.experience} лет</p>
        <p>${about.bio}</p>
    `;

    const achievements = await loadData('content/achievements.json');
    document.getElementById('achievements-content').innerHTML = achievements.map(a => 
        `<div class="achievement-item"><strong>${a.title}</strong> (${a.year}) – ${a.desc}</div>`
    ).join('') || '<p>Нет записей</p>';

    const methods = await loadData('content/methods.json');
    document.getElementById('methods-content').innerHTML = methods.map(m => 
        `<div class="method-item"><strong>${m.title}</strong><br>${m.desc}<br>
        <a href="${m.file}" target="_blank" class="file-link">Скачать</a></div>`
    ).join('') || '<p>Нет материалов</p>';

    const students = await loadData('content/students.json');
    document.getElementById('students-content').innerHTML = students.map(s => 
        `<div class="student-item"><strong>${s.name}</strong> – ${s.achievement}</div>`
    ).join('') || '<p>Нет данных</p>';

    const gallery = await loadData('content/gallery.json');
    document.getElementById('gallery-content').innerHTML = gallery.length ? 
        `<div class="gallery-grid">${gallery.map(img => 
            `<img src="${img.url}" alt="${img.caption}">`
        ).join('')}</div>` : '<p>Фотографий нет</p>';

    const contacts = await loadData('content/contacts.json');
    document.getElementById('contacts-content').innerHTML = `
        <div class="contacts-info">
            <p><strong>Email:</strong> ${contacts.email}</p>
            <p><strong>Телефон:</strong> ${contacts.phone}</p>
            <p><strong>Адрес:</strong> ${contacts.address}</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', renderAll);
