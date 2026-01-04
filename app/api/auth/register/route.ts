import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/database/mongoose"
import mongoose from "mongoose"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      fullName, 
      email, 
      password, 
      country, 
      investmentGoals, 
      riskTolerance, 
      preferredIndustry 
    } = body

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const usersCollection = mongoose.connection.db.collection("users")

    const existingUser = await usersCollection.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await usersCollection.insertOne({
      name: fullName,
      email,
      hashedPassword,
      country,
      investmentGoals,
      riskTolerance,
      preferredIndustry,
      createdAt: new Date(),
    })

    return NextResponse.json(
      { 
        message: "User created successfully",
        userId: result.insertedId.toString()
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}