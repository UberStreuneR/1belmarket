Инструкция по настройке проекта:
1. Склонировать проект
2. Создать виртуальное окружение (рекомендуется вне проекта)
3. Запустить виртуальное окружение в терминале (можно использовать PyCharm)
4. Обновить pip
5. Проверить версию python
6. Установить в виртуальное окружение необходимые пакеты из файла requirements.txt с помощью команды: «pip install -r /somePath/requirements.txt»
7. Произвести миграции командой "python3 manage.py makemigrations" и "python3 manage.py migrate"
8. Теперь зайдём в папку 1belmarket/frontend через командную строку или Visual Studio Code
9. Затем, установим следующие пакеты командой "npm install" - установит все необходимые пакеты из package.json


Запуск backend на django:
1. Заходим в корневую папку проекта „1belmarket“
2. Запускаем виртуальное окружение
3. "python manage.py createsuperuser"
4. "python manage.py collectstatic"
5. "python manage.py runserver"
6. Заходим под созданным суперпользователем по ссылке "host:port/api/api-auth/login"
7. Если перебросило на "host:port/accounts/profile", то вход успешен

Запуск frontend на react
1. Заходим в папку 1belmarket/frontend
2. Вводим команду: „npm run dev“

При ошибке миграций, выполнить:
1. manage.py makemigrations
2. manage.py migrate

Инструкция по загрузке товаров:
1. Загружаем категории всегда ДО товаров: "host:port/api/upload-categories"
2. В открывшейся форме выбираем файл belmarket/default_images_and_spreadsheets/CategoriesSample.xslx
3. Загружаем товары: "host:port/api/upload-items"
4. В открывшейся форме выбираем файл belmarket/default_images_and_spreadsheets/ItemsSample.xslx
5. Удалить все категории или все товары можно по ссылкам "api/delete-categories" и "api/delete-items"
6. Добавить свои товары или категории можно, изменив указанные .xlsx файлы и загрузив картинки в дефолтную папку
7. Товары без изображений будут использовать изображения по ссылке "https://source.unsplash.com/random"


