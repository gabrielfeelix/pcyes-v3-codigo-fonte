/**
 * Biblioteca de jogos e programas — capa, peso e categoria.
 *
 * Nasceu dentro do quiz do Monte Seu PC ("o que você joga?") e passou a servir
 * também a página do setup, que mostra o desempenho esperado título a título.
 * Duas listas iguais em arquivos diferentes divergiriam na primeira vez que
 * alguém acrescentasse um jogo — então mora aqui, e os dois importam.
 *
 * O `weight` é o que traduz catálogo em desempenho: cruzado com o tier do
 * setup, vira o FPS estimado (ver lib/setups). Jogo novo entra com o peso
 * certo e já aparece em todas as builds com número coerente.
 *
 * Capas vêm da CDN da Steam e da Wikipedia; logos de programa, do Iconify.
 * São URLs externas — quem consome tem que tolerar imagem que não carrega.
 */

export type QuizGame = {
  id: string;
  name: string;
  /** Como as pessoas realmente digitam o título na busca ("cs2", "cod"). */
  alias?: string[];
  cover: string;
  weight: "light" | "medium" | "heavy";
  tag: string;
  bg1?: string;
  bg2?: string;
};

const steamCover = (appId: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;

const wikiImg = (path: string) => `https://upload.wikimedia.org/wikipedia/${path}`;

export const quizGames: QuizGame[] = [
  { id: "cs2", name: "Counter-Strike 2", alias: ["cs", "cs2", "counter strike", "csgo"], cover: steamCover(730), weight: "light", tag: "FPS / Esports" },
  { id: "valorant", name: "Valorant", alias: ["valo"], cover: wikiImg("en/b/ba/Valorant_cover.jpg"), bg1: "#FF4655", bg2: "#0F1923", weight: "light", tag: "FPS Tático" },
  { id: "lol", name: "League of Legends", alias: ["lol", "league", "liga"], cover: wikiImg("commons/d/d8/League_of_Legends_2019_vector.svg"), bg1: "#0AC8B9", bg2: "#091428", weight: "light", tag: "MOBA / Esports" },
  { id: "dota2", name: "Dota 2", alias: ["dota"], cover: steamCover(570), weight: "light", tag: "MOBA / Esports" },
  { id: "fortnite", name: "Fortnite", alias: ["fn"], cover: wikiImg("commons/0/0e/FortniteLogo.svg"), bg1: "#7B4ACB", bg2: "#1F0A4B", weight: "medium", tag: "Battle Royale" },
  { id: "apex", name: "Apex Legends", alias: ["apex legends"], cover: steamCover(1172470), weight: "medium", tag: "Battle Royale" },
  { id: "pubg", name: "PUBG: Battlegrounds", alias: ["playerunknown", "battlegrounds"], cover: steamCover(578080), weight: "medium", tag: "Battle Royale" },
  { id: "warzone", name: "Call of Duty: Warzone", alias: ["cod", "call of duty", "wz"], cover: steamCover(1962663), weight: "heavy", tag: "Battle Royale" },
  { id: "rainbow6", name: "Rainbow Six Siege", alias: ["r6", "siege", "rainbow"], cover: steamCover(359550), weight: "medium", tag: "FPS Tático" },
  { id: "overwatch2", name: "Overwatch 2", alias: ["ow", "ow2", "overwatch"], cover: wikiImg("en/8/89/Overwatch_2_Steam_artwork.jpg"), bg1: "#F99E1A", bg2: "#16202E", weight: "medium", tag: "Hero Shooter" },
  { id: "rocket", name: "Rocket League", alias: ["rl", "rocket"], cover: steamCover(252950), weight: "light", tag: "Esportes / Arcade" },
  { id: "fc24", name: "EA Sports FC 24", alias: ["fifa", "fc 24", "ea fc"], cover: steamCover(2195250), weight: "medium", tag: "Esportes" },
  { id: "freefire", name: "Free Fire", alias: ["ff", "free fire"], cover: wikiImg("en/3/38/Free_Fire_New_Logo.svg"), bg1: "#FE7900", bg2: "#1C1410", weight: "light", tag: "Battle Royale Mobile" },
  { id: "minecraft", name: "Minecraft", alias: ["mine", "mc"], cover: wikiImg("en/b/be/Minecraft_game_logo_2023.png"), bg1: "#5C7C2F", bg2: "#1E2B0E", weight: "light", tag: "Sandbox" },
  { id: "roblox", name: "Roblox", cover: wikiImg("commons/4/4b/Roblox_Logo_2022.svg"), bg1: "#E2231A", bg2: "#0A0A0A", weight: "light", tag: "Multiplayer" },
  { id: "gta5", name: "GTA V", alias: ["gta", "gta 5", "grand theft auto"], cover: steamCover(271590), weight: "medium", tag: "Open World" },
  { id: "rdr2", name: "Red Dead Redemption 2", alias: ["rdr", "red dead"], cover: steamCover(1174180), weight: "heavy", tag: "Open World" },
  { id: "witcher3", name: "The Witcher 3", alias: ["witcher", "bruxo"], cover: steamCover(292030), weight: "heavy", tag: "AAA RPG" },
  { id: "cyberpunk", name: "Cyberpunk 2077", alias: ["cp2077", "cyber"], cover: steamCover(1091500), weight: "heavy", tag: "AAA pesado" },
  { id: "elden", name: "Elden Ring", alias: ["elden ring", "eldenring"], cover: steamCover(1245620), weight: "heavy", tag: "AAA RPG" },
  { id: "bg3", name: "Baldur's Gate 3", alias: ["bg3", "baldurs gate"], cover: steamCover(1086940), weight: "heavy", tag: "AAA RPG" },
  { id: "hogwarts", name: "Hogwarts Legacy", alias: ["harry potter", "hogwarts"], cover: steamCover(990080), weight: "heavy", tag: "AAA Aventura" },
  { id: "starfield", name: "Starfield", cover: steamCover(1716740), weight: "heavy", tag: "AAA RPG" },
  { id: "alan-wake-2", name: "Alan Wake 2", cover: wikiImg("en/e/ed/Alan_Wake_2_box_art.jpg"), bg1: "#2A1A4F", bg2: "#0A0716", weight: "heavy", tag: "AAA pesado" },
  { id: "wukong", name: "Black Myth Wukong", alias: ["wukong", "black myth"], cover: steamCover(2358720), weight: "heavy", tag: "AAA pesado" },
  { id: "stellar", name: "Stellar Blade", cover: steamCover(3489700), weight: "heavy", tag: "AAA Ação" },
  { id: "genshin", name: "Genshin Impact", cover: wikiImg("en/5/5d/Genshin_Impact_logo.svg"), bg1: "#FFCE71", bg2: "#1B2233", weight: "medium", tag: "RPG Online" },
  { id: "wow", name: "World of Warcraft", alias: ["wow", "warcraft"], cover: wikiImg("en/6/65/World_of_Warcraft.png"), bg1: "#FFB100", bg2: "#0E1620", weight: "medium", tag: "MMORPG" },
];

export type QuizProgram = {
  id: string;
  name: string;
  /** Apelidos de busca ("ps", "after", "davinci"). */
  alias?: string[];
  short: string;
  category: string;
  bg: string;
  fg: string;
  weight: "light" | "heavy";
  logo?: string;
};

const iconifyLogo = (slug: string) => `https://api.iconify.design/logos:${slug}.svg`;
const iconifyMono = (slug: string, hex: string) =>
  `https://api.iconify.design/simple-icons:${slug}.svg?color=%23${hex.replace("#", "")}`;

export const quizPrograms: QuizProgram[] = [
  {
    id: "photoshop",
    alias: ["ps", "photo shop"],
    name: "Photoshop",
    short: "Ps",
    category: "Foto / Imagem",
    bg: "#001E36",
    fg: "#31A8FF",
    weight: "light",
    logo: iconifyLogo("adobe-photoshop"),
  },
  {
    id: "lightroom",
    alias: ["lr"],
    name: "Lightroom",
    short: "Lr",
    category: "Foto / Tratamento",
    bg: "#001E36",
    fg: "#31A8FF",
    weight: "light",
    logo: iconifyLogo("adobe-lightroom"),
  },
  {
    id: "illustrator",
    alias: ["ai", "illustra"],
    name: "Illustrator",
    short: "Ai",
    category: "Vetor / Ilustração",
    bg: "#330000",
    fg: "#FF9A00",
    weight: "light",
    logo: iconifyLogo("adobe-illustrator"),
  },
  {
    id: "indesign",
    alias: ["id"],
    name: "InDesign",
    short: "Id",
    category: "Editorial",
    bg: "#49021F",
    fg: "#FF3366",
    weight: "light",
    logo: iconifyLogo("adobe-indesign"),
  },
  {
    id: "figma",
    name: "Figma",
    short: "Fi",
    category: "UI / Design",
    bg: "#1E1E1E",
    fg: "#F24E1E",
    weight: "light",
    logo: iconifyLogo("figma"),
  },
  {
    id: "canva",
    name: "Canva",
    short: "Cv",
    category: "Design fácil",
    bg: "#0D1E40",
    fg: "#00C4CC",
    weight: "light",
    logo: iconifyMono("canva", "#00C4CC"),
  },
  {
    id: "affinity",
    name: "Affinity Suite",
    short: "Af",
    category: "Foto / Design",
    bg: "#0E1F3D",
    fg: "#7CC4F4",
    weight: "light",
    logo: iconifyMono("affinitydesigner", "#7CC4F4"),
  },
  {
    id: "premiere",
    alias: ["pr", "premiere pro", "adobe premiere"],
    name: "Premiere Pro",
    short: "Pr",
    category: "Edição de Vídeo",
    bg: "#00005B",
    fg: "#9999FF",
    weight: "heavy",
    logo: iconifyLogo("adobe-premiere"),
  },
  {
    id: "davinci",
    alias: ["resolve", "davinci resolve"],
    name: "DaVinci Resolve",
    short: "Dv",
    category: "Vídeo / Color Grading",
    bg: "#232F3E",
    fg: "#FF8D11",
    weight: "heavy",
    logo: iconifyMono("davinciresolve", "#FF8D11"),
  },
  {
    id: "capcut",
    alias: ["cap cut"],
    name: "CapCut / Pro",
    short: "Cc",
    category: "Vídeo Social",
    bg: "#1A1A1F",
    fg: "#5B8AF5",
    weight: "light",
    logo: wikiImg("en/a/a0/Capcut-logo.svg"),
  },
  {
    id: "vegas",
    name: "Vegas Pro",
    short: "Vg",
    category: "Edição de Vídeo",
    bg: "#1B1B1B",
    fg: "#FFB400",
    weight: "heavy",
    logo: wikiImg("commons/4/45/Vegas_Pro_Logo_2026.svg"),
  },
  {
    id: "aftereffects",
    alias: ["ae", "after effects", "after"],
    name: "After Effects",
    short: "Ae",
    category: "Motion Graphics",
    bg: "#00005B",
    fg: "#D291FF",
    weight: "heavy",
    logo: iconifyLogo("adobe-after-effects"),
  },
  {
    id: "obs",
    alias: ["stream", "live"],
    name: "OBS Studio",
    short: "Ob",
    category: "Stream / Live",
    bg: "#1F1F2E",
    fg: "#9B4DCA",
    weight: "heavy",
    logo: iconifyMono("obsstudio", "#9B4DCA"),
  },
  {
    id: "streamlabs",
    name: "Streamlabs",
    short: "Sl",
    category: "Stream / Live",
    bg: "#0E1A2B",
    fg: "#80F5D2",
    weight: "heavy",
    logo: iconifyMono("streamlabs", "#80F5D2"),
  },
  {
    id: "blender",
    alias: ["3d"],
    name: "Blender",
    short: "Bl",
    category: "3D / Render",
    bg: "#1A1A1A",
    fg: "#EA7600",
    weight: "heavy",
    logo: iconifyLogo("blender"),
  },
  {
    id: "cinema4d",
    alias: ["c4d", "cinema"],
    name: "Cinema 4D",
    short: "C4",
    category: "3D / Motion",
    bg: "#0F1730",
    fg: "#1E88E5",
    weight: "heavy",
    logo: iconifyMono("cinema4d", "#1E88E5"),
  },
  {
    id: "zbrush",
    alias: ["escultura"],
    name: "ZBrush",
    short: "Zb",
    category: "3D / Escultura",
    bg: "#1F1F1F",
    fg: "#C5A572",
    weight: "heavy",
    logo: wikiImg("commons/9/95/ZBrush_icon_new.svg"),
  },
  {
    id: "unreal",
    alias: ["ue5", "unreal engine"],
    name: "Unreal Engine",
    short: "Ue",
    category: "Game Dev / Render",
    bg: "#0E0E0E",
    fg: "#5B9FE0",
    weight: "heavy",
    logo: iconifyMono("unrealengine", "#5B9FE0"),
  },
  {
    id: "unity",
    name: "Unity",
    short: "Un",
    category: "Game Dev",
    bg: "#1A1A1A",
    fg: "#E0E0E0",
    weight: "heavy",
    logo: iconifyLogo("unity"),
  },
  {
    id: "audition",
    alias: ["au", "audio"],
    name: "Audition",
    short: "Au",
    category: "Áudio / Pós",
    bg: "#00203A",
    fg: "#00C8B4",
    weight: "heavy",
    logo: iconifyMono("adobeaudition", "#00C8B4"),
  },
  {
    id: "flstudio",
    alias: ["fl", "fruity loops"],
    name: "FL Studio",
    short: "Fl",
    category: "Música / DAW",
    bg: "#1A1A1A",
    fg: "#FF6B00",
    weight: "heavy",
    logo: wikiImg("en/6/69/FL_Studio_11_just_logo.png"),
  },
  {
    id: "vscode",
    alias: ["vs code", "code", "programar", "dev"],
    name: "VS Code",
    short: "Vs",
    category: "Dev / Código",
    bg: "#11243A",
    fg: "#3FA9F5",
    weight: "light",
    logo: iconifyLogo("visual-studio-code"),
  },
];
