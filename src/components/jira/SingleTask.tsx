import { IoReorderTwoOutline } from "react-icons/io5"
import { Task } from "../../interfaces"
import { useTaskstore } from "../../stores"


interface Props {

    task: Task

}

export const SingleTask = ({task}:Props) => {

  const TaskIdDragg = useTaskstore(state => state.setDraggingTaskId)
  const removeDraggingTask = useTaskstore(state => state.removeDraggingTaskId)
  return (
    <div
    draggable ="true"
    onDragStart={() => TaskIdDragg(task.id)}
    //se puede mandar a llamar como esta arriba el de task o solo la referencia porque no se le pasa ningun parametro
    onDragEnd={removeDraggingTask}
    className="mt-5 flex items-center justify-between p-2">
    <div className="flex items-center justify-center gap-2">
      <p className="text-base font-bold text-navy-700">
        {task.title}
      </p>
    </div>
    <span className=" h-6 w-6 text-navy-700 cursor-pointer">
      <IoReorderTwoOutline />
    </span>
  </div>
  )
}
