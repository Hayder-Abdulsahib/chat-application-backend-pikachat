const { Chat, Message, Connect, User } = require("../db/models");

exports.chatFetch = async (chatId, next) => {
  try {
    const chat = await Chat.findByPk(chatId);
    return chat;
  } catch (error) {
    next(error);
  }
};

exports.chatList = async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      include: [
        {
          model: Message,
          as: "messages",
        },
        {
          model: User,
          as: "users",
        },
      ],
    });
    res.json(chats);
  } catch (error) {
    next(error);
  }
};

exports.chatDetail = async (req, res, next) => {
  try {
    const chats = await Chat.findOne({
      where: { id: req.params.chatId },
      include: {
        model: Message,
        as: "messages",
      },
    });
    res.json(chats);
  } catch (error) {
    next(error);
  }
};

exports.chatDelete = async (req, res, next) => {
  try {
    if (req.chat.userId !== req.user.id) {
      //this condition is used to test the token if it belogns to the user that create the account
      throw {
        status: 401,
        message: "you can't delete a group that not yours",
      };
    }
    await req.chat.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.chatCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newChat = await Chat.create(req.body);
    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};

//create message
exports.messageCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id; //this line is for the one-many relation
    req.body.chatId = req.chat.id;
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

exports.chatUsers = async (req, res, next) => {
  try {
    const chatRoom_user = req.body.map((connect) => ({
      ...connect,
      chatId: req.chat.id,
    }));
    await Connect.bulkCreate(chatRoom_user);
    const chat_user = {
      users: req.body,
    };
    res.status(201).json(chat_user);
  } catch (error) {
    next(error);
  }
};
