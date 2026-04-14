import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー — ビワザ",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-stone-400 hover:text-[#6B8E6B] mb-4 inline-block"
      >
        ← トップに戻る
      </Link>

      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-stone-800 mb-6">プライバシーポリシー</h1>

        <div className="prose prose-stone prose-sm max-w-none space-y-6 text-sm text-stone-600 leading-relaxed">
          <p>
            ビワザ（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
            本プライバシーポリシーは、当サイトにおける個人情報の取り扱いについて説明するものです。
          </p>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">1. 収集する情報</h2>
            <p>当サイトでは、以下の情報を取得する場合があります。</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>投稿情報：</strong>ユーザーが任意で入力するニックネーム、投稿内容、コメント内容、アップロードした画像</li>
              <li><strong>アクセス情報：</strong>IPアドレス、ブラウザの種類、閲覧ページ、アクセス日時など（サーバーログ）</li>
              <li><strong>Cookie情報：</strong>広告配信やアクセス解析のために使用するCookie</li>
            </ul>
            <p className="mt-2">
              当サイトではユーザー登録機能を設けておらず、メールアドレスやパスワード等の個人情報は収集しません。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">2. 情報の利用目的</h2>
            <p>収集した情報は、以下の目的で利用します。</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>当サイトのサービス提供・運営</li>
              <li>投稿内容の表示・管理</li>
              <li>アクセス解析によるサイト改善</li>
              <li>不正行為の防止</li>
              <li>お問い合わせへの対応</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">3. 広告について</h2>
            <p>
              当サイトでは、第三者配信の広告サービスとしてGoogle AdSenseを利用する場合があります。
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Google AdSenseは、ユーザーの興味に基づいた広告を配信するため、Cookieを使用します。</li>
              <li>Google AdSenseによるCookieの使用により、ユーザーが当サイトや他のサイトにアクセスした際の情報に基づき、適切な広告が表示されます。</li>
              <li>ユーザーは、Googleの広告設定ページ（<span className="text-[#6B8E6B]">https://adssettings.google.com</span>）にて、パーソナライズ広告を無効にすることができます。</li>
              <li>詳細については、Googleのポリシーと規約をご参照ください。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">4. アクセス解析ツールについて</h2>
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用する場合があります。
              Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。
              このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              Cookieを無効にすることでデータの収集を拒否することができますので、お使いのブラウザの設定をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">5. Cookieについて</h2>
            <p>
              当サイトでは、以下の目的でCookieを使用しています。
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>投稿の重複投票防止（localStorage）</li>
              <li>広告の配信・最適化</li>
              <li>アクセス解析</li>
            </ul>
            <p className="mt-2">
              ユーザーはブラウザの設定によりCookieの受け入れを拒否できますが、一部の機能が利用できなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">6. 第三者への情報提供</h2>
            <p>
              当サイトは、以下の場合を除き、取得した個人情報を第三者に提供することはありません。
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要な場合</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために必要な場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">7. プライバシーポリシーの変更</h2>
            <p>
              当サイトは、必要に応じて本プライバシーポリシーの内容を変更することがあります。
              変更後のプライバシーポリシーは、当サイトに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">8. お問い合わせ</h2>
            <p>
              本ポリシーに関するお問い合わせは、
              <Link href="/contact" className="text-[#6B8E6B] hover:underline">お問い合わせページ</Link>
              よりご連絡ください。
            </p>
          </section>

          <p className="text-xs text-stone-400 mt-8">制定日：2026年4月10日</p>
        </div>
      </div>
    </div>
  );
}
