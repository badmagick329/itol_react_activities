import { useState, useCallback, useEffect, useRef } from "react";

type PasswordOptions = {
  lengthVal?: number;
  numberAllowedVal?: boolean;
  characterAllowedVal?: boolean;
};

export default function PasswordGen({
  lengthVal = 10,
  numberAllowedVal = false,
  characterAllowedVal = false,
}: PasswordOptions) {
  const [length, setLength] = useState<number>(lengthVal);
  const [numberAllowed, setNumberAllowed] = useState<boolean>(numberAllowedVal);
  const [characterAllowed, setCharacterAllowed] =
    useState<boolean>(characterAllowedVal);
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 99999);
      window.navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    }
  }, [password]);

  useEffect(() => {
    if (length > 0) {
      generatePassword();
    }
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-100 mb-2">
              Password Generator
            </h1>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Generated Password:
            </label>
            <div className="flex">
              <input
                type="text"
                value={password}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your password will appear here"
                readOnly
                ref={passwordRef}
              />
              <CopyPasswordButton
                copyPasswordToClipboard={copyPasswordToClipboard}
                copied={copied}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password Length:{" "}
              <span className="text-blue-400 font-semibold">{length}</span>
            </label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                  ((length - 6) / (50 - 6)) * 100
                }%, #374151 ${((length - 6) / (50 - 6)) * 100}%, #374151 100%)`,
              }}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6</span>
              <span>50</span>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <input
                id="numbers"
                type="checkbox"
                checked={numberAllowed}
                onChange={(e) => setNumberAllowed(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="numbers"
                className="ml-3 text-sm font-medium text-gray-300"
              >
                Include Numbers (0-9)
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="characters"
                type="checkbox"
                checked={characterAllowed}
                onChange={(e) => setCharacterAllowed(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="characters"
                className="ml-3 text-sm font-medium text-gray-300"
              >
                Include Special Characters (!@#$%^&*)
              </label>
            </div>
          </div>
          <button
            onClick={generatePassword}
            className="w-full bg-green-800 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 focus:outline-none hover:cursor-pointer"
          >
            Generate New Password
          </button>
          <PasswordStrength length={length} />
        </div>
      </div>
    </div>
  );
}

function CopyPasswordButton({
  copyPasswordToClipboard,
  copied,
}: {
  copyPasswordToClipboard: () => void;
  copied: boolean;
}) {
  return (
    <button
      onClick={copyPasswordToClipboard}
      className={`px-4 py-2 rounded-r-md font-medium text-sm transition-all duration-200 ${
        copied
          ? "bg-green-600 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
    >
      {copied ? (
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Copied!
        </span>
      ) : (
        <span className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </span>
      )}
    </button>
  );
}

function PasswordStrength({ length }: { length: number }) {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">
          Password Strength
        </span>
        <span
          className={`text-xs font-semibold ${
            length < 8
              ? "text-red-400"
              : length < 12
              ? "text-yellow-400"
              : length < 20
              ? "text-green-400"
              : "text-green-300"
          }`}
        >
          {length < 8
            ? "Weak"
            : length < 12
            ? "Medium"
            : length < 20
            ? "Strong"
            : "Very Strong"}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            length < 8
              ? "bg-red-500 w-1/4"
              : length < 12
              ? "bg-yellow-500 w-2/4"
              : length < 20
              ? "bg-green-500 w-3/4"
              : "bg-green-400 w-full"
          }`}
        ></div>
      </div>
    </div>
  );
}
