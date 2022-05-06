//@ts-nocheck
import { PrismaClient, Prisma, MembershipRole, UserPlan } from "@prisma/client";

import { hashPassword } from "../auth";
import data from "./fixtures/amrest";
import { generateUniqueAPIKey } from "../api-keys";
import { omit } from "../lodash";

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

async function createProjects(
  organization: any,
  projectOwner: any,
  projects: any
) {
  projects.map(async (project: any) => {
    await prisma.project.create({
      data: {
        ...project,
        organization: { connect: { id: organization.id } },
        owner: { connect: { id: projectOwner.id } },
      }
    })
  });
}

async function createAppsAndConsumers(
  appOwner: any,
  apps: any
) {
  apps.map(async (app: any) => {
    // const projectApps = projects.filter((project: any) => app.project === project.slug);

    const appObj = await prisma.application.create({
      data: {
        ...omit(app, 'consumers'),
        owner: { connect: { id: appOwner.id } },
      },
    });

    console.log(`\t👤 Created app '${app.name}'`);

    // Create consumers
    app?.consumers.map(async (consumer: any) => await createConsumer(appObj, consumer));
  });
}

async function createConsumer(app: any, consumer: any) {
  const [hashedApiKey, apiKey] = generateUniqueAPIKey();

  const brands = await prisma.brand.findMany({
    where: {
      name: { in: consumer.brands }
    },
    select: {
      id: true,
    },
  });
  const countries = await prisma.country.findMany({
    where: {
      code: { in: consumer.countries }
    },
    select: {
      id: true,
    },
  });

  const consumerObj = await prisma.applicationConsumer.create({
    data: {
      ...consumer,
      application: { connect: { id: app.id }},
      project: { connect: { slug: consumer.project } },
      user: { connect: { id: app.ownerId } },
      expires: new Date(
        "Tue Sep 21 2022 16:16:50 GMT-0400 (Eastern Daylight Time)"
      ),
      token: hashedApiKey,
      brands: {
        connect: brands.map((brand) => ({id: brand.id}))
      },
      countries: {
        connect: countries.map((country) => ({id: country.id}))
      },
    },
  });

  console.log(
    `\t👤 Created consumer '${consumerObj.title}' in app ${app.name}`
  );
}

async function main() {
  await dropTables();

  // Create users
  const freeUser = await createUser({
    user: data.users[0],
  });

  const proUser = await createUser({
    user: data.users[1],
  });

  // Create organization and members
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
    // Create brands
    await createBrands(org, data.brands);
    // Create countries
    await createCountries(org, data.countries);
    // Create projects
    await createProjects(org, proUser, data.projects);
    // Create apps and consumers
    await createAppsAndConsumers(proUser, data.apps)
    // await createProjectsAndApps(
    //   org,
    //   proUser,
    //   freeUser,
    //   data.projects,
    //   data.apps
    // );
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
