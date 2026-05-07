import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addStudent, updateStudent } from "./studentsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { resetStatus } from "./studentsSlice";

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editStudent = location.state;
  const { status, error } = useSelector((state) => state.students);

  const [name, setName] = useState(editStudent?.name || "");
  const [age, setAge] = useState(editStudent?.age || "");
  const [gender, setGender] = useState(editStudent?.gender || "Male");
  const [attendance, setAttendance] = useState(editStudent?.attendance || "");
  const [marks, setMarks] = useState(editStudent?.marks || "");
  const [grade, setGrade] = useState(editStudent?.grade || "");

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      name: name,
      age: Number(age),
      gender: gender,
      attendance: Number(attendance),
      marks: Number(marks),
      grade: grade,
    };

    console.log("Student form data is:", newStudent);

    if (editStudent) {
      dispatch(
        updateStudent({
          id: editStudent._id,
          updatedStudent: newStudent,
        }),
      );
    } else {
      dispatch(addStudent(newStudent));
    }
    setTimeout(() => {
      navigate("/studentsView");
    }, 2000);
  };
  return (
    <>
      {status === "loading" && (
        <div className="alert alert-warning">
          {editStudent ? "Editing" : "Adding"} student...
        </div>
      )}

      {status === "success" && (
        <div className="alert alert-success">
          Student {editStudent ? "Edited" : "Added"} successfully.
        </div>
      )}

      {status === "failed" && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="container">
        <h2 className="my-3">
          {editStudent ? "Edit Student" : "Add Student"} Form
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
          <label htmlFor="">Attendance: </label>
          <input
            className="form-control mb-3"
            type="number"
            value={attendance}
            placeholder="Attendance"
            onChange={(e) => setAttendance(e.target.value)}
          />
          <label htmlFor="">Marks: </label>
          <input
            className="form-control mb-3"
            type="number"
            value={marks}
            placeholder="Marks"
            onChange={(e) => setMarks(e.target.value)}
          />
          <label htmlFor="">Grade: </label>
          <input
            className="form-control mb-3"
            type="text"
            value={grade}
            placeholder="Grade"
            onChange={(e) => setGrade(e.target.value)}
          />
          <label className="form-label d-block">Gender: </label>
          <label className="form-label">
            <input
              className="form-check-input mb-3"
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Male
          </label>
          <label className="form-label">
            <input
              className="form-check-input mb-3 mx-2"
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          {editStudent ? "Update" : "Add"}
        </button>
      </form>
    </>
  );
};

export default StudentForm;
