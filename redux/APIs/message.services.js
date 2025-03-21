import axiosClient from "./axios";

// Get messages by receiverId
const getMessagesByIdService = async (id, token) => {
  const { data } = await axiosClient.get(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Send message to receiverId
const sendMessageService = async (receiverId, messageContent, token) => {
  const { data } = await axiosClient.post(
    `/messages/${receiverId}`,
    { messageContent }, // Chỉ gửi messageContent trong body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
// get all message for admin
const getAllMessagesForAdminService = async (token) => {
  const { data } = await axiosClient.get(`/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getMessagesByIdService,
  sendMessageService,
  getAllMessagesForAdminService,
};
