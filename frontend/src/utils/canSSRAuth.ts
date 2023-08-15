//somente users logados podem acessar

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";


export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx)
    const token = cookies['@nextauth.token']

    if(!token){ //se n tiver um token
        return{
            redirect:{
                destination:'/', //redireciona p tela de login
                permanent:false,
            }
        }
    }

    //se tem o token
    try{
        return await fn(ctx)
    }catch(err){ //mesmo se tem o token e deu algum erro
        if(err instanceof AuthTokenError){
           destroyCookie(ctx, '@nextauth.token') //destroi o token

           return{ //retorna p login
            redirect:{
                destination:'/',
                permanent:false
            }
           }
        }
    }



    }
}