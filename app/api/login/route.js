import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const data = await req.json();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/authentication/login/`, data);
        const token = response.data['token'];
        const expires = new Date(response.data['expires']);
        const res = NextResponse.json({ status: 'success', data: response.data });
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 5,
        });
        res.cookies.set('expires', expires.toUTCString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 5,
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
