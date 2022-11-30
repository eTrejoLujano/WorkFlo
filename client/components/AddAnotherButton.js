import React from 'react'



function AddAnotherButton() {
  
  renderAddButton = (props) => {
     const { list } = props 

     const buttonText = list ? "Add another list" : "Add another card"

     return (
       <div>
         <Icon>Add</Icon>
         <p>{buttonText}</p></div>
     )
  }


  return (
    null
  )
}

export default AddAnotherButton