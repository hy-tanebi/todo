import React from "react";

interface InputProp {
  todo: string;
  detail: string;
  status: "未着手" | "着手" | "完成";
  setTodo: (newTodo: string) => void;
  setDetail: (newDetail: string) => void;
  setStatus: (newStatus: "未着手" | "着手" | "完成") => void;
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Input = ({
  todo,
  setTodo,
  addTodo,
  detail,
  setDetail,
  status,
  setStatus,
}: InputProp) => {
  return (
    <>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <div>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "未着手" | "着手" | "完成")
            }
          >
            <option value="未着手">未着手</option>
            <option value="着手">着手</option>
            <option value="完成">完成</option>
          </select>
        </div>
        <div>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <button>登録</button>
      </form>
    </>
  );
};

export default Input;
