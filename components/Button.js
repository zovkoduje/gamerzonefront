import styled, {css} from "styled-components";

export const ButtonStyle=css`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-flex;
  text-decoration:none;
  
  svg{
    height: 16px;
  }
  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
  }
  ${props=>props.$block && css`
    display: block;
    width: 100%;
  `}
  ${props=>props.$size==='l' && css`
    font-size: 1.2rem;
    padding: 15px 30px;
    svg{
        height:20px;
        margin-right: 5px;
    }
  `}
  ${props => props.$primary && css`
    background-color: #007bff;
    color: #fff;
    border: 1px solid #007bff;
  `}
  ${props => props.$yellow && !props.$outline && css`
    background-color: #ff0;
    color: #000;
    &:hover{
        background-color: #ff0;
        color: #000;
    }
  `}
  ${props => props.$yellow && props.$outline && css`
    background-color: black;
    color: #ff0;
    border: 1px solid #ff0;
     &:hover{
        background-color: #ff0;
        color: #000;
    }
  `}

`
const StyledButton = styled.button`
 ${ButtonStyle}
`;


export default function Button({ children, size, primary, yellow, outline, ...rest }) {
  return <StyledButton $size={size} $primary={primary} $yellow={yellow} $outline={outline} {...rest}>{children}</StyledButton>;
}