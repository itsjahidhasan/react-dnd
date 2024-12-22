import { useState } from "react";

export const DragAndDrop = () => {
  const [containers, setContainers] = useState([
    {
      id: 25,
      name: "Parent 1",
      children: [
        { id: 1, name: "P1 C1" },
        { id: 2, name: "P1 C2" },
      ],
    },
    {
      id: 26,
      name: "Parent 2",
      children: [
        { id: 3, name: "P2 C1" },
        { id: 4, name: "P2 C2" },
      ],
    },
    {
      id: 27,
      name: "Parent 3",
      children: [],
    },
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [openContainers, setOpenContainers] = useState({}); // Tracks open containers

  const handleDragStart = (e, item, sourceId) => {
    setDraggedItem(item);
    setDragSource(sourceId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();

    if (dragSource !== null && targetId !== null) {
      setContainers((prev) => {
        const updatedContainers = [...prev];

        // Find source and target containers
        const sourceContainer = updatedContainers.find(
          (container) => container.id === dragSource
        );
        const targetContainer = updatedContainers.find(
          (container) => container.id === targetId
        );

        if (sourceContainer && targetContainer) {
          // Remove the item from the source container
          sourceContainer.children = sourceContainer.children.filter(
            (child) => child.id !== draggedItem.id
          );

          // Add the item to the target container
          targetContainer.children.push(draggedItem);
        }

        return updatedContainers;
      });

      setDraggedItem(null);
      setDragSource(null);
    }
  };

  const toggleContainer = (id) => {
    setOpenContainers((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the open state of the container
    }));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {containers.map((container) => (
        <div
          key={container.id}
          style={{
            marginBottom: "16px",
            border: "2px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* Accordion Header */}
          <div
            onClick={() => toggleContainer(container.id)}
            style={{
              padding: "12px",
              cursor: "pointer",
              backgroundColor: "#e0e0e0",
              fontWeight: "bold",
              borderBottom: openContainers[container.id]
                ? "2px solid #ccc"
                : "none",
            }}
          >
            {container.name}
          </div>

          {/* Accordion Content */}
          {openContainers[container.id] && (
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, container.id)}
              style={{
                padding: "16px",
                minHeight: "100px",
              }}
            >
              {container.children.length === 0 ? (
                <p style={{ color: "#aaa", textAlign: "center" }}>
                  Drop items here
                </p>
              ) : (
                container.children.map((child) => (
                  <div
                    key={child.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, child, container.id)}
                    style={{
                      padding: "8px",
                      margin: "4px",
                      backgroundColor: "#b3d9ff",
                      borderRadius: "4px",
                      textAlign: "center",
                      cursor: "grab",
                    }}
                  >
                    {child.name}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
