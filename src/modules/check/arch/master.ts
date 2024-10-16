import { existsSync } from "node:fs";
import { join } from "node:path";

export default async function CheckMasterArch() {
  const folderPath = join("/var/www/html/master");

  if (existsSync(folderPath)) {
    return { isInstalled: true, dependenciesdependencies: "FrameworkCore" };
  }

  return { isInstalled: false, dependenciesdependencies: "FrameworkCore" };
}
