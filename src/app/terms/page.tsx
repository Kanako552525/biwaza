import Link from "next/link";

export const metadata = {
  title: "利用規約 — ビワザ",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-stone-400 hover:text-[#6B8E6B] mb-4 inline-block"
      >
        ← トップに戻る
      </Link>

      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-stone-800 mb-6">利用規約</h1>

        <div className="prose prose-stone prose-sm max-w-none space-y-6 text-sm text-stone-600 leading-relaxed">
          <p>
            この利用規約（以下「本規約」）は、ビワザ（以下「当サイト」）の利用条件を定めるものです。
            ご利用の皆さま（以下「ユーザー」）には、本規約に同意いただいた上で、当サイトをご利用いただきます。
          </p>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">第1条（適用）</h2>
            <p>
              本規約は、ユーザーと当サイト運営者との間の当サイトの利用に関わる一切の関係に適用されるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">第2条（投稿について）</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>ユーザーは、自身の経験に基づいた美容テクニック（美容ワザ）を投稿できます。</li>
              <li>投稿にあたり、ユーザー登録は不要です。ニックネームの入力は任意であり、未入力の場合は「名無しさん」と表示されます。</li>
              <li>投稿された内容の著作権はユーザーに帰属しますが、当サイトにおいて無償で利用（掲載・編集・削除等）できる権利を当サイト運営者に許諾するものとします。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">第3条（禁止事項）</h2>
            <p>ユーザーは以下の行為を行ってはなりません。</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>当サイトのテーマ（美容テクニック）に関係のない投稿</li>
              <li>他のユーザーや第三者に対する誹謗中傷、名誉毀損、侮辱</li>
              <li>虚偽の情報を故意に投稿する行為</li>
              <li>商品やサービスの宣伝・勧誘・アフィリエイト目的の投稿</li>
              <li>スパム行為、同一内容の繰り返し投稿</li>
              <li>わいせつな内容、暴力的な内容の投稿</li>
              <li>他人の個人情報を投稿する行為</li>
              <li>法令または公序良俗に違反する行為</li>
              <li>当サイトの運営を妨げる行為</li>
              <li>その他、当サイト運営者が不適切と判断する行為</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">第4条（投稿の削除・編集）</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>当サイト運営者は、以下の場合にユーザーの投稿を事前の通知なく削除または編集できるものとします。</li>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>本規約に違反する投稿</li>
                <li>当サイトのテーマに合わない投稿</li>
                <li>第三者から権利侵害の申告があった投稿</li>
                <li>その他、当サイト運営者が不適切と判断した投稿</li>
              </ul>
              <li>削除・編集に関する個別の問い合わせには応じかねる場合があります。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">第5条（免責事項）</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>当サイトに掲載されている美容テクニックは、ユーザー個人の体験に基づくものであり、効果や安全性を保証するものではありません。</li>
              <li>美容ワザの実践により生じた肌トラブル、健康被害、その他いかなる損害についても、当サイト運営者は一切の責任を負いません。</li>
              <li>アレルギーや肌の状態には個人差があります。実践する際はパッチテストを行うなど、ご自身の責任において行ってください。</li>
              <li>当サイトの情報は医療行為の代替となるものではありません。体調に異常を感じた場合は、医療機関を受診してください。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">第6条（広告について）</h2>
            <p>
              当サイトでは、第三者配信の広告サービス（Google AdSense等）を利用しています。
              広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
              詳細は<Link href="/privacy" className="text-[#6B8E6B] hover:underline">プライバシーポリシー</Link>をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">第7条（規約の変更）</h2>
            <p>
              当サイト運営者は、必要と判断した場合には、ユーザーに事前に通知することなく本規約を変更できるものとします。
              変更後の利用規約は、当サイトに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-800 mt-6 mb-2">第8条（お問い合わせ）</h2>
            <p>
              本規約に関するお問い合わせは、
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
