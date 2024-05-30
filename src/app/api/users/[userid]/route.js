import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userid } = params;
  const user = await User.findById(userid);
  return NextResponse.json(user);
}

export async function DELETE(request, { params }) {
  const { userid } = params;
  console.log(userid);
  try {
    await User.deleteOne({
      _id: userid,
    });
    return NextResponse.json({
      message: "user deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "user not deleted",
      success: false,
    });
  }
}

export async function PUT(request, {params}){
  const { userid } = params;
  console.log(userid);
  const { name, password, about, profileURL } = await request.json();
  console.log({ name, password, about, profileURL });
  try {
    const user = await User.findById(userid);
    user.name = name;
    user.password = password;
    user.about = about;
    user.profileURL = profileURL;
    user.save();
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "user not updated",
      success: false,
    });
  }
}