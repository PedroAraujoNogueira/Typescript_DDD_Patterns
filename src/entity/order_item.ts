export default class OrderItem {

    private _id: string;
    private _name: string;
    private _price: number;
    private _product: string;
    private _quantity: number;

    constructor(id: string, name: string, price: number, product: string, quantity: number){
        this._id = id;
        this._name = name;
        this._price = price; 
        this._product = product;
        this._quantity = quantity;
    }
    
    get quantity(): number {
        return this._quantity;
    }

    get price(): number {
        return this._price * this._quantity;
    }

}