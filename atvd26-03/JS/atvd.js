const listaTrf = [];  //Aqui esta criando o array

const frm = document.querySelector("#frm");
const resp = document.querySelector("#resp");
const btn = document.querySelector("#btn");  //Aqui sao as seleçoes dos elementos 
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

        li.addEventListener("click", () => { //ao clicar em cada tarefa

            const itens = resp.querySelectorAll("li"); //pega todos o itens da lista

            itens.forEach((item) => {
                item.classList.remove("selecionado"); //remove a seleção de todos os itens
            });

            li.classList.add("selecionado");//adc a class 'selecionado' ao elemento cliacdo
        });

        resp.appendChild(li); //adc o item na lista exibida do HTML
    });

});


btn3.addEventListener("click", () => { // evento do botão 'Remover tarefa'

    const selecionado = resp.querySelector(".selecionado"); // pega o item que está selecionado

    if (selecionado) { // se algum item estiver selecionado

        const texto = selecionado.innerText; // pega o texto da tarefa

        const confirmar = confirm(`Confirma exclusão de "${texto}"?`);  // pergunta se o usuário quer realmente excluir
        if (!confirmar) return; // se clicar em cancelar, não remove nada

        selecionado.remove();  // remove o item da tela

        const index = listaTrf.indexOf(texto); // procura o índice da tarefa no array
        if (index !== -1) {
            listaTrf.splice(index, 1); // remove a tarefa do array (mantém a lista sincronizada)
        }

    } else { // se nenhum item estiver selecionado
        alert("Selecione uma tarefa para remover."); // mostra alerta pedindo seleção
    }

});