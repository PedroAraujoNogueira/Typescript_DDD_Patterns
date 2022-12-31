import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when Id is empty.", () => {
        expect(() => {
            const product = new Product("", "Produto 1", 100);

        }).toThrowError("product: Id is required.");
    })

    it("should throw error when name is empty.", () => {
        expect(() => {
            const product = new Product("1", "", 100);
        }).toThrowError("product: Name is required.");
    })

    it("should throw error when id and name is empty.", () => {
        expect(() => {
            const product = new Product("", "", 100);
        }).toThrowError("product: Id is required.,product: Name is required.");
    })

    it("should throw error when price is less than zero.", () => {
        expect(() => {
            const product = new Product("1", "Produto 1", -1);

        }).toThrowError("product: Price must be greater than zero.");
    })

    it("should change name.", () => {
        const product = new Product("1", "Produto 1", 100);

        product.changeName("Produto 2");
        
        expect(product.name).toBe("Produto 2");
    })

    it("should change price.", () => {
        const product = new Product("1", "Produto 1", 100);

        product.changePrice(5.50);
        
        expect(product.price).toBe(5.50);
    })
})