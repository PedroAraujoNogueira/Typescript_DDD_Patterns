import EventDispatcherInterface from "./event-dispatcher.interface";
import eventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    
    notify(event: eventInterface): void {
        
    }

    register(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        
    }

    unregister(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        
    }

    unregisterAll(): void {
        
    }


}