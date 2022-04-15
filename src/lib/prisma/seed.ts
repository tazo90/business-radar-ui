import {
  PrismaClient,
  Prisma,
  User,
  Organization,
  MembershipRole,
  UserPlan,
} from "@prisma/client";

import { hashPassword } from "../auth";
import data from "./fixtures/amrest";

require("dotenv");

const prisma = new PrismaClient();

async function dropTables() {
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.organization.deleteMany();

  // await prisma.$queryRaw`ALTER TABLE brand AUTO_INCREMENT = 1`;
  // await prisma.$queryRaw`ALTER TABLE user AUTO_INCREMENT = 1`;
  // await prisma.$queryRaw`ALTER TABLE membership AUTO_INCREMENT = 1`;
  // await prisma.$queryRaw`ALTER TABLE organization AUTO_INCREMENT = 1`;

  console.log("Dropped tables");
}

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

async function createOrganizationAndUsers(
  organizationInput: Prisma.OrganizationCreateInput,
  users: { id: number; username: string; role?: MembershipRole }[]
) {
  const createOrganization = async (
    organization: Prisma.OrganizationCreateInput
  ) => {
    return await prisma.organization.create({
      data: {
        ...organization,
      },
    });
  };

  const organization = await createOrganization(organizationInput);
  if (!organization) {
    return;
  }

  console.log(`🏢 Created organization '${organizationInput.name}'`);

  for (const user of users) {
    const { role = MembershipRole.OWNER, id, username } = user;
    await prisma.membership.create({
      data: {
        organizationId: organization.id,
        userId: id,
        role: role,
        accepted: true,
      },
    });
    console.log(
      `\t👤 Added '${organizationInput.name}' membership for '${username}' with role '${role}'`
    );
  }

  return organization;
}

async function createBrands(
  organization: { id: number; name: string },
  brands: { name: string; fullName: string }[]
) {
  brands.map(async (brand) => {
    await prisma.brand.create({
      data: {
        ...brand,
        organizationId: organization.id,
      },
    });

    console.log(`\t👤 Added brand '${brand.name}' to '${organization.name}'`);
  });
}

async function createCountries(
  organization: { id: number; name: string },
  countries: { name: string; code: string }[]
) {
  countries.map(async (country) => {
    await prisma.country.create({
      data: {
        ...country,
        organizationId: organization.id,
      },
    });

    console.log(
      `\t👤 Added country '${country.name}' to '${organization.name}'`
    );
  });
}

async function createApps(organization: any, user: any, apps: any) {
  apps.map(async (app: any) => {
    await prisma.application.create({
      data: {
        ...app,
        userId: user.id,
        organizationId: organization.id,
      },
    });
  });
}

async function main() {
  await dropTables();

  const freeUser = await createUser({
    user: data.users[0],
  });

  const proUser = await createUser({
    user: data.users[1],
  });

  const org = await createOrganizationAndUsers(data.organization, [
    {
      id: freeUser.id,
      username: freeUser.name || "Unknown",
    },
    {
      id: proUser.id,
      username: proUser.name || "Unknown",
    },
  ]);

  if (org) {
    await createBrands(org, data.brands);
    await createCountries(org, data.countries);

    await createApps(org, proUser, data.apps);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
