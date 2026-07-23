import AddressManager from "@/components/profile/address-manager";
import { getUserAddresses } from "@/features/addresses";

export default async function AddressesPage() {
  const addresses = await getUserAddresses();
  return (
    <main className="flex-1 bg-surface">
      <section className="mx-auto w-full max-w-7xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Saved addresses</h1>
        <p className="mt-1 text-sm text-gray-500">Manage delivery addresses for your orders.</p>
        <div className="mt-6"><AddressManager addresses={addresses} /></div>
      </section>
    </main>
  );
}
