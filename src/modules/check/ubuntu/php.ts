import { execSync } from "node:child_process";

export default async function CheckPhpUbuntu() {
  try {
    const phpVersion = execSync("php -v", {
      stdio: "pipe",
    }).toString();

    if (phpVersion.includes("7.4")) {
      return { isInstalled: true, dependencies: "PHP" };
    }
  } catch (error) {
    return { isInstalled: false, dependencies: "PHP" };
  }
}
