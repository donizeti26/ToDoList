import { objTask, TaskManager } from "./task.js";
const form = document.querySelector(".myForm");
const manager = new TaskManager();
const btnCreateTask = document.querySelector("#btn-create-task");
const btnCancelTask = document.querySelector("#btn-cancel-task");

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
  renderTask(task);

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

    disableTask(taskId, event.target.checked);

    updateTaskInDB(taskId, event.target.checked);
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

function renderTask() {}
function modalDelete(taskId) {
  const title = "DELETAR NOTA";
  const text = "Deseja realmente apagar definitivamente essa nota?";
  setValuesTags(title, text);
}

function modalCopy(taskId, copy) {
  setValuesTags(
    "COPIAR NOTA",
    "Deseja copiar o conteudo dessa nota para sua area de transferencia?",
  );
  const btn = document.querySelector("#yes-continue");

  if (copy) {
    btn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(getTaskContent(taskId));
        closeModal();
      } catch (err) {
        console.error("Clipboard error:", err);
      }
    };
  }
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

function disableTask(taskId, boolean) {
  taskId = "task-101";
  const task = document.querySelector(`[data-id="${taskId}"]`);
  if (!task) return;
  const titleAndContent = task.children[0];
  task.classList.add("task-off", boolean);
  titleAndContent.classList.add("content-off", boolean);
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
        <button type="button" class=" btn btn-primary btn-lg text-nowrap btn-task">
          Salvar
        </button>
        <button type="button" class="btn btn-danger btn-lg text-nowrap btn-cancel-edit">
          Cancelar
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
