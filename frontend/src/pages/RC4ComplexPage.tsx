import React, { useState, type JSX } from "react";
import { rc4WithSteps } from "../utils/rc4";
import type { Rc4Step } from "../utils/rc4";

const RC4Page = () => {
  const [plainText, setPlainText] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [steps, setSteps] = useState<JSX.Element[]>([]);

  const handleEncryptDecrypt = () => {
    setSteps([]);
    if (!plainText || !keyInput) return;

    const newSteps: JSX.Element[] = [];

    const { encrypted, steps: prgaSteps } = rc4WithSteps(keyInput, plainText);
    const encryptedBase64 = btoa(encrypted);
    const decrypted = rc4WithSteps(keyInput, encrypted).encrypted;

    newSteps.push(
      <div className="bg-white p-4 rounded border-l-4 border-indigo-500 shadow">
        <h3 className="font-semibold text-indigo-700 mb-1">1️⃣ Açık Metin</h3>
        <p className="text-sm text-gray-700">{plainText}</p>
      </div>
    );

    newSteps.push(
      <div className="bg-white p-4 rounded border-l-4 border-yellow-500 shadow">
        <h3 className="font-semibold text-yellow-700 mb-1">2️⃣ Anahtar</h3>
        <p className="text-sm text-gray-700">{keyInput}</p>
      </div>
    );

    newSteps.push(
      <div className="bg-white p-4 rounded border-l-4 border-green-500 shadow">
        <h3 className="font-semibold text-green-700 mb-1">
          3️⃣ Şifrelenmiş Metin (Base64)
        </h3>
        <p className="text-sm break-all text-gray-700">{encryptedBase64}</p>
      </div>
    );

    newSteps.push(
      <div className="bg-white p-4 rounded border-l-4 border-purple-500 shadow">
        <h3 className="font-semibold text-purple-700 mb-1">4️⃣ Çözülen Metin</h3>
        <p className="text-sm text-gray-700">{decrypted}</p>
      </div>
    );

    // PRGA Adımları
    prgaSteps.forEach((step: Rc4Step) => {
      newSteps.push(
        <div
          key={step.charIndex}
          className="bg-white p-4 rounded border-l-4 border-blue-500 shadow"
        >
          <h4 className="font-semibold text-blue-700 mb-1">
            🔄 PRGA Adımı #{step.charIndex + 1}
          </h4>
          <p className="text-sm text-gray-700">
            <strong>Input:</strong> '{step.inputChar}' |{" "}
            <strong>Output:</strong> '{step.outputChar}'<br />
            <strong>i:</strong> {step.i}, <strong>j:</strong> {step.j},{" "}
            <strong>k:</strong> {step.k}
          </p>
          <p className="text-xs text-gray-500">
            S dizisi (ilk 10): [{step.S.join(", ")}]
          </p>
        </div>
      );
    });

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
          🔄 Şifrele, Çöz ve Adımları Göster
        </button>
      </div>

      <div className="space-y-4 mt-6">{steps}</div>
    </div>
  );
};

export default RC4Page;
