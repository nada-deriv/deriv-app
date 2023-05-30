export default class ChatMessage {
    constructor({
        id,
        channel_url,
        created_at,
        file_type,
        message,
        message_type,
        name,
        sender_user_id,
        size,
        status,
        url,
    }) {
        this.id = id;
        this.channel_url = channel_url;
        this.created_at = created_at;
        this.file_type = file_type;
        this.message = message;
        this.message_type = message_type;
        this.name = name;
        this.sender_user_id = sender_user_id;
        this.size = size;
        this.status = status;
        this.url = url;
    }

    static STATUS_PENDING = 0;
    static STATUS_ERRORED = 1;

    // Below two statuses are never used but here for consistency.
    // The read receipts are generated based on "chat_channel" receipt timestamps
    // rather than individual message statuses.
    // static STATUS_DELIVERED_TO_SERVER = 2;
    // static STATUS_READ_BY_RECEIVER = 3;

    static TYPE_USER = 'user';
    static TYPE_FILE = 'file';
}

export const convertFromChannelMessage = channel_message => {
    return new ChatMessage({
        id: channel_message.messageId,
        channel_url: channel_message.channelUrl,
        created_at: channel_message.createdAt,
        file_type: channel_message.type,
        message: channel_message.message,
        message_type: channel_message.messageType,
        name: channel_message.name,
        sender_user_id: channel_message.sender.userId,
        size: channel_message.size,
        url: channel_message.url,
    });
};
