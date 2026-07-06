import { objTask, TaskManager } from "./task.js";
const form = document.querySelector(".myForm");
const manager = new TaskManager();
const btnCreateTask = document.querySelector("#btn-create-task");
const btnCancelTask = document.querySelector("#btn-cancel-task");
renderTask("list");
btnCreateTask.onclick = () => {
  console.log("OK");
  form.classList.remove("hidden");
  btnCreateTask.classList.add("hidden");
  disableTaskArea();
  disableBody();
};
btnCancelTask.onclick = () => {
  console.log("OK");
  form.classList.add("hidden");
  btnCreateTask.classList.remove("hidden");
  disableBody();
  disableTaskArea();
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = form.querySelector("#title-task").value.trim();
  const content = form.querySelector("#Textarea").value.trim();
  const task = manager.add(title, content);

  form.reset();
});

document.addEventListener("click", function (event) {
  console.log("teste");
  if (event.target.classList.contains("btn-delete")) {
    const taskId = event.target.dataset.id;
    console.log("btn-delete " + taskId);
    modalDelete(taskId);
  } else if (event.target.classList.contains("btn-copy")) {
    const taskId = event.target.dataset.id;
    console.log("btn-copy " + taskId);
    modalCopy(taskId, true);
    const My = new objTask("TITULO", "CONTEUDO", true);

    console.log(My);
  } else if (event.target.classList.contains("btn-edit")) {
    const taskId = event.target.dataset.id;
    console.log("btn-edit " + taskId);
    editTask(taskId);
  } else if (event.target.classList.contains("btn-cancel-edit")) {
    const taskId = event.target.dataset.id;
    const editModal = document.querySelector(".form-edit");
    editModal.remove();
    closeModal(".edit-modal");
  }

  if (event.target.type === "checkbox") {
    const taskId = event.target.dataset.id;

    disableTask(taskId);
  }

  if (event.target.classList.contains("div-question")) {
    closeModal(".div-question");
  } else if (event.target.classList.contains("form-edit")) {
    closeModal(".edit-modal");
  }

  if (event.target.id == "no-continue") {
    closeModal(".div-question");
  }
  console.log(event.target);
});

function modalDelete(taskId) {
  const title = "DELETAR NOTA";
  const text = "Deseja realmente apagar definitivamente essa nota?";
  setValuesTags(title, text);
}

function modalCopy(taskId, copy) {
  setValuesTags(
    "COPIAR NOTA",
    "Deseja copiar o conteúdo dessa nota para sua area de transferencia?",
  );
  console.log("TASKID " + taskId);
  const btn = document.querySelector("#yes-continue");

  if (copy) {
    btn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(getTaskContent(taskId));
        closeModal(".div-question");
      } catch (err) {
        console.error("Clipboard error:", err);
      }
    };
  }
}

function getTaskContent(taskId) {
  const contentTask = document.querySelector(`#${taskId}`).textContent;
  console.log(contentTask);
  return contentTask;
}
function setValuesTags(title, text) {
  const divQuestion = document.querySelector(".div-question");

  const tagTitle = document.querySelector("#alert-title");
  const tagText = document.querySelector("#alert-text");

  divQuestion.classList.remove("hidden");
  tagTitle.textContent = title;
  tagText.textContent = text;
  disableBody();
}

function closeModal(classDiv) {
  console.log(classDiv);
  const DivSelected = document.querySelector(classDiv);

  if (!DivSelected.classList.contains("hidden")) {
    DivSelected.classList.add("hidden");
  } else {
    DivSelected.classList.remove("hidden");
  }
  disableBody();
}

function disableTask(taskId) {
  const task = document.querySelector(`[data-id="${taskId}"]`);
  console.log(task);
  console.log("filho " + task.children[1]);

  if (!task) return;
  const titleAndContent = task.children[0];

  if (!task.classList.contains("task-off")) {
    task.classList.add("task-off");
    titleAndContent.classList.add("content-off");
  } else {
    task.classList.remove("task-off");
    titleAndContent.classList.remove("content-off");
  }
}

function disableBody() {
  const tagBody = document.body;
  window.scrollTo(0, 0);

  if (!tagBody.classList.contains("body-no-overflow")) {
    tagBody.classList.add("body-no-overflow");
  } else {
    tagBody.classList.remove("body-no-overflow");
  }
}
function editTask(taskId) {
  //busca no banco
  const editModal = document.querySelector(".edit-modal");

  editModal.innerHTML = "";

  const modaFormEdit = document.createElement("form");

  modaFormEdit.classList.add("form", "form-edit", "p-3");

  editModal.classList.remove("hidden"); // abrir

  disableBody();

  modaFormEdit.innerHTML = `
      <div class="container-fluid container-form-edit d-flex justify-content-center rounded-3 align-items-center pt-5 pb-5 gap-2 flex-column text-center">
      <h1>Editando Nota</h1>
        <div class="input-group input-group-edit input-group-lg div-input-title-edit">
          <input type="text" class="form-control " placeholder="Título da sua nota aqui..." id="title-task-edit" name="task" />
        </div>
        <div class="container-fluid " id="div-text-area" >
          <textarea class="form-control-lg textarea " id="Textarea-edit" rows="8" placeholder="Texto da nota aqui..."></textarea>
        </div>
        <div class="d-flex gap-3">
        <button type="button" class="btn btn-warning btn-lg text-nowrap btn-cancel-edit">
          Cancelar
        </button>
        <button type="button" class=" btn btn-primary btn-lg text-nowrap btn-task">
          Salvar
        </button>
        </div>
      </div>`;
  console.log(editModal.childNodes);
  editModal.appendChild(modaFormEdit);
}
function disableTaskArea() {
  const taskArea = document.querySelector(".task-area");
  taskArea.classList.toggle("hidden");
}

async function renderTask(type) {
  try {
    const response = await fetch(`/api.php?action=${type}`);

    const dados = await response.json();
    //busca no banco
    const taskArea = document.querySelector(".task-area");

    taskArea.innerHTML = "";

    dados.forEach((dado) => {
      const allTask = document.createElement("div");
      const titleTask = document.createElement("h1");
      const textTask = document.createElement("p");
      console.log(dado.titulo);

      textTask.classList.add("text-task");

      allTask.innerHTML = `
      <div class="card mb-3 bg-secondary-subtle">
        <div class="group-content card-body d-flex  gap-5 align-items-center justify-content-between" data-id="note-${dado.id}">

          <div class="container d-flex align-items-start flex-column ">

            <h4>${dado.titulo}</h4>
            <p class="text-task" id="note-${dado.id}">
            ${dado.descricao}
            </p>
          </div>
          <div class="container group-options">

            <a>
              <span class="material-symbols-outlined btn-copy" data-id="note-${dado.id}">
                content_copy
              </span>
            </a>
            <a>
              <span class="material-symbols-outlined btn-delete" data-id="note-${dado.id}">
                delete
              </span>

            </a>

            <a>
              <span class="material-symbols-outlined btn-edit" data-id="note-${dado.id}">
                edit_document
              </span>
            </a>



            <input class="form-check-input check-option" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."
              style="border: var(--bs-border-width) solid #a4a4a4" data-id="note-${dado.id}" />

          </div>
        </div>
      </div>`;
      taskArea.appendChild(allTask);
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}
