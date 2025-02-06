// // sanityClient.ts
// import { createClient } from '@sanity/client';
// import dotenv from "dotenv"

// dotenv.config()
// export const client = createClient({
//   projectId: "069qbsbt", // Replace with your project ID
//   dataset: 'production',        // Or your dataset name
//   apiVersion: '2024-01-04',     // Today's date or latest API version
//   useCdn: false,                // Disable CDN for real-time updates
//   token:"skqGUnsjIh5sPtZ47VyPDL8Oo9Zs35OK0KMREk0JyqDdd5HrJCIoZhLKkj1u1QxVQeVnXHIaDE9LnPQwcCqfgebWJ9IpAX9VjyIX8BQQFv0Q3grs3ZgmJYmL1DfoJs1SEQT4TXZTUK4hD59BSdNkKqcywn9uZEoKEYlGwxSGnWdZ2Eyei5KU",
// });
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

export const client = createClient({
  projectId:'069qbsbt', // Use the environment variable
  dataset: 'production',
  apiVersion: '2024-01-04',
  useCdn: true,
  token: 'sk1xGR9bIlAdBYx3HSz56PqUcmHjMTY8PmHH0a1WFn2bNW6W3FPGEFy3msWzljBxyWZg55Odkc1xDyF36x0XQQVlcMnRU95FxkoCQiCbqkzIAZ7Xgy55mBfkj1cNF0hm7e4NTk1yKFmpNL3RWpxh4AGX3hb7afQJHCUBEaKCw653x3lP9jtY'  // Use the token from the environment
});
