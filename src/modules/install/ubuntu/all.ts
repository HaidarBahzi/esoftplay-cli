import { setTimeout } from "node:timers/promises";
import InstallMasterUbuntu from "./master";
import InstallMysqlUbuntu from "./mysql";
import InstallPhpUbuntu from "./php";

export default async function InstallAllUbuntu() {
  await setTimeout(2000);
  await InstallPhpUbuntu();
  await setTimeout(2000);
  await InstallMysqlUbuntu();
  await setTimeout(2000);
  await InstallMasterUbuntu();
}