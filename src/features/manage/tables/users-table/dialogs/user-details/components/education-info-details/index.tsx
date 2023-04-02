import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { EducationInfo } from "../../../../types/education-info";

interface EducationInfoDetailsProps {
  educationInfo: EducationInfo;
}

export default function EducationInfoDetails({
  educationInfo,
}: EducationInfoDetailsProps) {
  const {
    id,
    conclusionYear,
    courseName,
    startYear,
    institutionName,
    schoolingLevel,
  } = educationInfo;
  return (
    <ListItem alignItems="flex-start" key={id}>
      <ListItemText
        primary={
          <React.Fragment>
            <Grid container>
              {/* NOME DO CURSO CASO SEJA SUPERIOR */}
              {schoolingLevel === "Ensino Superior Completo" ||
              schoolingLevel === "Ensino Superior Incompleto" ? (
                <Grid item xs={12}>
                  <Typography
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    {courseName}
                  </Typography>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Typography
                  component="span"
                  variant={
                    schoolingLevel === "Ensino Superior Completo" ||
                    schoolingLevel === "Ensino Superior Incompleto"
                      ? "body2"
                      : "body1"
                  }
                  color="text.primary"
                >
                  {institutionName}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {schoolingLevel}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {`${startYear} — ${conclusionYear || "Presente"}`}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
