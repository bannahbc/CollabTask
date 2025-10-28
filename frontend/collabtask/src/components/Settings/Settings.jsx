import React from 'react'
import Card from '../Cards/card'
import StatusChart from '../Chart/Chart'

function Settings() {
  const completed = 12;
  const inProgress = 5;
  const pending = 3;
  const userName = JSON.parse(localStorage.getItem('username'))
  const email = JSON.parse(localStorage.getItem('email'))
  return (
    <div>
      <Card title={"Profile Settings"} description={userName} email={email} />
    </div>
  )
}

export default Settings