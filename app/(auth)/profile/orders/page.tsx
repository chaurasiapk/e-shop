import { Package } from "lucide-react";
import { getUserOrders } from "@/features/orders";

export default async function Orders() {
  const orders = await getUserOrders();
  return (
    <main className="flex-1 bg-surface">
      <section className="mx-auto w-full max-w-7xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">My orders</h1>
        <p className="mt-1 text-sm text-gray-500">Track purchases and their delivery status.</p>
        <div className="mt-6 space-y-3">
          {orders.length ? orders.map((order) => (
            <article key={order._id} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">Order #{order._id.slice(-8)}</p>
                  <p className="mt-1 text-sm text-gray-500">{order.items.length} item{order.items.length === 1 ? "" : "s"} · {order.createdAt.toLocaleDateString("en-IN")}</p>
                </div>
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold capitalize text-primary">{order.status}</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-gray-900">₹ {order.total.toLocaleString("en-IN")}</p>
            </article>
          )) : (
            <EmptyState label="No orders yet" description="Completed checkout orders will appear here." />
          )}
        </div>
      </section>
    </main>
  );
}

function EmptyState({ label, description }: { label: string; description: string }) {
  return <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center"><Package className="mx-auto h-9 w-9 text-gray-300" /><p className="mt-3 font-semibold text-gray-800">{label}</p><p className="mt-1 text-sm text-gray-500">{description}</p></div>;
}
