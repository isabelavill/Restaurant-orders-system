import { useContext, FormEvent, useState} from "react"
import Head from "next/head"
import Image from 'next/image'
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.svg'
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import Link from 'next/link'
import { AuthContext } from "../contexts/AuthContext"
import { toast } from 'react-toastify'
import { canSSRGuest } from "@/utils/canSSRGuest"

export default function Home() {
const {signIn} = useContext(AuthContext)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false) //so sera true quando a gente clicar no botao


async function handleLogin(event: FormEvent){
  event.preventDefault(); //p ele n apagar as infos dos campos quando submetemos o form
  

  //Verificar se o user de fato mandou algo
  if(email === '' || password === ''){
    toast.error('Preencha os dados.')
    return; //se tiver vazio n faço nada
  }

  setLoading(true); // se ele clicou e chamou o login ele passa p true e spin

  let data ={
    email,
    password
  }
  
  await signIn(data)

  setLoading(false)

}

  return (
    <>
    <Head>
      <title>SujeitoPizza - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
    <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>

      <div className={styles.login}>
        <form onSubmit={handleLogin}> 
          {/* componente q criamos sendo chamado direto aqui */}
          <Input placeholder="Digite seu e-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>  {/*onchange é o q digitamos e ele esta atribuindo ao email nesse caso, armazenando no state*/}
        
          <Input placeholder="Digite sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <Button type="submit" loading={loading}> Acessar </Button> 
        </form>

        <Link href='/signup' legacyBehavior>
            <a className={styles.text}> Não possui uma conta? Cadastre-se</a>
        </Link>
       
      </div>
    </div>
    </>
  )
}

//serverside significa q ele executa no nosso servidor, se vc botar um console.log por ex ele printa no cmd nao no console do inspecionar da pagina
export const getServerSideProps = canSSRGuest(async (ctx) => { 
  return{
    props: {}
  }
})