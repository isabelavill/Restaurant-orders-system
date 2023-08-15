import multer from 'multer'
import crypto from 'crypto'

import {extname, resolve} from 'path'

export default{
    upload(folder:string){ //vai indicar em que pasta deve salvar
        return{
            storage: multer.diskStorage({ //acessa o storage
                destination: resolve(__dirname,'..','..',folder),//onde vou salvar a foto//dirname é onde eu to, volta uma pasta, volta mais uma, acessa a tmp
                filename:(request, file, callback)=>{
                    const fileHash = crypto.randomBytes(16).toString("hex")
                    const fileName = `${fileHash}-${file.originalname}` //arq da nossa foto
                    return callback(null,fileName)
                }
           })
        }
    }
}