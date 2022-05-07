import { ApplicationConsumerStatus, ApplicationType, UserPlan } from "@prisma/client";

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
    email: "tazo@gmail.com",
    password: "pass",
    username: "tazo90",
    name: "ala",
    plan: UserPlan.PRO,
  },
  {
    email: "dieselo@gmail.pl",
    password: "pass",
    username: "dieselo",
    name: "Team Pro Example",
    plan: UserPlan.FREE,
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
    type: ApplicationType.STORES,
    paid: false,
    consumers: [
      {
        uid: "1",
        title: "AmRest Stores",
        token: "amspacestores",
        status: ApplicationConsumerStatus.DRAFT,
        domain: "https://amspace.amrest.eu",
        project: "amspace",
        brands: ["kfc", "ph", "bk", "sbx"],
        countries: ["pl", "cz", "hu"]
      },
    ]
  },
  {
    type: ApplicationType.JOBS,
    paid: false,
    consumers: [
      {
        uid: "2",
        title: "KFC PL",
        token: "ctskfcpl",
        status: ApplicationConsumerStatus.DRAFT,
        domain: "https://cts.pl",
        project: "cts",
        brands: ["kfc"],
        countries: ["pl"],
      },
     
    ]
  },
  {
    type: ApplicationType.ECOMMERCE,
    paid: false,
    consumers: [
      {
        uid: "3",
        title: "KFC PL",
        token: "ecommercekfcpl",
        status: ApplicationConsumerStatus.DRAFT,
        domain: "https://kfc.pl",
        project: "ecommerce",
        brands: ["kfc"],
        countries: ["pl"]
      },
      {
        uid: "4",
        title: "PH PL",
        token: "ecommercephpl",
        status: ApplicationConsumerStatus.DRAFT,
        domain: "http://pizzahut.pl",
        project: "ecommerce",
        brands: ["ph"],
        countries: ["pl"]
      },
    ]
  },
]

export default {
  organization,
  brands,
  countries,
  users,
  projects,
  apps,
};
