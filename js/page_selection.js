var
        page_number = 1;
        begin_flag = false;

    function pageSelector(page_switch) {
        var
            link = '';

        switch(page_switch) {
            case 'next':
                if (begin_flag) {                           //Начинаем все сначала
                    page_number = 1;
                    document.getElementsByName("btn_right")[0].value="Подробнее...";
                    document.getElementsByName("btn_left")[0].style.display="inline";
                    begin_flag = false;
                    link = 'content/first.html';
                    break; 
                }

                switch(page_number){
                    case 1: 
                        document.getElementsByName("btn_right")[0].value="Еще подробнее.";
                        break;
                    case 2: 
                        document.getElementsByName("btn_right")[0].value="Еще подробнее..";
                        break;
                    case 3: 
                        document.getElementsByName("btn_right")[0].value="Еще подробнее...";
                        break;
                    case 4: 
                        document.getElementsByName("btn_right")[0].value="Еще подробнее....";
                        break;
                    case 5: 
                        document.getElementsByName("btn_right")[0].value="Еще подробнее.....";
                        break;
                }
                
                link = 'content/page' + page_number + '.html';      //Переключаемся на следующую страницу детализации
                page_number++;
                
                if (page_number > 6) {                      //Дошли до последнего уровня детелизации
                    document.getElementsByName("btn_right")[0].value="Не понял!";
                    begin_flag = true;
                }
                
                break;
            case 'contacts':
                link = 'content/contacts.html';
                page_number = 1;
                begin_flag = true;
                document.getElementsByName("btn_right")[0].value="И что?";
                document.getElementsByName("btn_left")[0].style.display="none";
                break;
        }

        showContent(link);
    }

    function showContent(link) {

        var cont = document.getElementById('contentBody');
        var loading = document.getElementById('loading');

        cont.innerHTML = loading.innerHTML;

        var http = createRequestObject();                   // создаем ajax-объект
        if( http ) {
            http.open('get', link);                         // инициируем загрузку страницы
            http.onreadystatechange = function () {         // назначаем асинхронный обработчик события
                if(http.readyState == 4) {
                    cont.innerHTML = http.responseText;     // присваиваем содержимое
                }
            }
            http.send(null);    
        } else {
            document.location = link;   // если ajax-объект не удается создать, просто перенаправляем на адрес
        }

    }

    // создание ajax объекта
    function createRequestObject() {
        try { return new XMLHttpRequest() }
        catch(e) {
            try { return new ActiveXObject('Msxml2.XMLHTTP') }
            catch(e) {
                try { return new ActiveXObject('Microsoft.XMLHTTP') }
                catch(e) { return null; }
            }
        }
    }