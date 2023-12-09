import { DragEvent, useState } from "react";
import { Task, TaskStatus } from "../../interfaces";
import { SingleTask } from "./SingleTask";
import {
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import { useTaskstore } from "../../stores";
import classNames from "classnames";

interface Props {
  title: string;
  tasks: Task[];
  value: TaskStatus;
}

export const JiraTasks = ({ title, value, tasks }: Props) => {

  const isDragging = useTaskstore(state => !!state.draggindTaskId);
  const [onDraggOver, setOnDraggOver] = useState(false)
 
  

  const handleDraggOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("draggOver", value);
    setOnDraggOver(true); 
  };

  const handleDraggLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("draggleave");
    setOnDraggOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("grop", value);
    setOnDraggOver(false);
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

        <button>
          <IoEllipsisHorizontalOutline />
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
