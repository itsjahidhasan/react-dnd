import React, { useState } from "react";
import { SimpleTreeItemWrapper, SortableTree } from "dnd-kit-sortable-tree";

export const MutatedSortableTree = () => {
  const [items, setItems] = useState(initialViableMinimalData);

  const handleItems = (params) => {
    console.log({ params });
    setItems(params);
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div
        style={{
          width: "500px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "auto",
          maxHeight: "300px",
          margin: "10px",
        }}
      >
        <SortableTree
          items={items}
          onItemsChanged={handleItems}
          TreeItemComponent={TreeItem}
        />
      </div>
    </div>
  );
};

const TreeItem = React.forwardRef((props, ref) => {
  //   console.log({ props });

  return (
    <SimpleTreeItemWrapper {...props} ref={ref}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>{props.item.value}</div>
        {props.item?.isActive || props?.item?.parent?.isActive ? (
          <div>disabled</div>
        ) : (
          ""
        )}
      </div>
    </SimpleTreeItemWrapper>
  );
});
/*
 * Configure the tree data.
 */
const initialViableMinimalData = [
  {
    id: 1,
    value: "Jane",
    isActive: true,
    children: [
      {
        id: 4,
        value: "John",
      },
      {
        id: 5,
        value: "Sally",
      },
    ],
  },
  {
    id: 2,
    value: "Fred",
    children: [
      {
        id: 6,
        value: "Eugene",
      },
    ],
  },
  {
    id: 3,
    value: "Helen",
  },
];
