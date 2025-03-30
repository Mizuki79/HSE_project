// Функция для анимации кругового движения
function startCircularMotion(element, radius, speed, direction, x, y) {
    let angle = 0;
    const centerX = x;
    const centerY = y;
    
    function animate() {
        angle += direction * speed;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        element.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Функция для анимации вращения
function startRotation(element, speed) {
    let rotation = 0;
    
    function rotate() {
        rotation += speed;
        element.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotate);
    }
    
    rotate();
}

// Функция для анимации вращения туда сюда
function startSwing(element, angleRange, speed, initialDirection = 1) {
    let angle = initialDirection > 0 ? angleRange : -angleRange;
    let direction = initialDirection;
    
    function swing() {
        angle += direction * speed;
        if (angle > angleRange || angle < -angleRange) {
            direction *= -1;
        }
        element.style.transform = `rotate(${angle}deg)`;
        requestAnimationFrame(swing);
    }
    
    swing();
}

const bouble_1 = document.getElementById('bouble-1');
const bouble_2 = document.getElementById('bouble-2');
startCircularMotion(bouble_1, 110, 0.02, 1, 60, 90)
startCircularMotion(bouble_2, 150, 0.01, -1, 130, -50)

const ring_bouble = document.getElementById('ring_bouble');
startRotation(ring_bouble, 0.5);

const ring_bouble_1 = document.getElementById('ring_bouble_1');
const ring_bouble_2 = document.getElementById('ring_bouble_2');
startSwing(ring_bouble_1, 5, 0.5);
startSwing(ring_bouble_2, 5, 0.5, -1);

document.querySelector(".handdrawn-button").addEventListener("click", () => {
    const textElement = document.querySelector('.handdrawn-button');
    const textElement2 = document.querySelector('.greeting');
    textElement.classList.remove('shake');
    textElement2.classList.remove('shake');
    // Принудительно перерисовываем элемент, чтобы анимация сработала снова
    void textElement.offsetWidth;
    void textElement2.offsetWidth;

    textElement.classList.add('shake');
    textElement2.classList.add('shake');
    setTimeout(() => { 
    document.querySelector(".fst").style.display = "none";
    document.querySelector(".sec").style.display = "block";
    }, 500);
});