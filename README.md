## This project is built with

- Node.js
- MYSQL
- Sequelize 
- Express
- Mocha
- Chai


## Get Started

This project require some prequesites and dependenscies to be installed, you can find the instructions below

> To get a local copy, follow these next steps:

## Install

1. Clone the repo
   git clone https://github.com/ahmadmaherr/library-management-system
   

2. Install dependenscies

   npm install

3. Create databases

   - connect to the default mysql database as the server's root user:

    mysql -u root -p
    

   - In mysql run the following to create a user:

    CREATE USER 'root'@'localhost' IDENTIFIED BY '1234';
`

   - In mysql run the following to create the dev database:

    CREATE DATABASE db_library_management_system;

   - Connect to the databases and grant all privileges:

    GRANT ALL PRIVILEGES ON db_library_management_system.* TO 'root'@'localhost';


5. Enviromental Variables Set up

   - Here are the environmental variables that needs to be set in a .env file. This is the default setting that I used for development, but you can change it to what works for you:


   DB_MYSQL_HOST=mydb
   DB_MYSQL_PORT=3306
   DB_MYSQL_USER=root
   DB_MYSQL_PASSWORD=1234
   DB_MYSQL_DATABASE_NAME=db_library_management_system
   DB_MYSQL_DIALECT=mysql

   JWT_SECRET=jwtsecretkey



6. Run Migrations
    run:
    npm run migrate:up

    open package.json file and change line 5 from '"type": "commonjs",' to '"type": "module",'

7. Run development server using docker compose using this command:

   docker-compose up 

8. Run development server using docker compose using this command:
      
      change .env to: 
         DB_MYSQL_HOST=localhost
         DB_MYSQL_PORT=3306
         DB_MYSQL_USER=root
         DB_MYSQL_PASSWORD=1234
         DB_MYSQL_DATABASE_NAME=db_library_management_system
         DB_MYSQL_DIALECT=mysql

      and then run:

         nodemon start

9. Testing

   npm run test


#### Ports

- Server runs on port `5000`
- Database on port `3306`

Schema Diagram:

+---------------------+      +---------------------+      +----------------------+
|        Author       |      |        Book         |      |       Borrower       |
+---------------------+      +---------------------+      +----------------------+
| id: INTEGER         |      | id: INTEGER         |      | id: INTEGER          |
| name: STRING        |      | title: STRING       |      | name: STRING         |
| createdAt: DATE     |      | ISBN: STRING(17)    |      | password: STRING     |
| updatedAt: DATE     |      | availableQuantity:  |      | email: STRING        |
|                     |      | INTEGER             |      | registrationDate: DATE|
|                     |      | createdAt: DATE     |      | createdAt: DATE      |
|                     |      | updatedAt: DATE     |      | updatedAt: DATE      |
+---------------------+      | AuthorId: INTEGER   |      +----------------------+
                            +---------------------+

+---------------------+
|       Borrow        |
+---------------------+
| id: INTEGER         |
| borrowDate: DATE    |
| returnDate: DATE    |
| createdAt: DATE     |
| updatedAt: DATE     |
| BorrowerId: INTEGER |
| BookId: INTEGER     |
+---------------------+


- An Author can have many Books. This is represented by the AuthorId foreign key in the Book model.
- A Book belongs to one Author. This is represented by the AuthorId foreign key in the Book model.
- A Borrower can have many Borrows. This is represented by the BorrowerId foreign key in the Borrow model.
- A Borrow belongs to one Borrower. This is represented by the BorrowerId foreign key in the Borrow model.
- A Borrow can have one Book. This is represented by the BookId foreign key in the Borrow model.
- A Book can be borrowed multiple times. This is represented by the BookId foreign key in the Borrow model.