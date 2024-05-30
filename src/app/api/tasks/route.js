import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDb();

//Create new task
export async function POST(request) {
  const { title, content, userid, status } = await request.json();

  //fetching logged in user id
  const authToken = request.cookies.get("authToken")?.value;
  const data = jwt.verify(authToken, process.env.JWT_KEY);
  console.log(data);

  console.log({ title, content, userid });
  try {
    const task = new Task({
      title,
      content,
      userid: data._id,
      status,
    });
    const createdTask = await task.save();
    const response = NextResponse.json(createdTask, {
      status: 201,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "failed to create task",
        status: false,
      },
      {
        status: 500,
      }
    );
  }
}

//Get all tasks
export async function GET(request) {
  let tasks = [];
  try {
    tasks = await Task.find();
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to get tasks",
      success: false,
    });
  }

  return NextResponse.json(tasks);
}
