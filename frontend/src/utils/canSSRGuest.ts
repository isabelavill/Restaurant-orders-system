//visitantes/users nao logados podem acessar

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx)

    //redirecionar o user quando ele estiver logado
    if(cookies['@nextauth.token']){ //se tiver cookies, significa q o user fez o login, n deve mais acesar a pag de login ou cadastro
        return{
            redirect:{
                destination:'/dashboard',
                permanent:false,
            }
        }
    }


        return await fn(ctx)
    }
}