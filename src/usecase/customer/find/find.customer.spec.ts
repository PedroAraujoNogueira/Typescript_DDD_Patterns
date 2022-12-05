import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "Pedro");
        const address = new Address("Street 1", 1, "12345678", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

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

        const result = usecase.execute(input);

        expect(result).toBe(output);
    })
})