import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.unitPrice(),
                product_id: item.productId,
                quantity: item.quantity,
            }))
        },{
            include: [{model: OrderItemModel}]
        });
    }

    async update(entity: Order): Promise<void> {
        try {     
            const sequelize = OrderModel.sequelize;
            await sequelize.transaction(async (t) => {
                await OrderItemModel.destroy({
                    where: { order_id: entity.id }, 
                    transaction: t 
                })
                
                const items = entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.unitPrice(),
                    product_id: item.productId,
                    quantity: item.quantity,
                    order_id: entity.id,
                }));

                await OrderItemModel.bulkCreate(items, { transaction: t })

                await OrderModel.update({
                    total: entity.total(),
                    customer_id: entity.customerId,
                }, {
                    where: { id: entity.id },
                    transaction: t 
                })
            });
        } catch (error) {
            throw new Error("order has not been updated");
        }
    }

    async find(id: string): Promise<Order> {
        let order; 
        try {
            order = await OrderModel.findOne({
                where: { id  },
                include: ["items"]
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        const orderItems = order.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity) 
        });

        return new Order(order.id, order.customer_id, orderItems);
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({ include: ["items"]});

        return orders.map((order) => {
            const orderItems = order.items.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity) 
            });
    
            return new Order(order.id, order.customer_id, orderItems);
        })
    }
}