import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { useSession } from "next-auth/react";

const ColumnsWrapper = styled.div`
    display: grid;
    gap: 40px;
    margin-top: 40px;
    
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.3fr 0.7fr;
    }
`;

const Box = styled.div`
    background-color: #f0f2f5;
    border: 2px solid black;
    border-radius: 10px;
    padding: 30px;
    
    @media screen and (max-width: 768px) {
        padding: 20px;
    }
`;

const ProductInfoBox = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;
const ProductImageBox = styled.div`
    width: 80px;
    height: 80px;
    padding: 5px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
`;
const ProductTitle = styled.span`
    font-weight: 500;
`;
const QuantityBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const QuantityButton = styled.button`
    background-color: #f0f0f0;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #e0e0e0;
    }
`;
const CityInput = styled.div`
    display: flex;
    gap: 5px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const SuccessBox = styled.div`
  background-color: #f0f2f5;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  max-width: 600px;
  margin: 40px auto;
`;

const SuccessIcon = styled.div`
  color: #4CAF50;
  font-size: 48px;
  margin-bottom: 20px;
`;

const SuccessTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.p`
  color: #666;
  margin-bottom: 30px;
`;

const SuccessButton = styled(Button)`
  margin-top: 20px;
  background-color: black;
  color: yellow;
  border: 2px solid black;
  transition: all 0.3s ease;
  font-weight: 700;

  &:hover {
    background-color: yellow;
    color: black;
  }
`;

const StyledInput = styled(Input)`
    width: 100%;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

export default function CartPage(){
    const {cartProducts, addProduct,removeProduct, clearCart}=useContext(CartContext);
    const {data:session}=useSession();
    const [products,setProducts]=useState([]);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [city,setCity]=useState('');
    const [postalCode,setPostalCode]=useState('');
    const [address,setAddress]=useState('');
    const [country,setCountry]=useState('');
    const [phone,setPhone]=useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if(window?.location.href.includes('success')){
            setIsSuccess(true);
            clearCart();
        }
        
    }, [clearCart]);
    useEffect(()=>{
        if (!session){
            return;
        }
        axios.get('/api/address').then(response=>{
            setName(response.data.name);
            setEmail(response.data.email);
            setCity(response.data.city);
            setPostalCode(response.data.postalCode);
            setAddress(response.data.streetAddress);
            setCountry(response.data.country);
            setPhone(response.data.phone);
        })
    },[session])

    useEffect(()=>{
        if(cartProducts.length>0){
            axios.post('/api/cart',{ids:cartProducts})
            .then(response=>{
                setProducts(response.data);
            })
        }else{
            setProducts([]);
        }
    },[cartProducts]);


    function moreOfThisProduct(productId){
        addProduct(productId);
    }
    function lessOfThisProduct(productId){
        removeProduct(productId);
    }
    async function goToPayment(){
        const response=await axios.post('/api/checkout',{
            name,
            email,
            city,
            postalCode,
            address,
            country,
            phone,
            cartProducts,
        })
        if (response.data.url){
            window.location.href=response.data.url;
        }
    }
    
    let total=0;
    for(const productId of cartProducts){
        const price=products.find(p=>p._id===productId)?.price||0;
        total+=price;
    }
    if (isSuccess){
        return(
            <>
                <Header/>
                <Center>
                    <SuccessBox>
                        <SuccessIcon>✅</SuccessIcon>
                        <SuccessTitle>Payment Successful!</SuccessTitle>
                        <SuccessMessage>
                            Thank you for your purchase. Your order has been processed successfully.
                        </SuccessMessage>
                        <SuccessButton onClick={() => {clearCart(); window.location.href = '/'}}>
                            Continue Shopping
                        </SuccessButton>
                    </SuccessBox>
                </Center>
            </>
        )
    }
    return(
       <>
        <Header/>
        <Center>
            <ColumnsWrapper>
                <Box>
                    <h2>Cart</h2>
                    {!cartProducts?.length && (
                        <div>Your cart is empty</div>
                    )}
                    {products?.length>0 && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr> 
                            </thead>
                            <tbody>
                                {products.map(product=>{
                                    return(
                                        <tr key={product._id}>
                                            <td>
                                                <ProductInfoBox>
                                                    <ProductImageBox>
                                                        <img src={product.images[0]} alt="" />
                                                    </ProductImageBox>
                                                    <ProductTitle>{product.title}</ProductTitle>
                                                </ProductInfoBox>
                                            </td>
                                            <td>
                                                <QuantityBox>
                                                    <QuantityButton onClick={()=>lessOfThisProduct(product._id)}>-</QuantityButton>
                                                    <span>{cartProducts.filter(id=> id===product._id).length}</span>
                                                    <QuantityButton onClick={()=>moreOfThisProduct(product._id)}>+</QuantityButton>
                                                </QuantityBox>
                                            </td>
                                            <td>{cartProducts.filter(id=> id===product._id).length *product.price}€ </td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                                    <td style={{ fontWeight: 'bold' }}>{total}€</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                    
                </Box>
                {!!cartProducts?.length &&(
                    <Box>
                        <h2>Order Summary</h2>
                        <StyledInput type="text" placeholder="Name" value={name} name="name" onChange={e=>setName(e.target.value)} />
                        <StyledInput type="text" placeholder="Email" value={email} name="email" onChange={e=>setEmail(e.target.value)} />
                        <CityInput>
                            <StyledInput type="text" placeholder="City" value={city} name="city" onChange={e=>setCity(e.target.value)} />
                            <StyledInput type="text" placeholder="Postal Code" value={postalCode} name="postalCode" onChange={e=>setPostalCode(e.target.value)} />
                        </CityInput>
                        <StyledInput type="text" placeholder="Address" value={address} name="address" onChange={e=>setAddress(e.target.value)} />
                        <StyledInput type="text" placeholder="Country" value={country} name="country" onChange={e=>setCountry(e.target.value)} />
                        <StyledInput type="text" placeholder="Phone Number" value={phone} name="phone" onChange={e=>setPhone(e.target.value)} />
                        <Button $block $primary onClick={goToPayment}>Checkout</Button>
                        
                    </Box>
                )}
                
            </ColumnsWrapper>
        </Center>
       </>
    )
}