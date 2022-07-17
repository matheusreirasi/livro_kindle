/* 
*Acho que esse arquivo corresponde a index.js do livro
*/

var express = require('express')
var router = express.Router()
const db = require('../db')

/* 
*GET crud page
*/
router.get('/', function(req, res, next) {
    res.render('crudClients', {title : 'Cadastro de Cliente',doc:{}, action:'/crudClients'}) //como o formulário desse site tem um valor action então tudo que for salvo no form será encaminhado para cá //aqui doc é vazio pq ainda não existe um cliente para ter uma id //no livro não tem um action, porém é necessário colocar aqui pq se não o action do EJS em "crud" fica sem função //se eu colocar "/" no action a requisição retorna código 200(mentira, o retorno do código é aleatório)
})


/*
* POST edit page
*/


router.post('/edit/:id', async function (req, res) {
    const id = parseInt(req.params.id)
    const nome = req.body.nome
    const idade = parseInt(req.body.idade)
    const uf = req.body.uf
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

let doc = getId
router.get('/edit/:id', (req, res) => {
    res.render('crudClients', {title:'Edição de cliente', doc, action:'/edit/'+doc._id})
})



/*
*POST crud page
*/
router.post("/", async function(req, res, next) {
    const nome = req.body.nome //é o mesmo nome passado em "name:" do HTML
    const idade = parseInt(req.body.idade)
    const uf = req.body.uf
    await db.insert({nome,idade,uf})
    res.redirect('/?crudClients=true') //Quando o user é cadastrado com sucesso eu sou redirecionado para a home page. Isso é como a operação se então em sua forma resumida, quer dizer que se "crudClients" é true então vá para a home page
})


module.exports = router