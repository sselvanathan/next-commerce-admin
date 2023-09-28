import {NextResponse} from "next/server";

import prismadb from "@/lib/prismadb";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function GET(
    req: Request,
    {params}: { params: { billboardId: string } }
) {
    try {
        if (!params.billboardId) {
            return new NextResponse("Billboard Id is required", {status: 400})
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function PATCH(
    req: Request,
    {params}: { params: { storeId: string, billboardId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const body = await req.json();

        const {label, imageUrl, buttonLabel, buttonColor, isFeatured} = body;

        if (!label) {
            return new NextResponse("Label is required", {status: 400})
        }

        if (!imageUrl) {
            return new NextResponse("image URL is required", {status: 400})
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard Id is required", {status: 400})
        }

        if (!buttonLabel && buttonColor || buttonLabel && !buttonColor) {
            return new NextResponse("Button label and button color are required", {status: 400})
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
            }, data: {
                label,
                imageUrl,
                buttonLabel,
                colorId: buttonColor,
                isFeatured
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE(
    req: Request,
    {params}: { params: { storeId: string, billboardId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard Id is required", {status: 400})
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
                storeId: params.storeId,
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}
