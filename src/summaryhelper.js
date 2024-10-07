function countSentences(text) {
  // Regular expression to match sentence-ending punctuation
  const sentenceEndings = /[.!?]/g;

  // Split the text based on the sentence-ending punctuation
  const sentences = text.split(sentenceEndings);

  // Filter out any empty strings from the array
  const filteredSentences = sentences.filter(
    (sentence) => sentence.trim().length > 0
  );

  return filteredSentences.length;
}

function countstatement(text) {
  // Split the text based on newline characters
  const sentences = text.split("\n");

  // Filter out any empty strings from the array
  const filteredSentences = sentences.filter(
    (sentence) => sentence.trim().length > 0
  );

  // Return the number of sentences
  return filteredSentences.length;
}

function averageWordLength(text) {
  // Split the text into words using spaces as delimiters
  const words = text.split(/\s+/);

  // Filter out any empty strings from the array
  const filteredWords = words.filter((word) => word.trim().length > 0);

  // Calculate the total length of all words
  const totalLength = filteredWords.reduce((sum, word) => sum + word.length, 0);

  // Calculate the average word length
  const averageLength =
    filteredWords.length > 0 ? totalLength / filteredWords.length : 0;

  return averageLength.toFixed(2);
}

function countQuestionMarks(text) {
  // Initialize a counter
  let count = 0;

  // Iterate over each character in the string
  for (let char of text) {
    // Check if the character is a question mark
    if (char === "?") {
      count++;
    }
  }

  return count;
}

function countSpecialCharacters(text) {
  // Regular expression to match special characters
  const specialCharRegex = /[^a-zA-Z0-9\s]/g;

  // Match the special characters in the string
  const matches = text.match(specialCharRegex);

  // Return the number of special characters
  // If no matches are found, return 0
  return matches ? matches.length : 0;
}

function calculateReadingTimeFast(text) {
  const wordsPerMinuteFast = 300;
  const words = text.split(/\s+/).length;
  const minutes = words / wordsPerMinuteFast;
  return minutes.toFixed(2);
}

function calculateReadingTimeSlow(text) {
  const wordsPerMinuteSlow = 150;
  const words = text.split(/\s+/).length;
  const minutes = words / wordsPerMinuteSlow;
  return minutes.toFixed(2);
}

export {
  countSentences,
  countstatement,
  averageWordLength,
  countQuestionMarks,
  countSpecialCharacters,
  calculateReadingTimeFast,
  calculateReadingTimeSlow,
};
