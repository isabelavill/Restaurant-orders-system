import prismaClient from "../../prisma";


class DetailUserService{
    async execute(user_id: string){

        const user = await prismaClient.user.findFirst({
            where:{ //vai la no bd e busca o user q tenha o id q eu forneci, devolve as infos q ele encontrar dentro da var user
                id: user_id
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return user
    }
}

export {DetailUserService}