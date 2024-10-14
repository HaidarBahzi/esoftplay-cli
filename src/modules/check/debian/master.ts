import { existsSync } from "fs";
import { join } from "path";

export default async function CheckMasterDebian() {
  const folderPath = join("/var/www/html/master");

  if (existsSync(folderPath)) {
    return { isInstalled: true, dependenciesdependencies: "FrameworkCore" };
  }

  return { isInstalled: false, dependenciesdependencies: "FrameworkCore" };
}
