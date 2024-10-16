import { execSync } from "node:child_process";

export default async function InstallPhpArch() {
  try {
    execSync("sudo pacman -S firefox --noconfirm > /dev/null 2>&1");

    return;
  } catch (error) {
    return;
  }
}
