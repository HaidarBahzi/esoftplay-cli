import * as p from "@clack/prompts";
import { execSync } from "child_process";

export default async function InstallPhpDebian() {
  try {
    execSync("sudo apt update > /dev/null 2>&1");

    execSync(
      "sudo apt -y install wget apt-transport-https lsb-release > /dev/null 2>&1"
    );

    execSync(
      "sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg > /dev/null 2>&1"
    );

    execSync(
      `echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list > /dev/null 2>&1`
    );

    execSync("sudo apt update > /dev/null 2>&1");

    execSync(
      "sudo apt-get -y install php7.4 php7.4-bcmath php7.4-bz2 php7.4-intl php7.4-gd php7.4-mbstring php7.4-mysql php7.4-zip"
    );

    return;
  } catch (error) {
    console.log(error);

    p.cancel("Failed to install PHP 7.4");
    process.exit(0);
  }
}
