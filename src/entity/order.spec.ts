import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests",() => {
    it("should throw error when id is empty.", () => {
        expect(() => {
            const order = new Order("", "1", []);
        }).toThrowError("Id is required.");
    });

    it("should throw error when customerId is empty.", () => {
        expect(() => {
            const order = new Order("1", "", []);
        }).toThrowError("customerId is required.");
    });

    it("should throw error when item is empty.", () => {
        expect(() => {
            const order = new Order("1", "123", []);
        }).toThrowError("Items are required.");
    });

    it("should calculate total.", () => {
        
        const item = new OrderItem("1", "Arroz", 100, "produto1", 2);
        const item2 = new OrderItem("1", "Feijão", 200, "produto2", 2);
        const order = new Order("o1", "c1", [item]);

        let total = order.total();

        expect(total).toBe(200);

        const order2 = new Order("o2", "c2", [item, item2]);

        total = order2.total();

        expect(total).toBe(600);
    });

    it("should throw error if the item quantity is less or egual zero", () => {
        expect(() => {
            const item = new OrderItem("1", "item 1", 50, "Produto 1", 0); 
            const order = new Order("1", "c1", [item])
        }).toThrowError("Quantity must be greater than 0");
    })
});