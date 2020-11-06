const mongoose = require("mongoose");
const config = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectionString = `mongodb+srv://admin:<>Boomgt123@cluster0.utr9m.mongodb.net/<dbname>?retryWrites=true&w=majority
`;

mongoose
  .connect(connectionString, config)
  .then(() => console.log("Connect to MongoDB..."))
  .catch((err) => console.log("Cannot connect to MongoDB", err));

// กำหนดเค้าโครงข้อมูลด้วย schema
const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  class: String,
  hobbies: [String],
  isStudying: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
});

const Student = mongoose.model("Student", studentSchema);
const createStudent = async() => {
  const student = Student({
    id: "0523301122",
    name: "Worrawank",
    hobbies: ["Running", "Pingpong"],
    class: '6/1',
    score: 84,
    isStudying: true,
  });

  const data = await student.save();
  console.log(data);
  
}

createStudent();

/* 
คิวรี่ Document จากฐานข้อมูล
ดึงข้อมูลมาทั้งหมด
ใช้เมธอด find() เพื่อดึงข้อมูลนักเรียนทั้งหมดออกมาแสดง

const getStudents = async() => {
    const students = await Student.find()
    console.log(students)
}

getStudents();

*/