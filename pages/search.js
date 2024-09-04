import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";


const SearchInput = styled(Input)`
  padding: 5px 10px;
  font-size: 2rem;
`
const InputWrapper= styled.div`
  position:sticky;
  top:70px;
  margin: 20px 0;
  padding: 5px 0;
  text-align:center;
  justify-content:center;
  `
export default function SearchPage(){
    const [phrase,setPhrase]=useState('')
    const [products,setProducts]=useState([])
    const debouncedSearch= useCallback(debounce(searchProducts,500),[])
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
        if (phrase.length>0){
            setIsLoading(true);
            debouncedSearch(phrase);
            
        }else{
            setProducts([]);
        }
    },[phrase])
   
    function searchProducts(phrase){
        axios.get('/api/products?phrase='+encodeURIComponent(phrase)).then(
            response=>{
                setProducts(response.data);
                setIsLoading(false);
            }
        )
    }
    return(
        <>
            <Header/>
            <Center>
                <InputWrapper>
                    <SearchInput autoFocus
                    value={phrase}
                    onChange={ev=>setPhrase(ev.target.value)}
                    placeholder="Search for products"></SearchInput>
                </InputWrapper>
                
                {!isLoading && phrase !=='' && products.length===0 &&(
                    <h2>No products found for {phrase}</h2>
                )}
                {isLoading && (
                    <Spinner fullWidth/>
                )}
                {!isLoading && products.length>0  &&(
                    <ProductsGrid products={products}></ProductsGrid>
                )}
                
            </Center>
            
        </>
    )
}               