type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const app = document.getElementById('app')!;

let todos: Todo[] = [
  { id: 1, text: 'Build Playwright demo', done: false },
  { id: 2, text: 'Add CI workflow', done: true }
];

let nextId = 3;

app.innerHTML = `
  <div class="container">
    <h1>Todo Table</h1>

    <div style="margin-bottom: 1rem;">
      <input id="todo-input" placeholder="New todo" />
      <button id="add-btn">+</button>
    </div>

    <table id="todo-table" border="1" cellpadding="8">
      <thead>
        <tr>
          <th>Done</th>
          <th>Task</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="todo-body"></tbody>
    </table>
  </div>
`;

const input = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const tbody = document.getElementById('todo-body') as HTMLTableSectionElement;

function render() {
  tbody.innerHTML = '';

  todos.forEach((todo) => {
    const tr = document.createElement('tr');

    const doneTd = document.createElement('td');
    const taskTd = document.createElement('td');
    const actionsTd = document.createElement('td');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todo.done = checkbox.checked;
      render();
    });

    const text = document.createElement('span');
    text.textContent = todo.text;
    if (todo.done) text.style.textDecoration = 'line-through';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.addEventListener('click', () => {
      const updated = prompt('Edit todo', todo.text);
      if (updated?.trim()) {
        todo.text = updated.trim();
        render();
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.addEventListener('click', () => {
      todos = todos.filter((t) => t.id !== todo.id);
      render();
    });

    doneTd.appendChild(checkbox);
    taskTd.appendChild(text);
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);

    tr.append(doneTd, taskTd, actionsTd);
    tbody.appendChild(tr);
  });
}

addBtn.addEventListener('click', () => {
  const value = input.value.trim();
  if (!value) return;

  todos.push({ id: nextId++, text: value, done: false });
  input.value = '';
  render();
});

render();
