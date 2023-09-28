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

        const {label, imageUrl, buttonLabel, buttonColor, isFeatured} = body;

        if (!label) {
            return new NextResponse("Label is required", {status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
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

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId,
                buttonLabel,
                colorId: buttonColor,
                isFeatured
            },
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARDS_POST]", error);
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

        const { searchParams } = new URL(req.url);
        const isFeatured = searchParams.get("isFeatured");

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,
                isFeatured: isFeatured ? true : undefined,
            },
            include: {
                buttonColor: true,
            }
        });

        return NextResponse.json(billboards);
    } catch (error) {
        console.log("[BILLBOARDS_GET]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}