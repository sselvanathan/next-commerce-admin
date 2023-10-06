"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action";

export type LayoutColumn = {
    id: string;
    name: string;
    isArchived: boolean;
    createdAt: string;
}

export const columns: ColumnDef<LayoutColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original}/>
    },
]
