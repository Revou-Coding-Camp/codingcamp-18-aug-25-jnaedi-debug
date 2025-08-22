let tasks = [];
let taskIdCounter = 0;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: taskIdCounter++,
        text: taskText,
        date: taskDate || new Date().toISOString().split('T')[0],
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    dateInput.value = '';
    
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function deleteAllTasks() {
    if (tasks.length === 0) {
        alert('No tasks to delete!');
        return;
    }
    
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = [];
        renderTasks();
    }
}

function filterTasks(status = "all") {
    let filtered = tasks;

    if (status === "completed") {
        filtered = tasks.filter(task => task.completed);
    } else if (status === "pending") {
        filtered = tasks.filter(task => !task.completed);
    }

    renderTasks(filtered);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

function renderTasks(taskArray = tasks) {
    const taskList = document.getElementById('taskList');
    
    if (taskArray.length === 0) {
        taskList.innerHTML = '<div class="empty-state">No task found</div>';
        return;
    }

    taskList.innerHTML = taskArray.map(task => `
        <div class="task-item">
            <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
            <div class="task-date">${formatDate(task.date)}</div>
            <div class="task-status">
                <div class="status-indicator ${task.completed ? 'completed' : 'pending'}"></div>
                <span class="status-text">${task.completed ? 'Completed' : 'Pending'}</span>
            </div>
            <div class="task-actions">
                <button class="action-btn complete-btn" onclick="toggleTask(${task.id})" title="${task.completed ? 'Mark as pending' : 'Mark as completed'}">
                    ${task.completed ? '↩️' : '✓'}
                </button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete task">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

// Init
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });

    document.getElementById('dateInput').valueAsDate = new Date();
    renderTasks();
});
