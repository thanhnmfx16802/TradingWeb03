function addDotsToPrice(price) {
  // Convert the price to a string 12.345
  let numString;
  if (typeof price === "number") {
    numString = price.toString();
  } else {
    numString = price;
  }

  // Initialize an empty result string
  let result = "";

  // Iterate through the string from right to left
  for (let i = numString.length - 1; i >= 0; i--) {
    // Add the current character to the result
    result = numString[i] + result;

    // Add a dot after every 3 characters (except for the first group)
    // Quy luật để xác định được 3 số từ phải sang trái là length - index = 3
    if ((numString.length - i) % 3 === 0 && i !== 0) {
      result = "." + result;
    }
  }

  return result + " VND";
}
export default addDotsToPrice;
