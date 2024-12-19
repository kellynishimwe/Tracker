import { Box, Edit, Plus, Trash2 } from "lucide-react";
import moment from "moment";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const navigate = useNavigate();
  const createdDate = moment().format("Do MMM YYYY");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = { id: tasks.length + 1, name: taskInput, createdDate: createdDate };
      setTasks([newTask, ...tasks]);
      setTaskInput("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const editTask = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <div className="min-h-screen m-0 pt-10 px-4  w-full flex flex-col items-center justify-start bg-[#e5e7eb]">
      <h1 className="text-4xl font-bold text-gray-800 mt-[8vh] mb-6">
        Task Tracker
      </h1>
      <div className="w-[90%] max-w-[600px] flex gap-4 mb-4">
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-[38vw] h-[40px] p-4 border-[1px] bg-gray-100 border-gray-400 rounded-md focus:outline focus:outline-gray-300 focus:outline-offset-2"
          placeholder="Write a task"
        />
        <button
          onClick={addTask}
          className="text-white bg-blue-700 hover:bg-blue-800 w-[15%] h-[40px] flex items-center justify-center rounded-[8px]"
        >
          <Plus size={20} className="mr-2" />
          Add
        </button>
      </div>

      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center text-gray-700 mt-10">
          <Box size={50} />
          <p>No tasks yet!</p>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4 w-[45vw]">
        {tasks.map(({ id, name, createdDate }) => (
          <div
            key={id}
            className="w-full h-[10vh] p-[20px] bg-white flex items-center text-[.8rem] justify-between rounded-[8px] border-solid border-[2px] border-gray-200"
          >
            <div>
              <p className="font-medium">{name}</p>
              <small className="text-gray-600">Created at: {createdDate}</small>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editTask(id)}>
                <Edit size={20} color="blue" />
              </button>
              <button onClick={() => deleteTask(id)}>
                <Trash2 size={20} color="red" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
