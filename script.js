// State management
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // DOM elements
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');

        // Initial render
        renderTasks();

        // Function declarations
        function addTask() {
            const text = taskInput.value.trim();
            if (text) {
                tasks = [...tasks, { 
                    id: Date.now(), 
                    text, 
                    completed: false 
                }];
                taskInput.value = '';
                updateApp();
            }
        }

        function deleteTask(id) {
            tasks = tasks.filter(task => task.id !== id);
            updateApp();
        }

        function toggleComplete(id) {
            tasks = tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            updateApp();
        }

        function filterTasks(filterType) {
            const filtered = tasks.filter(task => {
                if (filterType === 'active') return !task.completed;
                if (filterType === 'completed') return task.completed;
                return true;
            });
            renderTasks(filtered);
        }

        // Higher-order functions and DOM manipulation
        function renderTasks(tasksToRender = tasks) {
            taskList.innerHTML = tasksToRender
                .map(task => `
                    <li class="task-item ${task.completed ? 'completed' : ''}">
                        <input 
                            type="checkbox" 
                            ${task.completed ? 'checked' : ''} 
                            onchange="toggleComplete(${task.id})"
                            style="margin-right: 1rem;"
                        >
                        <span>${task.text}</span>
                        <button 
                            onclick="deleteTask(${task.id})" 
                            style="margin-left: auto; background: #e74c3c;"
                        >
                            Delete
                        </button>
                    </li>
                `)
                .join('');
        }

        function updateApp() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }