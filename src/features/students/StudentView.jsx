import { useSelector, useDispatch } from "react-redux";

import { fetchStudents } from "./studentsSlice";
import { Link } from "react-router-dom";
import StudentList from "./StudentList";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const StudentView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { students, status, error } = useSelector((state) => state.students);
  const [showMessage, setShowMessage] = useState(!!location.state?.message);
  useEffect(() => {
    if (location.state?.message) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);
  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2 className="my-3">Student View</h2>

        <Link to="/addStudent">
          <button className="btn btn-primary my-3">Add Student</button>
        </Link>
      </div>
      <p className="text-muted">Know your students.</p>
      <hr />
      {showMessage && location.state?.message && (
        <div className="alert alert-success">{location.state.message}</div>
      )}

      {/* Student count */}
      <div className="list-group mb-4 shadow-sm rounded-2 overflow-hidden">
        <div className="list-group-item bg-primary text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-semibold">Student Directory</h5>

            <span className="badge bg-light text-primary fs-6">
              {students.length} Students
            </span>
          </div>
        </div>
      </div>

      {/* Student List */}
      <StudentList students={students} />
    </div>
  );
};
export default StudentView;
