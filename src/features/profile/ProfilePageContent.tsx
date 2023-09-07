import { Button, Grid, Typography } from '@mui/material';

interface ProfilePageContentProps {
  onEditProfileClick: any;
  onChangePasswordClick: any;
}

export default function ProfilePageContent({
  onEditProfileClick,
  onChangePasswordClick,
}: ProfilePageContentProps) {
  const handleOpenEditProfileOption = () => {
    onEditProfileClick();
  };

  const handleOpenChangePasswordOption = () => {
    onChangePasswordClick();
  };

  return (
    <Grid item xs={12} container mt={5}>
      <Grid item xs={7} p={2}>
        <img
          src="/undraw_profile_details_re_ch9r.svg"
          alt="Imagem"
          width="100%"
          height="350"
        />
      </Grid>
      <Grid item xs={5} container alignContent="center" p={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Meu Perfil</Typography>
          <Typography variant="body1">
            Aqui, você pode conferir os seus <strong>dados</strong> cadastrais.
            Caso queira editar qualquer informação para deixar sua conta{' '}
            <strong>atualizada</strong>, basta clicar na opção{' '}
            <strong>Editar perfil</strong>.
          </Typography>
        </Grid>

        <Grid item xs={12} container justifyContent="space-evenly" p={5}>
          <Button
            id="edit-profile-button"
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleOpenEditProfileOption}
          >
            Editar perfil
          </Button>

          <Button
            id="change-password-button"
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleOpenChangePasswordOption}
          >
            Alterar senha
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
