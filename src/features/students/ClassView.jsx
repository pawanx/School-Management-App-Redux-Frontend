import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "./studentsSlice";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students, filter, sortBy } = useSelector((state) => state.students);

  const filteredStudents =
    filter === "All"
      ? students
      : students.filter((student) => student.gender === filter);

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    return b[sortBy] - a[sortBy];
  });
  return (
    <div className="container py-4">
      <h2 className="my-3">Class View</h2>
      <p className="text-muted">Manage and monitor student performance</p>
      <div className="d-flex justify-content-between">
        <div>
          <label className="form-label fw-semibold">Filter By Gender: </label>

          <select
            className="form-select"
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          >
            <option value="All">All</option>
            <option value="Male">Boys</option>
            <option value="Female">Girls</option>
          </select>
        </div>
        <div>
          <label className="form-label fw-semibold">Sort by: </label>

          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="name">Name</option>
            <option value="marks">Marks</option>
            <option value="attendance">Attendance</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="list-group list-group-flush">
        {sortedStudents.map((student) => (
          <div
            key={student._id}
            className="list-group-item list-group-item-action border-0 py-3 student-item"
          >
            {student.name} - Age: {student.age} - {student.gender} - Marks:{" "}
            {student.marks} - Attendance:
            {student.attendance}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassView;
