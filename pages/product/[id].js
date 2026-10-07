import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import styled from "styled-components";
import Link from "next/link";
import ProductImages from "@/components/ProductImages";
import ProductsGrid from "@/components/ProductsGrid";
import Button from "@/components/Button";
import CartIcon from "@/icons/CartIcon";
import { CartContext } from "@/components/CartContext";
import { useContext } from "react";
import formatPrice from "@/lib/formatPrice";


const Breadcrumbs=styled.div`
    margin-top: 30px;
    font-size: 0.9rem;
    color: #777;
    a{
        color: #777;
        text-decoration: none;
        &:hover{
            color: #000;
            text-decoration: underline;
        }
    }
    span{
        margin: 0 8px;
    }
`
const ColWrapper=styled.div`
    display:grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap:50px;
    margin-top: 20px;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 25px;
    }
`
const ImageBox=styled.div`
    background-color: #fff;
    border: 1px solid #e2e4e8;
    border-radius: 12px;
    padding: 30px;
`
const Eyebrow=styled(Link)`
    color: #888;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.8rem;
    text-decoration: none;
`
const Title=styled.h1`
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.15;
    margin: 8px 0 15px;
    @media (max-width: 768px) {
        font-size: 1.7rem;
    }
`
const Price=styled.div`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 20px;
`
const Description=styled.p`
    color: #444;
    line-height: 1.6;
    margin: 25px 0 0;
`
const SpecsTitle=styled.h2`
    font-size: 1.1rem;
    margin: 30px 0 10px;
`
const Specs=styled.table`
    width: 100%;
    border-collapse: collapse;
    td{
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    td:first-child{
        color: #777;
        width: 40%;
    }
    td:last-child{
        font-weight: 500;
    }
`
const RelatedTitle=styled.h2`
    font-size: 1.6rem;
    font-weight: 600;
    margin: 60px 0 0;
`

export default function ProductPage({product, category, related}){
    const {addProduct}=useContext(CartContext);
    const properties = Object.entries(product.properties || {})
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    return(
        <>
            <Header/>
            <Center>
                <Breadcrumbs>
                    <Link href="/">Home</Link><span>/</span>
                    {category && (<><Link href={'/category/'+category._id}>{category.name}</Link><span>/</span></>)}
                    {product.title}
                </Breadcrumbs>
                <ColWrapper>
                    <ImageBox>
                        <ProductImages key={product._id} images={product.images}/>
                    </ImageBox>
                    <div>
                        {category && <Eyebrow href={'/category/'+category._id}>{category.name}</Eyebrow>}
                        <Title>{product.title}</Title>
                        <Price>{formatPrice(product.price)}</Price>
                        <Button $primary $size="l" onClick={()=>addProduct(product._id)}><CartIcon/>Add to cart</Button>
                        <Description>{product.description}</Description>
                        {properties.length > 0 && (
                            <>
                                <SpecsTitle>Specifications</SpecsTitle>
                                <Specs>
                                    <tbody>
                                        {properties.map(([key, value]) => (
                                            <tr key={key}>
                                                <td>{key}</td>
                                                <td>{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Specs>
                            </>
                        )}
                    </div>
                </ColWrapper>
                {related.length > 0 && (
                    <>
                        <RelatedTitle>More {category?.name?.toLowerCase() || 'products'}</RelatedTitle>
                        <ProductsGrid products={related}/>
                    </>
                )}
            </Center>
        </>
    )}


    export async function getServerSideProps(context){
        await mongooseConnect();
        const product=await Product.findById(context.query.id);
        const category = product.category ? await Category.findById(product.category) : null;
        const related = product.category
            ? await Product.find({category: product.category, _id: {$ne: product._id}}, null, {sort:{'_id':-1}, limit:4})
            : [];
        return {
            props:{
                product:JSON.parse(JSON.stringify(product)),
                category:category ? JSON.parse(JSON.stringify({_id:category._id, name:category.name})) : null,
                related:JSON.parse(JSON.stringify(related)),
            }
        }
    }
