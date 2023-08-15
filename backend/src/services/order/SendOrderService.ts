import { Order } from "@prisma/client";
import prismaClient from "../../prisma";

interface OrderRequest{
    order_id:string
}

class SendOrderService{
    async execute({order_id}:OrderRequest){
        const order = await prismaClient.order.update({
            where:{
                id:order_id //so vou atualizar o item q tiver esse id
            },
            data:{
                draft:false //pedido nao é mais um rascunho
            }
        })
        return order
    }
}

export {SendOrderService}