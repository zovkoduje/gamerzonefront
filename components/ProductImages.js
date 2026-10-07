import styled from "styled-components"
import { useState } from "react";
const Image=styled.img`
max-width: 100%;
max-height: 100%;
object-fit: contain;
`;
const BigImage=styled(Image)`
    max-width: 100%;
    max-height: 400px;
`
const ImageButtons=styled.div`
display: flex;
gap: 10px;
margin-top: 20px;
justify-content: center;
`;
const ImageButton=styled.div`
border: 2px solid #fff;
border-radius: 8px;
height:60px;
padding: 5px;
cursor: pointer;
${props=>props.$active ? `
border-color: #007bff;
` : `
border-color: #e2e4e8;
opacity: 0.7;
`}
`
const BigImageWrapper=styled.div`
    text-align: center;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export default function ProductImages({images}){
    const [activeImage,setActiveImage]=useState(images?.[0]);
    return(
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} alt=""/>
            </BigImageWrapper>

            {images?.length > 1 && (
                <ImageButtons>
                    {images.map(image=>(
                        <ImageButton key={image} $active={image===activeImage} onClick={()=>setActiveImage(image)}>
                            <Image src={image} alt=""/>
                        </ImageButton>
                    ))}
                </ImageButtons>
            )}
        </>
    )
}
