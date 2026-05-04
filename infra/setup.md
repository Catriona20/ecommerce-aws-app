# Infrastructure Setup Guide

This document outlines the steps to deploy the **Ecomm Lite** application using AWS services.

## 1. Cognito User Pool Setup
- Go to the **Amazon Cognito** console.
- Create a new **User Pool**.
- Configure sign-in with **Email**.
- In **App Clients**, add a new client:
    - Set name to `ecomm-lite-web`.
    - Disable "Generate client secret" (required for frontend JS).
- Note down:
    - **User Pool ID**
    - **App Client ID**

## 2. Backend (Elastic Beanstalk)
- Go to **AWS Elastic Beanstalk**.
- Create a new application named `ecomm-lite-api`.
- Create a new environment:
    - Environment Tier: **Web server environment**.
    - Platform: **Node.js**.
- Configure Environment Variables:
    - `PORT`: `8080` (EB default)
    - `COGNITO_USER_POOL_ID`: (Your ID)
    - `COGNITO_CLIENT_ID`: (Your Client ID)
    - `AWS_REGION`: (e.g., `us-east-1`)
- Zip and upload the `backend/` folder (excluding `node_modules`).

## 3. Frontend (S3 + CloudFront)
- **S3 Bucket**:
    - Create a bucket for the frontend (e.g., `ecomm-lite-frontend-bucket`).
    - Enable **Static Website Hosting**.
- **Build Frontend**:
    - Set environment variables in a `.env` file (local or via build tool):
      ```
      VITE_COGNITO_USER_POOL_ID=your_id
      VITE_COGNITO_CLIENT_ID=your_client_id
      ```
    - Run `npm run build`.
    - Upload contents of `dist/` to the S3 bucket.
- **CloudFront**:
    - Create a **CloudFront Distribution**.
    - Origin Domain: Select your S3 bucket website endpoint.
    - Viewer Protocol Policy: **Redirect HTTP to HTTPS**.
    - Default Root Object: `index.html`.
    - For SPA routing, configure **Error Pages**:
        - 404 Error -> Response Page Path: `/index.html`, Status Code: 200.

## 4. API Connectivity
- Ensure the backend URL is correctly configured in the frontend application (usually via an environment variable).
