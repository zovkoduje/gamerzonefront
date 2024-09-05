import Header from '../components/Header'
import Featured from '../components/Featured'
import { Product } from '../models/Product';
import { mongooseConnect } from '../lib/mongoose';
import NewProducts from '../components/NewProducts';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Setting } from '@/models/Setting';



export default function HomePage({featuredProduct,newProducts}) {
  return(
    <div>
      <Header></Header>
      <Featured product={featuredProduct}></Featured>
      <NewProducts products={newProducts}></NewProducts>
    </div>
  )
}

export async function getServerSideProps(ctx){
  await mongooseConnect(
  );
  const featuredProductSetting= await Setting.findOne({name:'featuredProductId'})
  const featuredProductId=featuredProductSetting.value;
  const featuredProduct= await Product.findById(featuredProductId)
  const newProducts= await Product.find({}, null, {sort:{'_id':-1}, limit:12});
  const session=await getServerSession(ctx.req,ctx.res,authOptions)

  
  const user = session ? session.user : null;

  return{
    props: {
      featuredProduct:JSON.parse(JSON.stringify(featuredProduct)),
      newProducts:JSON.parse(JSON.stringify(newProducts)),
      user, 
    },
  };
}