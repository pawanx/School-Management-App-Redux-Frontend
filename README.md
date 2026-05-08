# School Management App using Redux toolkit – Frontend
> A modern School Management frontend application built using React, Redux Toolkit, React Router, Bootstrap, and Axios. This application helps manage students, teachers, classes, school statistics, and dashboard analytics through a clean and responsive interface.

---

# Features

## Dashboard
- Overview cards for :
  - Total students.
  - Total teachers.
  - School statistics.
- Live date and time display
- Responsive dashboard

# Student View
- View all students
- Add new students
- Update student details
- Delete students
- Filter students by gender
- Sort students by different fields
- Student detail page
- Class-wise student view

## Teacher View
- View all teachers
- Add new teachers
- Update teacher details
- Delete teachers

## School View
- School analytics and statistics
- Top student and teacher tracking
- Aggregated data using Redux selectors

## Routing
- Dynamic routing with React Router
- Protected and structured page navigation
- Nested routing support

## State Management
- Centralized state management using Redux Toolkit
- Async API handling using createAsyncThunk
- Efficient state updates with slices

## UI/UX
- Bootstrap-based responsive design
- Dark mode support
- Interactive cards
- Reusable components

---

# Tech Stack

## Frontend
- React
- Redux Toolkit
- React Router DOM
- Bootstrap
- Axios

## Backend (Connected API)
- Node.js
- Express.js
- MongoDB
- Mongoose

# Folder Structure

```bash
src/
│
├── app/
│   └── store.js
│
├── components/
│
├── features/
│   ├── students/
│   ├── teachers/
│   ├── school/
│
├── pages/dashboard
│
├── App.jsx
├── main.jsx
└── index.css
```

# Live Demo
[View Live Project](https://school-management-app-redux-fronten.vercel.app)
