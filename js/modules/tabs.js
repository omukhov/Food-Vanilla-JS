function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    //tabs
    const tabs = document.querySelectorAll(tabsSelector),                 // Получение табов из верстки, на которых есть переходы на контент
          tabsContent = document.querySelectorAll(tabsContentSelector),               // Получение контента табов
          tabsParent = document.querySelector(tabsParentSelector);             // Получение родителя табов для делегирования ему событий
        
    function hideTabContent() {                                                 // Функция скрытия контента
        tabsContent.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });

        tabs.forEach(element => {
            element.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {                                            // Функция показывания контента
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {                           // Обработчик нажатия на таб
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((element, i) => {
                if(target == element) {  
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;