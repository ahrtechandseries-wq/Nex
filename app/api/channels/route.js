import { NextResponse } from 'next/server';
import { buildCatalogue } from '@/lib/aggregate';

// Route Handler-level caching: Vercel will cache this response
// and only re-run buildCatalogue() (re-fetch + re-parse every
// source) at most once per revalidate window, instead of on
// every single page load. This satisfies the "do not download
// huge playlists repeatedly on every render" requirement
// without needing a separate database/cron/proxy layer.
export const revalidate = 1800; // 30 minutes

export async function GET() {

  try {

    const catalogue = await buildCatalogue();

    return NextResponse.json(catalogue, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600'
      }
    });

  }

  catch (err) {

    console.log('NexLive /api/channels failed:', err);

    return NextResponse.json(
      { error: 'Could not build the channel catalogue right now.', channels: [] },
      { status: 502 }
    );

  }

}
