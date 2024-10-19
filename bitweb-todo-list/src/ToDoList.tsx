import React, { useState } from "react";

interface Task {
  task: string;
  completed: boolean;
}

function ToDoList() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  // Adding and deleting tasks:
  const [newTask, setNewTask] = useState("");

  function handleAddTask() {
    if (newTask.trim()) {
      setTaskList([{ task: newTask, completed: false }, ...taskList]);
      setNewTask("");
    }
  }

  function handleDeleteTask(index: number) {
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
  }

  // Handling task completion:

  function handleTaskCompletion(index: number) {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setTaskList(
      updatedTaskList.sort((a, b) => Number(a.completed) - Number(b.completed))
    ); // sorting tasks so that incomplete ones are at the top
  }

  // Dragging functions:
  const [draggedTaskIndex, setDraggedTaskIndex] = useState<number | null>(null);

  function handleOnDrag(e: React.DragEvent, index: number) {
    setDraggedTaskIndex(index);
  }

  function handleOnDrop(e: React.DragEvent, dropIndex: number) {
    e.preventDefault();
    if (draggedTaskIndex === null || draggedTaskIndex === dropIndex) return; // prevent unnecessary swaps
    const updatedTaskList = [...taskList];
    const temp = updatedTaskList[draggedTaskIndex];
    updatedTaskList[draggedTaskIndex] = updatedTaskList[dropIndex]; // create temp const to swap tasks using their indexes
    updatedTaskList[dropIndex] = temp;

    setTaskList(updatedTaskList);
    setDraggedTaskIndex(null);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <>
      <div className="todo-list-container">
        <div className="input-container">
          <input
            className="todo-list-input"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <ul className="todo-list">
          {taskList.map((task, index) => (
            <span key={index} className="buttons-task-container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletion(index)}
                aria-label="Mark as completed"
              />
              <li
                draggable
                onDragStart={(e) => handleOnDrag(e, index)}
                onDrop={(e) => handleOnDrop(e, index)}
                onDragOver={handleDragOver}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.6 : 1,
                }}
                title={task.task}
              >
                <span>{task.task}</span>
              </li>
              <button
                onClick={() => handleDeleteTask(index)}
                aria-label="Delete"
              >
                X
              </button>
            </span>
          ))}
        </ul>
      </div>
    </>
  );
}
export default ToDoList;
