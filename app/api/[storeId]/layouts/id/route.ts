import {NextResponse} from "next/server";

import prismadb from "@/lib/prismadb";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function POST(
    req: Request,
    {params}: { params: { storeId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const body = await req.json();

        const {
            name,
            markdown,
            isArchived
        } = body;

        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        if (!markdown || !markdown.length){
            return new NextResponse("Markdown is required", {status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }

        const storeByUserId = prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403});
        }

        const layout = await prismadb.layout.create({
            data: {
                name,
                markdown,
                isArchived,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(layout);
    } catch (error) {
        console.log("[LAYOUTS_POST]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}

export async function GET(
    req: Request,
    {params}: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }

        const layouts = await prismadb.layout.findMany({
            where: {
                storeId: params.storeId,
                isArchived: false
            },
        });

        return NextResponse.json(layouts);
    } catch (error) {
        console.log("[LAYOUTS_GET]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}