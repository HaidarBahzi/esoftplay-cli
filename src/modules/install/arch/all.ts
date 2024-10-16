import InstallPhpArch from "./php.ts";
import InstallMysqlArch from "./mysql.ts";
import InstallMasterArch from "./master.ts";

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import { execSync } from "node:child_process";

import CheckPhpArch from "../../check/arch/php.ts";
import CheckMysqlArch from "../../check/arch/mysql.ts";
import CheckMasterArch from "../../check/arch/master.ts";
import process from "node:process";

export default async function InstallAllArch() {
  const s = p.spinner();

  try {
    execSync("sudo pacman -h > /dev/null 2>&1");
  } catch (error) {
    process.exit(0);
  }

  s.start("Checking required framework dependencies.");

  const checks = [
    { name: "PHP 7.4", check: CheckPhpArch, install: InstallPhpArch },
    { name: "MySQL 5.7", check: CheckMysqlArch, install: InstallMysqlArch },
    {
      name: "FrameworkCore",
      check: CheckMasterArch,
      install: InstallMasterArch,
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
