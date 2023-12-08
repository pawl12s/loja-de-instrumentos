import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/instrumento', (request, reply) => {
    const {instru, marca, tipo, cor} = request.body
   // console.log(body)
   // return 'cadastrar'
    database.create({
        instru: instru,
        marca: marca,
        tipo: tipo,
        cor: cor
    })

    return reply.status(201).send
})

server.get('/instrumento', (request) => {
    const search = request.query.search
    console.log(search)
    const instrumentos = database.list(search)
   // console.log(instrumentos)
    return instrumentos
})

server.put('/instrumentos/:id', (request, reply) => {
    const instrumentoId = request.params.id
    const {instru, marca, tipo, cor} = request.body
    const instrumento = database.update(instrumentoId, {
        instru: instru,
        marca: marca,
        tipo: tipo,
        cor: cor
    })
    return reply.status(204).send()
})

server.delete("/instrumentos/:id", (request, reply) => {
    const instrumentoId = request.params.id

    database.delete(instrumentoId)

    return reply.status(204).send()
})
server.listen({
    port: 3333,
})