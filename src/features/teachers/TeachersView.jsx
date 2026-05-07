import { Link } from "react-router-dom";
import { fetchTeachers } from "./teachersSlice";

import TeachersList from "./TeachersList";
import { useDispatch, useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const TeachersView = () => {
  const dispatch = useDispatch();
  const { teachers, status, error } = useSelector((state) => state.teachers);
  const location = useLocation();
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
    dispatch(fetchTeachers());
  }, [dispatch]);

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
        <h2 className="my-3">Teachers View</h2>
        <Link to="/addTeacher">
          <button className="btn btn-primary my-3">Add Teacher</button>
        </Link>
      </div>
      <p className="text-muted">Know your teachers.</p>
      <hr />
      {showMessage && location.state?.message && (
        <div className="alert alert-success">{location.state.message}</div>
      )}
      <div>
        <h2>Teachers List</h2>
        {/* Teacher Count */}
        <div className="list-group shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="list-group-item bg-success text-white py-3 border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-semibold">Teacher Directory</h5>

              <span className="badge bg-light text-success fs-6">
                {teachers.length} Teachers
              </span>
            </div>
          </div>
        </div>

        {/* Teacher list */}
        <TeachersList teachers={teachers} />
      </div>
    </div>
  );
};

export default TeachersView;
