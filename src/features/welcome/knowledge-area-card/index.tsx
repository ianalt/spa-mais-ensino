import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface KnowledgeAreaCardProps {
  title: string;
  description: string;
}

export default function KnowledgeAreaCard({
  title,
  description,
}: KnowledgeAreaCardProps) {
  return (
    <Card sx={{ maxWidth: 350, minHeight: 350, maxHeight: 350 }} elevation={4}>
      <CardActionArea>
        <CardMedia component="img" height="150" image="#" alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
