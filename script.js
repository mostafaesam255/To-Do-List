const taskInput=document.getElementById('taskInput');
const addTaskButton=document.getElementById('addTaskButton');
const taskList=document.getElementById('taskList');
const notification=document.getElementById('notification');
// Display notification
const showNotification=(message)=>{
    notification.textContent=message;
    setTimeout(()=> notification.textContent='',2000);
};
// Load tasks from localStorage
const loadTasks=()=>{
    const tasks=JSON.parse(localStorage.getItem('tasks'))||[];
    tasks.forEach(task=>addTaskToDOM(task));
};
// Save tasks to localStorage
const saveTasks=()=>{
    const tasks=Array.from(taskList.children).map(task=>({
        text:task.querySelector('span').textContent,
        completed:task.classList.contains('completed')
    }));
    localStorage.setItem('tasks',JSON.stringify(tasks));
};
// Add task to the DOM
const addTaskToDOM=({text,completed})=>{
    const taskItem=document.createElement('li');
    taskItem.className=`task-item ${completed ? 'completed':''}`;

    const taskText=document.createElement('span');
    taskText.textContent=text;
    taskItem.appendChild(taskText);

    const editButton=document.createElement('button');
    editButton.className='edit';
    editButton.textContent='Edit'
    editButton.onclick=()=>editTask(taskItem);
    taskItem.appendChild(editButton);

    const deleteButton=document.createElement('button');
    deleteButton.className='delete';
    deleteButton.textContent='Delete';
    deleteButton.onclick=()=>deleteTask(taskItem);
    taskItem.appendChild(deleteButton);

    taskText.onclick=()=>toggleComplete(taskItem);

    taskList.appendChild(taskItem);
};
// Add task
const addTask=()=>{
    const text=taskInput.value.trim();
    if (!text) {
        showNotification('Task cannot be empty!');
        return;
    }
    addTaskToDOM({text,completed:false});
    saveTasks();
    taskInput.value='';
    showNotification('Task added successfully!');
};
// Delete task
const deleteTask=(taskItem)=>{
    taskList.removeChild(taskItem);
    saveTasks();
    showNotification('Task deleted successfully!');
};
// Edit task
const editTask=(taskItem)=>{
    const taskText=taskItem.querySelector('span');
    const newText=prompt('Edit your task:',taskText.textContent);
    if (newText!==null) {
        taskText.textContent=newText.trim()||taskText.textContent;
        saveTasks();
        showNotification('Task edited successfully!');
    }
};
// Toggle complete
addTaskButton.addEventListener('click',addTask);
taskInput.addEventListener('keypress',(e)=>{
    if (e.key==='Enter') {
        addTask();
    }
});
// Initialize
loadTasks();