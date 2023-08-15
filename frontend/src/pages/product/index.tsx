import styles from './styles.module.scss'
import Head from 'next/head'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header } from '../../components/Header'
import { FiUpload } from 'react-icons/fi'
import {useState, ChangeEvent, FormEvent} from 'react'
import { setupAPIClient } from '@/services/api'
import { toast } from 'react-toastify'

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps){
    /*imagem q enviamos*/ 
    const [avatarUrl, setAvatarUrl] = useState('') //armazena a url
    const [imageAvatar, setImageAvatar] = useState(null)//armazena a foto
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    //armazenar os dados q inserimos no input
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){/*se n tiver enviado nada*/
            return
        }
        /*se enviou*/ 
        const image = e.target.files[0];
        if(!image){ //se n tiver uma image
            return
        }

        if(image.type==='image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    //para selecoonar nova categoria
    function handleChangeCategory(event){
        // console.log('posicao da categoria selecionada', categories[event.target.value])
        setCategorySelected(event.target.value)
    }   

    async function handleRegister(event: FormEvent){ //usa 'cadastrar produto' do insomnia
        event.preventDefault()
        try{
            const data = new FormData();
            if(name==='' || price==='' || description==='' || imageAvatar === null){
                toast.error('Você deve preencher todos os campos.')
                return
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient();
            await apiClient.post('/product', data) //cadastrando produto no BD
            toast.success('Cadastrado com sucesso!')

        }catch(err){
            console.log(err)
            toast.error('Erro ao cadastrar!')
        }

        setName('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarUrl('')
    }
    return(
        <>
        <Head>
        <title>Novo produto - Sujeito Pizzaria</title>
        </Head>
        <div>
        <Header/>
        <main className={styles.container}>
        <h1>Novo produto</h1>

        <form className={styles.form} onSubmit={handleRegister}>
            {/*p adicionar imagem*/}
            <label className={styles.labelAvatar}>
                <span><FiUpload size={25} color="#FFF"/></span>
                <input type='file' accept="image/png, image/jpeg" onChange={handleFile}></input>

            {/*se tiver algo na url mostra o componente img*/}
            {avatarUrl && (
                <img src={avatarUrl} alt="Foto do produto" width={250} height={250} className={styles.preview}></img>
            )}

            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
                {categories.map((item,index)=>{
                    return(
                        <option key={item.id} value={index}>
                            {item.name}
                        </option>
                    )
                })}
            </select>

            <input type='text' placeholder='Digite o nome do produto' className={styles.input} value={name} onChange={(e) => setName(e.target.value)}></input>
            
            <input type='text' placeholder='Digite o preço do produto' className={styles.input} value={price} onChange={(e) => setPrice(e.target.value)}></input>

            <textarea placeholder='Descrição do produto' className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        
            <button className={styles.buttonAdd} type='submit'>Cadastrar</button>
        </form>
        </main>
        </div>
        </>

        )
}

export const getServerSideProps = canSSRAuth( async (ctx)=>{
    const apiClient = setupAPIClient(ctx)
    const response =  await apiClient.get('/category') //listando categorias da pag la do insmonia
    return{
        props:{
            categoryList: response.data
        }
    }
})