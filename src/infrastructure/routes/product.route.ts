import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../usecase/product/create/create.product.usecase';
import ListProductUseCase from '../../usecase/product/list/list.product.usecase';
import ProductRepository from '../product/repository/sequelize/product.repository';

export const productRoute = express.Router()

productRoute.post("/", async ( req: Request, resp: Response ) => {
    const usecase = new CreateProductUseCase(new ProductRepository);

    try {

        const productDto = {
            name: req.body.name,
            price: req.body.price,
        }

        const product = await usecase.execute(productDto);
        resp.send(product);
    } catch (err) {
        resp.status(500).send(err);
    }
});

productRoute.get("/", async ( req: Request, resp: Response ) => {
    const usecase = new ListProductUseCase(new ProductRepository);

    try {
        const product = await usecase.execute({});
        resp.send(product);    
    } catch (err) {
        resp.status(500).send(err);
    }
});