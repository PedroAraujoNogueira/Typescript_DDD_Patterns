import EventDispatcherInterface from "./event-dispatcher.interface";
import eventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    
    private eventHandlers: { [eventName: string]: eventHandlerInterface[] } = {} 

    get getEventHandlers(): { [eventName: string]: eventHandlerInterface[] } {
        return this.eventHandlers;
    }

    notify(event: eventInterface): void {
        
    }

    register(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        if(!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        
    }

    unregisterAll(): void {
        
    }


}