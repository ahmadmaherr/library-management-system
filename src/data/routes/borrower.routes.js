import * as borrowercontrollers from "../controllers/borrower.controller.js";
import express from "express";
import { verifyJWT_MW } from "../libs/middleware.js";

const router = express.Router();

router.route('/').get(borrowercontrollers.getAllBorrowers).post(borrowercontrollers.createBorrower)
router.route('/:id').get(borrowercontrollers.getBorrower).patch(verifyJWT_MW, borrowercontrollers.updateBorrower).delete(verifyJWT_MW, borrowercontrollers.deleteBorrower);

export default router;
 
 