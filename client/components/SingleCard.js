import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const SingleCard = ({ text }) => {
  return(
    <Card style={styles.cardContainer}>
      <CardContent>
        <Typography gutterBottom>{text}</Typography>
      </CardContent>
    </Card>
  )
}

const styles = {
  cardContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
    cursor: "pointer",
  }
};
export default SingleCard;