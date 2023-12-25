import * as borrowProcessController from "../controllers/borrowProcess.controller.js";
import express from "express";
import { verifyJWT_MW } from "../libs/middleware.js";

const router = express.Router();

router.route('/borrowBook/:bookId').post(verifyJWT_MW, borrowProcessController.borrowBook);
router.route('/returnBook/:bookId').post(verifyJWT_MW, borrowProcessController.returnBook);
router.route('/getBooks').get(verifyJWT_MW, borrowProcessController.getBooks); 

export default router;
 
 