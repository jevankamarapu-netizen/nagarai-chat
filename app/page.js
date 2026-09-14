"use client";

import { useState } from "react";

export default function Home() {
  const [chats, setChats] = useState([
    { id: 1, title: "New conversation", messages: [] }
  ]);
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const activeChat = chats.find((c) => c.id === activeId);

  function newChat() {
    const id = Date.now();
    setChats((prev) => [
      ...prev,
      { id, title: "New conversation", messages: [] }
    ]);
    setActiveId(id);
    setInput("");
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: "user", content: text };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              title: c.messages.length ? c.title : text.slice(0, 28),
              messages: [...c.messages, userMessage]
            }
          : c
      )
    );
    setInput("");
    setLoading(true);

    try {
      const messages = [...activeChat.messages, userMessage];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setChats((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  userMessage,
                  { role: "assistant", content: data.text }
                ]
              }
            : c
        )
      );
    } catch (error) {
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  userMessage,
                  {
                    role: "assistant",
                    content: `Error: ${error.message}`
                  }
                ]
              }
            : c
        )
      );
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandIcon">✦</div>
          <span>NAGARAI</span>
        </div>

        <button className="newChat" onClick={newChat}>
          <span>＋</span> New chat
        </button>

        <div className="history">
          <div className="historyLabel">Recent</div>
          {chats.map((chat) => (
            <button
              key={chat.id}
              className={`historyItem ${chat.id === activeId ? "active" : ""}`}
              onClick={() => setActiveId(chat.id)}
            >
              <span>◌</span>
              {chat.title}
            </button>
          ))}
        </div>

        <div className="sidebarBottom">
          <div className="sideLink">⚙ Settings</div>
          <div className="profile">
            <div className="avatar">N</div>
            <div>
              <strong>Nagaraju</strong>
              <small>Personal</small>
            </div>
          </div>
        </div>
      </aside>

      <section className="chat">
        <header className="topbar">
          <button className="mobileMenu" onClick={() => alert("Use desktop sidebar for now.")}>☰</button>
          <div className="modelName">NAGARAI <span>▾</span></div>
        </header>

        <div className="messages">
          {activeChat.messages.length === 0 ? (
            <div className="welcome">
              <div className="welcomeIcon">✦</div>
              <h1>How can I help you?</h1>
              <p>Ask anything and get an AI-powered answer.</p>

              <div className="suggestions">
                <button onClick={() => setInput("Explain artificial intelligence in simple words.")}>
                  Explain AI simply
                </button>
                <button onClick={() => setInput("Help me write a professional email.")}>
                  Write an email
                </button>
                <button onClick={() => setInput("Give me 5 YouTube video ideas.")}>
                  YouTube ideas
                </button>
                <button onClick={() => setInput("Help me learn JavaScript.")}>
                  Learn JavaScript
                </button>
              </div>
            </div>
          ) : (
            activeChat.messages.map((message, index) => (
              <div key={index} className={`messageRow ${message.role}`}>
                <div className="messageAvatar">
                  {message.role === "user" ? "N" : "✦"}
                </div>
                <div className="messageContent">
                  <div className="messageRole">
                    {message.role === "user" ? "You" : "NAGARAI"}
                  </div>
                  <div className="messageText">{message.content}</div>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="messageRow assistant">
              <div className="messageAvatar">✦</div>
              <div className="messageContent">
                <div className="messageRole">NAGARAI</div>
                <div className="typing"><span></span><span></span><span></span></div>
              </div>
            </div>
          )}
        </div>

        <div className="composerWrap">
          <div className="composer">
            <button className="attach" title="Coming soon">＋</button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message NAGARAI..."
              rows={1}
            />
            <button
              className="send"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              title="Send"
            >
              ↑
            </button>
          </div>
          <div className="disclaimer">
            NAGARAI can make mistakes. Check important information.
          </div>
        </div>
      </section>
    </main>
  );
}