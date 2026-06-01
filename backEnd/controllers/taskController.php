<?php


require_once __DIR__ . '/../models/task.php';


class taskController
{
  public function list()
  {
    $task = Task::all();
    echo json_encode($task);
  }

  public function show($id)
  {
    $task = Task::findById($id);

    echo json_encode($task);
  }
}
