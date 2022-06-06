import {
  ApplicationConsumerStatus,
  ApplicationType,
  UserPlan,
} from "@prisma/client";

const organization = {
  name: "LPP",
  slug: "lpp",
};

const brands = [
  {
    name: "RESERVED",
    fullName: "Reserved",
  },
  {
    name: "CROPP",
    fullName: "Cropp",
  },
  {
    name: "HOUSE",
    fullName: "House",
  },
  {
    name: "MOHITO",
    fullName: "Mohito",
  },
  {
    name: "SINSAY",
    fullName: "Sinsay",
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
    email: "user1@lpp.com",
    password: "pass",
    username: "user1",
    name: "user1",
    plan: UserPlan.PRO,
  },
  {
    email: "user2@lpp.com",
    password: "pass",
    username: "user2",
    name: "user2",
    plan: UserPlan.FREE,
  },
];

const projects = [
  {
    name: "LPP",
    slug: "lpp",
  },
];

const apps = [
  {
    type: ApplicationType.STORES,
    paid: false,
    consumers: [
      {
        uid: "1",
        title: "LPP Stores",
        status: ApplicationConsumerStatus.DRAFT,
        domain: "https://lpp.com",
        project: "lpp",
        brands: ["reserved", "sinsay"],
        countries: ["PL", "CZ", "HU"],
      },
    ],
  },
  {
    type: ApplicationType.JOBS,
    paid: false,
    consumers: [
      {
        uid: "2",
        title: "LPP Sinsay PL",
        status: ApplicationConsumerStatus.DRAFT,
        domain: "https://sinsay.pl",
        project: "lpp",
        brands: ["house"],
        countries: ["PL"],
      },
    ],
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
