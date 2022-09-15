import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

const customer = new Customer("123", "Pedro");
const address = new Address("Rua Exemplo", 1, "12345-678", "Estado");
customer.Address = address;
customer.activate();

const item1 =  new OrderItem("1", "feijão", 6.50);
const item2 =  new OrderItem("2", "arroz", 3.55);
const order = new Order("1", "123", [item1, item2]);