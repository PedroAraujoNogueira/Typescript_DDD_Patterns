import CreateCustomerUseCase from "./create.customer.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

const input = {
    name: "Pedro",
    address: {
        street: "street 1", 
        number: 1, 
        zip: "zipCode 1", 
        city: "City 1",
    }
}

describe("Unit Test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({ 
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street, 
                number: input.address.number, 
                zip: input.address.zip, 
                city: input.address.city,
            },
        });
    });

    it("should throw an error when name is missing", () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        
        expect(async ()=> {
            await customerCreateUseCase.execute(input)
        }).rejects.toThrow("Name is required");
     
    });
    it("should throw an error when street is missing", () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";
        
        expect(async ()=> {
            await customerCreateUseCase.execute(input)
        }).rejects.toThrow("Street is required");
     
    })

});