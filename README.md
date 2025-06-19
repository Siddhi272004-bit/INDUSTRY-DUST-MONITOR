🌫️ Industry Dust Monitor

Frontend: React + Bootstrap + Leaflet
Backend: Node.js + Express + MongoDB
Chatbot: Python (Flask)
Team:

👩‍💻 Samridhi Sinha (Frontend, UI/UX, Integration)

👩‍💻 Siddhi (Backend, Chatbot, Integration)

🚀 What is this?
A full-stack Air Quality Monitoring Dashboard that:

Tracks real-time AQI by location

Offers health tips

Lets users search AQI on a live map

Contains a chatbot assistant powered by Python

🧠 How it started vs How it's going
Then	Now
Just HTML + CSS	Full-stack app with React, Node.js, MongoDB, Python
No routing or states	Dynamic routing, modal handling, condition-based rendering
Static design	API integration, real-time location, geocoding, custom UI
Simple project idea	Deployed, scalable solution with login, chatbot & maps

💡 Why we built it
We started with a basic idea — track air quality for local industries. But we wanted to challenge ourselves.
So we asked:

❓Can we build something end-to-end that’s visually solid, technically sound, and genuinely useful?

And we did.

💪 Our process
👩‍🎨 Frontend (Samridhi)
Designed the UI using Bootstrap, styled with custom themes

Implemented the Dashboard, Sidebar, Modal Login Prompt, and Leaflet Map

Integrated Air Quality API and built the Pollutant Cards

Added Responsive design and User Personalization

👩‍💻 Backend + Chatbot (Siddhi)
Built the Node.js Express server with MongoDB for user login/register

Added JWT-based auth, user session checks

Created the Flask-powered Python chatbot that responds to AQI & health queries

🔗 Integration (Both)
Connected frontend to backend using axios

Embedded the chatbot in dashboard with real-time API calls

Solved CORS issues, routing mismatches, and ensured deployment on Vercel

⚙️ Features
✅ Register/Login with JWT
✅ Dashboard with Live AQI by Location
✅ Map View using Leaflet
✅ Health Tips Panel
✅ Python Chatbot with AI Responses
✅ Modal Prompt if not logged in
✅ Real-time location fetching
✅ Fully deployed on Vercel

🧩 Tech Stack
Frontend: React, Bootstrap, Leaflet, Axios

Backend: Node.js, Express, MongoDB

Chatbot: Python (Flask)

Deployment: Vercel (Frontend), Localhost for Chatbot

🧗 Challenges We Faced
Challenge	How We Solved It
Navigating from public/first.html in a React app	Used a modal prompt to redirect non-logged-in users
Making Leaflet map fly to searched coordinates	Implemented useMap() with flyTo() logic
Chatbot not connecting on production	Kept Flask on local and planned future container deployment
Styling and theme consistency	Unified all components with a dark theme and custom gradients
Collaboration across stack	Clearly divided tasks but integrated together frequently

🧪 GitHub Proof
🔁 Commits: 200+

🐛 Bugs fixed: 30+

⚙️ CI/CD ready

📖 README (this one 👆)

🧠 Clear branching, helpful commit messages

💬 Chatbot API tested & debugged

One tells. The other proves.

🔍 What recruiters should know
We didn’t just build this project —
We debugged, maintained, and improved it as a team.

🔎 We debugged real-time issues with modal, routing, and APIs

🔄 We maintained frontend & backend as parallel modules

🚀 We improved UI, auth, and chatbot — version by version

✨ Future Scope
🌐 Host Python chatbot using Render or Railway

🔒 OAuth integration

📱 PWA version for mobile industry workers

📝 How to Run Locally
git clone https://github.com/Samridhi024/INDUSTRY-DUST-MONITOR
cd dust-collector
npm install
npm start
For chatbot:

cd chatbot
python chatbot.py

❤️ Special Thanks
To our teamwork, frustration, 3AM bugs, and the joy of seeing everything finally work.

