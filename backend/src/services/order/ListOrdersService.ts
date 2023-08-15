import prismaClient from "../../prisma";

class ListOrdersService{
    async execute(){

        const orders = await prismaClient.order.findMany({
            where:{
                draft:false,
                status:false
            },
            orderBy:{
                created_at:'desc' //ordenar pelos q forem menos recentes
            }
        })
        return orders
    }
}

export {ListOrdersService}