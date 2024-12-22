import { useState } from "react";
import { DndContext, closestCenter, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableItem = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    margin: "4px",
    background: "#b3d9ff",
    borderRadius: "4px",
    textAlign: "center",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {id}
    </div>
  );
};

const DroppableContainer = ({ id, items, setItems, isTrash = false }) => {
  const { setNodeRef } = useDroppable({ id });

  const style = {
    background: isTrash ? "#ffcccc" : "#f0f0f0",
    padding: "16px",
    margin: "8px",
    border: "2px dashed #ccc",
    borderRadius: "8px",
    minHeight: "100px",
    textAlign: "center",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h4>{isTrash ? "Trash" : `Container ${id}`}</h4>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {items.map((item) => (
          <DraggableItem key={item} id={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export const MultipleContainers = ({ trashable = false }) => {
  const [containers, setContainers] = useState({
    container1: ["Item 1", "Item 2"],
    container2: ["Item 3", "Item 4"],
    trash: [],
  });

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const fromContainer = Object.keys(containers).find((key) =>
      containers[key].includes(active.id)
    );
    const toContainer = over.id;

    // Handle dropping into the trash
    if (trashable && toContainer === "trash") {
      setContainers((prev) => ({
        ...prev,
        [fromContainer]: prev[fromContainer].filter(
          (item) => item !== active.id
        ),
      }));
    } else if (fromContainer !== toContainer) {
      setContainers((prev) => ({
        ...prev,
        [fromContainer]: prev[fromContainer].filter(
          (item) => item !== active.id
        ),
        [toContainer]: [...prev[toContainer], active.id],
      }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "16px" }}>
        {Object.entries(containers).map(([id, items]) => (
          <DroppableContainer
            key={id}
            id={id}
            items={items}
            setItems={(newItems) =>
              setContainers((prev) => ({ ...prev, [id]: newItems }))
            }
            isTrash={id === "trash"}
          />
        ))}
      </div>
    </DndContext>
  );
};
