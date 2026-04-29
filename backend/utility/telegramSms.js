const axios = require("axios");

const sendTelegramMessage = async (message) => {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    // Split the string into an array of IDs
    const chatIds = process.env.TELEGRAM_CHAT_ID ? process.env.TELEGRAM_CHAT_ID.split(',') : [];

    if (!botToken || chatIds.length === 0) {
      console.error("Telegram configuration missing.");
      return;
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Map each ID to an axios request promise
    const requests = chatIds.map(id =>
      axios.post(url, {
        chat_id: id.trim(),
        text: message,
        parse_mode: "HTML",
      })
    );

    // Send all requests concurrently
    await Promise.all(requests);
    console.log(`Message sent to ${chatIds.length} chats.`);

  } catch (error) {
    console.error("Error sending Telegram message:", error.response?.data || error.message);
  }
};

module.exports = sendTelegramMessage;
