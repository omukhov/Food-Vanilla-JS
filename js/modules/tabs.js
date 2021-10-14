function tabs() {

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
}

module.exports = tabs;