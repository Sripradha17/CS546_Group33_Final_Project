const { ObjectId } = require('mongodb');

module.exports = {
  checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0)
      throw 'Error: id cannot be an empty string or just spaces';
    if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;

    if (strVal.length < 4)
      throw `Error: Please enter at least 4 characters in ${varName}`;

    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkPassword(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;

    if (strVal.length < 6)
      throw `Error: Please enter ${varName} at least 6 characters`;

    return strVal;
  },
  hasWhiteSpace(s) {
    var reWhiteSpace = new RegExp("/^\s+$/");

    // Check for white space
    if (/^ *$/.test(s)) {
      //alert("Please Check Your Fields For Spaces");
     
      return true;
    }

    return false;
  }

};
