import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      //非 TS 列舉 是 mongoose Schema 語法 意思是限定只能是這幾個值
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      //MongoDB 的 _id 類型 每個資料表的唯一識別碼
      ref: "User",
      //這個 id 是參考哪個 model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
