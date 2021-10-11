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
          modal = document.querySelector('.modal');               // Кнопка закрытия модального окна


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

    modal.addEventListener('click', (e) => {                                    // Закрытие модально окна на клик за пределы модального окна
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {                               // Закрытие модального окна на кнопку Escape
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);                           // Интервал появления модального окна

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

    const getResource = async (url) => {                                        // Получение данных с базы для карточек
        const response = await fetch(url);

        if (!response.ok) {                                                     // Если происходит ошибка сервера, то выходит исключение
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        return await response.json();
    };

    /* getResource('http://localhost:3000/menu')                                   // Перебор данных массива массивов из базы и получение свойств для карточек
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        }); */

    axios.get('http://localhost:3000/menu')                                         // Перебор данных массива массивов из базы и получение свойств для карточек при помощи axios
        .then(card =>  {
            card.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    
    // Forms

    const forms = document.querySelectorAll('form');                            // Получение формы для отправки данных

    const message = {                                                           // Сообщения пользователю
        loading: 'img/form/spinner.svg',
        success: 'Cпасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {                                     // Отправка данных в базу данных
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: data
        });

        return await response.json();
    };

    function bindPostData(form) {                                                   // Отправка данных с формы на сервер
        form.addEventListener('submit', (e) =>{
            e.preventDefault();

            const statusMessage = document.createElement('img');                    // Формирование новой формы благодарности пользователя
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            //  Превращает formData в массив массивов и потом превращает в классический объект а затем в JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));    
 
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

        }); 
    }

    function showThanksModal(message) {                                         // Модальное окно благодарности пользователю
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 2000);
    }

    // Slider

    const slides = document.querySelectorAll('.offer__slide'),                  // Получение данных слайдера
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;        
    let offset = 0;                                                             // Изначальный индекс слайдера
    
    if (slides.length < 10) {                                                   // Условие при котором добавляется 0 цифрам в конечном количестве слайдов (Изначальное положение)
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';                        // Ширина блока N (количество слайдов) * 100%   
    slidesField.style.display = 'flex';                                         // Построение слайдов горизонтально
    slidesField.style.transition = '0.5s all';                                  // Плавность анимации

    slidesWrapper.style.overflow = 'hidden';                                    // Сокрытие лишних слайдов

    slides.forEach(slide => {                                                   // Перебор слайдов и установка им одиннаковой ширины
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),                            // Получение списка точек
          dots = [];

    // Стили для индикатора карусели
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        // Стили для точек
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        // Если дошло до конца, то возврашается в начало
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {    
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {                                               // Прибавление 0 к цифрам
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        // Если дошло до начала, то возврашается в конец
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    /* showSlides(slideIndex);

    if (slides.length < 10) {                                                   // Условие при котором добавляется 0 цифрам в конечном количестве слайдов
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {                                                // Если выходит за пределы слайдера, возвращается к единице и наоборот
            slideIndex = 1;
        } 

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(slide => {                                               // Сокрытие других слайдов
            slide.style.display = 'none';
        });

        slides[slideIndex - 1].style.display = 'block';                         // Показ нужного слайда

        if (slides.length < 10) {                                               // Условие при котором добавляется 0 цифрам в временном количестве слайдов
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {                                                    // Вызывает функцию показывания слайдов
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    }); */


});