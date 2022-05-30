const schema = {
  primaryEmail: {
    isRequired: true,
    label: "Primary Email",
    string: { isEmail: true, min: 5, max: 50 }
  },

  secondryEmail: {
    isRequired: true,
    label: "Secondry Email",
    string: { isEmail: true, min: 5, max: 50 },
    compareWith: {
      label: "Primary Email",
      key: "primaryEmail",
      shouldSame: false
    }
  },

  fullName: {
    isRequired: true,
    label: "Full Name",
    string: { isAlphaOnly: true, exact: 5 }
  },

  userName: {
    isRequired: true,
    label: "User Name",
    string: { isAlphaNum: true, noWhiteSpace: true, min: 5, max: 20 }
  },

  oldPassword: {
    isRequired: true,
    label: "Old Password",
    string: { noWhiteSpace: true }
  },

  newPassword: {
    isRequired: true,
    label: "New Password",
    string: { noWhiteSpace: true, passwordStrength: "medium" },
    compareWith: {
      label: "Old Password",
      key: "oldPassword",
      shouldSame: false
    }
  },

  confirmPassword: {
    isRequired: true,
    label: "Confirm Password",
    compareWith: {
      label: "New Password",
      key: "newPassword",
      shouldSame: true
    }
  },

  age: {
    isRequired: true,
    label: "Age",
    number: { isNumOnly: true, min: 12, max: 100 }
  },

  profilePicPreview: {
    isRequired: true,
    label: "Profile Picture",
    maxFileSize: 2,
    accept: ["jpg", "jpeg", "png"]
  },

  mobile: {
    isRequired: true,
    label: "Mobile",
    mobile: { digits: 10, startWith: [6, 7, 8, 9] }
  },

  url: {
    isRequired: true,
    label: "URL",
    string: { isURL: true, min: 5 }
  }
};

export default schema;
