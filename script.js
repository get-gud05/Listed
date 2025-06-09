document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskbtn= document.getElementById('addtask-btn');   
    const taskList = document.getElementById('task-list');
    const emptyImg = document.querySelector('.emptyimage');

    const ToggleImg = () => {
        emptyImg.style.display = taskList.children.length===0 ? 'block' : 'none';
    };


    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText) return;

        const li=document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        `; 

        taskList.appendChild(li);
        taskInput.value ='';
        ToggleImg();
    };

    addTaskbtn.addEventListener('click',addTask);
    taskInput.addEventListener('keypress',(e) => {
        if(e.key ==='Enter') {
            addTask(e); 
        }
    });
});