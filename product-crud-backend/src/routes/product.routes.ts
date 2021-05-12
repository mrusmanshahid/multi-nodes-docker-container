import {Router} from 'express';
import ProductController from '../controller';

const productRouter: Router = Router();
const productController = new ProductController();

productRouter.post('/ins', productController.createProduct);
productRouter.get('/get', productController.getAllProducts);
productRouter.get('/search', productController.searchProduct);
productRouter.put('/update/:id', productController.updateProduct);
productRouter.delete('/delete/:id', productController.deleteProduct);

export default productRouter;