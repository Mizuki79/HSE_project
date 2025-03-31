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
// function startSwing(element, angleRange, speed, initialDirection = 1) {
//     let angle = initialDirection > 0 ? angleRange : -angleRange;
//     let direction = initialDirection;
    
//     function swing() {
//         angle += direction * speed;
//         if (angle > angleRange || angle < -angleRange) {
//             direction *= -1;
//         }
//         element.style.transform = `rotate(${angle}deg)`;
//         requestAnimationFrame(swing);
//     }
    
//     swing();
// }

const bouble_1 = document.getElementById('bouble-1');
const bouble_2 = document.getElementById('bouble-2');
startCircularMotion(bouble_1, 110, 0.02, 1, 60, 90)
startCircularMotion(bouble_2, 150, 0.01, -1, 130, -50)

const ring_bouble = document.getElementById('ring_bouble');
startRotation(ring_bouble, 0.5);

// const ring_bouble_1 = document.getElementById('ring_bouble_1');
// const ring_bouble_2 = document.getElementById('ring_bouble_2');
// startSwing(ring_bouble_1, 5, 0.5);
// startSwing(ring_bouble_2, 5, 0.5, -1);

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
    document.querySelector(".sec").style.display = "flex";
    document.body.style.overflow = "scroll";

    }, 500);
});

// переключаем классы что бы появлялось свечение
document.querySelectorAll('.corner-border-element').forEach(element => {
    element.addEventListener('click', function() {
        // Проверяем, имеет ли элемент класс corner-border
        if (this.classList.contains('corner-border')) {
            // Если имеет, удаляем класс
            this.classList.remove('corner-border');
        } else {
            // Если не имеет, удаляем класс у всех элементов и добавляем к текущему
            document.querySelectorAll('.corner-border-element').forEach(el => {
                el.classList.remove('corner-border');
            });
            this.classList.add('corner-border');
        }
    });
});

document.querySelectorAll('.texture').forEach(element => {
    element.addEventListener('click', function() {
        // Проверяем, имеет ли элемент класс corner-border
        if (this.classList.contains('corner-border')) {
            // Если имеет, удаляем класс
            this.classList.remove('corner-border');
        } else {
            // Если не имеет, удаляем класс у всех элементов и добавляем к текущему
            document.querySelectorAll('.texture').forEach(el => {
                el.classList.remove('corner-border');
            });
            this.classList.add('corner-border');
        }
    });
});

// двигаем спиралью пузырьки

function animateElement(element, rotationSpeed, liftSpeed, maxHeight, swayWidth, initialDirection) {
    const rect = element.getBoundingClientRect();
    const startX = rect.left;
    const startY = rect.top;
    
    let angle = 0;
    let direction = initialDirection;
    let currentHeight = 0;
    
    function animate() {
        angle += rotationSpeed * direction;
        currentHeight += liftSpeed * direction;

        const x = startX + Math.sin(angle) * swayWidth;
        const y = startY - currentHeight;
        
        element.style.transform = `translate(${x - rect.left}px, ${y - rect.top}px)`;
        
        if (currentHeight >= maxHeight) {
            direction = -1; 
        } else if (currentHeight <= 0) {
            direction = 1;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

const elements = document.querySelectorAll('.blister');
elements.forEach((element, index) => {
    const randomRotationSpeed = Math.random() * 0.1 + 0.05; // 0.05 - 0.15
    const randomLiftSpeed = Math.random() * 3 + 2; // 2 - 5
    const randomMaxHeight = window.innerHeight * (Math.random() * 0.5 + 0.2); // 40% - 70% высоты экрана
    const randomSwayWidth = Math.random() * 30 + 20; // 20 - 50 пикселей
    const initialDirection = Math.random() > 0.5 ? 1 : -1; // Рандомное начальное направление

    animateElement(element, randomRotationSpeed, randomLiftSpeed, randomMaxHeight, randomSwayWidth, initialDirection);
});

// Сохранение данных в localStorage
document.querySelectorAll(".save_button").forEach(button => {
    button.addEventListener("click", () => {
        const allElements = document.querySelectorAll('*');
        // Фильтруем элементы, у которых есть box-shadow
        const chooseElems = Array.from(allElements).filter(element => {
            const boxShadow = window.getComputedStyle(element).boxShadow;
            return boxShadow !== 'none';
        });
        ids = chooseElems.map(elem => elem.id);
        localStorage.setItem('ids', JSON.stringify(ids));
    });
}); 

// Добавляем элемент загрузки
document.querySelectorAll(".convert_button").forEach(button => {
    button.addEventListener("click", () => {
        const loader = document.getElementById('loader');
        loader.style.display = 'block'; // Показываем элемент загрузки

        setTimeout(() => {
            loader.style.display = 'none';
            try{
                data = localStorage.getItem('ids');
                data = JSON.parse(data);
                if (data.lentgh > 1 || data) {
                    document.querySelector(".error").style.visibility = "hidden";
                    combined = data[0] + data[1]
                    switch (combined){
                        case "duckwood":
                            document.querySelector(".final-img").src = "../images/";
                            break;
                        case "duckiron":
                            document.querySelector(".final-img").src = "images/silver/ducks.png";
                            break;
                        case "duckstone":
                            document.querySelector(".final-img").src = "";
                            break;
                        case "blotwood":
                            document.querySelector(".final-img").src = "images/wood/blotwood.png";
                            break;
                        case "blotiron":
                            document.querySelector(".final-img").src = "images/silver/blot.png";
                            break;
                        case "blotstone":
                            document.querySelector(".final-img").src = "images/stone/blotstone.png";
                            break;
                        case "hedgehogwood":
                            document.querySelector(".final-img").src = "images/wood/hedgehog.png";
                            break;
                        case "hedgehogiron":
                            document.querySelector(".final-img").src = "images/silver/hedgehock.png";
                            break;
                        case "hedgehogstone":
                            document.querySelector(".final-img").src = "images/stone/hedgehogstone.png";
                            break;
                        default:
                            console.log("Комбинация не найдена");
                            break;
                    }
                }
            }
            catch(error) {
                console.log(error);
                document.querySelector(".error").style.visibility = "visible";
            }
        }, 2000);
    });
});

