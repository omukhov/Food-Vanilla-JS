function timer(id, deadline) {

    //Timer                                           // Переменная конца таймера

    function getTimeRemaining(endTime) {                                        // Получение разницы с дедлайна таймера и нынешней датой
        const t = Date.parse(endTime) - Date.parse(new Date()),
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

    setClock(id, deadline);
}

export default timer;