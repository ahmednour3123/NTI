class User {
  constructor(fname, lname, age, email, id = Date.now()) {
    this.fname = fname;
    this.lname = lname;
    this.age = age;
    this.email = email;
    this.id = id;
  }
  get fullName() {
    return `${this.fname} ${this.lname}`;
  }
}

class Student extends User {
  static count = 0;

  constructor(fname, lname, age, email, id = Date.now(), grades = []) {
    super(fname, lname, age, email, id);
    this.grades = grades;
    Student.count++;
  }

  addGrade(grade) {
    this.grades.push(grade);
  }

  toString() {
    return `
    fname: ${this.fname}, 
    lname: ${this.lname}, 
    age: ${this.age}, 
    email: ${this.email},
    id: ${this.id}
    grades: ${this.grades.join(" - ")}
    `;
  }
}

class Teacher extends User {
  static count = 0;
  constructor(fname, lname, age, email, id = Date.now(), subjects = []) {
    super(fname, lname, age, email, id);
    this.subjects = subjects;
    Teacher.count++;
  }

  addSubject(subject) {
    this.subjects.push(subject);
  }

  toString() {
    return `
    fname: ${this.fname}, 
    lname: ${this.lname}, 
    age: ${this.age}, 
    email: ${this.email},
    id: ${this.id}
    subjects: ${this.subjects.join(" - ")}
    `;
  }
}

const students = [];
function addStudent(student) {
  students.push(student);
}
const s1 = new Student("foo", "bar", 30, "m@m.com");
s1.addGrade(20);
s1.addGrade(30);
s1.addGrade(50);
addStudent(s1);
// show all students
students.forEach((s) => console.log(s.toString()));

const teachers = [];
function addTeacher(tech) {
  teachers.push(tech);
}
const tech = new Teacher("baz", "haa", 30, "b@b.com");
tech.addSubject("math");
tech.addSubject("cs");
tech.addSubject("phys");
addTeacher(tech);

// show all teachers
teachers.forEach((teacher) => console.log(teacher.toString()));

// show number of students and teachers
console.log(
  `number of students: ${Student.count} - number of teachers: ${Teacher.count}`
);
