import React, { useState, useEffect } from "react";

const Messages = ( props ) => {
    const [content, setContent] = useState('')
    const { chat, sendMessage } = props;

    debugger
    const viewableMessages = (chat.messages).filter(message => message.role !== "system");

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(content);
        setContent(""); // Clear the input after sending the message
    };

    return(<div>
        {
            viewableMessages.map((message) => {
                    return(
                        <div key={message.id}>
                            { message.role }: { message.content }
                        </div>
                    )
                })
        }

        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    </div>)
}

export default Messages
