import type { AppProps } from 'next/app'
//coloco o estilo global aq pq ele vai aplicar em todas as pags
import '../../styles/globals.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../contexts/AuthContext'



export default function App({ Component, pageProps }: AppProps) {
  return (
  <AuthProvider>
    <Component {...pageProps} /> {/*reinderiza toda a nossa pag aq*/}
    <ToastContainer autoClose ={3000}/>{/*caso apareca um alerta ele fecga dps de 3000 milisegundos*/}
  </AuthProvider>
  
  )
}
