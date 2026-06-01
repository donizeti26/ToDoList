<?php

require_once __DIR__ . '/controllers/taskController.php';


$controller = new taskController();

$action = $_GET['action'] ?? '';


if ($action === 'list') {
  $controller->list();
}
