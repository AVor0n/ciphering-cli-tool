module.exports = function isEnglishLetter(char) {
  const charCode = char.charCodeAt(0);

  if (65 <= charCode && charCode <= 90)
    // A-Z
    return true;

  if (97 <= charCode && charCode <= 122)
    // a-z
    return true;

  return false;
};
