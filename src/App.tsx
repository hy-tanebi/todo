import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import Input from "./components/Input";
import List from "./components/List";

interface Todo {
  id: string;
  title: string;
  detail: string;
  status: "未着手" | "着手" | "完成";
  createdAt: number;
}

function App() {
  const [todo, setTodo] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [status, setStatus] = useState<"未着手" | "着手" | "完成">("未着手");
  const [todos, setTodos] = useState<Todo[]>([]);

  const [editId, setEditId] = useState<string | null>(null);
  const [editDetail, setEditDetail] = useState<string>("");
  const [editStatus, setEditStatus] = useState<"未着手" | "着手" | "完成">(
    "未着手"
  );

  const [sortKey, setSortKey] = useState<
    "title" | "status" | "id" | "createdAt"
  >("createdAt");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [filterStatus, setFilterStatus] = useState<"未着手" | "着手" | "完成">(
    "未着手"
  );

  const [filterDate, setFilterDate] = useState<string>("");

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      title: todo,
      detail: detail,
      status: status,
      createdAt: Date.now(),
    };

    setTodos([...todos, newTodo]);
    setTodo("");
    setDetail("");
    setStatus("未着手");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startTodo = (
    id: string,
    detail: string,
    status: "未着手" | "着手" | "完成"
  ) => {
    setEditId(id);
    setEditDetail(detail);
    setEditStatus(status);
  };

  const saveTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId
          ? { ...todo, detail: editDetail, status: editStatus }
          : todo
      )
    );

    setEditId(null);
    setEditDetail("");
    setEditStatus("未着手");
  };

  const filteredTodo = [...todos]
    .filter((todo) => {
      if (filterStatus && todo.status !== filterStatus) return false;

      if (filterDate) {
        const todoDate = new Date(todo.createdAt).toISOString().split("T")[0];
        if (todoDate !== filterDate) return false;
      }
      return todo;
    })
    .sort((a, b) => {
      // ソート処理
      if (sortKey === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      if (sortKey === "status") {
        const statusOrder = { 未着手: 0, 着手: 1, 完成: 2 };
        return sortOrder === "asc"
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      }

      if (sortKey === "createdAt") {
        return sortOrder === "asc"
          ? a.createdAt - b.createdAt
          : b.createdAt - a.createdAt;
      }

      return 0;
    });

  return (
    <>
      <div>
        <label>
          ソート基準：
          <select
            value={sortKey}
            onChange={(e) =>
              setSortKey(
                e.target.value as "title" | "status" | "id" | "createdAt"
              )
            }
          >
            <option value="title">タイトル</option>
            <option value="status">ステータス</option>
            <option value="createdAt">作成順</option>
          </select>
        </label>
        <label>
          並び順：
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">昇順</option>
            <option value="desc">降順</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          ステータスで絞り込み：
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as "未着手" | "着手" | "完成")
            }
          >
            <option value="">すべて</option>
            <option value="未着手">未着手</option>
            <option value="着手">着手</option>
            <option value="完成">完成</option>
          </select>
        </label>
        <label>
          日付で絞り込み：
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
      </div>
      <Input
        todo={todo}
        setTodo={setTodo}
        addTodo={addTodo}
        detail={detail}
        setDetail={setDetail}
        status={status}
        setStatus={setStatus}
      />
      <List
        todos={filteredTodo}
        deleteTodo={deleteTodo}
        startTodo={startTodo}
        editId={editId}
        setEditId={setEditId}
        editDetail={editDetail}
        setEditDetail={setEditDetail}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        saveTodo={saveTodo}
      />
    </>
  );
}

export default App;
