<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
  <link rel="icon" type="image/png" href="./dolistWhite.png" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  <title>ToDoList (php)</title>
  <link rel="icon" type="image/png" href="./assets/img/iconTodoList.svg">
  <link rel="stylesheet" href="./assets/css/index.css">
</head>

<body class="d-flex justify-content-center align-items-center  bg-dark-subtle ">
  <main class="container-md text-center rounded-5 p-5 m-3">
    <img class="img-fluid-sm text-center no-select w-50 w-md-25" draggable="false" src="./assets/img/logoTodolist.svg"
      alt="" /> <br>
    <button class="btn btn-dark btn-lg m-5" id="btn-create-task">Criar Nova Nota</button>
    <form action="" class="form myForm hidden">
      <div class="container-fluid d-flex justify-content-center align-items-center p-4 gap-2 flex-column">

        <div class="input-group input-group-lg div-input-title">
          <input type="text" class="form-control " placeholder="Insira sua task aqui" id="title-task" name="task" />
        </div>
        <div class="container-fluid">
          <textarea class="form-control-lg textarea  " id="Textarea" rows="8"></textarea>
        </div>
        <div class="d-flex flex-row gap-3">
          <button type="submit" class=" btn btn-warning btn-lg text-nowrap" id="btn-cancel-task">
            Cancelar nota
          </button>
          <button type="submit" class="btn-task btn btn-primary btn-lg text-nowrap">
            Criar nota
          </button>
        </div>
      </div>
    </form>
    <div class="task-area">

    </div>
  </main>
  <div class="position-absolute fixed-top div-question hidden">

    <div class=" card text-center " style=" width: 18rem;">
      <div class="card-body">
        <h5 class="card-title" id="alert-title"> TITULO AQUI</h5>
        <p class="card-text" id="alert-text">Deseja prosseguir com a</p>
        <div class="container d-flex gap-2 justify-content-center">

          <a href="#" class="btn btn-primary btn-task " id="no-continue">NÃO</a>
          <a href="#" class="btn btn-warning" id="yes-continue">SIM</a>

        </div>
      </div>
    </div>
  </div>

  <div class="position-absolute edit-modal fixed-top hidden">
  </div>


</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
<script type="module" src="assets/js/index.js"></script>

</html>