import React, { useState, useEffect } from "react";
import axios from 'axios'

const Chats = () => {
    const [loading, setLoading] = useState(true)
    const [chats, setChats] = useState([])

    useEffect(() => {
        const url = '/api/v1/chats'

        axios.get(url).then((response) => {
            debugger
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
                chats.length > 1 && chats.map((chat) => {
                    return <div> chat { chat.id } </div>
                })
            }
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
