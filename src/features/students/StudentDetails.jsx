import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "./studentsSlice";
import { resetStatus } from "./studentsSlice";
import { useEffect } from "react";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.students);

  const student = useSelector((state) =>
    state.students.students.find((student) => student._id === id),
  );

  if (!student) {
    return (
      <div className="container mt-3">
        <div className="alert alert-warning">Student not found or deleted.</div>
      </div>
    );
  }

  const handleDelete = () => {
    dispatch(deleteStudent(student._id));

    navigate("/studentsView", {
      state: {
        message: "Student deleted successfully.",
      },
    });
  };

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  return (
    <>
      {status === "loading" && (
        <div className="alert alert-warning">Deleting student...</div>
      )}
      {status === "success" && (
        <div className="alert alert-success">Student deleted successfully.</div>
      )}
      {status === "failed" && <div className="alert alert-danger">{error}</div>}
      <div className="container">
        <h1 className="my-3">Student Details: </h1>
        <div className="card">
          <div className="card-body">
            <p>
              <span className="fw-bold">Name :</span> {student.name}
            </p>
            <p>
              <span className="fw-bold">Age :</span> {student.age}
            </p>
            <p>
              <span className="fw-bold">Grade :</span> {student.grade}
            </p>
            <p>
              <span className="fw-bold">Gender :</span> {student.gender}
            </p>
            <p>
              <span className="fw-bold">Attendance : </span>
              {student.attendance}
            </p>
            <p>
              <span className="fw-bold">Marks : </span>
              {student.marks}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <Link to="/editStudent" state={student}>
            <button className="btn btn-sm btn-primary">Edit</button>
          </Link>

          <button onClick={handleDelete} className="btn btn-sm btn-danger ms-2">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
