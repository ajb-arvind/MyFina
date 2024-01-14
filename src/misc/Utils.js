const today = new Date();

export function formatDateDDYMMYYY(date) {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  let day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function limitStringDisplay(sentence, uptoLength = 50) {
  return sentence.length > uptoLength
    ? `${sentence.substring(0, uptoLength)}...`
    : sentence;
}

export const InitialUserAccounts = {
  0: { value: 'cash', label: 'Cash', isEnabled: true },
  1: { value: 'online', label: 'online', isEnabled: true },
};

export const categories = [
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Everyday', label: 'Everyday' },
  { value: 'Home', label: 'Home' },
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Parents', label: 'Parents' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Debt', label: 'Debt' },
  { value: 'Health', label: 'Health' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Gifts', label: 'Gifts' },
  { value: 'Education', label: 'Education' },
  { value: 'Others', label: 'Others' },
  { value: 'Investment', label: 'Investment' },
];

// export const InitialUserCategories = [
//   {
//     value: 'Transportation',
//     label: 'Transportation',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Fuel', label: 'Fuel', isEnabled: true },
//       { value: 'Public transit', label: 'Public transit', isEnabled: true },
//       { value: 'Repairs', label: 'Repairs', isEnabled: true },
//       {
//         value: 'Registration/license',
//         label: 'Registration/license',
//         isEnabled: true,
//       },
//       { value: 'Supplies', label: 'Supplies', isEnabled: true },
//       { value: 'Others', label: 'Others', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Everyday',
//     label: 'Everyday',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Food', label: 'Food', isEnabled: true },
//       { value: 'Restaurants', label: 'Restaurants', isEnabled: true },
//       { value: 'Groceries', label: 'Groceries', isEnabled: true },
//       { value: 'Clothes', label: 'Clothes', isEnabled: true },
//       { value: 'Hair/Beauty', label: 'Hair/Beauty', isEnabled: true },
//       {
//         value: 'Laundry/Dry Cleaning',
//         label: 'Laundry/Dry Cleaning',
//         isEnabled: true,
//       },
//       { value: 'Subscription', label: 'Subscription', isEnabled: true },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Home',
//     label: 'Home',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Rent/mortgage', label: 'Rent/mortgage', isEnabled: true },
//       { value: 'Property taxes', label: 'Property taxes', isEnabled: true },
//       { value: 'Furnishings', label: 'Furnishings', isEnabled: true },
//       { value: 'Lawn/garden', label: 'Lawn/garden', isEnabled: true },
//       { value: 'Supplies', label: 'Supplies', isEnabled: true },
//       { value: 'Maintenance', label: 'Maintenance', isEnabled: true },
//       { value: 'Improvements', label: 'Improvements', isEnabled: true },
//       { value: 'Moving', label: 'Moving', isEnabled: true },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Travel',
//     label: 'Travel',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Airfare', label: 'Airfare', isEnabled: true },
//       { value: 'Hotels', label: 'Hotels', isEnabled: true },
//       { value: 'Food', label: 'Food', isEnabled: true },
//       { value: 'Transportation', label: 'Transportation', isEnabled: true },
//       { value: 'Entertainment', label: 'Entertainment', isEnabled: true },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Parents',
//     label: 'Parents',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Activities', label: 'Activities', isEnabled: true },
//       { value: 'Allowance', label: 'Allowance', isEnabled: true },
//       { value: 'Medical', label: 'Medical', isEnabled: true },
//       { value: 'Childcare', label: 'Childcare', isEnabled: true },
//       { value: 'Clothing', label: 'Clothing', isEnabled: true },
//       { value: 'School', label: 'School', isEnabled: true },
//       { value: 'Toys', label: 'Toys', isEnabled: true },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Entertainment',
//     label: 'Entertainment',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Books', label: 'Books', isEnabled: true },
//       { value: 'Concerts/shows', label: 'Concerts/shows', isEnabled: true },
//       { value: 'Games', label: 'Games', isEnabled: true },
//       { value: 'Hobbies', label: 'Hobbies', isEnabled: true },
//       { value: 'Films', label: 'Films', isEnabled: true },
//       { value: 'Music', label: 'Music', isEnabled: true },
//       {
//         value: 'Outdoor activities',
//         label: 'Outdoor activities',
//         isEnabled: true,
//       },
//       { value: 'Photography', label: 'Photography', isEnabled: true },
//       { value: 'Sport', label: 'Sport', isEnabled: true },
//       { value: 'Theatre/plays', label: 'Theatre/plays', isEnabled: true },
//       { value: 'TV', label: 'TV', isEnabled: true },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Debt',
//     label: 'Debt',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Credit cards', label: 'Credit cards', isEnabled: true },
//       { value: 'Student loans', label: 'Student loans', isEnabled: true },
//       { value: 'Other loans', label: 'Other loans', isEnabled: true },
//       { value: 'Taxes', label: 'Taxes', isEnabled: true },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Health',
//     label: 'Health',
//     isEnabled: true,
//     subCategory: [
//       {
//         value: 'Doctors/dental/vision',
//         label: 'Doctors/dental/vision',
//         isEnabled: true,
//       },
//       { value: 'Specialist care', label: 'Specialist care', isEnabled: true },
//       { value: 'Pharmacy', label: 'Pharmacy', isEnabled: true },
//       { value: 'Emergency', label: 'Emergency', isEnabled: true },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Insurance',
//     label: 'Insurance',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Car', label: 'Car', isEnabled: true },
//       { value: 'Health', label: 'Health', isEnabled: true },
//       { value: 'Home', label: 'Home', isEnabled: true },
//       { value: 'Life', label: 'Life', isEnabled: true },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Gifts',
//     label: 'Gifts',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Gifts', label: 'Gifts', isEnabled: true },
//       {
//         value: 'Donations (charity)',
//         label: 'Donations (charity)',
//         isEnabled: true,
//       },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Education',
//     label: 'Education',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Tuition', label: 'Tuition', isEnabled: true },
//       { value: 'Books', label: 'Books', isEnabled: true },
//       { value: 'Music lessons', label: 'Music lessons', isEnabled: true },
//       { value: 'Other', label: 'Other', isEnabled: true },
//     ],
//   },
//   {
//     value: 'Others',
//     label: 'Others',
//     isEnabled: true,
//     subCategory: [
//       { value: 'Other', label: 'Other', isEnabled: true },
//       // Add as many empty subcategories as needed
//     ],
//   },
//   {
//     value: 'Investment',
//     label: 'Investment',
//     isEnabled: true,
//     subCategory: [
//       { value: 'MF', label: 'MF', isEnabled: true },
//       { value: 'FD', label: 'FD', isEnabled: true },
//       { value: 'Stock', label: 'Stock', isEnabled: true },
//       { value: 'Gold', label: 'Gold', isEnabled: true },
//       { value: 'Real Estate', label: 'Real Estate', isEnabled: true },
//     ],
//   },
// ];

export const InitialUserCategories = {
  // Transportation
  0: {
    value: 'Transportation',
    label: 'Transportation',
    isEnabled: true,
    subCategory: [1, 2, 3, 4, 5, 6],
    isCategory: true,
  },
  1: {
    value: 'Fuel',
    label: 'Fuel',
    isEnabled: true,
    subCategory: [],
  },
  2: {
    value: 'Public transit',
    label: 'Public transit',
    isEnabled: true,
    subCategory: [],
  },
  3: { value: 'Repairs', label: 'Repairs', isEnabled: true, subCategory: [] },
  4: {
    value: 'Registration/license',
    label: 'Registration/license',
    isEnabled: true,
    subCategory: [],
  },
  5: { value: 'Supplies', label: 'Supplies', isEnabled: true, subCategory: [] },
  6: { value: 'Others', label: 'Others', isEnabled: true, subCategory: [] },
  // Everyday
  7: {
    value: 'Everyday',
    label: 'Everyday',
    isEnabled: true,
    subCategory: [8, 9, 10, 11, 12, 13, 14, 15],
    isCategory: true,
  },
  8: { value: 'Food', label: 'Food', isEnabled: true, subCategory: [] },
  9: {
    value: 'Restaurants',
    label: 'Restaurants',
    isEnabled: true,
    subCategory: [],
  },
  10: {
    value: 'Groceries',
    label: 'Groceries',
    isEnabled: true,
    subCategory: [],
  },
  11: { value: 'Clothes', label: 'Clothes', isEnabled: true, subCategory: [] },
  12: {
    value: 'Hair/Beauty',
    label: 'Hair/Beauty',
    isEnabled: true,
    subCategory: [],
  },
  13: {
    value: 'Laundry/Dry Cleaning',
    label: 'Laundry/Dry Cleaning',
    isEnabled: true,
    subCategory: [],
  },
  14: {
    value: 'Subscription',
    label: 'Subscription',
    isEnabled: true,
    subCategory: [],
  },
  15: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },
  // Home
  16: {
    value: 'Home',
    label: 'Home',
    isEnabled: true,
    subCategory: [17, 18, 19, 20, 21, 22, 23, 24, 25],
    isCategory: true,
  },
  17: {
    value: 'Rent/mortgage',
    label: 'Rent/mortgage',
    isEnabled: true,
    subCategory: [],
  },
  18: {
    value: 'Property taxes',
    label: 'Property taxes',
    isEnabled: true,
    subCategory: [],
  },
  19: {
    value: 'Furnishings',
    label: 'Furnishings',
    isEnabled: true,
    subCategory: [],
  },
  20: {
    value: 'Lawn/garden',
    label: 'Lawn/garden',
    isEnabled: true,
    subCategory: [],
  },
  21: {
    value: 'Supplies',
    label: 'Supplies',
    isEnabled: true,
    subCategory: [],
  },
  22: {
    value: 'Maintenance',
    label: 'Maintenance',
    isEnabled: true,
    subCategory: [],
  },
  23: {
    value: 'Improvements',
    label: 'Improvements',
    isEnabled: true,
    subCategory: [],
  },
  24: { value: 'Moving', label: 'Moving', isEnabled: true, subCategory: [] },
  25: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },
  // Travel
  26: {
    value: 'Travel',
    label: 'Travel',
    isEnabled: true,
    subCategory: [27, 28, 29, 30, 31, 32],
    isCategory: true,
  },
  27: { value: 'Airfare', label: 'Airfare', isEnabled: true, subCategory: [] },
  28: { value: 'Hotels', label: 'Hotels', isEnabled: true, subCategory: [] },
  29: { value: 'Food', label: 'Food', isEnabled: true, subCategory: [] },
  30: {
    value: 'Transportation',
    label: 'Transportation',
    isEnabled: true,
    subCategory: [],
  },
  31: {
    value: 'Entertainment',
    label: 'Entertainment',
    isEnabled: true,
    subCategory: [],
  },
  32: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },
  // Parent
  33: {
    value: 'Parent',
    label: 'Parent',
    isEnabled: true,
    subCategory: [34, 35, 36, 37, 38, 39, 40, 41],
    isCategory: true,
  },
  34: {
    value: 'Activities',
    label: 'Activities',
    isEnabled: true,
    subCategory: [],
  },
  35: {
    value: 'Allowance',
    label: 'Allowance',
    isEnabled: true,
    subCategory: [],
  },
  36: { value: 'Medical', label: 'Medical', isEnabled: true, subCategory: [] },
  37: {
    value: 'Childcare',
    label: 'Childcare',
    isEnabled: true,
    subCategory: [],
  },
  38: {
    value: 'Clothing',
    label: 'Clothing',
    isEnabled: true,
    subCategory: [],
  },
  39: { value: 'School', label: 'School', isEnabled: true, subCategory: [] },
  40: { value: 'Toys', label: 'Toys', isEnabled: true, subCategory: [] },
  41: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },
  // Entertainment
  42: {
    value: 'Entertainment',
    label: 'Entertainment',
    isEnabled: true,
    subCategory: [43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
    isCategory: true,
  },
  43: { value: 'Books', label: 'Books', isEnabled: true, subCategory: [] },
  44: {
    value: 'Concerts/shows',
    label: 'Concerts/shows',
    isEnabled: true,
    subCategory: [],
  },
  45: { value: 'Games', label: 'Games', isEnabled: true, subCategory: [] },
  46: { value: 'Hobbies', label: 'Hobbies', isEnabled: true, subCategory: [] },
  47: { value: 'Films', label: 'Films', isEnabled: true, subCategory: [] },
  48: { value: 'Music', label: 'Music', isEnabled: true, subCategory: [] },
  49: {
    value: 'Outdoor activities',
    label: 'Outdoor activities',
    isEnabled: true,
    subCategory: [],
  },
  50: {
    value: 'Photography',
    label: 'Photography',
    isEnabled: true,
    subCategory: [],
  },
  51: { value: 'Sport', label: 'Sport', isEnabled: true, subCategory: [] },
  52: {
    value: 'Theatre/plays',
    label: 'Theatre/plays',
    isEnabled: true,
    subCategory: [],
  },
  //Debt
  53: {
    value: 'Debt',
    label: 'Debt',
    isEnabled: true,
    subCategory: [54, 55, 56, 57, 58],
    isCategory: true,
  },
  54: {
    value: 'Credit cards',
    label: 'Credit cards',
    isEnabled: true,
    subCategory: [],
  },
  55: {
    value: 'Student loans',
    label: 'Student loans',
    isEnabled: true,
    subCategory: [],
  },
  56: {
    value: 'Other loans',
    label: 'Other loans',
    isEnabled: true,
    subCategory: [],
  },
  57: { value: 'Taxes', label: 'Taxes', isEnabled: true, subCategory: [] },
  58: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },
  // Health
  59: {
    value: 'Health',
    label: 'Health',
    isEnabled: true,
    subCategory: [60, 61, 62, 63, 64],
    isCategory: true,
  },
  60: {
    value: 'Doctors/dental/vision',
    label: 'Doctors/dental/vision',
    isEnabled: true,
    subCategory: [],
  },
  61: {
    value: 'Specialist care',
    label: 'Specialist care',
    isEnabled: true,
    subCategory: [],
  },
  62: {
    value: 'Pharmacy',
    label: 'Pharmacy',
    isEnabled: true,
    subCategory: [],
  },
  63: {
    value: 'Emergency',
    label: 'Emergency',
    isEnabled: true,
    subCategory: [],
  },
  64: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },

  // Insurance
  65: {
    value: 'Insurance',
    label: 'Insurance',
    isEnabled: true,
    subCategory: [66, 67, 68, 69, 70],
    isCategory: true,
  },
  66: { value: 'Car', label: 'Car', isEnabled: true, subCategory: [] },
  67: { value: 'Health', label: 'Health', isEnabled: true, subCategory: [] },
  68: { value: 'Home', label: 'Home', isEnabled: true, subCategory: [] },
  69: { value: 'Life', label: 'Life', isEnabled: true, subCategory: [] },
  70: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },
  // Gifts
  71: {
    value: 'Gifts',
    label: 'Gifts',
    isEnabled: true,
    subCategory: [72, 73],
    isCategory: true,
  },
  72: {
    value: 'Donations (charity)',
    label: 'Donations (charity)',
    isEnabled: true,
    subCategory: [],
  },
  73: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },

  // Education
  74: {
    value: 'Education',
    label: 'Education',
    isEnabled: true,
    subCategory: [75, 76, 77, 78],
    isCategory: true,
  },
  75: { value: 'Tuition', label: 'Tuition', isEnabled: true, subCategory: [] },
  76: { value: 'Books', label: 'Books', isEnabled: true, subCategory: [] },
  77: {
    value: 'Music lessons',
    label: 'Music lessons',
    isEnabled: true,
    subCategory: [],
  },
  78: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },

  // Investment
  79: {
    value: 'Investment',
    label: 'Investment',
    isEnabled: true,
    subCategory: [80, 81, 82, 83, 84],
    isCategory: true,
  },
  80: { value: 'MF', label: 'MF', isEnabled: true, subCategory: [] },
  81: { value: 'FD', label: 'FD', isEnabled: true, subCategory: [] },
  82: { value: 'Stock', label: 'Stock', isEnabled: true, subCategory: [] },
  83: { value: 'Gold', label: 'Gold', isEnabled: true, subCategory: [] },
  84: {
    value: 'Real Estate',
    label: 'Real Estate',
    isEnabled: true,
    subCategory: [],
  },

  // Others
  85: {
    value: 'Others',
    label: 'Others',
    isEnabled: true,
    subCategory: [86],
    isCategory: true,
  },

  86: { value: 'Other', label: 'Other', isEnabled: true, subCategory: [] },
};
