## This project is built with

- Node.js
- MYSQL
- Sequelize 
- Express
- Mocha
- Chai
- JWT

## Get Started

This project require some prequesites and dependenscies to be installed, you can find the instructions below

> To get a local copy, follow these next steps:

## Install

1. Clone the repo with the command:

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


7. Run development server using docker compose using this following command:

   docker-compose up

   If you apply any changes, use the following command:

   docker-compose build 


8. Run development server using nodemon by following thoses steps:
      
   change .env to: 
         DB_MYSQL_HOST=localhost
         DB_MYSQL_PORT=3306
         DB_MYSQL_USER=root
         DB_MYSQL_PASSWORD=1234
         DB_MYSQL_DATABASE_NAME=db_library_management_system
         DB_MYSQL_DIALECT=mysql

   then run:

         nodemon start

9. Run unit tests using the following command:

   npm run test

### Rate Limiting

The API is equipped with rate limiting to ensure fair usage and prevent abuse with 10 requests per minute max.

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
| borrowerId: INTEGER |
| bookId: INTEGER     |
+---------------------+


- An Author can have many Books. This is represented by the AuthorId foreign key in the Book model.
- A Book belongs to one Author. This is represented by the AuthorId foreign key in the Book model.
- A Borrower can have many Borrows. This is represented by the borrowerId foreign key in the Borrow model.
- A Borrow belongs to one Borrower. This is represented by the borrowerId foreign key in the Borrow model.
- A Borrow can have one Book. This is represented by the bookId foreign key in the Borrow model.
- A Book can be borrowed multiple times. This is represented by the bookId foreign key in the Borrow model.

Certainly! Below is a documentation for the provided API endpoints with expected inputs and outputs:

### Book Endpoints:

#### 1. Get All Books
- **Endpoint:** `GET /api/books`
- **Description:** Retrieve a list of all books.
- **Expected Output (Example):**
  ```json
   {
      "status": 200,
      "books": [
         {
            "id": 1,
            "title": "Introduction to Programming",
            "ISBN": "123-456-7890123",
            "availableQuantity": 100,
            "createdAt": "2023-01-01T12:00:00Z",
            "updatedAt": "2023-01-01T12:00:00Z"
         },
      // ... other books
   ]}


  ```

#### 2. Create Book
- **Endpoint:** `POST /api/books`
- **Description:** Create a new book.
- **Expected Input:**
  ```json
  {
    "title": "Web Development Basics",
    "ISBN": "234-567-8901234",
    "availableQuantity": 75
  }
  ```
- **Expected Output (Example):**
  ```json
   {
      "status": 200,
      "book": {
         "id": 2,
         "title": "Web Development Basics",
         "ISBN": "234-567-8901234",
         "availableQuantity": 75,
         "createdAt": "2023-04-15T12:00:00Z",
         "updatedAt": "2023-04-15T12:00:00Z"
   }}
  ```

#### 3. Get Book by ID
- **Endpoint:** `GET api/books/:id`
- **Description:** Retrieve details of a specific book.
- **Expected Output (Example):**
  ```json
   {
      "status": 200,
      "book": {
         "id": 2,
         "title": "Web Development Basics",
         "ISBN": "234-567-8901234",
         "availableQuantity": 75,
         "createdAt": "2023-04-15T12:00:00Z",
         "updatedAt": "2023-04-15T12:00:00Z"
   }}
  ```

#### 4. Update Book
- **Endpoint:** `PATCH api/books/:id`
- **Description:** Update information for a specific book.
- **Expected Input:**
  ```json
  {
    "title": "Updated Title",
    "ISBN": "updated-ISBN",
    "availableQuantity": 50
  }
  ```
- **Expected Output (Example):**
  ```json
   {
      "status": 200,
      "book": {
         "id": 2,
         "title": "Web Development Basics",
         "ISBN": "234-567-8901234",
         "availableQuantity": 75,
         "createdAt": "2023-04-15T12:00:00Z",
         "updatedAt": "2023-04-15T12:00:00Z"
   }}
  ```

#### 5. Delete Book
- **Endpoint:** `DELETE /:id`
- **Description:** Delete a specific book.
- **Expected Output (Example):**
  ```json
  {"status": 200}
  ```


### Borrower Endpoints:

#### 1. Get All Borrowers
- **Endpoint:** `GET /api/borrowers`
- **Description:** Retrieve a list of all borrowers.
- **Expected Output (Example):**
  ```json
     {
      "status": 200,
      "borrowers":
            [
               {
                  "id": 1,
                  "name": "Alice Johnson",
                  "email": "alice@email.com",
                  "registrationDate": "2023-01-01",
                  "createdAt": "2023-01-01T12:00:00Z",
                  "updatedAt": "2023-01-01T12:00:00Z"
               },
               // ... other borrowers
            ]
     }
  ```

#### 2. Create Borrower
- **Endpoint:** `POST /api/borrowers`
- **Description:** Create a new borrower.
- **Expected Input:**
  ```json
  {
    "name": "John Doe",
    "password": "securePassword",
    "email": "john@email.com"
  }
  ```
- **Expected Output (Example):**
  ```json
      {
      "status": 200,
      "borrower":
            {
               "id": 2,
               "name": "John Doe",
               "email": "john@email.com",
               "registrationDate": "2023-04-15",
               "createdAt": "2023-04-15T12:00:00Z",
               "updatedAt": "2023-04-15T12:00:00Z"
            }
      }
  ```

#### 3. Get Borrower by ID
- **Endpoint:** `GET /api/borrowers/:id`
- **Description:** Retrieve details of a specific borrower.
- **Expected Output (Example):**
  ```json
   {
      "status": 200,
      "borrower":
         {
            "id": 2,
            "name": "John Doe",
            "email": "john@email.com",
            "registrationDate": "2023-04-15",
            "createdAt": "2023-04-15T12:00:00Z",
            "updatedAt": "2023-04-15T12:00:00Z"
         }
   }
  ```

#### 4. Update Borrower
- **Endpoint:** `PATCH /api/borrowers/:id`
- **Description:** Update information for a specific borrower.
- **Expected Input:**
  ```json
  {
    "name": "Updated Name",
    "password": "newSecurePassword",
    "email": "updated@email.com"
  }
  ```
- **Expected Output (Example):**
  ```json
   {
      "status": 200,
      "borrower":
         {
            "id": 2,
            "name": "John Doe",
            "email": "john@email.com",
            "registrationDate": "2023-04-15",
            "createdAt": "2023-04-15T12:00:00Z",
            "updatedAt": "2023-04-15T12:00:00Z"
         }
   }
  ```

#### 5. Delete Borrower
- **Endpoint:** `DELETE /api/borrowers/:id`
- **Description:** Delete a specific borrower.
  ```json
  {"status": 200}
  ```

  ### Borrow Process Endpoints:

#### 1. Borrow Book
- **Endpoint:** `POST api/borrowBook/borrowBook/:bookId`
- **Description:** Borrow a book.
- **Expected Input:**
  ```json
  {
    "borrowerId": 1,
    "bookId": 1,
    "returnDate": "2023-05-15"
  }
  ```
- **Expected Output (Example):**
  ```json
  {"status": 200}
  ```

#### 2. Return Book
- **Endpoint:** `POST api/borrowBook/returnBook/:bookId`
- **Description:** Return a borrowed book.
- **Expected Input:**
  ```json
  {
    "borrowId": 1
  }
  ```
- **Expected Output (Example):**
  ```json
  {"status": 200}
  ```

#### 3. Get Books
- **Endpoint:** `GET api/borrowBook/getBooks`
- **Description:** Retrieve a list of all books borrowed by a specific borrower.
- **Expected Output (Example):**
  ```json
   {
      "status": 200,
      "books": [
         {
            "id": 1,
            "title": "Introduction to Programming",
            "ISBN": "123-456-7890123",
            "availableQuantity": 100,
            "createdAt": "2023-01-01T12:00:00Z",
            "updatedAt": "2023-01-01T12:00:00Z"
         },
      // ... other books
   ]}
  ```

  #### 4. Get Over Due Book Borrows
- **Endpoint:** `GET api/getOverdueBooks`
- **Description:** Retrieve a list of all borrows that are overdue
- **Expected Output (Example):**
  ```json
   {
      "status": 200,
      "borrows": [
            {
               "id": 1,
               "BorrowerId": 1,
               "BookId": 1,
               "borrowDate": "2023-04-15",
               "returnDate": "2023-05-15",
               "createdAt": "2023-04-15T15:00:00Z",
               "updatedAt": "2023-04-15T15:00:00Z"
            }
      // ... other borrows
   ]}
  ```

  ### CSV File Export Endpoints:

#### 1. Borrows In a Specific Period
- **Endpoint:** `POST /export-csv-data`
- **Description:**  Export borrows in a specific period CSV file.
- **Expected Input:**
  ```json
  {
    "type": "borrowsInSepcificPeriod",
    "from": "2023-12-11",
    "to": "2023-12-17"
  }
  ```
- **Expected Output**
on browser: downloaded CSV file

on postman: CSV file code that needs to be saved with postman

#### 2. Overdue Borrows 
- **Endpoint:** `POST /export-csv-data`
- **Description:**  Borrows That are Overdue from Last Month CSV file.
- **Expected Input:**
  ```json
  {
    "type": "getAllOverDueBorrowsLastMonth",
  }
  ```
- **Expected Output**
on browser: downloaded CSV file

on postman: CSV file code that needs to be saved with postman

#### 3. All Borrows from Last Month
- **Endpoint:** `POST /export-csv-data`
- **Description:**  Borrows from Last Month CSV file.
- **Expected Input:**
  ```json
  {
    "type": "getAllBorrowsLastMonth",
  }
  ```
- **Expected Output**
on browser: downloaded CSV file

on postman: CSV file code that needs to be saved with postman





