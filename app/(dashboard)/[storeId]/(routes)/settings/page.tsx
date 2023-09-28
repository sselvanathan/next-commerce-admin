import React from "react";
import {redirect} from "next/navigation";

import prismadb from "@/lib/prismadb";
import {SettingsForm} from "./components/settings-form"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({params}) => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // return 401
    if (!userId){
        return;
    }

    const store = await prismadb.store.findFirst(
        {
            where: {
                id: params.storeId,
                userId
            }
        }
    )

    if (!store) {
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store}/>
            </div>
        </div>
    );
}

export default SettingsPage;