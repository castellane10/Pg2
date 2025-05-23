import { useState } from "react";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: input }),
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.respuesta };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Hubo un error al conectar con el bot." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
            <button
                onClick={toggleChat}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
            >
                💬
            </button>
        )}

      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col mt-2">
          <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
            <h2 className="font-semibold">Asistente</h2>
            <button onClick={toggleChat}>✖</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-[80%] whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-xs">Escribiendo...</div>
            )}
          </div>

          <div className="p-2 border-t">
            <textarea
              className="w-full p-2 border rounded-md text-sm resize-none h-16 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
            <button
              onClick={sendMessage}
              className="mt-1 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
              disabled={loading}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
