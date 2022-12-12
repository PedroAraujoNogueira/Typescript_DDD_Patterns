import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "Pedro", 
    new Address("street 1", 1, "zip 1", "city 1")
);

const customer2 = CustomerFactory.createWithAddress(
    "João", 
    new Address("street 2", 2, "zip 2", "city 2")
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    }
}

describe("Unit test for listing customer use case", () => {
    it("should list a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new ListCustomerUseCase(customerRepository);

        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toEqual(customer1.id);
        expect(output.customers[0].name).toEqual(customer1.name);
        expect(output.customers[0].address.street).toEqual(customer1.address.street);
        expect(output.customers[1].id).toEqual(customer2.id);
        expect(output.customers[1].name).toEqual(customer2.name);
        expect(output.customers[1].address.street).toEqual(customer2.address.street);
        
    })
})