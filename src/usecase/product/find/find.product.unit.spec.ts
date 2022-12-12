import Product from "../../../domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase";

const input = {
    id: "123"
}

const output = {
    id: "123",
    name: "Product 1",
    price: 10,
}

const product = new Product(input.id, "Product 1", 10);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(product),
        findAll: jest.fn(),
    }
}

describe("Unit Test find product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);
        
        const result = await usecase.execute(input);
           
        expect(output).toEqual(result)
    });
});