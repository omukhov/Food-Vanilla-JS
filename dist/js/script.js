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
});