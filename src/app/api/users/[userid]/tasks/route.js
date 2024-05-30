import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    const {userid} = params;
    try {
        const tasks = await Task.find({
            userid: userid
        });
        return NextResponse.json(tasks);
    } catch (error) {
        console.log(error);
        return NextResponse({
            message: "failed to get tasks",
            success: false,
          });
    }
}