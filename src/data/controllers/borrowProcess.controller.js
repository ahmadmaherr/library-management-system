import { Borrower, Book_Borrower, Book, Borrow } from "../models/index.js";
import { Op } from 'sequelize';
import Sequelize from "sequelize";

export const borrowBook = async (req, res)=>{
    try{
        const bookId = req.params.bookId, userId = req.body.userId;
        const returnDate = req.body.returnDate;

        console.log(returnDate)

        const checkBook = await Book.findOne({
            where: {
                id: bookId,
                availableQuantity: {
                    $gt: 0,
                }
            }
        });

        if(checkBook){
            await Book.update({
                availableQuantity: checkBook.availableQuantity - 1
            },
            {
                where: {
                    id: bookId
                }
            });

            await Book_Borrower.create({
                BorrowerId: userId,
                BookId: bookId
            });

            await Borrow.create({
                borrowerId: userId,
                bookId: bookId,
                returnDate
            });

            res.json({
                status: 200
            });
            
        }else{
            res.json({
                status: 200,
                message: "book not found"
            });
        }

    } catch (err){
        console.log("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};

export const returnBook = async (req, res)=>{
    try{
        const bookId = req.params.bookId, userId = req.body.userId;

        const checkBook = await Book.findOne({
            where: {
                id: bookId,
            }
        });

        if(checkBook){
            await Book.update({
                availableQuantity: checkBook.availableQuantity + 1
            },
            {
                where: {
                    id: bookId
                }
            });

            await Book_Borrower.destroy({
                where:{
                    BorrowerId: userId,
                    BookId: bookId
                }
            });

            await Borrow.update({
                isReturned: true
            },{
                where: {
                    borrowerId: userId,
                    bookId: bookId,
                }
            });

            res.json({
                status: 200
            });
            
        }else{
            res.json({
                status: 400,
                message: "book not found"
            });
        }

    } catch (err){
        console.log("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};

export const getBooks = async (req, res)=>{
    try{
        let whereCondition, userId = req.body.userId;

        if(req.body.userId){
            whereCondition = {
                [Op.or]: [
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col("Borrowers.id")), Sequelize.Op.like, '%' + userId + '%'),
                ]
            };
        }else{
            res.json({
                status: 200,
                message: "no user found"
            });
        }

        const books = await Book.findAll({
            where: whereCondition,
            include: {
              model: Borrower,
              as: "Borrowers"
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

    } catch (err){
        console.log("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};

