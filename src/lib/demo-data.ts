// Datos semilla para LYNK — comunidad juvenil judía de México.
// Une a janijim (jóvenes) con tnuot (movimientos juveniles), escuelas y grupos.
// Sin contadores de seguidores ni likes: pertenencia, no popularidad.

export type CommunityKind = "tnua" | "escuela" | "institucion" | "grupo";

export type Tier = { name: string; desc: string };

export type DemoCommunity = {
  slug: string;
  name: string;
  description: string;
  category: string;
  kind: CommunityKind;
  // Color del movimiento/institución — la interfaz se tiñe por tnuá.
  color: string;
  tags: string[];
  location: string;
  // Cuántos de tus amigos están aquí (sin revelar quiénes — da curiosidad).
  mutualFriends: number;
  // Niveles/roles dentro de la comunidad.
  tiers: Tier[];
};

export type DemoPost = {
  id: string;
  author: string;
  body: string;
  ago: string;
};

// Niveles típicos por tipo de comunidad.
const TIERS_TNUA: Tier[] = [
  { name: "Janijim", desc: "Los más jóvenes, en sus kvutzot" },
  { name: "Madrijim", desc: "Guían y arman las peulot" },
  { name: "Rosh / Hanhagá", desc: "Coordinan la tnuá" },
];
const TIERS_ESCUELA: Tier[] = [
  { name: "Alumnos", desc: "Toda la generación" },
  { name: "Sociedad de alumnos", desc: "Representan a su grado" },
  { name: "Comités", desc: "Eventos, jésed, cultura" },
];
const TIERS_INST: Tier[] = [
  { name: "Miembros", desc: "Parte de la kehilá" },
  { name: "Voluntarios", desc: "Apoyan los programas" },
  { name: "Coordinadores", desc: "Dirigen las actividades" },
];
const TIERS_GRUPO: Tier[] = [
  { name: "Miembros", desc: "Cualquiera de la comunidad" },
  { name: "Organizadores", desc: "Crean y moderan" },
];

export const DEMO_COMMUNITIES: DemoCommunity[] = [
  // ---- Tnuot (movimientos juveniles) ----
  {
    slug: "hanoar-hatzioni",
    name: "Hanóar Hatzioní",
    description:
      "Movimiento juvenil sionista. Peulot cada Shabat, majanot en vacaciones y un lugar donde cada janij encuentra su kvutzá.",
    category: "Movimiento juvenil",
    kind: "tnua",
    color: "#1d4ed8",
    tags: ["sionismo", "kvutzá", "majané"],
    location: "Ciudad de México",
    mutualFriends: 5,
    tiers: TIERS_TNUA,
  },
  {
    slug: "dor-jadash",
    name: "Dor Jadash",
    description:
      "Una nueva generación. Movimiento juvenil con peulot, majané y mucha ruaj — construyendo comunidad desde lo joven.",
    category: "Movimiento juvenil",
    kind: "tnua",
    color: "#7a1f3d",
    tags: ["dor-jadash", "ruaj", "majané"],
    location: "Ciudad de México",
    mutualFriends: 4,
    tiers: TIERS_TNUA,
  },
  {
    slug: "bnei-akiva",
    name: "Bnei Akiva",
    description:
      "Torá VeAvodá. Movimiento juvenil religioso sionista — peulot, tfilot y janijim que crecen juntos.",
    category: "Movimiento juvenil",
    kind: "tnua",
    color: "#15803d",
    tags: ["religioso", "torá-veavodá", "sionismo"],
    location: "Ciudad de México",
    mutualFriends: 3,
    tiers: TIERS_TNUA,
  },
  {
    slug: "hashomer-hatzair",
    name: "Hashomer Hatzaír",
    description:
      "Movimiento juvenil con valores de igualdad, jalutziut y kibutz. Aquí se piensa, se debate y se construye comunidad.",
    category: "Movimiento juvenil",
    kind: "tnua",
    color: "#dc2626",
    tags: ["igualdad", "jalutziut", "debate"],
    location: "Ciudad de México",
    mutualFriends: 2,
    tiers: TIERS_TNUA,
  },
  {
    slug: "macabi-hatzair",
    name: "Macabi Hatzaír",
    description:
      "Deporte, valores y ruaj. Entrenamientos, torneos y la Macabiá — pertenencia a través del movimiento.",
    category: "Deportes y movimiento",
    kind: "tnua",
    color: "#0ea5e9",
    tags: ["deporte", "macabiá", "ruaj"],
    location: "Ciudad de México",
    mutualFriends: 6,
    tiers: TIERS_TNUA,
  },
  {
    slug: "netzer",
    name: "Netzer",
    description:
      "Movimiento juvenil del judaísmo reformista. Tikún olam, inclusión y peulot llenas de significado.",
    category: "Movimiento juvenil",
    kind: "tnua",
    color: "#7c3aed",
    tags: ["reformista", "tikún-olam", "inclusión"],
    location: "Ciudad de México",
    mutualFriends: 1,
    tiers: TIERS_TNUA,
  },

  // ---- Escuelas (colegios) ----
  {
    slug: "tarbut",
    name: "Colegio Hebreo Tarbut",
    description:
      "Comunidad escolar: actividades, jaguim, viajes a Israel y los grupos de cada generación.",
    category: "Escuela",
    kind: "escuela",
    color: "#0891b2",
    tags: ["colegio", "jaguim", "generación"],
    location: "Tecamachalco",
    mutualFriends: 8,
    tiers: TIERS_ESCUELA,
  },
  {
    slug: "monte-sinai",
    name: "Colegio Hebreo Monte Sinaí",
    description:
      "Vida comunitaria escolar — desde club de robótica hasta el comité de jésed y voluntariado.",
    category: "Escuela",
    kind: "escuela",
    color: "#b45309",
    tags: ["colegio", "jésed", "robótica"],
    location: "Bosques de las Lomas",
    mutualFriends: 4,
    tiers: TIERS_ESCUELA,
  },
  {
    slug: "yavne",
    name: "Colegio Israelita de México (Yavne)",
    description:
      "Generaciones de janijim, sociedad de alumnos, eventos y proyectos comunitarios.",
    category: "Escuela",
    kind: "escuela",
    color: "#4338ca",
    tags: ["colegio", "sociedad-de-alumnos", "eventos"],
    location: "Tecamachalco",
    mutualFriends: 5,
    tiers: TIERS_ESCUELA,
  },
  {
    slug: "maguen-david",
    name: "Colegio Hebreo Maguen David",
    description:
      "Comunidad escolar sefaradí: deporte, jésed, tradición y los grupos de cada generación.",
    category: "Escuela",
    kind: "escuela",
    color: "#0369a1",
    tags: ["colegio", "sefaradí", "tradición"],
    location: "Bosques de las Lomas",
    mutualFriends: 7,
    tiers: TIERS_ESCUELA,
  },
  {
    slug: "colegio-atid",
    name: "Colegio Atid",
    description:
      "Escuela con espíritu de futuro: proyectos, deporte y vida comunitaria para cada generación.",
    category: "Escuela",
    kind: "escuela",
    color: "#c2410c",
    tags: ["colegio", "futuro", "proyectos"],
    location: "Ciudad de México",
    mutualFriends: 2,
    tiers: TIERS_ESCUELA,
  },
  {
    slug: "colegio-sefaradi",
    name: "Colegio Hebreo Sefaradí",
    description:
      "Tradición sefaradí, comunidad y actividades para alumnos de todas las edades.",
    category: "Escuela",
    kind: "escuela",
    color: "#047857",
    tags: ["colegio", "sefaradí", "comunidad"],
    location: "Polanco",
    mutualFriends: 3,
    tiers: TIERS_ESCUELA,
  },

  // ---- Instituciones (kehilot y organizaciones) ----
  {
    slug: "cdi",
    name: "Centro Deportivo Israelita (CDI)",
    description:
      "El corazón deportivo y social de la comunidad: equipos, albercas, eventos y la Macabiá.",
    category: "Institución",
    kind: "institucion",
    color: "#0284c7",
    tags: ["deporte", "social", "macabiá"],
    location: "Cuajimalpa",
    mutualFriends: 9,
    tiers: TIERS_INST,
  },
  {
    slug: "comunidad-maguen-david",
    name: "Comunidad Maguen David",
    description:
      "Kehilá sefaradí: programas para jóvenes, jésed, festividades y vida comunitaria.",
    category: "Institución",
    kind: "institucion",
    color: "#1e3a8a",
    tags: ["kehilá", "sefaradí", "jésed"],
    location: "Bosques de las Lomas",
    mutualFriends: 6,
    tiers: TIERS_INST,
  },
  {
    slug: "bet-el",
    name: "Comunidad Bet El",
    description:
      "Kehilá conservadora: tfilá, juventud, programas educativos y proyectos comunitarios.",
    category: "Institución",
    kind: "institucion",
    color: "#6d28d9",
    tags: ["kehilá", "juventud", "educación"],
    location: "Tecamachalco",
    mutualFriends: 3,
    tiers: TIERS_INST,
  },
  {
    slug: "tribuna-israelita",
    name: "Tribuna Israelita",
    description:
      "Organización de la comunidad: diálogo, liderazgo joven y voz de los judíos de México.",
    category: "Institución",
    kind: "institucion",
    color: "#9f1239",
    tags: ["liderazgo", "diálogo", "comunidad"],
    location: "Ciudad de México",
    mutualFriends: 1,
    tiers: TIERS_INST,
  },

  // ---- Grupos (creados por la comunidad) ----
  {
    slug: "voluntariado-tikun-olam",
    name: "Voluntariado Tikún Olam",
    description:
      "Jóvenes que reparan el mundo: comedores, recaudaciones y proyectos de jésed cada mes.",
    category: "Voluntariado",
    kind: "grupo",
    color: "#059669",
    tags: ["jésed", "voluntariado", "comunidad"],
    location: "Ciudad de México",
    mutualFriends: 4,
    tiers: TIERS_GRUPO,
  },
  {
    slug: "madrijim-2026",
    name: "Madrijim 2026",
    description:
      "Espacio para madrijim de todas las tnuot: compartir peulot, recursos y apoyarse entre guías.",
    category: "Liderazgo",
    kind: "grupo",
    color: "#ea580c",
    tags: ["madrijim", "liderazgo", "peulot"],
    location: "Ciudad de México",
    mutualFriends: 7,
    tiers: TIERS_GRUPO,
  },
  {
    slug: "mishjakim",
    name: "Mesa de Juegos (Mishjakim)",
    description:
      "¿Te gustan los juegos de mesa? Nos juntamos a jugar, sin presión. Siempre hay un lugar para ti.",
    category: "Pasatiempos",
    kind: "grupo",
    color: "#9333ea",
    tags: ["juegos", "social", "tranqui"],
    location: "Polanco",
    mutualFriends: 2,
    tiers: TIERS_GRUPO,
  },
  {
    slug: "majane-verano",
    name: "Majané de Verano",
    description:
      "Todo sobre el campamento: inscripciones, kvutzot, canciones y la cuenta regresiva para el verano.",
    category: "Campamento",
    kind: "grupo",
    color: "#0d9488",
    tags: ["majané", "verano", "kvutzá"],
    location: "Cuernavaca",
    mutualFriends: 5,
    tiers: TIERS_GRUPO,
  },
];

export const DEMO_POSTS: Record<string, DemoPost[]> = {
  "hanoar-hatzioni": [
    {
      id: "p1",
      author: "Tali",
      body: "¡Este Shabat tenemos peulá especial de Yom Haatzmaut! Traigan ropa azul y blanca. Nos vemos a las 4 en el snif 🇮🇱",
      ago: "hace 2h",
    },
    {
      id: "p2",
      author: "Ari",
      body: "Primera vez que vine la semana pasada y todos me recibieron increíble. Gracias kvutzá 🙏",
      ago: "hace 1d",
    },
  ],
};

export const DEMO_POSTS_FALLBACK: DemoPost[] = [
  {
    id: "f1",
    author: "Un madrij",
    body: "¡Bienvenid@! Preséntate cuando quieras, sin prisa. Qué bueno que estás aquí.",
    ago: "ahora",
  },
];

// NOTICIAS — sección donde SOLO publica el admin/hanhagá (anuncios oficiales).
// El Muro (DEMO_POSTS) es donde escribe todo el mundo.
export const DEMO_NEWS: Record<string, DemoPost[]> = {
  "hanoar-hatzioni": [
    {
      id: "n1",
      author: "Hanhagá Hanóar",
      body: "📢 Inscripciones al Majané de Verano abiertas hasta el 15. Cupo limitado por kvutzá.",
      ago: "hace 3h",
    },
    {
      id: "n2",
      author: "Hanhagá Hanóar",
      body: "Este Shabat: peulá de Yom Haatzmaut a las 16:00 en el snif. Asistencia para todos los janijim.",
      ago: "hace 1d",
    },
  ],
};

export const DEMO_NEWS_FALLBACK: DemoPost[] = [
  {
    id: "nf1",
    author: "Hanhagá",
    body: "Aquí el equipo publica los anuncios oficiales de la comunidad. ¡Mantente al tanto!",
    ago: "ahora",
  },
];

// Feed de inicio: publicaciones de tus tnuot/escuelas/grupos.
export type FeedItem = {
  id: string;
  author: string;
  communityName: string;
  communitySlug: string;
  body: string;
  ago: string;
  replies: number;
};

export const DEMO_FEED: FeedItem[] = [
  {
    id: "1",
    author: "Tali",
    communityName: "Hanóar Hatzioní",
    communitySlug: "hanoar-hatzioni",
    body: "¡Peulá de Yom Haatzmaut este Shabat! Ropa azul y blanca, nos vemos a las 4 en el snif 🇮🇱",
    ago: "2h",
    replies: 8,
  },
  {
    id: "2",
    author: "Dani",
    communityName: "Madrijim 2026",
    communitySlug: "madrijim-2026",
    body: "¿Alguien tiene una dinámica buena de presentación para una kvutzá de janijim chiquitos? Se aceptan ideas 🙌",
    ago: "4h",
    replies: 12,
  },
  {
    id: "3",
    author: "Noa",
    communityName: "Majané de Verano",
    communitySlug: "majane-verano",
    body: "¡Ya salieron las kvutzot del majané! Pásense a ver con quién les tocó 🏕️",
    ago: "7h",
    replies: 5,
  },
  {
    id: "4",
    author: "Beto",
    communityName: "Voluntariado Tikún Olam",
    communitySlug: "voluntariado-tikun-olam",
    body: "Este domingo servimos 80 comidas en el comedor. Gracias a todos los que vinieron — esto es jésed de verdad ❤️",
    ago: "1d",
    replies: 9,
  },
];

// Tus comunidades — fila de "historias" arriba del feed.
export const DEMO_MY_COMMUNITIES = [
  { name: "Hanóar", slug: "hanoar-hatzioni", color: "#1d4ed8" },
  { name: "Tarbut", slug: "tarbut", color: "#0891b2" },
  { name: "Madrijim", slug: "madrijim-2026", color: "#ea580c" },
  { name: "Tikún Olam", slug: "voluntariado-tikun-olam", color: "#059669" },
  { name: "Majané", slug: "majane-verano", color: "#0d9488" },
];

// "Mis grupos" — comunidades a las que perteneces, con tu nivel (tier) y rol.
export type MyMembership = {
  slug: string;
  name: string;
  color: string;
  kind: CommunityKind;
  myTier: string; // tu nivel dentro de la comunidad
  isAdmin: boolean;
};

export const DEMO_MY_GROUPS: MyMembership[] = [
  { slug: "hanoar-hatzioni", name: "Hanóar Hatzioní", color: "#1d4ed8", kind: "tnua", myTier: "Madrij", isAdmin: false },
  { slug: "madrijim-2026", name: "Madrijim 2026", color: "#ea580c", kind: "grupo", myTier: "Organizador", isAdmin: true },
  { slug: "tarbut", name: "Colegio Hebreo Tarbut", color: "#0891b2", kind: "escuela", myTier: "Sociedad de alumnos", isAdmin: false },
  { slug: "voluntariado-tikun-olam", name: "Voluntariado Tikún Olam", color: "#059669", kind: "grupo", myTier: "Miembro", isAdmin: false },
  { slug: "majane-verano", name: "Majané de Verano", color: "#0d9488", kind: "grupo", myTier: "Miembro", isAdmin: false },
  { slug: "cdi", name: "Centro Deportivo Israelita (CDI)", color: "#0284c7", kind: "institucion", myTier: "Miembro", isAdmin: false },
];

// Personas — para la pestaña de amigos (janijim y madrijim).
export type Person = {
  name: string;
  username: string;
  bio: string;
  sharedInterests: string[];
  mutualCommunity: string | null;
};

export const DEMO_CIRCLE: Person[] = [
  {
    name: "Tali Mizrahi",
    username: "tali",
    bio: "Madrijá en Hanóar. Amo las peulot y los amaneceres de majané.",
    sharedInterests: ["Majané", "Liderazgo"],
    mutualCommunity: "Hanóar Hatzioní",
  },
  {
    name: "Ari Bénveniste",
    username: "ari",
    bio: "Janij nuevo, aprendiendo canciones de la tnuá.",
    sharedInterests: ["Música"],
    mutualCommunity: "Hanóar Hatzioní",
  },
  {
    name: "Noa Cohen",
    username: "noa",
    bio: "Cuento los días para el majané de verano.",
    sharedInterests: ["Majané", "Arte"],
    mutualCommunity: "Majané de Verano",
  },
];

export const DEMO_SUGGESTED: Person[] = [
  {
    name: "Dani Sutton",
    username: "dani",
    bio: "Madrij de juegos y malas bromas. Siempre hay lugar en la mesa.",
    sharedInterests: ["Juegos", "Liderazgo"],
    mutualCommunity: "Madrijim 2026",
  },
  {
    name: "Lucía Levy",
    username: "lucia",
    bio: "Comité de jésed, construyendo proyectos con sentido.",
    sharedInterests: ["Voluntariado", "Comunidad"],
    mutualCommunity: "Voluntariado Tikún Olam",
  },
  {
    name: "Beto Nahmías",
    username: "beto",
    bio: "Voluntario los domingos, fotógrafo de la tnuá.",
    sharedInterests: ["Voluntariado", "Fotografía"],
    mutualCommunity: "Voluntariado Tikún Olam",
  },
  {
    name: "Yael Esquenazi",
    username: "yael",
    bio: "Robótica en Monte Sinaí y debate los martes.",
    sharedInterests: ["Tecnología", "Debate"],
    mutualCommunity: null,
  },
];

// Mensajería — refleja la app móvil de LYNK. Las conversaciones pueden ser
// \"solicitudes\". Hasta que se acepta una solicitud, quien escribe a alguien que
// aún no responde está limitado a 2 mensajes (regla anti-acoso de LYNK).
export type ChatMessage = {
  id: string;
  type: "sent" | "received";
  content: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  personId: string;
  personName: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount: number;
  isOnline: boolean;
  isPending: boolean;
  messages: ChatMessage[];
};

export const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    personId: "tali",
    personName: "Tali Mizrahi",
    lastMessage: "¡Nos vemos el Shabat! Yo llevo la guitarra 🎸",
    timeAgo: "2h",
    unreadCount: 2,
    isOnline: true,
    isPending: false,
    messages: [
      { id: "m1", type: "received", content: "¡Qué bueno que te uniste a la kvutzá!", timestamp: "9:01" },
      { id: "m2", type: "sent", content: "¡Gracias! ¿La peulá del Shabat es para janijim nuevos?", timestamp: "9:04" },
      { id: "m3", type: "received", content: "Totalmente, no dejamos a nadie afuera 🙂", timestamp: "9:05" },
      { id: "m4", type: "received", content: "¡Nos vemos el Shabat! Yo llevo la guitarra 🎸", timestamp: "9:06" },
    ],
  },
  {
    id: "c2",
    personId: "ari",
    personName: "Ari Bénveniste",
    lastMessage: "Va, paso por el snif el domingo.",
    timeAgo: "5h",
    unreadCount: 0,
    isOnline: false,
    isPending: false,
    messages: [
      { id: "m1", type: "sent", content: "¡Bienvenido a la tnuá! ¿Vienes el domingo?", timestamp: "Lun" },
      { id: "m2", type: "received", content: "Va, paso por el snif el domingo.", timestamp: "Lun" },
    ],
  },
  {
    id: "c3",
    personId: "noa",
    personName: "Noa Cohen",
    lastMessage: "¡Lo agrego a la lista de canciones del majané! ✨",
    timeAgo: "1d",
    unreadCount: 0,
    isOnline: true,
    isPending: false,
    messages: [
      { id: "m1", type: "received", content: "¿Conoces alguna canción nueva para el kumzitz?", timestamp: "Ayer" },
      { id: "m2", type: "sent", content: "Sí, una de Hanóar buenísima, te la paso.", timestamp: "Ayer" },
      { id: "m3", type: "received", content: "¡Lo agrego a la lista de canciones del majané! ✨", timestamp: "Ayer" },
    ],
  },
  // ---- Solicitudes (mensajes nuevos por aceptar) ----
  {
    id: "c5",
    personId: "dani",
    personName: "Dani Sutton",
    lastMessage: "¡Hola! Vi que también eres madrij — ¿armamos algo juntos?",
    timeAgo: "3h",
    unreadCount: 1,
    isOnline: true,
    isPending: true,
    messages: [
      { id: "m1", type: "received", content: "¡Hola! Vi que también eres madrij en otra tnuá — ¿armamos una peulá juntos?", timestamp: "3h" },
    ],
  },
  {
    id: "c6",
    personId: "yael",
    personName: "Yael Esquenazi",
    lastMessage: "Si te interesa el comité de debate, te cuento 🙂",
    timeAgo: "1d",
    unreadCount: 1,
    isOnline: false,
    isPending: true,
    messages: [
      { id: "m1", type: "received", content: "Si te interesa el comité de debate de Monte Sinaí, te cuento cómo entrar 🙂", timestamp: "1d" },
    ],
  },
];

// Conversación saliente: yo escribí y aún no responden. Aquí el límite de
// consentimiento aplica a MÍ — máximo 2 mensajes hasta que contesten.
DEMO_CONVERSATIONS.push({
  id: "c7",
  personId: "lucia",
  personName: "Lucía Levy",
  lastMessage: "Tú: ¡Hola Lucía! Me late lo del comité de jésed…",
  timeAgo: "1h",
  unreadCount: 0,
  isOnline: false,
  isPending: false,
  messages: [
    {
      id: "m1",
      type: "sent",
      content: "¡Hola Lucía! Me late lo del comité de jésed, ¿cómo le entro?",
      timestamp: "hace 1h",
    },
  ],
});

export function getConversation(personId: string): Conversation | undefined {
  return DEMO_CONVERSATIONS.find((c) => c.personId === personId);
}

// Color cálido determinista a partir del nombre, para avatares con personalidad.
export function avatarTint(name: string) {
  const tints = ["#1d4ed8", "#ea580c", "#0891b2", "#7c3aed", "#15803d", "#dc2626"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997;
  return tints[h % tints.length];
}

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && url.startsWith("http") && !url.includes("your-project"));
}
