import { StateCreator, create } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

interface TaskState {
  draggindTaskId?: string; // propiedad task id
    tasks: Record<string, Task> //record es el que maneja el id del task
    
}

interface Actions{

    getTaskByStatus:(status: TaskStatus) => Task[];// metodo para obtener todas las tasks
    setDraggingTaskId:(taskId: string) => void; //metodo para obtener la tarea que se esta arrastrando
    removeDraggingTaskId:() => void; // metodo para volver a undefine el state

}

const storeAPI: StateCreator<TaskState & Actions> = (set,get)  => ({
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

setDraggingTaskId:(taskId:string) => {

    set({draggindTaskId:taskId}) //igualando el task id al id obtenido

},

removeDraggingTaskId:() => { 

    return set({draggindTaskId:undefined}) //

}

})


export const useTaskstore = create<TaskState&Actions>()(
    
    devtools(
    storeAPI
    
    )
    
    
    )