class Todo {
  id: string;
  name: string;
  text: string;
  active: boolean;

  constructor(id:string, todoText: string, name: string, active: boolean) {
    this.text = todoText;
    this.name = name;
    this.active = active;
    this.id = id;
  }
}

export default Todo;
