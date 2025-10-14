import { promises as fs } from "fs";

export async function readJsonFile(filePath: string) {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

export async function writeJsonFile(filePath: string, data: unknown) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
