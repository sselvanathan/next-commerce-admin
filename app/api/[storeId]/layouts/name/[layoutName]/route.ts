import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

    export async function GET(
        req: Request,
        {params}: { params: { storeId: string, layoutName: string } }
    ) {
    try {
        if (!params.layoutName) {
            return new NextResponse("Layout name is required", { status: 400 });
        }

        // Find the layout by both storeId and name
        const layout = await prismadb.layout.findUnique({
            where: {
                storeId_name: {
                    storeId: params.storeId,
                    name: params.layoutName,
                },
                isArchived: false
            },
        });

        if (layout) {
            return NextResponse.json(layout);
        } else {
            return new NextResponse("Layout not found", { status: 404 });
        }
    } catch (error) {
        console.error('[LAYOUT_GET_BY_NAME]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}