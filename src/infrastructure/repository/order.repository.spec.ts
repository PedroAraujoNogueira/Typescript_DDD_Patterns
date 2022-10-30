import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";


describe("Customer repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "123",
            product.name,
            product.price,
            product.id,
            2
        );

        const orderRepository = new OrderRepository();
        const order = new Order("123", "123", [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                product_id: "123",
                order_id: "123",
            }]
        });
    });
    it("should update the attribute quantity in OrderItem", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1"); 
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1234", "Product 1", 15);
        await productRepository.create(product);

        const orderItem1 = new OrderItem("12345", 
            product.name, 
            product.price, 
            product.id, 
            2
        );

        const orderRepository = new OrderRepository();
        const order = new Order("123456", "123", [orderItem1]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        })
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123456",
            customer_id: "123",
            total: order.total(),
            items: [{
                id: orderItem1.id,
                name: orderItem1.name,
                price: orderItem1.price,
                quantity: orderItem1.quantity,
                product_id: "1234",
                order_id: "123456",
            }]
        });   

        orderItem1.changeQuantity(5);
 
        await orderRepository.update(order);

        const orderModel2 = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel2.toJSON()).toStrictEqual({
            id: "123456",
            customer_id: "123",
            total: order.total(),
            items:[{
                id: orderItem1.id,
                name: orderItem1.name,
                price: orderItem1.price,
                quantity: orderItem1.quantity,
                product_id: "1234",
                order_id: "123456",
            }]
        });
    });

    it("should update added one OrderItem in Order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1"); 
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1234", "Product 1", 15);
        await productRepository.create(product);

        const orderItem1 = new OrderItem("12345", 
            product.name, 
            product.price, 
            product.id, 
            2
        );

        const orderRepository = new OrderRepository();
        const order = new Order("123456", "123", [orderItem1]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        })
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123456",
            customer_id: "123",
            total: order.total(),
            items: [{
                id: orderItem1.id,
                name: orderItem1.name,
                price: orderItem1.price,
                quantity: orderItem1.quantity,
                product_id: "1234",
                order_id: "123456",
            }]
        });   

        const product2 = new Product("12342", "Product 2", 10);
        await productRepository.create(product2);
        
        const orderItem2 = new OrderItem("123452", 
            product2.name, 
            product2.price, 
            product2.id, 
            2
        );
        
        order.items.push(orderItem2);

        await orderRepository.update(order);

        const orderModel2 = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel2.toJSON()).toStrictEqual({
            id: "123456",
            customer_id: "123",
            total: order.total(),
            items:[{
                id: orderItem1.id,
                name: orderItem1.name,
                price: orderItem1.price,
                quantity: orderItem1.quantity,
                product_id: "1234",
                order_id: "123456",
            },
            {
                id: orderItem2.id,
                name: orderItem2.name,
                price: orderItem2.price,
                quantity: orderItem2.quantity,
                product_id: "12342",
                order_id: "123456",
            }]
        });
    });

    it("should find one Order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1"); 
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1234", "Product 1", 15);
        await productRepository.create(product);

        const orderItem = new OrderItem("123452", 
            product.name, 
            product.price, 
            product.id, 
            2
        );

        const orderRepository = new OrderRepository();
        const order = new Order("1234", "123", [orderItem]);
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find("1234");

        expect(order).toStrictEqual(foundOrder);
    });

    it("should find All Orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1"); 
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1234", "Product 1", 15);
        await productRepository.create(product);

        const orderItem = new OrderItem("123452", 
            product.name, 
            product.price, 
            product.id, 
            2
        );
        
        const orderRepository = new OrderRepository();
        const order1 = new Order("Order1", "123", [orderItem]);
        await orderRepository.create(order1);

        const product2 = new Product("12", "Product 1", 15);
        await productRepository.create(product2);
        
        const orderItem2 = new OrderItem("1234567", 
            product2.name, 
            product2.price, 
            product2.id, 
            5
        );

        const order2 = new Order("Order2", "123", [orderItem2])
        await orderRepository.create(order2);

        const foundOrders = await orderRepository.findAll();

        expect([order1, order2]).toEqual(foundOrders);
        expect(foundOrders).toHaveLength(2);
        expect(foundOrders).toContainEqual(order1);
        expect(foundOrders).toContainEqual(order2);
    });

    it("should throw an error when Order is not found.", async ()=> {
        const orderRepository = new OrderRepository();

        expect(async ()=> {
            await orderRepository.find("11234sdfsdf");
        }).rejects.toThrow("Order not found");
    });
});