/*создается стрелочная функция с параметрами тип данных и массивом значений, созданный через оператор spread,
далее массив фильтруется через метод filter, получает каждый элемент, введенный нами и сравнивает его тип с типом данных type
*/
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	//инициализируется стрелочная функция
  hideAllResponseBlocks = () => {
	//создается массив из коллекции div элементов DOM с классом dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
	//Через forEach каждому элементу массива(block) присваивается стиль display:none
    responseBlocksArray.forEach(block => block.style.display = 'none');
  },
	//Создается стрелочная функиця для отображения блоков элементов с тремя параметрами
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//Вызывается, написанная ранее функция скрытия div элементов
		hideAllResponseBlocks();
		// по переданному аргументу blockSelector отображается элемент на странице
		document.querySelector(blockSelector).style.display = 'block';
		/*Если передан аргумент spanSelector, то присваивается текст из переменной аргумента msgText элементу
		spanSelector на странице
		*/
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
    }
  },

	//Инициализируется стрелочная функция с одним параметром msgText и в ней вызывается функция showResponseBlock с 3 определенными аргументами, присутствует ошибка: вместо ; используется ,
  showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//Инициализируется стрелочная функция с одним параметром msgText и в ней вызывается функция showResponseBlock с 3 определенными аргументами, присутствует ошибка: вместо ; используется ,
  showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//Инициализируется стрелочная функция и в ней вызывается функция showResponseBlock с одним определенным аргументом
	//если нет результатов, то отображает пустой div, присутствует ошибка: вместо ; используется ,
  showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	//инициализируется стрелочная фунцкция с 2 параметрами
  tryFilterByType = (type, values) => {
		//ставится блок try для отлавливания ошибок
    try {
			//Стрелочная функция вызывает саму себя через eval с параметрами и массив значений
			//преобразуется в строку через делиметр ", ", результат присваивается переменной
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//Создается переменная, в которую присваиваются строковый тип данных, оценивается количество
			//символов в строке через тернарный оператор, если строка не пустая, то присваивается переменной
			//строка с данными, иначе присваивается строка, что данные типа отсутствуют
      const alertMsg = (valuesArray.length) ?
        `Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			//Вызывается функция отображения результатов и в span записываются данные из alertMsg
			showResults(alertMsg);
			//ставится блок catch для отлавливания объекта ошибки с аргументом error
    } catch (e) {
			//Вызывается стрелочная функция, в аргумент которой передается объект ошибки для отображения в span
			//на странице
      showError(`Ошибка: ${e}`);
    }
  };
//Находим кнопку на странице по ее id
const filterButton = document.querySelector('#filter-btn');
//Вызываем обработчик события click по данной кнопке с вызовом callback функци,
//в которую передаем объект event
filterButton.addEventListener('click', e => {
	//Находим select со страницы через id
	const typeInput = document.querySelector('#type');
	//Находим input со страницы через id
  const dataInput = document.querySelector('#data');
//Если значение input пустая строка
  if (dataInput.value === '') {
		//Используется метод setCustomValidity объекта прототипа HTMLInputElement для вывода 
		//кастомной ошибки (строки) для input
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//вызывается стрелочная функция для отображения блока
		showNoResults();
		//если значение input не пустое
  } else {
		//Используется метод setCustomValidity объекта прототипа HTMLInputElement для вывода 
		//кастомной ошибки (строки) для input - пустое значение
		dataInput.setCustomValidity('');
		//Блокируется перезагрузка браузера при нажатии кнопки button
		e.preventDefault();
		//Вызывается стрелочная функция вывода результатов на страницу
		//применяется метод trim для значений input и select, чтобы убрать пробелы в начале и в конце строки
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});

