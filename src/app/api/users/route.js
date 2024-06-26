import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

connectDb()

//Create new user
export async function POST(request){
    const { name, email, password, about, profileURL } = await request.json();
    console.log({ name, email, password, about, profileURL })
    const user = new User({
        name,
        email,
        password,
        about,
        profileURL,
    });
    try{
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT));
        const createdUser = await user.save();
        const response = NextResponse.json(user, {
            status: 201,
        });
        return response;
    }catch(error){
        console.log(error);
        NextResponse.json({
            message: "failed to create user",
            status: false,
        },{
            status: 500,
        });
    }
}

//Get all user
export async function GET(request){
    let users = [];
    try{
        users = await User.find().select("-password");
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message: "failed to get users",
            success: false,
        });
    }

    return NextResponse.json(users);
}