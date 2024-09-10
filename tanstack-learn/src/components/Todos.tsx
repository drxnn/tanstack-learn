// import { useIsFetching } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateToDo,
  useDeleteToDo,
  useUpdateTodo,
} from "../services/mutations";
import { useTodoIds, useTodos } from "../services/queries";
import { Todo } from "../types/todo";

export default function Todos() {
  const todosIdsQuery = useTodoIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateToDo();

  const updateToDoMutation = useUpdateTodo();

  const deleteToDoMutation = useDeleteToDo();

  const handleDeleteOfToDo = async (data: Todo | undefined) => {
    if (data) await deleteToDoMutation.mutateAsync(data);
    alert("success");
  };

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) updateToDoMutation.mutate({ ...data, checked: true });
  };

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const { register, handleSubmit } = useForm<Todo>();

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input
          type="Submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create To Do"}
        />
      </form>
      {todosIdsQuery.data?.map((id) => (
        <p key={id}>id:{id}</p>
      ))}

      <ul>
        {todosQueries.map(({ data }) => {
          return (
            <li key={data?.id}>
              <div>id: {data?.id}</div>
              <span>
                <strong>Title: {data?.title}</strong>,{" "}
                <strong>Description: {data?.description}</strong>
              </span>
              <div>
                <button
                  onClick={() => handleMarkAsDoneSubmit(data)}
                  disabled={data?.checked}
                >
                  {data?.checked ? "done" : "mark as done"}
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteOfToDo(data)}
                  disabled={deleteToDoMutation.isPending}
                >
                  delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
