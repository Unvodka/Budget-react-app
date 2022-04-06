import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import './ProfilePage.css'
import UserAPI from '../api/user'
import arrowLeft from '../icons/arrow-left.svg'

const ProfilePage = () => {

  const [user, setUser] = React.useState(localStorage.getItem("user-info"))
  const [input, setInput] = React.useState([user])

  const ChangeEmail = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const body = {
      newEmail: e.target[0].value,
      email: user
    }
    localStorage.setItem('user-info', body.newEmail)

    const res = await UserAPI.update(body)

    setUser(res.data)
    alert("Email changed successfully")
  }
  
  const deleteAccount = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const res = await UserAPI.deleteIt({user})
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/register";
    } catch (err) {
      console.log(err)
    }
  } 
  
  const changeInput = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  return (
    <div className='profile'>

      <a href='/envelopes' alt="envelopes"><img src={arrowLeft} alt='icon' className='icon'/>
        Back to your dashboard</a>

      <form onSubmit={ChangeEmail}>
        <h3>Change your email below :</h3> 
        <input type="text" placeholder='Enter a new email here' value={input} onChange={changeInput}/>      
        <button type='submit' className='btn'>Validate</button>
      </form>

      <IconButton className='delete-icon' onClick={deleteAccount}>
        <DeleteIcon />Delete your account
      </IconButton>
    </div>
  )
}

export default ProfilePage