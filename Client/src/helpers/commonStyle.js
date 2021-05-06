import styled from "styled-components";

const ContentWrapper = styled.div`
	background: #fff;
	padding: 24px;
	min-height: 280px;
	margin: 25px;
`;
const TextRight = styled.div`
	text-align: right;
`;
const TextLeft = styled.div`
	text-align: left;
`;
const TextCenter = styled.div`
	text-align: center;
`;

const ErrorBlock = styled.span`
color:red;
`

export {
	ContentWrapper,
	TextRight,
	TextLeft,
	TextCenter,
	ErrorBlock,
};
