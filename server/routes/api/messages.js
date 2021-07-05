const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

function isValidConversationId(conversation, user1Id, user2Id) {
  if(conversation) {
    const isFirstValidCase = conversation.user1Id == user1Id && conversation.user2Id == user2Id;
    const isSecondValidCase = conversation.user1Id == user2Id && conversation.user2Id == user1Id;
    return (isFirstValidCase || isSecondValidCase);
  }
  return false;
}

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we need to verify that it belongs to the sender and the recipient
    if (conversationId) {
      let conversation = await Conversation.findByPk(conversationId);
      if(isValidConversationId(conversation, senderId, recipientId)) {
        const message = await Message.create({ senderId, text, conversationId });
        return res.json({ message, sender });
      }
      return res.sendStatus(401);
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
