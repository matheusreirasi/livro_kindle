let express = require('express')
let router = express.Router()
const db = require('../db')
const getClients =  require ("./clientsRouter")

const docs = getClients

/*
* POST edit page
*/
router.post('/', async function (req, res) {
    const id = docs._id
    const nome = docs.nome
    const idade = parseInt(docs.idade)
    const uf = docs.uf
    await db.updateOne(id,{$set:{nome,idade,uf}})
    res.redirect('/?editClients=true')
})

/*
* GET edit page
*/
async function getId (req) {
    const id = req.params.id
    const doc = await db.findOne(id)
    return doc
}

//getId é necessário pq passar os dados dentro da função do router não da tempo o suficiente para ler o id do usuário, então foi necessário criar uma função getId para primeiro ler o id e depois colocar essa função no router
const doc = getId
router.get('/', async function (req, res) {
    res.render('editClients', {title: 'Edição de Cliente', doc, action:'/edit/:'+doc._id})
})


module.exports = router