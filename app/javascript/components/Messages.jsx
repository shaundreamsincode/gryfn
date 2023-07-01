import React, { useState, useEffect } from "react";

const Messages = ( props ) => {
    const { chat, sendMessage } = props;
    const messages = chat.messages;
    debugger

    return(<div>
        {
            messages.length === 0 && <div>No messages</div>
        }

        {
            messages.length > 0 && messages.map((message) => {
                    return(<div> { message.id } </div>)
                })
        }
    </div>)
}

export default Messages