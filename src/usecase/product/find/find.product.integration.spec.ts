import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

const input = {
    id: "123"
}

const output = {
    id: "123",
    name: "Product 1",
    price: 10,
}

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
    
    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product(input.id, "Product 1", 10);
        
        await productRepository.create(product);

        const findProducUseCase = new FindProductUseCase(productRepository);
        const result = await findProducUseCase.execute(input);
           
        expect(output).toEqual(result)
    });
});