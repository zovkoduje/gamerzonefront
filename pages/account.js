import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Input from "@/components/Input";
import { signIn, signOut, useSession } from "next-auth/react";
import GrayBox from "@/components/GrayBox";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import SingleOrder from "@/components/SingleOrder";
import Swal from 'sweetalert2';

const Title=styled.h1`
    font-size:1.5em;

`
const ColsWrapper=styled.div`
    display:grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;
    margin: 40px 0;
`
const StyledInput = styled(Input)`
    width: 100%;
    margin-bottom: 10px;
    box-sizing: border-box;
`;
const CityInput = styled.div`
    display: flex;
    gap: 5px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export default function AccountPage(){
    const {data:session}=useSession();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [city,setCity]=useState('');
    const [postalCode,setPostalCode]=useState('');
    const [streetAddress,setStreetAddress]=useState('');
    const [country,setCountry]=useState('');
    const [phone,setPhone]=useState('');
    const [loaded,setLoaded]=useState(false);
    const [orders,setOrders]=useState([]);
    const [ordersLoaded,setOrdersLoaded]=useState(true);
    async function logout(){
        
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });

    }
    async function login(){
        await signIn('google')
    }
    function saveAddress(){
        const data= {name,email,city,postalCode,streetAddress,country,phone}
        axios.put('/api/address', data);
        }
    useEffect(()=>{
        if (!session){
            return;
            
        }
        setLoaded(false);
        setOrdersLoaded(false);
        
        axios.get('/api/address')
            .then(response => {
                if (response.data) { 
                    setName(response.data.name);
                    setEmail(response.data.email);
                    setCity(response.data.city);
                    setPostalCode(response.data.postalCode);
                    setStreetAddress(response.data.streetAddress);
                    setCountry(response.data.country);
                    setPhone(response.data.phone);
                    setLoaded(true);
                } else {
                    console.error("No data received from API");
                    setLoaded(true); 
                }
            })
            .catch(error => {
                console.error("Error fetching address:", error);
                setLoaded(true);
            });

        // Fetch orders
        axios.get('/api/orders')
            .then(response => {
                setOrders(response.data);
                setOrdersLoaded(true);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setOrdersLoaded(true); 
            });
    }, [session])
    return(
        <>
            <Header/>
            <Center>
                <ColsWrapper>
                <div>
                    <GrayBox>
                        <h2>Orders</h2>
                        {!ordersLoaded &&(
                            <Spinner fullwidth/>
                        )}
                        
                        {ordersLoaded && (
                            <div>
                                {session && orders.length === 0 ? (
                                    <p>No orders yet.<br/> Start shopping now!</p>
                                ) : (
                                    orders.length > 0 && orders.map(o => (
                                        <SingleOrder key={o._id} {...o} />
                                    ))
                                )}
                                {!session && (
                                    <p>Login to see your orders</p>
                                )}
                            </div>
                        )}
                    </GrayBox>
                    
                </div>
                <div>
                    <GrayBox>
                        <h2>Account Information</h2>
                        {!loaded && session &&(
                            <Spinner fullwidth/>
                        )}
                        {loaded && session && (
                            <>
                            <StyledInput type="text" placeholder="Name" value={name} name="name" onChange={e=>setName(e.target.value)} />
                            <StyledInput type="text" placeholder="Email" value={email} name="email" onChange={e=>setEmail(e.target.value)} />
                            <CityInput>
                                <StyledInput type="text" placeholder="City" value={city} name="city" onChange={e=>setCity(e.target.value)} />
                                <StyledInput type="text" placeholder="Postal Code" value={postalCode} name="postalCode" onChange={e=>setPostalCode(e.target.value)} />
                            </CityInput>
                            <StyledInput type="text" placeholder="Address" value={streetAddress} name="address" onChange={e=>setStreetAddress(e.target.value)} />
                            <StyledInput type="text" placeholder="Country" value={country} name="country" onChange={e=>setCountry(e.target.value)} />
                            <StyledInput type="text" placeholder="Phone Number" value={phone} name="phone" onChange={e=>setPhone(e.target.value)} />
                            <Button $block $outline={true} $yellow={true} onClick={() => {
                                saveAddress();
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'Your information has been successfully saved.',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                    confirmButtonColor: 'black',
                                });
                            }} >Save</Button>
                            <hr/>
                            </>
                        )}
                        
                        
                        
                        {session &&(
                            <Button primary onClick={logout} >Logout</Button>
                            )}
                        {!session &&(
                            <Button primary onClick={login}>Login</Button>
                        )}
                            
                    </GrayBox>
                    
                </div>
                
                </ColsWrapper>
               
            </Center>
        </>
    )
}