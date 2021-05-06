import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "helpers/skeleton";
import { AddQuestion } from "./add.style";
import QuestionMutation from "Component/QuestionMutation";
import queActions from "redux/question/actions";
const { addQuestion } = queActions;

export default (props) => {
  const dispatch = useDispatch();
  const handleSubmit = (data) => {
    dispatch(addQuestion(data));
  };
  let { loading } = useSelector((state) => state.question);
  return (
    <AddQuestion>
      {loading ? (
        <Skeleton />
      ) : (
        <QuestionMutation
          handleSubmit={handleSubmit}
          label="Add Question"
          operation="ADD"
        />
      )}
    </AddQuestion>
  );
};
