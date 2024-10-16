import * as p from "@clack/prompts";
import { execSync } from "node:child_process";
import * as fs from "node:fs/promises";
import process from "node:process";

export default async function InstallPhpDebian() {
  try {
    execSync("sudo apt update > /dev/null 2>&1");
    execSync(
      "sudo apt -y install apt-utils wget apt-transport-https lsb-release > /dev/null 2>&1"
    );
    execSync(
      "sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg > /dev/null 2>&1"
    );
    execSync(
      `echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list > /dev/null 2>&1`
    );
    execSync("sudo apt update > /dev/null 2>&1");
    execSync(
      "sudo apt-get -y install php7.4 php7.4-bcmath php7.4-bz2 php7.4-intl php7.4-gd php7.4-mbstring php7.4-mysql php7.4-zip > /dev/null 2>&1"
    );
    await modifyPhpIni();
    return;
  } catch (_error) {
    p.cancel("Failed to install PHP 7.4");
    process.exit(0);
  }
}

async function modifyPhpIni() {
  const filePath = "/etc/php/7.4/cli/php.ini";

  try {
    await fs.access(filePath);
    const fileContent = await fs.readFile(filePath, "utf8");
    const fileLines = fileContent.split("\n");

    if (fileLines[925].includes(";extension=mysqli")) {
      fileLines[925] = "extension=mysqli";
    } else {
      return;
    }

    const newFileContent = fileLines.join("\n");
    const tempFilePath = "/tmp/php.ini";
    await fs.writeFile(tempFilePath, newFileContent, "utf8");
    execSync(`sudo mv ${tempFilePath} ${filePath}`);
  } catch (_error) {
    p.cancel("Failed to install PHP 7.4");
    process.exit(0);
  }
}
