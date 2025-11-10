import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/utils/fileHelpers";
import path from "path";

const THEME_FILE_PATH = path.join(process.cwd(), "src", "data", "theme.json");

export async function GET() {
  try {
    const themeData = await readJsonFile(THEME_FILE_PATH);
    return NextResponse.json(themeData);
  } catch (error) {
    console.error("Error reading theme file:", error);
    return NextResponse.json({ error: "Failed to read theme data" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const themeData = await request.json();

    if (!themeData.primary) {
      return NextResponse.json({ error: "Missing primary color data" }, { status: 400 });
    }

    await writeJsonFile(THEME_FILE_PATH, themeData);

    return NextResponse.json({ success: true, themeData });
  } catch (error) {
    console.error("Error updating theme file:", error);
    return NextResponse.json({ error: "Failed to update theme data" }, { status: 500 });
  }
}
