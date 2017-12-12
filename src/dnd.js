/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */

var getRandom = function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function createDiv() {
    const div = document.createElement('div');

    div.setAttribute('class', 'draggable-div');
    var color = '#';
    var letters = '0123456789ABCDEF'.split('');
    
    for (var i = 0; i < 6; i++) {
        color = color + letters[Math.round(Math.random() * 15)];
    }
    div.style.background = color;
    div.style.height = getRandom(10, 500) + 'px';
    div.style.width = getRandom(10, 500) + 'px';
    div.style.top = getRandom(100, 500) + 'px';
    div.style.left = getRandom(10, 500) + 'px';
    div.style.position = 'absolute';
    
    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    var mouseX = 0;
    var mouseY = 0;

    function dragStart(target) {
        target.dataTransfer.effectAllowed = 'move';
        mouseX = target.offsetX;
        mouseY = target.offsetY;

        return true;
    }

    function dragEnter(target) {
        event.preventDefault();

        return true;
    }

    function dragOver(target) {
        event.preventDefault();
    }

    function dragDrop(target) {
        target.stopPropagation();
        
        return false;
    }

    function dragEnd(target) {
        event.preventDefault();
        this.style.left = event.clientX - mouseX + 'px';
        this.style.top = event.clientY - mouseY + 'px';
    }
    
    var elems = document.querySelectorAll('.draggable-div');
    
    [].forEach.call(elems, function (elem) {
        elem.addEventListener('dragstart', dragStart, false);
        elem.addEventListener('dragenter', dragEnter, false)
        elem.addEventListener('dragover', dragOver, false);
        elem.addEventListener('drop', dragDrop, false);
        elem.addEventListener('dragend', dragEnd, false);
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
