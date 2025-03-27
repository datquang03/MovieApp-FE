import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMessagesByIdAction,
  sendMessageAction,
} from "../../../redux/action/message.action";
import { getAllUsersAction } from "../../../redux/action/user.action";
import Sidebar from "../../dashboard/Sidebar";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import io from "socket.io-client";

// Khởi tạo kết nối WebSocket
const socket = io("http://localhost:5000", {
  reconnection: true, // Tự động kết nối lại nếu mất kết nối
});

const MessagePage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]); // Quản lý tin nhắn local (Redux + real-time)
  const messagesEndRef = useRef(null); // Để tự động cuộn xuống tin nhắn mới nhất
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    isLoading,
    isError,
    messages: reduxMessages = [],
  } = useSelector((state) => state.getMessageById);
  const {
    isLoading: usersLoading,
    isError: usersError,
    users = [],
  } = useSelector((state) => state.adminGetAllUsers);

  // Tự động cuộn xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Lấy tin nhắn ban đầu từ Redux
  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(getAllUsersAction());
    } else if (id) {
      dispatch(getMessagesByIdAction(id));
    }
  }, [dispatch, id, userInfo]);

  useEffect(() => {
    if (userInfo?.isAdmin && selectedUser) {
      dispatch(getMessagesByIdAction(selectedUser));
    }
  }, [dispatch, selectedUser, userInfo]);

  // Đồng bộ tin nhắn từ Redux với state local
  useEffect(() => {
    setMessages(reduxMessages);
  }, [reduxMessages]);

  // Thiết lập WebSocket
  useEffect(() => {
    // Kết nối socket khi component mount
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      // Tham gia room với userId của mình
      socket.emit("join", userInfo?._id);
    });

    // Nhận tin nhắn real-time từ server
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    // Cleanup khi component unmount
    return () => {
      socket.off("receive_message");
      socket.off("connect");
    };
  }, [userInfo]);

  const handleSelectUser = (userId) => {
    console.log("Selected user ID:", userId);
    setSelectedUser(userId);
    setMessages([]); // Reset tin nhắn khi chọn user mới
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const targetId = userInfo?.isAdmin ? selectedUser : id;
    if (!targetId) {
      console.log("No target user selected");
      return;
    }

    const messageData = {
      senderId: userInfo._id,
      receiverId: targetId,
      message: newMessage,
    };

    // Gửi tin nhắn qua WebSocket
    socket.emit("send_message", messageData);

    // Đồng thời gửi qua Redux để lưu vào DB (nếu cần)
    dispatch(sendMessageAction(targetId, newMessage)).then(() => {
      setNewMessage("");
      setShowEmojiPicker(false);
      scrollToBottom();
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredUsers = users.filter((user) => user._id !== userInfo?._id);

  return (
    <Sidebar>
      <div className="flex h-full">
        {userInfo?.isAdmin && (
          <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Users</h2>
            {usersLoading ? (
              <p className="text-white">Loading users...</p>
            ) : usersError ? (
              <p className="text-red-500">{usersError}</p>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="p-3 cursor-pointer bg-gray-700 text-white rounded-lg mb-2 hover:bg-gray-600 transition-colors"
                  onClick={() => handleSelectUser(user._id)}
                >
                  {user.fullName || "Unknown User"}
                </div>
              ))
            ) : (
              <p className="text-white">No users found</p>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col gap-6 p-4">
          <h2 className="text-xl font-bold text-white">Messages</h2>
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] p-4 bg-gray-800 rounded-lg">
            {isLoading ? (
              <p className="text-white text-center">Loading...</p>
            ) : isError ? (
              <p className="text-red-500 text-center">{isError}</p>
            ) : userInfo?.isAdmin && !selectedUser ? (
              <p className="text-white text-center">
                Select a user to start chatting
              </p>
            ) : messages.length > 0 ? (
              messages.map((data) => (
                <div
                  key={data._id || `${data.senderId}-${Date.now()}`} // Key tạm nếu không có _id từ real-time
                  className={`flex ${
                    data.senderId === userInfo._id
                      ? "justify-end"
                      : "justify-start"
                  } mb-4`}
                >
                  <div className="flex items-start max-w-[70%]">
                    <img
                      src={data.senderId.image || "/default-avatar.png"}
                      alt={data.senderId.fullName || "User"}
                      className="w-8 h-8 rounded-full object-cover mr-2 mt-1"
                    />
                    <div>
                      <div
                        className={`p-3 rounded-lg ${
                          data.senderId === userInfo._id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        <p>{data.message}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 text-right">
                        {formatTime(data.createdAt || Date.now())}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center">No messages found</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4 flex items-center relative">
            <input
              type="text"
              className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white border-none focus:outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="button"
              className="p-3 bg-gray-600 text-white hover:bg-gray-500 transition-colors"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FaSmile />
            </button>
            <button
              className="p-3 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={handleSendMessage}
              disabled={!selectedUser && userInfo?.isAdmin && !id}
            >
              <FaPaperPlane />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-14 right-0 z-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default MessagePage;
