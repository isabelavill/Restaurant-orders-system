import prismaClient from "../../prisma";

interface OrderRequest{
    order_id:string
}

class RemoveOrderService{
    async execute({order_id}:OrderRequest){
        const order = await prismaClient.order.delete({
            where:{
                id:order_id //deleta a nossa ordem tenha o id igual ao id q foi fornecido
            }
        })

        return order
    }
}

export {RemoveOrderService}