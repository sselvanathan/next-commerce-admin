import {NextResponse} from "next/server";

import prismadb from "@/lib/prismadb";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function GET(
    {params}: { params: { layoutId: string } }
) {
    try {
        if (!params.layoutId) {
            return new NextResponse("Layout Id is required", {status: 400})
        }

        const layout = await prismadb.layout.findUnique({
            where: {
                id: params.layoutId,
            },
        });

        return NextResponse.json(layout);
    } catch (error) {
        console.log('[LAYOUT_GET]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function PATCH(
    req: Request,
    {params}: { params: { storeId: string, layoutId: string } }
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


        if (!markdown) {
            return new NextResponse("Markdown is required", {status: 400});
        }

        if (!params.layoutId) {
            return new NextResponse("Layout Id is required", {status: 400})
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

        const layout = await prismadb.layout.update({
            where: {
                id: params.layoutId,
            }, data: {
                name,
                markdown,
                isArchived
            }
        });


        return NextResponse.json(layout);
    } catch (error) {
        console.log('[LAYOUT_PATCH]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE(
    req: Request,
    {params}: { params: { storeId: string, layoutId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }


        if (!params.layoutId) {
            return new NextResponse("Layout Id is required", {status: 400})
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

        const layout = await prismadb.layout.deleteMany({
            where: {
                id: params.layoutId,
                storeId: params.storeId,
            }
        });

        return NextResponse.json(layout);
    } catch (error) {
        console.log('[LAYOUT_DELETE]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}
