import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?:boolean,
    children: ReactNode, //o q tem dentro do componente(acessar, cadastrar, etc)
}


export function Button({loading, children, ...rest}: ButtonProps){
    return(
        <button className={styles.button} 
        disabled={loading}/*desativa o boto p n ter mais efeito de click quando ele estiver carregando algo*/ 
        {...rest} /*td o resto q eu passar(o type por ex)*/ 
        >
            { loading ? ( //quando loading for true
                <FaSpinner color="#FFF" size={16}/>
            ) : ( //quando for false
            <a className={styles.buttonText}>{children}</a>
            )}

        </button>
    )
}