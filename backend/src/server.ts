import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import {router} from './routes'

const app = express();
app.use(express.json())
app.use(cors())

app.use(router)

app.use( //p acessar as imgs
    '/files', //se vc pesquisar localhost:3333/files/nome do arq da foto
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof Error){ //se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        }) //retorna uma excessao
    }

    return res.status(500).json({
        status: 'error',
        message:'Internal Server Error'
    } 
    ) //se n for server error é erro interno
})

app.listen(3333, () => console.log("Online")) //inicializando o projeto