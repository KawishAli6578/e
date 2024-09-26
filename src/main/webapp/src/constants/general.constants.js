export const LOCAL_STORAGE_CONSTANTS = Object.freeze({
  AUTH_TOKEN: "auth_token",
});

export const USER_ROLES = Object.freeze({
  ROLE_SUPER_ADMIN: "ROLE_SUPER_ADMIN",
  ROLE_FRANCHISE_ADMIN: "ROLE_FRANCHISE_ADMIN",
  ROLE_SALES_AGENT: "ROLE_SALES_AGENT",
  ROLE_CUSTOMER_ADMIN: "ROLE_CUSTOMER_ADMIN",
  ROLE_CUSTOMER_USER: "ROLE_CUSTOMER_USER",
  ROLE_SUPPORT: "ROLE_SUPPORT",
});

export const passwordRegExp =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,255}$/;
export const usernameRegExp = /^([a-zA-Z0-9]){3,130}$/;

export const domainRegex =
  /^(https?:\/\/(?!:\/\/))?([a-zA-Z0-9-_]+(?:(?:\.[a-zA-Z0-9-_]+)+))\/?$/;

export const PACKAGE_TYPE = ["Envelope", "Package", "Pak", "Pallet"];
export const PACKAGE_TYPE_OBJ = {
  1: "Envelope",
  2: "Pak",
  3: "Package",
  4: "Pallet",
};
export const ONLY_PACKAGE_TYPE_OBJ = { 3: "Package" };

export const MARKUP_TYPE = ["markup"];

export const COMPANY_TYPE = ["Credit Card", /*  'Credit Limit', */ "Deposit"];

export const MEASUREMENT_SYSTEM = ["IMPERIAL", "METRIC"];

export const AGENT_TYPE = [
  "Normal Sales Agent",
  // , 'Sub Sales Agent'
];

export const INSURANCE_TYPE = {
  1: "Kumoship",
  2: "Carrier",
};

export const CURRENCY_OBJ = {
  1: "CAD",
  2: "USD",
};

export const COMMODITY_TYPE = {
  1: "General Goods",
  2: "Footwear",
  3: "Fragile Goods",
};

export const SIGNATURE_TYPE = {
  1: "No Signature",
  2: "Signature Required",
  3: "Adult Signature",
  4: "19+ Signature",
};
export const allPackages = {
  1: "Envelope",
  2: "Pak",
  3: "Package",
  4: "Pallet",
};
export const TIME_ZONE_OPTIONS = [
  {
    id: 1,
    label: "All By Timezone",
    value: "all",
  },
  {
    id: 2,
    label: "Today",
    value: "today",
  },
  {
    id: 3,
    label: "This Week",
    value: "thisWeek",
  },
  {
    id: 4,
    label: "Last 30 Days",
    value: "thisMonth",
  },
  {
    id: 5,
    label: "Custom Range",
    value: "customDateRange",
  },
];
export const ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    label: "All Orders",
    value: "",
  },
  {
    id: 1,
    label: "Fulfilled Orders",
    value: "fulfilled",
  },
  {
    id: 1,
    label: "Partial Orders",
    value: "partial",
  },
  {
    id: 2,
    label: "Unfulfilled Orders",
    value: "unfulfilled",
  },
  {
    id: 3,
    label: "Cancelled Orders",
    value: "cancelled",
  },
];
export const PAYMENT_OPTIONS = [
  {
    id: 1,
    label: "Paid",
    value: "paid",
  },
  {
    id: 2,
    label: "Pending",
    value: "pending",
  },
  {
    id: 3,
    label: "Refunded",
    value: "refunded",
  },
  {
    id: 4,
    label: "Partially Refunded",
    value: "partially_refunded",
  },
  {
    id: 5,
    label: "Other",
    value: "other",
  },
];

export const SHIPPING_LABELS_OBJ = Object.freeze({
  SHIPPING: "Shipping label",
});
export const pricingClassMap = Object.freeze({
  paid: "bg-paid",
  pending: "bg-pending",
  cancelled: "bg-cancelled",
  unfulfilled: "bg-secondary text-dark",
  fulfilled: "bg-success",
  partially_paid: "bg-info",
  partial: "bg-partial",
});
export const orderStatusClassMap = Object.freeze({
  fulfilled: "bg-success-fulfilled",
  unfulfilled: "bg-unfullfilled",
  partial: "bg-warning text-dark",
  cancelled: "bg-danger",
  processed: "bg-info",
  "manual fulfilled": "bg-warning text-dark",
});

export const imgNameMap = Object.freeze({
  fulfilled: "package-check-green",
  unfulfilled: "package",
  // Add other statuses if needed
});

export const PICKUP_TIME = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

export const CLOSING_TIME = [
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];
export const PICKUP_LOCATION = [
  "None",
  "SideDoor",
  "OutsideDoor",
  "FrontPorch",
  "Basement",
  "FrontDesk",
  "BetweenDoors",
  "Security",
  "Counter",
  "Lobby",
  "Mailbox",
  "GateHouse",
  "Desk",
  "Kiosk",
  "Shipping",
  "ProShop",
  "FrontDoor",
  "Receiving",
  "Reception",
  "BackDoor",
  "Lab",
];
export const PAYMENT_PROCESSOR_LOGO_URL = {
  STRIPE: "/images/payments/stripe.svg",
};
