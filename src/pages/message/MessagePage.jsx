import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllMessagesForAdminAction,
  getMessagesByIdAction,
  sendMessageAction,
} from "../../../redux/action/message.action";
import Sidebar from "../../dashboard/Sidebar";
import { FaPaperPlane, FaSmile } from "react-icons/fa"; // Thêm FaSmile cho nút emoji
import EmojiPicker from "emoji-picker-react"; // Thêm thư viện emoji-picker-react

const MessagePage = () => {
  const [newMessage, setNewMessage] = useState(""); // Nội dung tin nhắn
  const [selectedUser, setSelectedUser] = useState(null); // Người dùng được chọn
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Hiển thị/ẩn emoji picker
  const { id } = useParams(); // Lấy id từ URL
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin); // Thông tin user từ Redux
  const {
    isLoading: adminLoading,
    isError: adminError,
    messages: adminMessages = [],
  } = useSelector((state) => state.getMessageForAdmin) || {}; // Tin nhắn admin từ Redux
  const {
    isLoading,
    isError,
    messages = [],
  } = useSelector((state) => state.getMessageById); // Tin nhắn user từ Redux

  // Tải dữ liệu tin nhắn khi component mount hoặc thay đổi userInfo/id
  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(getAllMessagesForAdminAction());
    } else if (id) {
      dispatch(getMessagesByIdAction(id));
    }
  }, [dispatch, id, userInfo]);

  // Chọn người dùng để xem tin nhắn
  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    dispatch(getMessagesByIdAction(userId));
  };

  // Gửi tin nhắn
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    dispatch(sendMessageAction(selectedUser || id, newMessage)).then(() => {
      dispatch(getMessagesByIdAction(selectedUser || id)); // Cập nhật tin nhắn sau khi gửi
      setNewMessage(""); // Xóa input
      setShowEmojiPicker(false); // Ẩn emoji picker
    });
  };

  // Gửi tin nhắn khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Thêm emoji vào tin nhắn
  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  // Định dạng thời gian
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Danh sách tin nhắn hiển thị
  const allMessages =
    userInfo?.isAdmin && !selectedUser ? adminMessages : messages;

  // Danh sách người dùng trong sidebar (loại bỏ admin)
  const filteredUsers = [
    ...new Set(
      adminMessages
        .filter((msg) => msg.senderId._id !== userInfo?._id)
        .map((msg) => msg.senderId._id)
    ),
  ];

  return (
    <Sidebar>
      <div className="flex h-full">
        {/* Sidebar hiển thị danh sách người dùng (cho admin) */}
        {userInfo?.isAdmin && (
          <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Users</h2>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((userId) => {
                const user = adminMessages.find(
                  (msg) => msg.senderId._id === userId
                ).senderId;
                return (
                  <div
                    key={user._id}
                    className="p-3 cursor-pointer bg-gray-700 text-white rounded-lg mb-2 hover:bg-gray-600 transition-colors"
                    onClick={() => handleSelectUser(user._id)}
                  >
                    {user.fullName || "Unknown User"}
                  </div>
                );
              })
            ) : (
              <p className="text-white">No users found</p>
            )}
          </div>
        )}

        {/* Khu vực hiển thị tin nhắn */}
        <div className="flex-1 flex flex-col gap-6 p-4">
          <h2 className="text-xl font-bold text-white">Messages</h2>
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] p-4 bg-gray-800 rounded-lg">
            {isLoading || adminLoading ? (
              <p className="text-white text-center">Loading...</p>
            ) : isError || adminError ? (
              <p className="text-red-500 text-center">
                {isError || adminError}
              </p>
            ) : allMessages.length > 0 ? (
              allMessages.map((data) => (
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

          {/* Input gửi tin nhắn */}
          <div className="mt-4 flex items-center relative">
            <input
              type="text"
              className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white border-none focus:outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress} // Gửi khi nhấn Enter
            />
            {/* Nút mở Emoji Picker */}
            <button
              type="button"
              className="p-3 bg-gray-600 text-white hover:bg-gray-500 transition-colors"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FaSmile />
            </button>
            {/* Nút gửi tin nhắn */}
            <button
              className="p-3 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={handleSendMessage}
              disabled={!selectedUser && userInfo?.isAdmin}
            >
              <FaPaperPlane />
            </button>
            {/* Emoji Picker */}
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
