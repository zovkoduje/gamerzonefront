/* eslint-disable react/jsx-key */
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import styled from "styled-components";
import Link from "next/link";



const Title=styled.h1`
    font-size:1.5em;

`
const Grid=styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap:30px;
    @media screen and (max-width:768px){
        grid-template-columns: 1fr 1fr;
    }
`
const CategoryTitle=styled.div`
    margin-top:10px;
    margin-bottom:10px;
    font-weight:bold;
    display:flex;
    align-items:center;
    gap:20px;
    font-size:1.5em;
    a{
        color:black;
        font-size:0.7em;
    }
`
const CategoryWrapper=styled.div`
    margin-bottom:40px;
`
const ShowMore=styled(Link)`
    display:block;
    height:160px;
    border-radius:10px;
    border:2px solid black;
    color:black;
    font-size:1em;
    background-color:#f0f2f5;
    display:flex;
    justify-content:center;
    align-items:center;
    text-decoration:none;
`
export default function CategoriesPage({mainCategories, categoriesProducts}) {
    return(
        <>
            <Header />
            <Center>
                {mainCategories.map(cat=>(
                    <CategoryWrapper>
                        <CategoryTitle>
                            {cat.name}
                            <div> <Link href={'/category/'+cat._id}>Show more</Link></div>
                        </CategoryTitle>
                        
                        <Grid>
                            {categoriesProducts[cat._id].map(p=>(
                                <ProductBox {...p} key={p._id}/>
                            ))}
                            <ShowMore href={'/category/'+cat._id}>
                                Show more &rarr;
                            </ShowMore>
                            
                        </Grid>
                    </CategoryWrapper>
                ))}
            </Center>
        </>
    );
}


export async function getServerSideProps(){
    const categories = await Category.find()
    const mainCategories = categories.filter(c=>!c.parent)
    const categoriesProducts={};
    for (const mainCat of mainCategories){
        const mainCatId=mainCat._id.toString()
        const childCatIds= categories.filter(c=>c.parent?.toString() == mainCatId).map(c=>c._id.toString())
        const categoriesIds= [mainCatId, ...childCatIds]
        const products = await Product.find({category: categoriesIds},null,{limit:3, sort:{'_id':-1}})
        categoriesProducts[mainCat._id]=products
    }
    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
        }
    }
}