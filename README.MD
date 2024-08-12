
# FinanceFriend

FinanceFriend is a web application designed to empower users with smart financial management tools, personalized financial planning, comprehensive risk management, and efficient bill analysis. Whether you're just starting your financial journey or looking to optimize your existing financial strategy, FinanceFriend provides the tools and insights you need to make informed decisions and achieve your financial goals.


## Live Demo - https://financefrontend-5nte.onrender.com/


## Built With
- React
- Tailwind CSS
- Node.js
- Express.js
- PostgreSQL


## Installation

#### 1. Get a free API key at https://ai.google.dev/
#### 2. Clone the repo
```bash
  git clone https://github.com/Adi-204/FinanceFriend.git
```
#### 3. Install npm packages in both frontend and backend
```bash
  cd frontend
  npm i 
  cd ../
  cd backend
  npm i
```
#### 4. Set up PostgreSQL:
- In a new terminal 
```bash
  cd backend
  docker-compose up
```
Note - Do not close the docker container

#### 5. Configure environment variables:
- Create a .env file in the frontend and backend directories and add the following variables:
- For Frontend .env
```bash
  VITE_URL=http://localhost:3000
```
- For Backend .env
```bash
  ACCESS_TOKEN_SECRET=your_access_token_secret
  REFRESH_TOKEN_SECRET=your_refresh_token_secret
  GEMINI_API_KEY=your_gemini_key
  connectionString="postgresql://postgres:admin@localhost:5432/testdb"
  PORT=3000
  ORIGIN='http://localhost:5173'
```
#### 6. Run Backend with command
- In a new terminal 
```bash
  cd backend
  npm start
```

#### 7. Run Frontend with command
- In a new terminal 
```bash
  cd frontend
  npm run dev
```

## Usage
- Vist to http://localhost:5173.
- Sign up or log in to your account.
- Provide your personal and financial details as requested.
- View your personalized financial recommendations based on the information provided.
- Update your details or preferences as needed and receive updated recommendations.


## Features

- Smart Financial Assistant - Experience the future of financial management with FinanceFriend's powerful features, Automated Analysis and Prompt Chatbot.
- Personalized Financial Planner - Our Financial Planner feature is your roadmap to achieving your financial goals with clarity and confidence.
- Comprehensive Risk Management - Our platform offers a detailed analysis of various risk factors, including Financial Impact, Health Impact, Legal Impact, and Future Impact, providing you with invaluable insights to guide your decision-making process.
- Efficient Bill Analysis - With our advanced AI-powered technology, simply snap a photo of your bill, and let FinanceFriend do the rest.



## Contributing

- We welcome contributions from the community to enhance FinanceFriend and make it even more valuable for users. If you'd like to contribute, please follow these steps:
 
    #### 1. Fork the repository.
    #### 2. Create a new branch for your feature or bug fix.
    #### 3. Commit your changes and push the branch to your fork.
    #### 4. Submit a pull request with a detailed description of your changes.
  
## Contact

- For questions, feedback, or support, please contact us at adiboghawala@gmail.com.

