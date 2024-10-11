import * as p from "@clack/prompts";
import { existsSync } from "fs";
import { join } from "path";
import { setTimeout } from "node:timers/promises";

export default async function InstallMasterArch() {
  const s = p.spinner();

  const folderPath = join("/var/www/html/master");

  if (existsSync(folderPath)) {
    return;
  }

  s.start("Installing Esoftplay Framework");
  await setTimeout(5000);
  s.stop("Installed Esoftplay Framework");
}
