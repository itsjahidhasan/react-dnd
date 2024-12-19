import { useSortable } from "@dnd-kit/sortable";
import "./task.css";
import { CSS } from "@dnd-kit/utilities";
export const Task = ({ id, title, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="task"
    >
      {title}
    </div>
  );
};
