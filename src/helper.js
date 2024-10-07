function capitalizeWords(inputString) {
  // Trim leading and trailing spaces
  const trimmedString = inputString.trim();

  const words = trimmedString.split(/\s+/);

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words back into a single string
  const result = capitalizedWords.join(" ");

  return result;
}

function formatDate(date) {
  // Extract the day of the month
  const day = date.getDate();

  // Extract the abbreviated weekday name
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekday = weekdays[date.getDay()];

  // Extract the year
  const year = date.getFullYear();

  // Format the date string
  return `${day} ${weekday} ${year}`;
}
function shuffleString(str) {
  // Convert the string into an array of characters
  let arr = str.split("");

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }

  // Convert the array back into a string
  return arr.join("");
}
function encodeToBase64(inputString) {
  // Encode the input string to Base64
  const base64String = btoa(inputString);

  return base64String;
}
function extractLinksFromString(str) {
  try {
    // Regular expression to match URLs
    const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;

    // Use the match method to find all URLs in the string
    const matches = str.match(urlPattern);

    // Return the array of URLs or an empty array if no matches are found
    return matches.join("   ") || "";
  } catch (error) {
    return "";
  }
}
function extractEmailsFromString(str) {
  try {
    // Regular expression to match email addresses
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

    // Use the match method to find all email addresses in the string
    const matches = str.match(emailPattern);

    // Return the array of email addresses or an empty array if no matches are found
    return matches.join("   ") || "";
  } catch (e) {
    return "";
  }
}

function extractNumbersFromString(str) {
  // Use a regular expression to match all sequences of digits in the string
  const matches = str.match(/\d+/g);

  // If matches are found, convert them to numbers and return as an array
  // If no matches are found, return an empty array
  return matches ? matches.map(Number) : [].join(" ") || "";
}
function extractSpecialCharacters(str) {
  // Regular expression to match special characters
  const specialCharPattern = /[^a-zA-Z0-9\s]/g;

  // Use the match method to find all special characters in the string
  const matches = str.match(specialCharPattern);

  // Join the array of special characters into a single string
  // If no matches are found, return an empty string
  return matches ? matches.join("") : "";
}

export {
  capitalizeWords,
  formatDate,
  shuffleString,
  encodeToBase64,
  extractNumbersFromString,
  extractLinksFromString,
  extractEmailsFromString,
  extractSpecialCharacters,
};
