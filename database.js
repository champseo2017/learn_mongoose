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

ดึงข้อมูลโดยกำหนดเงื่อนไข
const query = {class: '6/1'}
const getStudents = async() => {
    const students = await Student.find(condition);
    console.log(students);
}

getStudents(query);

เราสามารถกำหนดคู่ key:value ได้หลายชุด
const query = {class: '6/1', hobbies: 'Swimming'};
const getStudents = async() => {
    const students = await Student.find(condition);
    console.log(students);
}

getStudents(query);

ดึงข้อมูลพร้อมจัดเรียงข้อมูล
เราจะใช้เมธอด sort เพื่อกำหนดว่าจะให้ข้อมูลที่ได้ เรียงจากน้อยไปหามากหรือมากไปหาน้อย โดยผ่านค่าเป็น 1 หากต้องการเรียงจากน้อยไปมาก
และผ่านค่าเป็น -1 เมื่อต้องการกำหนดจากมากไปหาน้อย
const getStudents = async () => {
    const students = await Student
    .find({class: '6/1'})
    .sort({id: 1});
    console.log(students)
}
getStudents();

ดึงข้อมูลโดยจำกัดจำนวนผลลัพธ์
ถ้าเราต้องการจำกัดจำนวนผลลัพธ์ใช้เมธอด limit โดยกำหนดจำนวนผลลัพธ์เช่น limit(5) เป็นต้น แต่ก่อนที่จะจำกัดผลลัพธ์ เราควรจัดเรียง
ผลลัพธ์เสียก่อนด้วยเมธอด sort

const getStudents = async () => {
    const students = await Student
    .find({class: '6/2'})
    .sort({id: -1})
    .limit(2);
    console.log(students)
}

getStudents();
*/