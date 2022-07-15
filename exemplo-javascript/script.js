
function updateTable (clientes) {
    let linha = ""
    if (!Array.isArray(clientes)) {
        clientes = [clientes]
    }
    for (cliente of clientes) {
        linha += `<tr> <td>${cliente.nome}</td> <td>${cliente.idade} </td> <td>${cliente.uf} <td/> </tr>`
    }
    /*
    for (let item in data) {
        linha += `<td>${item[1]}</td>`
    }
    linha += "<td> <input type='button' value='X' /> <td/> <tr/>"
    */

    //Quando houver somente uma linha, essa única linha será "Nenhum cliente cadastrado"
    const tbody = document.getElementById("table>tbody")
    if (tbody.querySelectorAll("tr > td").length === 1) {
    tbody.innerHTML = "" 
    }   

    tbody.innerText += linha

    divListagem.style.display = "block"
    divCadastro.style.display  = "none"

    frmCadastro.reset()

    const buttons = document.querySelectorAll("input[value='X']")
    for (btn of buttons) {
        if (btn.onclick !== null) {
            btn.onclick = (evt) => {
                if (confirm("Tem certeza que deseja excluir esse cliente?")) {
                    btn.closest("tr").remove()
                }
            }
        }
    }
}


/*
*Pegando dados da HTML
*/
const frmCadastro = document.getElementById("frmCadastro")

frmCadastro.onsubmit = (evt) => {
    let data = new FormData(frmCadastro)

    updateDataBase(data)
    .then(result => {
        const cliente = result.ops[0]
        alert(`Cliente ${cliente.nome} cadastrado com sucesso!`)
        updateTable(cliente)
    })
    .catch(err => alert(`Ocorreu um erro: ${err}`))

    evt.preventDefault()
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
    const responseApp = await fetch (`${webApiDomain}/clients`, {
        headers,
        method:"POST",
        body:JSON.stringify(json)
    })

    return await responseApp.json()
}