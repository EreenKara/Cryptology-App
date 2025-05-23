import { useEffect, useState } from "react";
import { useKeyStore } from "../store/keyStore";
import { useWSStore } from "../store/wsStore";

const ExchangePage = () => {
  const { userId, setUserId, partnerId, setPartnerId, setSocket, socket } =
    useWSStore();
  const { A, B, sharedKeyA, setKeys } = useKeyStore();

  const [receivedKey, setReceivedKey] = useState<bigint | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "connected") {
        setUserId(data.id);
      } else if (data.type === "key-received") {
        const theirPublicKey = BigInt(data.payload);
        setReceivedKey(theirPublicKey);
        // Ortak anahtar hesapla
        if (A && sharedKeyA === 0n) {
          const key = theirPublicKey ** BigInt(A.toString()) % BigInt(7919); // örnek p
          setKeys({ sharedKeyA: key });
        }
      }
    };

    setSocket(ws);
    return () => ws.close();
  }, []);

  const handleSendKey = () => {
    if (!socket || !partnerId || !A) return;
    socket.send(
      JSON.stringify({
        type: "exchange",
        to: partnerId,
        payload: A.toString(),
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        🔄 Diffie-Hellman Key Exchange (WebSocket)
      </h2>

      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Eşleşmek istediğiniz kullanıcı ID’si"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
        />

        <button
          onClick={handleSendKey}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Anahtarımı Gönder
        </button>

        <div className="bg-gray-100 p-4 rounded text-sm mt-4">
          <p>
            <strong>Benim ID:</strong> {userId}
          </p>
          <p>
            <strong>Partner ID:</strong> {partnerId}
          </p>
          <p>
            <strong>Gönderilen Public Key (A):</strong> {A?.toString()}
          </p>
          <p>
            <strong>Alınan Key (B):</strong> {receivedKey?.toString()}
          </p>
          <p>
            <strong>Ortak Anahtar:</strong> {sharedKeyA?.toString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExchangePage;
