export const validator = (received) => {
  // along with 	data key

  /* schema part
	label
  isRequired
	string:{isAlphaNum,isAlphaOnly,noWhiteSpace,isUpperCase,isLowerCase,min,max,exact,isEmail,isURL,passwordStrength:medium|strong}
	number : {isNumOnly,min,max}
	compareWith:{label,key,shouldSame}
	*/

  const { isRequired, number, string, mobile, compareWith, ...rest } = received;
  const errorObj = { error: "", deny: false };
  const { data, key } = rest;
  const value = typeof data[key] === "string" ? data[key].trim() : data[key];

  if (compareWith)
    validateComparison({ value, errorObj, data, ...compareWith });
  if (mobile) validateMobile({ value, errorObj, ...mobile, ...rest });
  if (number) validateNumber({ value, errorObj, ...number, ...rest });
  if (string)
    validateString({ value: String(value), errorObj, ...string, ...rest });
  if (isRequired && !value) errorObj.error = `is required.`;

  if (errorObj.error) errorObj.error = `${rest.label} ${errorObj.error}`;
  if (!isRequired && !value) errorObj.error = "";

  return errorObj;
};

// regex
const numRegex = /^[0-9]+$/;
const alphaRegex = /^[A-Za-z ]+$/;
const lowerCaseRegex = /^[a-z ]+$/;
const upperCaseRegex = /^[A-Z ]+$/;
const noSpaceRegex = /^\S*$/;
const alphaNumRegex = /^[a-z \d\-_\s]+$/i;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const mediumPassStrengthRegex = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);
const strongPassStrengthRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

// helper fn
const isLowerUpperCaseBoth = (value) =>
  value.toLowerCase() === value || value.toUpperCase() === value;

const validateMobile = (testData) => {
  const { value, digits, startWith, errorObj } = testData;
  const numString = String(value);

  if (numString && !numString.match(numRegex)) {
    errorObj.deny = true;
  }

  if (numString.length < digits) {
    errorObj.error = `should be of ${digits} digts.`;
  } else if (digits < numString.length) {
    errorObj.deny = true;
  }

  if (numString && !startWith.includes(+numString[0])) {
    errorObj.error = `should start with ${startWith.join(" or ")}.`;
  }
};

const validateNumber = (testData) => {
  const { value, isNumOnly, errorObj, min, max } = testData;

  if (value < min) {
    errorObj.error = `shouldn't be lesser than ${min}.`;
  } else if (max < value) {
    errorObj.error = `shouldn't be greater than ${max}.`;
    errorObj.deny = true;
  }

  if (min && max && !(min <= value && value <= max)) {
    errorObj.error = `should be in between ${min} and ${max}.`;
  }

  if (isNumOnly && value && !value.match(numRegex)) {
    errorObj.deny = true;
  }
};

const validateString = (testData) => {
  const {
    errorObj,
    value,
    isAlphaOnly,
    isAlphaNum,
    noWhiteSpace,
    isLowerUpperCase,
    isUpperCase,
    isLowerCase,
    passwordStrength,
    min,
    max,
    exact,
    data,
    key,
    isEmail,
    isURL
  } = testData;

  if (isURL && !value.match(urlRegex)) errorObj.error = `is not valid.`;

  if (isEmail && !emailRegex.test(value)) errorObj.error = `is not valid.`;

  if (value.length < min) {
    errorObj.error = `shouldn't contain less than ${min} characters.`;
  } else if (value.length > max) {
    errorObj.error = `shouldn't contain more than ${max} characters.`;
    errorObj.deny = true;
  } else if (value.length < exact) {
    errorObj.error = `should be equal to ${exact} characters.`;
  } else if (data[key].length > exact) {
    errorObj.deny = true;
  }

  if (min && max && !(min <= value.length && value.length <= max)) {
    errorObj.error = `should be in between ${min} and ${max} characters.`;
  }

  if (isLowerCase && !value.match(lowerCaseRegex)) {
    errorObj.error = `should contain only lower case.`;
    errorObj.deny = true;
  } else if (isUpperCase && !value.match(upperCaseRegex)) {
    errorObj.error = `should contain only upper case.`;
    errorObj.deny = true;
  } else if (isLowerUpperCase && isLowerUpperCaseBoth(value)) {
    errorObj.error = `should contain both lower case and upper case.`;
  }

  if (value && isAlphaOnly && !value.match(alphaRegex)) {
    errorObj.error = `should contain only alphabets.`;
    errorObj.deny = true;
  } else if (value && isAlphaNum && !value.match(alphaNumRegex)) {
    errorObj.error = `should contain only alphabets and numbers.`;
    errorObj.deny = true;
  }

  if (passwordStrength === "medium" && !mediumPassStrengthRegex.test(value)) {
    errorObj.error = `length should be 6 or more and combination of any two [A-Z], [a-z] & [0-9]`;
  }

  if (passwordStrength === "strong" && !strongPassStrengthRegex.test(value)) {
    errorObj.error = `length should be 8 or more and combination of [A-Z], [a-z], [0-9] & [!@#$%^&*].`;
  }

  if (noWhiteSpace && !data[key].match(noSpaceRegex)) {
    errorObj.error = `shouldn't contain white space.`;
    errorObj.deny = true;
  }
};

const dateValidator = ({ format, value, errorObj }) => {
  const formates = [
    "DD-MM-YYYY",
    "YYYY-MM-DD",
    "YYYY-DD-MM",
    "DD/MM/YYYY",
    "YYYY/MM/DD",
    "YYYY/DD/MM"
  ];

  const sepBy = ["/", "-"];

  const getDay = (month, year) => {
    const dayArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    let day = dayArr[month - 1];
    if (month === 2 && isLeapYear) return day + 1;
    return day;
  };

  if (formates.includes(format)) {
    sepBy.forEach((sep) => {
      if (
        format.includes(sep) &&
        value.includes(sep) &&
        value.filter((_) => _ === sep).length === 2
      ) {
        const formatArr = format.split(sep);
        const valueArr = value.split(sep);

        const DD = valueArr[formatArr.indexOf("DD")];
        const MM = valueArr[formatArr.indexOf("MM")];
        const YYYY = valueArr[formatArr.indexOf("YYYY")];

        if ((1 > MM || MM > 12) && (1 > DD || DD > getDay(MM, YYYY))) {
          errorObj.error = "is invalid.";
        }
      }
    });
  }
};

const validateComparison = (testData) => {
  const { label, key, shouldSame, value, data, errorObj } = testData;
  const compareWithValue = data[key]?.trim();

  if (!compareWithValue) return;

  if (shouldSame) {
    if (value !== compareWithValue)
      errorObj.error = `should be same as ${label}.`;
  } else {
    if (value === compareWithValue)
      errorObj.error = `shouldn't be same as ${label}.`;
  }
};

export const inputFileValidator = ({ currentTarget, accept, maxFileSize }) => {
  const { files } = currentTarget;
  const file = files[0];

  const data = { file, error: "" };

  if (!file) return data;

  const extLen = accept.length;

  if (accept && !isValidExtension({ fileType: file.type, accept })) {
    data.error = `Not a valid file extension. Accepted file extension${
      extLen > 1 ? "s" : ""
    } ${extLen > 1 ? "are" : "is"} ${accept.join(" , ")}`;
    return data;
  }

  if (maxFileSize && file.size / 1024 > maxFileSize * 1024) {
    data.error = `File size is greater than ${maxFileSize} MB.`;
  }

  return data;
};

const isValidExtension = ({ fileType, accept }) => {
  const typeArr = fileType.split("/");

  for (let i = 0; i < typeArr.length; ++i)
    for (let j = 0; j < accept.length; ++j)
      if (typeArr[i].includes(accept[j])) return true;

  return false;
};
