import * as mongoose from 'mongoose';
import { Product } from './../interfaces';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {collection: 'products'}).set('timestamps', true);

const productModel = mongoose.model<Product & mongoose.Document>('product', ProductSchema);
export default productModel;