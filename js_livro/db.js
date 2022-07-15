const {MongoClient, ObjectId} = require('mongodb')


async function connect() {
    if (global.db) return global.db //Verifica se existe uma variável global chamada "db"
    const conn = await MongoClient.connect(
        'mongodb://127.0.0.1:27017/', {
        useUnifiedTopology: true, 
        useNewUrlParser: true,
    })
    
    if (!conn) return new Error("Cant't connect")
    global.db = await conn.db("workshop")
    return global.db //É "db" pq o nome do arquivo é "db.js"?
}


async function findAll() {
    const db = await connect()
    return db.collection('customers').find().toArray()
}


async function insert(customers) { //O nome da collection tem que ser igual ao do MongoDb e igual em todos os arquivos
    const db = await connect()
    return db.collection('customers').insertOne(customers)
}


async function findOne(id) {
    const db = await connect()
    const objId = new ObjectId(id)
    return db.collection('customers').findOne(objId)
}


async function updateOne(id, customers) {
    const filter = {_id: new ObjectId(id)}
    const db = await connect()
    return db.collection('customers').updateOne(filter, customers)
}

async function deleteOne(id) {
    const db = await connect()
    const filter = {_id : new ObjectId(id)}
    return db.collection("customers").deleteOne(filter)
}

module.exports = {findAll, insert, findOne, updateOne, deleteOne} 


//No coursera, foi utilizado "exports.perimeter = (x,y) => (2*(x+y))" para exportar a função contendo a fórmula do perímetro. O que vem depois de "exports" aparentemente pode ser um nome qualquer criado por mim. Esse método é considerado uma versão resumida de "module.exports"