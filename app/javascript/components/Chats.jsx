import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import ApiService from "../services/ApiService";

const Chats = () => {
    const [loading, setLoading] = useState(true)
    const [chats, setChats] = useState([])
    const jwtToken = localStorage.getItem('token');

    const onCreateChat = () => {
        axios.post('/api/v1/chats', {}, { headers: { Authorization: `Bearer ${jwtToken}`} }).then((response) => {
            const newChats = [...chats]
            newChats.push(response.data)
            setChats(newChats)
        })
    }

    useEffect(() => {
        ApiService.get('/api/v1/chats').then((response) => {
            setChats(response.data)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return(<div>Loading...</div>)
    }

    return(
        <div>
            {
                chats.length === 0 && <div>No chats</div>
            }

            {
                chats.length > 0 && chats.map(chat => (
                    <div key={chat.id}>
                        <Link to={`/chats/${chat.id}`}>Chat {chat.id}</Link>
                    </div>
                ))
            }

            {/*{*/}
            {/*    chats.length > 0 && chats.map((chat) => {*/}
            {/*        return <div> chat { chat.id } (user id: { chat.user_id } ) </div>*/}
            {/*    })*/}
            {/*}*/}

            <button onClick={onCreateChat}>Create A Chat</button>
        </div>
    )
}

export default Chats
//
// export default () => (
//     <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
//         <div className="jumbotron jumbotron-fluid bg-transparent">
//             <div className="container secondary-color">
//                 <h1 className="display-4">Chats</h1>
//             </div>
//         </div>
//     </div>
// );
