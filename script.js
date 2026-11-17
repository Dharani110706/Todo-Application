
document.addEventListener('DOMContentLoaded', () => {
  
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const prioritySelect = document.getElementById('priority-select');
  const dateInput = document.getElementById('date-input');
  const todoList = document.getElementById('todo-list');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const itemsLeftSpan = document.getElementById('items-left');
  const clearCompletedBtn = document.getElementById('clear-completed');

  
  let tasks = JSON.parse(localStorage.getItem('ex03_tasks')) || [];
  let currentFilter = 'all';

  
  const saveTasks = () => {
    localStorage.setItem('ex03_tasks', JSON.stringify(tasks));
  };


  const renderTasks = () => {
    todoList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
      if (currentFilter === 'active') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true;
    });

    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `todo-item ${task.completed ? 'completed' : ''}`;
      li.dataset.id = task.id;

      const dateDisplay = task.dueDate ? `<span class="due-date">📅 ${task.dueDate}</span>` : '';

      li.innerHTML = `
        <div class="todo-left">
          <input type="checkbox" class="todo-checkbox" ${task.completed ? 'checked' : ''} />
          <div class="todo-content">
            <span class="todo-text">${escapeHTML(task.text)}</span>
            <div class="todo-meta">
              <span class="badge ${task.priority}">${task.priority}</span>
              ${dateDisplay}
            </div>
          </div>
        </div>
        <div class="todo-actions">
          <button class="action-btn edit-btn" title="Edit">✏️</button>
          <button class="action-btn delete-btn" title="Delete">🗑️</button>
        </div>
      `;

      todoList.appendChild(li);
    });

    updateStats();
  };

  const updateStats = () => {
    const activeCount = tasks.filter(t => !t.completed).length;
    itemsLeftSpan.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
  };

  const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    const newTask = {
      id: Date.now().toString(),
      text,
      priority: prioritySelect.value,
      dueDate: dateInput.value,
      completed: false
    };

    tasks.unshift(newTask); // Add to top of list
    saveTasks();
    renderTasks();

    todoInput.value = '';
    dateInput.value = '';
    prioritySelect.value = 'medium';
  });

  todoList.addEventListener('click', (e) => {
    const item = e.target.closest('.todo-item');
    if (!item) return;
    const id = item.dataset.id;

    if (e.target.classList.contains('todo-checkbox')) {
      tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      saveTasks();
      renderTasks();
    }

    if (e.target.classList.contains('delete-btn')) {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
    }

    if (e.target.classList.contains('edit-btn')) {
      const taskToEdit = tasks.find(t => t.id === id);
      const newText = prompt('Edit your task:', taskToEdit.text);
      if (newText !== null && newText.trim() !== '') {
        tasks = tasks.map(t => t.id === id ? { ...t, text: newText.trim() } : t);
        saveTasks();
        renderTasks();
      }
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
  });

  renderTasks();
});