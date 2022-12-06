import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Unit Test find customer use case", () => {

    const customer = new Customer("123", "Pedro");
    const address = new Address("Street 1", 1, "12345678", "City 1");
    customer.changeAddress(address);

    const MockRepository = () => {
        return { 
           find: jest.fn().mockReturnValue(Promise.resolve(customer)),
           findAll: jest.fn(),
           update: jest.fn(),
           create: jest.fn()
        }
    }

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Pedro",
            address: {
                street: "Street 1",
                number: 1,
                zip: "12345678",
                city: "City 1"
            }
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    })
})