function modal() {

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
}

module.exports = modal;