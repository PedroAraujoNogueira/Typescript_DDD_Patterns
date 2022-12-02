import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
   it("should create a customer", () => {
        let customer = CustomerFactory.create("Pedro");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Pedro");
        expect(customer.address).toBeUndefined();
   }) 

   it("should create a customer with an address", () => {
        let address = new Address("Street 1", 1, "ZipCode 1", "City 1");
        let customer = CustomerFactory.createWithAddress("Pedro", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Pedro");
        expect(customer.address).toBe(address);
   })
})