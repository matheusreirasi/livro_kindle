const {MongoClient, ObjectId} = require ('mongodb')


async function connect() {
    if (global.db) return global.db //verifica se já existe uma variável global chamada db, se sim, então quer dizer que já há uma conexão estabelecida
    const conn = await MongoClient.connect('mongodb://127.0.0.1:27017')
    if (!conn) {
        return new Error ("Can't connect")
    }
    global.db = await conn.db('workshop')
    return global.db
}

const express = require('express')
const app = express()
const port = 3000

app.use(require("cors")())
app.use(express.urlencoded({ extended:true }))
app.use(express.json())


/*
Definindo rotas
*/
const router = express.Router()
router.get("/clients/:id?", async (req, res, next) => { //? depois do id serve para dizer que é opcional
    try {
        const db = await connect()
        if (req.params.id) {
            res.json( await db.collection("customers").findOne({_id: new ObjectId(req.params.id)})) //tentei fazer sem o await e não carregou os usuários na tela. Um await para conectar e outro para renderizar na tela
        }
        else {
            res.json( await db.collection("customers").find().toArray())
        }
    }
    catch (ex) {
        console.log(ex)
        res.status(400).json({erro: `${ex}`})
    }
})

router.post("/clients", async (req, res, next) => {
    try {
        const customer = req.body
        const db = await connect()
        res.json(await db.collection("customers").insertOne(customer))
    }
    catch (ex) {
        console.log(ex)
        res.status(400).json({erro: `${ex}`})
    }
})

router.put("/clients/:id", async (req, res, next) => {
    try {
        const customer = req.body
        const db = await connect()
        const id = {_id: new ObjectId(req.params.id)}
        res.json(await db.collection("customers").updateOne(id, {$set:customer}))
    }
    catch (ex) {
        console.log(ex)
        res.status(400).json({erro: `${ex}`})
    }
})

router.patch("/clients/:id", async (req, res, next) => {
    try {
        const customer = req.body
        const db = await connect()
        const id = {_id: new ObjectId(req.params.id)}
        res.json( await db.collection("customers").updateOne(id, {$set:customer}))
    }
    catch (ex) {
        console.log(ex)
        res.status(400).json({erro: `${ex}`})
    }
})

router.delete("/clients/:id", async (req, res, next) => {
    try {
        const db = await connect()
        const id = {_id: new ObjectId(req.params.id)}
        res.json(await db.collection("customers").deleteOne(id))
    }
    catch (ex) {
        console.log(ex)
        res.status(400).json({erro: `${ex}`})
    }
})

router.get('/', (req, res) => res.json({message:'Funcionando!'})
)
app.use('/', router)


/*
Iniciando o servidor
*/
app.listen(port, () => {
    console.log('API funcionando!')
})