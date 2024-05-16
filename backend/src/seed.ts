import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import bcrypt from "bcryptjs";
import * as fs from "fs";

async function seed() {
  await AppDataSource.initialize();

  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  for (const userData of data.users) {
    const user = new User();
    user.username = userData.username;
    user.password = await bcrypt.hash(userData.password, 10);

    await AppDataSource.manager.save(user);
  }

  console.log("Seeding completed");
}

seed().catch((error) => console.log(error));
