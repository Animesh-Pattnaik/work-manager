"use client";
import UserContext from "@/context/userContext";
import { deleteTask, getTasksOfUser } from "@/services/taskService";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "./Tasks";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);

  async function loadTasks(userId) {
    try {
      const tasks = await getTasksOfUser(userId);
      setTasks([...tasks].reverse());
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  async function deleteTaskParent(taskId) {
    try {
      const result = await deleteTask(taskId);
      console.log(result);
      const newTasks = tasks.filter((item) => item._id !== taskId);
      setTasks(newTasks);
      toast.success("Your task is deleted ");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting task !!");
    }
  }

  return (
    <div className="flex flex-col items-center mt-3 px-4 sm:px-0">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl mb-3 text-center">Your tasks ({tasks.length})</h1>
        {tasks.map((task) => (
          <Task
            task={task}
            key={task._id}
            deleteTaskParent={deleteTaskParent}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowTasks;
