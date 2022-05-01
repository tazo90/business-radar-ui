import { ApplicationStatus, ApplicationType, UserPlan } from "@prisma/client";

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
    name: "Kabb",
    fullName: "Kabb",
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

const projects = [
  {
    name: "CTS",
    slug: "cts",
  },
  {
    name: "AmSpace",
    slug: "amspace",
  },
  {
    name: "ECommerce",
    slug: "ecommerce",
  },
];

const apps = [
  {
    uid: "1",
    title: "KFC PL",
    token: "ctskfcpl",
    status: ApplicationStatus.DRAFT,
    type: ApplicationType.JOBS,
    paid: false,
    domain: "https://cts.pl",
    project: "cts",
  },
  {
    uid: "2",
    title: "KFC PL",
    token: "ecommercekfcpl",
    status: ApplicationStatus.DRAFT,
    type: ApplicationType.ECOMMERCE,
    paid: false,
    domain: "https://kfc.pl",
    project: "ecommerce",
  },
  {
    uid: "3",
    title: "PH PL",
    token: "ecommercephpl",
    status: ApplicationStatus.DRAFT,
    type: ApplicationType.ECOMMERCE,
    paid: false,
    domain: "http://pizzahut.pl",
    project: "ecommerce",
  },
  {
    uid: "4",
    title: "AmRest Stores",
    token: "amspacestores",
    status: ApplicationStatus.DRAFT,
    type: ApplicationType.STORES,
    paid: false,
    domain: "https://amspace.amrest.eu",
    project: "amspace",
  },
];

export default {
  organization,
  brands,
  countries,
  users,
  projects,
  apps,
};
