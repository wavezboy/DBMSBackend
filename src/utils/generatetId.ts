// Function to generate a unique alphanumeric sequence
const generateUniqueSequence = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const alphanumeric = letters + numbers;
  let sequence = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumeric.length);
    sequence += alphanumeric[randomIndex];
  }

  return sequence;
};

// Function to get the current year
const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

// Function to generate student ID
export const generateStudentId = () => {
  const prefix = "KN";
  const studentIdentifier = "ST";
  const uniqueSequence = generateUniqueSequence();
  const currentYear = getCurrentYear();

  return `${prefix}/${studentIdentifier}${uniqueSequence}/${currentYear}`;
};

// Example usage
// const studentId = generateStudentId();
// console.log(studentId); // e.g., "KN/ST1234a/2024"

export const generateTeacherId = () => {
  const prefix = "KN";
  const teacherIdentifier = "TE";
  const uniqueSequence = generateUniqueSequence();
  const currentYear = getCurrentYear();

  return `${prefix}/${teacherIdentifier}${uniqueSequence}/${currentYear}`;
};

// Example usage
// const teacherId = generateTeacherId();
// console.log(teacherId); // e.g., "KN/TE1234a/2024"
