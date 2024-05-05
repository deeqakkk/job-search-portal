export const ROLES = [
  {
    options: [
      {
        label: "Backend",
        value: "backend",
      },
      {
        label: "Frontend",
        value: "frontend",
      },
      {
        label: "Tech Lead",
        value: "tech lead",
      },
      {
        label: "Android",
        value: "android",
      },
      {
        label: "IOS",
        value: "ios",
      }
    ],
  }
];

export const LOCATION = [
  {
    label: "Remote",
    value: "remote",
  },
  {
    label: "Hybrid",
    value: "hybrid",
  },
  {
    label: "In-Office",
    value: "inoffice",
  },
];

export const EXPERIENCE = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

export const PAY = [
  { label: "0", value: "0" },
  { label: "5L", value: "5" },
  { label: "10L", value: "10" },
  { label: "15L", value: "15" },
  { label: "20L", value: "20" },
  { label: "25L", value: "25" },
  { label: "30L", value: "30" },
  { label: "40L", value: "40" },
  { label: "50L", value: "50" },
  { label: "60L", value: "60" },
  { label: "70L", value: "70" },
];

export const DEFAULT_FILTER_STATE = {
  roles: [],
  experience: null,
  minPay: null,
  locationType: [],
  location: [],
  name: "",
};
