import { Borrower, UserLogin, Book } from "../models/index.js";
import { createJWToken } from "../libs/auth.js";
import { Op } from 'sequelize';
import Sequelize from "sequelize";

export const createBorrower = async (req, res)=>{
    try{
        const [user, created] = await Borrower.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: { // create if it doesn't exist
                name: req.body.name,
                email: req.body.email,
                password: Borrower.prototype.generateHash(req.body.password)
            }
        });

        if (created) {
            let token = await createJWToken(user.name, user.email);

            // Insert login token record with device infomation
            const creatUserLogin = await UserLogin.create({
                token,
                email: req.body.email
            });

            res.json({
                creatUserLogin
            });

        }else{
            res.json({
                status: 200,
                message: "email already in use"
            });
        }

    } catch (err){
        res.json("Something went wrong, " + err.message);

        res.json({
            status: 400,
            message: "Something went wrong, " + err.message
        });
    }
};

export const getBorrower = async (req, res)=>{
    try{
        const borrower = await Borrower.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Book,
            }
        });

        if(borrower){
            res.json({
                status: 200,
                borrower
            });
        }else{
            res.json({
                status: 200,
                message: "User not found"
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

export const getAllBorrowers = async (req, res)=>{
    try{
        let whereCondition = {};

        // Check if searchList is not empty, then add conditions
        if (req.body.searchList) {
            whereCondition = {
                [Op.or]: [
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col("Borrower.name")), Sequelize.Op.like, '%' + req.body.searchList + '%'),
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col("Borrower.email")), Sequelize.Op.like, '%' + req.body.searchList + '%'),                ]
            };
        }
        
        const borrowers = await Borrower.findAll({
          where: whereCondition,
          include: {
            model: Book,
            as: "Books"
          },
        });

        if(borrowers){
            res.json({
                status: 200,
                borrowers
            });
        }else{
            res.json({
                status: 200,
                message: "No borrowers found"
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

export const updateBorrower = async (req, res)=>{
    try{
        const updateBorrower = await Borrower.update({
            name: req.body.name,
            email: req.body.email,
        },
        {
            where: {
                id: req.params.id
            }
        });

        if(updateBorrower[0]){
            res.json({
                status: 200,
            });
        }else{
            res.json({
                status: 200,
                message: "Borrower not found",
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

export const deleteBorrower = async (req, res)=>{
    try{
        const deleteBorrower = await Borrower.destroy({
            where: {
                id: req.params.id
            }
        });

        if(deleteBorrower === 1){
            res.json({
                status: 200,
            });
        }else{
            res.json({
                status: 200,
                message: "Borrower not found"
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

// export const deleteAllBorrowers = async (req, res)=>{
//     try{
//         const deleteAllBorrowers = await Borrower.destroy({ 
//             where: {}
//         });


//         if(deleteAllBorrowers === 1){
//             res.json({
//                 status: 200,
//             });
//         }else{
//             res.json({
//                 status: 200,
//                 message: "No Borrowers Found"
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

