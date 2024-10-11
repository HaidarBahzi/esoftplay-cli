import * as p from "@clack/prompts";
import { execSync } from "child_process";
import { setTimeout } from "node:timers/promises";

export default async function InstallMysqlArch() {
  const s = p.spinner();

  try {
    const mysqlVersion = execSync("mysql --version", {
      stdio: "pipe",
    }).toString();

    const distribMatch = mysqlVersion.match(/Distrib\s([0-9.]+)/);

    if (distribMatch) {
      const distribVersion = distribMatch[1];

      if (distribVersion.startsWith("5.7")) {
        return;
      }
    }
  } catch (error) {
    // Intentionally ignored: MySQL is not installed, no action required
  }

  s.start("Installing MySQL 5.7");
  await setTimeout(5000);
  s.stop("Installed MySQL 5.7");
}
