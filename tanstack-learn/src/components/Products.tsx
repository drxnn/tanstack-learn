import { Fragment, useState } from "react";
import { useProduct, useProducts } from "../services/queries";

export default function Products() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const productsQuery = useProducts();

  const productQuery = useProduct(selectedProductId);

  return (
    <>
      {productsQuery.data?.pages.map((group, id) => (
        <Fragment key={id}>
          {group.map((product) => (
            <Fragment>
              <button onClick={() => setSelectedProductId(product.id)}>
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetchingNextPage
            ? "Loading more..."
            : productsQuery.hasNextPage
            ? "Load more"
            : "Nothing more to Load"}
        </button>
      </div>
      <div>Selected Product: {JSON.stringify(productQuery.data)}</div>
    </>
  );
}
