import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration Test update a product use case", () => { 
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);
        
        const input = {
            id: "1",
            name: "Product update",
            price: 10,
        };
        
        const product = new Product(input.id, "Product 1", 5);
        
        await productRepository.create(product);

        const output = await updateProductUseCase.execute(input);
        
        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price, 
        });
    });
});