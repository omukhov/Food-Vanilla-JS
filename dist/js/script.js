window.addEventListener('DOMContentLoaded', () => {

    
    
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),                 // Получение табов из верстки, на которых есть переходы на контент
          tabsContent = document.querySelectorAll('.tabcontent'),               // Получение контента табов
          tabsParent = document.querySelector('.tabheader__items');             // Получение родителя табов для делегирования ему событий
        
    function hideTabContent() {                                                 // Функция скрытия контента
        tabsContent.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });

        tabs.forEach(element => {
            element.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {                                            // Функция показывания контента
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {                           // Обработчик нажатия на таб
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((element, i) => {
                if(target == element) {  
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2021-10-10';                                               // Переменная конца таймера

    function getTimeRemaining(endTime) {                                        // Получение разницы с дедлайна таймера и нынешней датой
        const t = Date.parse(deadline) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60 ),
              seconds = Math.floor((t / 1000) % 60 );

        return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds  
        };
    }

    function getZero(num) {                                                     // Добавление 0 если значение таймера < 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {                                      // Изменение времени таймера
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {                                                // Обновление времени таймера
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
             
            if (t.total <= 0) {
                clearInterval(timeInterval); 
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),             // Кнопки для вызова модального окна
          modal = document.querySelector('.modal'),                             // Модальное окно для связи
          modalClose = document.querySelector('[data-close]');                  // Кнопка закрытия модального окна


    function openModal() {                                                      // Открытие модального окна
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {                                                     // Закрытие модального окна
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(element => {                                           // Нажатие кнопки вызова модального окна
        element.addEventListener('click', openModal);
    });
   
    modalClose.addEventListener('click', closeModal);                           // Закрытия модального окна

    modal.addEventListener('click', (e) => {                                    // Закрытие модально окна на клик за пределы модального окна
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {                               // Закрытие модального окна на кнопку Escape
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);                           // Интервал появления модального окна

    function showModalByScroll() {                                              // Показывание модального окна, когда пользователь прокрутил до конца страницы
        if (window.pageYOffset + document.documentElement. 
            clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

    }

    window.addEventListener('scroll', showModalByScroll);

    // Карточки

    class MenuCard {                                                            // Класс карточки
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 76;
            this.changeToRubles();
        }

        changeToRubles() {                                                      // Конвертация в рубли
            this.price = this.price * this.transfer;
        }

        render() {                                                              // Рендер верстки карточки
            const element = document.createElement('div');
            
            if (this.classes.length === 0) {                                    // Если массив классов пустой
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className);
                });
            }
                                                                                // Верстка карточки
            element.innerHTML = `                                               
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> р/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        4,
        '.menu .container',
        'menu__item',
        'big'

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        8,
        '.menu .container',
        'menu__item'

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        7,
        '.menu .container',
        'menu__item'

    ).render();
    
});