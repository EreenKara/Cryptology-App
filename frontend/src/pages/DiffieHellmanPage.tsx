import { useState } from "react";
import { modPow } from "../utils/dh";
import { useKeyStore } from "../store/keyStore";
import {
  getRandomInt,
  getRandomPrime,
  generateDiffieHellman256,
} from "../utils/randomnessDH";

const DiffieHellmanPage = () => {
  const { p, g, a, b, A, B, sharedKeyA, sharedKeyB, setKeys, reset } =
    useKeyStore();

  const [pInput, setPInput] = useState("");
  const [gInput, setGInput] = useState("");
  const [aInput, setAInput] = useState("");
  const [bInput, setBInput] = useState("");

  // Output (beklenen):
  // p (dec): 123456... (çok büyük bir sayı)
  // p (bit length): yaklaşık 512

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const pNum = BigInt(pInput);
      const gNum = BigInt(gInput);
      const aNum = BigInt(aInput);
      const bNum = BigInt(bInput);

      const A = modPow(gNum, aNum, pNum);
      const B = modPow(gNum, bNum, pNum);
      const sharedKeyA = modPow(B, aNum, pNum);
      const sharedKeyB = modPow(A, bNum, pNum);

      setKeys({
        p: pNum,
        g: gNum,
        a: aNum,
        b: bNum,
        A,
        B,
        sharedKeyA,
        sharedKeyB,
      });
    } catch (err) {
      alert(
        "Geçersiz giriş! Lütfen tüm alanların sayısal ve dolu olduğuna emin olun."
      );
    }
  };

  const handleRandomFillBasic = () => {
    const pRand = getRandomPrime();
    const gRand = getRandomInt(2, pRand - 2);
    const aRand = getRandomInt(2, pRand - 2);
    const bRand = getRandomInt(2, pRand - 2);

    setPInput(pRand.toString());
    setGInput(gRand.toString());
    setAInput(aRand.toString());
    setBInput(bRand.toString());
  };
  const handleRandomFillComplex = () => {
    const { p, g, a, b } = generateDiffieHellman256();

    setPInput(p.toString());
    setGInput(g.toString());
    setAInput(a.toString());
    setBInput(b.toString());
  };
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        Diffie-Hellman Key Exchange
      </h2>
      <div className="bg-red-100 p-4 rounded border-l-4 border-red-500">
        <h3 className="text-2xl font-bold text-center mb-6 text-red-700">
          Formüller
        </h3>
        <p className="text-center text-gray-600 mb-6">
          <strong>
            A = g<sup>a</sup> mod p,  B = g<sup>b</sup> mod p,  Ortak Anahtar =
            B<sup>a</sup> mod p = A<sup>b</sup> mod p
          </strong>
        </p>
      </div>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Ortak Asal Sayı (p):</label>
            <input
              type="number"
              value={pInput}
              onChange={(e) => setPInput(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Ortak Taban (g):</label>
            <input
              type="number"
              value={gInput}
              onChange={(e) => setGInput(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">
              Kullanıcı A'nın Gizli Anahtarı (a):
            </label>
            <input
              type="number"
              value={aInput}
              onChange={(e) => setAInput(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">
              Kullanıcı B'nin Gizli Anahtarı (b):
            </label>
            <input
              type="number"
              value={bInput}
              onChange={(e) => setBInput(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="flex justify-center gap-4 mb-4">
          <button
            type="button"
            onClick={handleRandomFillBasic}
            className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 mb-4"
          >
            🎲 Basit Rastgele Değerlerle Doldur
          </button>
          <button
            type="button"
            onClick={handleRandomFillComplex}
            className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 mb-4"
          >
            🎲 Gerçek Rastgele Değerlerle Doldur
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Anahtarları Hesapla
        </button>
      </form>

      {A !== null && B !== null && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-800 mb-2">Kullanıcı A</h3>
            <p>
              <strong>Public Key (A):</strong> {A}
            </p>
            <p>
              <strong>Ortak Anahtar:</strong> {sharedKeyA}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded border-l-4 border-green-500">
            <h3 className="font-semibold text-green-800 mb-2">Kullanıcı B</h3>
            <p>
              <strong>Public Key (B):</strong> {B}
            </p>
            <p>
              <strong>Ortak Anahtar:</strong> {sharedKeyB}
            </p>
          </div>
        </div>
      )}

      {sharedKeyA !== null &&
        sharedKeyB !== null &&
        sharedKeyA !== sharedKeyB && (
          <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded">
            ❌ Ortak anahtarlar uyuşmuyor! (Hatalı giriş olabilir)
          </div>
        )}
    </div>
  );
};

export default DiffieHellmanPage;
