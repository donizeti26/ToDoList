<?php


require_once __DIR__ . '/../config/config.php';

class Task
{
  public static function All()
  {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM tasks");

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function findById(int $id)
  {
    global $pdo;

    $stmt = $pdo->prepare("SELECT * FROM tasks WHERE id=:id");

    $stmt->bindValue(':id', $id, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}
