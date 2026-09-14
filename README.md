# Sój — Vino e Cucina · Demo

Concept website demo progettato e sviluppato da Punto Due Studio per Sój — Vino e Cucina, Parma.

> Concept dimostrativo non commissionato · Punto Due Studio

## Creative thesis

**Sedici posti. Due persone. Nessuna distanza.**

Il progetto evita il classico linguaggio da ristorante e costruisce la UI intorno alla caratteristica più distintiva di Sój: uno spazio molto piccolo, cucina a vista, sedici posti e due chef/patron che cucinano e servono direttamente.

La direzione visuale usa una grammatica quasi architettonica: pianta della sala, sedute, banco, linee di servizio, annotazioni tecniche e un sistema grafico essenziale ispirato al verde chiaro degli interni documentati. Il rosso-arancio viene usato come segnale umano/culinario, non come palette dominante da wine bar.

## Dati pubblici utilizzati

- Nome: Sój / Soj — Vino e Cucina
- Indirizzo: Borgo del Parmigianino 26, 43121 Parma PR
- Telefono: +39 320 264 4207
- Apertura del progetto: settembre 2021
- Fondatori / chef: Federico Capocasa ed Eugenio Restivo
- Capienza raccontata dalle fonti: 16 posti
- Cucina a vista; i due chef gestiscono cucina e servizio
- Ispirazione di modello: convivialità degli izakaya giapponesi
- Il nome “Sój” è ricondotto al dialetto parmigiano e alla bigoncia
- Cucina: menu contenuto e stagionale, con pasta fresca, tecniche contemporanee e ingredienti locali
- Vino: selezione con attenzione a piccole produzioni, bio e naturali
- Tripadvisor verificato durante la ricerca: 4,8/5 su 40 recensioni

## Piatti citati nella demo

I piatti mostrati NON sono presentati come menu corrente. Sono un archivio di esempi citati da fonti pubbliche:

- Tortelli di zucca in brodo di zucca
- Spaghetti, burro all’ostrica, shiso e levistico
- “Il Po” — storione, rane fritte, giardiniera ed erbe
- Caffè, zabaione e mandorle

La demo evita di inventare prezzi, menu attuale o disponibilità.

## Orari

Le fonti pubbliche 2026 risultano discordanti sugli orari. Per questo la demo non pubblica una tabella definitiva e invita a verificare direttamente con il locale / canale social prima della visita.

## Fonti principali

- Reporter Gourmet — “Soj Vino e Cucina: il locale senza brigata e senza camerieri a Parma” (05/05/2022)
  https://reportergourmet.com/it/news/916-soj-vino-e-cucina-il-locale-senza-brigata-e-senza-camerieri-a-parma
- Sala&Cucina — “Conoscete Sój a Parma?” (28/02/2022)
  https://www.salaecucina.it/it-it/conoscete-soj-a-parma.aspx
- Gambero Rosso — guida ristoranti Parma
  https://www.gamberorosso.it/ristoranti/dove-mangiare-parma-migliori-ristoranti-gambero-rosso/
- Tripadvisor — Soj - Vino e Cucina
  https://www.tripadvisor.it/Restaurant_Review-g187804-d23931054-Reviews-Soj_Vino_e_Cucina-Parma_Province_of_Parma_Emilia_Romagna.html
- Restaurant Guru — Soj, Parma (usato soprattutto per confronto dati aggiornati)
  https://restaurantguru.it/Soj-Vino-e-Cucina-Parma

## Distinctive decisions

La demo è intenzionalmente diversa dalle altre demo Punto Due Studio:

1. Hero costruito come diagramma spaziale, non come poster, foto full-screen o split hero.
2. Sistema visivo basato su sedute, banco e cucina a vista.
3. Nessun marquee dominante, nessuna gallery standard, nessuna sequenza di card generiche.
4. Palette mint / porcelain / ink / oxide, distinta dalle direzioni già usate per Gagarin, Cantina Canistracci e Sanafollia.
5. Sezione menu trattata come ledger / archivio, con esplicita distinzione tra piatti documentati e menu corrente.

## Funzionalità

- click-to-call
- Google Maps
- Facebook
- responsive navigation
- mobile action dock
- progressive reveal animations
- `prefers-reduced-motion`
- keyboard focus states
- Schema.org Restaurant
- SEO / Open Graph base
- custom 404
- Netlify configuration
- security headers

## Deploy Netlify

Sito statico senza build step.

- Base directory: vuota
- Build command: vuoto
- Publish directory: `.`
- Functions directory: vuota

`netlify.toml` è già incluso.

## Dopo il deploy

Quando esiste l’URL definitivo aggiungere:

- canonical URL
- `og:url`
- sitemap.xml
- sitemap declaration in robots.txt
- eventuale `og:image` definitivo

## Nota immagini

La demo non re-hosta fotografie da Tripadvisor, Restaurant Guru o articoli di terzi. Il visual principale è originale e costruito in HTML/CSS.
