import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export default prismaClient;

//para acessar os usuarios do bd, criar, editar, etc