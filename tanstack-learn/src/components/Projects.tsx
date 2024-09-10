import { useState } from "react";
import { useProjects } from "../services/queries";

export default function Projects() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, isPlaceholderData, isFetching } =
    useProjects(page);
  return (
    <div>
      {isPending ? (
        <div>loading..</div>
      ) : isError ? (
        <div>Error:{error.message}</div>
      ) : (
        <div>
          {data.map((p) => {
            return <p key={p.id}>{p.name}</p>;
          })}
        </div>
      )}
      <span>Current page: {page}</span>
      <button onClick={() => setPage((previous) => Math.max(previous - 1, 0))}>
        {" "}
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        {" "}
        Next Page
      </button>
      {isFetching ? <span>Loading...</span> : null}
    </div>
  );
}
