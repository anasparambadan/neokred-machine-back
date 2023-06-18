import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_KEY;


const verifyToken = async (req, res, next) => {
   
  try {
    const token = req.headers.authorization.split(" ")[1];
   


    if (token) {
      jwt.verify(token, secret, (err, user) => {
        if (err) {
          console.log(err);
          res.status(401).json("Invalied token!");
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json("Unauthorized access");
    }
  } catch (error) {
    console.log(error);
  }
};

export default verifyToken;
