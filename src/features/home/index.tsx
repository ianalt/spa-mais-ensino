import { Grid } from '@mui/material';
import { useEffect } from 'react';
import HomePageIntro from './HomePageIntro';
import RecentClasses from './RecentClassesList';
import KnowledgeAreasList from './KnowledgeAreasList';

export default function HomePage() {
  useEffect(() => {
    document.title = '+Ensino: Página inicial';
  }, []);

  return (
    <Grid container>
      <HomePageIntro />
      <RecentClasses />
      <KnowledgeAreasList />
    </Grid>
  );
}
