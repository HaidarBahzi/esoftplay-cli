import * as p from "@clack/prompts";
import { existsSync } from "fs";
import { setTimeout } from "node:timers/promises";
import { join } from "path";

export default async function InstallMasterUbuntu() {
  const s = p.spinner();

  const folderPath = join("/var/www/html/master");

  if (existsSync(folderPath)) {
    return;
  }

  s.start("Installing Esoftplay Framework");
  await setTimeout(5000);
  s.stop("Installed Esoftplay Framework");
}
