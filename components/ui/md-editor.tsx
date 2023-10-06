'use client';
import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic'
import {
    BoldItalicUnderlineToggles,
    toolbarPlugin, UndoRedo
} from "@mdxeditor/editor";
import React from "react";


const MDXEditor = dynamic(
    () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
    {ssr: false}
)


interface EditorProps {
    value: string,
    onChange: (newText: any) => void,
}

const Editor = ({value, onChange}: EditorProps) => {
    // Your Editor component code here
    return (
        <MDXEditor
            className="dark:dark-theme dark:dark-editor space-x-3 space-y-0 rounded-md border p-4"
            onChange={(newText) => onChange(newText)} // Pass the onChange callback
            markdown={value}
            plugins={[
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <UndoRedo/>
                            <BoldItalicUnderlineToggles/>
                        </>)
                }),
            ]}/>
    )
};

export default Editor
