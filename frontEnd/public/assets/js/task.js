export function createTask() {}

export class objTask {
  constructor(title, content, completed) {
    this.title = title;
    this.content = content;
    this.completed = completed;
    this.created_at = new Date();
  }
  toggle() {
    this.completed = !this.completed;
  }
}

export class TaskManager {
  #tasks = [];
  add(title, content) {
    const task = new objTask(title, content, false);
    this.#tasks.push(task);
    return;
    task;
  }
  getAll() {
    return [...this.#tasks];
  }
  findById(id) {
    return this.#tasks.find((t) => t.id === id);
  }
  toggle(id) {
    const t = this.findById(id);
    if (t) t.completed = !t.completed;
  }
}
