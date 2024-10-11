import { setTimeout } from "node:timers/promises";
import InstallMasterUbuntu from "./install_master";
import InstallMysqlUbuntu from "./install_mysql";
import InstallPhpUbuntu from "./install_php";

export default async function InstallAllUbuntu() {
  await setTimeout(2000);
  await InstallPhpUbuntu();
  await setTimeout(2000);
  await InstallMysqlUbuntu();
  await setTimeout(2000);
  await InstallMasterUbuntu();
}
