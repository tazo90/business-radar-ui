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
    code: "PL",
    name: "Poland",
  },
  {
    code: "CZ",
    name: "Czech Republic",
  },
  {
    code: "HU",
    name: "Hungary",
  },
  {
    code: "SK",
    name: "Slovak Republic",
  },
  {
    code: "BG",
    name: "Bulgaria",
  },
  {
    code: "DE",
    name: "Germany",
  },
  {
    code: "ES",
    name: "Spain",
  },
  {
    code: "RO",
    name: "Romania",
  },
  {
    code: "RU",
    name: "Russia",
  },
  {
    code: "RS",
    name: "Serbia",
  },
  {
    code: "CN",
    name: "China",
  },
  {
    code: "FR",
    name: "France",
  },
  {
    code: "HR",
    name: "Croatia",
  },
  {
    code: "AT",
    name: "Austria",
  },
  {
    code: "PT",
    name: "Portugal",
  },
  {
    code: "SI",
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
        status: ApplicationConsumerStatus.DRAFT,
        domain: "https://amspace.amrest.eu",
        project: "amspace",
        brands: ["KFC", "PH", "BK", "SBX"],
        countries: ["PL", "CZ", "HU"]
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
        status: ApplicationConsumerStatus.DRAFT,
        domain: "https://cts.pl",
        project: "cts",
        brands: ["KFC"],
        countries: ["PL"],
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
        status: ApplicationConsumerStatus.DRAFT,
        domain: "https://kfc.pl",
        project: "ecommerce",
        brands: ["KFC"],
        countries: ["PL"]
      },
      {
        uid: "4",
        title: "PH PL",
        status: ApplicationConsumerStatus.DRAFT,
        domain: "http://pizzahut.pl",
        project: "ecommerce",
        brands: ["PH"],
        countries: ["PL"]
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
