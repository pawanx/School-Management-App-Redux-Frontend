import { Link } from "react-router-dom";

const StudentList = ({ students }) => {
  return (
    <div>
      <h2 className="my-3">Student List</h2>
      {students.length === 0 && <div>No student data available.</div>}
      <div className="list-group shadow-sm rounded-4 overflow-hidden">
        {students.map((student) => (
          <div
            key={student._id}
            className="list-group-item list-group-item-action border-0 py-3"
          >
            <Link
              to={`/student/${student._id}`}
              className="text-decoration-none"
            >
              {student.name} (Age: {student.age})
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
