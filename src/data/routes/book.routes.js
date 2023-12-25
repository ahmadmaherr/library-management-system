import * as bookcontrollers from "../controllers/book.controller.js";
import express from "express";

const router = express.Router();

router.route('/').get(bookcontrollers.getAllBooks).post(bookcontrollers.createBook)
router.route('/:id').get(bookcontrollers.getBook).patch(bookcontrollers.updateBook).delete(bookcontrollers.deleteBook);

export default router;
 
 