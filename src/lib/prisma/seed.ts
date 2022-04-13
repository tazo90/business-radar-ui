import { PrismaClient, UserPlan } from "@prisma/client";

import { hashPassword } from "../auth";

require("dotenv");

const prisma = new PrismaClient();

async function createUser(opts: {
  user: {
    email: string;
    password: string;
    username: string;
    plan: UserPlan;
    name: string;
  };
}) {
  const userData = {
    ...opts.user,
    password: await hashPassword(opts.user.password),
    emailVerified: new Date(),
  };

  const user = await prisma.user.upsert({
    where: { email: opts.user.email },
    update: userData,
    create: userData,
  });

  console.log(
    `👤 Upserted '${user.username}' with email "${user.email}" & password "${user.password}".`
  );

  return user;
}

async function main() {
  await createUser({
    user: {
      email: "tazo90@gmail.com",
      password: "pass",
      username: "tazo90",
      name: "ala",
      plan: "FREE",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
