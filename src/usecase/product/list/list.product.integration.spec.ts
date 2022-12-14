import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration Test find product use case", () => { 
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should list products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("123", "Product 1", 10);
        const product2 = new Product("1234", "Product 2", 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const listProducUseCase = new ListProductUseCase(productRepository);
        const output = await listProducUseCase.execute({});

        expect(output).toEqual({ products: [{
            id: product1.id, 
            name: product1.name,
            price: product1.price,
        }, {
            id: product2.id, 
            name: product2.name,
            price: product2.price,
        }]});

        expect(output.products.length).toBe(2)
    });
});