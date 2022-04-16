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
  {
    name: "BK",
    fullName: "Burger King",
  },
  {
    name: "SBX",
    fullName: "Starbucks",
  },
  {
    name: "TAG",
    fullName: "La Tagliatella",
  },
  {
    name: "BF",
    fullName: "Blue Frog",
  },
  {
    name: "Kaab",
    fullName: "Kaab",
  },
  {
    name: "BCA",
    fullName: "Bacoa",
  },
  {
    name: "SSG",
    fullName: "Sushi Shop",
  },
];

const countries = [
  {
    code: "pl",
    name: "Poland",
  },
  {
    code: "cz",
    name: "Czech Republic",
  },
  {
    code: "hu",
    name: "Hungary",
  },
  {
    code: "sk",
    name: "Slovak Republic",
  },
  {
    code: "bg",
    name: "Bulgaria",
  },
  {
    code: "de",
    name: "Germany",
  },
  {
    code: "es",
    name: "Spain",
  },
  {
    code: "ro",
    name: "Romania",
  },
  {
    code: "ru",
    name: "Russia",
  },
  {
    code: "rs",
    name: "Serbia",
  },
  {
    code: "cn",
    name: "China",
  },
  {
    code: "fr",
    name: "France",
  },
  {
    code: "hr",
    name: "Croatia",
  },
  {
    code: "at",
    name: "Austria",
  },
  {
    code: "pt",
    name: "Portugal",
  },
  {
    code: "si",
    name: "Slovenia",
  },
];

const users = [
  {
    email: "tazo90@gmail.com",
    password: "pass",
    username: "tazo90",
    name: "ala",
    plan: UserPlan.FREE,
  },
  {
    email: "dieselo@o2.pl",
    password: "diesel",
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
