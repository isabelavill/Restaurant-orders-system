import { useState, FormEvent, useContext} from "react"
import Head from "next/head"
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'
import logoImg from '../../../public/logo.svg'
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import Link from 'next/link'
import { AuthContext } from "../../contexts/AuthContext"
import {toast} from 'react-toastify'


export default function SignUp() {
const {signUp} = useContext(AuthContext)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)

async function handleSignUp(event: FormEvent){
  event.preventDefault();

  //verficar se ele mandou todas as infos
  if(name === '' || email === '' || password === ''){
    toast.error('Preencha todos os campos')
    return
  }

  setLoading(true)

  let data= {
    name, 
    email, 
    password
  }

  await signUp(data)

  setLoading(false)
  }

  return (
    <>
    <Head>
      <title>Faça seu cadastro agora</title>
    </Head>
    <div className={styles.containerCenter}>
    <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>

      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form onSubmit = {handleSignUp}> 
          <Input placeholder="Nome da Empresa" type="text" value={name} onChange={(e)=> setName(e.target.value)}/>  

          <Input placeholder="Digite seu e-mail" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>  {/* componente q criamos sendo chamado direto aqui */}
        
          <Input placeholder="Sua senha" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

          <Button type="submit" loading={loading}> Cadastrar </Button> 
        </form>

        <Link href='/' legacyBehavior>
            <a className={styles.text}> Já possui uma conta</a>
        </Link>
       
      </div>
    </div>
    </>
  )
}
