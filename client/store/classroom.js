const STUDENT_JOINED = "STUDENT_JOINED";
const STUDENT_LEFT = "STUDENT_LEFT";

export const studentJoined = (student) => ({
  type: STUDENT_JOINED,
  student,
});

export const studentLeft = (student) => ({
  type: STUDENT_LEFT,
  student,
});

const initialState = {
  students: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STUDENT_LEFT:
      // eslint-disable-next-line no-case-declarations
      const newStudentList = [...state.students].filter(
        (s) => s !== action.student
      );
      return { ...state, students: newStudentList };
    case STUDENT_JOINED:
      return { ...state, students: [...state.students, action.student] };
    default:
      return state;
  }
}
