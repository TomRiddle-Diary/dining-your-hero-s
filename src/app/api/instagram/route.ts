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
    // Fetch recent media from Instagram Graph API (fetch 6 to ensure we have at least 4)
    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=6&access_token=${accessToken}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Instagram API error:', errorData)
      throw new Error('Failed to fetch Instagram posts')
    }

    const data = await response.json()

    // Extract permalink URLs and take first 4
    const posts = data.data?.slice(0, 4).map((post: any) => post.permalink) || []
    
    // If we got less than 4 posts, use fallback posts to fill
    if (posts.length < 4) {
      const fallbackPosts = [
        'https://www.instagram.com/p/DS1FFeqkxUH/',
        'https://www.instagram.com/p/DThXCEuEYn7/',
        'https://www.instagram.com/p/DTtqnLpE3iP/',
        'https://www.instagram.com/p/DTeyRIoiZlK/',
      ]
      while (posts.length < 4) {
        posts.push(fallbackPosts[posts.length])
      }
    }

    return NextResponse.json({ posts, success: true })
  } catch (error) {
    console.error('Instagram API error:', error)
    
    // Return fallback posts if API fails
    return NextResponse.json({
      posts: [
        'https://www.instagram.com/p/DS1FFeqkxUH/',
        'https://www.instagram.com/p/DThXCEuEYn7/',
        'https://www.instagram.com/p/DTtqnLpE3iP/',
        'https://www.instagram.com/p/DTeyRIoiZlK/',
      ],
      success: false,
      error: 'Using fallback posts'
    })
  }
}
