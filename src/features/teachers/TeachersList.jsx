import { Link } from "react-router-dom";
const TeachersList = ({ teachers }) => {
  return (
    <div>
      {teachers.length === 0 && <div>No teacher data available.</div>}
      <div className="list-group shadow-sm rounded-4 overflow-hidden">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="list-group-item list-group-item-action border-0 py-3"
          >
            <Link
              to={`/teacher/${teacher._id}`}
              className="text-decoration-none"
            >
              {teacher.name} - {teacher.subject}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersList;
