var express = require('express')
var router = express.Router()

router.get('/', function(request,response,next) {
    response.render('cart', { title : 'nome do produto' })
})  
// eu tentei colocar sem o 'function' porém retornava 'response is not defined' pq provavelmente considerava que response tinha saído de um lugar qualquer e não reconhecia como de fato uma resposta para o caminho. É preciso colocar function para ter certeza de que irá seguir a função de atender a um pedido(request) ou entregar uma resposta(response).

module.exports = router