const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskContainer = document.getElementById('taskContainer');

const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterCompleted = document.getElementById('filterCompleted');

const countAll = document.getElementById('countAll');
const countActive = document.getElementById('countActive');
const countCompleted = document.getElementById('countCompleted');

let currentFilter = 'all';

function updateCounters() {
    const allTasks = document.querySelectorAll('.task-item');
    const completedTasks = document.querySelectorAll('.task-item.completed');
    
    const totalCount = allTasks.length;
    const completedCount = completedTasks.length;
    const activeCount = totalCount - completedCount;

    countAll.textContent = totalCount;
    countActive.textContent = activeCount;
    countCompleted.textContent = completedCount;
}

function setActiveFilterButton(activeButton) {
    [filterAll, filterActive, filterCompleted].forEach(btn => {
        btn.classList.remove('active-filter');
    });
    activeButton.classList.add('active-filter');
}

function addTask() {
    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Task description cannot be empty!");
        return;
    }

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = taskValue;
    taskItem.appendChild(taskText);

    const actionBtns = document.createElement('div');
    actionBtns.className = 'action-btns';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '✓';
    toggleBtn.className = 'toggle-btn';
    actionBtns.appendChild(toggleBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✗';
    deleteBtn.className = 'delete-btn';
    actionBtns.appendChild(deleteBtn);

    taskItem.appendChild(actionBtns);
    taskContainer.appendChild(taskItem);

    taskInput.value = "";
    
    updateCounters();
    filterTasks(currentFilter);
}

function toggleTaskStatus(taskElement) {
    taskElement.classList.toggle('completed');
    updateCounters();
    filterTasks(currentFilter);
}

function deleteTask(taskElement) {
    taskElement.remove();
    updateCounters();
}

function filterTasks(filterType) {
    currentFilter = filterType;
    const tasks = taskContainer.querySelectorAll('.task-item');

    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        
        switch (filterType) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'active':
                task.style.display = isCompleted ? 'none' : 'flex';
                break;
            case 'completed':
                task.style.display = isCompleted ? 'flex' : 'none';
                break;
        }
    });
}

taskContainer.addEventListener('click', function(event) {
    const targetElement = event.target;
    const taskItem = targetElement.closest('.task-item');

    if (!taskItem) return;

    if (targetElement.classList.contains('toggle-btn')) {
        toggleTaskStatus(taskItem);
    } else if (targetElement.classList.contains('delete-btn')) {
        deleteTask(taskItem);
    }
});

filterAll.addEventListener('click', function() {
    setActiveFilterButton(filterAll);
    filterTasks('all');
});

filterActive.addEventListener('click', function() {
    setActiveFilterButton(filterActive);
    filterTasks('active');
});

filterCompleted.addEventListener('click', function() {
    setActiveFilterButton(filterCompleted);
    filterTasks('completed');
});