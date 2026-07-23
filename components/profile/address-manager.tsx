"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { MapPin, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createAddressAction, setDefaultAddressAction } from "@/features/addresses";
import type { IAddress } from "@/types/address";

export default function AddressManager({ addresses }: { addresses: IAddress[] }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createAddressAction, {});
  const [isSettingDefault, startSetDefault] = useTransition();
  const [defaultError, setDefaultError] = useState<string | null>(null);

  useEffect(() => {
    if (state.success) router.refresh();
  }, [router, state.success]);

  const setDefault = (addressId: string) => {
    setDefaultError(null);
    startSetDefault(async () => {
      try {
        await setDefaultAddressAction(addressId);
        router.refresh();
      } catch (cause) {
        setDefaultError(cause instanceof Error ? cause.message : "Unable to set the default address.");
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <section className="space-y-3">
        {addresses.length ? addresses.map((address) => (
          <article key={address._id} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">{address.fullName}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ""}, {address.city}, {address.state} {address.postalCode}, {address.country}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">Phone: {address.phone}</p>
                </div>
              </div>
              {address.isDefault ? (
                <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary">Default</span>
              ) : (
                <button type="button" onClick={() => setDefault(address._id)} disabled={isSettingDefault} className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap">
                  {isSettingDefault ? "Updating..." : "Set as default"}
                </button>
              )}
            </div>
          </article>
        )) : (
          <p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">No saved addresses yet. Add one for checkout.</p>
        )}
        {defaultError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{defaultError}</p>}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-gray-900">Add a new address</h2>
        </div>
        <form action={formAction} className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="fullName" />
          <Field label="Phone number" name="phone" inputMode="tel" />
          <Field label="Address line 1" name="addressLine1" className="sm:col-span-2" />
          <Field label="Address line 2 (optional)" name="addressLine2" required={false} className="sm:col-span-2" />
          <Field label="City" name="city" />
          <Field label="State" name="state" />
          <Field label="Postal code" name="postalCode" inputMode="numeric" />
          <Field label="Country" name="country" defaultValue="India" />
          {state.error && <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
          {state.success && <p className="sm:col-span-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">Address saved.</p>}
          <button type="submit" disabled={isPending} className="sm:col-span-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">
            {isPending ? "Saving address..." : "Save address"}
          </button>
        </form>
      </section>
    </div>
  );
}

function Field({ label, name, required = true, className = "", ...inputProps }: {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`grid gap-1.5 text-sm font-medium text-gray-700 ${className}`}>
      {label}
      <input name={name} required={required} className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" {...inputProps} />
    </label>
  );
}
