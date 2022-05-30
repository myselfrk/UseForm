import React, { useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Media,
  FormGroup,
  Label,
  FormText,
  Button
} from "reactstrap";
import InputFormGroup from "../../commonComponent/inputFormGroup";
import useForm from "../../useFormHook";
import imgPlaceholder from "./../../assets/img/imgPlaceholder.jpg";

function DemoForm() {
  const defaultState = {
    primaryEmail: "",
    secondryEmail: "",
    fullName: "",
    userName: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePic: "",
    profilePicPreview: "",
    age: "",
    url: "",
    exp1: "",
    exp2: "",
    mobile: ""
  };

  const profilePicRef = useRef();

  const {
    inputData,
    errors,
    handleChange,
    handleFileUpload,
    handleSubmit,
    updateInputData,
    eliminateInputData,
    doSubmit
  } = useForm(defaultState);

  useEffect(() => {
    updateInputData({ fullName1: "Rohit Kumar" });
  }, []);

  useEffect(() => {
    eliminateInputData({ fields: ["exp1", "exp2"] });
  }, []);

  doSubmit(() => {
    console.log(inputData);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <InputFormGroup
            name="primaryEmail"
            type="email"
            placeholder="Enter a primary email"
            label="Primary Email"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <InputFormGroup
            name="secondryEmail"
            type="email"
            placeholder="Enter a secondry email"
            label="Secondry Email"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <InputFormGroup
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <InputFormGroup
            name="userName"
            label="User Name"
            placeholder="Enter a user name"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <InputFormGroup
            name="oldPassword"
            label="Old Password"
            placeholder="Enter your old Password"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <InputFormGroup
            name="newPassword"
            label="New Password"
            placeholder="Enter your new Password"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <InputFormGroup
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your confirm Password"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <FormGroup>
            <input
              type="file"
              name="profilePic"
              accept=".jpeg,.jpg,.png"
              className="d-none"
              ref={profilePicRef}
              onChange={handleFileUpload}
            />
            <Label>Upload your profile picture</Label>
            <div>
              <Media
                className="rounded cursor-pointer"
                object
                src={inputData.profilePicPreview || imgPlaceholder}
                alt="profile pic"
                height="150"
                width="150"
                onClick={() => profilePicRef.current.click()}
              />
            </div>
            <FormText color="danger">{errors.profilePicPreview}</FormText>
          </FormGroup>

          <InputFormGroup
            name="age"
            label="Age"
            placeholder="Enter your age"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <InputFormGroup
            name="mobile"
            label="Mobile"
            placeholder="Enter a mobile"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <InputFormGroup
            name="url"
            label="URL"
            placeholder="Enter the url"
            inputData={inputData}
            errors={errors}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-center">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}

export default DemoForm;
