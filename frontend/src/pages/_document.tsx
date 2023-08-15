//criando estrutura q vai rendeerizar apenas uma vez, qnd rodar a aplicacao

import {Html, Head, Main, NextScript} from 'next/document'

export default function Documentt(){
    return(
        <Html>
            <Head>

            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}