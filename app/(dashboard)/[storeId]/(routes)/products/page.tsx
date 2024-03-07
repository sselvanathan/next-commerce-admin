import React from "react";


import {ProductClient} from "./components/client";


const ProductsPage = async (
    {
        params
    }: {
        params: { storeId: string }
    }) => {
//ToDo getProducts

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={[]}/>
            </div>
        </div>
    );
}

export default ProductsPage;