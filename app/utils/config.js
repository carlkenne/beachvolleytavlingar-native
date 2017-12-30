export const getTournamentListUrl = () =>
  'https://www.profixio.com/fx/terminliste.php?org=SVBF.SE.SVB&vis_gamle_arr=true';
export const getTournamentDetailsUrl = id =>
  `https://www.profixio.com/fx/vis_innbydelse.php?ib_id=${id}`;
export const getAnmalningslistaUrl = id =>
  `https://www.profixio.com/fx/vis_innbydelse.php?ib_id=${id}`;
