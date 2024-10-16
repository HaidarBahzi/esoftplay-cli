import * as p from "@clack/prompts";
import { execSync } from "node:child_process";
import process from "node:process";

export default async function InstallMasterDebian() {
  try {
    execSync("sudo apt -y install git curl > /dev/null 2>&1");

    execSync(
      "sudo chown -R $(whoami):$(id -g -n $(whoami)) /var/www/html > /dev/null 2>&1"
    );

    process.chdir("/var/www/html");

    execSync("git clone https://github.com/esoftplay/master > /dev/null 2>&1");

    execSync("sudo mkdir -p /opt > /dev/null 2>&1");

    execSync(
      "sudo chown -R $(whoami):$(id -g -n $(whoami)) /opt > /dev/null 2>&1"
    );

    process.chdir("/opt");

    execSync("git clone https://github.com/esoftplay/tools > /dev/null 2>&1");
  } catch (_error) {
    p.cancel("Failed to install FrameworkCore");
    process.exit(0);
  }
}
