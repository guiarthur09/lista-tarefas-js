const listaTrf = [];  //Aqui esta criando o array

const frm = document.querySelector("#frm");
const resp = document.querySelector("#resp");
const btn = document.querySelector("#btn");  //Aqui sao as seleçoes dos elementos
const btn2 = document.querySelector("#btn2"); 
const btn3 = document.querySelector("#btn3");
const input = document.querySelector("#inTrf");


frm.addEventListener("submit", (e) => { // Adicionar tarefa
    e.preventDefault(); //evita que a pag. carregue ao enviar o form.

    const trf = input.value.trim(); //trim - metdo de tira os espaços em brancos.

  
    if (!trf) return; // evita adicionar tarefa vazia

    listaTrf.push(trf); //adc a tarefa dentro do array

    input.value = ""; //limpa o campo para a próx tarefa
});


btn.addEventListener("click", () => { // Listar tarefa

    resp.innerHTML = ""; //isso vai limpar a tela pra evitar duplicaçao

    listaTrf.forEach((tarefa) => { // percorre dentro do array
        const li = document.createElement("li"); //cria uma lista 
        li.innerText = tarefa; //coloca dentro do <li>

        // Removido o evento de clique direto nas tarefas
        // para que só o botão "Selecionar" possa selecionar itens

        resp.appendChild(li); //adc o item na lista exibida do HTML
    });

});


let indiceSelecionado = -1; // índice da tarefa atualmente selecionada

btn2.addEventListener("click", () => {
    const itens = resp.querySelectorAll("li");

    if (itens.length === 0) {
        alert("Não há tarefas para selecionar!");
        return;
    }

  
    itens.forEach(item => item.classList.remove("selecionado"));  // remove a seleção de todos

    // atualiza o índice para a próxima tarefa
    indiceSelecionado++;
    if (indiceSelecionado >= itens.length) {
        indiceSelecionado = 0; // volta para a primeira tarefa
    }

    
    itens[indiceSelecionado].classList.add("selecionado");     // adiciona a classe 'selecionado' na tarefa atual
});


btn3.addEventListener("click", () => { // evento do botão 'Remover tarefa'

    const selecionado = resp.querySelector(".selecionado"); // pega o item que está selecionado

    if (selecionado) { // se algum item estiver selecionado

        const texto = selecionado.innerText; // pega o texto da tarefa

        const confirmar = confirm(`Confirma exclusão de "${texto}"?`);  // confirm - pop up - pergunta se o usuário quer realmente excluir
        if (!confirmar) return; // se clicar em cancelar, não remove nada

        selecionado.remove();  // remove o item da tela

        const index = listaTrf.indexOf(texto); // procura o índice da tarefa no array
        if (index !== -1) {
            listaTrf.splice(index, 1); // remove a tarefa do array (mantém a lista sincronizada)
        }

        // Ajusta o índice se remover a tarefa selecionada
        if (indiceSelecionado >= listaTrf.length) {
            indiceSelecionado = listaTrf.length - 1;
        }

    } else { // se nenhum item estiver selecionado
        alert("Selecione uma tarefa para remover."); // mostra alerta pedindo seleção
    }

});