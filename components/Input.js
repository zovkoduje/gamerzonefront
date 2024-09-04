import styled from "styled-components";

const StyledInput = styled.input`
  width: 86%;
  padding: 12px 12px;
  margin-bottom: 10px;
  font-size: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;

   &:focus {
    border-color: #000000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #bbb;
  }
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}