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
/* 
อัพเดตคะแนนของนักเรียนห้อง 6/2 โดยดูว่า หากคนไหนคะแนนน้อยกว่า 50 ก็จะเปลียนเป็น 50 ทันที ดังนั้นตัวอย่างนี้จึงใช้เมธอด updateMany() เพื่ออัพเดตนักเรียนหลายรายการพร้อมกัน และใช้โอเปอร์เรเตอร์ $max เพื่อแก้ไขค่า score

*/
const updateStudent = async (studentClass) => {
  const student = await Student.updateMany(
    { class: studentClass },
    { $max: { score:200 } }
  );
  console.log(student);
};
updateStudent("7/1");
// const createStudent = async() => {
//   const student = Student({
//     id: "0523301122",
//     name: "Worrawank",
//     hobbies: ["Running", "Pingpong"],
//     class: '6/1',
//     score: 99,
//     isStudying: true,
//   });

//   const data = await student.save();
//   console.log(data);

// }

// createStudent();

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

ดึงข้อมูลโดยเลือกเฉพาะพร็อพเพอร์ตี้ที่ต้องการ ใช้เมธอด select
ตัวอย่างการแสดงเฉพาะรายชื่อนักเรียน และชื่อห้องเท่านั้น
const getStudents = async () => {
    const students = await Student
    .find()
    .select({name:1, class:1})
    console.log(students);
}
getStudents();

ในทางกลับกันหากเราคิวรี เพื่อนำข้อมูลทั้งหมดมาใช้ ยกเว้นงานอดิเรก และ สถานะของนักเรียน
const getStudents = async () => {
    const students = await Student
    .find()
    .select({hobbies:0, isStudying: 0})
    console.log(students);
}
getStudents();


ดึงข้อมูลโดยใช้ comparison operator
คิวรี่ข้อมูลใช้วิธีการเปรียบเทียบ เราจะใช้ตัวดำเนินการการเปรียบเทียบ MongoDB
comparison operator 
eq เท่ากับ (equal)
ืne ไม่เท่ากับ (not equal)
gt มากกว่า (greater than)
gte มากกว่าหรือเท่ากับ (greater than or equal to)
lt น้อยกว่า (less than)
lte น้อยกว่าหรือเท่ากับ (less than or equal to)
in รสมอยู่ใน (include)
ืnin ไม่รวมอยู่ (not include)

เมื่อต้องการแสดงนักเรียนที่มีคะแนนมากกว่าหรือเท่ากับ 80 เราจะใช้โอเปอเรเตอร์ gte
const getStudents = async () => {
    const students = await Students.find({score: {$gte: 80}});
    console.log(students);
}

ถ้าต้องการแสดงนักเรียนที่มีคะแนนอยู่ระหว่าง 70 ถึง 80 เราจะกำหนดออกเจ็กต์สำหรับใช้เป็นเงื่อนไขในการคิวรี ด้วยโอเปอเรเตอร์ gte และ lt 
const getStudents = async () => {
    const students = await Student.find({score: {$gt: 70, $lt: 80}})
    console.log(students);
}
getStudents();

ถ้าต้องการแสดงรายชื่อนักเรียนที่มีคะแนน เป็น 70, 80 และ 90 ก็สามารถใช้โอเปอร์เรเตอร์ in 
const getStudents = async () => {
    const students = await Student.find({
        score: {$in: [70, 80, 90]}
    })
    console.log(students);
}

getStudents();

คิวรีข้อมูลโดยการเปรียบเทียบเงื่อนไขทางลอจิก

Or ตรงเงื่อนไขเพียงส่วนเดียวก็ใช้ได้
And ต้องตรงเงื่อนไขทั้งหมดเท่านั้น

หานักเรียนที่อยู่ห้อง 6/1 และมีคะแนนเป็น 80 ซึ้งประกอบด้วย 2 เงื่อนไข ดังนี้
const getStudents = async () => {
    const students = await Student
    .find()
    .and([{class: '6/1'}, {score: 70}])
    console.log(students);
}
getStudents();

ต้องการค้นหานักเรียนที่อยู่ห้อง 6/1 หรือนักเรียนที่มีคะแนนมากกว่า 80

const getStudents = async () => {
    const students = await Student
    .find()
    .or([{class: '6/1'}, {score: {$gt: 80}}])
    console.log(students)
}
getStudents();

กำหนดเงื่อนไขด้วย regular expression
เช่น หากต้องการตรวจสอบข้อความว่า ขึ้นต้นด้วย love หรือไม่ ก็จะกำหนดเป็น 
/^love/
หรือถ้าต้องการตรวจสอบข้อความว่า ลงท้ายด้วย love ก็จะกำหนดเป็น /love$/
และถ้าต้องการตรวจสอบว่ามีคำว่า love อยู่ตรงไหนก็ได้ ก็ให้กำหนดเป็น /.*love.*/
//
/* 
ต้องการแสดงรายชื่อนักเรียนที่ขึ้นต้นด้วย s ก็สามารถใช้ regular express กำนหดได้
async function getStudents() {
    const students = await Student
    .find({name: /^S/i})
    console.log(students)
}

getStudents();

ต้องการแสดงรายชื่อนักเรียนที่ลงท้ายด้วย porn และอยู่ในห้อง 6/1
async function getStudents () {
    const students = await Student
    .find()
    .and([{name:'/porn$/'}, [class: '6/1']]);
    console.log(students)
}
getStudents()

นับจำนวน Document ที่ได้จากการคิวรี่
หากเราต้องการนับข้อมูลที่ได้จากการคิวรี เราจะใช้เมธอด countDocument()
ซึ้งผลลัพธ์จะเป็นตัวเลขแสดงจำนวน Document ที่ถูกดึงมาจากฐานข้อมูล เช่น 
นักเรียนทั้งหมดที่อยู่ในห้อง 6/1 

async function getStudents() {
    const students = await Student
    .find({class: '6/1'})
    .countDocuments();
    console.log(students)
}

getStudents()

แบ่งข้อมูลออกเป็นหน้า Paging
ในโมดูล Mongoose จะมีเมธอด skip() สำหรับแบ่งข้อมูลออกเป็นหน้าย่อยๆ
async function getStudents() {
    var pageSize = 5;
    var pageNumber = 2;
    const students = await Student
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
    console.log(students);
}
getStudents();
*/
