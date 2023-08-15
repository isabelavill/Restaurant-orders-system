//usado p verificar se o usuario pode ter acesso a determinafdas paginas(que so podem ser acessadas se estiver logado)
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string, //dentro do sub tem o id do user
}

export function isAuthenticated(req:Request, res:Response, next: NextFunction){
    //receber o token

    const authToken = req.headers.authorization //caminho de onde ele esta

    if(!authToken){ //se nao tiver um token
        return res.status(401).end()
    }
    const [,token] = authToken.split(" ") //pegndo so o 2º item do array q ele forma com 'bearer token'



    try{    //validar token
        const { sub } = verify( //do verify so quero o sub(id do user)
            token, 
            process.env.JWT_SECRET
        ) as PayLoad; //ele vai devolver o tipo payload

        //recupera id do token e coloca numa var dentro do request
        req.user_id = sub

        return next()
    }catch(err){
        return res.status(401).end()
    }
}