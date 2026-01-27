const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formulario = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const listaTarefas = []

 function criarElementoTarefa(tarefa){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg>
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    const imgBotao = document.createElement('img')
    imgBotao.setAttribute('src', '/imagens/edit.png')

    botao.append(imgBotao)
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)
}

btnAdicionarTarefa.addEventListener('click', () => {

    formulario.classList.toggle('hidden')
})

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const tarefa = {
        descricao : textArea.value
    }
    listaTarefas.push(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
})

