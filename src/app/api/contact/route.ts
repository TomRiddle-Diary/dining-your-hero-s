import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'サーバー設定エラー：管理者に連絡してください' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { formType, name, email, phone, message, reservationDate, reservationTime, numberOfPeople, needsCourse, allergies } = body;

    // バリデーション
    if (!name || !email) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      );
    }

    const isReservation = formType === 'reservation';
    const subject = isReservation 
      ? `【ヒーローズ】ご予約 - ${name}様より`
      : `【ヒーローズ】お問い合わせ - ${name}様より`;

    // オーナーへのメール内容
    let ownerEmailContent = `
      <h2>${isReservation ? 'ご予約がありました' : 'お問い合わせがありました'}</h2>
      
      <h3>■ お名前</h3>
      <p>${name}</p>
      
      <h3>■ メールアドレス</h3>
      <p>${email}</p>
      
      <h3>■ 電話番号</h3>
      <p>${phone || '未記入'}</p>
    `;

    if (isReservation) {
      ownerEmailContent += `
        <h3>■ 予約日時</h3>
        <p>${reservationDate || '未記入'} ${reservationTime || ''}</p>
        
        <h3>■ 人数</h3>
        <p>${numberOfPeople || '未記入'}名</p>
        
        <h3>■ コース料理</h3>
        <p>${needsCourse ? '希望あり（要相談）' : '不要'}</p>
        
        <h3>■ アレルギー・食事制限</h3>
        <p>${allergies || 'なし'}</p>
      `;
    }

    ownerEmailContent += `
      <h3>■ ${isReservation ? 'その他のご要望' : 'お問い合わせ内容'}</h3>
      <p style="white-space: pre-wrap;">${message || '未記入'}</p>
    `;

    // お客様への自動返信メール内容
    let autoReplyContent = `
      <div style="font-family: 'Hiragino Kaku Gothic ProN', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0D4D4D; border-bottom: 3px solid #FF6B1A; padding-bottom: 10px;">
          ${isReservation ? 'ご予約' : 'お問い合わせ'}を受け付けました
        </h2>
        
        <p>${name} 様</p>
        
        <p>
          この度は、Dining Your Hero's へ${isReservation ? 'ご予約' : 'お問い合わせ'}いただき、誠にありがとうございます。<br>
          以下の内容で受け付けいたしました。
        </p>
    `;

    if (isReservation) {
      autoReplyContent += `
        <div style="background-color: #F5EBD7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0D4D4D; margin-top: 0;">【ご予約内容】</h3>
          <p><strong>予約日時：</strong>${reservationDate} ${reservationTime}</p>
          <p><strong>人数：</strong>${numberOfPeople}名</p>
          ${needsCourse ? '<p><strong>コース料理：</strong>希望あり</p>' : ''}
          ${allergies ? `<p><strong>アレルギー・食事制限：</strong>${allergies}</p>` : ''}
          ${message ? `<p><strong>その他のご要望：</strong><br>${message}</p>` : ''}
        </div>
      `;
    } else {
      autoReplyContent += `
        <div style="background-color: #F5EBD7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `;
    }

    autoReplyContent += `
        <p>
          ${isReservation 
            ? '2営業日以内にお電話またはメールにてご連絡させていただきます。' 
            : '内容を確認の上、2営業日以内にご返信させていただきます。'}
        </p>
        
        ${isReservation && needsCourse ? `
        <div style="background-color: #FFF7E3; padding: 15px; border-left: 4px solid #FF6B1A; margin: 20px 0;">
          <p style="margin: 0; color: #FF6B1A; font-weight: bold;">
            コース料理について
          </p>
          <p style="margin: 10px 0 0 0;">
            ご要望やご予算に合わせてコース料理をご用意いたします。<br>
            詳細につきましては、お電話またはメールにてご相談させていただきます。
          </p>
        </div>
        ` : ''}
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <div style="color: #666; font-size: 14px;">
          <p><strong>Dining Your Hero's</strong></p>
          <p>
            住所: 〒858-0914 長崎県佐世保市川下町173-1<br>
            電話: 090-9582-0863<br>
            営業時間: 11:30-15:30 (L.O. 15:00) / 17:30-22:00 (L.O. 21:30)<br>
            定休日: 水曜日
          </p>
        </div>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          ※このメールは自動送信されています。<br>
          このメールに返信いただいてもご対応できませんので、ご了承ください。
        </p>
      </div>
    `;

    // 1. オーナーへメール送信
    const { error: ownerError } = await resend.emails.send({
      from: 'Dining Your Hero\'s <noreply@diningyourheros.com>',
      to: 'yourhero.s0924@gmail.com',
      subject: subject,
      html: ownerEmailContent,
    });

    if (ownerError) {
      console.error('オーナーへのメール送信エラー:', JSON.stringify(ownerError, null, 2));
      return NextResponse.json(
        { error: 'メールの送信に失敗しました', details: ownerError.message || 'Unknown error' },
        { status: 500 }
      );
    }

    // 2. お客様へ自動返信メール送信
    const { error: autoReplyError } = await resend.emails.send({
      from: 'Dining Your Hero\'s <noreply@diningyourheros.com>',
      to: email,
      subject: `【Dining Your Hero's】${isReservation ? 'ご予約' : 'お問い合わせ'}を受け付けました`,
      html: autoReplyContent,
    });

    if (autoReplyError) {
      console.error('自動返信メール送信エラー:', JSON.stringify(autoReplyError, null, 2));
      // 自動返信が失敗してもオーナーには届いているので、エラーにはしない
    }

    return NextResponse.json(
      { message: 'メールを送信しました' },
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
