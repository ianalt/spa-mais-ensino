import { Button, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface KnowledgeAreaCardProps {
  name: string;
}

export default function KnowledgeAreaCard({ name }: KnowledgeAreaCardProps) {
  return (
    <Button>
      <Card
        sx={{ maxWidth: 350, minWidth: 250, minHeight: 250, maxHeight: 250 }}
        elevation={4}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="images/undraw_road_to_knowledge_m8s0.png"
            alt={name}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              justifyContent="center"
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Button>
  );
}
