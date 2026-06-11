# CarFinder

## Live demo
Frontend: https://carfinder-frontend-gwtc812yt-viveka-ks-projects.vercel.app/
Backend: https://carfinder-backend-zfo1.onrender.com/

## Github
Frontend: https://github.com/Viveka31/carfinder-frontend
Backend: https://github.com/Viveka31/carfinder-backend

## what did i build and why?what did i cut?

I built CarFindr, a car shortlisting web app that helps users move from having too many choices to a confident shortlist

Users enter their budget,usage,family size,fuel preference ,and priorities.The backend processes these preferences against a car dataset ,ranks suitable cars, and provides explanations for the recommendations.

I deliberately scoped this as a short page mvp focusing on the core user journey

Input preferences -> calculate matches -> show shortlist

I cut:
-authentication
-user profiles
-large external car apis
-complex ML models

to prioritize a complete working product within the time limit

## Tech stack and why

Frontend:

-React + vite
-Tailwind css

chosen for fast development and building a responsive UI

Backend:
-Node.js +Express.js

Used to create a lightweight REST API for recommendation processing

-MongoDB

Used to store the car dataset and provide flexible access to car information

Deployment:
-Vercel(Frontend)
-Render(Backend)

## AI tools 

Used AI tools for:
-debugging
-exploring implementation approaches
-improving development speed

Done manually:
-Product decisions
-Feature Scope
-Recommendation logic
-Final implementation

AI tools helped accelerate development ,but the final engineering decisions were made manually

## If I had 4 more hours

I would add:
-Car comparison feature
-saved shortlists
-Improved recommendation weights 
-real images 

