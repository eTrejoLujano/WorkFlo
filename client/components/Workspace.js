import React from 'react'
import { useSelector } from 'react-redux'

import AddAnotherButton from './AddAnotherButton'
import List from './List'

function Workspace() {
  const lists = useSelector((state) => state.lists);
  
  return (
    <div>
      <h2>This Is The Workspace</h2>
      <div style={styles.listsContainer}>
        { lists.map(list => (
          <List key={list.id} title={list.title} cards={list.cards} />
        )) } 
        <AddAnotherButton list/>
      </div> 
    </div>
  )
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
  }
}

export default Workspace