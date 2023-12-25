## EducationalDepartment
## Запуск проекта ##

1. Склонировать репозиторий
   
```
https://github.com/Antik88/EducationalDepartment.git
```

2. Перейти в папку проекта

```
cd EducationalDepartment
```

3. Установить зависимости для сервера
   
```
cd server
EducationalDepartment/server> npm i
```

4. Установить зависимости для клиента

```
cd client
EducationalDepartment/client> npm i 
```

5. Выполнить импорт дампа базы данных backupData.sql в PgAdmin 4

Дальше в папке сервера изменить файл .env

```
PORT = 5000
DB_NAME = "Название БД в postgres" 
DB_USER = postgres
DB_PASSWORD = "Пароль от postgres" 
DB_HOST = localhost
DB_PORT = 5432
SECRET_KEY = random_key_123 
```

Запусить сервер

```
EducationalDepartment/server> npm run dev
```

Запустить клиент через второй терминал

```
EducationalDepartment/clent> npm start
```

