import { setTimeout } from "node:timers/promises";
import InstallMasterDebian from "./install_master";
import InstallMysqlDebian from "./install_mysql";
import InstallPhpDebian from "./install_php";

export default async function InstallAllDebian() {
  await setTimeout(2000);
  await InstallPhpDebian();
  await setTimeout(2000);
  await InstallMysqlDebian();
  await setTimeout(2000);
  await InstallMasterDebian();
}
