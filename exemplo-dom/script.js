/*
*Alterando a tabela de usuários na página
*/

function updateTable (clientes) {
    let linha = ""
    if (!Array.isArray(clientes)) {
        clientes = [clientes]
    }
    for (let cliente of clientes) {
        linha += `<tr> <td>${cliente.nome}</td> <td>${cliente.idade} </td> <td>${cliente.uf} <td/> <input type= 'button' value='X' data-id=${cliente._id} /> </tr>`
    }


    //Quando houver somente uma linha, essa única linha será "Nenhum cliente cadastrado"
    const tbody = document.querySelector("table>tbody") //não funcionou com getElementById pq retorna um elemento HTML.
    if (tbody.querySelectorAll("tr > td").length === 1) {
    tbody.innerHTML = "" 
    }   

    tbody.innerHTML += linha //passou tudo para texto. Com innerText passou tudo com tags HTML. Aparentemente é o contrário

    divListagem.style.display = "block"
    divCadastro.style.display = "none"

    frmCadastro.reset()

    const buttons = document.querySelectorAll("input[value='X']")
    for (let btn of buttons) {
        if (btn.onclick !== null) continue //tentei colocar todo o código de baixo dentro do if mas não deu certo. É necessário usar o continue
        btn.onclick = (evt) => {
            if (confirm("Tem certeza que deseja excluir esse cliente?")) {
                deleteDataBase(btn.getAttribute("data-id"))
                .then( result => {
                    alert ("Cliente excluído com sucesso")
                    btn.closest("tr").remove()
                })
                .catch(err => alert(`Ocorreu um erro ao excluir o cliente: ${err}`))
            }
        }
        
    }
}


/*
*Atualizando banco de dados
*/
const webApiDomain = "http://localhost:3000"

async function updateDataBase(data) {
    const json = {}
    for (let item of data) {
        json[item[0]] = item[1]
    }

    const headers = new Headers()
    headers.append("Content-type","application/json")
    const responseFromApi = await fetch (`${webApiDomain}/clients`, {
        headers,
        method:"POST",
        body:JSON.stringify(json)
    })

    return await responseFromApi.json()
}


async function loadDataBase() {
    const getData = await fetch (`${webApiDomain}/clients`)
    return await getData.json()
}

async function deleteDataBase (id) {
    const response = await fetch (`${webApiDomain}/clients/${id}`, {
        method: "DELETE"
    })

    return await response.json()
}


/*
* Dando responsividade para a DOM
*/

document.addEventListener("DOMContentLoaded", function(event) {
    const divListagem = document.getElementById("divListagem")

    const divCadastro = document.getElementById("divCadastro")
    divCadastro.style.display = "none"

    loadDataBase()
    .then((clientes => updateTable(clientes)))
    .catch(err => alert(`Ocorreu um erro ao carregar os clientes: ${err}`))

    document.getElementById("btnListar").onclick = (evt) => {
        divListagem.style.display = "block"
        divCadastro.style.display = "none"
    }

    document.getElementById("btnCadastrar").onclick = (evt) => {
        divCadastro.style.display = "block"
        divListagem.style.display = "none"
    }

    /*
    *Pegando dados da HTML
    */
    const frmCadastro = document.getElementById("frmCadastro")

    frmCadastro.onsubmit = (evt) => {
        let data = new FormData(frmCadastro) //data possui a chave/valor para ser salvo no mongodb

        updateDataBase(data)
        .then(result => {
            const cliente = result.ops[0]
            const idade = parseInt(cliente.idade)
            alert(`Cliente ${cliente.nome} cadastrado com sucesso!`)
            updateTable({cliente, idade})
        })
        .catch(err => alert(`Ocorreu um erro: ${err}`))

        evt.preventDefault()
    }
    })

