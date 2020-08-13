//jshint esversion:6
exports.getLongDate = function () {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return today.toLocaleDateString("en-US", options);
};

exports.getShortDate = function () {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options);
};

exports.getLongDay = function () {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
  };

  return today.toLocaleDateString("en-US", options);
};
