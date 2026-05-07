import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchStudents } from "../features/students/studentsSlice";
import { fetchTeachers } from "../features/teachers/teachersSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);

  const teachers = useSelector((state) => state.teachers.teachers);

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

        {/* Stats Cards */}
        <div className="row g-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow border-0 h-100 text-center rounded-4">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Total Students</h5>

                <h2>{students.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow border-0 h-100 text-center rounded-4">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Total Teachers</h5>

                <h2>{teachers.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow border-0 h-100 text-center rounded-4">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Top Student</h5>

                <h6 className="mt-2">{topStudent?.name || "-"}</h6>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow border-0 h-100 text-center rounded-4">
              <div className="card-body d-flex flex-column justify-content-center">
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
            <button className="btn btn-dark btn-lg rounded-pill px-4 shadow-sm">
              School Analytics
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
