const { ObjectId } = require("mongodb");

module.exports = {
  checkId(id) {
    if (!id) throw "Error: You must provide an id to search for";
    if (typeof id !== "string") throw "Error: id must be a string";
    id = id.trim();
    if (id.length === 0)
      throw "Error: id cannot be an empty string or just spaces";
    if (!ObjectId.isValid(id)) throw "Error: invalid object ID";
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (strVal.length < 4)
      throw `Error: Please enter at least 4 characters in ${varName}`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkArray(arr, varName) {
    if (!arr) throw `Error: You must supply a ${varName}!`;
    if (!Array.isArray(arr)) throw `Error: ${varName} must be a string!`;
    if (arr.length === 0) throw `Error: ${varName} cannot be an empty`;
    return arr;
  },

  checkPassword(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (strVal.length < 6)
      throw `Error: Please enter ${varName} at least 6 characters`;
    return strVal;
  },

  hasWhiteSpace(s) {
    var reWhiteSpace = new RegExp("/^s+$/");

    // Check for white space
    if (/^ *$/.test(s)) {
      //alert("Please Check Your Fields For Spaces");

      return true;
    }

    return false;
  },

  checkComments(commentValue) {
    if (typeof commentValue !== "string") throw `Comment is not a string!!`;
    commentValue = commentValue.trim();
    if (commentValue.length === 0)
      throw `Error!! Comment cannot just contain spaces`;
    if (commentValue.length < 4)
      throw `Error!! Comment should have atleast 4 characters!!`;
    if (!isNaN(commentValue))
      throw `Error!! Comment cannot contain only digits!!!`;
    return commentValue;
  },

  validateEmail(input) {
    var validRegex = ('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (input.value.match(validRegex)) {
      alert("Valid email address!");
      //document.form1.text1.focus();
      return true;
    } else {
      alert("Invalid email address!");
      //document.form1.text1.focus();
      return false;
    }
  }
  


};
