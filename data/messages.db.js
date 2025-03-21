export const getMessages = async () => {
  // Dữ liệu mẫu
  return [
    {
      _id: "1",
      senderId: "1",
      receiverId: "2",
      message: "Hello! How are you?",
      createdAt: "2025-03-13T07:28:58.617Z",
    },
    {
      _id: "2",
      senderId: "2",
      receiverId: "1",
      message: "I'm good, thanks! How about you?",
      createdAt: "2025-03-13T07:29:45.774Z",
    },
  ];
};
