import { useState } from "react";
import schema from "../utility/validation/schema";
import { validator, inputFileValidator } from "../utility/validation/validator";

const useForm = (data) => {
  const [inputData, setInputData] = useState({ ...data });
  const [errors, setErrors] = useState({});
  let doSubmitCallBack = () => {};

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    const { error, deny } = validator({
      data: { ...inputData, [name]: value },
      key: [name],
      ...schema[name]
    });

    if (deny) return;

    setErrors((prev) => ({ ...prev, [name]: error }));
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const updateInputData = (data) => {
    const omitErrors = {};
    const dataArr = Object.keys(data);

    if (dataArr.length === 0) {
      setErrors(omitErrors);
      setInputData(data);
    } else {
      dataArr.forEach((key) => (omitErrors[key] = ""));
      setErrors((prev) => ({ ...prev, ...omitErrors }));
      setInputData((prev) => ({ ...prev, ...data }));
    }
  };
 
  const eliminateInputData = ({ field, fields }) => {
    setInputData((prev) => {
      const clonedInputData = { ...prev };
      if (field) {
        delete clonedInputData[field];
      }else if (fields) {
        fields.forEach((field) => delete clonedInputData[field]);
      }

      return clonedInputData;
    });
  };

  const handleFileUpload = ({ currentTarget }) => {
    const { name } = currentTarget;
    const { file, error } = inputFileValidator({
      currentTarget,
      ...schema[`${name}Preview`]
    });
    if (!file && !error) return;

    setErrors((prev) => ({ ...prev, [name + "Preview"]: error }));

    if (error) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setInputData((prev) => ({
        ...prev,
        [name]: file,
        [name + "Preview"]: reader.result
      }));
    };
  };

  const validateFields = () => {
    const newErrors = {};

    Object.keys(inputData).forEach((key) => {
      const { error } = validator({
        data: { ...inputData },
        key,
        ...schema[key]
      });
      newErrors[key] = error;

      if (!error) delete newErrors[key];
    });
    return newErrors;
  };

  const handleSubmit = (evt) => {
    if(evt) evt.preventDefault();
    const newErrors = validateFields();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    doSubmitCallBack();
  };

  const doSubmit = (callbackFn) => {
    doSubmitCallBack = callbackFn;
  };

  return {
    inputData,
    errors,
    handleChange,
    handleFileUpload,
    handleSubmit,
    updateInputData,
    eliminateInputData,
    doSubmit
  };
};

export default useForm;
