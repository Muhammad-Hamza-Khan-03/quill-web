"use client";
import React from 'react';
import NotFoundPage from '@/pages_components/NotFoundPage';
import { useRouter } from 'next/navigation';

export default function GlobalNotFound() {
    const router = useRouter();

    return (
        <NotFoundPage onReturn={() => router.push('/collections')} />
    );
}
