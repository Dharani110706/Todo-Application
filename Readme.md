## Ex03 To-Do List using JavaScript

## Date: 17/11/2026

## AIM

To create a To-do Application with all features using JavaScript.

## ALGORITHM

STEP 1
Build the HTML structure (index.html).

STEP 2
Style the App (style.css).

STEP 3
Plan the features the To-Do App should have.

STEP 4
Create a To-do application using Javascript.

STEP 5
Add functionalities.

STEP 6
Test the App.

STEP 7
Open the HTML file in a browser to check layout and functionality.

STEP 8
Fix styling issues and refine content placement.

STEP 9
Deploy the website.

STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM

index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ex.03 - JavaScript Todo App</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="app-container">
    <header>
      <h1>Task Manager</h1>
      <p class="subtitle">Organize your day efficiently</p>
    </header>

    <!-- Task Input Form -->
    <form id="todo-form" class="input-group">
      <input 
        type="text" 
        id="todo-input" 
        placeholder="What needs to be done?" 
        required 
        autocomplete="off"
      />
      <div class="input-controls">
        <select id="priority-select" title="Priority">
          <option value="low">Low</option>
          <option value="medium" selected>Medium</option>
          <option value="high">High</option>
        </select>
        <input type="date" id="date-input" title="Due Date" />
        <button type="submit" id="add-btn">Add Task</button>
      </div>
    </form>

    <!-- Filter Controls -->
    <div class="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
    </div>

    <!-- Task List -->
    <ul id="todo-list" class="todo-list"></ul>

    <!-- Footer Stats & Actions -->
    <footer class="app-footer">
      <span id="items-left">0 items left</span>
      <button id="clear-completed" class="clear-btn">Clear Completed</button>
    </footer>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

CSS
```
:root {
  --bg-color: #f4f7f6;
  --card-bg: #ffffff;
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --text-main: #1f2937;
  --text-muted: #9ca3af;
  --border-color: #e5e7eb;
  --danger: #ef4444;
  --high: #fee2e2;
  --high-text: #b91c1c;
  --medium: #fef3c7;
  --medium-text: #b45309;
  --low: #dcfce7;
  --low-text: #15803d;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

body {
  background-color: var(--bg-color);
  color: var(--text-main);
  display: flex;
  justify-content: center;
  padding: 40px 16px;
  min-height: 100vh;
}

.app-container {
  background: var(--card-bg);
  width: 100%;
  max-width: 550px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 28px;
  height: fit-content;
}

header {
  margin-bottom: 24px;
  text-align: center;
}

header h1 {
  font-size: 1.75rem;
  color: var(--text-main);
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 4px;
}

/* Input Form */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

#todo-input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

#todo-input:focus {
  border-color: var(--primary);
}

.input-controls {
  display: flex;
  gap: 8px;
}

select, input[type="date"] {
  padding: 8px 10px;
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--text-main);
  background: #fff;
  outline: none;
}

#add-btn {
  flex: 1;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

#add-btn:hover {
  background-color: var(--primary-hover);
}

/* Filters */
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
}

.filter-btn {
  background: none;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 500;
}

.filter-btn.active {
  background-color: #eef2ff;
  color: var(--primary);
}

/* Todo List Items */
.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.2s;
  gap: 10px;
}

.todo-item:hover {
  border-color: #d1d5db;
}

.todo-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  overflow: hidden;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary);
}

.todo-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
}

.todo-text {
  font-size: 1rem;
  word-break: break-word;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--text-muted);
}

.todo-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
}

.badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge.high { background: var(--high); color: var(--high-text); }
.badge.medium { background: var(--medium); color: var(--medium-text); }
.badge.low { background: var(--low); color: var(--low-text); }

.due-date {
  color: var(--text-muted);
}

.todo-actions {
  display: flex;
  gap: 6px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.edit-btn:hover { background: #f3f4f6; color: var(--text-main); }
.delete-btn:hover { background: #fee2e2; color: var(--danger); }

/* Footer */
.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border-color);
  padding-top: 16px;
}

.clear-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
}

.clear-btn:hover {
  color: var(--danger);
  text-decoration: underline;
}
```

script.js

```

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
```

## OUTPUT


## RESULT
The program for creating To-do list using JavaScript is executed successfully.