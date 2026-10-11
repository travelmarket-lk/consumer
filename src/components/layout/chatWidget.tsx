"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import "@/styles/ChatWidget.css";

type Sender = "user" | "agent";

interface Message {
  id: string;
  sender: Sender;
  text: string;
  time: string;
}

const quickReplies = [
  "I need help with my booking",
  "Payment issue",
  "Cancel a reservation",
];

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function autoReply(userText: string): string {
  const text = userText.toLowerCase();
  if (text.includes("cancel")) {
    return "I can help with that. Could you share your booking reference number?";
  }
  if (text.includes("payment") || text.includes("refund")) {
    return "Sorry for the trouble. Refunds usually take 5–7 business days.";
  }
  if (text.includes("booking")) {
    return "Sure, what's the reservation ID or the email you booked with?";
  }
  return "Thanks for reaching out! A support specialist will follow up shortly.";
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [unread, setUnread] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "agent",
      text: "Hi! 👋 Need help with a booking or have a question? I'm here to help.",
      time: nowLabel(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // Hide the "Chat with us!" tooltip automatically after a few seconds
  useEffect(() => {
    const timer = window.setTimeout(() => setShowTooltip(false), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  function openChat() {
    setIsOpen(true);
    setIsClosing(false);
    setShowTooltip(false);
    setUnread(0);
  }

  function closeChat() {
    setIsClosing(true);
    window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 220); // matches the CSS closing animation duration
  }

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: trimmed,
      time: nowLabel(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        sender: "agent",
        text: autoReply(trimmed),
        time: nowLabel(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1100);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="chat-widget-root">
      {/* POPUP WINDOW */}
      {isOpen && (
        <div className={`chat-widget-panel ${isClosing ? "closing" : ""}`}>
          <div className="chat-widget-header">
            <div className="chat-widget-header-info">
              <div className="chat-widget-avatar">
                <img src="/assets/logo-icon.png" alt="TravelMarket" />
                <span className="chat-widget-status-dot" />
              </div>
              <div>
                <h2>TravelMarket Support</h2>
                <p>Typically replies in a few minutes</p>
              </div>
            </div>
            <button
              className="chat-widget-close"
              onClick={closeChat}
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="chat-widget-messages" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-widget-row ${msg.sender}`}>
                {msg.sender === "agent" && (
                  <div className="chat-widget-mini-avatar">
                    <img src="/assets/logo-icon.png" alt="" />
                  </div>
                )}
                <div className="chat-widget-bubble">
                  <p>{msg.text}</p>
                  <span>{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-widget-row agent">
                <div className="chat-widget-mini-avatar">
                  <img src="/assets/logo-icon.png" alt="" />
                </div>
                <div className="chat-widget-bubble chat-widget-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          {messages.length < 3 && (
            <div className="chat-widget-quick-replies">
              {quickReplies.map((reply) => (
                <button key={reply} type="button" onClick={() => sendMessage(reply)}>
                  {reply}
                </button>
              ))}
            </div>
          )}

          <form className="chat-widget-input-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              aria-label="Message"
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* FLOATING BUTTON + TOOLTIP */}
      {!isOpen && (
        <div className="chat-widget-launcher-row">
          {showTooltip && (
            <button
              className="chat-widget-tooltip"
              onClick={openChat}
              type="button"
            >
              Chat with us!
            </button>
          )}

          <button
            className="chat-widget-launcher"
            onClick={openChat}
            aria-label="Open chat"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            {unread > 0 && <span className="chat-widget-badge">{unread}</span>}
          </button>
        </div>
      )}
    </div>
  );
}