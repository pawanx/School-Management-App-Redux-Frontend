import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTeacher } from "../teachers/teachersSlice";
import { resetStatus } from "../teachers/teachersSlice";
import { useEffect } from "react";

const TeacherDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.teachers);
  const teacher = useSelector((state) =>
    state.teachers.teachers.find((teacher) => teacher._id === id),
  );

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);
  if (!teacher) {
    return (
      <div className="container mt-3">
        <div className="alert alert-warning">Teacher not found or deleted.</div>
      </div>
    );
  }

  const handleDelete = async () => {
    await dispatch(deleteTeacher(teacher._id));

    navigate("/teachersView", {
      state: {
        message: "Teacher deleted Succesfully.",
      },
    });
  };

  return (
    <div>
      {status === "loading" && (
        <div className="alert alert-warning">Deleting Teacher...</div>
      )}
      {status === "success" && (
        <div className="alert alert-success">Teacher deleted successfully.</div>
      )}
      {status === "failed" && <div className="alert alert-danger">{error}</div>}

      <div className="container">
        <h2 className="my-3">Teacher details: </h2>
        <div className="card">
          <div className="card-body">
            <p>
              <span className="fw-bold">Name :</span> {teacher.name}
            </p>
            <p>
              <span className="fw-bold">Age :</span> {teacher.age}
            </p>
            <p>
              <span className="fw-bold">Subject :</span> {teacher.subject}
            </p>
            <p>
              <span className="fw-bold">Experience :</span> {teacher.experience}{" "}
              years
            </p>
          </div>
        </div>
        <div className="mt-3">
          <Link to="/editTeacher" state={teacher}>
            <button className="btn btn-sm btn-primary">Edit</button>
          </Link>

          <button onClick={handleDelete} className="btn btn-sm btn-danger ms-2">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default TeacherDetails;
