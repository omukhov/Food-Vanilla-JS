function forms() {

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
}

module.exports = forms;