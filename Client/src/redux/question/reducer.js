import actions from "./actions";

const initState = {
	questions: [],
	loading: false,
	message: null,
	question:{},
};

export default (state = initState, action) => {
	switch (action.type) {
		case actions.GET_QUESTIONS:
			return {
				...state,
				questions: [],
				loading: true,
				message: null,
			};
		case actions.GET_QUESTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				message:null,
				questions: action.payload,
			};
		case actions.GET_QUESTIONS_FAILURE:
			return {
				...state,
				loading: false,
				message: action.payload,
			};
		case actions.GET_QUESTION_BYID:
			return {
				...state,
				loading: true,
				message: null,
			};
		case actions.GET_QUESTION_BYID_SUCCESS:
			return {
				...state,
				loading: false,
				message:null,
				question: action.payload,
			};
		case actions.GET_QUESTION_BYID_FAILURE:
			return {
				...state,
				loading: false,
				message: action.payload,
			};
		case actions.UPDATE_QUESTION:
			return {
				...state,
				loading: true,
				message: null,
			};
		case actions.UPDATE_QUESTION_SUCCESS:
			return {
				...state,
				loading: false,
				message: null,
				//question: action.payload,
			};
		case actions.UPDATE_QUESTION_FAILURE:
			return {
				...state,
				loading: false,
				message: action.payload,
			};				
		default:
			return state;
	}
};
