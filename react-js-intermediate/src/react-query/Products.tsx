import React, { Fragment, useState } from 'react'
import { useProduct, useProducts } from './services/quiries';

const Products = () => {
    const [selected_product_id, setSelectedProductId] = useState<number | null>(null);
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useProducts();

    const { data: product_item } = useProduct(selected_product_id);

    return (
        <div>
            { data?.pages.map((group, index) => (
                <Fragment key={ index }>
                    <ul>
                        { group.map((item) => (
                            <li onClick={ () => setSelectedProductId(item.id) } key={ item.id }>{ item.title }</li>
                        )) }
                    </ul>
                </Fragment>
            )) }

            <div>
                <button onClick={ () => fetchNextPage() } disabled={ !hasNextPage || isFetchingNextPage }>{ isFetchingNextPage ? "loading..." : hasNextPage ? "Load More" : "Nothing to show" }</button>
            </div>

            <span>Selected Product: { JSON.stringify(product_item) }</span>
        </div>
    )
}

export default Products;