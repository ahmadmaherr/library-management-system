import sequelize from '../sequelize.js';

// Models
import Book from './Book.js';
import Author from './Author.js';
import Borrower from './Borrower.js';
import UserLogin from './UserLogin.js';
import Borrow from './Borrow.js';

const Book_Author = sequelize.define('Book_Author', {}, { timestamps: false });
const Book_Borrower = sequelize.define('Book_Borrower', {}, { timestamps: false })


// Define associations between models
Book.belongsToMany(Author, {through: Book_Author})

Author.belongsToMany(Book, {through: Book_Author})

Borrower.belongsToMany(Book, {through: Book_Borrower})

Book.belongsToMany(Borrower, {through: Book_Borrower})

// Sync the models with the database
sequelize.sync();

export {
Author,
Book,
Book_Author,
Book_Borrower,
Borrower,
Borrow,
UserLogin
};
