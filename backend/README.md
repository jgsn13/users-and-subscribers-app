# Users and Subscribers API
### I'm currently using Mysql/Mariadb so don't forget to create a .env file with the following content:
```
DB=<database_name>
DB_HOST=<database_host>
DB_PORT=<database_port>
DB_USERNAME=<database_user>
DB_PASSWORD=<database_password>
JWT_SECRET=<jwt_secret>
SECRET_KEY=<secret_key>
```
**SECRET_KEY is used to create new users.**

### Use the following command to create new migrations:
``` sh
typeorm migration:create ./src/database/migrations/<NameOfTheMigration>
```
### ... then you can use the following command to run the migrations:
```
typeorm migration:run -d ./src/data-source.ts
```
