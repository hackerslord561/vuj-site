'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { ReactQuillProps } from 'react-quill-new';

const ReactQuill = dynamic<ReactQuillProps>(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    useEffect(() => {
        import('react-quill-new/dist/quill.snow.css');
    }, []);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            className="bg-white"
        />
    );
}