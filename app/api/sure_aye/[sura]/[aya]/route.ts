
import { NextRequest, NextResponse } from 'next/server';

type ParamsType = { params: { sura: string , aya:string} };

export async function GET(req: NextRequest, { params }: ParamsType) {
    const { sura ,aya } = params;

    try {
        const res = await fetch(`https://quran.rafed.net/api/sura_aya/${sura}/${aya}`);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
