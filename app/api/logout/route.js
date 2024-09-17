import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const res = NextResponse.json({ status: 'success' });
        res.cookies.delete('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        res.cookies.delete('expires', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        return res;
    } catch (error) {
        const { status, data } = error.response;
        return new NextResponse(
            JSON.stringify({ error: data }),
            { status: status, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
