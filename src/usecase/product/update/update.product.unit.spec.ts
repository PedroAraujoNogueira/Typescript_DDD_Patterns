import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const input = {
    id: "1",
    name: "Product update",
    price: 10,
};

const product = new Product(input.id, "Product", 5);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(product),
        findAll: jest.fn(),
    }
}

describe("Unit Test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);
        
        const output = await updateProductUseCase.execute(input);
        
        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price, 
        });
    }); 
});