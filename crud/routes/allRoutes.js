var express = require('express');
var router = express.Router();
const db = require("../db.js")


/* GET index page. */
router.get('/', function(req, res, next) { //definição padrão de roteamento básico: 'express.METHOD(PATH,HANDLER)'. Conforme site 'expressjs'. Nesse caso: '.get' é METHOD, '/' é PATH e 'function...' é HANDLER
  res.render('index', { title: 'Cadastro de cliente', docs:{}, action: "/index"});
});

/*
* POST index page
*/
router.post("/", async (req, res) => {
  const nome = req.body.nome
  const idade = parseInt(req.body.idade)
  const uf = req.body.uf
  await db.insert({nome, idade, uf})
  res.redirect("/?index=true")
})


/*
* GET listClients page
*/
router.get("/listClients", async function (req, res) {
  res.render("listClients", {title:"Lista de clientes", docs: await db.findAll(), action:"/listClients"})
})


/*
* GET edit page
*/
router.get("/edit/:id", async (req, res) => {
  const id = req.params.id
  const docs = await db.findOne(id)
  res.render("index", {title: "Edição de cliente", docs, action: `/edit/${docs._id}`})
})


/*
* POST edit page
*/
router.post ("/edit/:id", async (req, res) => {
  const id = req.params.id
  const nome = req.body.nome
  const idade = parseInt(req.body.idade)
  const uf = req.body.uf
  await db.updateOne(id, {$set:{nome, idade, uf}})
  res.redirect("/?edit=true")
})


/*
* GET delete page
*/
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id
  await db.deleteOne(id)
  res.redirect("/?delete=true")
})


module.exports = router;