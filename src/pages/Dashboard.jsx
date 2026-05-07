import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchStudents } from "../features/students/studentsSlice";
import { fetchTeachers } from "../features/teachers/teachersSlice";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);

  const teachers = useSelector((state) => state.teachers.teachers);

  const mode = useSelector((state) => state.themes.mode);
  const darkMode = mode === "dark";
  const topStudent = students.reduce(
    (acc, curr) => (curr.marks > (acc?.marks || 0) ? curr : acc),
    null,
  );

  const experiencedTeacher = teachers.reduce(
    (acc, curr) => (curr.experience > (acc?.experience || 0) ? curr : acc),
    null,
  );

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <>
      <div className="container py-5">
        <h1 className="text-center mb-4">School Dashboard</h1>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <p className="lead mb-4 text-center">
            Monitor school performance and manage operations efficiently.
          </p>
        </div>
        {/* Stats Cards */}
        <div className="row g-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className={`card shadow-lg h-100 text-center rounded-4 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-people-fill display-4 text-primary mb-3"></i>
                <h5 className="card-title">Total Students</h5>

                  <h2 className="fw-bold">
                     {students.length}
                  
                  </h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className={`card shadow-lg h-100 text-center rounded-4 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-person-workspace display-4 text-success mb-3"></i>
                <h5 className="card-title">Total Teachers</h5>

                <h2 className="fw-bold">  {teachers.length}
                  {/* <CountUp end={teachers.length} duration={2}/> */}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className={`card shadow-lg  h-100 text-center rounded-4 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-trophy-fill display-4 text-warning mb-3"></i>
                <h5 className="card-title">Top Student</h5>

                <h6 className="mt-2">{topStudent?.name || "-"}</h6>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className={`card shadow-lg  h-100 text-center rounded-4 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-award-fill display-4 text-danger mb-3"></i>
                <h5 className="card-title">Top Teacher</h5>

                <h6 className="mt-2">{experiencedTeacher?.name || "-"}</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-5">
          <Link to="/studentsView">
            <button className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm">
              Manage Students
            </button>
          </Link>

          <Link to="/teachersView">
            <button className="btn btn-success btn-lg rounded-pill px-4 shadow-sm">
              Manage Teachers
            </button>
          </Link>

          <Link to="/schoolView">
            <button
              className={`btn btn-lg rounded-pill px-4 shadow-sm ${darkMode ? "btn-outline-light" : "btn-dark"}`}
            >
              School Analytics
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
