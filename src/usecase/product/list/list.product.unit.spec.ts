import Product from "../../../domain/product/entity/product"
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("123", "Product 1", 1);
const product2 = new Product("1234", "Product 2", 2);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue([product1, product2])
    }
}

describe("Unit Test list product use case", () => {
    it("should list products", async () => {
        const productRepository = MockRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);
        
        const output = await listProductUseCase.execute({});

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
    })
})