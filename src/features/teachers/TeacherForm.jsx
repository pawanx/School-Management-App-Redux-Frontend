import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateTeacher, addTeacher, resetStatus } from "./teachersSlice";

const TeacherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("value of location is :", location.state);
  const editTeacher = location.state;
  const { status, error } = useSelector((state) => state.teachers);

  const [name, setName] = useState(editTeacher?.name || "");
  const [age, setAge] = useState(editTeacher?.age || "");
  const [subject, setSubject] = useState(editTeacher?.subject || "");
  const [experience, setExperience] = useState(editTeacher?.experience || "");

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTeacher = {
      name,
      age: Number(age),
      subject,
      experience: Number(experience),
    };

    if (editTeacher) {
      dispatch(
        updateTeacher({
          id: editTeacher._id,
          updateTeacher: newTeacher,
        }),
      );
    } else {
      dispatch(addTeacher(newTeacher));
    }
    setTimeout(() => {
      navigate("/teachersView");
    }, 2000);
  };
  return (
    <div>
      {status === "loading" && (
        <div className="alert alert-warning">
          {editTeacher ? "Editing" : "Adding"} teacher...
        </div>
      )}

      {status === "success" && (
        <div className="alert alert-success">
          Teacher {editTeacher ? "Edited" : "Added"} successfully.
        </div>
      )}

      {status === "failed" && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="container">
        <h2 className="my-3">
          {editTeacher ? "Edit Teacher" : "Add Teacher"} Form
        </h2>
        <div>
          <label htmlFor="">Name: </label>
          <input
            className="form-control mb-3"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Age: </label>
          <input
            className="form-control mb-3"
            type="number"
            value={age}
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <label htmlFor="">Subject: </label>
          <input
            className="form-control mb-3"
            type="text"
            value={subject}
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />
          <label htmlFor="">Experience: </label>
          <input
            className="form-control mb-3"
            type="number"
            value={experience}
            placeholder="Experience"
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editTeacher ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;
