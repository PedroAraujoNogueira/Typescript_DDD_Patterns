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
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);

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
});