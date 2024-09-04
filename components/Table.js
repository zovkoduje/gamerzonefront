import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
    
    th {
        text-align: left;
        text-transform: uppercase;
        padding: 15px;
        color: #333;
        font-weight: 600;
        background-color: #f8f9fa;
        border-bottom: 2px solid #dee2e6;
    }
    
    td {
        padding: 15px;
        vertical-align: middle;
        background-color: #ffffff;
        border-top: 1px solid #dee2e6;
        border-bottom: 1px solid #dee2e6;
        
        &:first-child {
            border-left: 1px solid #dee2e6;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }
        
        &:last-child {
            border-right: 1px solid #dee2e6;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }
    
    tr:hover td {
        background-color: #f8f9fa;
        transition: background-color 0.3s ease;
    }
`;

export default function Table({ children }) {
    return <StyledTable>{children}</StyledTable>;
}