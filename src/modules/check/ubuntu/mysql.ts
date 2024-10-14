import { execSync } from "child_process";

export default async function CheckMysqlUbuntu() {
  try {
    const mysqlVersion = execSync("mysql --version", {
      stdio: "pipe",
    }).toString();

    const distribMatch = mysqlVersion.match(/Distrib\s([0-9.]+)/);

    if (distribMatch) {
      const distribVersion = distribMatch[1];

      if (distribVersion.startsWith("5.7")) {
        return { isInstalled: true, dependencies: "MySQL" };
      }
    }
  } catch (error) {
    return { isInstalled: false, dependencies: "MySQL" };
  }

  return { isInstalled: false, dependencies: "MySQL" };
}
