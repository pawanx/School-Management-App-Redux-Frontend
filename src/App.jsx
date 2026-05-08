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
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./features/themes/themeSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.themes.mode);

  const darkMode = mode === "dark";

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      data-bs-theme={mode}
      className={
        mode === "dark"
          ? "bg-dark text-light min-vh-100"
          : "bg-light text-dark min-vh-100"
      }
    >
      <BrowserRouter>
        <nav
          className="navbar navbar-expand-lg shadow-lg py-3 sticky-top"
          style={{
            background:
              mode === "dark"
                ? "linear-gradient(90deg, #134e5e, #71b280)"
                : "linear-gradient(90deg, #6baccd, #414345)",
          }}
        >
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              🎓 Student Management App
            </NavLink>
            <div className="navbar-nav me mb-2 mb-lg-0">
              <div
                className={`d-flex align-items-center gap-3 px-4 py-2 rounded-pill shadow-sm ${
                  darkMode ? "bg-dark text-light" : "bg-white text-dark"
                }`}
                style={{
                  backdropFilter: "blur(10px)",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.05)",
                  width: "fit-content",
                }}
              >
                <i className="bi bi-clock-fill text-primary"></i>

                <span className="fw-semibold">
                  {currentTime.toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <span className="text-secondary">|</span>

                <span className="fw-bold text-primary">
                  {currentTime.toLocaleTimeString("en-IN")}
                </span>
              </div>
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
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`btn px-3 py-2 rounded-pill shadow-sm ${
                  mode === "dark"
                    ? "btn-light text-dark"
                    : "btn-dark text-light"
                }`}
              >
                <i
                  className={`bi me-2 ${
                    mode === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill"
                  }`}
                ></i>

                {mode === "dark" ? "Light" : "Dark"}
              </button>
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
    </div>
  );
}

export default App;
