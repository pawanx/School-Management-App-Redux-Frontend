import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import StudentView from "./features/students/StudentView";
import StudentDetails from "./features/students/StudentDetails";
import StudentForm from "./features/students/StudentForm";

import ClassView from "./features/students/ClassView";

import SchoolView from "./features/school/SchoolView";

import TeacherForm from "./features/teachers/TeacherForm";
import TeachersList from "./features/teachers/TeachersList";
import TeachersView from "./features/teachers/TeachersView";
import TeacherDetails from "./features/teachers/TeacherDetails";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            🎓 Student Management App
          </NavLink>
          <div className="navbar-nav me mb-2 mb-lg-0">
            <NavLink
              to="/studentsView"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-bold text-warning"
                  : "nav-link text-light"
              }
            >
              Student
            </NavLink>
            <NavLink
              to="/teachersView"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-bold text-warning"
                  : "nav-link text-light"
              }
            >
              Teacher
            </NavLink>
            <NavLink
              to="/classView"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-bold text-warning"
                  : "nav-link text-light"
              }
            >
              Classes
            </NavLink>
            <NavLink
              to="/schoolView"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-bold text-warning"
                  : "nav-link text-light"
              }
            >
              School
            </NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/studentsView" element={<StudentView />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/editStudent" element={<StudentForm />} />
        <Route path="/addStudent" element={<StudentForm />} />
        <Route path="/classView" element={<ClassView />} />
        <Route path="/schoolView" element={<SchoolView />} />
        <Route path="/teachersView" element={<TeachersView />} />
        <Route path="/addTeacher" element={<TeacherForm />} />
        <Route path="/teacher/:id" element={<TeacherDetails />} />
        <Route path="/editTeacher" element={<TeacherForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
