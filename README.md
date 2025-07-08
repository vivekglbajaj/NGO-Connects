📘 README.md — StreetLife Tracker
markdown
Copy
Edit
# 🛣️ StreetLife Tracker

StreetLife Tracker is a full-stack web application designed to help NGOs identify and assist homeless individuals. Users can report people in need by uploading images and location, which NGOs and admins can view, manage, and respond to through a secure dashboard.

---

## 🌐 Live Demo

- **Frontend (React)**: [https://streetlife-frontend.vercel.app](https://streetlife-frontend.vercel.app)
- **Backend (Spring Boot on Render)**: [https://ngo-backend-latest-2.onrender.com](https://ngo-backend-latest-2.onrender.com)

---

## 🚀 Features

### 🔍 General
- Anonymous reporting of homeless individuals via form.
- Upload image, location (auto-detected), and notes.

### 🏢 Admin Panel
- View all reports in a sortable table.
- Update status (Pending, In Progress, Resolved, Rejected).
- Filter by status.
- Secure login and logout.

### 🧑‍🤝‍🧑 NGO Panel
- NGO login to view only assigned reports.
- View details, map location, and status of each case.

---

## 🧩 Tech Stack

### 🔹 Frontend
- ReactJS
- TailwindCSS
- Axios
- React Router

### 🔸 Backend
- Java Spring Boot
- Spring Data JPA
- JWT for authentication
- MySQL or H2 DB
- Render (cloud hosting)

---

## 🛠️ Setup Instructions

### 📦 Backend Setup

```bash
cd ngo_backend
mvn clean install
Open application.properties and set:

properties
Copy
Edit
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=root
spring.datasource.password=your_password
frontend.url=http://localhost:3000
Start the app:

bash
Copy
Edit
mvn spring-boot:run
API Base URL will be: http://localhost:8080

🌐 Frontend Setup
bash
Copy
Edit
cd streetlife-client
npm install
Create .env file:

env
Copy
Edit
REACT_APP_API_URL=http://localhost:8080
Run frontend:

bash
Copy
Edit
npm start
🔐 Authentication
Admin/NGO credentials are stored in DB.

Login endpoints return JWT tokens.

Token is stored in localStorage for persistent login.

📁 Project Structure
pgsql
Copy
Edit
streetlife-tracker/
│
├── ngo_backend/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   └── security/
│
├── streetlife-client/
│   ├── components/
│   ├── pages/
│   └── App.jsx
📸 Sample Report Card View

🧠 Future Improvements
Email / WhatsApp notifications to NGOs.

AI model to detect people in need from images.

Admin analytics dashboard.

Multi-NGO coordination and assignment system.

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

🧑‍💻 Developer
Vivek Kumar
CSE-H | B.Tech
Email: vivek@example.com
GitHub: @vivekglbajaj

📄 License
This project is licensed under the MIT License.
