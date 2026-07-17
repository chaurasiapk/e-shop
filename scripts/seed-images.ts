/** Verified Unsplash URLs for brand logos & product galleries */

const u = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const brandLogos: Record<string, string> = {
  apple: u("photo-1611186871348-b1ce696e52c9"),
  samsung: u("photo-1610945415295-d9bbf067e59c"),
  google: u("photo-1598327105666-5b89351aff97"),
  oneplus: u("photo-1511707171634-5f897ff02aa9"),
  nothing: u("photo-1510557880182-3d4d3cba35a5"),
  xiaomi: u("photo-1592899677977-9c10ca588bbd"),
  motorola: u("photo-1580910051074-3eb694886505"),
  iqoo: u("photo-1601784551446-20c9e07cdbdb"),
  realme: u("photo-1567581935884-3349723552ca"),
  oppo: u("photo-1574944985070-8a39a0d4f0b8"),
  vivo: u("photo-1556656793-08538906a9f8"),
  dell: u("photo-1593640408182-31c70c8268f5"),
  hp: u("photo-1496181133206-80ce9b88a853"),
  lenovo: u("photo-1588872657578-7efd1f1555ed"),
  asus: u("photo-1603302576837-37561b2e2302"),
  acer: u("photo-1525547719571-a2d4acff8af2"),
  msi: u("photo-1593642632823-8f785ba67e45"),
  microsoft: u("photo-1633419461186-7d40a38105ec"),
  lg: u("photo-1593359677879-a4bb92f829d1"),
  logitech: u("photo-1527864550417-7fd91fc51a46"),
  keychron: u("photo-1511467687858-23d96c32e4ae"),
  razer: u("photo-1542751371-adc38448a05e"),
  hyperx: u("photo-1599669454699-248893623440"),
  "tp-link": u("photo-1558002038-1055907df827"),
  sandisk: u("photo-1597872200969-2b65d56bd16b"),
  seagate: u("photo-1531492746076-161ca9bcadf5"),
  anker: u("photo-1609091839311-d5365f9ff1c5"),
  belkin: u("photo-1583394838336-acd977736f90"),
  "cooler-master": u("photo-1587202372775-e229f172b9d7"),
  apc: u("photo-1609091839311-d5365f9ff1c5"),
  "amazon-basics": u("photo-1556742049-0cfed4f6a45d"),
};

type ProductMedia = { thumbnail: string; images: string[] };

const gallery = (...ids: string[]): ProductMedia => ({
  thumbnail: u(ids[0]),
  images: ids.map((id) => u(id)),
});

export const productMedia: Record<string, ProductMedia> = {
  "iphone-16": gallery(
    "photo-1695048133142-1a20484d2569",
    "photo-1510557880182-3d4d3cba35a5",
    "photo-1592899677977-9c10ca588bbd",
  ),
  "iphone-16-pro": gallery(
    "photo-1510557880182-3d4d3cba35a5",
    "photo-1695048133142-1a20484d2569",
    "photo-1511707171634-5f897ff02aa9",
  ),
  "samsung-galaxy-s25": gallery(
    "photo-1610945415295-d9bbf067e59c",
    "photo-1580910051074-3eb694886505",
    "photo-1567581935884-3349723552ca",
  ),
  "samsung-galaxy-s25-ultra": gallery(
    "photo-1610945265064-0e34e5519bbf",
    "photo-1610945415295-d9bbf067e59c",
    "photo-1598327105666-5b89351aff97",
  ),
  "google-pixel-9": gallery(
    "photo-1598327105666-5b89351aff97",
    "photo-1511707171634-5f897ff02aa9",
    "photo-1556656793-08538906a9f8",
  ),
  "macbook-air-13-m4": gallery(
    "photo-1517336714731-489689fd1ca8",
    "photo-1611186871348-b1ce696e52c9",
    "photo-1496181133206-80ce9b88a853",
  ),
  "macbook-pro-14-m4-pro": gallery(
    "photo-1515879218367-8466d910aaa4",
    "photo-1517336714731-489689fd1ca8",
    "photo-1484788984921-03950022c9ef",
  ),
  "dell-xps-13": gallery(
    "photo-1593642632823-8f785ba67e45",
    "photo-1588872657578-7efd1f1555ed",
    "photo-1496181133206-80ce9b88a853",
  ),
  "mx-master-3s-wireless-mouse": gallery(
    "photo-1527864550417-7fd91fc51a46",
    "photo-1615663245857-ac93bb7c39e7",
  ),
  "logitech-g-pro-x-superlight-2": gallery(
    "photo-1615663245857-ac93bb7c39e7",
    "photo-1527864550417-7fd91fc51a46",
  ),
  "mx-keys-s-wireless-keyboard": gallery(
    "photo-1587829741301-dc798b83add3",
    "photo-1511467687858-23d96c32e4ae",
  ),
  "keychron-k2-v2": gallery(
    "photo-1511467687858-23d96c32e4ae",
    "photo-1587829741301-dc798b83add3",
  ),
  "ipad-air-m2": gallery(
    "photo-1544244015-0df4b3ffc6b0",
    "photo-1561154464-82e9adf32764",
  ),
  "samsung-galaxy-tab-s9": gallery(
    "photo-1561154464-82e9adf32764",
    "photo-1544244015-0df4b3ffc6b0",
  ),
  "dell-optiplex-tower": gallery(
    "photo-1587831990711-23ca6441447b",
    "photo-1593640408182-31c70c8268f5",
  ),
  "hp-pavilion-desktop": gallery(
    "photo-1593640408182-31c70c8268f5",
    "photo-1587831990711-23ca6441447b",
  ),
  "apple-watch-series-10": gallery(
    "photo-1434493789847-2f02dc6ca35d",
    "photo-1579586337278-3befd40fd17a",
  ),
  "samsung-galaxy-watch-7": gallery(
    "photo-1579586337278-3befd40fd17a",
    "photo-1434493789847-2f02dc6ca35d",
  ),
  "sony-wh-1000xm5": gallery(
    "photo-1618366712010-f4ae9c647dcb",
    "photo-1546435770-a3e426bf472b",
  ),
  "hyperx-cloud-iii": gallery(
    "photo-1599669454699-248893623440",
    "photo-1618366712010-f4ae9c647dcb",
  ),
  "apple-airpods-pro-2": gallery(
    "photo-1606220588913-b3aacb4d2f46",
    "photo-1590658268037-6bf12165a8df",
  ),
  "samsung-galaxy-buds3-pro": gallery(
    "photo-1590658268037-6bf12165a8df",
    "photo-1606220588913-b3aacb4d2f46",
  ),
  "anker-737-power-bank": gallery(
    "photo-1609091839311-d5365f9ff1c5",
    "photo-1583394838336-acd977736f90",
  ),
  "belkin-magsafe-3-in-1-stand": gallery(
    "photo-1583394838336-acd977736f90",
    "photo-1609091839311-d5365f9ff1c5",
  ),
  "samsung-55-qled-4k-tv": gallery(
    "photo-1593359677879-a4bb92f829d1",
    "photo-1461151304267-38535e780c79",
  ),
  "lg-65-oled-c4": gallery(
    "photo-1461151304267-38535e780c79",
    "photo-1593359677879-a4bb92f829d1",
  ),
  "sony-alpha-zv-e10": gallery(
    "photo-1516035069371-29a1b244cc32",
    "photo-1502920917128-1aa500764cbd",
  ),
  "canon-eos-r50": gallery(
    "photo-1502920917128-1aa500764cbd",
    "photo-1516035069371-29a1b244cc32",
  ),
  "jbl-flip-6": gallery(
    "photo-1608043152269-423dbba4e7e1",
    "photo-1545454675-3531b543be5d",
  ),
  "sony-srs-xb43": gallery(
    "photo-1545454675-3531b543be5d",
    "photo-1608043152269-423dbba4e7e1",
  ),
  "tp-link-tapo-c210": gallery(
    "photo-1558002038-1055907df827",
    "photo-1557597774-9d273605dfa9",
  ),
  "hikvision-colorvu-dome": gallery(
    "photo-1557597774-9d273605dfa9",
    "photo-1558002038-1055907df827",
  ),
  "playstation-5-slim": gallery(
    "photo-1606813907291-d86efa9b94db",
    "photo-1621259182978-fbf93132d53d",
  ),
  "xbox-series-x": gallery(
    "photo-1621259182978-fbf93132d53d",
    "photo-1606813907291-d86efa9b94db",
  ),
  "lg-ultragear-27-165hz": gallery(
    "photo-1527443224154-c4a3942d3acf",
    "photo-1585792187661-64e7fba0b0a5",
  ),
  "dell-ultrasharp-27-4k": gallery(
    "photo-1585792187661-64e7fba0b0a5",
    "photo-1527443224154-c4a3942d3acf",
  ),
  "samsung-990-pro-2tb": gallery(
    "photo-1597872200969-2b65d56bd16b",
    "photo-1531492746076-161ca9bcadf5",
  ),
  "seagate-expansion-4tb": gallery(
    "photo-1531492746076-161ca9bcadf5",
    "photo-1597872200969-2b65d56bd16b",
  ),
};
