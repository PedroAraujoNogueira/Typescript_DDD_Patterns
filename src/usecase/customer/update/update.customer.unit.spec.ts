import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "Pedro", 
    new Address(
        "Street 1", 1, "zip 1", "City 1"
    )
);

const input = {
    id: customer.id,
    name: "Pedro Updated",
    address: {
        street: "Street Updated",
        number: 2, 
        zip: "zip Updated", 
        city: "City Updated"
    }
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(customer),
        findAll: jest.fn()
    }
};

describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);
        
        expect(output).toEqual(input);
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        input.name = ""
        
        expect(async () => {
            await customerUpdateUseCase.execute(input);
        }).rejects.toThrow("Name is required")
    })
})