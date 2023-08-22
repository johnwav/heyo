import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain alphanumeric letters and be unique!",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default:
      "https://heyochat.s3.eu-north-1.amazonaws.com/default.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCWV1LXdlc3QtMyJGMEQCIE5W%2BPYt3nJdTXTfJMg1iW%2B7d3xweRvDNeqxBIM5bn1JAiBfEgPw15THg1dF47BpwpfJXzj8pjhtK6Ouke%2FpSlcJoyrtAgjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDQxNTI0MTQ5NTI5OCIMzd3Jn1gsBWhhhb%2FHKsEC9GE1x8JiYIwTZVbeTR9a7c73PsiThpArHb5suWuz6n1rGSJJxp59bsn3N2NzI0679Q7fnuJMvNVvg5ZPKxkckSuRA%2B%2BKClGmZKlEq8wYVOuV8H2Ae%2Fo%2Fau2M3FZfoxMBs5J2Uhd%2BfnOpreWuGXzpheBVVl3dpKQ9Kyqxa4ZwLizIv%2Fj7M6lYVsGIC2BqZmqm%2F2y08hc%2FiSgdGaduQioMX8JIyMncysPRheGlOrgd69FVOZe43QZdquHYXOQ04JMQ8h2zGAZuiDbg6TOMLZOaNLyOFyjfGZOv77wXH3IAB7f%2FT2c7kLMcDi0LA%2BEjEzutw0LEXvQQnEqch2wPAz1PHvfYaTR1GjrqGexRdFfQjZXOR6yIsbHqzvQ7J3nxy0YYYiaeAfkqB1n9cmwy%2FhXIZzpFWHaK%2BXayG2d%2BXeRn6n01MI%2BrkqcGOrQCdXyR8VBSt2h32A7O%2BrUKKISzKDCsDianPoKoaGwwYeaSmff5B%2Buj093gkyWHqlNUyjf9k9yLnBwathIor48bJgl9bLd4JP%2FlKYidZuRbN9zWTbErcKy1BOx2EGQI0%2Br%2BRUX6lhZqPw%2FaHZiYEGOMHyx6fGHujnVG%2FmfE9s3r3k037JA4h6M6P7XoM6o04HEL8GgEQKnc9Ozkd%2F2crCn4XMRmyhEUIbzEEmpGyzU6iOEOwAIhuvX84%2B32eIXnpFzbRY8Zcm07Wamv1odsWtGWpzNBY%2Bt68VLKywDE%2FX6ZrYubpc9v4m8FJHAnBU0aRX8TjtD664ociPaLXmyHsKA%2BLesLQDLwnWz4OBmle01DZ37xaqcfxxwp6mirUr4rBfofS1ibr7G8LikmmOUyTuE7KZcvpRY%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230822T113621Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWBLSSMMBLQKZT4ON%2F20230822%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=9a045433261fac0302dfbf02fff758527f106f3c63b4761a8233bd6d659a2e39",
  },
  online: {
    type: Boolean,
    default: false,
  },
  lastSeen: {
    type: Date,
    default: new Date(),
  },
  about: {
    type: String,
    default: "Hey, i'm using Heyo!",
  },
});

//Hash the password before saving

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

//compare password method
UserSchema.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
const User = models.User || model("User", UserSchema);

export default User;
