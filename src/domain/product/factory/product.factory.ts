import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuidV4 } from "uuid";
import ProductB from "../entity/product-b";

export default class ProductFactory {
    public static create(type: string, name: string, price: number): ProductInterface {
        switch(type){
            case "a":
                return new Product(uuidV4(), name, price);
            case "b":
                return new ProductB(uuidV4(), name, price);    
            default:
                throw new Error("Product type not supported");
        }
    }
}