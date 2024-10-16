import { setTimeout } from "node:timers/promises";
import InstallMasterUbuntu from "./master.ts";
import InstallMysqlUbuntu from "./mysql.ts";
import InstallPhpUbuntu from "./php.ts";

export default async function InstallAllUbuntu() {
  await setTimeout(2000);
  await InstallPhpUbuntu();
  await setTimeout(2000);
  await InstallMysqlUbuntu();
  await setTimeout(2000);
  await InstallMasterUbuntu();
}
