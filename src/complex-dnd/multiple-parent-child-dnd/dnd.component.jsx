import { closestCorners, DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { Column } from "./components";
import { arrayMove } from "@dnd-kit/sortable";

export const DnD = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Paper",
      children: [
        { id: 5, title: "CMog" },
        { id: 6, title: "CPencil" },
      ],
    },
    {
      id: 2,
      title: "Mog",
      children: [
        { id: 7, title: "CMog" },
        { id: 8, title: "CPencil" },
      ],
    },
    {
      id: 3,
      title: "Pencil",
      children: [],
    },
    {
      id: 4,
      title: "Pan",
      children: [
        { id: 11, title: "CMog" },
        { id: 12, title: "CPencil" },
      ],
    },
  ]);

  const getTaskPos = (id, children = []) => {
    let pos = -1;
    if (children?.length) {
      children.map((t) => {
        if (t.id == id) {
          pos = id;
        } else {
          if (t?.children?.length) getTaskPos(id, t?.children);
        }
      });
    } else {
      tasks.map((t) => {
        if (t.id == id) {
          pos = id;
        } else {
          if (t?.children?.length) getTaskPos(id, t?.children);
        }
      });
    }

    return pos;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log({ active, over });

    if (active.id === over.id) {
      return;
    }
    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      console.log({ originalPos, newPos });

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="parent-child-dnd">
      <h1>React DnD</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
};
