// Array global que armazenará as tarefas cadastradas
const listaDeTarefas = [];

class Tarefa {

    constructor(descricao) {

        if (!descricao || descricao.trim() === "") {
            throw new Error("A tarefa não pode estar vazia.");
        }

        this.descricao = descricao;
        this.concluida = false;
    }
}

const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaHTML = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(listaDeTarefas)
    );
}
function carregarTarefas() {

    const tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas) {

        const tarefas = JSON.parse(tarefasSalvas);

        tarefas.forEach((tarefaSalva) => {

            const tarefa = new Tarefa(tarefaSalva.descricao);

            tarefa.concluida = tarefaSalva.concluida;

            listaDeTarefas.push(tarefa);
        });
    }
}
function atualizarContador() {

    const quantidade = listaDeTarefas.length;

    if (quantidade === 0) {

        contadorTarefas.innerText = "0 tarefas na lista";

    } else if (quantidade === 1) {

        contadorTarefas.innerText = "1 tarefa na lista";

    } else {

        contadorTarefas.innerText =
            `${quantidade} tarefas na lista`;
    }
}
function renderizarLista() {

    listaHTML.innerHTML = "";
s
    listaDeTarefas.forEach((tarefa, index) => {

        const item = document.createElement("li");

        item.classList.add("item-tarefa");
        if (tarefa.concluida) {
    item.classList.add("concluido");
}

        const texto = document.createElement("span");

        texto.innerText = tarefa.descricao;

        const acoes = document.createElement("div");

        acoes.classList.add("acoes-tarefa");

        const botaoConcluir = document.createElement("button");

        botaoConcluir.classList.add("botao-acao");
        botaoConcluir.title = "Concluir tarefa";

        botaoConcluir.innerHTML =
            '<i class="fa-solid fa-check"></i>';

        botaoConcluir.addEventListener("click", () => {

            concluirTarefa(index);

        });


        const botaoExcluir = document.createElement("button");

        botaoExcluir.classList.add(
            "botao-acao",
            "excluir"
        );

        botaoExcluir.title = "Excluir tarefa";

        botaoExcluir.innerHTML =
            '<i class="fa-solid fa-trash"></i>';

        botaoExcluir.addEventListener("click", () => {

            removerTarefa(index);

        });

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoExcluir);

        item.appendChild(texto);
        item.appendChild(acoes);

        listaHTML.appendChild(item);
    });

    atualizarContador();
}
function concluirTarefa(index) {

    listaDeTarefas[index].concluida = true;

    salvarTarefas();

    renderizarLista();
}

function removerTarefa(index) {

    listaDeTarefas.splice(index, 1);

    salvarTarefas();

    renderizarLista();
}

botaoAdicionar.addEventListener("click", () => {

    const descricao = campoTarefa.value;

    try {

        const novaTarefa = new Tarefa(descricao);

        listaDeTarefas.push(novaTarefa);
  
        salvarTarefas();

        renderizarLista();

        campoTarefa.value = "";

        campoTarefa.focus();

    } catch (error) {

        alert(error.message);
    }
});

campoTarefa.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        botaoAdicionar.click();
    }
});

const botaoTema = document.getElementById("botao-alternar-tema");
const iconeTema = botaoTema.querySelector("i");

if (botaoTema) {

    botaoTema.addEventListener("click", () => {

        document.body.classList.toggle("modo-escuro");

        if (document.body.classList.contains("modo-escuro")) {
            iconeTema.classList.remove("fa-moon");
            iconeTema.classList.add("fa-sun");

        } else {

            iconeTema.classList.remove("fa-sun");
            iconeTema.classList.add("fa-moon");
        }
    });
}
carregarTarefas();
renderizarLista();
