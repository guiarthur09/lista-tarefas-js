const listaTrf = [];

const frm = document.querySelector("#frm");
const resp = document.querySelector("#resp");
const btn = document.querySelector("#btn");
const btn3 = document.querySelector("#btn3");
const input = document.querySelector("#inTrf");

// Adicionar tarefa
frm.addEventListener("submit", (e) => {
    e.preventDefault();

    const trf = input.value.trim();

    // evita adicionar tarefa vazia
    if (!trf) return;

    listaTrf.push(trf);

    input.value = "";
});

// Listar tarefas
btn.addEventListener("click", () => {

    resp.innerHTML = "";

    listaTrf.forEach((tarefa) => {
        const li = document.createElement("li");
        li.innerText = tarefa;

        li.addEventListener("click", () => {

            const itens = resp.querySelectorAll("li");

            itens.forEach((item) => {
                item.classList.remove("selecionado");
            });

            li.classList.add("selecionado");
        });

        resp.appendChild(li);
    });

});

// Remover tarefa com confirmação
btn3.addEventListener("click", () => {

    const selecionado = resp.querySelector(".selecionado");

    if (selecionado) {

        const texto = selecionado.innerText;

        // confirmação antes de excluir
        const confirmar = confirm(`Confirma exclusão de "${texto}"?`);

        if (!confirmar) return;

        // remove da tela
        selecionado.remove();

        // remove do array
        const index = listaTrf.indexOf(texto);

        if (index !== -1) {
            listaTrf.splice(index, 1);
        }
    } else {
        alert("Selecione uma tarefa para remover.");
    }

});