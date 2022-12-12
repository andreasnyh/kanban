import { useRef, useState } from "react";
import cn from "classnames";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const [cols, setCols] = useState(["Todo", "Doing", "Done"]);
  const [tasks, setTasks] = useState({
    Todo: [
      { id: 1, name: "To be done" },
      { id: 2, name: "To be done 2" },
    ],
    Doing: [
      { id: 3, name: "Doing" },
      { id: 4, name: "Doing 2" },
    ],
    Done: [
      { id: 5, name: "Done" },
      { id: 6, name: "Done 2" },
    ],
  });

  function move(source, destination, droppableSource, droppableDestination) {
    const sClone = [...source];
    const dClone = [...destination];
    const [removed] = sClone.splice(droppableSource.index, 1);
    dClone.splice(droppableDestination.index, 0, removed);
    setTasks({
      ...tasks,
      [droppableSource.droppableId]: sClone,
      [droppableDestination.droppableId]: dClone,
    });
    console.info(
      `%cRan move(): %cMoved "${removed?.name}" from column "${droppableSource.droppableId}" to "${droppableDestination.droppableId}"`,
      "color: green;",
      "color: yellow;"
    );
  }

  function reorder(listName, startIndex, endIndex) {
    const res = [...tasks[listName]];
    const [removed] = res.splice(startIndex, 1);
    res.splice(endIndex, 0, removed);
    setTasks({ ...tasks, [listName]: res });
    console.info(
      `%cRan reorder(): %cMoved "${removed?.name}" from position ${startIndex} to ${endIndex}`,
      "color: green;",
      "color: yellow;"
    );
  }

  function handleDragEnd({ source, destination }) {
    if (!destination) {
      console.error("Draggable dropped outside of Droppable");
      return;
    }

    const sIndex = source.droppableId;
    const dIndex = destination.droppableId;

    if (sIndex === dIndex) {
      reorder(sIndex, source.index, destination.index);
      return;
    }
    move(tasks[sIndex], tasks[dIndex], source, destination);
  }

  const mainRef = useRef(null);

  return (
    <div className="bg-white h-screen max-h-screen overflow-hidden p-8">
      <main
        ref={mainRef}
        className="min-h-full overflow-auto grid grid-flow-col auto-cols-[minmax(20vw,_1fr)] gap-4"
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          {cols &&
            cols.map((col, i) => (
              <Droppable key={i} droppableId={col} direction="vertical">
                {(provided, snapshot) => (
                  <div
                    key={i}
                    ref={provided.innerRef}
                    className={cn(
                      "flex p-2 h-full basis-auto flex-col bg-slate-300 gap-4 shadow-md",
                      {
                        "bg-green-200": snapshot.isDraggingOver,
                      }
                    )}
                    {...provided.droppableProps}
                  >
                    <h2 className="text-lg">{col}</h2>
                    {tasks &&
                      tasks[col]?.map(({ id, name }, index) => (
                        <Draggable
                          key={id}
                          index={index}
                          draggableId={id.toString()}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className={cn(
                                  "card bg-stone-200 p-2 !left-auto",
                                  {
                                    "bg-sky-200 drop-shadow-2xl":
                                      snapshot.isDragging,
                                  }
                                )}
                              >
                                {name}
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
        </DragDropContext>
      </main>
    </div>
  );
}
