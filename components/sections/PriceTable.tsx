import Link from "next/link";
import { formatPrice, priceColumns, priceRows } from "@/data/prices";

/**
 * PC用の料金比較表。
 * 月会費 / 単発 / 4回券 / 8回券 を横並びで見比べられます。
 * （スマートフォンでは PriceCard を表示するため、md 未満では非表示）
 */
export default function PriceTable() {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-brand-100 shadow-sm md:block">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          通常クラスの料金一覧（月会費・単発・回数券4回分・回数券8回分）
        </caption>
        <thead>
          <tr className="bg-brand-800 text-white">
            <th scope="col" className="px-6 py-4 text-sm font-bold">
              クラス
            </th>
            {priceColumns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-6 py-4 text-right text-sm font-bold"
              >
                {col.label}
                <span className="mt-0.5 block text-[11px] font-normal text-brand-200">
                  {col.note}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-100 bg-white">
          {priceRows.map((row) => (
            <tr key={row.key} className="transition-colors hover:bg-brand-50">
              <th scope="row" className="px-6 py-5">
                <Link
                  href={`/classes#${row.classSlug}`}
                  className="text-base font-bold text-brand-800 transition-colors hover:text-accent-dark"
                >
                  {row.className}
                </Link>
              </th>
              <td className="px-6 py-5 text-right">
                <span className="text-xl font-extrabold text-brand-800">
                  {formatPrice(row.monthly)}
                </span>
              </td>
              <td className="px-6 py-5 text-right text-base font-semibold text-slate-700">
                {formatPrice(row.single)}
              </td>
              <td className="px-6 py-5 text-right text-base font-semibold text-slate-700">
                {formatPrice(row.ticket4)}
              </td>
              <td className="px-6 py-5 text-right text-base font-semibold text-slate-700">
                {formatPrice(row.ticket8)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
