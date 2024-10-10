
import { NextRequest, NextResponse } from 'next/server';

type ParamsType = { params: { id: string } };

export async function GET(req: NextRequest, { params }: ParamsType) {
    const { id } = params;

    try {
        const res = await fetch(`https://quran.rafed.net/api/sura_aya/${id}/1`);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
