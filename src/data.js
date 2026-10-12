export const ME = "u0";
export const users = { u0: "You", u1: "Ada", u2: "Tunde", u3: "Mum" };

export const chats = [
  { id: "c1", name: "Ada", members: ["u0", "u1"] },
  { id: "c2", name: "Tunde", members: ["u0", "u2"] },
  { id: "c3", name: "Dev study group", members: ["u0", "u1", "u2"] },
  { id: "c4", name: "Mum", members: ["u0", "u3"] },
];

const now = Date.now();
export const seed = [
  { id: 1, chat_id: "c1", sender_id: "u1", content: "Hey! Did you finish the assignment?", created_at: now - 3600000 },
  { id: 2, chat_id: "c1", sender_id: "u0", content: "Almost, working on the React part", created_at: now - 3500000 },
  { id: 3, chat_id: "c2", sender_id: "u2", content: "Are we meeting tomorrow?", created_at: now - 7200000 },
  { id: 4, chat_id: "c3", sender_id: "u1", content: "Reminder: class at 5pm", created_at: now - 1800000 },
  { id: 5, chat_id: "c4", sender_id: "u3", content: "Have you eaten?", created_at: now - 900000 },
];

export const replies = ["Okay, sounds good!", "Haha nice", "Let me check and get back to you", "Sure, no problem", "Great, thanks!"];

export const fmt = (t) => new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
