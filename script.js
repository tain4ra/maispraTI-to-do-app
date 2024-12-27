const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let editTaskId = null;

// Load tasks from localStorage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
if (tasks.length) {
    tasks.forEach(task => addTaskToDOM(task));
}

// Add event listener for the form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    if (editTaskId) {
        // Update existing task
        updateTask(editTaskId, taskText);
    } else {
        // Add a new task
        addTask({ text: taskText });
    }

    taskInput.value = '';
    editTaskId = null; // Reset after addition or update
});

// Add a task to the DOM
function addTaskToDOM(task) {
    const taskEl = document.createElement('li');
    taskEl.classList.add('flex', 'justify-between', 'items-center', 'border-b-2', 'border-purple-300', 'p-2');

    // Text of the task
    const taskText = document.createElement('span');
    taskText.innerText = task.text;
    taskText.classList.add('flex-1', 'truncate', 'text-left');

    // Edit button
    const editButton = document.createElement('button');
    editButton.innerText = 'EDIT';
    editButton.classList.add('mx-auto', 'bg-purple-300', 'hover:bg-purple-900', 'text-white', 'px-2', 'py-1');
    editButton.addEventListener('click', () => {
        taskInput.value = task.text; // Fill input with task text
        editTaskId = task.id; // Set task ID to be edited
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'DELETE';
    deleteButton.classList.add('bg-purple-300', 'hover:bg-purple-900', 'text-white', 'px-2', 'py-1');
    deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
    });

    // Append elements to the task element
    taskEl.appendChild(taskText); // Text on the left
    taskEl.appendChild(editButton); // Edit button in the center
    taskEl.appendChild(deleteButton); // Delete button on the right

    // Append task element to the task list
    taskList.appendChild(taskEl);
}


// Update an existing task
function updateTask(id, text) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].text = text;
    updateLocalStorage();
    renderTasks(); // Re-render the list
}

// Delete a task
function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks.splice(taskIndex, 1); // Remove the task
    updateLocalStorage();
    renderTasks(); // Re-render the list
}

// Re-render the task list
function renderTasks() {
    taskList.innerHTML = ''; // Clear current list
    tasks.forEach(task => addTaskToDOM(task));
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a task to the array and DOM
function addTask(task) {
    const newTask = {
        id: Date.now(), // Unique ID for the task
        text: task.text,
        completed: false
    };
    tasks.push(newTask);
    updateLocalStorage();
    addTaskToDOM(newTask);
}