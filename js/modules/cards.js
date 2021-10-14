function cards() {

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
}

module.exports = cards;