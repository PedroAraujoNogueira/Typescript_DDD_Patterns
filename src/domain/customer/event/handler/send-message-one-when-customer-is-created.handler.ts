import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";

export default class SendMessageOneWhenCustomerIsCreatedHandler 
    implements EventHandlerInterface 
{
    handle(event: EventInterface): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }

} 