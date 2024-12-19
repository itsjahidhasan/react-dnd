import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./column.css";
import { Task } from "../task/task.component";
export const Column = ({ tasks }) => {
  const handleTasks = (task) => {
    if (task?.children?.length) {
      return (
        <>
          <Task id={task?.id} title={task?.title} key={task.id} />
          <div className="column">
            <SortableContext
              items={task?.children}
              strategy={verticalListSortingStrategy}
            >
              {task?.children?.map((child) => (
                <Task id={child?.id} title={child?.title} key={child.id} />
              ))}
            </SortableContext>
          </div>
        </>
      );
    }
    return <Task id={task?.id} title={task?.title} key={task.id} />;
  };
  return (
    <div className="column">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => {
          // return <Task id={task?.id} title={task?.title} key={task.id} />;
          return handleTasks(task);
        })}
      </SortableContext>
    </div>
  );
};
