import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty.", () => {
        expect(() => {
            const customer = new Customer("", "Pedro");
        }).toThrowError("Id is required.");
    });

    it("should throw error when name is empty.", () => {
        expect(() => {
            const customer = new Customer("123", "");
        }).toThrowError("Name is required.");
    });

    it("should change name.", () => {
        
        // Arrange
        const customer = new Customer("123", "Pedro");
        
        // Act
        customer.changeName("Raquel");

        // Assert
        expect(customer.name).toBe("Raquel");
    });

    it("should activate customer.", () => {
        
        // Arrange
        const customer = new Customer("123", "Pedro");
        const address = new Address("Street 1", 1, "12345-678", "Ceará");
        customer.Address = address;
        
        // Act
        customer.activate();

        // Assert
        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined when you activate a customer.", () => {
        expect(() => {
            const customer = new Customer("123", "Pedro");

            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer.")
    });

    it("should deactivate customer.", () => {
        
        // Arrange
        const customer = new Customer("123", "Pedro");
        
        // Act
        customer.deactivate();

        // Assert
        expect(customer.isActive()).toBe(false);
    });
});