import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "helpers/skeleton";
import { Link } from "react-router-dom";
import queActions from "redux/question/actions";
import { Row, Col, Button, Divider } from "antd";
const { getQuestions } = queActions;

export default (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  let { loading, questions } = useSelector((state) => state.question);

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="result">
          <Row gutter={10} justify="left" align="middle">
            <Col span={4}>
              <h2 className="text-center font-weight-normal">Questions List</h2>
            </Col>
            <Col span={4}>
              <Button type="primary">
                <Link
                  to={{
                    pathname: "/admin/addQuestion",
                  }}
                >
                  Add Question
                </Link>
              </Button>
            </Col>
          </Row>
          {questions.map((q, index) => (
            <div key={q._id} className={"mb-2 bg-success"}>
              <div className="result-question">
                <Row gutter={10} justify="left" align="middle">
                  <Col span={4}>
                    <h5>
                      {index + 1}. {q.desc}
                    </h5>
                  </Col>
                  <Col span={4}>
                    <Button type="primary">
                      <Link
                        to={{
                          pathname: "/admin/editQuestion",
                          state: { queID: q._id },
                        }}
                      >
                        Edit Question
                      </Link>
                    </Button>
                  </Col>
                </Row>
                <div className="row">
                  {q.options.map((option) => (
                    <div key={option._id} className="col-6">
                      <input
                        id={option._id}
                        type="checkbox"
                        disabled="disabled"
                      />{" "}
                      {option.desc}
                    </div>
                  ))}
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
