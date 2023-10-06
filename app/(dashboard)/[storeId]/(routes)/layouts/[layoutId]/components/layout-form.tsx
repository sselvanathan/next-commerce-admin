"use client";

import * as z from "zod";
import axios from "axios";

import {toast} from "react-hot-toast";
import {Trash} from "lucide-react";
import {useForm} from "react-hook-form";
import {useParams, useRouter} from "next/navigation";
import React, {useState} from "react";
import {Layout} from "@prisma/client";
import {zodResolver} from "@hookform/resolvers/zod";

import {Heading} from "@/components/ui/heading"
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {AlertModal} from "@/components/modals/alert-modal";
import {Checkbox} from "@/components/ui/checkbox";
import Editor from "@/components/ui/md-editor";

const formSchema = z.object({
    name: z.string().min(1),
    markdown: z.string().min(1),
    isArchived: z.boolean().default(false).optional(),
});

type LayoutFormValues = z.infer<typeof formSchema>;

interface LayoutFormProps {
    initialData: Layout | null;
}

export const LayoutForm: React.FC<LayoutFormProps> = (
    {
        initialData,
    }) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editorText, setEditorText] = useState(''); // State to store text from the MDXEditor

    const title = initialData ? "Edit layout" : "Create layout";
    const description = initialData ? "Edit a layout" : "Add a new layout";
    const toastMessage = initialData ? "Layout updated." : "Layout created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<LayoutFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
        } : {
            name: '',
            markdown: '', // Add an empty string for markdown
            isArchived: false,
        }
    });

    const onSubmit = async (data: LayoutFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/layouts/id/${params.layoutId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/layouts/id`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/layouts`);
            toast.success(toastMessage)
        } catch (error) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/layouts/id/${params.layoutId}`);
            router.refresh();
            router.push(`/${params.storeId}/layouts`);
            toast.success('Layout deleted.')
        } catch (error) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    // Handle changes in the MDXEditor
    const handleEditorChange = (newText: string) => {
        setEditorText(newText);
        // Update the hidden input field value whenever editorText changes
        form.setValue('markdown', newText);
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description}/>
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}>
                        <Trash className="h-4 w-4"/>
                    </Button>
                )}
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Layout name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            // @ts-ignore
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Archive
                                        </FormLabel>
                                        <FormDescription>
                                            This layout will not appear anywhere on the store
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Editor value={initialData?.markdown ?? ''}  onChange={handleEditorChange}/>

                    <input
                        type="hidden"
                        {...form.register('markdown')} // Use react-hook-form's register to link the input field
                        value={editorText}
                    />

                    <Button className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}