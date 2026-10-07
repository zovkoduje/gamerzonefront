import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";
import Link from "next/link";


const Grid=styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap:20px;
    @media screen and (max-width:768px){
        grid-template-columns: 1fr 1fr;
        gap:10px;
    }
`
const CategoryTitle=styled.div`
    display:flex;
    align-items:baseline;
    justify-content:space-between;
    margin: 40px 0 20px;
    h2{
        font-size:2rem;
        font-weight:600;
        margin:0;
    }
    a{
        color:#555;
        text-decoration:none;
        &:hover{
            color:#000;
            text-decoration:underline;
        }
    }
`
const ShowMore=styled(Link)`
    height:242px;
    box-sizing:border-box;
    border-radius:10px;
    background-color:#111;
    color:#fff;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:6px;
    text-decoration:none;
    transition: background-color 0.2s ease, transform 0.2s ease;
    &:hover{
        background-color:#222;
        transform: translateY(-2px);
    }
    strong{
        font-size:1.3rem;
    }
    span{
        color:#ff0;
        font-size:0.9rem;
    }
    @media screen and (max-width:768px){
        height:172px;
    }
`
export default function CategoriesPage({mainCategories, categoriesProducts, categoriesCounts}) {
    return(
        <>
            <Header />
            <Center>
                {mainCategories.map(cat=>(
                    <div key={cat._id}>
                        <CategoryTitle>
                            <h2>{cat.name}</h2>
                            <Link href={'/category/'+cat._id}>Show all &rarr;</Link>
                        </CategoryTitle>
                        <Grid>
                            {categoriesProducts[cat._id].map(p=>(
                                <ProductBox {...p} key={p._id}/>
                            ))}
                            <ShowMore href={'/category/'+cat._id}>
                                <strong>View all</strong>
                                <span>{categoriesCounts[cat._id]} {cat.name.toLowerCase()} &rarr;</span>
                            </ShowMore>
                        </Grid>
                    </div>
                ))}
            </Center>
        </>
    );
}
export async function getServerSideProps(){
    await mongooseConnect();
    const categories = await Category.find()
    const mainCategories = categories.filter(c=>!c.parent)
    const categoriesProducts={};
    const categoriesCounts={};
    for (const mainCat of mainCategories){
        const mainCatId=mainCat._id.toString()
        const childCatIds= categories.filter(c=>c.parent?.toString() == mainCatId).map(c=>c._id.toString())
        const categoriesIds= [mainCatId, ...childCatIds]
        const products = await Product.find({category: categoriesIds},null,{limit:3, sort:{'_id':-1}})
        categoriesProducts[mainCat._id]=products
        categoriesCounts[mainCat._id]=await Product.countDocuments({category: categoriesIds})
    }
    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
            categoriesCounts,
        }
    }
}
