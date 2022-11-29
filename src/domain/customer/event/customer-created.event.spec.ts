import CustomerCreatedEvent from "./customer-created.event";
import SendMessageOneWhenCustomerIsCreatedHandler from "./handler/send-message-one-when-customer-is-created.handler";
import SendMessageTwoWhenCustomerIsCreatedHandler from "./handler/send-message-two-when-customer-is-created.handler";
import SendMessageWhenAddressIsChangedHandler from "./handler/send-message-when-address-is-changed.handler";
import AddressChangedEvent from "./address-changed.event";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";

describe("Domain events Customer tests", () => {
    it("should create a customer event when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const firstHandler = new SendMessageOneWhenCustomerIsCreatedHandler();
        const secondHandler = new SendMessageTwoWhenCustomerIsCreatedHandler();
        const spyFirstEventHandler = jest.spyOn(firstHandler, "handle")
        const spySecondEventHandler = jest.spyOn(secondHandler, "handle")

        eventDispatcher.register("CustomerCreatedEvent", firstHandler);
        eventDispatcher.register("CustomerCreatedEvent", secondHandler);

        const customer = new Customer("123", "Customer1");
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyFirstEventHandler).toHaveBeenCalled();
        expect(spySecondEventHandler).toHaveBeenCalled();
    })

    it("should create a address event when an address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const firstHandlerCustomer = new SendMessageOneWhenCustomerIsCreatedHandler();
        const secondHandlerCustomer = new SendMessageTwoWhenCustomerIsCreatedHandler();
        const spyFirstEventHandlerCustomer = jest.spyOn(firstHandlerCustomer, "handle")
        const spySecondEventHandlerCustomer = jest.spyOn(secondHandlerCustomer, "handle")

        eventDispatcher.register("CustomerCreatedEvent", firstHandlerCustomer);
        eventDispatcher.register("CustomerCreatedEvent", secondHandlerCustomer);

        const customer = new Customer("123", "Customer1");
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyFirstEventHandlerCustomer).toHaveBeenCalled();
        expect(spySecondEventHandlerCustomer).toHaveBeenCalled();

        const handlerAddress = new SendMessageWhenAddressIsChangedHandler();
        const spyEventHandlerAddress = jest.spyOn(handlerAddress, "handle")

        eventDispatcher.register("AddressChangedEvent", handlerAddress);
        
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(handlerAddress);

        const address = new Address("Street 1", 1, "123456", "City 1");
        customer.changeAddress(address)
        const addressChangedEvent = new AddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.address 
        });

        eventDispatcher.notify(addressChangedEvent);

        expect(spyEventHandlerAddress).toHaveBeenCalled();
    })
})