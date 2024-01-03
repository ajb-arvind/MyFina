const today = new Date();

export function formatDateDDYMMYYY(date) {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  let day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export const InitialUserAccounts = [
  { value: "cash", label: "Cash", isEnabled: true },
  { value: "online", label: "online", isEnabled: true },
];

export const categories = [
  { value: "Transportation", label: "Transportation" },
  { value: "Everyday", label: "Everyday" },
  { value: "Home", label: "Home" },
  { value: "Utilities", label: "Utilities" },
  { value: "Travel", label: "Travel" },
  { value: "Parents", label: "Parents" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Debt", label: "Debt" },
  { value: "Health", label: "Health" },
  { value: "Insurance", label: "Insurance" },
  { value: "Gifts", label: "Gifts" },
  { value: "Education", label: "Education" },
  { value: "Others", label: "Others" },
  { value: "Investment", label: "Investment" },
];

export const InitialUserCategories = [
  {
    value: "Transportation",
    label: "Transportation",
    isEnabled: true,
    subCategory: [
      { value: "Fuel", label: "Fuel", isEnabled: true },
      { value: "Public transit", label: "Public transit", isEnabled: true },
      { value: "Repairs", label: "Repairs", isEnabled: true },
      {
        value: "Registration/license",
        label: "Registration/license",
        isEnabled: true,
      },
      { value: "Supplies", label: "Supplies", isEnabled: true },
      { value: "Others", label: "Others", isEnabled: true },
    ],
  },
  {
    value: "Everyday",
    label: "Everyday",
    isEnabled: true,
    subCategory: [
      { value: "Food", label: "Food", isEnabled: true },
      { value: "Restaurants", label: "Restaurants", isEnabled: true },
      { value: "Groceries", label: "Groceries", isEnabled: true },
      { value: "Clothes", label: "Clothes", isEnabled: true },
      { value: "Hair/Beauty", label: "Hair/Beauty", isEnabled: true },
      {
        value: "Laundry/Dry Cleaning",
        label: "Laundry/Dry Cleaning",
        isEnabled: true,
      },
      { value: "Subscription", label: "Subscription", isEnabled: true },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Home",
    label: "Home",
    isEnabled: true,
    subCategory: [
      { value: "Rent/mortgage", label: "Rent/mortgage", isEnabled: true },
      { value: "Property taxes", label: "Property taxes", isEnabled: true },
      { value: "Furnishings", label: "Furnishings", isEnabled: true },
      { value: "Lawn/garden", label: "Lawn/garden", isEnabled: true },
      { value: "Supplies", label: "Supplies", isEnabled: true },
      { value: "Maintenance", label: "Maintenance", isEnabled: true },
      { value: "Improvements", label: "Improvements", isEnabled: true },
      { value: "Moving", label: "Moving", isEnabled: true },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Travel",
    label: "Travel",
    isEnabled: true,
    subCategory: [
      { value: "Airfare", label: "Airfare", isEnabled: true },
      { value: "Hotels", label: "Hotels", isEnabled: true },
      { value: "Food", label: "Food", isEnabled: true },
      { value: "Transportation", label: "Transportation", isEnabled: true },
      { value: "Entertainment", label: "Entertainment", isEnabled: true },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Parents",
    label: "Parents",
    isEnabled: true,
    subCategory: [
      { value: "Activities", label: "Activities", isEnabled: true },
      { value: "Allowance", label: "Allowance", isEnabled: true },
      { value: "Medical", label: "Medical", isEnabled: true },
      { value: "Childcare", label: "Childcare", isEnabled: true },
      { value: "Clothing", label: "Clothing", isEnabled: true },
      { value: "School", label: "School", isEnabled: true },
      { value: "Toys", label: "Toys", isEnabled: true },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Entertainment",
    label: "Entertainment",
    isEnabled: true,
    subCategory: [
      { value: "Books", label: "Books", isEnabled: true },
      { value: "Concerts/shows", label: "Concerts/shows", isEnabled: true },
      { value: "Games", label: "Games", isEnabled: true },
      { value: "Hobbies", label: "Hobbies", isEnabled: true },
      { value: "Films", label: "Films", isEnabled: true },
      { value: "Music", label: "Music", isEnabled: true },
      {
        value: "Outdoor activities",
        label: "Outdoor activities",
        isEnabled: true,
      },
      { value: "Photography", label: "Photography", isEnabled: true },
      { value: "Sport", label: "Sport", isEnabled: true },
      { value: "Theatre/plays", label: "Theatre/plays", isEnabled: true },
      { value: "TV", label: "TV", isEnabled: true },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Debt",
    label: "Debt",
    isEnabled: true,
    subCategory: [
      { value: "Credit cards", label: "Credit cards", isEnabled: true },
      { value: "Student loans", label: "Student loans", isEnabled: true },
      { value: "Other loans", label: "Other loans", isEnabled: true },
      { value: "Taxes", label: "Taxes", isEnabled: true },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Health",
    label: "Health",
    isEnabled: true,
    subCategory: [
      {
        value: "Doctors/dental/vision",
        label: "Doctors/dental/vision",
        isEnabled: true,
      },
      { value: "Specialist care", label: "Specialist care", isEnabled: true },
      { value: "Pharmacy", label: "Pharmacy", isEnabled: true },
      { value: "Emergency", label: "Emergency", isEnabled: true },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Insurance",
    label: "Insurance",
    isEnabled: true,
    subCategory: [
      { value: "Car", label: "Car", isEnabled: true },
      { value: "Health", label: "Health", isEnabled: true },
      { value: "Home", label: "Home", isEnabled: true },
      { value: "Life", label: "Life", isEnabled: true },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Gifts",
    label: "Gifts",
    isEnabled: true,
    subCategory: [
      { value: "Gifts", label: "Gifts", isEnabled: true },
      {
        value: "Donations (charity)",
        label: "Donations (charity)",
        isEnabled: true,
      },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Education",
    label: "Education",
    isEnabled: true,
    subCategory: [
      { value: "Tuition", label: "Tuition", isEnabled: true },
      { value: "Books", label: "Books", isEnabled: true },
      { value: "Music lessons", label: "Music lessons", isEnabled: true },
      { value: "Other", label: "Other", isEnabled: true },
    ],
  },
  {
    value: "Others",
    label: "Others",
    isEnabled: true,
    subCategory: [
      { value: "Other", label: "Other", isEnabled: true },
      // Add as many empty subcategories as needed
    ],
  },
  {
    value: "Investment",
    label: "Investment",
    isEnabled: true,
    subCategory: [
      { value: "MF", label: "MF", isEnabled: true },
      { value: "FD", label: "FD", isEnabled: true },
      { value: "Stock", label: "Stock", isEnabled: true },
      { value: "Gold", label: "Gold", isEnabled: true },
      { value: "Real Estate", label: "Real Estate", isEnabled: true },
    ],
  },
];
