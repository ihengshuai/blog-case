import jwt from "jsonwebtoken";
import { BaseController } from "../../helper/base-controller.js";

// 定义密钥（用于签名和验证 Token）
const SECRET_KEY = "mySecretKey";

export class UserController extends BaseController {
  routes = {
    "get:/user/list": this.getUserList,
    "get:/user/\\d+$": this.getUserDetail,
    "get:/user/create/token": this.createToken,
    "post:/user/validate/token": this.validateToken,
  };

  /** 请求用户列表 */
  getUserList(req, res) {
    res.end("user list");
  }

  getUserDetail(req, res) {
    console.log("获取cookie：", req.cookies);
    res.end("user detail");
  }

  /** 生成token */
  createToken(req, res) {
    const user = {
      id: 1,
      username: "admin",
    };

    // 创建 JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token });
  }

  /** 验证token */
  validateToken(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1]; // 提取 Token

    // 验证 Token
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid or expired" });
      }

      // Token 验证成功，返回用户数据
      res.json({ message: "Access granted", user });
    });
  }
}
