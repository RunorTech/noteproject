
import React, { useEffect, useState } from 'react'
import AddButton from './AddButton'
import Color from './Color'
import colors from '@/lib/colors.json'
import DroupDown from './DroupDown'





const ControlPanel = ({ notes, userData}: any) => {

  const userId = userData.$id;
  
 
  

  return (
    <div id="controls">
<div className="dropdown">
<DroupDown userData={userData}/>
</div>
      <AddButton userid={userId}/>
      {colors.map(color =>(<Color  key={color.id} color={color} notes={notes} />))}
    </div>
  )
}

export default ControlPanel
