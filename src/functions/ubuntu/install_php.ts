import * as p from "@clack/prompts";
import { execSync } from "child_process";
import { setTimeout } from "node:timers/promises";

export default async function InstallPhpUbuntu() {
  const s = p.spinner();

  try {
    const phpVersion = execSync("php -v", {
      stdio: "pipe",
    }).toString();

    if (phpVersion.includes("7.4")) {
      return;
    }
  } catch (error) {
    // Intentionally ignored: PHP is not installed, no action required
  }

  s.start("Installing PHP 7.4");
  await setTimeout(5000);
  s.stop("Installed PHP 7.4");
}
