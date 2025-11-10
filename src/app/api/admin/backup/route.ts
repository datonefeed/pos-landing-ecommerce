import { NextRequest } from "next/server";
import { VI_FILE_PATH, EN_FILE_PATH } from "@/config/paths";
import { HttpStatus } from "@/config/httpStatus";
import { ErrorMessage } from "@/config/errorMessage";
import { jsonResponse } from "@/config/response";
import { readJsonFile, writeJsonFile } from "@/utils/fileHelpers";

export async function GET() {
  try {
    const [viData, enData] = await Promise.all([
      readJsonFile(VI_FILE_PATH),
      readJsonFile(EN_FILE_PATH),
    ]);
    
    const timestamp = new Date().toISOString();
    const backup = {
      timestamp,
      data: { vi: viData, en: enData },
    };
    
    return new Response(JSON.stringify(backup, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="content-backup-${timestamp.split('T')[0]}.json"`,
      },
    });
  } catch (error) {
    console.error("Error creating backup:", error);
    return jsonResponse(
      { error: ErrorMessage.FILE_READ_ERROR, errorCode: "BACKUP_ERROR" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const backup = await request.json();
    
    if (!backup.data || !backup.data.vi || !backup.data.en) {
      return jsonResponse(
        { error: "Invalid backup format", errorCode: "INVALID_BACKUP" },
        HttpStatus.BAD_REQUEST
      );
    }
    
    await Promise.all([
      writeJsonFile(VI_FILE_PATH, backup.data.vi),
      writeJsonFile(EN_FILE_PATH, backup.data.en),
    ]);
    
    return jsonResponse({ success: true, message: "Backup restored successfully" });
  } catch (error) {
    console.error("Error restoring backup:", error);
    return jsonResponse(
      { error: ErrorMessage.FILE_WRITE_ERROR, errorCode: "RESTORE_ERROR" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}