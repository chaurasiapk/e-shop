import { CreditCard } from "lucide-react";
import { getUserPayments } from "@/features/payments";

export default async function PaymentsPage() {
  const payments = await getUserPayments();
  return (
    <main className="flex-1 bg-surface">
      <section className="mx-auto w-full max-w-7xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="mt-1 text-sm text-gray-500">Your payment activity will appear here after checkout.</p>
        <div className="mt-6 space-y-3">
          {payments.length ? payments.map((payment) => (
            <article key={payment._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5">
              <div>
                <p className="font-semibold capitalize text-gray-900">{payment.method} payment</p>
                <p className="mt-1 text-sm text-gray-500">Order #{payment.orderId.slice(-8)} · {payment.createdAt.toLocaleDateString("en-IN")}</p>
              </div>
              <div className="text-right"><p className="font-semibold text-gray-900">₹ {payment.amount.toLocaleString("en-IN")}</p><p className="mt-1 text-xs font-semibold capitalize text-primary">{payment.status}</p></div>
            </article>
          )) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center"><CreditCard className="mx-auto h-9 w-9 text-gray-300" /><p className="mt-3 font-semibold text-gray-800">No payments yet</p><p className="mt-1 text-sm text-gray-500">Payment records will be added when orders are placed.</p></div>
          )}
        </div>
      </section>
    </main>
  );
}
