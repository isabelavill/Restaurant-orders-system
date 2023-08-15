import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "../contexts/AuthContext";


export function setupAPIClient(ctx = undefined){ //caso nao receba um contexto ele inicializa como undefined
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}` //token q chega se esta logado, posso escolher o nome(nextauth)
        }
    })

        //callbacks
    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if(error.response.status === 401){//em erro 401(nao autorizado) devemos deslogar o user
            if(typeof window !== undefined){//chamar logout
                signOut()
            }else{ // ele ta no serverside, cai em uma excessao
                return Promise.reject(new AuthTokenError())
            }
        }
        // caso n foi um erro de  nao autorizado, mas um outro, devemos rejeitar tb
        return Promise.reject(error)
    })

    return api;

}