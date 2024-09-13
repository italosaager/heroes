# Heroes

### Simple fullstack development project for projection purposes

## Steps to run at localhost

* Clone this project

* Create a local postgreSQL database called heroes
* Create table "tb_ability" with columns "id_ability" and "name_ability".
* Create table "tb_hero" with columns "id_hero" and "name_hero" and a foregin key "fk_ability" linked to "id_ability".

* Inside the project folder /frontend run:

```
npm install
npm run dev
```

* Inside the project folder /backend at application.properties, change the variables of the database to your data.

```
spring.datasource.username=${your-db-username}
spring.datasource.password=${your-db-password}
```

* Access the class BackendApplication and Run the project by and pressing "ctrl+shift+F10" if you are using IntelliJ IDEA.
