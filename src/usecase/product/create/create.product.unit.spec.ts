import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 5,
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
        const createProductUseCase = new CreateProductUseCase(productRepository);
        
        const result = await createProductUseCase.execute(input);
     
        expect(result).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        expect(async () => { 
            await createProductUseCase.execute(input);
        }).rejects.toThrow("Name is required."); 
    });
});