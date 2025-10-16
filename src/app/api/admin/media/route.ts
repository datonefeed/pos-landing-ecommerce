import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/utils/fileHelpers";
import path from "path";

const MEDIA_FILE_PATH = path.join(process.cwd(), "src", "data", "media.json");

export async function GET() {
  try {
    const mediaData = await readJsonFile(MEDIA_FILE_PATH);
    return NextResponse.json(mediaData);
  } catch (error) {
    console.error("Error reading media file:", error);
    return NextResponse.json({ error: "Failed to read media data" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { section, field, url } = await request.json();

    if (!section || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const mediaData = await readJsonFile(MEDIA_FILE_PATH);

    // Update the media data
    if (field) {
      // For nested fields like FeaturesSection.1
      if (!mediaData[section]) {
        mediaData[section] = {};
      }
      mediaData[section][field] = url;
    } else {
      // For direct fields like logo
      mediaData[section] = url;
    }

    await writeJsonFile(MEDIA_FILE_PATH, mediaData);

    return NextResponse.json({ success: true, mediaData });
  } catch (error) {
    console.error("Error updating media file:", error);
    return NextResponse.json({ error: "Failed to update media data" }, { status: 500 });
  }
}
