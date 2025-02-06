# Marketplace Project

## Project Description
This is a marketplace platform where users can browse products, add them to the cart, and proceed to checkout. The project includes features like product listing, user authentication, and secure API communication.


## Technologies Used
- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js
- **Database**: Sanity CMS
- **Hosting**: Vercel
- **Testing**: Lighthouse, Postman
- **Version Control**: Git, GitHub


## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Sheikhatiqaofficial/hackathon-e-commerce-latest.git

   cd marketplace-project

npm install

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
API_KEY=your_api_key

npm run dev

## Deployment Instructions

This project is deployed on Vercel. Follow these steps to deploy:

1. Push your code to GitHub (ensure that all changes are committed).

2. Connect your GitHub repository to Vercel.
   - Go to Vercel dashboard and link your GitHub repository.
   - Set up the build settings (e.g., `next build`).

3. Add the necessary environment variables to Vercel:
   - In the Vercel dashboard, go to **Environment Variables** and add your environment variables (e.g., `NEXT_PUBLIC_SANITY_PROJECT_ID`, `API_KEY`).

4. Deploy the application.
   - Vercel will handle the deployment automatically after the connection.

5. Once deployed, you can access the marketplace at the provided staging URL.

Make sure to test the application in this **staging environment** before going to production.


## Testing

The following tests were conducted to ensure the application works as expected:

### Functional Testing

- **Postman**: Used to test API responses and interactions.

### Performance Testing
- **Lighthouse**: Used to analyze the performance, load time, and responsiveness of the site.

### Security Testing
- Validated input fields to prevent XSS/SQL injection attacks.
- Ensured that HTTPS is enabled and API keys are securely managed.

All tests were documented in a CSV file for reference.

You can run the tests locally by using:
```bash
npm run test


## Environment Management

In the project, we have used multiple environments to test and deploy the marketplace. Below is a description of each environment:

- **TRN (Training)**: Used for onboarding and practice.
- **DEV (Development)**: The environment for local development and testing code.
- **SIT (System Integration Testing)**: Used to validate integration with external systems.
- **UAT (User Acceptance Testing)**: Allows stakeholders to test functionality and ensure all requirements are met.
- **PROD (Production)**: The live, customer-facing version of the app.
- **DR (Disaster Recovery)**: A backup environment in case of any issues with the main production environment.

The marketplace is deployed in the **UAT** (staging) environment for pre-production testing.


## Known Issues / Pending Work

- The product filtering feature needs further optimization to handle large product data.

- Security measures for the checkout process are still under review.

- Some responsiveness issues on mobile devices.

These issues will be addressed in future updates.


## Acknowledgments

- Thanks to the Vercel team for providing excellent hosting services.
- Special thanks to the developers of Lighthouse for the amazing testing tools.
