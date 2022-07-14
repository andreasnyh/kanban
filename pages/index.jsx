export default function Home() {
  const cols = ["Todo", "Doing", "Done"];
  const tasks = {
    Todo: [
      { name: "To be done", order: 0 },
      { name: "To be done 2", order: 1 },
    ],
    Doing: [
      { name: "Doing", order: 0 },
      { name: "Doing 2", order: 1 },
    ],
    Done: [
      { name: "Done", order: 0 },
      { name: "Done 2", order: 1 },
    ],
  };

  return (
    <div className="bg-white h-screen max-h-screen overflow-hidden p-8">
      <main className="min-h-full overflow-auto grid grid-flow-col auto-cols-[minmax(33.33vw,_1fr)] gap-4">
        {cols &&
          cols.map((col) => (
            <div className="flex p-2 h-full grow basis-auto flex-col bg-slate-300 gap-4 drop-shadow-md">
              <h2 className="text-lg">{col}</h2>
              {tasks &&
                tasks[col]?.map((task) => (
                  <div className="card bg-stone-200 p-2">{task.name}</div>
                ))}
            </div>
          ))}
      </main>
    </div>
  );
}
