import {Router} from 'express';
import productRouter from './product.routes';

const router: Router = Router();

router.use('/product', productRouter);

export default router;