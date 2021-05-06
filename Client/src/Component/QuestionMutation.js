import React from "react";
import * as Yup from "yup";
import { ErrorBlock } from "helpers/commonStyle";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import { Row, Col, Button, Input, Form } from "antd";

const question = {
  desc: "",
  options: [
    {
      desc: "",
    },
    {
      desc: "",
    },
    {
      desc: "",
    },
  ],
};

const validation = Yup.object().shape({
  desc: Yup.string().required("Please provide qustion."),
  user: Yup.string(),
  options: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string(),
        question: Yup.string(),
        desc: Yup.string().required("Please provide option."),
      })
    )
    .required("Must have option")
    .min(3, "Minimum of 3 options"),
});

export default ({ handleSubmit, initialValues, label, operation }) => {
  const initValue = initialValues || question;

  return (
    <div>
      <h1>{label}</h1>
      <Formik
        initialValues={initValue}
        onSubmit={handleSubmit}
        validationSchema={validation}
        render={({ handleSubmit, handleChange, errors, values }) => (
          <Form layout="vertical" onSubmit={handleSubmit}>
            <Row gutter={10} justify="left" align="left">
              <Col span={8}>
                <Form.Item label="Question">
                  <div>
                    <Input
                      style={{ width: "90%" }}
                      name="desc"
                      value={values.desc}
                      onChange={handleChange}
                      placeholder="Please enter question"
                    />
                    <ErrorMessage component={ErrorBlock} name="desc" />
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <FieldArray
              name="options"
              render={(arrayHelpers) => (
                <div>
                  {values.options && values.options.length > 0 ? (
                    values.options.map((option, index) => (
                      <div key={index}>
                        <div>
                          <Field name={`options.${index}.desc`} />
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </Button>
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")}
                          >
                            +
                          </Button>
                        </div>
                        <ErrorMessage
                          component={ErrorBlock}
                          name={`options[${index}].desc`}
                        />
                      </div>
                    ))
                  ) : (
                    <Row gutter={5} justify="left" align="left">
                      <Col span={8}>
                        <Button
                          type="primary"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add Options
                        </Button>
                      </Col>
                    </Row>
                  )}
                  <Row
                    gutter={5}
                    justify="left"
                    align="left"
                    style={{ marginTop: "20px" }}
                  >
                    <div style={{ color: "red" }}>
                      {`${
                        values.options.length < 3
                          ? "Minimum 3 option required"
                          : ""
                      }`}
                    </div>
                  </Row>
                  <Row
                    gutter={5}
                    justify="left"
                    align="left"
                    style={{ marginTop: "20px" }}
                  >
                    <Col span={8}>
                      <Button type="primary" onClick={handleSubmit}>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  );
};
