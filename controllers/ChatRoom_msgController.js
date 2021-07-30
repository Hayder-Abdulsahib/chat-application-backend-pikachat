const { Message, Chat } = require("../db/models");

exports.sendMessage = async (req, res, next) => {
  try {
    const newChat = await Chat.create({ chatId: req.user.id });
    const newMessage = req.body.map((message) => ({
      ...message,
      chatId: newChat.id,
    }));
    await Message.create(newMessage);
    const sendMessage = {
      ...newChat.toJSON(),
      messages: req.body,
    };
    res.status(201).json(sendMessage);
  } catch (error) {
    next(error);
  }
};
