CivicGrid
Incentivizing Civic Engagement in Urban India 


CivicGrid is a full-stack web platform designed to transform civic duty from a chore into a rewarding and engaging activity. It directly tackles the disconnect between citizens and the upkeep of their local communities in urban India by gamifying and streamlining the process of reporting, verifying, and resolving local civic issues.



🎯 The Problem
In many Indian cities, common civic issues like garbage overflow, potholes, and broken infrastructure are prevalent. Citizens often feel powerless, and existing solutions lack a transparent feedback loop, leading to disengagement and a feeling that reports go unnoticed. These platforms treat the citizen as just a "reporter," not an active participant.



✨ Our Solution
CivicGrid is built on a four-step, continuous engagement loop that incentivizes participation and creates a positive feedback loop for community improvement.


1. 📍 Report & Verify
A user can submit a report of a civic issue (like a pothole) with photos, videos, and its location. To prevent spam, other nearby users can then verify the issue's validity through a simple polling system.


2. 🗺️ Act & Participate
Verified issues appear on a public "Tasks Map" and a task list. This allows motivated users to:

Solve small issues themselves.

Create or join larger community events (like cleanup drives) to tackle bigger problems together.

3. 🏆 Get Recognized & Rewarded
Every positive action—reporting, verifying, solving a task, or joining an event—earns the user "Civic Points".

Points contribute to their rank on a public Leaderboard.

Points can be redeemed for real-world rewards, such as coupons and vouchers from local businesses.

4. 📢 Share & Inspire
The platform includes a public social feed that celebrates achievements (e.g., "Alex earned a new badge!") and user-generated content, creating social proof and encouraging others to join.

🛠️ Tech Stack
This project is a full-stack PERN (PostgreSQL, Express, React, Node.js) application, built with a modern, decoupled architecture. The React frontend communicates with the Express.js backend via a REST API.



Frontend (Client)

Framework: React with Vite 


Language: TypeScript 


Styling: Tailwind CSS (for utility-first, responsive design) 


Mapping: Leaflet with OpenStreetMap (free & open-source) 

Backend (Server)

Runtime: Node.js 


Framework: Express.js (for robust REST APIs) 


Database: PostgreSQL 


ORM: Prisma (for safe and intuitive database access) 

🚀 Getting Started: Running Locally
Here is the full procedure to get the project running on your local machine.

Prerequisites
Git

Node.js (v20+)

npm

1. Clone the Repository
Bash

git clone https://github.com/HarshRanjan7/Civicgrid-The-Civic-Change.git
cd Civicgrid-The-Civic-Change
2. Set Up the Backend
The backend server runs the API and connects to the database.

Bash

# 1. Navigate to the backend folder
cd Backend

# 2. Create the .env file
# (You must create a .env file in this folder and add the
# necessary environment variables for the database, tokens, and Cloudinary)
touch .env

# 3. Install dependencies
npm install

# 4. Generate the Prisma Client
# (This reads your schema.prisma and builds the database client)
npx prisma generate

# 5. Run the database migration
# (This syncs your schema with the database tables)
npx prisma migrate dev

# 6. Start the development server
# (The server will run on http://localhost:5000)
npm run dev
3. Set Up the Frontend
Open a new, separate terminal for the frontend client.

Bash

# 1. Navigate to the client folder (from the root)
cd client

# 2. Install dependencies
npm install

# 3. Start the development server
# (The client will open on http://localhost:5173)
npm run dev
Your application is now fully running!

🔮 Future Plans

Native Mobile App: Package the existing web application into a native Android application using Capacitor for future release on the Play Store.

👥 Contributors

Harsh Ranjan (HarshRanjan7) 
Rishu Raj (RishuPvt)

Institution: Dronacharya Group of Institutions 

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

This README is comprehensive, cites your own presentation for its facts, and (most importantly) includes the correct setup instructions we discovered together.