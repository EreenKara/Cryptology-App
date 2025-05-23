import React, { useState } from "react";
import { useRSAStore } from "../store/rsaStore";
import { generateRSAKeys, encrypt, decrypt } from "../utils/rsa";

const RSAPage = () => {
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState<bigint[]>([]);
  const [decrypted, setDecrypted] = useState("");

  const { setKeys, p, q, e, d, n, publicKey, privateKey } = useRSAStore();

  const handleGenerate = () => {
    const p = 61n;
    const q = 53n;
    const rsa = generateRSAKeys(p, q);
    setKeys(rsa);
    setEncrypted([]);
    setDecrypted("");
  };

  const handleEncrypt = () => {
    if (!e || !n) return;
    const cipher = encrypt(message, e, n);
    setEncrypted(cipher);
  };

  const handleDecrypt = () => {
    if (!d || !n) return;
    const plain = decrypt(encrypted, d, n);
    setDecrypted(plain);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-700">
        RSA Şifreleme
      </h2>

      <div className="bg-red-100 p-4 rounded-lg border-l-4 border-red-500">
        <h3 className="text-2xl font-bold text-center mb-6 text-red-700">
          Formüller
        </h3>
        <p className="text-sm text-gray-700">
          <strong>n = p * q</strong>,  
          <br />
          <strong>ϕ(n) = (p - 1)(q - 1)</strong>,  
          <br />
          <strong>d ≡ e⁻¹ mod ϕ(n)</strong>,  
          <br />
          <strong>Şifreli = m^e mod n</strong>,  
          <br />
          <strong>Çözülmüş = c^d mod n</strong>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition"
          onClick={handleGenerate}
        >
          🔐 Anahtarları Oluştur
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Mesaj giriniz"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            onClick={handleEncrypt}
          >
            🔒 Şifrele
          </button>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            onClick={handleDecrypt}
          >
            🔓 Çöz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-100 p-4 rounded border-l-4 border-gray-500">
          <h4 className="font-semibold text-gray-700 mb-2">🔑 Anahtarlar</h4>
          <p>
            <strong>p:</strong> {p?.toString()}
          </p>
          <p>
            <strong>q:</strong> {q?.toString()}
          </p>
          <p>
            <strong>n:</strong> {n?.toString()}
          </p>
          <p>
            <strong>ϕ(n):</strong>{" "}
            {p && q ? ((p - 1n) * (q - 1n)).toString() : "-"}
          </p>
          <p>
            <strong>e:</strong> {e?.toString()}
          </p>
          <p>
            <strong>d:</strong> {d?.toString()}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded border-l-4 border-gray-500">
          <h4 className="font-semibold text-gray-700 mb-2">
            📦 Şifreleme Sonuçları
          </h4>
          <p>
            <strong>Public Key:</strong> {publicKey}
          </p>
          <p>
            <strong>Private Key:</strong> {privateKey}
          </p>
          <p>
            <strong>Şifrelenmiş:</strong>
          </p>
          <div className="break-words">{encrypted.join(" ")}</div>
          <p className="mt-2">
            <strong>Çözülmüş:</strong> {decrypted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RSAPage;
