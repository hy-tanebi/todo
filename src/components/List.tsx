interface Todo {
  id: string;
  title: string;
  detail: string;
  status: "未着手" | "着手" | "完成";
}

interface ListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  startTodo: (
    id: string,
    detail: string,
    status: "未着手" | "着手" | "完成"
  ) => void;
  editId: string | null;
  setEditId: (newId: string | null) => void;
  editDetail: string;
  setEditDetail: (newDetail: string) => void;
  editStatus: "未着手" | "着手" | "完成";
  setEditStatus: (newStatus: "未着手" | "着手" | "完成") => void;
  saveTodo: () => void;
}

const List = ({
  todos,
  deleteTodo,
  startTodo,
  editId,
  editDetail,
  setEditDetail,
  editStatus,
  setEditStatus,
  saveTodo,
}: ListProps) => {
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <>
            <li key={todo.id}>
              <h3>タイトル：{todo.title}</h3>
              {editId === todo.id ? (
                <>
                  <p>
                    ステータス：
                    <select
                      value={editStatus}
                      onChange={(e) =>
                        setEditStatus(
                          e.target.value as "未着手" | "着手" | "完成"
                        )
                      }
                    >
                      <option value="未着手">未着手</option>
                      <option value="着手">着手</option>
                      <option value="完成">完成</option>
                    </select>
                  </p>
                  <div>
                    詳細：
                    <textarea
                      value={editDetail}
                      onChange={(e) => setEditDetail(e.target.value)}
                    />
                  </div>
                  <button onClick={saveTodo}>保存</button>
                </>
              ) : (
                <div>
                  <p>ID：{todo.id}</p>
                  <p>ステータス：{todo.status}</p>
                  <p>詳細：{todo.detail}</p>
                  <button onClick={() => deleteTodo(todo.id)}>削除</button>
                  <button
                    onClick={() => startTodo(todo.id, todo.detail, todo.status)}
                  >
                    更新
                  </button>
                </div>
              )}
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default List;
