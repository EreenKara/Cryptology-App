import React, { useState, type JSX } from "react";
import { rc4 } from "../utils/rc4";

const RC4Page = () => {
  const [plainText, setPlainText] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [steps, setSteps] = useState<JSX.Element[]>([]);

  const handleEncryptDecrypt = () => {
    setSteps([]);
    if (!plainText || !keyInput) return;

    const newSteps: JSX.Element[] = [];

    // 1️⃣ Açık Metin ve Anahtar
    newSteps.push(
      <div className="bg-white shadow p-4 rounded border-l-4 border-indigo-500">
        <h3 className="font-semibold text-indigo-700 mb-1">1️⃣ Açık Metin</h3>
        <p className="text-sm text-gray-700">{plainText}</p>
      </div>
    );

    newSteps.push(
      <div className="bg-white shadow p-4 rounded border-l-4 border-yellow-500">
        <h3 className="font-semibold text-yellow-700 mb-1">
          2️⃣ Kullanıcı Anahtarı
        </h3>
        <p className="text-sm text-gray-700">{keyInput}</p>
      </div>
    );

    // 3️⃣ RC4 Şifreleme
    const encryptedBinary = rc4(keyInput, plainText);
    const encryptedBase64 = btoa(encryptedBinary);
    newSteps.push(
      <div className="bg-white shadow p-4 rounded border-l-4 border-green-500">
        <h3 className="font-semibold text-green-700 mb-1">
          3️⃣ Şifrelenmiş Metin (Base64)
        </h3>
        <p className="text-sm break-all text-gray-700">{encryptedBase64}</p>
      </div>
    );

    // 4️⃣ RC4 Çözme
    const decrypted = rc4(keyInput, encryptedBinary);
    newSteps.push(
      <div className="bg-white shadow p-4 rounded border-l-4 border-purple-500">
        <h3 className="font-semibold text-purple-700 mb-1">4️⃣ Çözülen Metin</h3>
        <p className="text-sm text-gray-700">{decrypted}</p>
      </div>
    );

    setSteps(newSteps);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 shadow-md rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-700">
        RC4 Şifreleme ve Çözme Simülasyonu 🔐
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Anahtar girin (örn: sifre123)"
        />

        <textarea
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Şifrelenecek metni girin"
        />

        <button
          onClick={handleEncryptDecrypt}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          🔄 Şifrele ve Çöz
        </button>
      </div>

      <div className="space-y-4 mt-6">{steps}</div>
    </div>
  );
};

export default RC4Page;
