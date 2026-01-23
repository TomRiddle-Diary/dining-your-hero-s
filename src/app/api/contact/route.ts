import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      );
    }

    // Resendでメール送信
    const { data, error } = await resend.emails.send({
      from: 'Dining Your Heros <onboarding@resend.dev>', // 後で独自ドメインに変更可能
      to: 'bb123021@sun.ac.jp',
      subject: `【ヒーローズ】お問い合わせ - ${name}様より`,
      html: `
        <h2>お問い合わせがありました</h2>
        
        <h3>■ お名前</h3>
        <p>${name}</p>
        
        <h3>■ メールアドレス</h3>
        <p>${email}</p>
        
        <h3>■ 電話番号</h3>
        <p>${phone || '未記入'}</p>
        
        <h3>■ お問い合わせ内容</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    if (error) {
      console.error('Resendエラー:', error);
      return NextResponse.json(
        { error: 'メールの送信に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'メールを送信しました', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json(
      { error: 'メールの送信に失敗しました' },
      { status: 500 }
    );
  }
}
