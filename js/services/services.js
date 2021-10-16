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

const getResource = async (url) => {                                        // Получение данных с базы для карточек
    const response = await fetch(url);

    if (!response.ok) {                                                     // Если происходит ошибка сервера, то выходит исключение
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
};

export {postData, getResource};