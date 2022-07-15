var express = require('express') //aqui não precisa colocar todo o caminho pq é do tipo external ou core modules
var router = express.Router()
const db = require('../db') //foi usado 2 pontos pq o arquivo está em uma pasta anterior a atual, se fosse na mesma pasta eu colocaria somente 1 ponto, aqui é do tipo file-based module

//docs = db.findAll //sem isso eu nunca conseguiria pegar os dados do database, pois mesmo o EJS estando certo, retornava que docs não era definido


router.get('/',async function(req, res, next) {
    res.render('clients', {docs: await db.findAll(), title : 'Listagem de clientes'}) //no site "/clients" não tinha nenhuma tag com o title, creio que por isso estava dando erro 304, pois eu tinha criado uma propriedade chamada "title" que não era utilizada em nenhum lugar
})

/*
*Delete
*/
router.get("/delete/:id", async function (req, res) {
    const id = req.params.id
    await db.deleteOne(id)
    res.redirect("?delete=true")
})

async function getClients () {
    const clients = await db.findAll()
    return clients
}


module.exports = router, getClients