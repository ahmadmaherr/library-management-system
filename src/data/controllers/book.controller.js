import { Book, Author, Book_Author, Borrow } from "../models/index.js";
import { Op } from 'sequelize';
import Sequelize from "sequelize";


export const createBook = async (req, res)=>{ // create a new book
    try{
        const book = await Book.create({
            title: req.body.title,
            ISBN:  req.body.ISBN,
            availableQuantity: req.body.quantity
        });

        const author = await Author.findOrCreate({
            where: {
                name: req.body.author
            },
            defaults: { // create if it doesn't exist
                name: req.body.author
            }
        });

        await Book_Author.create({
            BookId: book.id,
            AuthorId: author[0].id
        });

        res.json({
            status: 200,
            book
        });

    } catch (err){
        res.json("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};

export const getBook = async (req, res)=>{ // get a specific book
    try{
        const book = await Book.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Author,
            }
        });


        if(book){
            res.json({
                status: 200,
                book
            });
        }else{
            res.json({
                status: 200,
                message: "Book not found"
            });
        }

    }catch (err){
        console.log("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};

export const getAllBooks = async (req, res)=>{ // get all books
    try{
        let whereCondition = {};

        // Check if searchList is not empty, then add conditions
        if (req.body.searchList) {
            whereCondition = {
                [Op.or]: [
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col("Book.title")), Sequelize.Op.like, '%' + req.body.searchList + '%'),
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col("Book.ISBN")), Sequelize.Op.like, '%' + req.body.searchList + '%'),
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col("Authors.name")), Sequelize.Op.like, '%' + req.body.searchList + '%'),
                ]
            };
        }
        
        const books = await Book.findAll({
          where: whereCondition,
          include: {
            model: Author,
            as: "Authors"
          },
        });

        if(books){
            res.json({
                status: 200,
                books
            });
        }else{
            res.json({
                status: 200,
                message: "No books found"
            });
        }

    }catch (err){
        console.log("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};

export const getOverdueBooks = async (req, res)=>{ // get all books with return date overdue
    try{  
        const currentDate = new Date();

        const overdueBooks = await Borrow.findAll({
            where: {
                returnDate: {
                    [Op.lt]: currentDate
                }
            }
        });

        if(overdueBooks){
            res.json({
                status: 200,
                overdueBooks
            });
        }else{
            res.json({
                status: 200,
                message: "No books found"
            });
        }

    }catch (err){
        console.log("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};


export const updateBook = async (req, res)=>{ // update a specific book
    try{
        const updateBook = await Book.update({
            title: req.body.title,
            ISBN:  req.body.ISBN,
            availableQuantity: req.body.quantity
        },
        {
            where: {
                id: req.params.id
            }
        });

        if(req.body.author){
            const updateAuthor = await Author.findOrCreate({ 
                where: {
                    name: req.body.author
                },
                defaults: { // create if it doesn't exist
                    name: req.body.author
                },
                raw: true
            });
        
            await Book_Author.update({
                AuthorId: updateAuthor[0].id
            },
            {
                where: {
                    bookId: req.params.id
                }
            });
        }

        if(updateBook[0]){
            res.json({
                status: 200,
            });
        }else{
            res.json({
                status: 200,
                message: "book not found",
            });
        }

    }catch (err){
        console.log("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};

export const deleteBook = async (req, res)=>{ // delete a specific book
    try{
        const deleteBook = await Book.destroy({
            where: {
                id: req.params.id
            }
        });

        if(deleteBook === 1){
            res.json({
                status: 200,
            });
        }else{
            res.json({
                status: 200,
                message: "book not found"
            });
        }

    }catch (err){
        console.log("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};

// export const deleteAllBooks = async (req, res)=>{
//     try{
//         const deleteAllBooks = await Book.destroy({ 
//             where: {}
//         });


//         if(deleteAllBooks === 1){
//             res.json({
//                 status: 200,
//             });
//         }else{
//             res.json({
//                 status: 200,
//                 message: "No Books Found"
//             });
//         }

//     }catch (err){
//         console.log("Something went wrong, " + err.message);

//         res.json({
//             status: 400,
//             message: "Something went wrong, " + err.message
//         });
//     }
// };

