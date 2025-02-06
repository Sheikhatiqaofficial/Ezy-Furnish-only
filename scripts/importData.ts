// import axios from 'axios';
// import { client } from '@/sanity/lib/client';
// import slugify from 'slugify';

// async function uploadImageToSanity(imageUrl: string): Promise<string|null> {

//   try {
//     // Fetch the image from the URL and convert it to a buffer
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer',timeout: 10000 });
//     const buffer = Buffer.from(response.data);

//     // Upload the image to Sanity
//     const asset = await client.assets.upload('image', buffer, {
//       filename: imageUrl.split('/').pop(), // Extract the filename from URL
//     });

//     // Debugging: Log the asset returned by Sanity
//     console.log('Image uploaded successfully:', asset);

//     return asset._id; // Return the uploaded image asset reference ID
//   } catch (error) {
//     console.error('❌ Failed to upload image:', imageUrl, error);
//     return null
//     //throw error;
//   }
// }

// interface Category {
//   _id?:string,
//   _type?:string,
//   name:string,
//   slug:string
// }

// async function createCategory(category:Category,counter:number) {

//   try {
//     const categoryExist = await client.fetch(`*[_type=="category" && slug==$slug][0]`,{slug:category.slug})
//     if(categoryExist)
//     {
//       return categoryExist._id
//     }
//     const catObj = {
//       _type:"category",
//       _id:category.slug+"-"+counter,
//       name:category.name,
//       slug:category.slug
//     }
//     const response = await client.createOrReplace(catObj)


//     // Debugging: Log the asset returned by Sanity
//     console.log('Category created successfully', response);

//     return response._id; // Return the uploaded image asset reference ID
//   } catch (error) {
//     console.error('❌ Failed to category:', category.name, error);
//     //throw error;
//   }
// }


// async function importData() {
//     try {
//       // Fetch data from external API
//       const response = await axios.get('https://hackathon-apis.vercel.app/api/products');
//       const products = response.data;
//       //console.log(products)
//       let counter=1;
//       // Iterate over the products
//       for (const product of products) {
//         let imageRef = null;
//         let catRef=null;

//         // Upload image and get asset reference if it exists
//         if (product.image) {
//           //imageRef = await uploadImageToSanity(product.imageUrl);
//           imageRef = await uploadImageToSanity(product.image);
//         }

//         if(product.category.name){
//           catRef = await createCategory(product.category,counter)
//         }

//         const sanityProduct = {
//           _id: `product-${counter}`, // Prefix the ID to ensure validity
//           _type: 'product',
//           name: product.name,
//           slug: {
//             _type: 'slug',
//             current: slugify(product.name || 'default-product', {
//               lower: true, // Ensure the slug is lowercase
//               strict: true, // Remove special characters
//             }),
//           },
//           price: product.price,
//           category:{
//             _type: 'reference',
//             _ref:catRef?catRef:undefined
//           },
//           tags: product.tags?product.tags:[],
//           quantity:50,
//           image: imageRef ? {
//             _type: 'image',
//             asset: {
//               _type: 'reference',
//               _ref: imageRef, // Set the correct asset reference ID
//             },
//           } : undefined,
//           description: product.description?product.description: "A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.",
//           features: product.features?product.features: [
//             "Premium material",
//             "Handmade upholstery",
//             "Quality timeless classic",
//           ],
//           dimensions: product.dimensions?product.dimensions : {
//             _type: 'dimensions', // Custom object type for dimensions
//             height: "110cm",
//             width: "75cm",
//             depth: "50cm",
//           }
//         };
//         counter++
//         // Log the product before attempting to upload it to Sanity
//         console.log('Uploading product:', sanityProduct);

//         // Import data into Sanity
//         await client.createOrReplace(sanityProduct);
//         console.log(`✅ Imported product: ${sanityProduct.name}`);
//       }

//       console.log('✅ Data import completed!');
//     } catch (error) {
//       console.error('❌ Error importing data:', error);
//     }
// }

// importData();
import axios from 'axios';
import { client } from './sanityClient';
import slugify from 'slugify';

async function uploadImageToSanity(imageUrl: string): Promise<string | null> {
  try {
    // Fetch the image from the URL and convert it to a buffer
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 10000 });
    const buffer = Buffer.from(response.data);

    // Upload the image to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(), // Extract the filename from URL
    });

    // Debugging: Log the asset returned by Sanity
    console.log('Image uploaded successfully:', asset);

    return asset._id; // Return the uploaded image asset reference ID
  } catch (error) {
    console.error('❌ Failed to upload image:', imageUrl, error);
    return null;
  }
}

interface Category {
  _id?: string;
  _type?: string;
  name: string;
  slug: string;
}

async function createCategory(category: Category, counter: number) {
  try {
    // Check if the category exists
    const categoryExist = await client.fetch(`*[_type=="category" && slug==$slug][0]`, { slug: category.slug });
    if (categoryExist) {
      return categoryExist._id; // If category exists, return its ID
    }

    // Create a new category
    const catObj = {
      _type: 'category',
      _id: `${category.slug}-${counter}`, // Generate category ID
      name: category.name,
      slug: category.slug,
    };

    const response = await client.createOrReplace(catObj);

    // Debugging: Log the category creation response
    console.log('Category created successfully:', response);

    return response._id; // Return the created category ID
  } catch (error) {
    console.error('❌ Failed to create category:', category.name, error);
    return null;
  }
}

async function importData() {
  try {
    // Fetch data from the external API
    const response = await axios.get('https://hackathon-apis.vercel.app/api/products');
    const products = response.data;
    let counter = 1;

    // Iterate over each product
    for (const product of products) {
      let imageRef = null;
      let catRef = null;

      // Upload image and get asset reference if it exists
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      // Create category reference if it exists
      if (product.category?.name) {
        catRef = await createCategory(product.category, counter);
      }

      // Create the product object
      const sanityProduct = {
        _id: `${slugify(product.name || 'default-product')}-${counter}`, // Unique product ID
        _type: 'product',
        name: product.name,
        slug: {
          _type: 'slug',
          current: slugify(product.name || 'default-product', {
            lower: true, // Ensure the slug is lowercase
            strict: true, // Remove special characters
          }),
        },
        price: product.price,
        category: catRef
          ? {
              _type: 'reference',
              _ref: catRef, // Set the category reference
            }
          : undefined,
        tags: product.tags || [],
        quantity: 50, // Default quantity
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef, // Set the image asset reference
              },
            }
          : undefined,
        description:
          product.description ||
          'A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.',
        features: product.features || [
          'Premium material',
          'Handmade upholstery',
          'Quality timeless classic',
        ],
        dimensions:
          product.dimensions || {
            _type: 'dimensions', // Custom object type for dimensions
            height: '110cm',
            width: '75cm',
            depth: '50cm',
          },
      };
      counter++;

      // Log the product before attempting to upload it to Sanity
      console.log('Uploading product:', JSON.stringify(sanityProduct, null, 2));

      // Import the product into Sanity
      await client.createOrReplace(sanityProduct);

      // Log success message
      console.log(`✅ Imported product: ${sanityProduct.name}`);
    }

    console.log('✅ Data import completed!');
  } catch (error) {
    console.error('❌ Error importing data:', error);
  }
}

// Call the importData function
importData();
