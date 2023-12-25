import { Router } from 'express';
import bookRoutes from './book.routes.js';
import borrowersRoutes from './borrower.routes.js';
import borrowingProcessRoutes from './borrowingProcess.routes.js'
import overdueBooksRoutes from './overdueBooks.routes.js'

const routes = Router();

routes.use('/books', bookRoutes);
routes.use('/borrowers', borrowersRoutes);
routes.use('/borrowBook', borrowingProcessRoutes)
routes.use('/getOverdueBooks', overdueBooksRoutes)


export default routes;