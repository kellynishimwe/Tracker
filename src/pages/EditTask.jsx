import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = tasks.find((task) => task.id === parseInt(id));
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
    } else {
      navigate("/"); 
    }
  }, [id, navigate]);

  const saveTask = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map((task) =>
      task.id === parseInt(id) ? { ...task, name: taskName } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/"); 
  };

  return (
    <div className="h-[100vh] w-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-[2rem] font-bold text-gray-800 mt-[12vh] mb-6">
        Edit Task
      </h1>
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="w-full max-w-md h-[40px]  bg-transparent border border-gray-400 rounded-md mb-4 focus:outline focus:outline-gray-300 py-2 px-4"
        
      />
      <button
        onClick={saveTask}
        className="text-white w-[40vw] max-w-md cursor-pointer  bg-blue-700 hover:bg-blue-800  h-[40px] rounded-md py-2"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditTask;
