"use client";

import {cn} from "@/lib/utils";
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";
import React from "react";

export function Sidebar(
    {
        className,
        children,
        ...props
    }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            active: pathname.startsWith(`/${params.storeId}/products`),
            children: [
                {
                    href: `/${params.storeId}/products/sizes`,
                    label: 'Sizes',
                    active: pathname.startsWith(`/${params.storeId}/products/sizes`),
                },
                {
                    href: `/${params.storeId}/products/colors`,
                    label: 'Colors',
                    active: pathname.startsWith(`/${params.storeId}/products/colors`),
                },
            ],
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Categories',
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Orders',
            active: pathname === `/${params.storeId}/orders`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
        },
    ];

    return (
        <div
            className={cn("flex flex-col h-screen p-3 w-60", className)}
            {...props}>
            <div className="space-y-3">
                <div className="flex items-center">
                    <Link
                        href={`/${params.storeId}`}
                        className={cn("text-xl font-bold",
                            pathname === `/${params.storeId}` ? "text-black dark:text-white"
                                : "text-muted-foreground"
                        )}
                    >
                        <span>Dashboard</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        {routes.map((route) => (
                            <li className="rounded-sm" key={route.href}>
                                <Link
                                    href={route.href}
                                    className={cn("text-xl font-medium transition-colors hover:text-primary",
                                        route.active ? "text-black dark:text-white"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <span>{route.label}</span>
                                </Link>
                                {route.children && route.active && (
                                    <ul className="pl-4 space-y-1">
                                        {route.children.map((child) => (
                                            <li className="rounded-sm" key={child.href}>
                                                <Link
                                                    href={child.href}
                                                    className={cn("text-base font-medium transition-colors hover:text-primary",
                                                        child.active ? "text-black dark:text-white"
                                                            : "text-muted-foreground"
                                                    )}
                                                >
                                                    <span>{child.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
