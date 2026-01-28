const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formulario = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const areaTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
}

function criarElementoTarefa(tarefa) {
    const itemLista = document.createElement('li')
    itemLista.classList.add('app__section-task-list-item')

    const svg = document.createElement('div')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafoDescricao = document.createElement('p')
    paragrafoDescricao.textContent = tarefa.descricao
    paragrafoDescricao.classList.add('app__section-task-list-item-description')

    const botaoEditar = document.createElement('button')
    botaoEditar.classList.add('app-button-edit')

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', 'imagens/edit.png') // ✅ caminho corrigido

    botaoEditar.append(imagemBotao)

    botaoEditar.onclick = (evento) => {
        evento.stopPropagation()

        const novaDescricao = prompt('Qual é o novo nome da tarefa?')
        if (novaDescricao) {
            tarefa.descricao = novaDescricao
            paragrafoDescricao.textContent = novaDescricao
            atualizarTarefas()
        }
    }

    itemLista.onclick = () => {
        paragrafoDescricaoTarefa.textContent = tarefa.descricao

        document
            .querySelectorAll('.app__section-task-list-item')
            .forEach(item =>
                item.classList.remove('app__section-task-list-item-active')
            )

        itemLista.classList.add('app__section-task-list-item-active')
    }

    itemLista.append(svg, paragrafoDescricao, botaoEditar)
    return itemLista
}

btnAdicionarTarefa.addEventListener('click', () => {
    formulario.classList.toggle('hidden')
})

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const tarefa = {
        descricao: textArea.value
    }

    listaTarefas.push(tarefa)
    areaTarefas.append(criarElementoTarefa(tarefa))
    atualizarTarefas()

    textArea.value = ''
    formulario.classList.add('hidden')
})

listaTarefas.forEach(tarefa => {
    areaTarefas.append(criarElementoTarefa(tarefa))
})
