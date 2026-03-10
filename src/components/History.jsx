/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'

const History = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {

            if (user) {
                const his = JSON.parse(localStorage.getItem(`message_${user.id}`))
                setHistory(his)
            }
        }
        catch (err) {
            console.log('Failed fetch history to localstorage');
        }
    }, [])

    console.log(history);

    return (
        <div>
            {
                history.length === 0 &&
                (
                    <p>
                        No chat history yet
                    </p>
                )
            }

            {
                history.map((h, ind) => (
                    <div
                        key={ind}
                        className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200"
                    >
                        <h1 className="text-sm font-medium text-gray-700 truncate">
                            {h.role}
                        </h1>

                        <p className="text-xs text-gray-500 truncate">
                            {h.content}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default History