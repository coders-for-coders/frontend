import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all members
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const members = await db.collection("members").find({}).toArray();
    // Convert _id to id for frontend compatibility
    const cleaned = members.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
    return NextResponse.json(cleaned);
  } catch (error) {
    console.error("DB Fetch Error (Members):", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

// POST new member
export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();
    const result = await db.collection("members").insertOne(body);
    return NextResponse.json({ id: result.insertedId.toString(), ...body });
  } catch (error) {
    console.error("DB Insert Error (Members):", error);
    return NextResponse.json({ error: "Failed to add member" }, { status: 500 });
  }
}
