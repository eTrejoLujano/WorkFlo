import React from 'react'
import AddIcon from '@mui/icons-material/Add';



function AddAnotherButton(props) {
  const { list } = props 
  const buttonText = list ? "Add a List" : "Add a Card";

  return (
    <div style={styles.buttonContainer}>
      <AddIcon>Add</AddIcon>
      <p>{buttonText}</p>
    </div>
  )
}

const styles = {
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 5,
    height: 36,
    width: 272
  }
}

export default AddAnotherButton