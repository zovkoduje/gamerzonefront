import Header from '../components/Header'
import Featured from '../components/Featured'
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { mongooseConnect } from '../lib/mongoose';
import NewProducts from '../components/NewProducts';
import CategoryTiles from '../components/CategoryTiles';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Setting } from '@/models/Setting';



export default function HomePage({featuredProduct,sections}) {
  return(
    <div>
      <Header></Header>
      <Featured product={featuredProduct}></Featured>
      <CategoryTiles categories={sections}></CategoryTiles>
      <NewProducts sections={sections}></NewProducts>
    </div>
  )
}

export async function getServerSideProps(ctx){
  await mongooseConnect();
  const featuredProductSetting= await Setting.findOne({name:'featuredProductId'})
  const featuredProductId=featuredProductSetting.value;
  const featuredProduct= await Product.findById(featuredProductId)

  const mainCategories = await Category.find({parent: null});
  const sections = [];
  for (const category of mainCategories) {
    const products = await Product.find({category: category._id}, null, {sort:{'_id':-1}, limit:4});
    const count = await Product.countDocuments({category: category._id});
    if (!count) continue;
    sections.push({
      _id: category._id,
      name: category.name,
      count,
      image: products[0]?.images?.[0] || null,
      products,
    });
  }
  const session=await getServerSession(ctx.req,ctx.res,authOptions)


  const user = session ? session.user : null;

  return{
    props: {
      featuredProduct:JSON.parse(JSON.stringify(featuredProduct)),
      sections:JSON.parse(JSON.stringify(sections)),
      user,
    },
  };
}
