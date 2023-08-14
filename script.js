/*1. Получаем ноды: 
- из поля, куда ввели сумму для конвертации
- из селекта с типом валюты, которую конвертируем
- из селекта с типом валюты, в которую конвертируем
- из поля, куда будем выводить результат конвертации
- из дива, который будем включать для отображения результата (по умолчанию див скрыт)
- для кнопки "Конвертировать"
*/
const API = "https://open.er-api.com/v6/latest/USD";
const search = document.querySelector(".searchbox");
const fromCur = document.querySelector(".from");
const toCur = document.querySelector(".to");
const finalValue = document.querySelector(".finalValue");
const finalAmount = document.getElementById("finalAmount");
const convertButton = document.querySelector(".convert");

/*2. Получаем значения из нод и
пишем обработчики для получения данных из нод, 
когда эти данные выбраны/указаны в этих нодах */

let resultFrom, resultTo, searchValue;

//тип валюты, из которой конвертируем
fromCur.addEventListener("change", (event) => {
    resultFrom = event.target.value;
});

//тип валюты, в которую конвертируем
toCur.addEventListener("change", (event) => {
    resultTo = event.target.value;
});

//сумма валюты, которую конвертируем
search.addEventListener("change", (event) => {
    searchValue = event.target.value;
});


/*2. Функция вывода результата конвертации */

function displayResult(currency) {

    //из присланного сервисом https://www.exchangerate-api.com/ ответа - Response
    //в массиве валют берем по значению currency - тип валюты, 
    //значение rates - курс валюты
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];

    //Подсчитываем и выводим в наш скрытый див конвертнутое значение, ограничив его 5-ю знаками после запятой    
    finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(5);

    //Делаем скрытый див с результотом видимым
    finalAmount.style.display = "block";
}

/*3. Получение данных по API при клике на кнопку "Конвертировать" */
convertButton.addEventListener("click", () => {
    fetch(API)
        .then((data) => {
            return data.json();
        })
        .then(displayResult)
        .catch((error) => {
            console.error("ERROR!!!", error);
        });
});