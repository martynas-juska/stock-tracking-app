import { NextResponse } from "next/server"
import { connectToDatabase } from "@/database/mongoose"
import mongoose from "mongoose"
import { auth } from "@/lib/auth"

// GET - Fetch user's watchlist
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await connectToDatabase()

    const watchlistCollection = mongoose.connection.db.collection("watchlist")
    
    const watchlist = await watchlistCollection
      .find({ userId: session.user.id })
      .sort({ addedAt: -1 })
      .toArray()

    return NextResponse.json(watchlist, { status: 200 })

  } catch (error) {
    console.error("Watchlist GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch watchlist" },
      { status: 500 }
    )
  }
}

// POST - Add stock to watchlist
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { symbol, company } = await request.json()

    if (!symbol || !company) {
      return NextResponse.json(
        { error: "Symbol and company are required" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const watchlistCollection = mongoose.connection.db.collection("watchlist")

    // Check if already exists
    const existing = await watchlistCollection.findOne({
      userId: session.user.id,
      symbol: symbol.toUpperCase()
    })

    if (existing) {
      return NextResponse.json(
        { error: "Stock already in watchlist" },
        { status: 400 }
      )
    }

    const result = await watchlistCollection.insertOne({
      userId: session.user.id,
      symbol: symbol.toUpperCase(),
      company,
      addedAt: new Date()
    })

    return NextResponse.json(
      { 
        message: "Stock added to watchlist",
        id: result.insertedId.toString()
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Watchlist POST error:", error)
    return NextResponse.json(
      { error: "Failed to add to watchlist" },
      { status: 500 }
    )
  }
}

// DELETE - Remove stock from watchlist
export async function DELETE(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { symbol } = await request.json()

    if (!symbol) {
      return NextResponse.json(
        { error: "Symbol is required" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const watchlistCollection = mongoose.connection.db.collection("watchlist")

    const result = await watchlistCollection.deleteOne({
      userId: session.user.id,
      symbol: symbol.toUpperCase()
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Stock not found in watchlist" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Stock removed from watchlist" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Watchlist DELETE error:", error)
    return NextResponse.json(
      { error: "Failed to remove from watchlist" },
      { status: 500 }
    )
  }
}