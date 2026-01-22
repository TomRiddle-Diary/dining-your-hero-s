import { NextResponse } from 'next/server'

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  if (!accessToken || !userId) {
    return NextResponse.json(
      { error: 'Instagram credentials not configured' },
      { status: 500 }
    )
  }

  try {
    // Fetch recent media from Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=4&access_token=${accessToken}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Instagram posts')
    }

    const data = await response.json()

    // Extract permalink URLs
    const posts = data.data?.map((post: any) => post.permalink) || []

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Instagram API error:', error)
    
    // Return fallback posts if API fails
    return NextResponse.json({
      posts: [
        'https://www.instagram.com/p/DOPxlA1D9MB/?img_index=1',
        'https://www.instagram.com/p/DIr2WKFhuq1/?img_index=1',
        'https://www.instagram.com/p/DCPxstBSB8_/?img_index=1',
        'https://www.instagram.com/p/C-L6JW4Kcvj/',
      ]
    })
  }
}
