// types.ts
export type Category = {
  _id: string;
  name: string;
};

export type Products = {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string; // The URL of the image
    };
  };
  price: number;
  description: string;
  tags: string[];
  features: string[];
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  category:Category ;
  
  slug: {
    current: string; // The slug for the product
  };
  quantity:number;
};
