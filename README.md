# AI Product Card Generator

## Project Overview
Product Card Generator is a web application that uses AI to generate attractive product titles, descriptions, and keywords based on the product name and category entered by the user.

## Features
- Enter product name.
- Select product category.
- Generate product details using an AI REST API.
- Display AI-generated title, description, and keywords.
- Loading indicator during AI generation.
- Error handling for API failures.
- Product card UI.

## Technologies Used
- React.js
- JavaScript
- CSS
- Node.js
- Express.js
- Groq AI REST API
- Vite

## Project Structure

product-card-ai/

├── server/
│    └── index.js

├── src/
│   ├── App.jsx
│   ├── App.css
│   └── index.css

├── .env
├── .gitignore
├── package.json

└── README.md


## Installation and Setup

### 1. Clone or download the project
Open the project folder in your terminal.

### 2. Install dependencies

npm install

### 3. Configure environment variables
Create a `.env` file in the project root:

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
PORT=5000


Replace `your_groq_api_key` with your own API key. Never commit this file to a public repository.

### 4. Start the backend

npm run server


### 5. Start the frontend
Open another terminal and run:

npm run dev


Open the local URL displayed by Vite in your browser.

## How to Use
1. Enter a product name.
2. Select a category.
3. Click Generate Details.
4. Wait for the AI response.
5. View the generated product title, description, and keywords.

## AI Integration
The application sends product information to a Node.js Express backend. The backend communicates with the Groq AI REST API and returns structured JSON containing the generated product details.
