import {mongooseConnect} from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
const stripe=require('stripe')(process.env.STRIPE_SK)

export default async function handler(req,res){
    if (req.method !== 'POST'){
        res.json('should be a POST request');
        return;
    }
    await mongooseConnect();
    const {name,email,city,postalCode,address,country,phone,cartProducts}=req.body
    const productsIds=cartProducts
    const uniqueIds=[...new Set(productsIds)]
    const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

    let line_items=[];
    for (const productId of uniqueIds){
        const info=productsInfos.find(p=>p._id.toString()===productId)
        const quantity=productsIds.filter(id=>id===productId)?.length || 0;
        if (quantity>0 && info){
            line_items.push({
                quantity,
                price_data:{
                    currency:'EUR',
                    product_data:{
                        name: info.title},
                    unit_amount:info.price*100,
                },
            })
        }
    } 

    const session= await getServerSession(req,res,authOptions)

    const orderDoc=await Order.create({
        line_items,
        name,
        email,
        city,
        postalCode,
        address,
        country,
        phone,
        userEmail:session?.user?.email,
    })

    const stripeSession=await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        customer_email:email,
        success_url:process.env.PUBLIC_URL+'/cart?success=1',
        cancel_url:process.env.PUBLIC_URL+'/cart?canceled=1',
        metadata:{orderId:orderDoc._id.toString()},
    })

    res.json({url:stripeSession.url})
    
}



