import * as p from "@clack/prompts";
import { execSync } from "child_process";

export default async function InstallMasterDebian() {
  try {
    execSync("sudo apt -y install git curl > /dev/null 2>&1");

    execSync(
      "sudo chown -R $(whoami):$(id -g -n $(whoami)) /var/www/html > /dev/null 2>&1"
    );

    execSync("cd /var/www/html > /dev/null 2>&1");

    execSync("git clone https://github.com/esoftplay/master > /dev/null 2>&1");

    execSync("sudo mkdir -p /opt > /dev/null 2>&1");

    execSync(
      "sudo chown -R $(whoami):$(id -g -n $(whoami)) /opt > /dev/null 2>&1"
    );

    execSync("cd /opt > /dev/null 2>&1");

    execSync("git clone https://github.com/esoftplay/tools > /dev/null 2>&1");
  } catch (error) {
    p.cancel("Failed to install MySQL 5.7");
    process.exit(0);
  }
}
