import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        
        const productExists = await this.productRepository.find(input.id);

        if(!productExists){
            throw new Error("Product not exists.");
        }

        productExists.changeName(input.name);
        productExists.changePrice(input.price);
        
        await this.productRepository.update(productExists);

        return {
            id: productExists.id,
            name: productExists.name,
            price: productExists.price,
        }
    }
}