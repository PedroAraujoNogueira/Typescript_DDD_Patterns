import express, { Request, Response} from "express";
import CreateCustomerUseCase from "../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../usecase/customer/list/list.customer.usecase";
import CustomerPresenter from "../api/presenters/customer.presenter";
import CustomerRepository from "../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router()

customerRoute.post("/", async (req: Request, resp: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository);

    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zip,
            }
        };
    
        const output = await usecase.execute(customerDto);
        resp.send(output);

    }catch(err){
        resp.status(500).send(err);
    }
});

customerRoute.get("/", async (req: Request, resp: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository);
    const customers = await usecase.execute({});    

    resp.format({
        json: async () => resp.send(customers),
        xml: async () => resp.send(CustomerPresenter.toXML(customers)),
    })
})