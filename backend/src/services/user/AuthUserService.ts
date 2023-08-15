import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthRequest{
    email:string;
    password:string;
}

class AuthUserService{
    async execute({email,password}: AuthRequest){
        //Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })
        if(!user){
            throw new Error("User/Password incorrrect")
        }

        //Verificar se a senha enviada está correta
        const passwordMatch = await compare(password,user.password) //comparando a senha com a versao criptografada do bd
        if(!passwordMatch){
            throw new Error("User/password incorrect")
        }

        //se passar pelos testes:
        //gerar token JWT e devolver dados do user(id,name,email)
        const token = sign(
            {
                name:user.name,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d', //esse token expira em 30d
            }

        )
        return({
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        })
    }
}

export {AuthUserService}