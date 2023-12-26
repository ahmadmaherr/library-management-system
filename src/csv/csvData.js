import { Borrow } from "../data/models/index.js";
import { Op } from "sequelize";
  
export async function getBorrowsInSepcificPeriod(from, to) {
    try{
        const overdueBooks = await Borrow.findAll({
            where: {
                borrowDate: {
                [Op.lt]: new Date(to),  
                [Op.gte]: new Date(from)
            }
            },
            raw: true
        });

        if(overdueBooks){
            return overdueBooks;
        }else{
            res.json({
                status: "Error",
                message: "No books found"
            });
        }
    } catch (err) {
        console.log("Something went wrong, " + err.message);

        res.json({
            status: "Error",
            message: "Something went wrong, " + err.message
        });
    }
}

export async function getAllOverDueBorrowsLastMonth() {
    try{
        const currentDate = new Date();
        const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const endOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        
        const overdueBooks = await Borrow.findAll({
            where: {
              [Op.and]: [
                {
                  borrowDate: {
                    [Op.lt]: endOfLastMonth,
                    [Op.gte]: startOfLastMonth
                  }
                },
                {
                  returnDate: {
                    [Op.lt]: currentDate
                  }
                }
              ]
            },
            raw: true
          });

        if(overdueBooks){
            return overdueBooks;
        }else{
            res.json({
                status: "Error",
                message: "No books found"
            });
        }
    } catch (err) {
        console.log("Something went wrong, " + err.message);

        res.json({
            status: "Error",
            message: "Something went wrong, " + err.message
        });
    }
}

export async function getAllBorrowsLastMonth() {
    try{
        const currentDate = new Date();
        const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const endOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        
        const allBorrowsFromLastMonth = await Borrow.findAll({
          where: {
            borrowDate: {
              [Op.lt]: endOfLastMonth,
              [Op.gte]: startOfLastMonth
            }
          },
          raw: true
        });

        if(allBorrowsFromLastMonth){
            return allBorrowsFromLastMonth;
        }else{
            res.json({
                status: "Error",
                message: "No books found"
            });
        }
    } catch (err) {
        console.log("Something went wrong, " + err.message);

        res.json({
            status: "Error",
            message: "Something went wrong, " + err.message
        });
    }
}
  
  
  