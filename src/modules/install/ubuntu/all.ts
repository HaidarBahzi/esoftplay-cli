import InstallPhpUbuntu from "./php.ts";
import InstallMysqlUbuntu from "./mysql.ts";
import InstallMasterUbuntu from "./master.ts";

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import { execSync } from "node:child_process";

import CheckPhpUbuntu from "../../check/debian/php.ts";
import CheckMysqlUbuntu from "../../check/debian/mysql.ts";
import CheckMasterUbuntu from "../../check/debian/master.ts";
import process from "node:process";

export default async function InstallAllUbuntu() {
  const s = p.spinner();

  try {
    execSync("sudo apt -h > /dev/null 2>&1");
  } catch (_error) {
    process.exit(0);
  }

  s.start("Checking required framework dependencies.");

  const checks = [
    { name: "PHP 7.4", check: CheckPhpUbuntu, install: InstallPhpUbuntu },
    { name: "MySQL 5.7", check: CheckMysqlUbuntu, install: InstallMysqlUbuntu },
    {
      name: "FrameworkCore",
      check: CheckMasterUbuntu,
      install: InstallMasterUbuntu,
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
        } catch (_error) {
          console.error(`Failed to install ${name}`);
        }
        await setTimeout(2500);
      }
    }
    s.stop("All missing dependencies have been installed.");
  } else {
    s.stop("All required framework dependencies are already installed.");
  }
}
