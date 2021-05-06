import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ErrorBlock } from "helpers/commonStyle";

const { Title } = Typography;

const validation = Yup.object().shape({
  email: Yup.string().email().required("Please provide email address."),
  password: Yup.string().required("Please provide password."),
});

export default ({ handleSubmit, title, link, buttonTitle }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validation}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values }) => (
        <div>
          <Title level={2} style={{ textAlign: "center" }}>
            {title}
          </Title>
          <Row type="flex" justify="center" align="middle">
            <Col lg={7} md={7} sm={10} xs={20}>
              <Form onSubmit={handleSubmit}>
                <Input
                  style={{ marginTop: 12 }}
                  placeholder="Email address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                />
                <ErrorMessage component={ErrorBlock} name="email" />
                <Input
                  style={{ marginTop: 12 }}
                  className="form-group"
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  onChange={handleChange}
                  type="password"
                />
                <ErrorMessage component={ErrorBlock} name="password" />
                <Button
                  style={{ marginTop: 12 }}
                  block
                  type="primary"
                  onClick={handleSubmit}
                >
                  {buttonTitle}
                </Button>
                <Link to={link.to}>{link.desc}</Link>
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </Formik>
  );
};
