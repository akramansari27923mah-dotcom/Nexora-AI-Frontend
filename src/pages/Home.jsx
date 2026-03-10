import Sidebar from '../components/Sidebar'
import Prompt from '../components/Prompt'
import { useState } from 'react'

const Home = ({ menuClose, setMenuClose, largeMenu, setLargeMenu }) => {
  const [message, setMessage] = useState([])

  return (
    <div className='flex overflow-hidden  text-white'>
      {/* side bar */}
      <div>
        <Sidebar
          menuClose={menuClose}
          setMenuClose={setMenuClose}
          setLargeMenu={setLargeMenu} largeMenu={largeMenu}
          setMessage={setMessage}
          message={message}
        />
      </div>

      {/* propmt */}
      <div>
        <Prompt
          setMenuClose={setMenuClose}
          setLargeMenu={setLargeMenu}
          setMessage={setMessage} message={message}
        />
      </div>
    </div>
  )
}

export default Home