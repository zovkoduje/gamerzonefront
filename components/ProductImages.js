import styled from "styled-components"
import { useState } from "react";
const Image=styled.img`
max-width: 100%;
max-height: 100%;
`;
const BigImage=styled(Image)`
    max-width: 100%;
    max-height: 300px;
`
const ImageButtons=styled.div`
display: flex;
gap: 10px;
margin-top: 10px;
`;
const ImageButton=styled.div`
border: 5px solid #fff;
border-radius: 5px;
height:50px;
padding: 5px;
cursor: pointer;
${props=>props.active ? `
border-color: #ccc;
` : `
border-color: transparent;
opacity: 0.7;
`}
`
const BigImageWrapper=styled.div`
    text-align: center;
`
export default function ProductImages({images}){
    const [activeImage,setActiveImage]=useState(images?.[0]);
    return(
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} alt=""/>
            </BigImageWrapper>
            
            <ImageButtons>
                {images.map(image=>(
                    <ImageButton key={image} active={image===activeImage} onClick={()=>setActiveImage(image)}>
                        <Image src={image} alt=""/>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}
