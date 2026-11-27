/* =====================================================================
   Max Boss – Inhalte
   Hier änderst du Texte, Titelbilder und Bildbeschreibungen.
   Bilder musst du NICHT eintragen: Die Website liest die Ordner in img/ selbst aus.
   ===================================================================== */

/* Reihenfolge = Reihenfolge auf der Website.
   ordner = Ordnername in img/ (genau so geschrieben wie im Finder)
   cover  = Titelbild (Dateiname im Ordner)
   fit    = "contain" zeigt das ganze Bild (gut für Produkte), sonst wird zugeschnitten */
const PROJEKTE = [
  {
    key: "immobilien", ordner: "Haus", cover: "784A1272.jpg",
    titel: { de: "Immobilienfotografie", en: "Real estate photography" },
    kat:   { de: "Immobilien", en: "Real estate" },
    kurz:  { de: "Häuser und Wohnungen – innen, aussen und von oben.", en: "Houses and apartments – inside, outside and from above." },
    text: {
      de: ["Ich fotografiere Wohnungen und Häuser für Inserate, Webseiten und Social Media. Dazu gehören Innenräume, Aussenansichten und die Umgebung.",
           "Wenn es passt, mache ich zusätzlich Drohnenaufnahmen von oben. Aufgenommen wird mit der Canon R7. Bei der Bearbeitung korrigiere ich nur Helligkeit, Farben und Linien, damit die Bilder realistisch bleiben."],
      en: ["I photograph apartments and houses for listings, websites and social media. This includes interiors, exteriors and the surroundings.",
           "Where it makes sense, I add drone shots from above. Everything is shot with the Canon R7. When editing, I only correct brightness, colours and lines so the images stay realistic."]
    }
  },
  {
    key: "auto", ordner: "Auto", cover: "784A0019.jpg",
    titel: { de: "Autofotografie", en: "Car photography" },
    kat:   { de: "Auto", en: "Cars" },
    kurz:  { de: "Supercars, Klassiker und Events – von Andermatt bis Zürich.", en: "Supercars, classics and events – from Andermatt to Zurich." },
    text: {
      de: ["Autos sind mein liebstes Motiv. Ich fotografiere Sportwagen und Klassiker auf der Strasse, an Events und an besonderen Orten.",
           "Im September 2026 durfte ich einen Porsche 992 GT3 RS Weissach am Hafen Wollishofen in Zürich fotografieren. Im Mittelpunkt standen die neuen Felgen, die der Besitzer bei TITANFORGED Swiss als 1-von-1-Anfertigung bauen liess."],
      en: ["Cars are my favourite subject. I photograph sports cars and classics on the road, at events and in special places.",
           "In September 2026, I got to photograph a Porsche 992 GT3 RS Weissach at the Wollishofen harbour in Zurich. The focus was on the new wheels, which the owner had custom-made by TITANFORGED Swiss as a one-off."]
    }
  },
  {
    key: "drohne", ordner: "drohne", cover: "dji_fly_20250420_105230_572_1745113984391_photo_optimized.jpg",
    titel: { de: "Drohnenaufnahmen", en: "Drone photography" },
    kat:   { de: "Drohne", en: "Drone" },
    kurz:  { de: "Perspektiven, die vom Boden aus nicht möglich sind.", en: "Perspectives you can't get from the ground." },
    text: {
      de: ["Mit meiner DJI Mini 2 fotografiere und filme ich aus der Luft und zeige Motive aus Blickwinkeln, die vom Boden aus nicht möglich sind.",
           "Dazu gehören Autos in ihrer Umgebung, Natur und Landschaften sowie Immobilien und Events."],
      en: ["With my DJI Mini 2, I take photos and videos from the air and show subjects from angles that aren't possible from the ground.",
           "This includes cars in their surroundings, nature and landscapes, as well as real estate and events."]
    }
  },
  {
    key: "produkt", ordner: "Produkt", cover: "IMG_8329.JPG", fit: "contain", dedupe: true,
    titel: { de: "Produktfotografie", en: "Product photography" },
    kat:   { de: "Produkt", en: "Product" },
    kurz:  { de: "Holzkunstwerke eines Künstlers, jedes ein Unikat.", en: "Wooden artworks by one artist, each one of a kind." },
    text: {
      de: ["Über mehrere Monate hatte ich die Möglichkeit, immer wieder die Holzkunstwerke eines Künstlers zu fotografieren. Jedes Stück ist ein Unikat!",
           "Die Fotos nutzt der Kunde auf seiner Webseite und an Märkten, wo er seine Arbeiten verkauft."],
      en: ["Over several months, I had the opportunity to photograph an artist's wooden artworks again and again. Every piece is one of a kind!",
           "The client uses the photos on his website and at markets where he sells his work."]
    }
  },
  {
    key: "anderes", ordner: "anderes", cover: "784A7289.JPG",
    titel: { de: "Freie Arbeiten", en: "Personal work" },
    kat:   { de: "Reisen & Momente", en: "Travel & moments" },
    kurz:  { de: "Von der Patrouille Suisse bis Tokio.", en: "From the Patrouille Suisse to Tokyo." },
    text: {
      de: ["Neben Aufträgen fotografiere ich vor allem für mich: auf Reisen, in den Bergen und an Events.",
           "Klick auf ein Bild, dann siehst du, wo und wann es entstanden ist."],
      en: ["Besides client work, I mostly shoot for myself: while travelling, in the mountains and at events.",
           "Click an image to see where and when it was taken."]
    }
  },
  {
    key: "animation", videos: true,
    titel: { de: "Animation", en: "Animation" },
    kat:   { de: "Motion", en: "Motion" },
    kurz:  { de: "Neue Animationen und Visitenkarten für DINACON.", en: "New animations and business cards for DINACON." },
    text: {
      de: ["Im August 2025 hatte ich die Möglichkeit, mehrere Animationen für DINACON zu überarbeiten. Die bestehenden Animationen waren nicht mehr aktuell und passten nicht mehr zum heutigen Auftritt.",
           "Ziel war es, sie zu modernisieren und optisch auf den neusten Stand zu bringen. Zusätzlich habe ich Visitenkarten gestaltet."],
      en: ["In August 2025, I had the opportunity to rework several animations for DINACON. The existing animations were outdated and no longer matched the company's current look.",
           "The goal was to modernise them and bring their look up to date. I also designed business cards."]
    }
  }
];

/* Deine 3 Animationen (liegen im Ordner videos/) */
const VIDEOS = [
  "videos/2025_DINA_whatisCON.mp4",
  "videos/2025_Dinacon_save_the_date_mit Dina.mp4",
  "videos/2025_Final Call Video DINAcon.mp4"
];

/* Bildbeschreibungen - erscheinen NUR, wenn man ein Bild anklickt.
   Schlüssel = Anfang des Dateinamens (Gross/Klein egal). */
const BILDTEXTE = {
  /* ---------- Anderes ---------- */
  "784A1288": { de: "Sommer 2026 · Ausflug nach Monaco - Jacht und Stadt", en: "Summer 2026 · Trip to Monaco - yacht and city" },
  "784A1291-3": { de: "In der Nähe von Monaco · Eine ruhige Sitzbank am Meer", en: "Near Monaco · A quiet bench by the sea" },
  "784A7289": { de: "Januar 2026 · Patrouille Suisse am The ICE St. Moritz - eine der letzten Gelegenheiten, denn Ende 2027 wird die Staffel aufgelöst", en: "January 2026 · Patrouille Suisse at The ICE St. Moritz - one of the last chances, as the team will be disbanded at the end of 2027" },
  "784A9369": { de: "April 2025 · Torii-Tore in Japan", en: "April 2025 · Torii gates in Japan" },
  "784A9770": { de: "12. August 2026 · Fast totale Sonnenfinsternis über der Schweiz", en: "12 August 2026 · Almost total solar eclipse over Switzerland" },
  "F82D6A44": { de: "Juli 2026 · Murmeltier in Saas-Fee", en: "July 2026 · Marmot in Saas-Fee" },
  "FInal": { de: "Japan · Tokyo Skytree mit Pixel-Stretch-Effekt", en: "Japan · Tokyo Skytree with a pixel stretch effect" },

  /* ---------- Auto ---------- */
  "784A0019": { de: "Maserati MC12 · SOC 2026 in Andermatt", en: "Maserati MC12 · SOC 2026 in Andermatt" },
  "784A0036": { de: "Lamborghini Diablo SE30 Jota · SOC 2026 in Andermatt - vor Ort waren gleich zwei, auf dem Bild ist einer zu sehen", en: "Lamborghini Diablo SE30 Jota · SOC 2026 in Andermatt - two were there, one is in the picture" },
  "784A0067": { de: "Bugatti EB112 · SOC 2026 in Andermatt", en: "Bugatti EB112 · SOC 2026 in Andermatt" },
  "784A0082": { de: "Ferrari F40 · SOC 2026 in Andermatt", en: "Ferrari F40 · SOC 2026 in Andermatt" },
  "784A0428": { de: "Porsche 992 GT3 RS Weissach · Die 1-von-1-Felge von TITANFORGED Swiss · Hafen Wollishofen, Zürich, September 2026", en: "Porsche 992 GT3 RS Weissach · The one-off wheel by TITANFORGED Swiss · Wollishofen harbour, Zurich, September 2026" },
  "784A0463": { de: "Porsche 992 GT3 RS Weissach · Hafen Wollishofen, Zürich, September 2026", en: "Porsche 992 GT3 RS Weissach · Wollishofen harbour, Zurich, September 2026" },
  "784A0498": { de: "Porsche 992 GT3 RS Weissach · Interieur", en: "Porsche 992 GT3 RS Weissach · Interior" },
  "784A0850": {
    de: "Bugatti Veyron 16.4 Grand Sport Vitesse «Jean-Pierre Wimille» (2014) · RM Sotheby's Auktion im Park Hyatt Zürich, 26. September 2026. Er wurde für CHF 4'505'000 verkauft - Weltrekord für dieses Modell und mehr als ein Viertel des Auktionstotals von CHF 16,3 Mio. (Schätzung: CHF 2,4-2,8 Mio.). Es gibt nur drei «Jean-Pierre Wimille»-Veyron, die erste Ausgabe der Bugatti Legends-Serie. Er ehrt Jean-Pierre Wimille und den Type 57G Tank, mit dem er und Robert Benoist 1937 die 24 Stunden von Le Mans gewannen - Bugattis erster Sieg dort. Zweifarbige Lackierung, Le-Mans-Streckenplan, Wimilles Porträt und Unterschrift, französische Flaggen und Bugattis Elefanten-Emblem.",
    en: "Bugatti Veyron 16.4 Grand Sport Vitesse 'Jean-Pierre Wimille' (2014) · RM Sotheby's sale at the Park Hyatt Zurich, 26 September 2026. It sold for CHF 4,505,000 - a world auction record for the model and more than a quarter of the CHF 16.3 million sale total (estimate: CHF 2.4-2.8m). Only three 'Jean-Pierre Wimille' Veyrons were built, the first instalment of Bugatti's Legends series. It honours Jean-Pierre Wimille and the Type 57G Tank he shared with Robert Benoist to win the 1937 Le Mans 24 Hours - Bugatti's first victory there. Two-tone finish, Le Mans circuit layout, Wimille's portrait and signature, French flag motifs and Bugatti's elephant emblem."
  },
  "784A0979": { de: "2022 Mercedes-AMG GT Black Series", en: "2022 Mercedes-AMG GT Black Series" },
  "784A1222": { de: "Eine Reihe historischer Bugattis · Cité de l'Automobile, Mulhouse (Frankreich)", en: "A row of historic Bugattis · Cité de l'Automobile, Mulhouse (France)" },
  "784A1365": { de: "Lamborghini Miura · Autosammlung des Fürsten von Monaco", en: "Lamborghini Miura · The Prince of Monaco's car collection" },
  "784A1379": { de: "Alpine A110 Berlinette · Autosammlung des Fürsten von Monaco", en: "Alpine A110 Berlinette · The Prince of Monaco's car collection" },
  "784A1399": { de: "Mercedes-Benz CLK GTR · Autosammlung des Fürsten von Monaco", en: "Mercedes-Benz CLK GTR · The Prince of Monaco's car collection" },
  "784A1481": { de: "Ferrari F8 Spider · In der Nähe des Casinos in Monaco", en: "Ferrari F8 Spider · Near the casino in Monaco" },
  "784A1992": { de: "Koenigsegg Agera R in Candy Red von Nidal Bentaleb · Zürich", en: "Koenigsegg Agera R in Candy Red owned by Nidal Bentaleb · Zurich" },
  "784A2032": { de: "Koenigsegg Agera R in Candy Red von Nidal Bentaleb · Zürich", en: "Koenigsegg Agera R in Candy Red owned by Nidal Bentaleb · Zurich" },
  "784A3313": { de: "Lamborghini Huracán · Genf 2025", en: "Lamborghini Huracán · Geneva 2025" },
  "784A9918": { de: "Capricorn 01 Zagato · SOC 2026 in Andermatt", en: "Capricorn 01 Zagato · SOC 2026 in Andermatt" },
  "784A9673": { de: "Aston Martin Valkyrie · SOC 2026 in Andermatt", en: "Aston Martin Valkyrie · SOC 2026 in Andermatt" },
  "784A9662": { de: "Bugatti Chiron · SOC 2026 in Andermatt", en: "Bugatti Chiron · SOC 2026 in Andermatt" },
  "8534DEBE": { de: "Porsche Singer, im Hintergrund ein Rega-Helikopter · SOC 2025", en: "Porsche Singer with a Rega helicopter in the background · SOC 2025" },

  /* ---------- Drohne ---------- */
  "DJI_0715": { de: "Porsche 992 GT3 RS Weissach von oben · Hafen Wollishofen, Zürich", en: "Porsche 992 GT3 RS Weissach from above · Wollishofen harbour, Zurich" },
  "dji_fly_20230923": { de: "Oktober 2026 · Riesenrad auf dem Gurten, Bern", en: "October 2026 · Ferris wheel on the Gurten, Bern" },
  "dji_fly_20231003": { de: "Bachalpsee bei Grindelwald-First", en: "Bachalpsee near Grindelwald-First" },
  "dji_fly_20231013": { de: "Oeschinensee bei Kandersteg", en: "Oeschinensee near Kandersteg" },
  "dji_fly_20250420": { de: "April 2025 · Velotour durch Japan - Brücke beim Rastplatz an der Velostrecke in Yoshiumi, Imabari (Ehime), aufgenommen mit der Drohne", en: "April 2025 · Cycling trip through Japan - bridge at the cycling road rest area in Yoshiumi, Imabari (Ehime), shot with the drone" },

  /* ---------- Haus ---------- */
  "784A1272": { de: "Gebäude in Monaco", en: "Building in Monaco" },
  "2023-09-08": { de: "Wohnhäuser von oben", en: "Houses from above" },
  "2024-01-19": { de: "Wohnhäuser von oben", en: "Houses from above" },
  "2025-01-23": { de: "Wohnhäuser von oben", en: "Houses from above" },

  /* ---------- Produkt (alle IMG_-Bilder) ---------- */
  "IMG_": { de: "Holzkunstwerk · Jedes Stück ist ein Unikat", en: "Wooden artwork · Every piece is one of a kind" }
};

/* Notfall-Liste, falls die Ordner nicht ausgelesen werden können
   (z. B. wenn du index.html per Doppelklick statt mit Live Server öffnest). */
const BEKANNT = {
  Auto: ["784A0019.jpg","784A0036.jpg","784A0067.jpg","784A0082.jpg","784A0428.jpg","784A0463.jpg","784A0498.jpg","784A0850-3.jpg","784A0979.jpg","784A1222.jpg","784A1365.jpg","784A1379.jpg","784A1399.jpg","784A1481.jpg","784A1992.jpg","784A2032.jpg","784A3313.JPG","784A9662.jpg","784A9673.jpg","784A9918.jpg","8534DEBE-6EA0-489C-A673-3FCE2194359A.jpg"],
  drohne: ["DJI_0715-2.jpg","dji_fly_20230923_192048_314_1695496166412_photo_optimized.jpg","dji_fly_20231003_150858_350_1696338590542_photo_optimized.jpg","dji_fly_20231013_140832_376_1697198919383_photo_optimized.jpg","dji_fly_20250420_105230_572_1745113984391_photo_optimized.jpg"],
  Haus: ["784A1272.jpg","2023-09-08 16.02.53.jpg","2024-01-19 17.20.25.jpg","2025-01-23 12.40.35.jpg"],
  Produkt: ["IMG_1300.JPG","IMG_8312.JPG","IMG_8329.JPG","IMG_8332.JPG","IMG_8540.JPG"],
  anderes: ["784A1288.jpg","784A1291-3.jpg","784A7289.JPG","784A9369.JPG","784A9770.JPG","F82D6A44-9C25-4935-8FAC-93FC42AAA5D2.jpg","FInal.jpg"]
};
