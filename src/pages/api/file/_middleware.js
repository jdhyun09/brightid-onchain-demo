// pages/images/_middleware.js

import { NextResponse } from 'next/server';

export function middleware(req) {
   // Rewrite /images/... to /api/images/...
   return NextResponse.rewrite('/api' + req.nextUrl.pathname);
}