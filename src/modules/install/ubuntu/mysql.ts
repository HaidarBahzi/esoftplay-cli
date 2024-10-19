import * as p from "@clack/prompts";
import { execSync } from "node:child_process";
import { mkdirSync, unlinkSync, rmdirSync } from "node:fs";
import process from "node:process";

export default async function InstallMysqlUbuntu() {
  try {
    execSync("sudo apt -y remove mariadb* mysql* libc6-dev > /dev/null 2>&1");

    execSync(
      "sudo apt -y install dialog apt-utils libsuma1 libnuma1 libatomic1 libncurses6 libmecab2 psmisc > /dev/null 2>&1"
    );

    execSync(
      "wget http://archive.ubuntu.com/ubuntu/pool/universe/n/ncurses/libtinfo5_6.4-2_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "wget http://archive.ubuntu.com/ubuntu/pool/main/liba/libaio/libaio1_0.3.113-5_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "sudo apt install ./libaio1_0.3.113-5_amd64.deb ./libtinfo5_6.4-2_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "wget https://cdn.mysql.com/archives/mysql-5.7/mysql-server_5.7.42-1ubuntu18.04_amd64.deb-bundle.tar > /dev/null 2>&1"
    );

    mkdirSync("temp-mysql");

    execSync(
      "tar xf mysql-server_5.7.42-1ubuntu18.04_amd64.deb-bundle.tar -C temp-mysql > /dev/null 2>&1"
    );

    unlinkSync("mysql-server_5.7.42-1ubuntu18.04_amd64.deb-bundle.tar");

    unlinkSync("libaio1_0.3.113-5_amd64.deb");

    unlinkSync("libtinfo5_6.4-2_amd64.deb");

    process.chdir("temp-mysql");

    execSync(
      "sudo dpkg -i mysql-common_5.7.42-1ubuntu18.04_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "sudo dpkg-preconfigure mysql-community-server_5.7.42-1ubuntu18.04_amd64.deb"
    );

    execSync(
      "sudo dpkg -i libmysqlclient20_5.7.42-1ubuntu18.04_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "sudo dpkg -i libmysqlclient-dev_5.7.42-1ubuntu18.04_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "sudo dpkg -i libmysqld-dev_5.7.42-1ubuntu18.04_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "sudo dpkg -i mysql-community-client_5.7.42-1ubuntu18.04_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "sudo dpkg -i mysql-client_5.7.42-1ubuntu18.04_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "sudo dpkg -i mysql-common_5.7.42-1ubuntu18.04_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "sudo dpkg -i mysql-community-server_5.7.42-1ubuntu18.04_amd64.deb > /dev/null 2>&1"
    );

    execSync(
      "sudo dpkg -i mysql-server_5.7.42-1ubuntu18.04_amd64.deb > /dev/null 2>&1"
    );

    process.chdir("..");

    rmdirSync("temp-mysql", { recursive: true });
  } catch (_error) {
    p.cancel("Failed to install MySQL 5.7");
    process.exit(0);
  }
}
