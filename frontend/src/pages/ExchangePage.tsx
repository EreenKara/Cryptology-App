import { useState, useEffect } from "react";
import { getRandomPrime, getRandomInt } from "../utils/randomnessDH";
import { modPowNumber } from "../utils/dh";

const ExchangePage = () => {
  // Ortak değerler
  const [p, setP] = useState<number>(0);
  const [g, setG] = useState<number>(0);
  // Kullanıcı B’ye gönderilen versiyon
  const [pSent, setPSent] = useState<number | null>(null);
  const [gSent, setGSent] = useState<number | null>(null);
  // Kullanıcı A'nın verileri
  const [a, setA] = useState<number>(0);
  const [A, setAKey] = useState<number | null>(null);
  const [A_sent, setASent] = useState<number | null>(null); // karşıya giden
  const [sharedA, setSharedA] = useState<number | null>(null);
  const [messageA, setMessageA] = useState("");
  const [receivedA, setReceivedA] = useState("");

  // Kullanıcı B'nin verileri
  const [b, setB] = useState<number>(0);
  const [B, setBKey] = useState<number | null>(null);
  const [B_sent, setBSent] = useState<number | null>(null);
  const [sharedB, setSharedB] = useState<number | null>(null);
  const [messageB, setMessageB] = useState("");
  const [receivedB, setReceivedB] = useState("");
  // A tarafında p ve g üret
  const generatePG = () => {
    const prime = getRandomPrime();
    const base = getRandomInt(2, prime - 2);
    setP(prime);
    setG(base);

    // Eski değerleri temizle (önceki simülasyonları sıfırlamak için)
    setA(0);
    setB(0);
    setAKey(null);
    setBKey(null);
    setASent(null);
    setBSent(null);
    setSharedA(null);
    setSharedB(null);
    setMessageA("");
    setMessageB("");
    setReceivedA("");
    setReceivedB("");
  };

  // B tarafına p, g gönder
  const sendPGToB = () => {
    setPSent(p);
    setGSent(g);
  };

  // Mesaj şifreleme/çözme
  const encrypt = (msg: string, key: number): string =>
    [...msg].map((ch) => (ch.charCodeAt(0) + key).toString()).join(",");
  const decrypt = (data: string, key: number): string =>
    data
      .split(",")
      .map((c) => String.fromCharCode(+c - key))
      .join("");

  // A tarafı işlemleri
  // A tarafı
  const generateA = () => {
    if (p > 0 && g > 0) {
      const aSecret = getRandomInt(2, p - 2);
      setA(aSecret);
      setAKey(modPowNumber(g, aSecret, p));
    } else {
      alert("Lütfen önce p ve g değerlerini oluşturun.");
    }
  };

  // B tarafı
  const generateB = () => {
    if (pSent && gSent) {
      const bSecret = getRandomInt(2, pSent - 2);
      setB(bSecret);
      setBKey(modPowNumber(gSent, bSecret, pSent));
    } else {
      alert("Lütfen A tarafından p ve g değerlerinin gönderilmesini bekleyin.");
    }
  };

  const sendAToB = () => setASent(A ?? null);
  const generateSharedKeyA = () => {
    if (B_sent !== null) {
      setSharedA(modPowNumber(B_sent, a, p));
    }
  };

  // B tarafı işlemleri
  const sendBToA = () => setBSent(B ?? null);
  const generateSharedKeyB = () => {
    if (A_sent !== null) {
      setSharedB(modPowNumber(A_sent, b, p));
    }
  };

  const sendFromA = () => {
    if (!sharedA) return;
    const encrypted = encrypt(messageA, sharedA);
    setReceivedB(encrypted);
    setMessageA("");
  };

  const sendFromB = () => {
    if (!sharedB) return;
    const encrypted = encrypt(messageB, sharedB);
    setReceivedA(encrypted);
    setMessageB("");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 p-8">
      {/* Kullanıcı A */}
      <div className="flex-1 bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-indigo-700">🧑 Kullanıcı A</h2>
        <p>
          <strong>p:</strong> {p}
        </p>
        <p>
          <strong>g:</strong> {g}
        </p>
        <p>
          <strong>a (gizli):</strong> {a}
        </p>
        <p>
          <strong>A (public):</strong> {A ?? "-"}
        </p>
        <p>
          <strong>B (gelen):</strong> {B_sent ?? "-"}
        </p>
        <p>
          <strong>Ortak Anahtar:</strong> {sharedA ?? "-"}
        </p>

        <div className="space-y-2">
          <button
            onClick={generatePG}
            className="w-full bg-yellow-500 text-white py-2 rounded"
          >
            🧪 p ve g Oluştur
          </button>
          <button
            onClick={sendPGToB}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            📤 p ve g'yi B’ye Gönder
          </button>

          <button
            onClick={generateA}
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            🔑 A oluştur
          </button>
          <button
            onClick={sendAToB}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            📤 A'yı gönder
          </button>
          <button
            onClick={generateSharedKeyA}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            🤝 Ortak Anahtar A Oluştur
          </button>
        </div>

        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Mesaj gönder"
          value={messageA}
          onChange={(e) => setMessageA(e.target.value)}
        />
        <button
          disabled={!sharedA}
          onClick={sendFromA}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Mesaj Gönder ➡️
        </button>
        {receivedA && sharedA && (
          <div className="bg-gray-100 p-3 rounded mt-2">
            <p className="font-semibold">📥 Gelen Mesaj (şifreli):</p>
            <p className="text-sm break-words">{receivedA}</p>
            <p className="font-semibold mt-2">🔓 Çözülmüş:</p>
            <p>{decrypt(receivedA, sharedA)}</p>
          </div>
        )}
      </div>

      {/* Kullanıcı B */}
      <div className="flex-1 bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-green-700">🧑‍💼 Kullanıcı B</h2>
        {!pSent && (
          <p className="text-red-500 text-sm">🔴 p ve g henüz alınmadı</p>
        )}
        {pSent && (
          <p className="text-green-600 text-sm">🟢 p ve g başarıyla alındı</p>
        )}

        <p>
          <strong>b (gizli):</strong> {b}
        </p>
        <p>
          <strong>B (public):</strong> {B ?? "-"}
        </p>
        <p>
          <strong>A (gelen):</strong> {A_sent ?? "-"}
        </p>
        <p>
          <strong>Ortak Anahtar:</strong> {sharedB ?? "-"}
        </p>

        <div className="space-y-2">
          <button
            onClick={generateB}
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            🔑 B oluştur
          </button>
          <button
            onClick={sendBToA}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            📤 B'yi gönder
          </button>
          <button
            onClick={generateSharedKeyB}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
          >
            🤝 Ortak Anahtar B Oluştur
          </button>
        </div>

        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Mesaj gönder"
          value={messageB}
          onChange={(e) => setMessageB(e.target.value)}
        />
        <button
          disabled={!sharedB}
          onClick={sendFromB}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          ⬅️ Mesaj Gönder
        </button>

        {receivedB && sharedB && (
          <div className="bg-gray-100 p-3 rounded mt-2">
            <p className="font-semibold">📥 Gelen Mesaj (şifreli):</p>
            <p className="text-sm break-words">{receivedB}</p>
            <p className="font-semibold mt-2">🔓 Çözülmüş:</p>
            <p>{decrypt(receivedB, sharedB)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangePage;
