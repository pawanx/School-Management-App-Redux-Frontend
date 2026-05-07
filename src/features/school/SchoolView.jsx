import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../students/studentsSlice";
import { fetchTeachers } from "../teachers/teachersSlice";
import { schoolStats, setTopStudent, setTopTeacher } from "./schoolSlice";
import { useEffect } from "react";

const SchoolView = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const teachers = useSelector((state) => state.teachers.teachers);
  const school = useSelector((state) => state.school);
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);
  useEffect(() => {
    const totalStudents = students.length;
    const totalTeachers = teachers.length;

    const averageAttendance =
      totalStudents > 0
        ? students.reduce((acc, curr) => acc + curr.attendance, 0) /
          totalStudents
        : 0;

    const averageExperience =
      totalTeachers > 0
        ? teachers.reduce((acc, curr) => acc + curr.experience, 0) /
          totalTeachers
        : 0;

    const averageMarks =
      totalStudents > 0
        ? students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents
        : 0;

    const topStudent = students.reduce(
      (acc, curr) => (curr.marks > (acc?.marks || 0) ? curr : acc),
      null,
    );

    const topTeacher = teachers.reduce(
      (acc, curr) => (curr.experience > (acc?.experience || 0) ? curr : acc),
      null,
    );
    dispatch(
      schoolStats({
        averageAttendance,
        averageMarks,
        totalStudents,
        totalTeachers,
        averageExperience,
      }),
    );
    dispatch(setTopStudent(topStudent));
    dispatch(setTopTeacher(topTeacher));
  }, [students, teachers, dispatch]);

  return (
    <div className="container">
      <h2 className="my-3">School View</h2>
      <p className="text-muted">Brief summary of school resources.</p>
      <hr />

      {/* Student Statistics */}
      <div className="list-group shadow-sm rounded-4 overflow-hidden mb-4">
        <div className="list-group-item bg-primary text-white py-3 border-0">
          <h5 className="mb-0 fw-semibold">Student Statistics</h5>
        </div>

        <div className="list-group-item py-3">
          <div className="d-flex justify-content-between">
            <span>Total Students</span>

            <span className="fw-bold">{school.totalStudents}</span>
          </div>
        </div>

        <div className="list-group-item py-3">
          <div className="d-flex justify-content-between">
            <span>Average Attendance</span>

            <span className="fw-bold">
              {school.averageAttendance.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="list-group-item py-3">
          <div className="d-flex justify-content-between">
            <span>Average Marks</span>

            <span className="fw-bold">{school.averageMarks.toFixed(2)}</span>
          </div>
        </div>

        <div className="list-group-item py-3">
          <div className="d-flex justify-content-between">
            <span>Top Student</span>

            <span className="fw-bold text-primary">
              {school.topStudent?.name || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Teacher Statistics */}
      <div className="list-group shadow-sm rounded-4 overflow-hidden">
        <div className="list-group-item bg-success text-white py-3 border-0">
          <h5 className="mb-0 fw-semibold">Teacher Statistics</h5>
        </div>

        <div className="list-group-item py-3">
          <div className="d-flex justify-content-between">
            <span>Total Teachers</span>

            <span className="fw-bold">{school.totalTeachers}</span>
          </div>
        </div>

        <div className="list-group-item py-3">
          <div className="d-flex justify-content-between">
            <span>Average Experience</span>

            <span className="fw-bold">
              {school.averageExperience.toFixed(2)} Years
            </span>
          </div>
        </div>

        <div className="list-group-item py-3">
          <div className="d-flex justify-content-between">
            <span>Top Teacher</span>

            <span className="fw-bold text-success">
              {school.topTeacher?.name || "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolView;
