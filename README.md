# BelMarket

BelMarket - это концепция интернет-магазина, загружаемого на основе Excel-таблиц

## Технологии

Backend:

- Python 3.8+
- Django 4.0 + Django REST framework
- PostgreSQL 10+

Frontend:

- Node.js 10+, npm 8+
- React 17 + Webpack 5
- Material-UI 5

## Список задач

Фронтенд:

- [x] Ниспадающее окно с каталогом в строке поиска
- [x] Меню итемов слева от сетки (стилизовать + сделать кликабельным)
- [x] Виджет "понравившиеся"
- [x] Виджет профиля
- [x] Виджет корзины
- [ ] Виджет оплаты
- [ ] Светлая/темная тема
- [x] Паджинация (разбиение сетки товаров на страницы по 15 товаров например)
- [x] Доп. информация в футере + странички (о нас, об оплате, доставка)

Бэкенд (+Redux):

- [x] Сохранение корзины (либо в виде незавершенного ордера в Django, либо Redux)
- [x] Переходы по категориям в меню итемов (Redux)
- [ ] Кликабельность карточек товаров (Redux)
- [x] Загрузка данных в Redux для дальнейшего рендера категорий и карточек товаров
- [x] Поиск по товарам/категориям (Redux)
- [ ] Подтверждение оплаты
- [ ] Docker сборка

## Работа с приложением

- `localhost:8000/docs` - Спецификация API в Swagger

### Установка

```
git clone https://github.com/UberStreuneR/1belmarket.git
```

Поддерживается работа приложения в Docker-среде. В этом случае установка **не требуется** - следует перейти к [переменным окружения](#ref1).

Создать базу данных PostgreSQL (связать с переменными окружения - см. далее)

Установить переменные окружения.

Сборка через _make_:

```
make manual-install
```

На Windows для включения _make_ лучше поставить [GNUWin32](http://gnuwin32.sourceforge.net/install.html) или работать в WSL2 (рекомендуется).

Ручная сборка:

1. Перейти в директорию _backend_
2. Установить виртуальное окружение для python: `python3 -m venv venv`
3. Активировать окружение: `. venv/bin/activate`
4. Поставить зависимости: `pip install -r requirements.txt`
5. Выполнить миграции: `python manage.py makemigrations && python manage.py migrate`
6. Создать суперпользователя в Django: `python manage.py createsuperuser`
7. Перейти в директорию _frontend_ из корня проекта
8. Установить пакеты Node.js: `npm i`

---

#### <a name="ref1"></a> Переменные окружения

**Обязательно** создание **_.dev.env_** файла в корне проекта (В продакшне _.prod.env_). В нем описываются переменные среды. Обязателен _SECRET_KEY_.
|Ключ|По умолчанию|Описание|
|-|-|-|
|SECRET_KEY||Секретный ключ Django|
|DEBUG|1|Флаг процесса разработки Django (0/1)|
|ALLOWED_HOSTS|*|Домены, с которыми работает Django (разделяются пробелом)|
|DB_ENGINE|postgresql_psycopg2|Бэкенд БД в Django (начинается с django.db.backends. при использовании встроенного)|
|DB_NAME|belmarket_dev_db|Имя БД|
|DB_USER|belmarket|Имя пользователя БД|
|DB_PASSWORD|belmarket|Пароль пользователя БД|
|DB_HOST|localhost|Хост БД|
|DB_PORT|5432|Порт БД|
|DOMAIN|http://localhost:8000|Домен сервера (с протоколом) для запросов с фронтенда<br/> *only for development\*|
|VENV_PATH|backend/venv|Путь к файлам виртуального окружения Python|
|POSTGRES_USER||Имя пользователя в docker-образе postgres|
|POSTGRES_PASSWORD||Пароль пользователя в docker-образе postgres|
|POSTGRES_DB||Имя базы данных в docker-образе postgres|
|SUPERUSER_EMAIL||E-mail для создания суперпользователя|
|SUPERUSER_LOGIN|admin|Логин (username) для создания суперпользователя|
|SUPERUSER_PASSWORD|admin|Пароль для создания суперпользователя|

**_Примечания_**

- Ключи с установленным в таблице значением по умолчанию **не обязательны** при использовании этих значений.
- При сборке через docker-compose:
  - Ключи _POSTGRES_ **обязательны**. Для этого можно в файле с переменными прописать `POSTGRES_USER=${DB_USER}`, `POSTGRES_PASSWORD=${DB_PASSWORD}`, `POSTGRES_DB=${DB_NAME}` - сделать переменные зависимыми от конфигурации Django.
  - Ключи _SUPERUSER_ **обязательны**, но могут быть использованы и при ручном запуске скрипта инициализации _backend/init_script.py_.
  - Ключ _DB_HOST_ следует установить в значение **database** (название сервиса в docker-compose).

---

### Запуск

#### С docker-compose

Установить все обязательные переменные окружения.

Запуск с использованием _docker-compose_ или через _make_:

```
make docker-run
```

Запустится многоконтейнерное приложение belmarket с контейнерами belmarket_backend, belmarket_frontend, belmarket_database (и 3 соответствующие им образа), а также том belmarket_postgres_volume. Ручное заполнение **не требуется** - автоматически запустится скрипт инициализации, который создаст суперпользователя Django и заполнит базу данными из примеров таблиц.

#### Без docker-compose

Запустить _PostgreSQL server_.

Запуск приложения через _make_:

```
make -j2
```

#### Ручной запуск

1. Активировать виртуальное окружение
2. В директории _backend_ запустить Django: `python manage.py runserver`
3. В другом терминале в директории _frontend_ запустить Webpack-dev-server: `npm run start`

По адресу **localhost:8000** будет доступен сервер Django, а по адресу **localhost:3000** - приложение на React.

---

### Инструкция по загрузке товаров

1. Авторизоваться по `localhost:8000/api/api-auth/login/`. В случае успеха перебросит на страницу `localhost:8000/accounts/profile/`
2. Загрузить категории по `localhost:8000/api/upload-categories/`
3. Загрузить товары по `localhost:8000/api/upload-items/`

Примеры таблиц лежат в `backend/default_images_and_spreadsheets/`.
