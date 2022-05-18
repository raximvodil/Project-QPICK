import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, editCategory } from "../../../../actions";
import FormInputs from "../../../../components/FormInputs/FormInputs";
import {
  createControl,
  validate,
  validateForm,
} from "../../../../form/formFramework";

import "./Form.scss";

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState({
    isFormValid: false,
    formControls: {
      name: createControl(
        {
          type: "text",
          label: "Name",
          errorMessage: "Введите корректный name",
        },
        { required: true }
      ),
      img: createControl(
        {
          type: "file",
          label: "Image",
          errorMessage: "Введите корректный image",
        },
        { required: true }
      ),
    },
  });

  const category = useSelector((state) =>
    id ? state.categories.find((c) => c._id === id) : null
  );

  useEffect(() => {
    if (category)
      setCategoryData({
        isFormValid: false,
        formControls: {
          name: createControl(
            {
              type: "text",
              label: "Name",
              errorMessage: "Введите корректный name",
            },
            { required: true },
            category.name
          ),
          img: createControl(
            {
              type: "file",
              label: "Image",
              errorMessage: "Введите корректный image",
            },
            { required: true },
            category.img
          ),
        },
      });
  }, [category]);

  const onChangeHandler = (event, controlName) => {
    const formControls = { ...categoryData.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    setCategoryData({ formControls, isFormValid: validateForm(formControls) });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      name: categoryData.formControls.name.value,
      img: categoryData.formControls.img.value,
    };

    if (id) {
      dispatch(editCategory(id, data));
    } else {
      dispatch(createCategory(data));
    }

    navigate("/admin/category/control");
    clear();
  };

  const clear = () => {
    setCategoryData({
      isFormValid: false,
      formControls: {
        name: createControl(
          {
            type: "text",
            label: "Name",
            errorMessage: "Введите корректный name",
          },
          { required: true }
        ),
        img: createControl(
          {
            type: "file",
            label: "Image",
            errorMessage: "Введите корректный image",
          },
          { required: true }
        ),
      },
    });
  };

  return (
    <div className="Form">
      <form className="create_form" onSubmit={submitHandler}>
        <h3>{id ? "Edit Category" : "Create Category"}</h3>
        <FormInputs form={categoryData} onChangeHandler={onChangeHandler} />
        <div className="form_button">
          <button
            className="submit_button"
            disabled={!categoryData.isFormValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
