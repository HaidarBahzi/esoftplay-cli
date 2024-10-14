import InstallPhpDebian from "./php";
import InstallMysqlDebian from "./mysql";
import InstallMasterDebian from "./master";

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import { execSync } from "child_process";

import CheckPhpDebian from "../../check/debian/php";
import CheckMysqlDebian from "../../check/debian/mysql";
import CheckMasterDebian from "../../check/debian/master";

export default async function InstallAllDebian() {
  const s = p.spinner();

  try {
    execSync("sudo apt -h > /dev/null 2>&1");
  } catch (error) {
    process.exit(0);
  }

  s.start("Checking required framework dependencies.");

  const checks = [
    { name: "PHP 7.4", check: CheckPhpDebian, install: InstallPhpDebian },
    { name: "MySQL 5.7", check: CheckMysqlDebian, install: InstallMysqlDebian },
    {
      name: "FrameworkCore",
      check: CheckMasterDebian,
      install: InstallMasterDebian,
    },
  ];

  const missingDependencies = [];

  for (const { name, check } of checks) {
    await setTimeout(2000);
    const result = await check();

    if (!result?.isInstalled) {
      missingDependencies.push(name);
    }
  }

  await setTimeout(2500);

  if (missingDependencies.length > 0) {
    s.message(
      `Missing Dependencies Detected: ${missingDependencies.join(", ")}`
    );

    for (const { name, install } of checks) {
      if (missingDependencies.includes(name)) {
        s.message(`Installing ${name}`);
        await setTimeout(2500);
        try {
          await install();
          s.message(`${name} installed successfully.`);
        } catch (installError) {
          console.error(`Failed to install ${name}`);
        }
        await setTimeout(2500);
      }
    }
    s.stop("All missing dependencies have been processed.");
  } else {
    s.stop("All required framework dependencies are already installed.");
  }
}
