const { Message } = require("../db/models");

exports.messageFetch = async (messageId, next) => {
  try {
    const message = await Message.findByPk(messageId);
    return message;
  } catch (error) {
    next(error);
  }
};

exports.messageList = async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

exports.messageDetail = async (req, res) => res.json(req.message);

exports.messageDelete = async (req, res, next) => {
  try {
    if (req.message.userId !== req.user.id) {
      //this condition is used to test the token if it belogns to the user that create the account
      throw {
        status: 401,
        message: "you can't delete a message that not yours",
      };
    }
    await req.message.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
