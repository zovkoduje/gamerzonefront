import { rest } from "lodash";
import styled from "styled-components";

const StyledOrder=styled.div`
    display:flex;
    gap:20px;
    margin: 5px 0;
    padding: 5px 0;
    border-bottom: 1px solid black;
    align-items:center;

    time{
        font-size: 1rem;
        font-weight: bold;
    }
`
const ProductRow=styled.div`
    span{
    color:#aaa;
    }

`
const Address=styled.div`
    font-size:.8rem;
    line-height:.8rem;
    margin-top:5px;

`
export default function SingleOrder({line_items, createdAt,...rest}) {
    return (
        <StyledOrder>
            <div>
                <time>{(new Date(createdAt)).toLocaleDateString('hr-HR')}</time>
                <Address>
                    {rest.name}<br/>
                    {rest.address}<br/>
                    {rest.postalCode}<br/>
                    {rest.city}

                </Address>
            </div>

            <div>
                {line_items.map(item => (
                    <ProductRow key={item.price_data.product_data.name}>
                        <span>{item.quantity} x</span>  
                        {item.price_data.product_data.name}
                    </ProductRow>
                ))}
            </div>
            
            
        </StyledOrder>
    ); 
}