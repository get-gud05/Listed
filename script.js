document.addEventListener('DOMContentLoaded', () => {

    const bgtext = document.getElementById('bgtext');
    const words = ['LISTED','LISTED','LISTED','LISTED','LISTED','LISTED','LISTED','LISTED','LISTED','LISTED','LISTED','LISTED','LISTED','LISTED','LISTED'];
    for(let i=0;i<30;i++) {
        const line = document.createElement('div');
        line.className='bg-line';
        line.style.top=(i*120)+'px';
        line.style.animationDelay=(i*0.3)+'s';

        if(i%2==0) line.classList.add('ltr');
        else line.classList.add('rtl');
        
        let lineText='';
        for(let j=0;j<=15;j++) {
            lineText += words[j%words.length] + ' ';
        }
        line.textContent=lineText;
        bgtext.appendChild(line);
    }



    const taskInput = document.getElementById('task-input');
    const addTaskbtn= document.getElementById('addtask-btn');   
    const taskList = document.getElementById('task-list');
    const emptyImg = document.querySelector('.emptyimage');
    const todoscontainer = document.querySelector('.todo-cont');

    const ToggleImg = () => {
        emptyImg.style.display = taskList.children.length===0 ? 'block' : 'none';
        todoscontainer.style.width = taskList.children.length>0 ? '100%' : '50%';    
    }; 

    const saveTaskToStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li=> ({
            text: li.querySelector('span').textContent,
            completed:li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks',JSON.stringify(tasks));
    };

    const LoadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({text,completed}) => addTask(text,completed,false));
        ToggleImg();
    }


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
            saveTaskToStorage();
        });
         
        editBtn.addEventListener('click',() => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                ToggleImg();
                saveTaskToStorage();
            } 
        });

        li.querySelector('.deletebtn').addEventListener('click',()=> {
            li.remove();
            ToggleImg();
            saveTaskToStorage();
        });

        taskList.appendChild(li);
        taskInput.value ='';
        ToggleImg();
        saveTaskToStorage();
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

    LoadTasks();
});