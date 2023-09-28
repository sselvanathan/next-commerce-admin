"use client";
import {signOut} from "next-auth/react";
import React, {useState} from "react";
import {LogOut, UserCircle} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";

const UserButton = () => {

    const [open, setOpen] = useState(false);

    return <>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a Store"
                    >
                    <UserCircle/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    signOut()
                                }}>
                                <LogOut className="mr-2 h-5 w-5"/>
                                Sign Out
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </>
}

export default UserButton;