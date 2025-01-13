// 3-get_ids_sum.js
export default function getStudentIdsSum(students) {
  return students.reduce((sum, student) => sum + student.id, 0);
}

