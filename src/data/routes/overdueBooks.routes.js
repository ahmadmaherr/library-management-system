import * as bookcontrollers from "../controllers/book.controller.js";
import express from "express";

const router = express.Router();

router.route('/').get(bookcontrollers.getOverdueBooks)

export default router;
 
 