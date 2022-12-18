import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should list all products", async () => {
        await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10,
            });

        await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                price: 20,
            });
        
        const products = await request(app)
            .get("customer")
            .send({})
        
        expect(products.status).toBe(200);
        expect(products.body.products.length).toBe(2);
        expect(products.body.products[0]).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 10,
        });
        expect(products.body.products[1]).toEqual({
            id: expect.any(String),
            name: "Product 2",
            price: 20,
        });     
    }); 
});