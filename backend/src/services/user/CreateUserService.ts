import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}


class CreateUserService{
    async execute({name, email, password}: UserRequest){
        //verfificar se ele enviou um email
        if(!email){
            throw new Error("Email inválido")
        }
        //verificar se email já esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{ //ver se o email q eu recebi é igual a algum q ta cadastrado
                email:email
            }
        })
        if(userAlreadyExists){
            throw new Error("Email já cadastrado")
        }

        //Gerando senha criptografada
        const passwordHash = await hash(password, 8) //8 é o tipo da criptografia 

        //cadastrar user de fato
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            select:{ //escolhendo o q eu quero q ele exiba (a senha nao)
                id:true,
                name:true,
                email:true,
                password: false,
                // created_at:true,
                // updated_at: true
            }
        })
        return user
    }
}

export {CreateUserService}