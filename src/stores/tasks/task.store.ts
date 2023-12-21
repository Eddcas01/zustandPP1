import { StateCreator, create } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";
import {v4 as uuidv4} from "uuid"
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
interface TaskState {
  draggindTaskId?: string; // propiedad task id
    tasks: Record<string, Task> //record es el que maneja el id del task
    
}

interface Actions{

    getTaskByStatus:(status: TaskStatus) => Task[];// metodo para obtener todas las tasks
    setDraggingTaskId:(taskId: string) => void; //metodo para obtener la tarea que se esta arrastrando
    removeDraggingTaskId:() => void; // metodo para volver a undefine el state
    changeTaskStatus:(taskId:string, status: TaskStatus) => void; // metodo para actualizar el estado de una tarea
    onTaskDrop:(status:TaskStatus) => void; // metodo para obtener el estado de la tarea 
    addTask:(title:string, status:TaskStatus) => void; // metodo para agregar una nueva tarea

}

const storeAPI: StateCreator<TaskState & Actions,[["zustand/immer", never]]> = (set,get)  => ({
//se utiliza un objeto para que a la hora de actualizar sea mucho mas facil y no se tenga que barrer todo el objeto
tasks:{
    
    'abc-1': {id: 'abc-1', title: 'Tarea 1', status: 'open' },
    'abc-2': {id: 'abc-2', title: 'Tarea 2', status: 'in-progress' },
    'abc-3': {id: 'abc-3', title: 'Tarea 3', status: 'open' },
    'abc-4': {id: 'abc-4', title: 'Tarea 4', status: 'open' }

},

getTaskByStatus:(status: TaskStatus) => {

    const tasks = get().tasks

//para barrer objetos
return Object.values(tasks).filter(task => task.status === status)

// const statusTask = Object.values(tasks)

// return statusTask.map(task => task.status).

    

},
addTask:(title:string , status:TaskStatus) =>{


const newTask = {id:uuidv4(),title,status}
//para evitar errores de tipado esto se puede encontrar en el cursor sobre el imer en el exporte de esta store
//["zustand/immer", never] va en el tipo del creator


set( state =>{

    state.tasks[newTask.id] = newTask

})




// //mutando con immer package
// set(produce( (state:TaskState) =>{

//     state.tasks[newTask.id] = newTask

// }


// ))




//fomra nativa de zustand
// set(state =>({
//     //se implementa npm uuid para id de tareas
//         tasks:{
    
//             //apunta a la nueva tarea
//             ...state.tasks,
//             [newTask.id]: newTask
//         }
    
//     }))
    


},
setDraggingTaskId:(taskId:string) => {

    set({draggindTaskId:taskId}) //igualando el task id al id obtenido

},

removeDraggingTaskId:() => { 

    return set({draggindTaskId:undefined}) //

},

changeTaskStatus:(taskId: string, status: TaskStatus)=>{

    const task = get().tasks[taskId]
    task.status = status;
    set( state => {

        state.tasks[taskId] = {
            ...state.tasks[taskId],status,

        }



    })


    // set((state) =>({
        
    //     tasks:{

    //         ...state.tasks,
    //         [taskId]: task

    //     }
        
    // }))

},

onTaskDrop:(status:TaskStatus)=>{

    const taskId = get().draggindTaskId

    if(!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId()
}

})


export const useTaskstore = create<TaskState&Actions>()(
    
    devtools(
    
    immer(storeAPI)
    
    )
    
    
    )