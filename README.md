# 📋 Blog Backend

🔹 Это бэкенд-часть проекта блога, реализованная с использованием **Node.js**, **Express**, **TypeScript**, **MySQL**, **Sequelize** и **JWT** для аутентификации.

---

## ⚙️ Стек технологий

* **Node.js** — серверное окружение
* **Express** — веб-фреймворк
* **TypeScript** — типизация
* **MySQL** — СУБД
* **Sequelize** — ORM для MySQL
* **JWT** — токен-авторизация
* **bcrypt** — хэширование паролей
* **Multer** — загрузка изображений
* **class-validator** — валидация DTO
* **dotenv** — переменные окружения

---

## 🚀 Установка и запуск

### 🔧 1. Клонирование репозитория

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app/backend
```

### 📦 2. Установка зависимостей

```bash
npm install
# или
yarn install
```

### 🧪 3. Переменные окружения

Создайте файл `.env` и добавьте:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=blog_db
DB_USER=root
DB_PASSWORD=your-password
JWT_SECRET=your-secret
```

> 🔐 `JWT_SECRET` можно сгенерировать:
>
> ```bash
> openssl rand -base64 32
> ```

### 🗄️ 4. Инициализация базы данных

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed
```

*(если используешь CLI Sequelize, иначе настрой миграции вручную)*

### ▶️ 5. Запуск сервера

```bash
npm run dev
# или
yarn dev
```

Сервер будет доступен на: [http://localhost:4000](http://localhost:4000)

---

## 📦 API

Базовый путь API: `/api`

* `POST /api/auth/register` — регистрация
* `POST /api/auth/login` — логин (возвращает JWT)
* `GET /api/posts` — получить все посты (пагинация, поиск)
* `GET /api/posts/:id` — получить пост по ID
* `POST /api/posts` — создать пост (только для авторизованных)
* `PATCH /api/posts/:id` — редактировать пост
* `DELETE /api/posts/:id` — удалить пост

Заголовок авторизации:

```http
Authorization: Bearer <your_token>
```

---

## 🔐 Аутентификация

* Используется JWT (генерация и валидация токена)
* Авторизованные маршруты защищаются кастомным middleware
* Токен можно передавать в `Authorization` или как cookie

---

## 🖼 Загрузка изображений

* Используется `Multer`
* POST-запрос с `multipart/form-data`
* Картинка сохраняется в `src/uploads`
* URL картинки формируется и возвращается вместе с постом

---

## ⚠️ Обработка ошибок

* Валидация DTO через `class-validator`
* Все ошибки проходят через `errorHandler`
* Кастомные ошибки реализованы через `ApiError`

---

## 📦 Структура проекта

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── posts/
│   ├── common/
│   │   ├── middlewares/
│   │   └── errors/
│   ├── uploads/              # загруженные файлы
│   ├── index.ts                # express app
├── .env
└── tsconfig.json
```
