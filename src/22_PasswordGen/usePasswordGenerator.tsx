import { useState, useCallback, useEffect, useRef } from "react";

type PasswordGeneratorOptions = {
  initialLength?: number;
  initialNumberAllowed?: boolean;
  initialCharacterAllowed?: boolean;
};

type PasswordGeneratorReturn = {
  length: number;
  numberAllowed: boolean;
  characterAllowed: boolean;
  password: string;
  copied: boolean;

  setLength: (length: number) => void;
  setNumberAllowed: (allowed: boolean) => void;
  setCharacterAllowed: (allowed: boolean) => void;

  generatePassword: () => void;
  copyPasswordToClipboard: () => void;
  passwordRef: React.RefObject<HTMLInputElement | null>;
};

export default function usePasswordGenerator({
  initialLength = 10,
  initialNumberAllowed = false,
  initialCharacterAllowed = false,
}: PasswordGeneratorOptions = {}): PasswordGeneratorReturn {
  const [length, setLength] = useState<number>(initialLength);
  const [numberAllowed, setNumberAllowed] =
    useState<boolean>(initialNumberAllowed);
  const [characterAllowed, setCharacterAllowed] = useState<boolean>(
    initialCharacterAllowed
  );
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
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

  return {
    length,
    numberAllowed,
    characterAllowed,
    password,
    copied,

    setLength,
    setNumberAllowed,
    setCharacterAllowed,

    generatePassword,
    copyPasswordToClipboard,

    passwordRef,
  };
}
