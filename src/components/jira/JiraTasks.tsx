import { DragEvent, useState } from "react";
import { Task, TaskStatus } from "../../interfaces";
import { SingleTask } from "./SingleTask";
import {
  IoAddOutline,
  IoCheckmarkCircleOutline,
  
} from "react-icons/io5";
import { useTaskstore } from "../../stores";
import classNames from "classnames";
import Swal from "sweetalert2";



interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, status, tasks }: Props) => {

  const isDragging = useTaskstore(state => !!state.draggindTaskId);
  const onTaskDrop = useTaskstore(state => state.onTaskDrop); //funcion para cambiar el estado de la tarea que se esta moviendo
  const addTask = useTaskstore(state =>state.addTask); //funcion para anadir una nueva tarea



  const [onDraggOver, setOnDraggOver] = useState(false)
 
const handleAddTask = async() =>{

  const {isConfirmed, value} = await Swal.fire({
    title: 'Add Task',
    input: 'text',
    inputLabel:'',
    inputPlaceholder: 'Add Task',
    showCancelButton: true,
    inputValidator:(value:string)=>{

      if(!value){

        return "ingrese una tarea"
      }


    }

    
 


  })

  if(!isConfirmed) return
  addTask(value,status);

  // addTask("Titulo nuevo", value )
}
  

  const handleDraggOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("draggOver", status);
    setOnDraggOver(true); 
  };

  const handleDraggLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("draggleave");
    setOnDraggOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("grop", status);
    setOnDraggOver(false);
    onTaskDrop( status);
  };
  return (
    <div
      //cuando se desprende de un div
      onDragOver={handleDraggOver}
      onDragLeave={handleDraggLeave} // solo cuando se suelta
      onDrop={handleDrop} //solo cuando se deja caer en otro div
      className={
        classNames("!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",{
          'border-blue-500 ': isDragging,
          'border-green-500 ': isDragging && onDraggOver
        }) 
      }
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button title="Add" onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
