import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import './ProfilePage.css'
import UserAPI from '../api/user'
import arrowLeft from '../icons/arrow-left.svg'

const ProfilePage = () => {

  const [user, setUser] = React.useState(localStorage.getItem("user-info"))

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

    e.target[0].value = ''
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

  return (
    <div className='profile'>

      <form onSubmit={ChangeEmail}>
        <p>Your current email is : {user}</p>
        <h3>Change your email below :</h3> 
        <input type="text" placeholder='Enter a new email here' />      
        <button type='submit' className='btn'>Validate</button>
      </form>
      
      <a href='/envelopes' alt="envelopes"><img src={arrowLeft} alt='icon' className='icon'/>
        Back to your dashboard</a>

      <IconButton className='delete-icon' onClick={deleteAccount}>
        <DeleteIcon />Delete your account
      </IconButton>
    </div>
  )
}

export default ProfilePage