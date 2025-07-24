import { Request, Response } from "express";
import { Task } from "../models/task.model";

interface AuthRequest extends Request {
  userId?: string;
}

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "取得任務失敗" });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, status } = req.body;
  const userId = req.userId;

  // //暫時寫死 userId 之後會自動從 JWT 解析
  // const userId = '6880e2ad5d4c204cdf5c894a';

  try {
    const newTask = await Task.create({ title, description, status, userId });
    res.status(201).json(newTask);
  } catch (err) {
    console.error("新增任務失敗:", err);
    res.status(500).json({ message: "新增任務失敗" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findOne({ _id: id, userId: req.userId });

    if (!task) return res.status(404).json({ message: "找不到任務" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(501).json({ message: "更新任務失敗" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });

    if (!task) return res.status(404).json({ message: "任務不存在" });

    res.json({ message: "刪除任務成功" });
  } catch (err) {
    res.status(500).json({ message: "刪除任務失敗" });
  }
};
