'use strict'

async function listaDeContatos(numero) {
    const url = `https://giovanna-whatsapp.onrender.com/v1/whatsapp/contatos/${numero}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados.dados_contato
}

async function listaDeConversas(numero, contato) {
    const url = `https://giovanna-whatsapp.onrender.com/v1/whatsapp/conversas?numero=${numero}&contato=${encodeURIComponent(contato)}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados.conversas[0].conversas
}

async function preencherConversas(contato) {
    const numero = document.getElementById('numero').value
    const mensagens = await listaDeConversas(numero, contato)
    const chatBox = document.getElementById('mensagens')

    chatBox.replaceChildren()

    mensagens.forEach(mensagem => {
        const mensagemDiv = document.createElement('div')
        mensagemDiv.textContent = `${mensagem.sender} ${mensagem.content} (${mensagem.time})`
        mensagemDiv.classList.add(mensagem.sender === "me" ? "mensagem-enviada" : "mensagem-recebida")
        chatBox.appendChild(mensagemDiv)
    })
}

async function preencherContatos() {
    const numero = document.getElementById('numero').value
    const contatos = await listaDeContatos(numero)
    const galeria = document.getElementById('conversas-lista')

    galeria.replaceChildren()

    contatos.forEach(contato => {
        const contatoDiv = document.createElement('div')
        contatoDiv.classList.add('contato-item')
        contatoDiv.addEventListener('click', () => preencherConversas(contato.name))

        const img = document.createElement('img')
        img.src = './img/user.png' 

        const nome = document.createElement('span')
        nome.textContent = contato.name
        nome.classList.add('contato-nome')

        contatoDiv.appendChild(img)
        contatoDiv.appendChild(nome)
        galeria.appendChild(contatoDiv)
    })
}

document.getElementById('searchButton').addEventListener('click', preencherContatos)