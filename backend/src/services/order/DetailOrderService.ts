import { Order } from "@prisma/client";
import prismaClient from "../../prisma";

interface DetailRequest{
    order_id:string
}

class DetailOrderService{
    async execute({order_id}:DetailRequest){

        const orders = await prismaClient.item.findMany({
            where:{
                order_id:order_id
            },
            include:{
                product:true, //coisas q tem relação c o rder id
                order:true
            }
        })
        return orders
    }
}

export {DetailOrderService}