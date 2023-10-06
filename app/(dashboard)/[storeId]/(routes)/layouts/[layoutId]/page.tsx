import prismadb from "@/lib/prismadb";
import {LayoutForm} from "./components/layout-form";

const LayoutPage = async (
    {
        params
    }: {
        params: { layoutId: string, storeId: string }
    }) => {
    const layout = await prismadb.layout.findUnique({
        where: {
            id: params.layoutId
        },
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <LayoutForm
                    initialData={layout}/>
            </div>
        </div>
    );
}

export default LayoutPage;