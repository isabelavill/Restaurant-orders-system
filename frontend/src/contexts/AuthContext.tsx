import { createContext, ReactNode, useState, useEffect} from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient'
import {toast} from 'react-toastify'

type AuthContextData = {
    user:UserProps;
    isAuthenticated: boolean; //p sabermos se esta logado
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SingUpProps) => Promise<void>;
}

type UserProps = {
    id:string;
    name:string;
    email:string;
}

type SignInProps={
    email:string;
    password:string;

}

type SingUpProps = {
    name:string;
    email:string;
    password:string;
}

type AuthProviderProps = {
    children: ReactNode;
}



export const AuthContext = createContext({} as AuthContextData) //tipando o contexto

export function signOut(){
    try{//tentando destruir meu token p ele deslogar
        destroyCookie(undefined, '@nextauth.token') //esse é o cookie q quero destruir(q criei no outro arq(api.ts))
        Router.push('/') //depois q destruir o cookie manda o user p nossa tela '/' q é a de refazer login
    }catch{
        console.log('erro ao deslogar')
    }
}


//criando o provider do contexto
export function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState<UserProps>() //armazena as infos do login // se tiver algo aq vai transformar em true, se nao, false
    const isAuthenticated = !!user; //as exclamações convertem nossa var user em um boolean


    useEffect(()=>{ //toda vez q o componente for carregado ele ativa o useeffect, vai fazer verificacao do user
        //tentar pegar token
        const{'@nextauth.token':token} = parseCookies();
        if(token){ //se tem token faz req na nossa '/me' p verificar se esta td correto
            api.get('/me').then(response => {//quando for sucesso recebe o response
                const {id, name, email} = response.data
                setUser({
                    id,
                    name, 
                    email
                })
            }) 
            .catch(() =>{ //caso o token n bata c o q ele obteu, devemos deslogar o user
                signOut()
            }) 
        }
    },[])

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session',{//isso a gente olha no insomnia, o tipo,  a url e os parametros q tem q passar
                email, 
                password
            })

            // console.log(response.data)

            //trasnformar/salvar os dados q ele retorna(token) em cookies 
            const {id, name, token} = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                //propriedades n obrigatorias
                maxAge: 60*60*24*30,//qnt tempo vai expirar esse cookie, 1 mes nesse caso
                path:"/" //quais caminhos terao acesso ao cookie, todos nesse caso
            
            })

            setUser({
                id,
                name,
                email
            })

            //passar o token p todas as proximas requisições q fizermos

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //redirecionar user p /dashboard (todos os pedidos)
            toast.success('Logado com sucesso!')
            Router.push('/dashboard')
            
        }catch(err){
            toast.error("Erro ao acessar!")
            console.log("ERRO AO ACESSAR ", err)
        }
    }

    async function signUp({name, email, password}:SingUpProps){
        try{
            const response = await api.post('/users',{
                name, 
                email,
                password
            })

            toast.success("Cadastrado com sucesso!")
            console.log("Cadastrado com sucesso!")
            Router.push('/') //volta p tela de login

        }catch(err){
            toast.error("Erro ao cadastrar informações ")
            console.log("Erro ao cadastrar informações ", err)
        }
    }
    


    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}