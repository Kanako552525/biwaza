import Link from "next/link";

export const metadata = {
  title: "運営会社 — ビワザ",
};

export default function CompanyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-stone-400 hover:text-[#6B8E6B] mb-4 inline-block"
      >
        ← トップに戻る
      </Link>

      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-stone-800 mb-6">運営会社</h1>

        <div className="overflow-hidden rounded-lg border border-stone-200">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-stone-200">
                <th className="bg-stone-50 px-4 py-3 text-left font-medium text-stone-700 w-1/3">
                  会社名
                </th>
                <td className="px-4 py-3 text-stone-600">株式会社MAB</td>
              </tr>
              <tr className="border-b border-stone-200">
                <th className="bg-stone-50 px-4 py-3 text-left font-medium text-stone-700">
                  代表者
                </th>
                <td className="px-4 py-3 text-stone-600">
                  <img
                    src="/representative.svg"
                    alt="代表者名"
                    className="h-5 inline-block"
                    draggable={false}
                  />
                </td>
              </tr>
              <tr className="border-b border-stone-200">
                <th className="bg-stone-50 px-4 py-3 text-left font-medium text-stone-700">
                  所在地
                </th>
                <td className="px-4 py-3 text-stone-600">
                  〒107-0062<br />
                  東京都港区南青山3丁目1-36
                </td>
              </tr>
              <tr className="border-b border-stone-200">
                <th className="bg-stone-50 px-4 py-3 text-left font-medium text-stone-700">
                  設立
                </th>
                <td className="px-4 py-3 text-stone-600">2025年</td>
              </tr>
              <tr className="border-b border-stone-200">
                <th className="bg-stone-50 px-4 py-3 text-left font-medium text-stone-700">
                  事業内容
                </th>
                <td className="px-4 py-3 text-stone-600">Webメディア運営</td>
              </tr>
              <tr>
                <th className="bg-stone-50 px-4 py-3 text-left font-medium text-stone-700">
                  運営サイト
                </th>
                <td className="px-4 py-3 text-stone-600">
                  ビワザ（
                  <Link href="/" className="text-[#6B8E6B] hover:underline">
                    https://biwaza.jp
                  </Link>
                  ）
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-stone-500">
          <p>
            当サイトに関するお問い合わせは、
            <Link href="/contact" className="text-[#6B8E6B] hover:underline">
              お問い合わせページ
            </Link>
            よりご連絡ください。
          </p>
        </div>
      </div>
    </div>
  );
}
