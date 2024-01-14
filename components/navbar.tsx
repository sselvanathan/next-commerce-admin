
import StoreSwitcher from "@/components/store-switcher";
import {ThemeToggle} from "@/components/theme-toggle";
import UserButton from "@/components/ui/user-button";
import {getStoreNames} from "@/actions/store/get-store-names";
import {cookies} from "next/headers";

const Navbar = async () => {
    const cookie = cookies().toString();
    const stores = await getStoreNames(cookie);

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