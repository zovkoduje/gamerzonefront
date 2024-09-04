import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

const Title=styled.h1`
    font-size:1.5em;

`
const CategoryHeader=styled.div`
    display:flex;
    gap:20px;
    align-items:center;
    margin:20px 0;
    justify-content:space-between;
`
const FiltersWrapper=styled.div`
    display:flex;
    gap:15px;
`
const Filter=styled.div`
    background-color: #f0f2f5;
    padding: 5px;
    display:flex;
    gap:10px;
    align-items:center;
    border-radius: 10px;

    select{
        background-color: transparent;
        border:0;
        color:var(--text);
        outline:0;
        font-size:inherit;
    }
`
export default function CategoryPage({category,subCategories,products:originalProducts}){
    const defaultSorting='_id-desc';
    const defaultFilterValues= category.properties.map(p=>({name:p.name,value:'all'}));
    const [products,setProducts]= useState(originalProducts);
    const [selectedFilters, setSelectedFilters]= useState(defaultFilterValues);
    const [sort,setSort]= useState(defaultSorting);
    const [loadingProducts,setLoadingProducts]= useState(false);
    const [filtersChanged,setFiltersChanged]=useState(false)
    function handleFilterChange(filterName,filterValue){
        setSelectedFilters(prev=>{
            return prev.map(p=>({
                name:p.name,
                value:p.name===filterName ? filterValue : p.value
            }))
        })
        setFiltersChanged(true);
    }
    
    useEffect(()=>{
        if (!filtersChanged){
            return;
        }
        setLoadingProducts(true);
        const catIds= [category._id, ...(subCategories?.map(c=>c._id) || []) ]
        const params= new URLSearchParams();
        params.set('categories',catIds.join(','));
        params.set('sort',sort);
        selectedFilters.forEach(f=>{
            if(f.value !== 'all'){
            params.set(f.name,f.value)
            }
        })
        const url= `/api/products?` + params.toString();
        axios.get(url).then(res=>{
            setTimeout(()=>{
                setLoadingProducts(false);
            },500)
            setProducts(res.data);
            
        })

    },[selectedFilters,sort, filtersChanged])
    return(
        <>
            <Header/>
            <Center>
                <CategoryHeader>
                    <h1>{category.name}</h1>
                    <FiltersWrapper>
                        {category.properties.map(prop =>(
                            <Filter key={prop.name}>
                                <span>{prop.name}:</span>
                                <select 
                                value={selectedFilters.find(f=>f.name === prop.name).value} 
                                onChange={ev=>handleFilterChange(prop.name,ev.target.value)}>
                                    <option value="all">All</option>
                                    {prop.values.map(val=>(
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </select>
                            </Filter>
                        ))}
                        <Filter>
                            <span>Sort:</span>
                            <select value={sort} onChange={ev=>{setSort(ev.target.value);setFiltersChanged(true)}}>
                                
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="_id-desc">Latest</option>
                                <option value="_id-asc">Oldest</option>
                            </select>
                        </Filter>
                    </FiltersWrapper>
                    
                </CategoryHeader>
                {loadingProducts &&(
                    <Spinner fullWidth/>
                )}
                {!loadingProducts && (
                    <div>
                        {products.length>0 &&(
                            <ProductsGrid products={products}/>
                        )}
                        {products.length===0 &&(
                            <div>No products found</div>
                        )}

                    </div>
                    
                )}
                
            </Center>
        </>
    )
}

export async function getServerSideProps(context){
    const category= await Category.findById(context.query.id);
    const subCategories= await Category.find({parent:category._id})
    const catIds= [category._id, ...subCategories.map(c=>c._id)]
    const products= await Product.find({category: catIds})
    return{
        props:{
            category: JSON.parse(JSON.stringify(category)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
            products: JSON.parse(JSON.stringify(products)),
        },
    }
}

