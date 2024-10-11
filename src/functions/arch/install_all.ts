import InstallPhpArch from "./install_php";
import InstallMysqlArch from "./install_mysql";
import InstallMasterArch from "./install_master";
import { setTimeout } from "node:timers/promises";

export default async function InstallAllArch() {
  await setTimeout(2000);
  await InstallPhpArch();
  await setTimeout(2000);
  await InstallMysqlArch();
  await setTimeout(2000);
  await InstallMasterArch();
}
