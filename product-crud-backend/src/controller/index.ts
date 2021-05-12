import * as express from 'express';
import productModel from '../models/product.model';
import { getCachedData, setCacheData } from './../helper/useRedis';
import { Product } from './../interfaces';

export default class ProductController {
    //create product
    public createProduct = async (req: express.Request, res: express.Response) => {
        try {
            const categoryData: Product = req.body;
            const product = new productModel(categoryData);
            const savedProduct = await product.save();
            if (savedProduct) {
                res.status(200).send({
                    success: true,
                    data: savedProduct,
                    message: 'Product saved successfully'
                })
            }
        } catch (err) {
            res.status(500).send({
                message: err
            });
        }
    }
    //get all products
    public getAllProducts = async (req: express.Request, res: express.Response) => {
        try {
            const products = await productModel.find();
            if (products) {
                res.status(200).send({
                    count: products?.length,
                    data: products
                })
            }
        } catch (err) {
            res.status(500).send({
                message: err
            });
        }
    }
    //update product by id
    public updateProduct =  async (req: express.Request, res: express.Response) => {
        try {
            const updatedProduct = await productModel.updateOne({_id: req?.params?.id}, 
                {$set: req.body})
                if (updatedProduct)
                    res.status(200).send({
                        success: true,
                        data: {_id: req?.params?.id, ...req.body},
                        message: 'Product updated successfully'
                    })
        } catch (err) {
            res.status(500).send({
                message: err
            });
        }
    }
    //delete product by id
    public deleteProduct = async (req: express.Request, res: express.Response) => {
        try {
            const  deletedProduct = await productModel.deleteOne({_id: req?.params?.id});
            if (deletedProduct) 
                res.status(200).send({
                    success: true,
                    message: 'Product deleted successfully'
                })
        } catch (err) {
            res.status(500).send({
                message: err
            });
        }
    }
    //search product from cache
    public searchProduct = async (req: express.Request, res: express.Response) => {
        const search = req.query.search;
        try {
            const cachedData = await getCachedData(search);
            console.log('cached data', cachedData);
            if (cachedData?.data) {
                res?.status(200).send({
                    products: JSON.parse(cachedData.data),
                    message: 'Data received from Redis cache'
                });
            } else {
                const products = await productModel.find({name: `${search}`});
                if (products.length > 0) {
                    setCacheData(search, products);
                }
                res.status(200).send({
                    products: products,
                    message: 'Data received from DB'
                });
            }
        } catch (err) {
            res.status(500).send({message: err.message});
        }
    }
}