import { useState, useEffect, useRef } from "react";
import { ME, users, chats, seed, replies, fmt } from "./data";

function App() {
  const [msgs, setMsgs] = useState(seed);
  const [active, setActive] = useState(null);
  const [q, setQ] = useState("");
  const [text, setText] = useState("");
  const end = useRef(null);

  const chat = chats.find((c) => c.id === active);
  const inChat = (id) => msgs.filter((m) => m.chat_id === id);

  useEffect(() => {
    if (end.current) end.current.scrollIntoView();
  }, [msgs, active]);

  const add = (chat_id, sender_id, content) =>
    setMsgs((prev) => [...prev, { id: prev.length + 1, chat_id, sender_id, content, created_at: Date.now() }]);

  const send = () => {
    const content = text.trim();
    if (!content || !chat) return;
    add(chat.id, ME, content);
    setText("");
    const others = chat.members.filter((m) => m !== ME);
    const from = others[Math.floor(Math.random() * others.length)];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => add(chat.id, from, reply), 1200);
  };

  const shown = chats.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className={"app" + (active ? " open" : "")}>
      <div className="side">
        <div className="top">Chats</div>
        <input className="search" placeholder="Search chats" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="list">
          {shown.map((c) => {
            const list = inChat(c.id);
            const last = list[list.length - 1];
            return (
              <div key={c.id} className={"row" + (c.id === active ? " on" : "")} onClick={() => setActive(c.id)}>
                <div className="av">{c.name[0]}</div>
                <div className="meta">
                  <div className="name">{c.name}</div>
                  <div className="last">{last ? last.content : "No messages yet"}</div>
                </div>
                <div className="time">{last ? fmt(last.created_at) : ""}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="main">
        {chat ? (
          <>
            <div className="top">
              <button className="back" onClick={() => setActive(null)}>Back</button>
              <div className="av">{chat.name[0]}</div>
              <div>{chat.name}</div>
            </div>
            <div className="msgs">
              {inChat(chat.id).map((m) => (
                <div key={m.id} className={"b" + (m.sender_id === ME ? " me" : "")}>
                  {chat.members.length > 2 && m.sender_id !== ME && <small>{users[m.sender_id]}</small>}
                  {m.content}
                  <i>{fmt(m.created_at)}</i>
                </div>
              ))}
              <div ref={end} />
            </div>
            <div className="bar">
              <input
                placeholder="Type a message"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button onClick={send}>Send</button>
            </div>
          </>
        ) : (
          <div className="empty">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
}

export default App;
