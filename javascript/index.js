// определояем рандомное положение для лампочки
function randomPositionInContainer(element, container) {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    
    // Генерируем случайные координаты внутри контейнера
    const randomX = Math.floor(Math.random() * containerWidth);
    const randomY = 100;
    
    // Устанавливаем позицию элемента
    element.style.position = 'absolute';
    element.style.left = `${randomX}px`;
    element.style.top = `${randomY}px`;
    
    // Проверяем, существует ли уже линия, если да — удаляем её
    let existingLine = container.querySelector('.vertical-line');
    if (existingLine) {
        existingLine.remove();
    }
    
    // Создаем линию
    let line = document.createElement('div');
    line.classList.add('vertical-line');
    line.id = 'line';
    line.style.position = 'absolute';
    line.style.left = `${randomX + 25}px`; // Центрируем линию относительно элемента
    line.style.top = '0px';
    line.style.width = '2px';
    line.style.height = `${randomY + 11}px`; // Длина линии до элемента
    line.style.zIndex = 2; 
    line.style.background = '#120d09';
    line.style.borderRadius = '10px'
    
    // Добавляем линию в контейнер
    container.appendChild(line);
}


// ставим курсор котика
function setCustomCursor(imageUrl, hotSpotX = 10, hotSpotY = 10) {
    const cursorStyle = `url('${imageUrl}') ${hotSpotX} ${hotSpotY}, auto`;
    document.body.style.cursor = cursorStyle;
}

// при загрузке страницы создаем лампочку и меняем курсос 
document.addEventListener('DOMContentLoaded', () => {
    const lamp = document.getElementById('lamp');
    randomPositionInContainer(lamp, document.body);
})

// получаем элемент затемненного слоя
const overlay = document.querySelector('.overlay');

// обновляем позицию светового круга при движении курсора
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    overlay.style.setProperty('--x', `${x}px`);
    overlay.style.setProperty('--y', `${y}px`);
});

document.getElementById('lamp').addEventListener('click', () => {
    document.getElementById('overlay').remove();
    document.getElementById('startPage').remove();
    document.getElementById('lamp_png').src = 'images/lamp_on.png';
    setCustomCursor('images/cursor_main_page.png');
    document.body.style.overflow = 'visible';
});