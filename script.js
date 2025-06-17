    // надписи и цвета на секторах
const prizes = [
  { 
  text: "Сплетница", color: "hsl(197, 30%, 43%)"
   },

  { 
  text: "Лонг Айленд Айс Ти", color: "hsl(173, 58%, 39%)"
   },

  { 
  text: "Пина Колада", color: "hsl(43, 74%, 66%)"
   },

  { 
  text: "Сливочный виски", color: "hsl(27, 87%, 67%)"
   },

  { 
  text: "Голубые гавайи", color: "hsl(12, 76%, 61%)"
   },

  { 
  text: "Голубая Лагуна", color: "hsl(350, 60%, 52%)"
   },

  { 
  text: "Тропик твист", color: "hsl(91, 43%, 54%)"
   },

  { 
  text: "Сангрия Красная", color: "hsl(140, 36%, 74%)"
   },

  { 
  text: "Мохито", color: "hsl(90, 50%, 55%)"
   },

  { 
  text: "Космо", color: "hsl(300, 60%, 50%)"
   },

  { 
  text: "Цитрус", color: "hsl(60, 70%, 60%)"
   },

  { 
  text: "Мохито «Блю Оранж»", color: "hsl(20, 75%, 60%)"
   },

  { 
  text: "Мохито Клубничный", color: "hsl(0, 70%, 55%)"
   },

  { 
  text: "Ramos Fizz", color: "hsl(210, 40%, 70%)"
   },

  { 
  text: "Screwdriver (Отвертка)", color: "hsl(30, 80%, 60%)"
   },

  { 
  text: "Джин Тоник", color: "hsl(180, 30%, 65%)"
   },

  { 
  text: "Белая леди", color: "hsl(330, 20%, 70%)"
   },

  { 
  text: "Водка Тоник", color: "hsl(160, 40%, 60%)"
   },

  { 
  text: "Ирландский кофе", color: "hsl(20, 50%, 40%)"
   },

  { 
  text: "Куба Лиbre", color: "hsl(150, 60%, 45%)"
   },

  { 
  text: "Кельтская Маргарита", color: "hsl(300, 50%, 60%)"
   },

  { 
  text: "Между Простынями", color: "hsl(200, 30%, 60%)"
   },

  { 
  text: "Виски Сауэр", color: "hsl(40, 90%, 55%)"
   },
   
  { text: "Водка Сауэр", color: "hsl(100, 50%, 60%)"
   },

  { 
  text: "Джин Физз", color: "hsl(170, 60%, 55%)"
   },

  { 
  text: "Френч 75", color: "hsl(60, 70%, 65%)"
   },

  { 
  text: "Базил смэш", color: "hsl(120, 60%, 50%)"
   },

  { 
  text: "Балалайка", color: "hsl(270, 50%, 60%)"
   },

  { 
  text: "Старая дева", color: "hsl(240, 40%, 60%)"
   },

  { 
  text: "Нью-Йорк Сауэр", color: "hsl(10, 70%, 55%)"
   },

  { 
  text: "Лонг Берри Айс Ти", color: "hsl(320, 60%, 60%)"
   },

  { 
  text: "Розовая пантера", color: "hsl(340, 70%, 65%)"
   },

  { 
  text: "Виски кола", color: "hsl(20, 60%, 50%)"
   },

  { 
  text: "Апельсиновый егерь", color: "hsl(30, 80%, 65%)"
   },

  { 
  text: "Егерь сауэр", color: "hsl(20, 90%, 55%)"
   }
];

// создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");

// на сколько секторов нарезаем круг
const prizeSlice = 360 / prizes.length;
// на какое расстояние смещаем сектора друг относительно друга
const prizeOffset = Math.floor(180 / prizes.length);
// прописываем CSS-классы, которые будем добавлять и убирать из стилей
const spinClass = "is-spinning";
const selectedClass = "selected";
// получаем все значения параметров стилей у секторов
const spinnerStyles = window.getComputedStyle(spinner);

// переменная для анимации
let tickerAnim;
// угол вращения
let rotation = 0;
// текущий сектор
let currentSlice = 0;
// переменная для текстовых подписей
let prizeNodes;

// расставляем текст по секторам
const createPrizeNodes = () => {
  // обрабатываем каждую подпись
  prizes.forEach(({ text, color, reaction }, i) => {
    // каждой из них назначаем свой угол поворота
    const rotation = ((prizeSlice * i) * -1) - prizeOffset;
    // добавляем код с размещением текста на страницу в конец блока spinner
    spinner.insertAdjacentHTML(
      "beforeend",
      // текст при этом уже оформлен нужными стилями
      `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
        <span class="text">${text}</span>
      </li>`
    );
  });
};

// рисуем разноцветные секторы
const createConicGradient = () => {
  // устанавливаем нужное значение стиля у элемента spinner
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizes
        // получаем цвет текущего сектора
        .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
        .reverse()
      }
    );`
  );
};

// создаём функцию, которая нарисует колесо в сборе
const setupWheel = () => {
  // сначала секторы
  createConicGradient();
  // потом текст
  createPrizeNodes();
  // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
  prizeNodes = wheel.querySelectorAll(".prize");
};

// определяем количество оборотов, которое сделает наше колесо
const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция запуска вращения с плавной остановкой
const runTickerAnimation = () => {
  // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];  
  let rad = Math.atan2(b, a);
  
  if (rad < 0) rad += (2 * Math.PI);
  
  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  // анимация язычка, когда его задевает колесо при вращении
  // если появился новый сектор
  if (currentSlice !== slice) {
    // убираем анимацию язычка
    ticker.style.animation = "none";
    // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
    setTimeout(() => ticker.style.animation = null, 10);
    // после того, как язычок прошёл сектор - делаем его текущим 
    currentSlice = slice;
  }
  // запускаем анимацию
  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

// функция выбора призового сектора
const selectPrize = () => {
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
};

// отслеживаем нажатие на кнопку
trigger.addEventListener("click", () => {
  // делаем её недоступной для нажатия
  trigger.disabled = true;
  // задаём начальное вращение колеса
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  // убираем прошлый приз
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
  wheel.classList.add(spinClass);
  // через CSS говорим секторам, как им повернуться
  spinner.style.setProperty("--rotate", rotation);
  // возвращаем язычок в горизонтальную позицию
  ticker.style.animation = "none";
  // запускаем анимацию вращение
  runTickerAnimation();
});

// отслеживаем, когда закончилась анимация вращения колеса
spinner.addEventListener("transitionend", () => {
  // останавливаем отрисовку вращения
  cancelAnimationFrame(tickerAnim);
  // получаем текущее значение поворота колеса
  rotation %= 360;
  // выбираем приз
  selectPrize();
  // убираем класс, который отвечает за вращение
  wheel.classList.remove(spinClass);
  // отправляем в CSS новое положение поворота колеса
  spinner.style.setProperty("--rotate", rotation);
  // делаем кнопку снова активной
  trigger.disabled = false;
});

// подготавливаем всё к первому запуску
setupWheel();