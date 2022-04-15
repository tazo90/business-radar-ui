import { ApplicationStatus, UserPlan } from "@prisma/client";

const organization = {
  name: "AmRest",
  slug: "amrest",
};

const brands = [
  {
    name: "KFC",
    fullName: "KFC",
  },
  {
    name: "PH",
    fullName: "Pizza Hut",
  },
];

const countries = [
  {
    name: "Poland",
    code: "PL",
  },
  {
    name: "Czech",
    code: "CZ",
  },
];

const users = [
  {
    email: "tazo@gmail.com",
    password: "pass",
    username: "tazo90",
    name: "ala",
    plan: UserPlan.FREE,
  },
  {
    email: "team2pro@example.com",
    password: "teampro",
    username: "teampro",
    name: "Team Pro Example",
    plan: UserPlan.PRO,
  },
];

const apps = [
  {
    uid: "123",
    title: "Stores KFC PL",
    token: "abcd",
    status: ApplicationStatus.DRAFT,
    paid: false,
    domain: "localhost",
  },
];

export default {
  organization,
  brands,
  countries,
  users,
  apps,
};
