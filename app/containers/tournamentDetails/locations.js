const arenas = [
  {
    lat: 57.73790633089288,
    long: 12.037104964256287,
    name: 'Beach Center',
    club: 'Göteborg Beachvolley Club'
  },
  {
    lat: 63.818677134927896,
    long: 20.318371653556824,
    name: 'Las Palmas, IKSU Sport',
    club: ''
  },
  {
    lat: 59.17969799999999,
    long: 17.653684,
    name: 'The Beach, Södertälje',
    club: '08 Beachvolley Club'
  },
  {
    lat: 56.01973839999999,
    long: 12.730825099999947,
    name: 'Active Beach, Helsingborg',
    club: ''
  },
  {
    lat: 57.703009,
    long: 12.041488,
    name: 'Skatås, Göteborg',
    club: 'Morgondagens Beachvolleyboll Club'
  },
  {
    lat: 56.88322,
    long: 12.504753,
    name: 'Skrea Strand',
    club: 'Falkenbergs Volleybollklubb'
  },
  {
    lat: 56.654286,
    long: 12.730966,
    name: 'SummerSmash Arena Tylösand',
    club: ''
  },
  {
    lat: 56.058163,
    long: 12.6812,
    name: 'Fria Bad, Helsingborg',
    club: 'IFK Helsingborg'
  },
  {
    lat: 56.513852,
    long: 12.942538,
    name: 'Mellbystrand',
    club: ''
  },
  {
    lat: 55.618979,
    long: 12.977192,
    name: 'Scaniaparken, Västra Hamnen',
    club: 'Malmö Beachvolley Club'
  },
  {
    lat: 55.594131,
    long: 12.995839,
    name: 'Gamla IP',
    club: ''
  },
  {
    lat: 55.601259,
    long: 12.962837,
    name: 'Ribban, Malmö',
    club: ''
  },
  {
    lat: 55.72313,
    long: 13.208835,
    name: 'Borgarparkens Beach Arena',
    club: 'Lunds Volleybollklubb'
  },
  {
    lat: 55.522178,
    long: 13.218312,
    name: 'Svedala Beachcourt (Roslätt}',
    club: 'Svedala Volleybollklubb'
  },
  {
    lat: 55.932465,
    long: 14.321108,
    name: 'Åhus',
    club: ''
  },
  {
    lat: 56.181136,
    long: 15.583034,
    name: 'Långö',
    club: 'KFUM Gymnastik & IA Karlskrona'
  },
  {
    lat: 56.652,
    long: 16.336986,
    name: 'Långviken',
    club: ''
  },
  {
    lat: 57.260031,
    long: 17.054064,
    name: 'Bödagården, Öland',
    club: 'Föreningen Beachvolley-Aid'
  },
  {
    lat: 59.323226,
    long: 17.91456,
    name: 'Kärsögårdens beachbanor',
    club: 'Bromma KFUK-KFUM'
  },
  {
    lat: 59.222267,
    long: 17.61397,
    name: 'Mälarbadet',
    club: 'Södertelge Volleybollklubb'
  },
  {
    lat: 63.662778,
    long: 20.092878,
    name: 'Bettnessand',
    club: 'Idrottsklubben Studenterna i Umeå'
  },
  {
    lat: 65.5875,
    long: 22.12477,
    name: 'Gültzauudden',
    club: 'Lule Volley'
  },
  {
    lat: 57.913243,
    long: 14.093179,
    name: 'Habo Energi Beach Arena',
    club: 'Habo Wolleyklubb 87'
  },
  {
    lat: 56.870509,
    long: 14.816372,
    name: 'Kampen',
    club: 'Växjö Volleybollklubb'
  },
  {
    lat: 59.278157,
    long: 15.254796,
    name: 'Alnängsbadet, Oljevägen 10, Örebro',
    club: 'Beachbrothers Beachvolley Club'
  },
  {
    lat: 59.870607,
    long: 17.618959,
    name: 'Fyrisbeach Arena, Uppsala',
    club: 'Fyrishov Beachvolley Club'
  },
  {
    lat: 59.097176,
    long: 17.653806,
    name: 'Farstanäs Havsbad',
    club: ''
  },
  {
    lat: 59.391344,
    long: 13.510603,
    name: 'Sundsta Beachvolleyplaner',
    club: 'Karlstads Volleybollklubb'
  },
  {
    lat: 57.486657,
    long: 18.128917,
    name: 'Tofta strand Gotland',
    club: 'Team Gotland Volleybollklubb'
  },
  {
    lat: 58.422578,
    long: 15.669036,
    name: 'Linköping Beach Arena',
    club: 'Linköping Beach Arena Club'
  },
  {
    lat: 57.7828,
    long: 14.209646,
    name: 'Vätterstranden, Jönköping',
    club: 'Jönköpings Beachvolleyclub'
  },
  {
    lat: 58.714712,
    long: 13.820994,
    name: 'Hamnen, Mariestad',
    club: 'Mariestads Volleybollklubb'
  }
]

export const getLocation = (clubName, arenaName) => {
  let arena = arenas.find(
    arena => arena.name === arenaName || arena.club === clubName
  )

  if (arena === undefined) {
    arena = {
      name: arenaName,
      club: clubName,
      lat: 0,
      long: 0
    }
  }

  return {
    url: `https://maps.google.com?lat=${arena.lat}&long=${arena.long}`,
    text: `${arena.name}, ${arena.adress}`
  }
}
