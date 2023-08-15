import styles from './styles.module.scss';
import {InputHTMLAttributes, TextareaHTMLAttributes} from 'react'; //p adicionar tipagem


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{} //isso aq p corrigir o erro q ele da ao tipar o rest direto c o inputHTML
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps){ //rest indica q vou passar alguma info, nesse caso o placeholder especifico
    return(
        <input className={styles.input} {...rest}/>
    )
}

export function TextArea({...rest}:TextAreaProps){ //esse é p inputs q vc escreve varias coisas, como descrico do pedido por ex
    return(
        <textarea className={styles.input} {...rest}></textarea>
    )
}