import { Localization } from 'material-table';

export const ptBrTableLocalization: Localization = {
  body: {
    emptyDataSourceMessage: 'Nenhum registro para exibir',
  },
  header: {
    actions: 'Ações',
  },
  grouping: {
    placeholder: 'Arraste as colunas para agrupar',
    groupedBy: 'Agrupamento por',
  },
  toolbar: {
    searchTooltip: 'Pesquisar',
    exportTitle: 'Baixar lista',
    exportAriaLabel: 'Baixar lista',
    exportPDFName: 'Baixar como PDF',
    exportCSVName: 'Baixar como CSV',
    searchPlaceholder: 'Pesquisar',
  },
  pagination: {
    labelRowsSelect: 'linhas',
    labelDisplayedRows: '{count} de {from}-{to}',
    firstTooltip: 'Primeira página',
    previousTooltip: 'Página anterior',
    nextTooltip: 'Próxima página',
    lastTooltip: 'Última página',
    labelRowsPerPage: 'Linhas por página',
  },
};
