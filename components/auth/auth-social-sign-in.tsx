export default function AuthSocialSignIn() {
  return (
    <>
      <div className="my-6 flex items-center gap-3 text-xs text-gray-400 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200">
        OR CONTINUE WITH
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <span className="mr-2 font-bold text-red-500">G</span>Google
        </button>
        <button type="button" className="rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <span className="mr-2 text-base text-black">●</span>Apple
        </button>
      </div>
    </>
  );
}
