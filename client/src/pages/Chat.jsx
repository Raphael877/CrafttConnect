import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Send, User as UserIcon, Shield } from "lucide-react";
import io from "socket.io-client";
import axios from "axios";
import API_URL from "../config";

const ChatContainer = styled.div`
  padding-top: 80px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`;

const ChatHeader = styled.div`
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 1rem;

  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.success};
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div`
  max-width: 60%;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  font-size: 1rem;
  line-height: 1.5;
  align-self: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
  background: ${({ isMe, theme }) =>
    isMe ? theme.colors.primary : theme.colors.surface};
  color: ${({ isMe }) => (isMe ? "white" : "inherit")};
  border-bottom-right-radius: ${({ isMe }) => (isMe ? "4px" : "20px")};
  border-bottom-left-radius: ${({ isMe }) => (isMe ? "20px" : "4px")};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const InputArea = styled.form`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 1rem;
`;

const TextInput = styled.input`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  color: white;
  outline: none;
  font-size: 1rem;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: scale(1.05);
  }
`;

const Chat = () => {
  const { id: recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")),
  );
  const socket = useRef();
  const scrollRef = useRef();

  const chatId = [user?._id, recipientId].sort().join("_");

  useEffect(() => {
    socket.current = io(API_URL);
    socket.current.emit("join_room", chatId);

    socket.current.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.current.disconnect();
  }, [chatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/chat/${chatId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchMessages();
  }, [chatId, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const messageData = {
      room: chatId,
      sender: user._id,
      text,
      timestamp: new Date(),
    };
    socket.current.emit("send_message", messageData);

    try {
      await axios.post(
        `${API_URL}/api/chat`,
        { recipientId, text, chatId },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user)
    return (
      <div style={{ paddingTop: "100px", textAlign: "center" }}>
        Please login to chat.
      </div>
    );

  return (
    <ChatContainer>
      <ChatHeader>
        <div
          style={{
            padding: "0.5rem",
            background: "#334155",
            borderRadius: "10px",
          }}
        >
          <UserIcon size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>Artisan Chat</h3>
          <div className="status">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#10b981",
              }}
            />{" "}
            Online
          </div>
        </div>
      </ChatHeader>

      <MessagesArea>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Shield size={16} color="#94a3b8" />
          <p
            style={{
              fontSize: "0.8rem",
              color: "#94a3b8",
              marginTop: "0.5rem",
            }}
          >
            Messages are secure and private. Never share personal sensitive
            information.
          </p>
        </div>
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            isMe={msg.sender === user._id || msg.sender._id === user._id}
          >
            {msg.text}
          </MessageBubble>
        ))}
        <div ref={scrollRef} />
      </MessagesArea>

      <InputArea onSubmit={handleSend}>
        <TextInput
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendButton type="submit">
          <Send size={20} />
        </SendButton>
      </InputArea>
    </ChatContainer>
  );
};

export default Chat;
