import { useEffect, useState } from "react";
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

const MessagePage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    isLoading,
    isError,
    messages = [],
  } = useSelector((state) => state.getMessageById);
  const {
    isLoading: usersLoading,
    isError: usersError,
    users = [],
  } = useSelector((state) => state.adminGetAllUsers);

  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(getAllUsersAction()); // Chỉ lấy danh sách user khi vào trang
    } else if (id) {
      dispatch(getMessagesByIdAction(id)); // Cho user thường
    }
  }, [dispatch, id, userInfo]);

  useEffect(() => {
    if (userInfo?.isAdmin && selectedUser) {
      dispatch(getMessagesByIdAction(selectedUser)); // Lấy tin nhắn khi chọn user
    }
  }, [dispatch, selectedUser, userInfo]);

  const handleSelectUser = (userId) => {
    console.log("Selected user ID:", userId);
    setSelectedUser(userId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const targetId = userInfo?.isAdmin ? selectedUser : id;
    if (!targetId) {
      console.log("No target user selected");
      return;
    }
    dispatch(sendMessageAction(targetId, newMessage)).then(() => {
      dispatch(getMessagesByIdAction(targetId));
      setNewMessage("");
      setShowEmojiPicker(false);
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
                  key={data._id}
                  className={`flex ${
                    data.senderId._id === userInfo._id
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
                          data.senderId._id === userInfo._id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        <p>{data.message}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 text-right">
                        {formatTime(data.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center">No messages found</p>
            )}
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
