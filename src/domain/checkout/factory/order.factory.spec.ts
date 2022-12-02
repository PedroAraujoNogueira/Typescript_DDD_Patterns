import { v4 as uuidV4 } from "uuid";
import OrderFactory from "./order.factory";

describe("Order Factory unit tests", () => {
    it("should create an order", () => {
        const orderProps = {
            id: uuidV4(),
            customerId: uuidV4(),
            items: [
                {
                    id: uuidV4(),
                    name: "Product 1",
                    price: 2,
                    productId: uuidV4(),
                    quantity: 10
                }
            ]
        }

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);
    })
})