import { HashLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper=styled.div`
    ${props=>props.fullWidth ? `
    display: block;
    display: flex;
    justify-content: center;
    ` : `
    `}
`;
export default function Spinner({fullWidth}){
    return (
        <Wrapper fullWidth={fullWidth}>
            <HashLoader color={"#000"} speedMultiplier={2}/>
        </Wrapper>
        
    )
}