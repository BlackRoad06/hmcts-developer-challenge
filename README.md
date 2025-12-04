# HMCTS Developer Challenge – Task Creation System

This repository contains my solution for the HMCTS Junior Software Developer coding challenge.  
It includes a simple backend API for creating tasks and a small React frontend that consumes the API.

## 🔧 Tech Stack
- Backend: Node.js, Express, SQLite
- Frontend: React + Vite
- Testing: Jest + Supertest

## 📁 Structure
- `/backend` — Express API for creating tasks  
- `/frontend` — React form UI to submit tasks  

## ▶️ How to Run the Project

### Backend 

API will run at: **http://localhost:3000**

### Frontend

Frontend will run at: **http://localhost:5173**

## 📝 API Endpoint

### POST /api/tasks  
Create a new task.

**Body example:**
{
"title": "Example Task",
"description": "Optional text",
"status": "todo",
"dueDate": "2025-12-31T12:00:00Z"
}


Returns the created task or validation errors.

## ✔️ Notes
- No personal data is included in this repository (name-blind requirement).
- I confirm I have completed the HMCTS developer coding challenge.
