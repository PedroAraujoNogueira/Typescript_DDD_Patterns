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
        
        const item = new OrderItem("1", "Arroz", 100);
        const item2 = new OrderItem("1", "Feijão", 200);
        const order = new Order("o1", "c1", [item]);

        let total = order.total();

        expect(total).toBe(100);

        const order2 = new Order("o2", "c2", [item, item2]);

        total = order2.total();

        expect(total).toBe(300);
    });
});