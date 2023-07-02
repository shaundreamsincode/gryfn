import React, { useState } from "react";

const Messages = ( props ) => {
    const { chat, sendMessage, closeChat } = props;
    const [content, setContent] = useState('')

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
            /> <br/>
            <button type="submit">Send</button>
        </form>

        <br/>
        <br/>
        <button onClick={closeChat}>Close Chat</button>
    </div>)
}

export default Messages
