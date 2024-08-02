"use client";
import React, { useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
  console.log("this is add task component");

  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userid: "",
  });

  const handleAddTask = async (event) => {
    event.preventDefault();
    console.log(task);
    // validate task data
    try {
      const result = await addTask(task);
      toast.success("Your task is added !!", {
        position: "top-center",
      });

      setTask({
        title: "",
        content: "",
        status: "none",
      });
    } catch (error) {
      console.log(error);
      toast.error("Task not added !!" + error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const ClearTask = () => {
    setTask({
      title: "",
      content: "",
      status: "none",
    });
  };

  return (
    <div className="flex justify-center p-5">
      <div className="w-full max-w-lg p-5 shadow-sm rounded-md">
        <div className="my-8 flex justify-center">
          <Image
            src={loginSvg}
            width={200}
            height={200}
            alt="Login banner"
          />
        </div>
        <h1 className="text-3xl text-center">Add your task here</h1>

        <form onSubmit={handleAddTask}>
          {/* Task Title */}
          <div className="mt-4">
            <label htmlFor="task_title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800"
              id="task_title"
              name="task_title"
              onChange={(event) => {
                setTask({
                  ...task,
                  title: event.target.value,
                });
              }}
              value={task.title}
            />
          </div>
          {/* Task Content */}
          <div className="mt-4">
            <label htmlFor="task_content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              className="w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800"
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(event) => {
                setTask({
                  ...task,
                  content: event.target.value,
                });
              }}
              value={task.content}
            />
          </div>

          {/* Task Status */}
          <div className="mt-4">
            <label htmlFor="task_status" className="block text-sm font-medium mb-2">
              Status
            </label>
            <select
              id="task_status"
              className="w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800"
              name="task_status"
              onChange={(event) => {
                setTask({
                  ...task,
                  status: event.target.value,
                });
              }}
              value={task.status}
            >
              <option value="none" disabled>
                ---Select Status---
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Button Actions */}
          <div className="mt-4 flex justify-center space-x-3">
            <button className="bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-800 text-white">
              Add Task
            </button>
            <button
              onClick={ClearTask}
              type="button"
              className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-800 text-white"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
