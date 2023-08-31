"use client";

import * as z from "zod";
import axios from "axios";

import {toast} from "react-hot-toast";
import {Trash} from "lucide-react";
import {useForm} from "react-hook-form";
import {useParams, useRouter} from "next/navigation";
import React, {useState} from "react";
import {Billboard, Color} from "@prisma/client";
import {zodResolver} from "@hookform/resolvers/zod";

import {Heading} from "@/components/ui/heading"
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {AlertModal} from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
    buttonLabel: z.string().optional(),
    buttonColor: z.string().optional(),
    isFeatured: z.boolean().default(false).optional(),
});

// Überprüfen, ob "buttonLabel" und "buttonColor" entweder beide gesetzt sein müssen oder beide nicht-leer sein müssen
formSchema.refine((data) => {
    const { buttonLabel, buttonColor } = data;
    return (!buttonLabel && !buttonColor) || (buttonLabel !== "" && buttonColor !== "");
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
    initialData: Billboard | null;
    colors: Color[];
}

export const BillboardForm: React.FC<BillboardFormProps> = ({initialData, colors}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit billboard" : "Create billboard";
    const description = initialData ? "Edit a billboard" : "Add a new billboard";
    const toastMessage = initialData ? "Billboard updated." : "Billboard created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: '',
            buttonLabel: '',
            buttonColor: '',
            isFeatured: false,
        }
    });

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast.success('Billboard deleted.')
        } catch (error) {
            toast.error('Make sure you removed all categories using this billboard first.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="isFeatured"
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
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            This billboard will appear on the home page
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="buttonLabel"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Button Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Button label" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="buttonColor"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}
                                                             placeholder="Select a color"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {colors.map((color) => (
                                                <SelectItem
                                                    key={color.id}
                                                    value={color.id}>
                                                    {color.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}