import ProductFactory from "../../../domain/product/factory/product.factory";

const input = {
    name: "Product 1",
    price: 5,
};

const product = ProductFactory.create('a', input.name, input.price);

const output = {
    id: product.id,
    name: product.name,
    price: product.price,
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Unit test create product usecase", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository)
        
        await createProductUseCase.execute(input);
    });
});