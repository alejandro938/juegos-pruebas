// La Cuenta · textos en los 14 idiomas de la web. Lo que falte en un idioma sale en inglés.
const I18N={
es:{n:'Español',loc:'es-ES',prov:'Cuentas claras, amistades largas',title:'La Cuenta',tabEq:'A partes iguales',tabItems:'Por platos',tabDebts:'Deudas',tabSpin:'Ruleta',tabEat:'Dónde comer',
total:'Total de la cuenta',scan:'Foto',scanning:'Leyendo el tique…',scanOk:'Total leído: {x}. Compruébalo.',scanFail:'No he podido leer el total. Escríbelo a mano.',
vat:'IVA',vatIncl:'Incluido',vatHint:'En España los precios de la carta ya llevan el IVA. Súmalo solo si la cuenta viene sin él.',tip:'Propina',tipsGuide:'Propinas por país',oftenIncl:'A menudo ya va incluida en la cuenta',tipsNote:'Orientativo. En España la propina es voluntaria.',close:'Cerrar',
people:'Personas',round:'Redondear a euros enteros',extra:'Sobran {x} € de propina extra',payer:'¿Quién ha pagado? (para Bizum)',payerPh:'Nombre de quien paga',bizum:'Bizum o transferencia de {pp} a {n}',
names:'Personas de la mesa',namePh:'Nombre',add:'Añadir',needNames:'Añade primero a las personas de la mesa',noTip:'sin propina',noTipHint:'Marca «sin propina» a quien no deba pagarla (por ejemplo, los niños).',
items:'Qué se ha tomado',itemPh:'Plato o bebida',addItem:'Añadir a la cuenta',everyone:'Todos',noItems:'Añade cada plato y marca quién lo ha tomado. Lo compartido, para «Todos».',
newDebt:'Apuntar un gasto',paid:'Pagó',desc:'Concepto (cena, taxi…)',among:'Entre quién se reparte',save:'Guardar',balances:'Quién debe a quién',history:'Gastos apuntados',owes:'{a} debe a {b} {x}',settled:'Todo en paz, nadie debe nada',clear:'Borrar todo',confirmClear:'¿Borrar todos los gastos apuntados?',
spin:'¡Girar!',spinWho:'¿Quién paga el café?',pays:'¡Le toca a {n}!',
eatTitle:'Nuestros sitios favoritos',eatNote:'Elegidos por el equipo de Stela Mare.',map:'Mapa',tag_paella:'Paella',tag_fish:'Pescado',tag_tapas:'Tapas',tag_views:'Vistas al mar',tag_fine:'Cocina de autor',
sub:'Subtotal',tipTot:'Propina total',pay:'Total a pagar',per:'Por persona',share:'Compartir',copied:'Copiado',msg:'La cuenta: {t} entre {p} → {pp} por persona',live:'¿Te imaginas vivir aquí?',liveLink:'Ver casas'},

en:{n:'English',loc:'en-GB',prov:'Short reckonings make long friends',title:'The Bill',tabEq:'Split evenly',tabItems:'By dish',tabDebts:'Debts',tabSpin:'Roulette',tabEat:'Where to eat',
total:'Bill total',scan:'Photo',scanning:'Reading the receipt…',scanOk:'Total read: {x}. Please check it.',scanFail:'Couldn’t read the total. Please type it in.',
vat:'VAT',vatIncl:'Included',vatHint:'In Spain menu prices already include VAT. Only add it if the bill comes without it.',tip:'Tip',tipsGuide:'Tipping by country',oftenIncl:'Often already included in the bill',tipsNote:'A rough guide. In Spain tipping is optional.',close:'Close',
people:'People',round:'Round up to whole euros',extra:'{x} € left over as extra tip',payer:'Who paid? (for bank transfer)',payerPh:'Name of the payer',bizum:'Bizum or bank transfer of {pp} to {n}',
names:'People at the table',namePh:'Name',add:'Add',needNames:'First add the people at the table',noTip:'no tip',noTipHint:'Tick “no tip” for anyone who shouldn’t pay it (children, for example).',
items:'What was ordered',itemPh:'Dish or drink',addItem:'Add to the bill',everyone:'Everyone',noItems:'Add each dish and tick who had it. Shared things go to “Everyone”.',
newDebt:'Log an expense',paid:'Paid by',desc:'What for (dinner, taxi…)',among:'Split between',save:'Save',balances:'Who owes whom',history:'Logged expenses',owes:'{a} owes {b} {x}',settled:'All square, nobody owes anything',clear:'Clear all',confirmClear:'Delete all logged expenses?',
spin:'Spin!',spinWho:'Who pays for coffee?',pays:'It’s {n}’s turn!',
eatTitle:'Our favourite places',eatNote:'Chosen by the Stela Mare team.',map:'Map',tag_paella:'Paella',tag_fish:'Fish',tag_tapas:'Tapas',tag_views:'Sea views',tag_fine:'Fine dining',
sub:'Subtotal',tipTot:'Total tip',pay:'Total to pay',per:'Per person',share:'Share',copied:'Copied',msg:'The bill: {t} split {p} ways → {pp} each',live:'Could you picture living here?',liveLink:'See homes'},

de:{n:'Deutsch',loc:'de-DE',prov:'Genaue Rechnung, gute Freunde',title:'Die Rechnung',tabEq:'Gleich teilen',tabItems:'Nach Gericht',tabDebts:'Schulden',tabSpin:'Roulette',tabEat:'Wo essen',
total:'Rechnungsbetrag',scan:'Foto',scanning:'Beleg wird gelesen…',scanOk:'Gelesener Betrag: {x}. Bitte prüfen.',scanFail:'Betrag nicht lesbar. Bitte von Hand eingeben.',
vat:'MwSt.',vatIncl:'Inklusive',vatHint:'In Spanien enthalten die Preise auf der Karte bereits die MwSt. Nur hinzufügen, wenn sie auf der Rechnung fehlt.',tip:'Trinkgeld',tipsGuide:'Trinkgeld nach Land',oftenIncl:'Oft schon in der Rechnung enthalten',tipsNote:'Richtwerte. In Spanien ist Trinkgeld freiwillig.',close:'Schließen',
people:'Personen',round:'Auf volle Euro aufrunden',extra:'{x} € gehen als Extra-Trinkgeld',payer:'Wer hat bezahlt? (für Überweisung)',payerPh:'Name des Zahlers',bizum:'Bizum oder Überweisung von {pp} an {n}',
names:'Personen am Tisch',namePh:'Name',add:'Hinzufügen',needNames:'Zuerst die Personen am Tisch hinzufügen',noTip:'ohne Trinkgeld',noTipHint:'„Ohne Trinkgeld“ für alle markieren, die keins zahlen sollen (z. B. Kinder).',
items:'Was bestellt wurde',itemPh:'Gericht oder Getränk',addItem:'Zur Rechnung hinzufügen',everyone:'Alle',noItems:'Jedes Gericht eintragen und markieren, wer es hatte. Geteiltes auf „Alle“.',
newDebt:'Ausgabe eintragen',paid:'Bezahlt von',desc:'Wofür (Essen, Taxi…)',among:'Aufteilen auf',save:'Speichern',balances:'Wer schuldet wem',history:'Eingetragene Ausgaben',owes:'{a} schuldet {b} {x}',settled:'Alles ausgeglichen, niemand schuldet etwas',clear:'Alles löschen',confirmClear:'Alle eingetragenen Ausgaben löschen?',
spin:'Drehen!',spinWho:'Wer zahlt den Kaffee?',pays:'{n} ist dran!',
eatTitle:'Unsere Lieblingsorte',eatNote:'Ausgewählt vom Stela-Mare-Team.',map:'Karte',tag_paella:'Paella',tag_fish:'Fisch',tag_tapas:'Tapas',tag_views:'Meerblick',tag_fine:'Gehobene Küche',
sub:'Zwischensumme',tipTot:'Trinkgeld gesamt',pay:'Gesamtbetrag',per:'Pro Person',share:'Teilen',copied:'Kopiert',msg:'Die Rechnung: {t} für {p} Personen → {pp} pro Person',live:'Können Sie sich vorstellen, hier zu leben?',liveLink:'Häuser ansehen'},

fr:{n:'Français',loc:'fr-FR',prov:'Les bons comptes font les bons amis',title:"L'Addition",tabEq:'Parts égales',tabItems:'Par plat',tabDebts:'Dettes',tabSpin:'Roulette',tabEat:'Où manger',
total:"Montant de l'addition",scan:'Photo',scanning:'Lecture du ticket…',scanOk:'Total lu : {x}. Vérifiez-le.',scanFail:'Impossible de lire le total. Saisissez-le à la main.',
vat:'TVA',vatIncl:'Incluse',vatHint:"En Espagne, les prix de la carte incluent déjà la TVA. Ne l'ajoutez que si elle manque sur l'addition.",tip:'Pourboire',tipsGuide:'Pourboires par pays',oftenIncl:"Souvent déjà inclus dans l'addition",tipsNote:'À titre indicatif. En Espagne, le pourboire est facultatif.',close:'Fermer',
people:'Personnes',round:"Arrondir à l'euro supérieur",extra:'{x} € de pourboire en plus',payer:'Qui a payé ? (pour le virement)',payerPh:'Nom de la personne qui paie',bizum:'Bizum ou virement de {pp} à {n}',
names:'Personnes à table',namePh:'Prénom',add:'Ajouter',needNames:"Ajoutez d'abord les personnes à table",noTip:'sans pourboire',noTipHint:'Cochez « sans pourboire » pour ceux qui ne doivent pas le payer (les enfants, par exemple).',
items:'Ce qui a été pris',itemPh:'Plat ou boisson',addItem:"Ajouter à l'addition",everyone:'Tous',noItems:'Ajoutez chaque plat et cochez qui l’a pris. Ce qui est partagé va à « Tous ».',
newDebt:'Noter une dépense',paid:'Payé par',desc:'Pour quoi (dîner, taxi…)',among:'Répartir entre',save:'Enregistrer',balances:'Qui doit à qui',history:'Dépenses notées',owes:'{a} doit {x} à {b}',settled:'Tout est réglé, personne ne doit rien',clear:'Tout effacer',confirmClear:'Effacer toutes les dépenses notées ?',
spin:'Tourner !',spinWho:'Qui paie le café ?',pays:"C'est au tour de {n} !",
eatTitle:'Nos adresses préférées',eatNote:"Choisies par l'équipe Stela Mare.",map:'Carte',tag_paella:'Paella',tag_fish:'Poisson',tag_tapas:'Tapas',tag_views:'Vue sur la mer',tag_fine:'Cuisine gastronomique',
sub:'Sous-total',tipTot:'Pourboire total',pay:'Total à payer',per:'Par personne',share:'Partager',copied:'Copié',msg:"L'addition : {t} pour {p} → {pp} par personne",live:'Vous vous voyez vivre ici ?',liveLink:'Voir les maisons'},

it:{n:'Italiano',loc:'it-IT',prov:'Patti chiari, amicizia lunga',title:'Il Conto',tabEq:'In parti uguali',tabItems:'Per piatto',tabDebts:'Debiti',tabSpin:'Roulette',tabEat:'Dove mangiare',
total:'Totale del conto',scan:'Foto',scanning:'Lettura dello scontrino…',scanOk:'Totale letto: {x}. Controllalo.',scanFail:'Non sono riuscito a leggere il totale. Scrivilo a mano.',
vat:'IVA',vatIncl:'Inclusa',vatHint:"In Spagna i prezzi del menù includono già l'IVA. Aggiungila solo se manca nel conto.",tip:'Mancia',tipsGuide:'Mance per paese',oftenIncl:'Spesso già inclusa nel conto',tipsNote:'Indicativo. In Spagna la mancia è facoltativa.',close:'Chiudi',
people:'Persone',round:"Arrotonda all'euro",extra:'{x} € di mancia in più',payer:'Chi ha pagato? (per il bonifico)',payerPh:'Nome di chi paga',bizum:'Bizum o bonifico di {pp} a {n}',
names:'Persone al tavolo',namePh:'Nome',add:'Aggiungi',needNames:'Prima aggiungi le persone al tavolo',noTip:'senza mancia',noTipHint:'Segna «senza mancia» chi non deve pagarla (i bambini, per esempio).',
items:'Cosa è stato preso',itemPh:'Piatto o bevanda',addItem:'Aggiungi al conto',everyone:'Tutti',noItems:'Aggiungi ogni piatto e segna chi l’ha preso. Ciò che è in comune va a «Tutti».',
newDebt:'Segna una spesa',paid:'Ha pagato',desc:'Per cosa (cena, taxi…)',among:'Dividi tra',save:'Salva',balances:'Chi deve a chi',history:'Spese segnate',owes:'{a} deve {x} a {b}',settled:'Tutto a posto, nessuno deve niente',clear:'Cancella tutto',confirmClear:'Cancellare tutte le spese segnate?',
spin:'Gira!',spinWho:'Chi paga il caffè?',pays:'Tocca a {n}!',
eatTitle:'I nostri posti preferiti',eatNote:'Scelti dal team di Stela Mare.',map:'Mappa',tag_paella:'Paella',tag_fish:'Pesce',tag_tapas:'Tapas',tag_views:'Vista mare',tag_fine:"Cucina d'autore",
sub:'Subtotale',tipTot:'Mancia totale',pay:'Totale da pagare',per:'A persona',share:'Condividi',copied:'Copiato',msg:'Il conto: {t} diviso {p} → {pp} a testa',live:'Ti immagini a vivere qui?',liveLink:'Vedi le case'},

pt:{n:'Português',loc:'pt-PT',prov:'Contas certas, amigos certos',title:'A Conta',tabEq:'Partes iguais',tabItems:'Por prato',tabDebts:'Dívidas',tabSpin:'Roleta',tabEat:'Onde comer',
total:'Total da conta',scan:'Foto',scanning:'A ler o talão…',scanOk:'Total lido: {x}. Confirme.',scanFail:'Não consegui ler o total. Escreva-o à mão.',
vat:'IVA',vatIncl:'Incluído',vatHint:'Em Espanha os preços da ementa já incluem IVA. Some-o só se a conta vier sem ele.',tip:'Gorjeta',tipsGuide:'Gorjetas por país',oftenIncl:'Muitas vezes já incluída na conta',tipsNote:'Indicativo. Em Espanha a gorjeta é voluntária.',close:'Fechar',
people:'Pessoas',round:'Arredondar ao euro',extra:'Sobram {x} € de gorjeta extra',payer:'Quem pagou? (para transferência)',payerPh:'Nome de quem paga',bizum:'Bizum ou transferência de {pp} para {n}',
names:'Pessoas à mesa',namePh:'Nome',add:'Adicionar',needNames:'Primeiro adicione as pessoas à mesa',noTip:'sem gorjeta',noTipHint:'Marque «sem gorjeta» para quem não a deve pagar (as crianças, por exemplo).',
items:'O que se consumiu',itemPh:'Prato ou bebida',addItem:'Adicionar à conta',everyone:'Todos',noItems:'Adicione cada prato e marque quem o comeu. O partilhado vai para «Todos».',
newDebt:'Registar uma despesa',paid:'Pagou',desc:'Para quê (jantar, táxi…)',among:'Dividir entre',save:'Guardar',balances:'Quem deve a quem',history:'Despesas registadas',owes:'{a} deve {x} a {b}',settled:'Tudo acertado, ninguém deve nada',clear:'Apagar tudo',confirmClear:'Apagar todas as despesas registadas?',
spin:'Girar!',spinWho:'Quem paga o café?',pays:'Calhou a {n}!',
eatTitle:'Os nossos sítios favoritos',eatNote:'Escolhidos pela equipa Stela Mare.',map:'Mapa',tag_paella:'Paella',tag_fish:'Peixe',tag_tapas:'Petiscos',tag_views:'Vista mar',tag_fine:'Cozinha de autor',
sub:'Subtotal',tipTot:'Gorjeta total',pay:'Total a pagar',per:'Por pessoa',share:'Partilhar',copied:'Copiado',msg:'A conta: {t} a dividir por {p} → {pp} por pessoa',live:'Imagina-se a viver aqui?',liveLink:'Ver casas'},

nl:{n:'Nederlands',loc:'nl-NL',prov:'Effen rekeningen maken goede vrienden',title:'De Rekening',tabEq:'Gelijk delen',tabItems:'Per gerecht',tabDebts:'Schulden',tabSpin:'Rad',tabEat:'Waar eten',
total:'Totaal van de rekening',scan:'Foto',scanning:'Bon wordt gelezen…',scanOk:'Gelezen totaal: {x}. Controleer het.',scanFail:'Totaal niet leesbaar. Typ het zelf in.',
vat:'Btw',vatIncl:'Inbegrepen',vatHint:'In Spanje is de btw al in de menuprijzen inbegrepen. Tel hem alleen op als hij op de rekening ontbreekt.',tip:'Fooi',tipsGuide:'Fooi per land',oftenIncl:'Vaak al inbegrepen in de rekening',tipsNote:'Richtlijn. In Spanje is fooi vrijwillig.',close:'Sluiten',
people:'Personen',round:'Afronden op hele euro’s',extra:'{x} € extra fooi',payer:'Wie heeft betaald? (voor overmaken)',payerPh:'Naam van de betaler',bizum:'Bizum of overboeking van {pp} aan {n}',
names:'Personen aan tafel',namePh:'Naam',add:'Toevoegen',needNames:'Voeg eerst de personen aan tafel toe',noTip:'geen fooi',noTipHint:'Vink „geen fooi” aan voor wie hem niet hoeft te betalen (bijvoorbeeld kinderen).',
items:'Wat er besteld is',itemPh:'Gerecht of drankje',addItem:'Aan de rekening toevoegen',everyone:'Iedereen',noItems:'Voeg elk gerecht toe en vink aan wie het had. Gedeelde dingen gaan naar „Iedereen”.',
newDebt:'Uitgave noteren',paid:'Betaald door',desc:'Waarvoor (diner, taxi…)',among:'Verdelen over',save:'Opslaan',balances:'Wie is wie iets schuldig',history:'Genoteerde uitgaven',owes:'{a} is {b} {x} schuldig',settled:'Alles verrekend, niemand is iets schuldig',clear:'Alles wissen',confirmClear:'Alle genoteerde uitgaven wissen?',
spin:'Draaien!',spinWho:'Wie betaalt de koffie?',pays:'{n} is aan de beurt!',
eatTitle:'Onze favoriete plekken',eatNote:'Gekozen door het team van Stela Mare.',map:'Kaart',tag_paella:'Paella',tag_fish:'Vis',tag_tapas:'Tapas',tag_views:'Zeezicht',tag_fine:'Fijne keuken',
sub:'Subtotaal',tipTot:'Totale fooi',pay:'Totaal te betalen',per:'Per persoon',share:'Delen',copied:'Gekopieerd',msg:'De rekening: {t} gedeeld door {p} → {pp} per persoon',live:'Zie je jezelf hier wonen?',liveLink:'Bekijk woningen'},

sv:{n:'Svenska',loc:'sv-SE',prov:'Klara papper, goda vänner',title:'Notan',tabEq:'Dela lika',tabItems:'Per rätt',tabDebts:'Skulder',tabSpin:'Hjulet',tabEat:'Var äta',
total:'Notans summa',scan:'Foto',scanning:'Läser kvittot…',scanOk:'Läst summa: {x}. Kontrollera den.',scanFail:'Kunde inte läsa summan. Skriv in den själv.',
vat:'Moms',vatIncl:'Ingår',vatHint:'I Spanien ingår momsen redan i menypriserna. Lägg bara till den om den saknas på notan.',tip:'Dricks',tipsGuide:'Dricks per land',oftenIncl:'Ingår ofta redan i notan',tipsNote:'Ungefärligt. I Spanien är dricks frivilligt.',close:'Stäng',
people:'Personer',round:'Avrunda till hela euro',extra:'{x} € blir extra dricks',payer:'Vem betalade? (för överföring)',payerPh:'Namn på den som betalar',bizum:'Bizum eller överföring på {pp} till {n}',
names:'Personer vid bordet',namePh:'Namn',add:'Lägg till',needNames:'Lägg först till personerna vid bordet',noTip:'ingen dricks',noTipHint:'Markera ”ingen dricks” för den som inte ska betala den (till exempel barn).',
items:'Vad som beställdes',itemPh:'Rätt eller dryck',addItem:'Lägg till på notan',everyone:'Alla',noItems:'Lägg till varje rätt och markera vem som åt den. Delat går till ”Alla”.',
newDebt:'Notera en utgift',paid:'Betalades av',desc:'För vad (middag, taxi…)',among:'Dela mellan',save:'Spara',balances:'Vem är skyldig vem',history:'Noterade utgifter',owes:'{a} är skyldig {b} {x}',settled:'Allt är kvitt, ingen är skyldig något',clear:'Radera allt',confirmClear:'Radera alla noterade utgifter?',
spin:'Snurra!',spinWho:'Vem bjuder på kaffet?',pays:'{n}s tur!',
eatTitle:'Våra favoritställen',eatNote:'Utvalda av Stela Mare-teamet.',map:'Karta',tag_paella:'Paella',tag_fish:'Fisk',tag_tapas:'Tapas',tag_views:'Havsutsikt',tag_fine:'Finare kök',
sub:'Delsumma',tipTot:'Total dricks',pay:'Att betala',per:'Per person',share:'Dela',copied:'Kopierat',msg:'Notan: {t} delat på {p} → {pp} per person',live:'Kan du tänka dig att bo här?',liveLink:'Se bostäder'},

no:{n:'Norsk',loc:'nb-NO',prov:'Klare avtaler, gode venner',title:'Regningen',tabEq:'Del likt',tabItems:'Per rett',tabDebts:'Gjeld',tabSpin:'Hjulet',tabEat:'Hvor spise',
total:'Regningens sum',scan:'Foto',scanning:'Leser kvitteringen…',scanOk:'Lest sum: {x}. Sjekk den.',scanFail:'Klarte ikke å lese summen. Skriv den inn selv.',
vat:'MVA',vatIncl:'Inkludert',vatHint:'I Spania er MVA allerede inkludert i menyprisene. Legg den bare til hvis den mangler på regningen.',tip:'Tips',tipsGuide:'Tips per land',oftenIncl:'Ofte allerede inkludert i regningen',tipsNote:'Veiledende. I Spania er tips frivillig.',close:'Lukk',
people:'Personer',round:'Rund av til hele euro',extra:'{x} € blir ekstra tips',payer:'Hvem betalte? (for overføring)',payerPh:'Navn på den som betaler',bizum:'Bizum eller overføring på {pp} til {n}',
names:'Personer ved bordet',namePh:'Navn',add:'Legg til',needNames:'Legg først til personene ved bordet',noTip:'uten tips',noTipHint:'Merk «uten tips» for dem som ikke skal betale det (for eksempel barn).',
items:'Hva som ble bestilt',itemPh:'Rett eller drikke',addItem:'Legg til på regningen',everyone:'Alle',noItems:'Legg til hver rett og merk hvem som spiste den. Delte ting går til «Alle».',
newDebt:'Før opp en utgift',paid:'Betalt av',desc:'Hva for (middag, taxi…)',among:'Del mellom',save:'Lagre',balances:'Hvem skylder hvem',history:'Førte utgifter',owes:'{a} skylder {b} {x}',settled:'Alt er i orden, ingen skylder noe',clear:'Slett alt',confirmClear:'Slette alle førte utgifter?',
spin:'Snurr!',spinWho:'Hvem spanderer kaffen?',pays:'Det er {n} sin tur!',
eatTitle:'Våre favorittsteder',eatNote:'Valgt av Stela Mare-teamet.',map:'Kart',tag_paella:'Paella',tag_fish:'Fisk',tag_tapas:'Tapas',tag_views:'Havutsikt',tag_fine:'Fine dining',
sub:'Delsum',tipTot:'Total tips',pay:'Å betale',per:'Per person',share:'Del',copied:'Kopiert',msg:'Regningen: {t} delt på {p} → {pp} per person',live:'Kan du se for deg å bo her?',liveLink:'Se boliger'},

da:{n:'Dansk',loc:'da-DK',prov:'Klare aftaler, gode venner',title:'Regningen',tabEq:'Del lige',tabItems:'Pr. ret',tabDebts:'Gæld',tabSpin:'Hjulet',tabEat:'Hvor spise',
total:'Regningens beløb',scan:'Foto',scanning:'Læser kvitteringen…',scanOk:'Læst beløb: {x}. Tjek det.',scanFail:'Kunne ikke læse beløbet. Skriv det selv.',
vat:'Moms',vatIncl:'Inkluderet',vatHint:'I Spanien er momsen allerede med i menupriserne. Læg den kun til, hvis den mangler på regningen.',tip:'Drikkepenge',tipsGuide:'Drikkepenge pr. land',oftenIncl:'Ofte allerede med i regningen',tipsNote:'Vejledende. I Spanien er drikkepenge frivillige.',close:'Luk',
people:'Personer',round:'Rund op til hele euro',extra:'{x} € bliver ekstra drikkepenge',payer:'Hvem betalte? (til overførsel)',payerPh:'Navn på den, der betaler',bizum:'Bizum eller overførsel på {pp} til {n}',
names:'Personer ved bordet',namePh:'Navn',add:'Tilføj',needNames:'Tilføj først personerne ved bordet',noTip:'uden drikkepenge',noTipHint:'Markér «uden drikkepenge» for dem, der ikke skal betale (for eksempel børn).',
items:'Hvad der blev bestilt',itemPh:'Ret eller drik',addItem:'Føj til regningen',everyone:'Alle',noItems:'Tilføj hver ret og markér, hvem der fik den. Fælles ting går til «Alle».',
newDebt:'Skriv en udgift op',paid:'Betalt af',desc:'Til hvad (middag, taxa…)',among:'Del mellem',save:'Gem',balances:'Hvem skylder hvem',history:'Noterede udgifter',owes:'{a} skylder {b} {x}',settled:'Alt er lige, ingen skylder noget',clear:'Slet alt',confirmClear:'Slette alle noterede udgifter?',
spin:'Drej!',spinWho:'Hvem giver kaffen?',pays:'Det er {n}s tur!',
eatTitle:'Vores yndlingssteder',eatNote:'Udvalgt af Stela Mare-holdet.',map:'Kort',tag_paella:'Paella',tag_fish:'Fisk',tag_tapas:'Tapas',tag_views:'Havudsigt',tag_fine:'Gourmet',
sub:'Subtotal',tipTot:'Drikkepenge i alt',pay:'At betale',per:'Pr. person',share:'Del',copied:'Kopieret',msg:'Regningen: {t} delt på {p} → {pp} pr. person',live:'Kan du se dig selv bo her?',liveLink:'Se boliger'},

fi:{n:'Suomi',loc:'fi-FI',prov:'Selvät sävelet, hyvät ystävät',title:'Lasku',tabEq:'Tasan',tabItems:'Annoksittain',tabDebts:'Velat',tabSpin:'Arpa',tabEat:'Missä syödä',
total:'Laskun summa',scan:'Kuva',scanning:'Luetaan kuittia…',scanOk:'Luettu summa: {x}. Tarkista se.',scanFail:'Summaa ei voitu lukea. Kirjoita se itse.',
vat:'ALV',vatIncl:'Sisältyy',vatHint:'Espanjassa ruokalistan hinnat sisältävät jo ALV:n. Lisää se vain, jos se puuttuu laskusta.',tip:'Tippi',tipsGuide:'Tipit maittain',oftenIncl:'Sisältyy usein jo laskuun',tipsNote:'Suuntaa antava. Espanjassa tippi on vapaaehtoinen.',close:'Sulje',
people:'Henkilöt',round:'Pyöristä täysiin euroihin',extra:'{x} € jää lisätipiksi',payer:'Kuka maksoi? (tilisiirtoa varten)',payerPh:'Maksajan nimi',bizum:'Bizum tai tilisiirto {pp} henkilölle {n}',
names:'Henkilöt pöydässä',namePh:'Nimi',add:'Lisää',needNames:'Lisää ensin pöydän henkilöt',noTip:'ei tippiä',noTipHint:'Merkitse ”ei tippiä” niille, joiden ei tarvitse maksaa sitä (esimerkiksi lapset).',
items:'Mitä tilattiin',itemPh:'Annos tai juoma',addItem:'Lisää laskuun',everyone:'Kaikki',noItems:'Lisää jokainen annos ja merkitse, kuka sen söi. Yhteiset kohtaan ”Kaikki”.',
newDebt:'Kirjaa meno',paid:'Maksaja',desc:'Mihin (illallinen, taksi…)',among:'Jaetaan',save:'Tallenna',balances:'Kuka on velkaa kenelle',history:'Kirjatut menot',owes:'{a} on velkaa {b}lle {x}',settled:'Kaikki tasan, kukaan ei ole velkaa',clear:'Poista kaikki',confirmClear:'Poistetaanko kaikki kirjatut menot?',
spin:'Pyöräytä!',spinWho:'Kuka tarjoaa kahvit?',pays:'Vuorossa: {n}!',
eatTitle:'Suosikkipaikkamme',eatNote:'Stela Mare -tiimin valitsemat.',map:'Kartta',tag_paella:'Paella',tag_fish:'Kala',tag_tapas:'Tapakset',tag_views:'Merinäköala',tag_fine:'Gourmet',
sub:'Välisumma',tipTot:'Tippi yhteensä',pay:'Maksettavaa',per:'Per henkilö',share:'Jaa',copied:'Kopioitu',msg:'Lasku: {t} jaettuna {p} hengelle → {pp} per henkilö',live:'Voisitko kuvitella asuvasi täällä?',liveLink:'Katso asunnot'},

pl:{n:'Polski',loc:'pl-PL',prov:'Czyste rachunki, długa przyjaźń',title:'Rachunek',tabEq:'Po równo',tabItems:'Za dania',tabDebts:'Długi',tabSpin:'Ruletka',tabEat:'Gdzie zjeść',
total:'Kwota rachunku',scan:'Zdjęcie',scanning:'Czytam paragon…',scanOk:'Odczytana kwota: {x}. Sprawdź ją.',scanFail:'Nie udało się odczytać kwoty. Wpisz ją ręcznie.',
vat:'VAT',vatIncl:'Wliczony',vatHint:'W Hiszpanii ceny w karcie zawierają już VAT. Dodaj go tylko, jeśli brakuje go na rachunku.',tip:'Napiwek',tipsGuide:'Napiwki w różnych krajach',oftenIncl:'Często już wliczony w rachunek',tipsNote:'Orientacyjnie. W Hiszpanii napiwek jest dobrowolny.',close:'Zamknij',
people:'Osoby',round:'Zaokrąglij do pełnych euro',extra:'{x} € to dodatkowy napiwek',payer:'Kto zapłacił? (do przelewu)',payerPh:'Imię płacącego',bizum:'Bizum lub przelew {pp} dla {n}',
names:'Osoby przy stole',namePh:'Imię',add:'Dodaj',needNames:'Najpierw dodaj osoby przy stole',noTip:'bez napiwku',noTipHint:'Zaznacz „bez napiwku” przy osobach, które nie mają go płacić (np. dzieci).',
items:'Co zamówiono',itemPh:'Danie lub napój',addItem:'Dodaj do rachunku',everyone:'Wszyscy',noItems:'Dodaj każde danie i zaznacz, kto je jadł. Wspólne dla „Wszyscy”.',
newDebt:'Zapisz wydatek',paid:'Zapłacił(a)',desc:'Za co (kolacja, taksówka…)',among:'Podziel między',save:'Zapisz',balances:'Kto komu ile winien',history:'Zapisane wydatki',owes:'{a} jest winien {b} {x}',settled:'Wszystko rozliczone, nikt nic nie jest winien',clear:'Usuń wszystko',confirmClear:'Usunąć wszystkie zapisane wydatki?',
spin:'Losuj!',spinWho:'Kto stawia kawę?',pays:'Wypadło na: {n}!',
eatTitle:'Nasze ulubione miejsca',eatNote:'Wybrane przez zespół Stela Mare.',map:'Mapa',tag_paella:'Paella',tag_fish:'Ryby',tag_tapas:'Tapas',tag_views:'Widok na morze',tag_fine:'Kuchnia autorska',
sub:'Suma częściowa',tipTot:'Napiwek łącznie',pay:'Do zapłaty',per:'Na osobę',share:'Udostępnij',copied:'Skopiowano',msg:'Rachunek: {t} na {p} osoby → {pp} na osobę',live:'Wyobrażasz sobie życie tutaj?',liveLink:'Zobacz domy'},

cs:{n:'Čeština',loc:'cs-CZ',prov:'Čistý účet, dlouhé přátelství',title:'Účet',tabEq:'Rovným dílem',tabItems:'Podle jídel',tabDebts:'Dluhy',tabSpin:'Ruleta',tabEat:'Kde jíst',
total:'Částka účtu',scan:'Foto',scanning:'Čtu účtenku…',scanOk:'Přečtená částka: {x}. Zkontrolujte ji.',scanFail:'Částku se nepodařilo přečíst. Zadejte ji ručně.',
vat:'DPH',vatIncl:'V ceně',vatHint:'Ve Španělsku ceny v jídelním lístku už obsahují DPH. Přičtěte ji, jen pokud na účtu chybí.',tip:'Spropitné',tipsGuide:'Spropitné podle zemí',oftenIncl:'Často už je v účtu',tipsNote:'Orientačně. Ve Španělsku je spropitné dobrovolné.',close:'Zavřít',
people:'Osoby',round:'Zaokrouhlit na celá eura',extra:'{x} € navíc jako spropitné',payer:'Kdo platil? (pro převod)',payerPh:'Jméno plátce',bizum:'Bizum nebo převod {pp} pro {n}',
names:'Lidé u stolu',namePh:'Jméno',add:'Přidat',needNames:'Nejdřív přidejte lidi u stolu',noTip:'bez spropitného',noTipHint:'Označte „bez spropitného“ u těch, kdo ho nemají platit (třeba děti).',
items:'Co se objednalo',itemPh:'Jídlo nebo pití',addItem:'Přidat na účet',everyone:'Všichni',noItems:'Přidejte každé jídlo a označte, kdo ho měl. Společné patří „Všem“.',
newDebt:'Zapsat výdaj',paid:'Platil(a)',desc:'Za co (večeře, taxi…)',among:'Rozdělit mezi',save:'Uložit',balances:'Kdo komu dluží',history:'Zapsané výdaje',owes:'{a} dluží {b} {x}',settled:'Vše vyrovnáno, nikdo nic nedluží',clear:'Smazat vše',confirmClear:'Smazat všechny zapsané výdaje?',
spin:'Točit!',spinWho:'Kdo platí kávu?',pays:'Na řadě je {n}!',
eatTitle:'Naše oblíbená místa',eatNote:'Vybral tým Stela Mare.',map:'Mapa',tag_paella:'Paella',tag_fish:'Ryby',tag_tapas:'Tapas',tag_views:'Výhled na moře',tag_fine:'Autorská kuchyně',
sub:'Mezisoučet',tipTot:'Spropitné celkem',pay:'K úhradě',per:'Na osobu',share:'Sdílet',copied:'Zkopírováno',msg:'Účet: {t} pro {p} osob → {pp} na osobu',live:'Dokážete si představit, že tu bydlíte?',liveLink:'Prohlédnout domy'},

ro:{n:'Română',loc:'ro-RO',prov:'Socoteala deasă face prietenia lungă',title:'Nota',tabEq:'În părți egale',tabItems:'Pe feluri',tabDebts:'Datorii',tabSpin:'Ruleta',tabEat:'Unde mâncăm',
total:'Totalul notei',scan:'Poză',scanning:'Citesc bonul…',scanOk:'Total citit: {x}. Verificați-l.',scanFail:'Nu am putut citi totalul. Scrieți-l de mână.',
vat:'TVA',vatIncl:'Inclus',vatHint:'În Spania prețurile din meniu includ deja TVA. Adăugați-l doar dacă lipsește de pe notă.',tip:'Bacșiș',tipsGuide:'Bacșișul pe țări',oftenIncl:'Adesea deja inclus în notă',tipsNote:'Orientativ. În Spania bacșișul este opțional.',close:'Închide',
people:'Persoane',round:'Rotunjește la euro întregi',extra:'{x} € rămân bacșiș suplimentar',payer:'Cine a plătit? (pentru transfer)',payerPh:'Numele celui care plătește',bizum:'Bizum sau transfer de {pp} către {n}',
names:'Persoane la masă',namePh:'Nume',add:'Adaugă',needNames:'Adăugați mai întâi persoanele de la masă',noTip:'fără bacșiș',noTipHint:'Bifați „fără bacșiș” pentru cine nu trebuie să-l plătească (de exemplu, copiii).',
items:'Ce s-a comandat',itemPh:'Fel de mâncare sau băutură',addItem:'Adaugă la notă',everyone:'Toți',noItems:'Adăugați fiecare fel și bifați cine l-a luat. Ce e comun merge la „Toți”.',
newDebt:'Notează o cheltuială',paid:'A plătit',desc:'Pentru ce (cină, taxi…)',among:'Împarte între',save:'Salvează',balances:'Cine cui datorează',history:'Cheltuieli notate',owes:'{a} îi datorează lui {b} {x}',settled:'Totul e achitat, nimeni nu datorează nimic',clear:'Șterge tot',confirmClear:'Ștergeți toate cheltuielile notate?',
spin:'Învârte!',spinWho:'Cine plătește cafeaua?',pays:'Îi vine rândul lui {n}!',
eatTitle:'Locurile noastre preferate',eatNote:'Alese de echipa Stela Mare.',map:'Hartă',tag_paella:'Paella',tag_fish:'Pește',tag_tapas:'Tapas',tag_views:'Vedere la mare',tag_fine:'Bucătărie de autor',
sub:'Subtotal',tipTot:'Bacșiș total',pay:'Total de plată',per:'De persoană',share:'Distribuie',copied:'Copiat',msg:'Nota: {t} împărțit la {p} → {pp} de persoană',live:'V-ați imagina să locuiți aici?',liveLink:'Vezi casele'}
};

// Textos añadidos el 28-sep: lo de cada comensal, añadir sitios y tipos de sitio nuevos.
// Orden: perDiner, shared, addPlace, placeName, placeZone, mine, breakfast, churros, ice, varied, dinner
const EXTRA={
es:['Lo de cada comensal','Compartido entre varios','Añadir un sitio','Nombre del sitio','Zona o calle (opcional)','añadido por ti','Desayunos','Churros','Helados','Comida variada','Cenas'],
en:['What each person had','Shared between several','Add a place','Name of the place','Area or street (optional)','added by you','Breakfast','Churros','Ice cream','Varied menu','Dinner'],
de:['Was jeder hatte','Von mehreren geteilt','Ort hinzufügen','Name des Lokals','Gegend oder Straße (optional)','von Ihnen hinzugefügt','Frühstück','Churros','Eis','Gemischte Küche','Abendessen'],
fr:['Ce que chacun a pris','Partagé entre plusieurs','Ajouter une adresse','Nom de l’adresse','Quartier ou rue (facultatif)','ajouté par vous','Petit-déjeuner','Churros','Glaces','Cuisine variée','Dîner'],
it:['Cosa ha preso ognuno','Condiviso tra più persone','Aggiungi un locale','Nome del locale','Zona o via (facoltativo)','aggiunto da te','Colazione','Churros','Gelati','Cucina varia','Cena'],
pt:['O que cada um consumiu','Partilhado entre vários','Adicionar um sítio','Nome do sítio','Zona ou rua (opcional)','adicionado por si','Pequeno-almoço','Churros','Gelados','Comida variada','Jantar'],
nl:['Wat ieder had','Gedeeld door meerderen','Plek toevoegen','Naam van de plek','Buurt of straat (optioneel)','door jou toegevoegd','Ontbijt','Churros','IJs','Gevarieerde keuken','Diner'],
sv:['Vad var och en åt','Delat mellan flera','Lägg till ett ställe','Ställets namn','Område eller gata (valfritt)','tillagt av dig','Frukost','Churros','Glass','Blandad meny','Middag'],
no:['Hva hver enkelt hadde','Delt mellom flere','Legg til et sted','Navn på stedet','Område eller gate (valgfritt)','lagt til av deg','Frokost','Churros','Iskrem','Variert meny','Middag'],
da:['Hvad hver især fik','Delt mellem flere','Tilføj et sted','Stedets navn','Område eller gade (valgfrit)','tilføjet af dig','Morgenmad','Churros','Is','Varieret menu','Aftensmad'],
fi:['Mitä kukin söi','Jaettu usean kesken','Lisää paikka','Paikan nimi','Alue tai katu (valinnainen)','sinun lisäämäsi','Aamiainen','Churrot','Jäätelö','Monipuolinen ruoka','Illallinen'],
pl:['Co zamówił każdy','Wspólne dla kilku osób','Dodaj miejsce','Nazwa miejsca','Okolica lub ulica (opcjonalnie)','dodane przez ciebie','Śniadania','Churros','Lody','Różnorodna kuchnia','Kolacje'],
cs:['Co měl kdo','Sdílené více lidmi','Přidat místo','Název místa','Oblast nebo ulice (nepovinné)','přidáno vámi','Snídaně','Churros','Zmrzlina','Pestrá kuchyně','Večeře'],
ro:['Ce a luat fiecare','Împărțit între mai mulți','Adaugă un loc','Numele locului','Zonă sau stradă (opțional)','adăugat de dvs.','Mic dejun','Churros','Înghețată','Meniu variat','Cină']
};
const EXTRA_KEYS=['perDiner','shared','addPlace','placeName','placeZone','mine','tag_breakfast','tag_churros','tag_ice','tag_varied','tag_dinner'];
for(const l in EXTRA) EXTRA_KEYS.forEach((k,i)=>I18N[l][k]=EXTRA[l][i]);

// 28-sep (2): carnes, fusión, enlace de Google Maps al añadir sitio y el dado.
const EXTRA2_KEYS=['tag_meat','tag_fusion','placeUrl','badMap','dice','dieRes'];
const EXTRA2={
es:['Carnes','Cocina fusión','Enlace de Google Maps (opcional)','Ese enlace no es de Google Maps','Tirar el dado','Ha salido un {n}'],
en:['Meat','Fusion cuisine','Google Maps link (optional)','That isn’t a Google Maps link','Roll the dice','You rolled a {n}'],
de:['Fleisch','Fusionsküche','Google-Maps-Link (optional)','Das ist kein Google-Maps-Link','Würfeln','Gewürfelt: {n}'],
fr:['Viandes','Cuisine fusion','Lien Google Maps (facultatif)','Ce lien n’est pas un lien Google Maps','Lancer le dé','Résultat : {n}'],
it:['Carne','Cucina fusion','Link di Google Maps (facoltativo)','Questo non è un link di Google Maps','Tira il dado','È uscito {n}'],
pt:['Carnes','Cozinha de fusão','Link do Google Maps (opcional)','Esse link não é do Google Maps','Lançar o dado','Saiu {n}'],
nl:['Vlees','Fusionkeuken','Google Maps-link (optioneel)','Dat is geen Google Maps-link','Dobbelen','Je gooide {n}'],
sv:['Kött','Fusionskök','Google Maps-länk (valfritt)','Det är ingen Google Maps-länk','Slå tärningen','Det blev {n}'],
no:['Kjøtt','Fusjonskjøkken','Google Maps-lenke (valgfritt)','Det er ikke en Google Maps-lenke','Kast terningen','Det ble {n}'],
da:['Kød','Fusionskøkken','Google Maps-link (valgfrit)','Det er ikke et Google Maps-link','Slå med terningen','Det blev {n}'],
fi:['Liha','Fuusiokeittiö','Google Maps -linkki (valinnainen)','Tämä ei ole Google Maps -linkki','Heitä noppaa','Tuli {n}'],
pl:['Mięsa','Kuchnia fusion','Link do Map Google (opcjonalnie)','To nie jest link do Map Google','Rzuć kostką','Wypadło {n}'],
cs:['Maso','Fusion kuchyně','Odkaz na Mapy Google (nepovinné)','To není odkaz na Mapy Google','Hodit kostkou','Padlo {n}'],
ro:['Carne','Bucătărie fusion','Link Google Maps (opțional)','Acesta nu este un link Google Maps','Aruncă zarul','A ieșit {n}']
};
for(const l in EXTRA2) EXTRA2_KEYS.forEach((k,i)=>I18N[l][k]=EXTRA2[l][i]);

// 28-sep (3): la cuenta se guarda sola; botón para empezar otra.
const EXTRA3={
es:['Nueva cuenta','¿Empezar una cuenta nueva? Se borra la actual (las personas de la mesa y las deudas se quedan).'],
en:['New bill','Start a new bill? The current one will be cleared (people and debts are kept).'],
de:['Neue Rechnung','Neue Rechnung beginnen? Die aktuelle wird gelöscht (Personen und Schulden bleiben).'],
fr:['Nouvelle addition','Commencer une nouvelle addition ? L’actuelle sera effacée (les personnes et les dettes restent).'],
it:['Nuovo conto','Iniziare un nuovo conto? Quello attuale verrà cancellato (persone e debiti restano).'],
pt:['Nova conta','Começar uma conta nova? A atual será apagada (as pessoas e as dívidas mantêm-se).'],
nl:['Nieuwe rekening','Een nieuwe rekening beginnen? De huidige wordt gewist (personen en schulden blijven).'],
sv:['Ny nota','Börja en ny nota? Den nuvarande raderas (personer och skulder finns kvar).'],
no:['Ny regning','Starte en ny regning? Den nåværende slettes (personer og gjeld beholdes).'],
da:['Ny regning','Start en ny regning? Den nuværende slettes (personer og gæld bevares).'],
fi:['Uusi lasku','Aloitetaanko uusi lasku? Nykyinen poistetaan (henkilöt ja velat säilyvät).'],
pl:['Nowy rachunek','Zacząć nowy rachunek? Obecny zostanie usunięty (osoby i długi zostają).'],
cs:['Nový účet','Začít nový účet? Současný se smaže (lidé a dluhy zůstanou).'],
ro:['Notă nouă','Începeți o notă nouă? Cea actuală se șterge (persoanele și datoriile rămân).']
};
for(const l in EXTRA3){I18N[l].newBill=EXTRA3[l][0];I18N[l].confirmNew=EXTRA3[l][1];}

// 28-sep (4): cada uno tira el dado y queda apuntado.
const EXTRA4_KEYS=['diceTurn','diceDone','diceLog','diceNew','diceHigh','diceLow','diceRoll'];
const EXTRA4={
es:['Le toca tirar a {n}','Ya han tirado todos','Tiradas','Nueva ronda','el más alto','el más bajo','Tirada {k}'],
en:['{n}’s turn to roll','Everyone has rolled','Rolls','New round','highest','lowest','Roll {k}'],
de:['{n} ist mit Würfeln dran','Alle haben gewürfelt','Würfe','Neue Runde','höchster','niedrigster','Wurf {k}'],
fr:['À {n} de lancer','Tout le monde a lancé','Lancers','Nouvelle manche','le plus haut','le plus bas','Lancer {k}'],
it:['Tocca a {n} tirare','Hanno tirato tutti','Tiri','Nuovo giro','il più alto','il più basso','Tiro {k}'],
pt:['É a vez de {n} lançar','Já lançaram todos','Lançamentos','Nova ronda','o mais alto','o mais baixo','Lançamento {k}'],
nl:['{n} mag gooien','Iedereen heeft gegooid','Worpen','Nieuwe ronde','hoogste','laagste','Worp {k}'],
sv:['{n}s tur att slå','Alla har slagit','Slag','Ny omgång','högst','lägst','Slag {k}'],
no:['{n} sin tur til å kaste','Alle har kastet','Kast','Ny runde','høyest','lavest','Kast {k}'],
da:['{n}s tur til at slå','Alle har slået','Slag','Ny runde','højest','lavest','Slag {k}'],
fi:['Heittovuorossa: {n}','Kaikki ovat heittäneet','Heitot','Uusi kierros','suurin','pienin','Heitto {k}'],
pl:['Rzuca: {n}','Wszyscy już rzucili','Rzuty','Nowa runda','najwyższy','najniższy','Rzut {k}'],
cs:['Hází: {n}','Všichni už hodili','Hody','Nové kolo','nejvyšší','nejnižší','Hod {k}'],
ro:['Aruncă: {n}','Au aruncat toți','Aruncări','Rundă nouă','cel mai mare','cel mai mic','Aruncarea {k}']
};
for(const l in EXTRA4) EXTRA4_KEYS.forEach((k,i)=>I18N[l][k]=EXTRA4[l][i]);
// «Tira Paula»: corto y directo (pedido de Alejandro)
Object.entries({es:'Tira {n}',en:'{n} rolls',de:'{n} würfelt',fr:'{n} lance',it:'Tira {n}',pt:'Lança {n}',nl:'{n} gooit',sv:'{n} slår',no:'{n} kaster',da:'{n} slår',fi:'{n} heittää',pl:'Rzuca {n}',cs:'Hází {n}',ro:'Aruncă {n}'}).forEach(([l,v])=>I18N[l].diceTurn=v);
