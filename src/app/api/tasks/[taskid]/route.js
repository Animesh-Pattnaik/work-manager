import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

connectDb();

export async function GET(request, { params }) {
  const { taskid } = params;
  console.log(taskid);
  const task = await Task.findById(taskid);
  console.log(task);
  return NextResponse.json(task);
}

export async function DELETE(request, { params }) {
  const { taskid } = params;
  console.log(taskid);
  try {
    await Task.deleteOne({
      _id: taskid,
    });
    return NextResponse.json({
      message: "task deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "task not deleted",
      success: false,
    });
  }
}

export async function PUT(request, {params}){
  const { taskid } = params;
  console.log(taskid);
  const { title, content, addedDate, status} = await request.json();
  console.log({ title, content, addedDate, status});
  try {
    const task = await Task.findById(taskid);
    task.title = title;
    task.content = content;
    task.addedDate = addedDate;
    task.status = status;
    task.save();
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "task not updated",
      success: false,
    });
  }
}