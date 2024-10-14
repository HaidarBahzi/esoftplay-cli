import * as p from "@clack/prompts";
import { execSync } from "child_process";
import fs from "fs/promises";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import InstallAllArch from "./modules/install/arch/all";
import InstallAllUbuntu from "./modules/install/ubuntu/all";
import InstallAllDebian from "./modules/install/debian/all";

async function main() {
  console.clear();

  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "install":
      await handleInstall();
      break;
    case "new":
      await handleNew();
      break;
    case "update":
      await handleUpdate();
      break;
    case "help":
      displayHelp();
      break;
    default:
      console.log("Usage: esoftplay [install | new | update | help]");
      process.exit(0);
  }
}

async function handleInstall() {
  const distro = await detectDistro();

  if (distro === "Unsupported") {
    p.cancel("Distro not supported.");
    process.exit(0);
  }

  p.intro(color.bgCyan(color.black("Esoftplay Framework Wizard")));

  p.note(`Detected: ${distro}`);

  const installFunction = getInstallerForDistro(distro!);
  if (!installFunction) {
    p.cancel("Unsupported distro");
    process.exit(0);
  }

  await p.group(
    {
      distro: async () => distro,
      install: async () => await installFunction(),
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  p.note(`cd /var/www/html\nesoftplay new`, "Next steps");

  p.outro(
    `Need assistance? Visit: ${color.underline(
      color.cyan("https://dev.esoftplay.com")
    )}`
  );
}

async function detectDistro() {
  try {
    const osRelease = await fs.readFile("/etc/os-release", "utf8");
    const lines = osRelease.split("\n");

    for (const line of lines) {
      if (line.startsWith("ID=")) {
        return line.split("=")[1].replace(/"/g, "").trim();
      }
    }
  } catch (error) {
    console.error("Error detecting distro:", error);
    return "Unsupported";
  }
}

function getInstallerForDistro(distro: string) {
  switch (distro) {
    case "arch":
      return InstallAllArch;
    case "ubuntu":
      return InstallAllUbuntu;
    case "debian":
      return InstallAllDebian;
    default:
      return null;
  }
}

async function handleNew() {
  p.intro(color.bgCyan(color.black("Esoftplay Framework Wizard")));

  await setTimeout(1000);

  const args = process.argv.slice(2);
  let projectName = args[1];

  if (!projectName) {
    const response = await p.group(
      {
        name: () =>
          p.text({
            message: "Enter the project name: ",
            placeholder: "project-name",
            validate: (value) => {
              if (!value) return "Please enter a valid project name.";
            },
          }),
      },
      {
        onCancel: () => {
          p.cancel("Operation cancelled.");
          process.exit(0);
        },
      }
    );
    projectName = response.name;
  }

  const path = await getCurrentDirPath();
  const fullPath = `${path}/${projectName}`;

  const s = p.spinner();
  s.start(`Scaffolding project at ${fullPath}`);
  await setTimeout(5000); // Simulate project creation
  s.stop(`Project '${projectName}' successfully created at ${fullPath}`);

  p.note(`cd ${fullPath}\nedit config.php`, "Next steps");

  p.outro(
    `Need help? Visit: ${color.underline(
      color.cyan("https://dev.esoftplay.com")
    )}`
  );
}

async function getCurrentDirPath(): Promise<string> {
  try {
    const path = execSync("pwd").toString().trim();
    return path;
  } catch (error) {
    console.error("Error getting current directory:", error);
    return "/";
  }
}

async function handleUpdate() {
  p.intro(color.bgCyan(color.black("Esoftplay Framework Wizard")));

  await setTimeout(1000);

  const s = p.spinner();
  s.start("Updating Esoftplay Framework...");
  await setTimeout(5000); // Simulate update process
  s.stop("Esoftplay Framework successfully updated.");

  p.outro(
    `Need help? Visit: ${color.underline(
      color.cyan("https://dev.esoftplay.com")
    )}`
  );
}

function displayHelp() {
  console.log(`
Usage: esoftplay [command]

Commands:
  install   Install the Esoftplay Framework.
  new       Create a new project.
  update    Update the Esoftplay Framework.
  help      Show this help message.
  `);
  process.exit(0);
}

main().catch(console.error);
