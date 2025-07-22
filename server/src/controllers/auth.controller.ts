import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email 已被註冊" });
    //檢查信箱有無註冊過

    const hashedPassword = await bcrypt.hash(password, 10);
    //把密碼機加密 安全等級10 我也不知道要多少，預設就用10

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //新用戶寫進DB

    res.status(201).json({ message: "註冊成功" });
  } catch {
    res.status(500).json({ message: "ˋ註冊失敗" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "用戶不存在" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "密碼錯誤" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    //建立一組 JWT 使用者的 _id 當 payload，密鑰從環境變數抓
    res.status(200).json({ token });
    //登入成功，回傳 token
  } catch (error) {
    res.status(500).json({ message: "登入失敗" });
  }
};
