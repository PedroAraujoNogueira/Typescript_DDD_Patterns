import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Jonh",
                address: {
                    street: "Street 1",
                    number: 1,
                    city: "City",
                    zip: "12345" 
                }
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Jonh");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.number).toBe(1);
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.zip).toBe("12345");
        expect(response.body.id).toBeDefined();
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: "Jonh"
            });
            
        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
        await request(app)
            .post("/customer")
            .send({
                name: "Jonh",
                address: {
                    street: "Street 1",
                    number: 1,
                    city: "City",
                    zip: "12345" 
                }
            });
        
        await request(app)
            .post("/customer")
            .send({
                name: "Jonh 2",
                address: {
                    street: "Street 2",
                    number: 2,
                    city: "City 2",
                    zip: "123456" 
                }
            });
            
        const customers = await request(app).get("/customer").send({});
        
        expect(customers.status).toBe(200);
        expect(customers.body.customers.length).toBe(2);
        expect(customers.body.customers[0]).toEqual({
            id: expect.any(String),
            name: "Jonh",
            address: {
                street: "Street 1",
                number: 1,
                city: "City",
                zip: "12345" 
            }
        });
        expect(customers.body.customers[1]).toEqual({
            id: expect.any(String),
            name: "Jonh 2",
            address: {
                street: "Street 2",
                number: 2,
                city: "City 2",
                zip: "123456" 
            }
        });
    });
});