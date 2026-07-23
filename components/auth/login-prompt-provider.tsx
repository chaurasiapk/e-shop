"use client";

import { X } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";

export type PendingAuthAction =
  | { type: "wishlist"; productId: string }
  | { type: "buy-now"; productId: string }
  | { type: "move-to-wishlist"; productId: string }
  | { type: "checkout" };

type LoginPromptContextValue = {
  requestLogin: (action: PendingAuthAction, returnTo?: string) => void;
};

const LoginPromptContext = createContext<LoginPromptContextValue | null>(null);
const PENDING_ACTION_KEY = "e-shop.pending-auth-action";
export const AUTH_ACTION_EVENT = "e-shop:authenticated-action";

function actionsMatch(a: PendingAuthAction, b: PendingAuthAction) {
  return a.type === b.type && (a.type === "checkout" || ("productId" in b && a.productId === b.productId));
}

export default function LoginPromptProvider({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [returnTo, setReturnTo] = useState<string | null>(null);
  const [form, setForm] = useState<"login" | "register">("login");
  const pendingAction = useRef<PendingAuthAction | null>(null);

  useEffect(() => {
    const storedAction = window.sessionStorage.getItem(PENDING_ACTION_KEY);
    if (!storedAction) return;

    try {
      pendingAction.current = JSON.parse(storedAction) as PendingAuthAction;
    } catch {
      window.sessionStorage.removeItem(PENDING_ACTION_KEY);
    }
  }, []);

  const close = () => {
    setReturnTo(null);
    setForm("login");
  };
  const requestLogin = (action: PendingAuthAction, next = pathname) => {
    if (!isAuthenticated) {
      pendingAction.current = action;
      window.sessionStorage.setItem(PENDING_ACTION_KEY, JSON.stringify(action));
      setReturnTo(next);
    }
  };

  const completeAuthentication = () => {
    const action = pendingAction.current;
    pendingAction.current = null;
    window.sessionStorage.removeItem(PENDING_ACTION_KEY);
    close();
    router.refresh();
    if (action) {
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent<PendingAuthAction>(AUTH_ACTION_EVENT, { detail: action }));
      }, 0);
    }
  };
  useEffect(() => {
    if (!returnTo) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [returnTo]);

  return (
    <LoginPromptContext.Provider value={{ requestLogin }}>
      {children}
      {returnTo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/55 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={form === "login" ? "Log in" : "Create an account"}
            className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close login dialog"
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <X className="h-5 w-5" />
            </button>
            {form === "login" ? (
              <Login next={returnTo} isPopup onAuthenticated={completeAuthentication} onRegister={() => setForm("register")} />
            ) : (
              <Register next={returnTo} isPopup onAuthenticated={completeAuthentication} onLogin={() => setForm("login")} />
            )}
          </section>
        </div>
      )}
    </LoginPromptContext.Provider>
  );
}

export function useLoginPrompt() {
  const loginPrompt = useContext(LoginPromptContext);
  if (!loginPrompt) {
    throw new Error("useLoginPrompt must be used within LoginPromptProvider.");
  }
  return loginPrompt;
}

export function isPendingAuthAction(
  action: PendingAuthAction,
  expected: PendingAuthAction,
) {
  return actionsMatch(action, expected);
}
