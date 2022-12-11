import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const styles = styled({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "40px",
  },
});

const ProjectCard = (props) => {
  const classes = styles();
  return (
    <Link to={`/projects/${props.projectId}`}>
      <Card sx={{ maxWidth: 345, borderRadius: "20px", textAlign:"center" }}>
        <CardHeader
          sx={{ maxHeight: 20, padding: 4 }}
          title={props.title}
          subheader={props.created}
        />
        <CardMedia
          component="img"
          height="300"
          image="/images/ProjectIcon/WF.jpg"
        />
        <CardContent>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ textAlign:"center" }}
          >
            Artist: August Is Falling <p/>
            Album: "The Simple Plan"
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </Link>
  );
};

export default ProjectCard;
