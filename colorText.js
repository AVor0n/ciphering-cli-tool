module.exports = String.prototype.color = function (color) {
  const str = this + "\x1b[0m";
  switch (color) {
    case "black":
      return "\x1b[30m" + str;
    case "red":
      return "\x1b[31m" + str;
    case "green":
      return "\x1b[32m" + str;
    case "yellow":
      return "\x1b[33m" + str;
    case "blue":
      return "\x1b[34m" + str;
    case "magenta":
      return "\x1b[35m" + str;
    case "cyan":
      return "\x1b[36m" + str;
    case "white":
      return "\x1b[37m" + str;
    default:
      return str;
  }
};
