Проект „belmarket“

Цель
Создать сайт, для продажи товаров

Технологический стек:
• python 3.8.10
• asgiref==3.5.0
• Django==4.0.1
• gunicorn==20.1.0
• numpy==1.22.1
• Pillow==9.0.0
• sqlparse==0.4.2
• tzdata==2021.5
• whitenoise==5.3.0
• swiper: '8.0.0'
• npm: '8.4.0'
• node: '16.13.2'

Инструкция по настройке проекта:
• Склонировать проект
• Создать виртуальное окружение ( рекомендуется вне проекта )
• Запустить виртуальное окружение в терминале ( можно использовать PyCharm )
• Обновить pip
• Проверить версию python
• Установить в виртуальное окружение необходимые пакеты из файла requirements.txt с помощью команды: «pip install -r /somePath/requirements.txt»
• Установить миграции командой "python3 manage.py migrate"
• Теперь зайдём в папку 1belmarket/frontend через командную строку или Visual Studio Code
• Для начала установим пакеты «node.js» и «react»
• Затем, установим следующие пакеты
◦ npm init -y
◦ npm i webpack webpack-cli --save-dev
◦ npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
◦ npm i react react-dom --save-dev
◦ npm install @material-ui/core
◦ npm install @babel/plugin-proposal-class-properties
◦ npm install react-router-dom
◦ npm install @material-ui/icons
◦ npm install swiper — обязательно версии 8.0.0
◦ npm install react-router-dom

Инструкция по запуску проекта:
Запуск backend на django:
• Заходим в корневую папку проекта „1belmarket“
• Запускаем виртуальное окружение
• Вводим команду: „python manage.py runserver“
Запуск frontend на react
• Заходим в папку 1belmarket/frontend
• Вводим команду: „npm run dev“

Инструкция по разработке проекта:
• При ошибке миграций, выполнить:
◦ manage.py makemigrations
◦ manage.py migrate
