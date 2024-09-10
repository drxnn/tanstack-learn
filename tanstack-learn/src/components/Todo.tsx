import { useTodoIds } from "../services/queries";

export default function Todo() {
  const todosIdsQuery = useTodoIds();

  if (todosIdsQuery.isPending) {
    return <span>loading...</span>;
  } else if (todosIdsQuery.isError) {
    return <span>there is an error!</span>;
  }

  return (
    <>
      {todosIdsQuery.data.map((id) => (
        <p key={id}>{id}</p>
      ))}
    </>
  );
}
