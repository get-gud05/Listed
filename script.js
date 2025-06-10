document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskbtn= document.getElementById('addtask-btn');   
    const taskList = document.getElementById('task-list');
    const emptyImg = document.querySelector('.emptyimage');
    const todoscontainer = document.querySelector('.todo-cont');

    const ToggleImg = () => {
        emptyImg.style.display = taskList.children.length===0 ? 'block' : 'none';
        todoscontainer.style.width = taskList.children.length>0 ? '100%' : '50%';    
    }; 


    const addTask = (text,completed=false) => {
        const taskText = text || taskInput.value.trim();
        if(!taskText) return;
 
        const li=document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="editbtn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="deletebtn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `; 

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.editbtn');


        if (completed) {
            li.classList.add('completed');
            editBtn.disabled=true;  
            editBtn.style.opacity='0.5';
            editBtn.style.pointerEvents='none';
        }

        checkbox.addEventListener('change',() => {
            const isChecked= checkbox.checked;
            li.classList.toggle('completed',isChecked);
            editBtn.disabled=isChecked;
            editBtn.style.opacity=isChecked?'0.5':'1';
            editBtn.style.pointerEvents=isChecked?'none':'auto';
        });
         
        editBtn.addEventListener('click',() => {
           if(!checkbox.checked) {
            taskInput.value = li.querySelector('span').textContent;
            li.remove();
            ToggleImg();
           } 
        });

        li.querySelector('.deletebtn').addEventListener('click',()=> {
            li.remove();
            ToggleImg();
        });

        taskList.appendChild(li);
        taskInput.value ='';
        ToggleImg();
    };

    addTaskbtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        addTask();
    });
    taskInput.addEventListener('keypress',(e) => {
        if(e.key ==='Enter') {  
            e.preventDefault();
            addTask(); 
        }
    });
});