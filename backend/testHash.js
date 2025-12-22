import bcrypt from "bcrypt";

const storedHash = "$2b$10$bcUzlKOVU67cM/KXRIywiuX6b6vN677VOlHv4WCc86ESn.NXuXcK6";
const plainPassword = "123456";

const result = await bcrypt.compare(plainPassword, storedHash);
console.log("Password match:", result);
