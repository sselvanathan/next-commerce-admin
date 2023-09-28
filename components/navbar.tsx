
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import {ThemeToggle} from "@/components/theme-toggle";
import UserButton from "@/components/ui/user-button";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId){
        // ToDo 401
        return;
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        },
    });

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores}/>
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default Navbar;