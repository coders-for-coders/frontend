import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// GET all blogs
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const blogs = await db.collection("blogs").find({}).sort({ date: -1 }).toArray();
    const cleaned = blogs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
    return NextResponse.json(cleaned);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST new blog
export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();
    const result = await db.collection("blogs").insertOne(body);
    return NextResponse.json({ id: result.insertedId.toString(), ...body });
  } catch (error) {
    return NextResponse.json({ error: "Failed to publish blog" }, { status: 500 });
  }
}
