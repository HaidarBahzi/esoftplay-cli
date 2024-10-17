import { existsSync, mkdirSync, rmdirSync, unlinkSync } from "node:fs";
import fs from "node:fs/promises";
import { execSync } from "node:child_process";
import { setTimeout } from "node:timers/promises";
import process from "node:process";
import { join } from "node:path";
import * as p from "@clack/prompts";
import color from "picocolors";
import InstallAllUbuntu from "./modules/install/ubuntu/all.ts";
import InstallAllDebian from "./modules/install/debian/all.ts";

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
  const distroOptions: any = {
    ubuntu: "Ubuntu",
    debian: "Debian",
  };

  const distro = await detectDistro();

  if (distro === "Unsupported") {
    p.cancel("Distro not supported.");
    process.exit(0);
  }

  p.intro(color.bgCyan(color.black("Esoftplay Framework Wizard")));

  const installFunction = getInstallerForDistro(distro!);
  if (!installFunction) {
    p.cancel("Unsupported distro");
    process.exit(0);
  }

  p.note(`Detected Distro: ${distroOptions[distro!]}`);

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

  p.note(
    `Start apache2 and MySQL Service\ncd /var/www/html\nesoftplay new`,
    "Next steps"
  );

  p.outro(
    `Need assistance? Visit: ${color.underline(
      color.cyan("https://dev.esoftplay.com")
    )}`
  );

  process.exit(0);
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

  const path = await getCurrentDirPath();
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

              const fullPath = join(path, value);
              if (existsSync(fullPath)) {
                return `Folder '${value}' already exists.`;
              }
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

  const fullPath = `${path}/${projectName}`;

  const s = p.spinner();
  s.start(`Scaffolding project at ${fullPath}`);

  try {
    mkdirSync(fullPath);

    process.chdir(fullPath);
  } catch (_error) {
    p.cancel(`Failed to create project at ${fullPath}`);
    process.exit(0);
  }

  try {
    execSync("curl -s fisip.net/fw -o script.php");

    execSync("php script.php > script.sh 2>/dev/null");

    execSync("sh script.sh > /dev/null 2>&1");

    unlinkSync("script.php");
    unlinkSync("script.sh");
  } catch (_error) {
    rmdirSync(fullPath, { recursive: true });

    p.cancel(`Failed to create project at ${fullPath}`);
    process.exit(0);
  }

  s.stop(`Project '${projectName}' successfully created at ${fullPath}`);

  p.note(`cd ${fullPath}\nedit config.php`, "Next steps");

  p.outro(
    `Need help? Visit: ${color.underline(
      color.cyan("https://dev.esoftplay.com")
    )}`
  );

  process.exit(0);
}

async function getCurrentDirPath() {
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

  const s = p.spinner();
  s.start("Updating Esoftplay Framework");

  try {
    process.chdir("/var/www/html/master");

    execSync("git reset --hard origin/master");

    execSync("git pull");
  } catch (_error) {
    p.cancel("Failed to update Esoftplay Framework.");
    process.exit(0);
  }

  s.stop("Esoftplay Framework successfully updated.");

  p.outro(
    `Need assistance? Visit: ${color.underline(
      color.cyan("https://dev.esoftplay.com")
    )}`
  );

  process.exit(0);
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
