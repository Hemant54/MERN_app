import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Skeleton from "helpers/skeleton";
import { EditQuestion } from "./edit.style";
import QuestionMutation from "Component/QuestionMutation";
import queActions from "redux/question/actions";
const { getQuestionById, updateQuestionById } = queActions;

export default (props) => {
  const dispatch = useDispatch();
  let location = useLocation();
  const { queID } = location.state;

  useEffect(() => {
    dispatch(getQuestionById(queID));
  }, [dispatch]);

  let { loading, question } = useSelector((state) => state.question);
  const handleSubmit = (data) => {
    console.log('data ->', data)
    dispatch(updateQuestionById(data));
  };

  return (
    <EditQuestion>
      {loading ? (
        <Skeleton />
      ) : (
        <QuestionMutation
          handleSubmit={handleSubmit}
          label="Edit Question"
          initialValues={question[0]}
          operation="EDIT"
        />
      )}
    </EditQuestion>
  );
};
