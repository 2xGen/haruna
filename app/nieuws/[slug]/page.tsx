import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleAuthorDisclaimer from "../../components/ArticleAuthorDisclaimer";
import ArticleCard from "../ArticleCard";
import ArticleFaqAccordion from "../ArticleFaqAccordion";
import {
  type Article,
  type Pillar,
  isValidPillar,
  PILLAR_CONFIG,
  getArticlesForPillarPaginated,
  ARCHIVE_PER_PAGE,
  ARTICLES,
} from "../articles-data";

const SAMENWONEN_FAQS = [
  {
    question: "Moet u getrouwd zijn om samen een huis te kopen?",
    answer:
      "Nee. Samenwonende stellen kunnen samen een woning kopen en een gezamenlijke hypotheek aanvragen. Het is wel belangrijk om de eigendomsverhouding bij de notaris vast te leggen en duidelijke afspraken te maken over wat er gebeurt bij overlijden of uit elkaar gaan.",
  },
  {
    question: "Is een samenlevingscontract verplicht?",
    answer:
      "Nee — maar zonder contract heeft u geen juridisch vastgelegde afspraken. Veel banken en pensioenfondsen vragen om een notarieel samenlevingscontract bij een hypotheekaanvraag of aanmelding als nabestaande. Kosten liggen tussen de €320 en €1.075 afhankelijk van de notaris en uw wensen.",
  },
  {
    question: "Erft uw partner automatisch als u samenwoont?",
    answer:
      "Nee. Zonder testament gaat uw nalatenschap naar wettelijke erfgenamen zoals ouders of broers en zussen. Met een samenlevingscontract kunt u na zes maanden wel als partners voor de erfbelasting worden aangemerkt — maar voor persoonlijke bezittingen heeft u ook een testament nodig.",
  },
  {
    question: "Hebben samenwonende partners recht op elkaars pensioen?",
    answer:
      "Niet automatisch. U moet uw partner in veel gevallen officieel aanmelden bij uw pensioenfonds of verzekeraar. Sommige regelingen vereisen een notarieel samenlevingscontract voor erkenning als nabestaande.",
  },
  {
    question: "Wanneer bent u fiscaal partner als u samenwoont?",
    answer:
      "U kunt fiscaal partner zijn als u samen een woning bezit, een notarieel samenlevingscontract heeft of samen een kind heeft. De exacte voorwaarden zijn terug te vinden via belastingdienst.nl. Als fiscaal partner kunt u aftrekposten verdelen in de belastingaangifte.",
  },
  {
    question: "Wat gebeurt er met de hypotheek als u uit elkaar gaat?",
    answer:
      "Beiden zijn hoofdelijk aansprakelijk voor de volledige hypotheekschuld. Bij uit elkaar gaan moet worden besloten wie de woning overneemt en of diegene de hypotheek alleen kan dragen. Maak dit van tevoren helder in een samenlevingscontract om discussies te voorkomen.",
  },
];

const ANNUITAIR_LINEAIR_FAQS = [
  {
    question: "Wat is het verschil tussen annuïtair en lineair aflossen?",
    answer:
      "Bij een annuïteitenhypotheek betaalt u een vast bruto maandbedrag dat bestaat uit rente en aflossing — de verhouding verandert maar het totale bedrag blijft gelijk. Bij een lineaire hypotheek lost u elke maand een vast bedrag af waardoor de maandlasten elke maand dalen.",
  },
  {
    question: "Welke hypotheekvorm heeft lagere maandlasten?",
    answer:
      "De annuïteitenhypotheek heeft lagere maandlasten aan het begin van de looptijd. De lineaire hypotheek start hoger maar daalt gedurende de looptijd — op enig moment worden de maandlasten van een lineaire hypotheek lager dan die van een annuïteitenhypotheek.",
  },
  {
    question: "Welke hypotheek is goedkoper over de hele looptijd?",
    answer:
      "Bij een lineaire hypotheek betaalt u over de totale looptijd minder rente omdat u sneller aflost. Of dit in uw situatie ook netto voordeliger is hangt mede af van inflatie en uw belastingsituatie. Laat dit berekenen door een adviseur voor uw specifieke situatie.",
  },
  {
    question: "Kan ik later van hypotheekvorm veranderen?",
    answer:
      "In principe wel — maar dit heeft fiscale en administratieve gevolgen en is niet altijd mogelijk zonder oversluiting. Bespreek dit met een hypotheekadviseur voordat u een beslissing neemt.",
  },
  {
    question: "Is een annuïteitenhypotheek geschikt voor starters?",
    answer:
      "Ja — de lagere maandlasten aan het begin maken de annuïteitenhypotheek populair bij starters die nog aan het begin van hun carrière staan en verwachten dat hun inkomen de komende jaren stijgt. De hogere beginlasten van een lineaire hypotheek zijn voor veel starters niet haalbaar.",
  },
  {
    question: "Krijg ik hypotheekrenteaftrek bij beide vormen?",
    answer:
      "Ja — zowel de annuïteitenhypotheek als de lineaire hypotheek geven recht op hypotheekrenteaftrek voor nieuwe hypotheken, mits u de lening in maximaal 30 jaar volledig aflost.",
  },
];

const AFLOSSINGSVRIJE_HYPOTHEEK_2026_FAQS = [
  {
    question: "Geldt de nieuwe regel ook voor mijn bestaande aflossingsvrije hypotheek?",
    answer:
      "Nee — als u uw hypotheek ongewijzigd laat verandert er niets. De nieuwe regels gelden alleen bij nieuwe hypotheken of bij inhoudelijke wijzigingen zoals oversluiten, verhogen of verhuizen.",
  },
  {
    question: "Wat is het maximale aflossingsvrije bedrag na 11 mei bij Rabobank?",
    answer:
      "Maximaal 30% van de woningwaarde met een absoluut plafond van €150.000. Het laagste van de twee is bepalend.",
  },
  {
    question: "Kan ik nog tot 50% aflossingsvrij lenen?",
    answer:
      "Bij de genoemde banken niet meer na de ingangsdatum. Bij andere geldverstrekkers die hun beleid nog niet hebben aangepast kan dit nog wel mogelijk zijn. Het is aannemelijk dat meer banken dit voorbeeld zullen volgen.",
  },
  {
    question: "Mijn rentevaste periode loopt af — krijg ik dan te maken met de nieuwe regels?",
    answer:
      "Bij Rabobank niet — een renteherziening telt niet als inhoudelijke wijziging en uw bestaande aflossingsvrije deel blijft intact. Controleer dit wel bij uw eigen geldverstrekker.",
  },
  {
    question: "Ik wil mijn huis verduurzamen via een hypotheekverhoging — geldt de nieuwe regel dan ook?",
    answer:
      "Ja — een hypotheekverhoging telt als inhoudelijke wijziging. Als uw huidige aflossingsvrije deel boven de nieuwe grens ligt kunt u het aflossingsvrije deel bij verhoging niet verder uitbreiden. Het meerdere moet dan via een annuïteiten- of lineaire hypotheek worden gefinancierd.",
  },
  {
    question: "Is een aflossingsvrije hypotheek nog verstandig?",
    answer:
      "Dat hangt sterk af van uw situatie — uw overwaarde, uw inkomen nu en na pensionering en uw toekomstplannen. De lage maandlasten zijn aantrekkelijk maar de schuld lost niet af. Een adviseur kan helpen bepalen of en hoeveel aflossingsvrij bij uw situatie past.",
  },
];

const ZAKELIJKE_VERZEKERINGEN_FAQS = [
  {
    question: "Welke verzekeringen zijn verplicht voor ondernemers?",
    answer:
      "Voor de meeste ondernemers zijn er geen algemene verzekeringsplichten. In sommige sectoren en beroepen kan een specifieke verzekering verplicht zijn — zoals een beroepsaansprakelijkheidsverzekering voor advocaten, accountants en financieel adviseurs. Controleer de eisen in uw sector.",
  },
  {
    question: "Heb ik als ZZP'er ook zakelijke verzekeringen nodig?",
    answer:
      "Ja — met name een AOV voor inkomensbescherming bij ziekte of arbeidsongeschiktheid en een AVB voor aansprakelijkheid bij schade aan derden zijn voor de meeste ZZP'ers relevant. Werkt u als adviseur of kenniswerker? Dan is ook een beroepsaansprakelijkheidsverzekering aan te raden.",
  },
  {
    question: "Wat is het verschil tussen een AVB en een beroepsaansprakelijkheidsverzekering?",
    answer:
      "Een AVB dekt fysieke schade aan personen of eigendommen van derden. Een beroepsaansprakelijkheidsverzekering dekt financiële schade die klanten lijden door een fout of nalatigheid in uw advies of dienstverlening. Veel ondernemers hebben beide nodig.",
  },
  {
    question: "Kan ik meerdere zakelijke verzekeringen combineren?",
    answer:
      "Ja — veel verzekeraars bieden pakketverzekeringen aan waarbij meerdere dekkingen worden gecombineerd. Dit kan administratief eenvoudiger zijn en soms kostenvoordelen bieden. Vergelijk altijd de dekking per onderdeel.",
  },
  {
    question: "Hoe bepaal ik welke verzekeringen mijn onderneming nodig heeft?",
    answer:
      "Begin met het in kaart brengen van uw risico's — wat zijn de grootste bedreigingen voor uw inkomen en bedrijf? Een adviseur kan helpen om uw situatie te analyseren en de meest relevante verzekeringen te identificeren. Bij Haruna kijken we graag met u mee.",
  },
];

const HUIS_KOPEN_56_FAQS = [
  {
    question: "Kan ik als 56-plusser nog een hypotheek krijgen?",
    answer:
      "Ja — maar de voorwaarden veranderen. Vanaf uw 57e gaan hypotheekaanbieders rekenen met uw pensioeninkomen, dat lager uitvalt dan uw gebruikelijke inkomen. Daardoor kan uw maximale hypotheek lager zijn. Via NHG-seniorenregeling, overwaarde of maatwerk zijn er vaak toch mogelijkheden.",
  },
  {
    question: "Wat is de 57-regel bij hypotheken?",
    answer:
      "Vanaf uw 57e — tien jaar vóór de AOW-gerechtigde leeftijd — gaan geldverstrekkers rekenen met uw toekomstige pensioeninkomen naast uw huidige inkomen. Dit kan de maximale hypotheek aanzienlijk verlagen. Vóór uw 57e telt alleen uw huidige inkomen.",
  },
  {
    question: "Wordt mijn pensioeninkomen meegenomen bij een hypotheekaanvraag?",
    answer:
      "Ja — vanaf uw 57e. Geldverstrekkers kijken naar uw AOW, aanvullend pensioen en in sommige gevallen lijfrente-uitkeringen of vermogensinkomsten. Inkomen uit doorwerken na pensionering telt bij de meeste geldverstrekkers niet mee.",
  },
  {
    question: "Kan ik mijn overwaarde gebruiken zonder te verhuizen?",
    answer:
      "Dat kan in sommige gevallen via een hypotheekverhoging of een opeethypotheek. Of dit mogelijk is hangt af van uw inkomen, de waarde van uw woning en de voorwaarden van uw geldverstrekker. Een opeethypotheek vergroot uw hypotheekschuld — bespreek de gevolgen voor uw erfenis en toeslagen met een adviseur.",
  },
  {
    question: "Is verhuizen op latere leeftijd nog mogelijk met een hypotheek?",
    answer:
      "Ja — en de NHG-seniorenregeling maakt dit voor veel 57-plussers mogelijk. Als uw nieuwe woonlasten gelijk zijn aan of lager zijn dan uw huidige woonlasten, mag de geldverstrekker toetsen op werkelijke lasten. Dit geeft vaak meer leenruimte dan de standaard pensioentoets.",
  },
  {
    question: "Is het verstandig om nu actie te ondernemen als ik 56 ben?",
    answer:
      "Als u verhuisplannen heeft of uw hypotheek wilt aanpassen, is het verstandig om dit vóór uw 57e te bespreken met een adviseur. Vóór die leeftijd telt alleen uw huidige inkomen — wat de mogelijkheden groter maakt. Wacht u tot na uw 57e dan veranderen de toetsingsregels.",
  },
];

const VERZEKERINGEN_BIJ_HYPOTHEEK_FAQS = [
  {
    question: "Is een overlijdensrisicoverzekering verplicht bij een hypotheek?",
    answer:
      "Niet altijd. Sommige geldverstrekkers stellen een ORV als voorwaarde — met name bij een hoge hypotheek ten opzichte van de woningwaarde of bij een gezamenlijke hypotheek. Of dit voor uw hypotheek geldt hangt af van de voorwaarden van uw geldverstrekker.",
  },
  {
    question: "Wat is het doel van een overlijdensrisicoverzekering bij een hypotheek?",
    answer:
      "De ORV keert een bedrag uit bij overlijden van de verzekerde. Dit bedrag wordt doorgaans gebruikt om de hypotheekschuld te verlagen zodat de achterblijvende partner de woning kan behouden zonder de volledige lasten alleen te hoeven dragen.",
  },
  {
    question: "Bestaan spaarverzekeringen bij hypotheken nog?",
    answer:
      "Nieuwe spaarhypotheken met een gekoppelde spaarverzekering worden nauwelijks meer afgesloten. Bestaande polissen die vóór 2013 zijn afgesloten lopen in de meeste gevallen gewoon door onder overgangsregelingen. Laat een bestaande spaarverzekering periodiek doorlichten.",
  },
  {
    question: "Wat is het verschil tussen een spaarverzekering en een beleggingsverzekering?",
    answer:
      "Bij een spaarverzekering is het eindkapitaal doorgaans gegarandeerd — u weet vooraf wat u opbouwt. Bij een beleggingsverzekering hangt het eindkapitaal af van beleggingsresultaten — dit kan meer opleveren maar ook minder, waardoor het eindkapitaal tekort kan schieten voor volledige aflossing.",
  },
  {
    question: "Is het verstandig om mijn hypotheekverzekering te laten controleren?",
    answer:
      "Ja — met name als u een bestaande spaarverzekering of beleggingsverzekering heeft. Controleer of de verwachte eindwaarde nog voldoende is, of de kosten marktconform zijn en of de dekking nog past bij uw huidige situatie. Bij Haruna kijken we graag met u mee.",
  },
];

const PARTICULIERE_VERZEKERINGEN_FAQS = [
  {
    question: "Welke verzekering is verplicht voor mijn woning?",
    answer:
      "Een opstalverzekering is verplicht als u een hypotheek heeft. Een autoverzekering is verplicht bij bezit van een gemotoriseerd voertuig. Andere particuliere verzekeringen zijn niet wettelijk verplicht maar kunnen wel sterk aan te raden zijn.",
  },
  {
    question: "Wat is het verschil tussen een opstal- en inboedelverzekering?",
    answer:
      "Een opstalverzekering dekt schade aan het gebouw zelf — muren, dak, vloeren en installaties. Een inboedelverzekering dekt schade aan uw persoonlijke bezittingen in het gebouw — meubels, elektronica en kleding. U heeft beide nodig voor volledige dekking.",
  },
  {
    question: "Is een aansprakelijkheidsverzekering echt nodig?",
    answer:
      "De AVP is niet verplicht maar wordt voor vrijwel elk huishouden sterk aanbevolen. De premie is laag — doorgaans enkele tientallen euro's per jaar — terwijl aansprakelijkheidsschade snel in de tienduizenden euro's kan lopen.",
  },
  {
    question: "Kan ik mijn auto en woning in één pakket verzekeren?",
    answer:
      "Ja — veel verzekeraars bieden combinatiepakketten aan. Dit kan administratief eenvoudiger zijn en soms een premiekorting geven. Vergelijk altijd de dekking per onderdeel voordat u een pakket afsluit.",
  },
  {
    question: "Hoe bepaal ik welke dekking passend is?",
    answer:
      "Breng uw situatie in kaart — uw woning, bezittingen, gezin en het risico dat u zelf kunt dragen. Een adviseur kan helpen om de relevante risico's te identificeren en de juiste dekking te kiezen. Bij Haruna kijken we graag met u mee.",
  },
];

const PENSIOEN_UITSTELLEN_FAQS = [
  {
    question: "Kan ik mijn pensioen altijd uitstellen?",
    answer:
      "In veel gevallen is uitstel mogelijk, maar de voorwaarden verschillen per pensioenregeling. Uitstel is doorgaans mogelijk tot maximaal vijf jaar na uw AOW-ingangsdatum. Controleer de specifieke voorwaarden bij uw pensioenfonds of verzekeraar.",
  },
  {
    question: "Is pensioen uitstellen verstandig?",
    answer:
      "Dat hangt af van uw persoonlijke situatie. Uitstel kan een overweging zijn als u fit genoeg bent om door te werken, uw uitkering niet direct nodig heeft en uw levensverwachting relatief hoog is. Het is minder logisch als uw gezondheid onzeker is, u de uitkering nodig heeft voor vaste lasten of als uw pensioenkapitaal afhankelijk is van een ongunstige rentestand. Een adviseur kan dit voor uw situatie in kaart brengen.",
  },
  {
    question: "Wordt mijn maandelijkse uitkering hoger bij uitstel?",
    answer:
      "Bij verzekerd pensioen is de uitkering in veel gevallen hoger. Bij pensioenkapitaal hangt de hoogte af van het aankooptarief op het moment van aankoop, dat mede afhankelijk is van de rente. Een hogere kapitaalwaarde leidt dus niet automatisch tot een hogere uitkering.",
  },
  {
    question: "Heeft uitstel gevolgen voor mijn AOW?",
    answer:
      "De AOW is gekoppeld aan uw leeftijd en kunt u niet uitstellen op dezelfde manier als uw aanvullend pensioen. De AOW-leeftijd is in 2026 67 jaar.",
  },
  {
    question: "Is uitstellen fiscaal voordelig?",
    answer:
      "Dat hangt af van uw situatie. Een hogere uitkering kan in een hogere belastingschijf vallen en invloed hebben op toeslagen. In sommige situaties kunnen fiscale voordelen gelden, maar dat is sterk afhankelijk van uw persoonlijke situatie.",
  },
  {
    question: "Moet ik ook mijn partner informeren bij uitstel?",
    answer:
      "Ja. Uitstel kan gevolgen hebben voor het partnerpensioen, afhankelijk van uw regeling. Bespreek dit met uw pensioenfonds of verzekeraar en informeer uw partner tijdig.",
  },
];

const PENSIOEN_VOOR_WERKGEVERS_EN_WERKNEMERS_FAQS = [
  {
    question: "Is een pensioenregeling verplicht voor mijn bedrijf?",
    answer:
      "Dat hangt af van uw sector en cao. In veel sectoren schrijft de cao een verplichte aansluiting bij een bedrijfstakpensioenfonds voor. Buiten cao-verband bent u als werkgever in principe vrij om een regeling aan te bieden of niet, maar een goede regeling is vaak wel een belangrijke arbeidsvoorwaarde.",
  },
  {
    question: "Wat is het verschil tussen een flexibele en solidaire premieregeling?",
    answer:
      "Bij een flexibele premieregeling wordt pensioenvermogen meer individueel belegd. Bij een solidaire premieregeling worden beleggingsresultaten en risico's meer collectief gedeeld tussen deelnemers.",
  },
  {
    question: "Wat is de deadline voor de overgang naar het nieuwe pensioenstelsel?",
    answer:
      "Uiterlijk 1 januari 2028 moeten oude pensioenregelingen zijn omgezet naar het nieuwe stelsel. Voor werkgevers met een regeling bij een verzekeraar of PPI geldt dat het transitieplan uiterlijk 1 oktober 2026 moet zijn ingediend.",
  },
  {
    question: "Hoe informeer ik mijn werknemers over de pensioenovergang?",
    answer:
      "Werknemers ontvangen informatie van pensioenfonds of verzekeraar over de impact op hun persoonlijke pensioen. Als werkgever bent u verantwoordelijk voor tijdige en begrijpelijke communicatie binnen de organisatie en voor het correct doorgeven van wijzigingen in dienstverband of salaris.",
  },
  {
    question: "Kan ik pensioenbeheer uitbesteden?",
    answer:
      "Ja. Werkgevers kunnen pensioenadministratie en communicatie uitbesteden aan een pensioenadviseur of HR-dienstverlener. Zeker voor kleinere werkgevers is dit vaak een praktische oplossing.",
  },
  {
    question: "Welke fiscale voordelen biedt een collectieve pensioenregeling?",
    answer:
      "Pensioenpremies zijn onder voorwaarden aftrekbaar voor de werkgever. Werknemers betalen doorgaans geen belasting over de premie-inleg, maar wel over de latere uitkering. De exacte fiscale gevolgen hangen af van uw regeling en situatie.",
  },
];

const PENSIOEN_ALS_ONDERNEMER_DGA_FAQS = [
  {
    question: "Kan ik als DGA nog pensioen in eigen beheer opbouwen?",
    answer:
      "Nee. Het opbouwen van pensioen in eigen beheer is per 1 april 2017 afgeschaft. U kunt wel pensioen opbouwen via een lijfrente, een pensioenregeling bij een externe verzekeraar, of door te sparen en beleggen in de BV of in privé.",
  },
  {
    question: "Wat is een ODV en wat moet ik ermee?",
    answer:
      "Een oudedagsverplichting (ODV) is het resultaat van een omzetting van pensioen in eigen beheer naar een verplichting op de balans van uw BV. Vanaf de AOW-leeftijd moet de ODV worden uitgekeerd in 20 jaarlijkse, gelijke termijnen — tenzij u de ODV eerder omzet naar een lijfrente bij een verzekeraar. Controleer jaarlijks of de ODV correct is opgerent en of de waarde op de balans klopt. De uitkeringen worden belast in box 1.",
  },
  {
    question: "Hoe bereken ik mijn jaarruimte voor lijfrente?",
    answer:
      "De jaarruimte hangt af van uw inkomen, de AOW-franchise en eventuele andere pensioenopbouw. De Belastingdienst biedt rekenhulpen om dit voor uw situatie te bepalen. Een adviseur kan u helpen om de berekening te maken en ook de reserveringsruimte van voorgaande jaren in kaart te brengen.",
  },
  {
    question: "Zijn pensioenpremies aftrekbaar voor mijn BV?",
    answer:
      "Bij een pensioenregeling via een externe verzekeraar zijn premies die uw BV betaalt onder voorwaarden aftrekbaar. Als u als DGA een lijfrente privé afsluit, zijn premies aftrekbaar in uw persoonlijke inkomstenbelasting binnen de jaarruimte. De exacte fiscale behandeling hangt af van de gekozen constructie — laat u daarom adviseren voor uw specifieke situatie.",
  },
  {
    question: "Is het verstandig om mijn ODV om te zetten naar een lijfrente?",
    answer:
      "Voor sommige DGA&apos;s is het aantrekkelijk om een bestaande ODV niet binnen de BV te laten uitkeren, maar om te zetten naar een lijfrenteoplossing bij een verzekeraar. Of dit voor uw situatie verstandig is, hangt af van de liquiditeit van uw BV, uw fiscale positie en uw persoonlijke wensen. Bespreek dit met een adviseur voordat u een beslissing neemt.",
  },
];

const ZAKELIJKE_FINANCIERING_FAQS = [
  {
    question: "Wanneer heeft een ondernemer zakelijke financiering nodig?",
    answer:
      "Bij investeringen in bedrijfsmiddelen, een bedrijfspand, uitbreiding van activiteiten of tijdelijke liquiditeitsbehoefte. Ook bij bedrijfsovernames of groei van personeel en technologie speelt financiering een rol.",
  },
  {
    question: "Wat is het verschil tussen een zakelijke lening en een rekening-courant krediet?",
    answer:
      "Een zakelijke lening is een vast bedrag met vaste looptijd en maandelijkse aflossing — geschikt voor gerichte investeringen. Een rekening-courant krediet is een flexibele kredietlijn waaruit u naar behoefte kunt putten en terugbetalen — geschikt voor het opvangen van tijdelijke cashflowtekorten.",
  },
  {
    question: "Wat is leasing voor ondernemers?",
    answer:
      "Bij leasing gebruikt u een bedrijfsmiddel — zoals een auto of machine — zonder het direct te kopen. Bij financial lease wordt u na afloop eigenaar. Bij operational lease blijft de leasemaatschappij eigenaar en betaalt u een vast maandbedrag inclusief onderhoud en verzekering.",
  },
  {
    question: "Wat is de BMKB?",
    answer:
      "De Borgstelling MKB Kredieten is een overheidsregeling waarbij de overheid borg staat voor een deel van uw zakelijk krediet bij de bank. Dit maakt financiering toegankelijker voor MKB-ondernemers met onvoldoende onderpand. De BMKB wordt aangevraagd via uw bank.",
  },
  {
    question: "Waar kijken banken naar bij een kredietaanvraag?",
    answer:
      "Omzet, winst, cashflow, bestaande schulden, onderpand en uw ondernemingsplan. Een actuele administratie en realistische financiële prognoses zijn essentieel voor een vlotte beoordeling.",
  },
  {
    question: "Kan een adviseur helpen bij zakelijke financiering?",
    answer:
      "Ja — een adviseur kan helpen bij het in kaart brengen van uw mogelijkheden, het vergelijken van financieringsvormen en het voorbereiden van een aanvraag. Bij Haruna kijken we graag met u mee naar uw plannen en situatie.",
  },
];

const PARTICULIERE_LENING_FAQS = [
  {
    question: "Waarom zijn rente en looptijd belangrijk bij een lening?",
    answer:
      "De rente bepaalt hoeveel u extra betaalt bovenop het geleende bedrag. Een langere looptijd geeft lagere maandlasten maar hogere totale rentekosten. Kijk altijd naar de combinatie — niet alleen naar de maandlast.",
  },
  {
    question: "Wat is het effectieve jaarpercentage (APR)?",
    answer:
      "Het APR verwerkt alle verplichte kosten van de lening — rente én bijkomende kosten zoals afsluitprovisie. Kredietverstrekkers zijn wettelijk verplicht het APR te vermelden. Vergelijk leningen altijd op APR voor een eerlijke vergelijking.",
  },
  {
    question: "Hoe weet ik of ik de maandlasten kan betalen?",
    answer:
      "Maak een overzicht van uw vaste lasten en netto inkomen. Wat overblijft is uw beschikbare ruimte voor een nieuwe maandlast. Houd ook rekening met onvoorziene uitgaven of veranderingen in uw situatie — ziekte, werkloosheid of andere grote kosten.",
  },
  {
    question: "Wat is het verschil tussen een persoonlijke lening en een doorlopend krediet?",
    answer:
      "Een persoonlijke lening heeft een vast bedrag, vaste looptijd en vaste maandlasten — u weet vooraf precies wat u betaalt. Een doorlopend krediet is flexibeler — u neemt op naar behoefte en betaalt rente over het opgenomen bedrag — maar de rente kan variabel zijn en de kosten kunnen oplopen bij langdurig gebruik.",
  },
  {
    question: "Wat zijn de risico's van te veel lenen?",
    answer:
      "Betalingsproblemen, oplopende schulden, extra kosten bij achterstand en een negatieve BKR-registratie die toekomstige financiering bemoeilijkt. Leen alleen wat u nodig heeft en wat u redelijkerwijs kunt terugbetalen.",
  },
  {
    question: "Kan een adviseur helpen bij een particuliere lening?",
    answer:
      "Ja — een adviseur kan helpen bij het in kaart brengen van uw opties, de totale kosten en wat betaalbaar is in uw situatie. Bij Haruna kijken we graag met u mee voordat u een financiële verplichting aangaat.",
  },
];

const BEDRIJFSAUTO_FINANCIERING_FAQS = [
  {
    question: "Wat is het verschil tussen kopen en financieren van een bedrijfsauto?",
    answer:
      "Bij kopen betaalt u de auto in één keer en bent u direct eigenaar. Bij financieren leent u het bedrag en betaalt u in termijnen terug met rente — u wordt eigenaar na volledige aflossing. Financieren spreidt de investering maar brengt rentelasten en vaste lasten met zich mee.",
  },
  {
    question: "Wat is het verschil tussen financial lease en operational lease?",
    answer:
      "Bij financial lease betaalt u de auto af en wordt u doorgaans eigenaar aan het einde van de looptijd. U draagt het economische risico. Bij operational lease blijft de leasemaatschappij eigenaar — onderhoud en verzekering zijn doorgaans inbegrepen en u levert de auto na afloop in.",
  },
  {
    question: "Welke bijtelling geldt in 2026 voor een elektrische bedrijfsauto?",
    answer:
      "18% bijtelling over de eerste €30.000 van de cataloguswaarde en 22% over het meerdere. Dit tarief staat 60 maanden vast vanaf de datum van eerste kentekenstelling. Voor fossiele auto's geldt 22% over de volledige cataloguswaarde.",
  },
  {
    question: "Kan ik de kosten van een bedrijfsauto aftrekken?",
    answer:
      "Onder voorwaarden ja. De precieze mogelijkheden hangen af van uw rechtsvorm, de gekozen financieringsvorm en het aandeel privégebruik. Bespreek dit met een adviseur voor uw specifieke situatie.",
  },
  {
    question: "Hoe beïnvloedt een bedrijfsauto mijn cashflow?",
    answer:
      "Bij kopen heeft u een grote eenmalige uitgave. Bij financieren of financial lease betaalt u vaste maandtermijnen. Bij operational lease betaalt u een all-in maandbedrag inclusief onderhoud en verzekering — dat zorgt doorgaans voor de meest voorspelbare cashflowlasten.",
  },
  {
    question: "Is het fiscaal aantrekkelijk om in 2026 een elektrische auto te leasen?",
    answer:
      "In 2026 geldt 18% bijtelling over de eerste €30.000 voor nieuwe elektrische auto's — lager dan 22% voor fossiele auto's. Wie in 2026 een elektrische auto op kenteken zet, profiteert 60 maanden van dit tarief. In 2027 stijgt het tarief naar 20% en vanaf 2028 geldt voor alle auto's 22%. De timing van aanschaf kan dus fiscaal relevant zijn. Bespreek uw specifieke situatie met een adviseur.",
  },
];

const CHEVRON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
    <path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" />
  </svg>
);

function Pagination({
  slug,
  currentPage,
  totalPages,
}: {
  slug: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const base = `/nieuws/${slug}`;
  const prev =
    currentPage > 1
      ? currentPage === 2
        ? base
        : `${base}?page=${currentPage - 1}`
      : null;
  const next =
    currentPage < totalPages ? `${base}?page=${currentPage + 1}` : null;

  return (
    <nav
      className="flex flex-wrap justify-center items-center gap-2 mt-12 pt-8 border-t border-nbg-light-gray"
      aria-label="Paginering"
    >
      {prev ? (
        <Link
          href={prev}
          className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray bg-white px-4 py-2 text-nbg-blue font-medium text-[15px] hover:bg-nbg-lighter-green/50 transition-colors"
        >
          <span className="rotate-180 inline-block">{CHEVRON}</span>
          Vorige
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray/50 bg-nbg-light-gray/30 px-4 py-2 text-nbg-blue/50 text-[15px] cursor-not-allowed">
          Vorige
        </span>
      )}

      <span className="px-4 py-2 text-nbg-blue/80 text-[15px]">
        Pagina {currentPage} van {totalPages}
      </span>

      {next ? (
        <Link
          href={next}
          className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray bg-white px-4 py-2 text-nbg-blue font-medium text-[15px] hover:bg-nbg-lighter-green/50 transition-colors"
        >
          Volgende
          {CHEVRON}
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray/50 bg-nbg-light-gray/30 px-4 py-2 text-nbg-blue/50 text-[15px] cursor-not-allowed">
          Volgende
        </span>
      )}
    </nav>
  );
}

function toIsoDate(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;
  const [dd, mm, yy] = dateStr.split("-");
  if (!dd || !mm || !yy) return undefined;
  const year = yy.length === 2 ? `20${yy}` : yy;
  const date = new Date(`${year}-${mm}-${dd}T00:00:00`);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function getArticleSchema(article: Article | undefined, slug: string) {
  const canonicalUrl = `https://haruna.nl/nieuws/${slug}`;
  const isoDate = toIsoDate(article?.date);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: article?.title ?? "Nieuwsartikel | Haruna",
    description: article?.description ?? "Artikel en gids van Haruna.",
    author: {
      "@type": "Person",
      name: "Matthijs van Reek",
    },
    publisher: {
      "@type": "Organization",
      name: "Haruna B.V.",
      url: "https://haruna.nl",
    },
    ...(article?.image ? { image: [article.image] } : {}),
    ...(isoDate ? { datePublished: isoDate, dateModified: isoDate } : {}),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isValidPillar(slug)) {
    const config = PILLAR_CONFIG[slug as Pillar];
    return {
      title: `Nieuws – ${config.label} | Haruna Hypotheek- en pensioenadvies`,
      description: `Artikelen en gidsen over ${config.label.toLowerCase()}. ${config.description}`,
    };
  }
  if (slug === "samenwonen-wat-moet-u-regelen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Samenwonen: wat moet u regelen?"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Gaat u samenwonen of woont u al samen? Lees wat u financieel en juridisch moet regelen rond hypotheek, vermogen en elkaar.",
    };
  }
  if (slug === "huis-kopen-56-plusser") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Een huis kopen als 56-plusser"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Hypotheekmogelijkheden voor 56-plussers. Lees over pensioeninkomen, overwaarde en verhuizen op latere leeftijd.",
    };
  }
  if (slug === "annuitair-vs-lineair-aflossen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Annuïtair vs. lineair aflossen"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Het verschil tussen annuïtair en lineair aflossen. Welke hypotheekvorm past bij uw situatie? Voor- en nadelen op een rij.",
    };
  }
  if (slug === "aflossingsvrije-hypotheek-nieuwe-regels-2026") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Aflossingsvrije hypotheek — nieuwe regels vanaf mei 2026"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Rabobank, ABN AMRO en ASN Bank scherpen regels voor aflossingsvrije hypotheken aan per mei/juni 2026. Maximaal 30% van de woningwaarde. Wat verandert er en geldt dit voor u?",
    };
  }
  if (slug === "welke-verzekeringen-heeft-uw-onderneming-nodig") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Welke verzekeringen heeft uw onderneming nodig? 2026 — Gids voor ondernemers"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Welke zakelijke verzekeringen heeft u als ondernemer nodig? AVB, beroepsaansprakelijkheid, AOV, bedrijfsschade en cyberverzekering uitgelegd — met checklist voor ZZP en MKB.",
    };
  }
  if (slug === "verzekeringen-bij-uw-hypotheek") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Verzekeringen bij uw hypotheek 2026 — overlijdensverzekeringen, spaarverzekering en wat past bij u"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Welke verzekeringen horen bij een hypotheek? Overlijdensrisicoverzekering, spaarverzekering en beleggingsverzekering uitgelegd — wanneer verplicht en wat past bij uw situatie.",
    };
  }
  if (slug === "wat-kunt-u-als-particulier-verzekeren") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Wat kunt u als particulier verzekeren? 2026 — Opstal, inboedel, AVP en auto uitgelegd"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Welke particuliere verzekeringen heeft u nodig? Opstal, inboedel, aansprakelijkheid, auto en reisverzekering uitgelegd — met checklist en waar u op moet letten.",
    };
  }
  if (slug === "pensioen-uitstellen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Pensioen uitstellen: wat zijn de gevolgen?"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Overweegt u om later met pensioen te gaan? Dit kan financieel en persoonlijk voordelen bieden, maar er zijn ook aandachtspunten.",
    };
  }
  if (slug === "pensioen-voor-werkgevers-en-werknemers") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Pensioen voor werkgevers en werknemers"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Collectieve regelingen, communicatie en beheer. Wij helpen u de pensioenvoorziening goed in te richten.",
    };
  }
  if (slug === "pensioen-als-ondernemer-dga") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Pensioen als ondernemer (DGA)"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Eigen beheer, verzekerde regelingen of fiscaal-juridische vraagstukken. Advies op maat voor directeuren-grootaandeelhouders.",
    };
  }
  if (slug === "zakelijke-financiering") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Zakelijke financiering"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Welke mogelijkheden heeft u als ondernemer? Banklening, rekening-courant, leasing en waar financiers naar kijken.",
    };
  }
  if (slug === "particuliere-lening") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Particuliere lening"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Rente, looptijd, totale kosten en betaalbaarheid. Waar u op moet letten voordat u een particuliere lening afsluit.",
    };
  }
  if (slug === "bedrijfsauto-financieren-leasen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Bedrijfsauto financieren of leasen 2026"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Bedrijfsauto kopen, financieren of leasen? Actuele bijtellingspercentages 2026, verschil financial en operational lease en fiscale gevolgen voor ondernemers uitgelegd.",
    };
  }
  return { title: "Nieuws | Haruna Hypotheek- en pensioenadvies" };
}

export default async function NieuwsSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  // Pillar archive: /nieuws/hypotheken, /nieuws/verzekeringen, /nieuws/pensioen
  if (isValidPillar(slug)) {
    const pillar = slug as Pillar;
    const config = PILLAR_CONFIG[pillar];
    const page = Math.max(1, parseInt(String(pageParam || "1"), 10) || 1);
    const { articles, total, totalPages } = getArticlesForPillarPaginated(
      pillar,
      page,
      ARCHIVE_PER_PAGE
    );
    const currentPage = Math.min(page, totalPages);

    return (
      <>
        <Header />

        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">
                  Nieuws
                </Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">{config.label}</span>
              </nav>
              <h1 className="text-nbg-blue text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight m-0">
                {config.label} – alle artikelen
              </h1>
              <p className="mt-2 text-nbg-blue/80 text-[17px] m-0">
                {total} {total === 1 ? "artikel" : "artikelen"}
              </p>
            </div>
          </section>

          <section className="py-10 lg:py-14 bg-white">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              {articles.length === 0 ? (
                <p className="text-nbg-blue/80 text-[17px] m-0">
                  Er staan nog geen artikelen in deze categorie.{" "}
                  <Link href="/nieuws" className="text-nbg-green font-medium hover:underline">
                    Terug naar nieuws
                  </Link>
                </p>
              ) : (
                <>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0 items-stretch">
                    {articles.map((article) => (
                      <li key={article.slug} className="flex">
                        <ArticleCard article={article} />
                      </li>
                    ))}
                  </ul>
                  <Pagination
                    slug={slug}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </>
              )}
            </div>
          </section>

          <section className="py-8 bg-nbg-lighter-green">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/nieuws"
                className="inline-flex items-center gap-2 text-nbg-green font-semibold hover:underline"
              >
                ← Alle onderwerpen
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  // Article page: /nieuws/<article-slug>
  if (slug === "samenwonen-wat-moet-u-regelen") {
    const article = ARTICLES.find((a) => a.slug === slug);

    const listItem = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const samenwonenFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: SAMENWONEN_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(samenwonenFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          {/* Hero */}
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Samenwonen: wat moet u regelen?</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Hypotheken</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Samenwonen: wat moet u regelen?
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-[15px] text-nbg-blue/70">
                {article?.date && <time>{article.date}</time>}
                <span className="w-1.5 h-1.5 rounded-full bg-nbg-light-gray" aria-hidden />
                <span>Samenwonen & hypotheek</span>
              </div>
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Gaat u binnenkort samenwonen of woont u al samen? Dan is het verstandig om een aantal zaken goed te regelen. Samenwonen heeft gevolgen voor uw hypotheek, vermogen en uw rechten ten opzichte van elkaar — maar zonder afspraken op papier verandert er juridisch niets.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Samenwonend stel dat financiële zaken bespreekt"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Veel stellen denken dat samenwonen automatisch dezelfde rechten geeft als trouwen. In de praktijk is dat niet zo. Zonder afspraken blijft u en uw partner voor de wet twee afzonderlijke personen — met elk hun eigen bezittingen, schulden en erfrecht.
              </p>
              <p>
                De vijf belangrijkste zaken om te regelen bij samenwonen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItem("Samenlevingscontract")}
                {listItem("Eigendomsverhouding bij een gezamenlijke woning")}
                {listItem("Testament")}
                {listItem("Aanmelding bij pensioenuitvoerder")}
                {listItem("Fiscaal partnerschap")}
              </ul>
            </div>

            {/* Callout */}
            <div className="mt-8 rounded-xl border-l-4 border-nbg-primary bg-nbg-lighter-green/50 py-4 px-5">
              <p className="text-nbg-blue text-[17px] font-medium m-0">
                Zonder afspraken op papier verandert er juridisch niets: u en uw partner blijven voor de wet twee afzonderlijke personen.
              </p>
            </div>

            <p className="mt-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              Hieronder leest u wat elk punt inhoudt. De informatie is gebaseerd op de regelgeving zoals die geldt in maart 2026. Wet- en regelgeving kan veranderen; laat u daarom goed en actueel informeren door een adviseur of notaris. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>

            {/* In het kort – key points card */}
            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Samenlevingscontract
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Eigendomsverhouding bij een gezamenlijke woning
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Testament
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Aanmelding bij pensioenuitvoerder
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Fiscaal partnerschap
                </li>
              </ul>
            </div>

            {/* Section block – card */}
            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">1. Samenlevingscontract</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een samenlevingscontract is een notariële overeenkomst waarin u afspraken vastlegt over uw samenwonen. U bent niet verplicht om een samenlevingscontract te hebben — maar zonder contract heeft u geen juridisch vastgelegde afspraken over bijvoorbeeld de verdeling van bezittingen of wat er gebeurt bij overlijden.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Wat legt u vast in een samenlevingscontract:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("Hoe u de kosten van het huishouden verdeelt")}
                {listItem("Wie eigenaar is van welke bezittingen")}
                {listItem("Wat er gebeurt met de woning als u of uw partner overlijdt (verblijvingsbeding)")}
                {listItem("Hoe spaargeld of investeringen worden verdeeld bij beëindiging van de relatie")}
                {listItem("Hoeveel ieder heeft ingebracht bij aankoop van een gezamenlijke woning")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Soms vraagt een bank of een pensioenfonds om een notarieel samenlevingscontract — bijvoorbeeld als u samen een hypotheek wilt of als u de ander als partner wil aanmelden voor uw ouderdomspensioen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Wat kost een samenlevingscontract? Een samenlevingscontract kost tussen de €449 en €1.075. Een op maat gemaakt samenlevingscontract via een traditioneel notariskantoor begint gemiddeld rond de €700 inclusief btw. Notaris.nl Online notarisdiensten zijn goedkoper. De kosten lopen uiteen van €320 tot meer dan €1.000 afhankelijk van de notaris, uw wensen en de complexiteit. Vergelijk notarissen op prijs — tarieven verschillen aanzienlijk per kantoor en regio.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">2. Hypotheek bij samenwonen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                U hoeft niet getrouwd te zijn om samen een huis te kopen. Samenwonende stellen kopen regelmatig samen een woning. Er zijn wel een aantal zaken die u goed moet regelen.
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("Beide inkomens: bij een gezamenlijke hypotheekaanvraag kunnen beide inkomens worden meegeteld voor de maximale hypotheek. Dit vergroot vaak de leencapaciteit.")}
                {listItem("Hoofdelijke aansprakelijkheid: beide partners zijn hoofdelijk aansprakelijk voor de gehele hypotheekschuld. Dat betekent dat de bank elk van u beiden kan aanspreken voor het volledige bedrag — ook als u uit elkaar gaat.")}
                {listItem("Eigendomsverhouding: de eigendomsverhouding (wie welk percentage van de woning bezit) legt u vast bij de notaris in de akte van levering.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij overlijden: zonder testament en samenlevingscontract erft uw partner niet automatisch uw aandeel in de woning. Met een verblijvingsbeding in uw samenlevingscontract regelt u dat de andere partner in de woning mag blijven wonen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Overlijdensrisicoverzekering: bij een gezamenlijke hypotheek is het verstandig om na te denken over een overlijdensrisicoverzekering. Als één van u beiden overlijdt, kan de ander de hypotheeklasten mogelijk niet alleen dragen. Bij Haruna bespreken we graag met u of en hoe dit passend kan zijn voor uw situatie.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Bij uit elkaar gaan: stel vooraf vast wat er gebeurt als u uit elkaar gaat. Wie neemt de woning over? Kan diegene de hypotheek alleen dragen? Moet de ander worden uitgekocht? Dit vastleggen in een samenlevingscontract voorkomt veel discussies achteraf.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">3. Erfenis en testament</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Als u samenwoont zonder huwelijk of geregistreerd partnerschap, erft uw partner niet automatisch van u. Zonder testament gaat een nalatenschap naar wettelijke erfgenamen — doorgaans ouders, broers of zussen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Met een samenlevingscontract regelt u dat u na zes maanden automatisch als partners voor de erfbelasting wordt aangemerkt door de fiscus. Als partners voor de erfbelasting kunt u gebruikmaken van de fiscale partnervrijstelling van ruim €795.000. Zonder dit bent u slechts vrijgesteld tot iets meer dan €2.658 en betaalt u tot 40% erfbelasting in plaats van maximaal 20%.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Een samenlevingscontract regelt echter niet alles rond erfenis. Voor persoonlijke bezittingen heeft u ook een testament nodig. Een notaris kan u adviseren over de combinatie van samenlevingscontract en testament.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">4. Pensioen en nabestaandenpensioen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Als u samenwoont, heeft uw partner niet automatisch recht op uw nabestaandenpensioen. In veel pensioenregelingen moet u uw partner eerst officieel aanmelden bij de pensioenuitvoerder. Soms vraagt een pensioenfonds om een notarieel samenlevingscontract voordat het uw partner erkent als nabestaande.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Controleer bij uw pensioenfonds of verzekeraar:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("Of er nabestaandenpensioen is en wat de voorwaarden zijn")}
                {listItem("Of uw partner aangemeld moet worden en hoe")}
                {listItem("Of een samenlevingscontract verplicht is voor erkenning als partner")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">5. Fiscaal partnerschap</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Wanneer u niets vastlegt, bent u niet automatisch fiscaal partner. Daardoor kunt u bepaalde fiscale voordelen niet benutten — zoals het verdelen van aftrekposten in de belastingaangifte of het optimaal benutten van de hypotheekrenteaftrek.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                U kunt in aanmerking komen voor fiscaal partnerschap als u:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("Samen een woning bezit")}
                {listItem("Een notarieel samenlevingscontract heeft")}
                {listItem("Samen een kind heeft of een kind van de ander heeft erkend")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De exacte voorwaarden worden bepaald door de Belastingdienst. Controleer via belastingdienst.nl of u als fiscaal partner kwalificeert.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Trouwen of geregistreerd partnerschap</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Naast samenwonen met een samenlevingscontract kunt u ook kiezen voor een huwelijk of geregistreerd partnerschap. Sinds 2018 geldt standaard beperkte gemeenschap van goederen — alleen het vermogen dat tijdens het huwelijk wordt opgebouwd is gezamenlijk. Vermogen dat u al had vóór het huwelijk blijft van uzelf, tenzij u andere afspraken maakt in huwelijkse voorwaarden.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een geregistreerd partnerschap heeft in grote lijnen dezelfde juridische gevolgen als trouwen maar is gemakkelijker te beëindigen zonder tussenkomst van de rechter.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Welke vorm het beste past, hangt af van uw persoonlijke situatie. Een notaris kan de verschillen voor u helder in kaart brengen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Checklist samenwonen — alles op een rij</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Direct regelen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("Samenlevingscontract opstellen bij notaris")}
                {listItem("Eigendomsverhouding vastleggen bij aankoop gezamenlijke woning")}
                {listItem("Testament opstellen")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Controleren:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("Partner aanmelden bij pensioenuitvoerder")}
                {listItem("Fiscaal partnerschap checken via Belastingdienst")}
                {listItem("Overlijdensrisicoverzekering bespreken bij gezamenlijke hypotheek")}
                {listItem("Toeslagpartnerschap controleren bij huurtoeslag of zorgtoeslag")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij hypotheekaanvraag:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItem("Beide inkomens meenemen in de aanvraag")}
                {listItem("Hoofdelijke aansprakelijkheid begrijpen")}
                {listItem("Regeling bij overlijden en bij uit elkaar gaan vastleggen")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Afspraak maken</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Gaat u samenwonen en wilt u weten wat dit betekent voor uw hypotheek, maandlasten en financiële situatie? Bij Haruna kijken we graag met u mee.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Voor juridische documenten zoals een testament of samenlevingscontract verwijzen wij u door naar een notaris.
              </p>
            </section>

            {/* CTA block – prominent card */}
            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Samenwonen: wat betekent het voor uw situatie?</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Gaat u samenwonen en wilt u weten wat dit betekent voor uw hypotheek, maandlasten en financiële situatie? Bij Haruna kijken we graag met u mee. Voor juridische documenten zoals een testament of samenlevingscontract verwijzen wij u door naar een notaris.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Plan een adviesgesprek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            {/* FAQ – accordion */}
            <section className="mt-12" aria-labelledby="samenwonen-faq-heading">
              <h2 id="samenwonen-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over samenwonen
              </h2>
              <ArticleFaqAccordion items={SAMENWONEN_FAQS} />
            </section>

            {/* Related link card */}
            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over hypotheken</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Bereken uw maximale hypotheek, vergelijk rentestanden en plan een vrijblijvend gesprek.
              </p>
              <Link href="/hypotheken" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar hypotheken
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Gaat u samenwonen en wilt u weten wat dit betekent voor uw hypotheek en financiële situatie? Bij Haruna kijken we graag met u mee. Voor juridische documenten zoals een testament of samenlevingscontract verwijzen wij u door naar een notaris.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Een huis kopen als 56-plusser
  if (slug === "huis-kopen-56-plusser") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItem56 = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const huisKopen56FaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HUIS_KOPEN_56_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(huisKopen56FaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Hypotheek als 56-plusser 2026</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Hypotheken</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Hypotheek als 56-plusser 2026 — Mogelijkheden, de 57-regel en NHG-seniorenregeling
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-[15px] text-nbg-blue/70">
                {article?.date && <time>{article.date}</time>}
                <span className="w-1.5 h-1.5 rounded-full bg-nbg-light-gray" aria-hidden />
                <span>Senioren en hypotheek</span>
              </div>
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Wilt u op latere leeftijd verhuizen, een andere woning kopen of uw hypotheek aanpassen? Dan veranderen de spelregels naarmate u ouder wordt. Vanaf uw 57e — tien jaar vóór de AOW-gerechtigde leeftijd — gaan hypotheekaanbieders rekenen met uw toekomstige pensioeninkomen. Dat inkomen valt in veel gevallen lager uit dan uw huidige salaris, waardoor u mogelijk minder kunt lenen. Dat betekent niet dat een hypotheek niet mogelijk is. Er zijn specifieke regelingen voor senioren en steeds meer geldverstrekkers kijken naar de totale financiële situatie — inclusief overwaarde en vermogen. Maar timing is belangrijk: er zijn stappen die u beter vóór uw 57e kunt zetten.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="56-plusser die nadenkt over een nieuwe woning of hypotheek"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De 57-regel — voor hypotheekaanbieders is 57 jaar een belangrijk moment. Vanaf die leeftijd gaan zij rekenen met uw inkomen uit loondienst tot de AOW-gerechtigde leeftijd en met uw pensioeninkomen vanaf die leeftijd.
              </p>
              <p>
                In een vereenvoudigd rekenvoorbeeld kan het verschil door die toetsing tienduizenden euro’s maken. Belangrijk: dit geldt niet alleen bij een nieuwe woning. Ook als u uw bestaande hypotheek wilt verhogen, oversluiten of overwaarde wilt opnemen, kijkt de bank vanaf uw 57e naar uw toekomstige inkomen.
              </p>
              <p>
                Goed nieuws: daardoor zijn er ook gerichte mogelijkheden. Zo kunt u soms méér lenen via NHG voor senioren, overwaarde benutten of met een strategische planning eerder actie ondernemen.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  De 57-regel in de praktijk
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  NHG-seniorenregeling (2026) en nieuwe NHG-regel
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Overwaarde gebruiken
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Welk inkomen telt mee bij de hypotheektoets
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Verhuizen naar een passende woning
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">De 57-regel — wat verandert er precies?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Voor hypotheekaanbieders is 57 jaar een belangrijke leeftijd. Vanaf die leeftijd gaan zij rekenen met uw inkomen uit loondienst tot de AOW-gerechtigde leeftijd en met uw pensioeninkomen vanaf die leeftijd.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een rekenvoorbeeld ter illustratie: U bent 55 jaar en heeft een jaarsalaris van €60.000. Vanaf 67 jaar krijgt u jaarlijks een pensioen van €35.000. U kunt nu maximaal circa €272.000 lenen. Op uw 57e kunt u nog maximaal €209.000 lenen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Dat verschil — puur door de toetsing op pensioeninkomen — kan tienduizenden euro's zijn. Belangrijk: dit geldt niet alleen bij een nieuwe woning. Ook als u uw bestaande hypotheek wilt verhogen, oversluiten of uw overwaarde wilt opnemen, kijkt de bank vanaf uw 57e naar uw toekomstige inkomen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat betekent dit praktisch?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Vanaf uw 57e verandert de manier waarop uw inkomen wordt meegewogen. Praktisch betekent dit:
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Vóór uw 57e kunt u nog op basis van uw huidige inkomen toetsen. Na uw 57e wordt een gewogen berekening gemaakt met huidig én toekomstig pensioeninkomen. De maximale hypotheek kan daardoor aanzienlijk lager uitvallen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Tip: actie vóór uw 57e verjaardag. Overweegt u te verhuizen, uw hypotheek over te sluiten naar een lagere rente of uw woning te verbouwen? Dan kan het financieel gunstig zijn om dit vóór uw 57e te regelen — wanneer alleen uw huidige inkomen telt voor de toetsing.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">NHG-seniorenregeling — meer mogelijkheden bij verhuizing</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Voor 57-plussers die willen verhuizen naar een andere woning bestaat de NHG-seniorenregeling. Is er sprake van gelijkblijvende of lagere woonlasten ná een verhuizing? Dan mag de hypotheekaanbieder bij een hypotheek met NHG rekenen met de werkelijke woonlasten. Hierdoor kunt u vaak meer lenen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                In 2026 geldt NHG voor woningen tot €470.000. De eenmalige borgtochtprovisie is 0,4% van het hypotheekbedrag.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De NHG-seniorenregeling kan uitkomst bieden als:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mt-4">
                {listItem56("u verhuist naar een kleinere of goedkopere woning")}
                {listItem56("uw nieuwe woonlasten gelijk zijn aan of lager zijn dan uw huidige woonlasten")}
                {listItem56("uw inkomen op basis van de standaard pensioentoets te laag uitvalt")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mt-4">
                Nieuwe NHG-regel 2026 — inkomen tussen AOW en pensioendatum: vanaf 2026 biedt NHG ruimte om het werk- of ondernemersinkomen voor de periode tot de daadwerkelijke pensioendatum mee te nemen bij de toetsing. Inkomen tussen de AOW-leeftijd en de daadwerkelijke start van het pensioen mag worden meegenomen bij de toetsing voor de maximale hypotheek.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Overwaarde gebruiken</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Veel 56-plussers hebben aanzienlijke overwaarde opgebouwd — de woning is meer waard dan de resterende hypotheekschuld.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Die overwaarde kan op verschillende manieren worden ingezet:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem56("Bij verhuizing: de overwaarde van de huidige woning kunt u inbrengen bij de aankoop van een nieuwe woning — waardoor u minder hoeft te lenen en de hypotheektoets makkelijker doorkomt.")}
                {listItem56("Verbouwen of aanpassen: overwaarde kan via een hypotheekverhoging worden benut voor woningaanpassingen — gelijkvloers maken, slaapkamer beneden, aanpassingen voor mobiliteit.")}
                {listItem56("Opeethypotheek: wilt u uw overwaarde gebruiken maar heeft u weinig pensioeninkomen? Dan kan een opeethypotheek uitkomst bieden. U krijgt een bedrag of maandelijkse uitkering zonder dat u hoeft af te lossen — de rente wordt opgeteld bij uw hypotheekschuld. Let op: uw hypotheekschuld groeit en dat kan gevolgen hebben voor uw erfenis of toeslagen. Laat u hierover goed adviseren.")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Verhuizen naar een passende woning</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Veel 56-plussers overwegen te verhuizen naar een woning die beter past bij de volgende levensfase. Denk aan:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem56("een gelijkvloerse woning")}
                {listItem56("een kleinere woning met lagere lasten")}
                {listItem56("een woning dichter bij voorzieningen of familie")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Een kleinere of goedkopere woning kan de hypotheektoets juist vergemakkelijken — omdat de benodigde lening lager is en de woonlasten dalen. Aandachtspunt: hoewel u uw bestaande hypotheek mag houden ook na uw pensioen, kan het afsluiten van een nieuwe hypotheek lastiger zijn door de lagere inkomenstoets. U kunt soms vastlopen in uw huidige woning.
                Bespreek uw plannen daarom tijdig met een adviseur — liefst ruim vóór uw 57e.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Welk inkomen telt mee bij de hypotheektoets?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Geldverstrekkers kijken bij 57-plussers naar meerdere inkomstenbronnen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem56("Inkomen uit loondienst tot de AOW-leeftijd")}
                {listItem56("AOW-uitkering")}
                {listItem56("Aanvullend pensioen uit pensioenfonds of verzekeraar")}
                {listItem56("Inkomen uit een eigen pensioenvoorziening zoals een uitkerende lijfrenteverzekering of bankspaarrekening — bij veel aanbieders kan dit worden meegenomen")}
                {listItem56("Inkomen uit vrij vermogen zoals spaargeld of beleggingen — bij zo'n 55% van de hypotheekverstrekkers wordt hier rekening mee gehouden.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Inkomen uit werk na uw pensioen telt meestal niet mee in de berekening — zelfs als u doorwerkt.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Afspraak maken</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bent u 56 jaar of ouder en denkt u na over een nieuwe woning, verhuizing of aanpassing van uw hypotheek? Bij Haruna brengen we uw mogelijkheden in kaart — inclusief de impact van de pensioentoets op uw specifieke situatie.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Houd er rekening mee dat het voor 57-plussers vaak duur is om een overlijdensrisicoverzekering af te sluiten. De premie wordt hoger naarmate u ouder wordt. Ook is de kans groter dat u door een medische geschiedenis te maken krijgt met een hogere premie of dat een verzekeraar u niet wil verzekeren.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Afspraak maken</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Bent u 56 jaar of ouder en denkt u na over een nieuwe woning, verhuizing of aanpassing van uw hypotheek? Bij Haruna brengen we uw mogelijkheden in kaart — inclusief de impact van de pensioentoets op uw specifieke situatie.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Plan een adviesgesprek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="faq-56-heading">
              <h2 id="faq-56-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over een hypotheek voor 56-plussers
              </h2>
              <ArticleFaqAccordion items={HUIS_KOPEN_56_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over hypotheken</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Bereken uw maximale hypotheek, vergelijk rentestanden en plan een vrijblijvend gesprek.
              </p>
              <Link href="/hypotheken" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar hypotheken
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Bent u 56 jaar of ouder en denkt u na over een nieuwe woning, verhuizing of aanpassing van uw hypotheek? Bij Haruna brengen we uw mogelijkheden in kaart — inclusief de impact van de pensioentoets op uw specifieke situatie.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Annuïtair vs. lineair aflossen
  if (slug === "annuitair-vs-lineair-aflossen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemAL = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const annuitairLineairFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ANNUITAIR_LINEAIR_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(annuitairLineairFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Annuïtair of lineair aflossen</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Hypotheken</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Annuïtair of lineair aflossen 2026 — Verschil, rekenvoorbeeld en welke past bij u
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-[15px] text-nbg-blue/70">
                {article?.date && <time>{article.date}</time>}
                <span className="w-1.5 h-1.5 rounded-full bg-nbg-light-gray" aria-hidden />
                <span>Annuïtair of lineair aflossen</span>
              </div>
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Sluit u een hypotheek af dan kiest u bijna altijd tussen twee aflosvormen: de annuïteitenhypotheek en de lineaire hypotheek. Beide lossen uw hypotheek volledig af binnen 30 jaar en geven recht op hypotheekrenteaftrek.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Het verschil tussen annuïtair en lineair aflossen"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Het verschil zit in hoe uw maandlasten zich gedurende de looptijd ontwikkelen — en dat verschil heeft grote invloed op uw maandelijkse budget, zowel nu als later.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Hoe werkt een annuïteitenhypotheek?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Hoe werkt een lineaire hypotheek?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Rekenvoorbeeld en het verschil
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Hypotheekrenteaftrek bij beide vormen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Welke hypotheekvorm past bij u
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Hoe werkt een annuïteitenhypotheek?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een annuïteitenhypotheek betaalt u elke maand een vast bruto bedrag. Dat bedrag bestaat uit rente en aflossing, maar de verhouding verandert gedurende de looptijd.
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("In het begin betaalt u vooral rente en weinig aflossing")}
                {listItemAL("Naarmate de hypotheek loopt betaalt u steeds meer aflossing en minder rente")}
                {listItemAL("Het bruto maandbedrag blijft gedurende de rentevaste periode gelijk")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Hoe werkt een lineaire hypotheek?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een lineaire hypotheek lost u elke maand een vast bedrag af op de hypotheekschuld. Bovenop die vaste aflossing betaalt u rente over de openstaande schuld.
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("De aflossing per maand is altijd gelijk")}
                {listItemAL("Omdat de schuld maandelijks daalt, betaalt u steeds minder rente")}
                {listItemAL("Zowel uw bruto als netto maandlasten dalen gedurende de looptijd")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Rekenvoorbeeld en het verschil</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Rekenvoorbeeld — €300.000 hypotheek, 4% rente, 30 jaar:
                Dit is een vereenvoudigd rekenvoorbeeld ter illustratie. Actuele rentes en uw persoonlijke situatie bepalen de werkelijke maandlasten.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <h4 className="text-nbg-blue font-semibold text-base m-0 mb-2">Annuïteitenhypotheek</h4>
                  <ul className="space-y-1.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Vaste bruto maandlast: circa €1.432
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Eerste maand: circa €1.000 rente + €432 aflossing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Na 15 jaar: circa €716 rente + €716 aflossing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Bruto maandlast blijft gelijk gedurende de rentevaste periode
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <h4 className="text-nbg-blue font-semibold text-base m-0 mb-2">Lineaire hypotheek</h4>
                  <ul className="space-y-1.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Vaste maandelijkse aflossing: €833 (€300.000 / 360 maanden)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Eerste maand: €833 aflossing + €1.000 rente = circa €1.833 totaal
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Na 15 jaar: €833 aflossing + circa €500 rente = circa €1.333 totaal
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Maandlasten dalen elke maand
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Totale rentelasten over 30 jaar:
                Bij een lineaire hypotheek betaalt u over de gehele looptijd minder rente — omdat u sneller aflost en de schuld dus sneller daalt. Bij een annuïteitenhypotheek betaalt u in totaal meer rente maar heeft u lagere maandlasten in de beginjaren.
              </p>

              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-3">Het verschil samengevat:</p>
              <div className="overflow-hidden rounded-xl border border-nbg-light-gray/50 bg-white">
                <div className="grid grid-cols-2 gap-0">
                  <div className="p-4 border-r border-nbg-light-gray/50">
                    <ul className="space-y-2 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                      <li>Bruto maandlast: gelijk gedurende rentevaste periode</li>
                      <li>Maandlasten begin: lager</li>
                      <li>Maandlasten einde: gelijk (bruto)</li>
                      <li>Totale rentelasten: hoger</li>
                      <li>Snelheid aflossing: Langzamer in begin</li>
                    </ul>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                      <li>Bruto maandlast: daalt elke maand</li>
                      <li>Maandlasten begin: hoger</li>
                      <li>Maandlasten einde: aanzienlijk lager</li>
                      <li>Totale rentelasten: lager</li>
                      <li>Snelheid aflossing: Sneller vanaf dag één</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Voor- en nadelen van een annuïteitenhypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een voordeel van annuïteiten vergeleken met lineair zijn de lagere netto maandlasten aan het begin van de looptijd. Dat komt doordat u in het begin meer rente betaalt en die rente mag u aftrekken van uw inkomen. Later stijgen uw netto maandlasten, omdat u minder renteaftrek heeft. Uw bruto maandlasten blijven wel gelijk.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Voordelen:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("Lagere netto maandlasten aan het begin van de looptijd")}
                {listItemAL("Bruto maandlasten blijven (globaal) gelijk in de rentevaste periode")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Aandachtspunten:</p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemAL("Netto maandlasten stijgen later door afnemende renteaftrek")}
                {listItemAL("In totaal betaalt u meestal meer rente dan bij een lineaire hypotheek")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Voor- en nadelen van een lineaire hypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een lineaire hypotheek betaalt u aan het begin hogere maandlasten. Doordat de hypotheekschuld sneller afneemt, dalen uw maandlasten daarna elke maand.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Voordelen:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("U lost sneller af op uw hypotheek")}
                {listItemAL("Totale rentelasten zijn vaak lager")}
                {listItemAL("Maandlasten dalen gedurende de looptijd")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Aandachtspunten:</p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemAL("Hogere maandlasten aan het begin")}
                {listItemAL("Niet altijd passend wanneer uw budget in de eerste jaren beperkt is")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Hypotheekrenteaftrek bij beide vormen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Beide hypotheekvormen geven recht op hypotheekrenteaftrek — maar de werking verschilt.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een annuïteitenhypotheek zijn uw netto maandlasten in het begin laag omdat u veel rente betaalt en die volledig kunt aftrekken. Uw bruto maandlasten blijven gelijk, maar uw netto maandlasten stijgen omdat u jaar na jaar minder rente betaalt en dus minder kunt aftrekken.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een lineaire hypotheek dalen zowel uw bruto als netto maandlasten gedurende de looptijd — u betaalt steeds minder rente en heeft dus ook steeds minder aftrek.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Hypotheekrenteaftrek is maximaal 30 jaar van toepassing — voor nieuwe hypotheken alleen bij de annuïteiten- of lineaire hypotheekvorm.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Welke hypotheekvorm past bij u?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Er is geen objectief beste keuze — het hangt af van uw situatie, inkomen en toekomstplannen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Annuïteitenhypotheek kan passen als:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("U lagere maandlasten aan het begin belangrijk vindt")}
                {listItemAL("U starter bent en verwacht dat uw inkomen de komende jaren stijgt")}
                {listItemAL("U overzichtelijke en voorspelbare bruto maandlasten prettig vindt")}
                {listItemAL("Uw budget in de eerste jaren beperkt is")}
              </ul>

              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Lineaire hypotheek kan passen als:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("U de hogere beginlasten comfortabel kunt dragen")}
                {listItemAL("U sneller wilt aflossen en minder totale rente wilt betalen")}
                {listItemAL("U over een aantal jaar met pensioen gaat of hogere vaste lasten verwacht, zoals kinderopvang of studiekosten — de dalende maandlast kan dan aantrekkelijk zijn.")}
                {listItemAL("U later wilt doorstromen naar een groter huis en overwaarde wilt opbouwen")}
              </ul>

              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Combinatie mogelijk:</p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Soms is een combinatie van beide vormen een goede oplossing. U kunt bijvoorbeeld een deel annuïtair en een deel lineair aflossen. Dit geeft flexibiliteit in uw maandlasten terwijl u toch sneller aflost op een deel van de schuld.
              </p>

              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Een nuance over totale kosten:</p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Of de lineaire hypotheek daadwerkelijk voordeliger is over de gehele looptijd hangt ook af van de inflatie. Bij een gemiddelde inflatie van zo'n 3% of hoger is de annuïteitenhypotheek iets voordeliger. Is de inflatie lager dan is de lineaire hypotheek goedkoper. Dit maakt het vergelijken op basis van totale rentelasten alleen onvoldoende — uw persoonlijke situatie en verwachtingen spelen een grotere rol.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Afspraak maken</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Twijfelt u tussen een annuïteitenhypotheek en een lineaire hypotheek? Bij Haruna berekenen we graag wat de maandlasten in uw specifieke situatie zijn en welke vorm aansluit bij uw inkomen en toekomstplannen.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Plan een adviesgesprek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="annuitair-lineair-faq-heading">
              <h2 id="annuitair-lineair-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over annuïtair en lineair aflossen
              </h2>
              <ArticleFaqAccordion items={ANNUITAIR_LINEAIR_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over hypotheken</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Bereken uw maximale hypotheek, vergelijk rentestanden en plan een vrijblijvend gesprek.
              </p>
              <Link href="/hypotheken" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar hypotheken
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Twijfelt u tussen een annuïteitenhypotheek en een lineaire hypotheek? Bij Haruna berekenen we graag wat de maandlasten in uw specifieke situatie zijn en welke vorm aansluit bij uw inkomen en toekomstplannen.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Aflossingsvrije hypotheek — nieuwe regels 2026
  if (slug === "aflossingsvrije-hypotheek-nieuwe-regels-2026") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemAf = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const aflossingsvrijFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: AFLOSSINGSVRIJE_HYPOTHEEK_2026_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aflossingsvrijFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Aflossingsvrije hypotheek — nieuwe regels 2026</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Hypotheken</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                {article?.title ??
                  "Aflossingsvrije hypotheek — nieuwe regels vanaf mei 2026: wat betekent dit voor u?"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-[15px] text-nbg-blue/70">
                {article?.date && <time>{article.date}</time>}
                <span className="w-1.5 h-1.5 rounded-full bg-nbg-light-gray" aria-hidden />
                <span>Aflossingsvrije hypotheek</span>
              </div>
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Meerdere grote geldverstrekkers scherpen per mei en juni 2026 hun regels voor het aflossingsvrije deel
                aan — van 50% naar 30% van de woningwaarde, met bank-specifieke plafonds. In dit artikel leest u wat er
                verandert, bij welke banken, en wanneer het wél en niet voor u geldt.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Aflossingsvrije hypotheek en nieuwe regels bij banken in 2026"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Heeft u een aflossingsvrije hypotheek of overweegt u er een? Dan is er actueel nieuws dat voor u relevant
                kan zijn. Meerdere grote geldverstrekkers scherpen per mei en juni 2026 hun regels aan. Het maximale
                aflossingsvrije deel wordt bij deze banken teruggebracht van 50% naar 30% van de woningwaarde.
              </p>
              <p>
                Twee op de drie mensen met een aflossingsvrije hypotheek weet dit nog niet. In dit artikel leest u
                precies wat er verandert, bij welke banken, en — belangrijk — wanneer het wel en niet voor u geldt.
              </p>
              <p>
                De informatie is gebaseerd op bankaankondigingen en gangbare interpretaties in april 2026. Voor uw
                concrete aanvraag gelden altijd de actuele voorwaarden van uw geldverstrekker. Bij Haruna kijken we
                graag met u mee.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wat is een aflossingsvrije hypotheek?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wat verandert er per bank (Rabobank, ASN, ABN AMRO en meer)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wanneer gelden de nieuwe regels wel en niet voor u
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Nuance, rekenvoorbeelden en wat u nu kunt doen
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat is een aflossingsvrije hypotheek?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een aflossingsvrije hypotheek betaalt u tijdens de looptijd alleen rente — u lost de schuld niet
                maandelijks af. Aan het einde van de looptijd staat de volledige schuld nog open en moet deze worden
                terugbetaald, doorgaans bij verkoop van de woning of via herfinanciering.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De aflossingsvrije hypotheek is populair vanwege de lage maandlasten. Tegelijk zien toezichthouders zoals
                De Nederlandsche Bank en de AFM de hypotheekvorm als risicovol — met name wanneer het inkomen daalt na
                pensionering of wanneer de woningwaarde onder de hypotheekschuld zakt.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De aflossingsvrije hypotheek beslaat nog altijd circa 45% van de totale hypotheekschuld in Nederland. Een
                aanzienlijk deel van deze hypotheken loopt af tussen 2035 en 2052.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat verandert er precies — per bank</h2>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">Rabobank en Obvion — vanaf 11 mei 2026</h3>
              <ul className="space-y-2 list-none p-0 m-0 mb-6 text-nbg-blue/85 text-[17px] leading-relaxed">
                {listItemAf("Maximaal 30% van de woningwaarde aflossingsvrij")}
                {listItemAf("Maximum bedrag: €150.000")}
                {listItemAf("Tot nu toe was dit maximaal 50% van de woningwaarde")}
              </ul>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">ASN Bank — vanaf 11 mei 2026</h3>
              <ul className="space-y-2 list-none p-0 m-0 mb-6 text-nbg-blue/85 text-[17px] leading-relaxed">
                {listItemAf("Maximaal 30% van de woningwaarde aflossingsvrij")}
                {listItemAf("Geen vast maximumbedrag — de 30%-grens is de primaire beperking")}
              </ul>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">ABN AMRO en Florius — vanaf 1 juni 2026</h3>
              <ul className="space-y-2 list-none p-0 m-0 mb-6 text-nbg-blue/85 text-[17px] leading-relaxed">
                {listItemAf("Maximaal 30% van de woningwaarde aflossingsvrij")}
                {listItemAf("Maximum bedrag: €150.000 bij woningen tot €1.000.000")}
                {listItemAf("Maximum bedrag: €250.000 bij woningen tussen €1.000.000 en €2.000.000")}
                {listItemAf(
                  "Bestaande ABN AMRO-klanten mogen aan het einde van de looptijd nog steeds tot 50% van de woningwaarde aflossingsvrij herfinancieren"
                )}
              </ul>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Andere banken</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6 m-0">
                ING heeft nog geen vergelijkbare aankondiging gedaan. De verwachting in de markt is dat meer
                geldverstrekkers dit voorbeeld de komende tijd zullen volgen.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-3">Geverifieerde feiten (samenvatting)</h3>
              <div className="overflow-x-auto -mx-1 sm:mx-0">
                <table className="w-full min-w-[520px] text-left text-[15px] text-nbg-blue/85 border-collapse">
                  <caption className="sr-only">
                    Banken, ingangsdatum, maximaal percentage aflossingsvrij en maximaal bedrag
                  </caption>
                  <thead>
                    <tr className="border-b border-nbg-light-gray">
                      <th scope="col" className="py-2.5 pr-4 font-semibold text-nbg-blue align-bottom">
                        Bank
                      </th>
                      <th scope="col" className="py-2.5 pr-4 font-semibold text-nbg-blue align-bottom">
                        Datum
                      </th>
                      <th scope="col" className="py-2.5 pr-4 font-semibold text-nbg-blue align-bottom">
                        Max %
                      </th>
                      <th scope="col" className="py-2.5 font-semibold text-nbg-blue align-bottom">
                        Max bedrag
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-nbg-light-gray/70">
                      <td className="py-2.5 pr-4 align-top">Rabobank / Obvion</td>
                      <td className="py-2.5 pr-4 align-top">11 mei 2026</td>
                      <td className="py-2.5 pr-4 align-top">30%</td>
                      <td className="py-2.5 align-top">€150.000</td>
                    </tr>
                    <tr className="border-b border-nbg-light-gray/70">
                      <td className="py-2.5 pr-4 align-top">ASN Bank</td>
                      <td className="py-2.5 pr-4 align-top">11 mei 2026</td>
                      <td className="py-2.5 pr-4 align-top">30%</td>
                      <td className="py-2.5 align-top">Geen vast bedrag</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 align-top">ABN AMRO / Florius</td>
                      <td className="py-2.5 pr-4 align-top">1 juni 2026</td>
                      <td className="py-2.5 pr-4 align-top">30%</td>
                      <td className="py-2.5 align-top">
                        €150.000 (woningen tot €1M) / €250.000 (€1M–€2M)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">
                Wanneer gelden de nieuwe regels voor u — en wanneer niet
              </h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dit is het meest praktische punt en waar veel verwarring over bestaat.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">De nieuwe regels gelden bij:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-6">
                {listItemAf("Het afsluiten van een nieuwe aflossingsvrije hypotheek")}
                {listItemAf("Het oversluiten van uw bestaande hypotheek")}
                {listItemAf("Het verhogen van uw hypotheek")}
                {listItemAf("Verhuizen naar een nieuwe woning")}
                {listItemAf("Andere inhoudelijke wijzigingen aan uw hypotheek")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">De nieuwe regels gelden niet bij:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAf(
                  "Een bestaande hypotheek waarbij u niets wijzigt — uw huidige hypotheek blijft gewoon doorlopen"
                )}
                {listItemAf(
                  "Het aflopen van uw rentevaste periode en het kiezen van een nieuwe rente — dit telt niet als inhoudelijke wijziging bij Rabobank"
                )}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Kortom: wie niets aanpast aan zijn hypotheek merkt niets van de nieuwe regels. Wie wil verhuizen,
                oversluiten of verhogen krijgt wel met de nieuwe regels te maken.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Is dit alarmerend — de nuance die erbij hoort</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De berichtgeving over deze wijziging klinkt alarmerend maar verdient nuance. Nederland heeft de afgelopen
                jaren een sterke stijging van woningprijzen gezien. Veel huiseigenaren met een aflossingsvrije hypotheek
                hebben daardoor aanzienlijke overwaarde opgebouwd — de woning is veel meer waard dan de openstaande
                schuld. In die situaties is het risico van een aflossingsvrije hypotheek in de praktijk beperkt.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">
                De nieuwe regels raken met name mensen die:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAf(
                  "Willen verhuizen naar een andere woning en daarbij een hoge aflossingsvrije hypotheek willen meenemen of afsluiten"
                )}
                {listItemAf("Hun hypotheek willen verhogen — bijvoorbeeld voor een verbouwing of verduurzaming")}
                {listItemAf("Hun hypotheek willen oversluiten naar een lagere rente bij een van de genoemde banken")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Voor mensen met veel overwaarde en een stabiele financiële situatie is de impact in veel gevallen
                beperkt. Toch is het verstandig om te weten of en hoe de nieuwe regels voor uw specifieke situatie gelden
                — zeker als u plannen heeft.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Rekenvoorbeeld — wat betekent 30% in de praktijk</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Ter illustratie — werkelijke situatie hangt af van uw woningwaarde en hypotheek.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <h4 className="text-nbg-blue font-semibold text-base m-0 mb-2">Woningwaarde €400.000</h4>
                  <ul className="space-y-1.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Oud maximum aflossingsvrij: 50% = €200.000
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Nieuw maximum: 30% = €120.000 — begrensd op €150.000 (hier is het percentage bepalend)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Verschil: €80.000 minder aflossingsvrij mogelijk
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <h4 className="text-nbg-blue font-semibold text-base m-0 mb-2">Woningwaarde €600.000</h4>
                  <ul className="space-y-1.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Oud maximum: 50% = €300.000
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Nieuw: 30% = €180.000 — maar met plafond €150.000 is het maximumbedrag bepalend
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-nbg-blue/85 text-[15px] leading-relaxed m-0">
                Bij Rabobank/Obvion geldt het <strong className="text-nbg-blue font-semibold">laagste</strong> van 30%
                van de waarde en €150.000. Bij ABN AMRO/Florius geldt het laagste van 30% en het passende
                maximumbedrag per woningwaardeband (€150.000 tot €1M, €250.000 tussen €1M en €2M). Controleer altijd uw
                offerte en voorwaarden.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat kunt u nu het beste doen?</h2>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">Heeft u al een aflossingsvrije hypotheek en verandert u niets?</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dan verandert er voor u niets. Uw bestaande hypotheek loopt gewoon door.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Heeft u plannen om te verhuizen, te verhogen of over te sluiten?</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dan is het verstandig om zo snel mogelijk uw situatie in kaart te brengen. Bij Rabobank geldt de nieuwe
                regel al per 11 mei — aanvragen moeten vóór 10 mei zijn ingediend om nog onder de oude voorwaarden te
                vallen.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Loopt uw rentevaste periode binnenkort af?</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Controleer bij uw geldverstrekker of het aflopen van de rentevaste periode als een inhoudelijke
                wijziging wordt beschouwd. Bij Rabobank is dit niet het geval — u behoudt uw huidige aflossingsvrije deel
                bij een renteherziening.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Heeft u twijfel of de nieuwe regels voor u gelden?</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Laat uw situatie doorlichten door een adviseur. Een korte check van uw hypotheek en plannen geeft
                direct duidelijkheid.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Aflossingsvrij en uw plannen</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u weten of verhuizen, verhogen of oversluiten onder de nieuwe bankregels valt — en wat dat voor
                    uw maandlasten betekent? Bij Haruna rekenen we het voor uw situatie uit.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Plan een adviesgesprek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="aflossingsvrij-faq-heading">
              <h2 id="aflossingsvrij-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen
              </h2>
              <ArticleFaqAccordion items={AFLOSSINGSVRIJE_HYPOTHEEK_2026_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over hypotheken</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Bereken uw maximale hypotheek, vergelijk rentestanden en plan een vrijblijvend gesprek.
              </p>
              <Link href="/hypotheken" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar hypotheken
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Overweegt u verhuizing, oversluiting of verhoging en wilt u weten hoe de nieuwe aflossingsvrije regels
                voor u uitpakken? Bij Haruna kijken we graag met u mee.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Welke verzekeringen heeft uw onderneming nodig?
  if (slug === "welke-verzekeringen-heeft-uw-onderneming-nodig") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemV = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const zakelijkeVerzekeringenFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ZAKELIJKE_VERZEKERINGEN_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(zakelijkeVerzekeringenFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Welke verzekeringen heeft uw onderneming nodig? 2026</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Verzekeringen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Welke verzekeringen heeft uw onderneming nodig? 2026 — Gids voor ondernemers
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-4">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Als ondernemer draagt u dagelijks risico&apos;s. Sommige zijn klein en goed zelf op te vangen — andere kunnen grote financiële gevolgen hebben voor uw bedrijf en uw privésituatie. Een goede verzekering dekt niet alles, maar beperkt de schade wanneer er iets misgaat.
              </p>
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Welke verzekeringen u nodig heeft hangt sterk af van uw branche, uw rechtsvorm, of u personeel heeft en welke risico&apos;s u zelf wilt dragen. Dit artikel geeft een overzicht van de meest voorkomende zakelijke verzekeringen en wanneer ze relevant zijn.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Zakelijke verzekeringen voor ondernemers — overzicht 2026"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over uw verzekeringen en financiële situatie, zodat u de beste keuzes kunt maken voor uzelf en uw gezin.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Zijn zakelijke verzekeringen verplicht — en welke uitzonderingen gelden?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  De belangrijkste zakelijke verzekeringen: van AVB tot rechtsbijstand
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Specifieke situaties: ZZP, werkgever met personeel, pand, digitale dienstverlening
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Checklist om uw risico&apos;s in kaart te brengen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wat kost een zakelijke verzekering? (globale premie-indicaties)
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Zijn zakelijke verzekeringen verplicht?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Voor de meeste ondernemers zijn er geen wettelijke verzekeringsplichten. Er zijn uitzonderingen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemV(
                  <>
                    In sommige sectoren en beroepen is een specifieke verzekering verplicht — bijvoorbeeld een beroepsaansprakelijkheidsverzekering voor advocaten, accountants, makelaars en financieel adviseurs
                  </>,
                )}
                {listItemV(
                  <>
                    Bij sommige opdrachtgevers of aanbestedingen is een AVB of beroepsaansprakelijkheidsverzekering verplicht om een opdracht te mogen uitvoeren
                  </>,
                )}
                {listItemV(
                  <>
                    Heeft u personeel in dienst? Dan geldt de wettelijke verplichting om werknemers te verzekeren tegen arbeidsongevallen en beroepsziekten in bepaalde situaties
                  </>,
                )}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Controleer altijd de specifieke eisen in uw sector of bij uw opdrachtgever.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">De belangrijkste zakelijke verzekeringen</h2>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">1. Bedrijfsaansprakelijkheidsverzekering (AVB)</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De AVB dekt schade aan personen of eigendommen van derden die uw onderneming veroorzaakt tijdens de bedrijfsvoering. Denk aan een klant die struikelt in uw winkel, schade aan een object tijdens werkzaamheden bij een opdrachtgever of letselschade door een medewerker.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                <strong className="text-nbg-blue">Geschikt voor:</strong> vrijwel alle ondernemers — zelfstandigen, MKB en bedrijven met personeel.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                <strong className="text-nbg-blue">Wat het dekt:</strong> schade aan personen of spullen van anderen waarvoor uw onderneming aansprakelijk is.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-8">
                <strong className="text-nbg-blue">Wat het niet dekt:</strong> schade door opzet, schade aan uw eigen eigendommen, beroepsfouten in advies of dienstverlening — daarvoor heeft u een beroepsaansprakelijkheidsverzekering nodig.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">2. Beroepsaansprakelijkheidsverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De beroepsaansprakelijkheidsverzekering dekt financiële schade die een klant lijdt door een fout, vergissing of nalatigheid in uw advies of dienstverlening. Dit is iets anders dan de AVB — de AVB dekt fysieke schade, de beroepsaansprakelijkheidsverzekering dekt financiële schade door beroepsfouten.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                <strong className="text-nbg-blue">Geschikt voor:</strong> ondernemers die advies geven of specialistische diensten leveren — consultants, adviseurs, architecten, IT-professionals, financieel dienstverleners en andere kenniswerkers.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-8">
                <strong className="text-nbg-blue">Belangrijk:</strong> in sommige beroepen is deze verzekering verplicht. Controleer of dit voor uw sector van toepassing is.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">3. Arbeidsongeschiktheidsverzekering (AOV)</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Als zelfstandige heeft u geen recht op een WIA-uitkering als u door ziekte of een ongeval niet meer kunt werken. Uw inkomen stopt — uw vaste lasten niet. Een AOV biedt een uitkering wanneer u langdurig arbeidsongeschikt bent.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                <strong className="text-nbg-blue">Geschikt voor:</strong> zelfstandigen en DGA&apos;s zonder werknemersverzekering.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2 font-medium text-nbg-blue">Aandachtspunten:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemV("De premie hangt af van uw leeftijd, beroep en het gewenste uitkeringsbedrag")}
                {listItemV("Er geldt doorgaans een wachttijd voordat de uitkering ingaat — veelvoorkomend zijn 14 dagen, 1 maand of 3 maanden")}
                {listItemV("Hoe langer de wachttijd, hoe lager de premie — maar hoe langer u zelf het inkomensverlies moet opvangen")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-8">
                Een AOV is voor veel zelfstandigen een van de belangrijkste verzekeringen om te overwegen.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">4. Bedrijfsschadeverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een bedrijfsschadeverzekering dekt gederfde inkomsten en doorlopende kosten wanneer uw bedrijf tijdelijk niet kan draaien door een gedekte gebeurtenis — brand, waterschade, storm of andere externe oorzaak.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Zonder bedrijfsschadeverzekering lopen uw vaste kosten — huur, leasetermijnen, salarissen — door terwijl uw omzet wegvalt. Afhankelijk van de sector kan dit een bedrijf snel in ernstige financiële problemen brengen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-8">
                <strong className="text-nbg-blue">Geschikt voor:</strong> ondernemers met een bedrijfspand, een winkel, een productieomgeving of andere fysieke locatie die essentieel is voor de bedrijfsvoering.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">5. Inventaris- en goederenverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dekt schade aan uw bedrijfsinventaris, machines, apparatuur of voorraad door brand, inbraak, waterschade of andere gedekte oorzaken. Vaak gecombineerd met een gebouwenverzekering als u eigenaar bent van het pand.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-8">
                <strong className="text-nbg-blue">Geschikt voor:</strong> ondernemers met waardevolle bedrijfsmiddelen, apparatuur of voorraad.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">6. Cyberverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Steeds meer bedrijven zijn afhankelijk van digitale systemen en slaan klantgegevens en bedrijfsinformatie online op. Een cyberincident — datalek, ransomware-aanval of digitale inbraak — kan leiden tot hoge kosten voor herstel, juridische aansprakelijkheid en reputatieschade.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">Een cyberverzekering kan dekking bieden voor:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemV("Kosten van forensisch onderzoek en herstel")}
                {listItemV("Aansprakelijkheid bij een datalek waarbij klantgegevens zijn gelekt")}
                {listItemV("Bedrijfsschade door systeemstoringen als gevolg van een cyberaanval")}
                {listItemV("Juridische kosten en meldingsverplichtingen onder de AVG")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-8">
                <strong className="text-nbg-blue">Geschikt voor:</strong> ondernemers die werken met klantgegevens, afhankelijk zijn van digitale systemen of gevoelige informatie verwerken.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">7. Rechtsbijstandverzekering voor ondernemers</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dekt juridische kosten bij geschillen — met klanten, leveranciers, medewerkers of de overheid. Juridische procedures zijn kostbaar en tijdrovend. Een rechtsbijstandverzekering geeft toegang tot juridisch advies en dekt proceskosten tot een afgesproken maximum.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                <strong className="text-nbg-blue">Geschikt voor:</strong> ondernemers die regelmatig contracten sluiten, personeel hebben of in een sector werken met een relatief hoog risico op geschillen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Specifieke situaties — wat heeft u extra nodig?</h2>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">Als ZZP&apos;er zonder personeel</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                De AOV is voor de meeste zelfstandigen de belangrijkste overweging — uw inkomen heeft geen vangnet als u uitvalt. Daarnaast is een AVB voor bijna elke ZZP&apos;er relevant. Werkt u als adviseur of kenniswerker? Voeg een beroepsaansprakelijkheidsverzekering toe.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Als werkgever met personeel</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                U heeft naast de bovenstaande verzekeringen ook te maken met werkgeversaansprakelijkheid — de verplichting om schade te vergoeden die werknemers lijden door bedrijfsongevallen of beroepsziekten. Een werkgeversaansprakelijkheidsverzekering (WEGAM) dekt dit risico.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Bij een bedrijfspand</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                Voeg een gebouwenverzekering, inventarisverzekering en bedrijfsschadeverzekering toe. Deze drie vormen samen een logisch basispakket voor ondernemers met een fysieke locatie.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Bij digitale dienstverlening</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Een cyberverzekering is voor IT-bedrijven, webshops en bedrijven die persoonsgegevens verwerken steeds relevanter — mede door de meldingsplicht bij datalekken onder de AVG.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Checklist — breng uw risico&apos;s in kaart</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Stel uzelf deze vragen voordat u keuzes maakt over uw verzekeringen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemV("Wat zijn de grootste financiële risico's voor mijn onderneming?")}
                {listItemV("Ben ik afhankelijk van mijn eigen inkomen — is er een vangnet als ik uitval?")}
                {listItemV("Werk ik met klantgegevens of gevoelige informatie?")}
                {listItemV("Heb ik een bedrijfspand of waardevolle bedrijfsmiddelen?")}
                {listItemV("Geef ik advies of lever ik diensten waarbij een fout financiële schade bij een klant kan veroorzaken?")}
                {listItemV("Heb ik personeel in dienst?")}
                {listItemV("Zijn er in mijn sector verplichte verzekeringen?")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Op basis van uw antwoorden kunt u met een adviseur bepalen welke verzekeringen voor uw situatie relevant zijn.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat kost een zakelijke verzekering?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De premie voor zakelijke verzekeringen varieert sterk afhankelijk van uw branche, omzet, aantal medewerkers en de gekozen dekking. Globale indicaties:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemV("AVB voor een ZZP'er: vanaf circa €150 per jaar")}
                {listItemV("Beroepsaansprakelijkheidsverzekering: sterk afhankelijk van branche en omzet — van circa €300 tot duizenden euro's per jaar")}
                {listItemV("AOV: sterk afhankelijk van leeftijd, beroep en gewenste uitkering — gemiddeld enkele honderden tot duizenden euro's per jaar")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Dit zijn indicaties — werkelijke premies kunnen sterk afwijken. Laat altijd offertes vergelijken op basis van uw specifieke situatie.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Inzicht in uw zakelijke verzekeringen</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u weten welke risico&apos;s er spelen binnen uw onderneming en welke verzekeringen daarbij mogelijk passen? Tijdens een vrijblijvend gesprek bekijken we samen uw situatie en bespreken we welke aandachtspunten relevant kunnen zijn voor uw bedrijf.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Plan een adviesgesprek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="zakelijke-verzekeringen-faq-heading">
              <h2 id="zakelijke-verzekeringen-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over verzekeringen voor ondernemers
              </h2>
              <ArticleFaqAccordion items={ZAKELIJKE_VERZEKERINGEN_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over verzekeringen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Zakelijk, particulier en verzekeringen bij uw hypotheek.
              </p>
              <Link href="/verzekeringen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar verzekeringen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Wilt u weten welke zakelijke verzekeringen bij uw onderneming passen? Bij Haruna kijken we graag met u mee en brengen we de opties in beeld.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Verzekeringen bij uw hypotheek
  if (slug === "verzekeringen-bij-uw-hypotheek") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemHyp = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const verzekeringenHypotheekFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: VERZEKERINGEN_BIJ_HYPOTHEEK_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(verzekeringenHypotheekFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Verzekeringen bij uw hypotheek 2026</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Verzekeringen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Verzekeringen bij uw hypotheek 2026 — overlijdensverzekeringen, spaarverzekering en wat past bij u
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-4">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Wanneer u een hypotheek afsluit of een bestaande hypotheek beoordeelt, komen er vaak ook verzekeringen kijken. Sommige zijn bedoeld om uw nabestaanden financieel te beschermen als u overlijdt. Andere waren vroeger standaard gekoppeld aan oudere hypotheekvormen en lopen soms nog bij mensen thuis door zonder dat ze er veel aandacht aan besteden.
              </p>
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Het is goed om te weten welke verzekeringen bij uw hypotheek horen, wat ze doen en of ze nog passen bij uw huidige situatie.
              </p>
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                In deze gids besteden we extra aandacht aan overlijdensverzekeringen (OVR), naast spaar- en beleggingsverzekeringen.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Verzekeringen bij uw hypotheek in 2026"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over uw situatie, zodat u de beste keuzes kunt maken.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Overlijdensverzekeringen (OVR): relevantie, verplichtingen en vormen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Spaarverzekering bij een hypotheek: overgangsrecht en aandachtspunten
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Beleggingsverzekering bij een hypotheek: risico en periodieke controle
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Woonlastenverzekering bij tijdelijk inkomensverlies
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Welke verzekering past bij uw situatie?
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">1. Overlijdensverzekeringen (OVR)</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een overlijdensrisicoverzekering keert een afgesproken bedrag uit als de verzekerde overlijdt binnen de looptijd van de polis. Bij een hypotheek wordt dit bedrag doorgaans gebruikt om de hypotheekschuld geheel of gedeeltelijk af te lossen — zodat de achterblijvende partner de woning kan behouden zonder de volledige hypotheeklasten alleen te hoeven dragen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium text-nbg-blue">
                Wanneer is een overlijdensverzekering relevant?
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-5">
                {listItemHyp("U samen met een partner een hypotheek heeft en één inkomen wegvalt bij overlijden")}
                {listItemHyp("U kinderen heeft en de woning wilt veiligstellen voor uw gezin")}
                {listItemHyp("Uw hypotheek hoog is ten opzichte van uw inkomen of de woningwaarde")}
                {listItemHyp("U een gezamenlijke hypotheek heeft afgesloten waarbij de ander de lasten niet alleen kan dragen")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium text-nbg-blue">
                Wanneer kan een overlijdensverzekering verplicht zijn?
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Sommige geldverstrekkers stellen een overlijdensverzekering als voorwaarde — met name wanneer de hypotheek relatief hoog is ten opzichte van de waarde van de woning of wanneer er zonder verzekering een onaanvaardbaar risico ontstaat voor de geldverstrekker. Of dit bij uw hypotheek speelt hangt af van de voorwaarden van uw geldverstrekker.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium text-nbg-blue">
                Vormen van een overlijdensverzekering:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemHyp("Gelijkblijvende overlijdensverzekering — het verzekerde bedrag blijft gelijk gedurende de gehele looptijd")}
                {listItemHyp("Dalende overlijdensverzekering — het verzekerde bedrag daalt mee met de hypotheekschuld. Goedkoper in premie en logisch bij een annuïteiten- of lineaire hypotheek waarbij de schuld maandelijks daalt")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                <strong className="text-nbg-blue">Premie:</strong> de premie hangt af van uw leeftijd, gezondheid, het verzekerde bedrag en de looptijd. Hoe jonger en gezonder u bent bij afsluiting, hoe lager de premie. Op latere leeftijd kan een overlijdensverzekering aanzienlijk duurder worden of in sommige gevallen moeilijker te verkrijgen zijn door medische beoordeling.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">2. Spaarverzekering bij een hypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij oudere hypotheekvormen — met name de spaarhypotheek — was een spaarverzekering standaard gekoppeld aan de hypotheek. Gedurende de looptijd werd er premie ingelegd die binnen de verzekering groeide tegen een gegarandeerd rentepercentage. Aan het einde van de looptijd werd het opgebouwde kapitaal gebruikt om de hypotheek af te lossen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium text-nbg-blue">
                Zijn spaarverzekeringen nog actueel?
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Nieuwe spaarhypotheken worden sinds de wijziging van de fiscale regels in 2013 nauwelijks meer afgesloten — voor nieuwe hypotheken geldt dat u alleen hypotheekrenteaftrek krijgt bij een annuïteiten- of lineaire hypotheek die volledig wordt afgelost. Spaarhypotheken met een gekoppelde spaarverzekering voldoen hier niet meer aan voor nieuwe gevallen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Veel mensen hebben echter nog een bestaande spaarverzekering lopen die vóór 2013 is afgesloten. Deze vallen vaak onder overgangsregelingen — de fiscale behandeling en de rechten die u heeft opgebouwd blijven in de meeste gevallen intact zolang u de polis niet aanpast.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium text-nbg-blue">
                Heeft u nog een spaarverzekering?
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3">
                Als u een bestaande spaarverzekering heeft is het verstandig om regelmatig te controleren:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemHyp("Of de opgebouwde waarde nog op koers ligt om aan het einde van de looptijd de hypotheek af te lossen")}
                {listItemHyp("Of de premie die u betaalt nog marktconform is")}
                {listItemHyp("Of de polis nog aansluit bij uw huidige situatie en toekomstplannen")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">3. Beleggingsverzekering bij een hypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een beleggingshypotheek — ook populair vóór 2013 — werd de premie (gedeeltelijk) belegd met als doel vermogen op te bouwen voor het aflossen van de hypotheek aan het einde van de looptijd.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Het verschil met een spaarverzekering is het risico: bij een spaarverzekering is het eindkapitaal doorgaans gegarandeerd, bij een beleggingsverzekering hangt het eindkapitaal af van de beleggingsresultaten. Dat kan meer opleveren maar ook minder — waardoor het eindkapitaal tekort kan schieten voor volledige aflossing.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium text-nbg-blue">
                Aandachtspunten bij een bestaande beleggingsverzekering:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemHyp("Controleer regelmatig of de verwachte eindwaarde nog voldoende is om de hypotheek af te lossen")}
                {listItemHyp("Kijk naar de kosten die in de polis worden ingehouden — historisch waren dit bij sommige producten hoge kosten die de opbouw significant vertraagden")}
                {listItemHyp("Overweeg met een adviseur of voortzetten, aanpassen of afkopen de meest passende keuze is voor uw situatie")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">4. Woonlastenverzekering</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een woonlastenverzekering — ook wel betalingsbeschermingsverzekering genoemd — keert gedurende een bepaalde periode uw hypotheeklasten uit als u door werkloosheid of arbeidsongeschiktheid tijdelijk niet kunt betalen. Dit is iets anders dan een overlijdensverzekering — die dekt overlijden, de woonlastenverzekering dekt tijdelijk inkomensverlies door leven.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium text-nbg-blue">
                Aandachtspunten:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemHyp("De dekking is doorgaans tijdelijk — maximaal 12 tot 24 maanden")}
                {listItemHyp("Er gelden wacht- en uitsluitingstermijnen")}
                {listItemHyp("De premie en voorwaarden verschillen sterk per aanbieder — vergelijk zorgvuldig")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Welke verzekering past bij uw situatie?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Er is geen standaardantwoord. Welke verzekeringen relevant zijn hangt af van:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemHyp("Heeft u een partner en/of kinderen die afhankelijk zijn van uw inkomen?")}
                {listItemHyp("Hoe hoog is uw hypotheek en hoe verhoudt die zich tot uw inkomen?")}
                {listItemHyp("Heeft u een financiële buffer die tijdelijk inkomensverlies kan opvangen?")}
                {listItemHyp("Heeft u nog een bestaande spaarverzekering of beleggingsverzekering lopen?")}
                {listItemHyp("Hoe lang loopt uw hypotheek nog?")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                <strong className="text-nbg-blue">Globale richtlijn:</strong> jonge stellen met kinderen en een hoge hypotheek hebben doorgaans het meeste baat bij een solide overlijdensverzekering. Alleenstaanden of mensen met een kleine hypotheek ten opzichte van hun vermogen hebben vaak minder behoefte aan uitgebreide dekking.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Heeft u nog een bestaande spaarverzekering of beleggingsverzekering? Laat deze dan periodiek doorlichten — de kans is reëel dat de opgebouwde waarde, de kosten of de dekking niet meer optimaal aansluit bij uw situatie.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Inzicht in verzekeringen bij uw hypotheek</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u weten welke verzekeringen bij uw hypotheek passen en of uw bestaande polis nog optimaal aansluit? Tijdens een vrijblijvend gesprek bekijken we samen uw situatie en brengen we uw opties helder in kaart.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Plan een adviesgesprek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="verzekeringen-hypotheek-faq-heading">
              <h2 id="verzekeringen-hypotheek-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over verzekeringen bij een hypotheek
              </h2>
              <ArticleFaqAccordion items={VERZEKERINGEN_BIJ_HYPOTHEEK_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over verzekeringen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Zakelijk, particulier en verzekeringen bij uw hypotheek.
              </p>
              <Link href="/verzekeringen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar verzekeringen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Wilt u weten welke verzekeringen bij uw hypotheek passen of een bestaande polis periodiek laten doorlichten? Bij Haruna kijken we graag met u mee.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Wat kunt u als particulier verzekeren?
  if (slug === "wat-kunt-u-als-particulier-verzekeren") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemPart = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const particuliereVerzekeringenFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PARTICULIERE_VERZEKERINGEN_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(particuliereVerzekeringenFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">
                  {article?.title ??
                    "Wat kunt u als particulier verzekeren? 2026 — Opstal, inboedel, AVP en auto uitgelegd"}
                </span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Verzekeringen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                {article?.title ??
                  "Wat kunt u als particulier verzekeren? 2026 — Opstal, inboedel, AVP en auto uitgelegd"}
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Welke particuliere verzekeringen heeft u nodig? Dit artikel zet opstal, inboedel, aansprakelijkheid,
                auto en reisverzekering op een rij — met een checklist en waar u op moet letten bij polisvoorwaarden
                en dekking.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Particuliere verzekeringen: opstal, inboedel, AVP, auto en reis"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Als particulier kunt u zich op verschillende manieren beschermen tegen financiële risico&apos;s.
                Schade aan uw woning, diefstal van uw inboedel, aansprakelijkheid voor schade bij anderen — het zijn
                situaties die u niet kunt voorspellen maar wel kunt voorbereiden.
              </p>
              <p>
                Welke verzekeringen voor u relevant zijn hangt af van uw woonsituatie, uw gezin, uw bezittingen en
                hoeveel risico u zelf kunt of wilt dragen. Dit artikel geeft een overzicht van de meest voorkomende
                particuliere verzekeringen en waar u op moet letten.
              </p>
              <p>
                De informatie is gebaseerd op gangbare polissen en marktpraktijk in 2026. Voorwaarden verschillen per
                aanbieder; controleer altijd uw polis. Bij Haruna adviseren wij u graag over uw situatie.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Opstalverzekering (woonhuis)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Inboedelverzekering
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Aansprakelijkheidsverzekering particulieren (AVP)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Autoverzekering (WA, WA+, allrisk)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Reisverzekering
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Overige particuliere verzekeringen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Checklist, pakketten en veelgestelde vragen
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">1. Opstalverzekering (woonhuisverzekering)</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een opstalverzekering dekt schade aan de vaste delen van uw woning — de muren, het dak, de vloeren, de
                installaties en bijgebouwen zoals een garage of schuur. Gedekt zijn doorgaans schades door brand,
                blikseminslag, storm, hagel, ontploffing en water.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">Verplicht bij een hypotheek</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Als u een hypotheek heeft is een opstalverzekering in vrijwel alle gevallen verplicht gesteld door de
                geldverstrekker. De woning dient als onderpand — de bank heeft er belang bij dat die verzekerd is.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Standaard of allrisk</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een standaard opstalverzekering bent u gedekt voor de oorzaken die expliciet in de polis staan
                vermeld. Bij een allrisk opstalverzekering bent u ook gedekt voor schade door eigen onachtzaamheid —
                zoals een gat in de muur of een gebroken ruit.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Waar u op moet letten</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemPart(
                  "Verzeker uw woning voor de herbouwwaarde — niet de marktwaarde. De herbouwwaarde is het bedrag dat nodig is om de woning opnieuw te bouwen bij totale schade. Dit wijkt doorgaans af van de verkoopwaarde."
                )}
                {listItemPart("Controleer of bijgebouwen, zonnepanelen en tuinmeubilair zijn meeverzekerd.")}
                {listItemPart(
                  "Kijk of buitengewone schadesoorten zoals overstroming of aardbeving aanvullende dekking vereisen."
                )}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">2. Inboedelverzekering</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een inboedelverzekering dekt schade aan uw persoonlijke bezittingen in de woning — meubels, elektronica,
                kleding, witgoed en andere huisraad. Typisch gedekte oorzaken zijn brand, inbraak, diefstal,
                waterschade door lekkage en storm.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">Verschil met de opstalverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De opstalverzekering dekt het gebouw zelf. De inboedelverzekering dekt wat er in het gebouw staat. U
                heeft beide nodig voor volledige dekking van uw woning en bezittingen.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Standaard of allrisk</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Net als bij de opstalverzekering geldt: een allrisk inboedelverzekering dekt ook schade door eigen
                onachtzaamheid — bijvoorbeeld omgevallen wijn op uw bank of een gevallen laptop.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Bijzondere bezittingen</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Sieraden, kunst, muziekinstrumenten of andere waardevolle objecten zijn soms niet of slechts tot een
                beperkt bedrag meeverzekerd onder een standaard inboedelverzekering. Controleer de polisvoorwaarden en
                vraag indien nodig om een aanvullende dekking voor waardevolle bezittingen.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Buitenhuisdekking</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Wilt u ook gedekt zijn voor schade aan uw bezittingen buiten de woning — een gestolen fiets, een kapotte
                telefoon onderweg — controleer dan of uw inboedelverzekering buitenhuisdekking bevat of dat u dit apart
                moet meeverzekeren.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">
                3. Aansprakelijkheidsverzekering particulieren (AVP)
              </h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De AVP beschermt u wanneer u onbedoeld schade veroorzaakt aan anderen of hun eigendommen.
                Aansprakelijkheidsschade kan snel oplopen — een gebroken been van een bezoeker, schade aan een auto of
                een kostbaar object.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">Voorbeelden van situaties die de AVP dekt</h3>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPart("Uw kind gooit per ongeluk een ruit in bij de buren")}
                {listItemPart("U veroorzaakt schade aan de woning van een vriend tijdens een klus")}
                {listItemPart("Uw hond bijt iemand")}
                {listItemPart("U botst met uw fiets tegen een voetganger")}
              </ul>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Wat de AVP niet dekt</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Opzettelijk veroorzaakte schade, schade met een motorvoertuig (daarvoor heeft u een autoverzekering
                nodig) en beroepsmatige aansprakelijkheid.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Premie</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De AVP is relatief goedkoop — doorgaans enkele tientallen euro&apos;s per jaar — terwijl de mogelijke
                schade die het dekt in de tienduizenden euro&apos;s kan lopen. Voor de meeste huishoudens is dit een van
                de meest kosteneffectieve verzekeringen om te hebben.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">4. Autoverzekering</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een autoverzekering is wettelijk verplicht voor elk gemotoriseerd voertuig dat op de openbare weg rijdt.
                Er zijn drie niveaus:
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">WA (wettelijke aansprakelijkheid)</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Verplichte minimale dekking. Dekt schade die u met uw auto veroorzaakt aan anderen — personen en
                eigendommen. Dekt geen schade aan uw eigen auto.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">WA+ of beperkt casco</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dekt naast WA ook schade aan uw eigen auto door een beperkt aantal oorzaken — brand, diefstal, storm,
                ruitbreuk en botsing met dieren.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Allrisk (volledig casco)</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dekt naast WA+ ook schade aan uw eigen auto door eigen schuld — aanrijdingen, rijden tegen een paal of
                vandalisme.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Welk niveau past bij u</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Een allrisk verzekering is doorgaans aan te raden voor nieuwe of relatief nieuwe auto&apos;s met een hoge
                waarde. Voor oudere auto&apos;s met een lage dagwaarde kan WA of WA+ kosteneffectiever zijn — de premie
                voor allrisk kan dan hoger zijn dan de waarde van de auto.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">5. Reisverzekering</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een reisverzekering dekt kosten die u maakt tijdens een reis door onverwachte gebeurtenissen — medische
                kosten in het buitenland, annulering, diefstal van bagage of vroegtijdige terugkeer.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">Doorlopend of per reis</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een doorlopende reisverzekering dekt alle reizen die u gedurende een jaar maakt tot een maximale
                reisduur per reis — doorgaans 60 of 90 dagen per reis. Voor mensen die meerdere keren per jaar op reis
                gaan is een doorlopende verzekering doorgaans goedkoper dan losse reisverzekeringen per reis.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Annuleringsverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een annuleringsverzekering is een aanvulling op de reisverzekering en dekt de kosten van een geboekte
                reis als u door ziekte, overlijden van een naaste of andere gedekte oorzaken niet kunt reizen. Sommige
                reisverzekeringen bevatten annuleringsdekking — controleer de polisvoorwaarden.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Medische dekking</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Controleer altijd of uw reisverzekering een hoge medische dekking biedt. Medische kosten in landen zoals
                de VS kunnen extreem hoog zijn. De Europese gezondheidskaart (EHIC) geeft toegang tot medische zorg in
                EU-landen maar dekt niet alle kosten en vervangt geen reisverzekering.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">6. Overige particuliere verzekeringen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Afhankelijk van uw situatie kunnen ook de volgende verzekeringen relevant zijn:
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2 mt-0">Rechtsbijstandverzekering particulieren</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dekt juridische kosten bij geschillen — met een werkgever, verhuurder, verkoper of verzekeraar. Geeft
                toegang tot juridisch advies en vergoedt proceskosten tot een afgesproken maximum.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Uitvaartverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dekt de kosten van een uitvaart. Kan worden afgesloten als natura- of geldverzekering. Naturapolissen
                verzekeren een uitvaart in natura — u krijgt de diensten, geen geld. Geldpolissen keren een bedrag uit
                dat de nabestaanden vrij kunnen besteden.
              </p>
              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Tandartsverzekering (aanvullende zorgverzekering)</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De basisverzekering dekt weinig tandheelkundige zorg. Een aanvullende zorgverzekering met
                tandartsdekking vergoedt reguliere controles en behandelingen tot een jaarlijks maximum.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Checklist — welke verzekeringen heeft u?</h2>
              <div className="overflow-x-auto -mx-1 sm:mx-0">
                <table className="w-full min-w-[520px] text-left text-[15px] text-nbg-blue/85 border-collapse">
                  <caption className="sr-only">Overzicht verzekeringen, verplichting en aanbeveling</caption>
                  <thead>
                    <tr className="border-b border-nbg-light-gray">
                      <th scope="col" className="py-2.5 pr-4 font-semibold text-nbg-blue align-bottom">
                        Verzekering
                      </th>
                      <th scope="col" className="py-2.5 pr-4 font-semibold text-nbg-blue align-bottom">
                        Verplicht?
                      </th>
                      <th scope="col" className="py-2.5 font-semibold text-nbg-blue align-bottom">
                        Aanbevolen voor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-nbg-light-gray/70">
                      <td className="py-2.5 pr-4 align-top">Opstal</td>
                      <td className="py-2.5 pr-4 align-top">Ja bij hypotheek</td>
                      <td className="py-2.5 align-top">Alle woningeigenaren</td>
                    </tr>
                    <tr className="border-b border-nbg-light-gray/70">
                      <td className="py-2.5 pr-4 align-top">Inboedel</td>
                      <td className="py-2.5 pr-4 align-top">Nee</td>
                      <td className="py-2.5 align-top">Vrijwel iedereen</td>
                    </tr>
                    <tr className="border-b border-nbg-light-gray/70">
                      <td className="py-2.5 pr-4 align-top">AVP</td>
                      <td className="py-2.5 pr-4 align-top">Nee</td>
                      <td className="py-2.5 align-top">Vrijwel iedereen</td>
                    </tr>
                    <tr className="border-b border-nbg-light-gray/70">
                      <td className="py-2.5 pr-4 align-top">Auto (minimaal WA)</td>
                      <td className="py-2.5 pr-4 align-top">Ja bij auto</td>
                      <td className="py-2.5 align-top">Alle automobilisten</td>
                    </tr>
                    <tr className="border-b border-nbg-light-gray/70">
                      <td className="py-2.5 pr-4 align-top">Reisverzekering</td>
                      <td className="py-2.5 pr-4 align-top">Nee</td>
                      <td className="py-2.5 align-top">Iedereen die op reis gaat</td>
                    </tr>
                    <tr className="border-b border-nbg-light-gray/70">
                      <td className="py-2.5 pr-4 align-top">Rechtsbijstand</td>
                      <td className="py-2.5 pr-4 align-top">Nee</td>
                      <td className="py-2.5 align-top">Mensen met verhoogd geschilsrisico</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 align-top">Uitvaart</td>
                      <td className="py-2.5 pr-4 align-top">Nee</td>
                      <td className="py-2.5 align-top">Persoonlijke keuze</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Pakketverzekering — alles in één</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Veel verzekeraars bieden een woonpakket aan waarbij opstal, inboedel en AVP worden gecombineerd. Dit is
                administratief eenvoudiger en biedt soms een premiekorting. Vergelijk altijd de dekking per onderdeel —
                een pakket kan goedkoper zijn maar ook beperkingen bevatten die losse polissen niet hebben.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Dekking die past bij uw huishouden</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u weten welke particuliere verzekeringen bij uw woning, gezin en vermogen passen — en waar u
                    op moet letten in polisvoorwaarden? Tijdens een vrijblijvend gesprek brengen we samen de opties in
                    kaart.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="particuliere-verzekeringen-faq-heading">
              <h2 id="particuliere-verzekeringen-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen
              </h2>
              <ArticleFaqAccordion items={PARTICULIERE_VERZEKERINGEN_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over verzekeringen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Zakelijk, particulier en verzekeringen bij uw hypotheek.
              </p>
              <Link href="/verzekeringen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar verzekeringen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Wilt u uw particuliere verzekeringen vergelijken, aanvullen of periodiek laten doorlichten? Bij Haruna
                kijken we graag met u mee.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Pensioen uitstellen: wat zijn de gevolgen?
  if (slug === "pensioen-uitstellen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemPen = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const pensioenUitstellenFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PENSIOEN_UITSTELLEN_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pensioenUitstellenFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Pensioen uitstellen: wat zijn de gevolgen in 2026?</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Pensioen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Pensioen uitstellen: wat zijn de gevolgen in 2026?
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Steeds meer mensen overwegen langer door te werken en hun pensioen uit te stellen. Soms uit financiële overweging, soms omdat het werk nog voldoening geeft. Maar pensioenuitstel heeft gevolgen — voor uw maandelijkse uitkering, uw belastingsituatie en soms ook voor uw partner. In dit artikel leest u wat de belangrijkste aandachtspunten zijn.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Pensioen uitstellen: wat zijn de gevolgen?"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in maart 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over uw pensioen- en financiële situatie, zodat u de beste keuzes kunt maken voor uzelf en uw organisatie.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat vindt u in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wat betekent pensioen uitstellen?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wat zijn de gevolgen voor uw pensioenuitkering?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Gevolgen voor uw AOW
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Fiscale gevolgen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Gevolgen voor uw partner
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat betekent pensioen uitstellen?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Pensioenuitstel betekent dat u uw pensioenuitkering later laat ingaan dan de datum die in uw pensioenregeling staat. U kunt uw ouderdomspensioen uitstellen tot maximaal vijf jaar na uw AOW-ingangsdatum. De AOW-leeftijd in Nederland is in 2026 67 jaar.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Belangrijk om te weten: pensioenuitstel is iets anders dan eerder stoppen met werken. Dit artikel gaat over het uitstellen van uw pensioenuitkering, niet over vervroegd uittreden.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat zijn de gevolgen voor uw pensioenuitkering?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De gevolgen van uitstel hangen af van het type pensioen dat u heeft opgebouwd. Er zijn twee hoofdvormen:
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                <strong className="text-nbg-blue">1. Verzekerd pensioen (uitkering per jaar)</strong>
                <br />
                Heeft u een pensioen waarbij een vast bedrag per jaar is verzekerd? Dan wordt dit bedrag door uitstel hoger, omdat u het pensioen over een kortere periode ontvangt.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                <strong className="text-nbg-blue">2. Pensioenkapitaal</strong>
                <br />
                Met een pensioenkapitaal koopt u zelf een uitkering aan. Door uitstel kan het kapitaal op papier hoger worden — maar dat betekent niet automatisch een hogere uitkering. Het aankooptarief hangt af van de rente op het moment van aankoop en van de levensverwachting. Hoe lager de rente, hoe minder pensioen u kunt kopen met uw kapitaal.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Langere opbouw maar kortere uitkeringsperiode: door langer te werken bouwt u in veel regelingen extra pensioen op. Tegelijkertijd ontvangt u de uitkering over een kortere periode. In een rekenvoorbeeld waarbij iemand pensioen twee jaar uitstelt, kan de jaarlijkse uitkering hoger uitvallen. Tegelijkertijd loopt over de periode zonder uitkering een gemis op. Of uitstel financieel voordelig is, hangt daardoor sterk af van uw levensverwachting en persoonlijke situatie.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Gevolgen voor uw AOW</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De AOW-leeftijd in Nederland blijft in 2026 67 jaar.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De AOW-uitkering is gekoppeld aan uw leeftijd. U kunt uw AOW niet uitstellen op dezelfde manier als uw aanvullend pensioen. Uw aanvullend pensioen en uw AOW zijn twee verschillende regelingen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Fiscale gevolgen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een hogere pensioenuitkering betekent in veel gevallen ook een hogere belastingdruk in de uitkeringsfase.
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPen("Een hogere maandelijkse uitkering kan in een hogere belastingschijf vallen.")}
                {listItemPen("Een hoger inkomen kan invloed hebben op toeslagen zoals zorgtoeslag of huurtoeslag.")}
                {listItemPen("Bij lijfrente of aanvullend pensioen kunnen er in sommige situaties fiscale voordelen zijn bij uitstel — dit is sterk afhankelijk van uw persoonlijke situatie.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Omdat fiscale gevolgen per situatie sterk kunnen verschillen, is het verstandig dit te bespreken met een adviseur voordat u een beslissing neemt.
                <br />
                Bij Haruna kijken we graag met u mee.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wanneer kan pensioenuitstel zinvol zijn?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Uitstel kan overwogen worden als:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPen("U fit genoeg bent om langer door te werken en dat ook wilt.")}
                {listItemPen("Uw financiële situatie uitstel toelaat — u heeft geen uitkering nodig om uw vaste lasten te dekken.")}
                {listItemPen("U verwacht lang te leven en de hogere uitkering daardoor op termijn meer oplevert.")}
                {listItemPen("Uw pensioenregeling een duidelijk voordeel biedt bij uitstel.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Gevolgen voor uw partner: afhankelijk van uw pensioenregeling kan uitstel gevolgen hebben voor het partnerpensioen. Controleer dit altijd bij uw pensioenfonds of verzekeraar voordat u besluit uw pensioen uit te stellen.
              </p>
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-3">Wat kunt u doen?</h3>
              <ol className="space-y-2 list-decimal pl-6 text-nbg-blue/85 text-[17px] leading-relaxed">
                <li>Controleer via mijnpensioenoverzicht.nl welk type pensioen u heeft opgebouwd.</li>
                <li>Vraag bij uw pensioenfonds of verzekeraar op wat uitstel concreet betekent voor uw uitkering.</li>
                <li>Bespreek de fiscale en financiële gevolgen met een adviseur.</li>
                <li>Check of uitstel gevolgen heeft voor het partnerpensioen.</li>
              </ol>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Afspraak maken</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Overweegt u uw pensioen uit te stellen en wilt u weten wat dit betekent voor uw inkomsten, fiscale situatie en toekomstige levensstandaard? Bij Haruna kijken we graag met u mee.
                  </p>
                  <div className="mt-4 space-y-1.5">
                    <p className="m-0 text-white/95 text-[15px]">
                      <a href="tel:0786849331" className="hover:underline">
                        078 684 93 31
                      </a>
                    </p>
                    <p className="m-0 text-white/95 text-[15px]">
                      <a href="mailto:contact@haruna.nl" className="hover:underline">
                        contact@haruna.nl
                      </a>
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="pensioen-uitstellen-faq-heading">
              <h2 id="pensioen-uitstellen-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over pensioen uitstellen
              </h2>
              <ArticleFaqAccordion items={PENSIOEN_UITSTELLEN_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over pensioen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Pensioenadvies, werkgevers, ondernemers en pensionering.
              </p>
              <Link href="/pensioen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar pensioen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Overweegt u een persoonlijke lening of doorlopend krediet en wilt u weten wat dit voor u betekent? Bij Haruna kijken we graag met u mee.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Pensioen als ondernemer (DGA)
  if (slug === "pensioen-als-ondernemer-dga") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemDga = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const pensioenDgaFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PENSIOEN_ALS_ONDERNEMER_DGA_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pensioenDgaFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Pensioen als DGA 2026</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Pensioen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Pensioen als DGA 2026 — Mogelijkheden, ODV en lijfrente uitgelegd
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Als directeur-grootaandeelhouder valt u buiten de standaard werknemerspensioenregeling. U bouwt geen pensioen op via een pensioenfonds samen met uw werkgever — u bent zelf verantwoordelijk voor uw oudedagsvoorziening. Dat geeft vrijheid, maar vraagt ook om een bewuste keuze over hoe u dit organiseert.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Pensioen als ondernemer (DGA)"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Het opbouwen van pensioen in eigen beheer is per 1 april 2017 afgeschaft. Veel DGA&apos;s die vóór die datum pensioen in eigen beheer opbouwden, hebben sindsdien een oudedagsverplichting (ODV) op de balans staan. Voor nieuwe opbouw zijn er andere routes beschikbaar.
                <br />
                Dit artikel legt uit wat de huidige mogelijkheden zijn, wat de ODV inhoudt en waar u als DGA op moet letten.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Pensioen in eigen beheer — afgeschaft maar nog relevant
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  De oudedagsverplichting (ODV)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Huidige mogelijkheden voor pensioenopbouw als DGA
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Waarop let u bij de keuze?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Aandachtspunten voor bestaande situaties
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Pensioen in eigen beheer — afgeschaft maar nog relevant</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Tot 1 juli 2017 konden directeur-grootaandeelhouders via hun eigen pensioen-BV pensioenopbouw in eigen beheer
                organiseren. In veel gevallen betekende dit dat de uitkeringen werden gefinancierd vanuit de BV.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Het opbouwen van pensioen in eigen beheer is per 1 april 2017 afgeschaft. Bestaande pensioenrechten kunnen nog
                relevant blijven, maar er is geen nieuwe opbouw meer mogelijk via deze route.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">De oudedagsverplichting (ODV)</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                DGA&apos;s die vóór de afschaffing pensioen in eigen beheer opbouwden, hebben in veel gevallen een oudedagsverplichting (ODV) op de balans
                staan. De ODV groeit jaarlijks mee met het door de Belastingdienst gepubliceerde U-rendement.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">Belangrijke aandachtspunten bij een ODV:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemDga("Vanaf de AOW-leeftijd wordt de ODV uitgekeerd in 20 jaarlijkse, gelijke termijnen — tenzij u eerder omzet naar een lijfrente bij een verzekeraar.")}
                {listItemDga("Uitkeringen worden belast in box 1.")}
                {listItemDga("Controleer periodiek of de ODV correct is opgerent en of de waarde aansluit bij de balans.")}
                {listItemDga("De ODV kan gevolgen hebben voor uw partner bij scheiding of overlijden; leg afspraken daarom zorgvuldig vast.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Als de BV onvoldoende liquide middelen heeft om uitkeringen te doen wanneer ze ingaan, kan dat praktisch knelpunten geven. Dit is extra relevant als vermogen vastzit in vastgoed of deelnemingen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Huidige mogelijkheden voor pensioenopbouw als DGA</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                In 2026 bestaan er verschillende manieren om uw oudedagsvoorziening op te bouwen, met elk hun eigen fiscale en praktische aandachtspunten:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-6">
                {listItemDga("Lijfrente (fiscale opbouw) bij een bank, verzekeraar of andere aanbieder")}
                {listItemDga("Sparen en beleggen in de BV")}
                {listItemDga("Sparen en beleggen in privé")}
              </ul>

              <div className="space-y-6">
                <div>
                  <h3 className="text-nbg-blue text-xl font-bold mb-2">1. Lijfrente</h3>
                  <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                    Met jaarruimte (en eventueel reserveringsruimte) kunt u fiscaal aftrekbaar pensioen opbouwen via een lijfrente bij een verzekeraar of
                    banksparensysteem. De premie is aftrekbaar volgens de geldende rekenregels; de uitkering wordt later belast.
                  </p>
                </div>

                <div>
                  <h3 className="text-nbg-blue text-xl font-bold mb-2">2. Beleggen in de BV</h3>
                  <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                    Een praktische aanpak is om winst in de BV te laten staan en te beleggen. De BV betaalt vennootschapsbelasting over het rendement.
                    Het voordeel is flexibiliteit, maar het vermogen is niet automatisch specifiek geoormerkt als “pensioen” zoals bij een lijfrente.
                  </p>
                </div>

                <div>
                  <h3 className="text-nbg-blue text-xl font-bold mb-2">3. Pensioenregeling via een verzekeraar</h3>
                  <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                    In sommige situaties kan uw BV een pensioenregeling met een verzekeraar overeenkomen. Daarmee haalt u (een deel van) het pensioenrisico naar de verzekeraar,
                    maar u blijft afhankelijk van de voorwaarden van het product.
                  </p>
                </div>

                <div>
                  <h3 className="text-nbg-blue text-xl font-bold mb-2">4. Sparen en beleggen in privé</h3>
                  <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                    Vrij sparen en beleggen valt onder box 3. Dit is vaak maximaal flexibel, maar doorgaans minder fiscaal efficiënt dan fiscaal gefacilieerde pensioenopbouw.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Waarop let u bij de keuze?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De juiste route hangt af van uw doelen, uw situatie en de financiële positie van uw BV. Denk hierbij aan:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemDga("Hoe hoog is uw gewenste inkomen na pensionering?")}
                {listItemDga("Heeft u al vermogen opgebouwd in uw BV of privé?")}
                {listItemDga("Staat er nog een ODV op de balans van uw BV?")}
                {listItemDga("Wat is de liquiditeitspositie van uw BV?")}
                {listItemDga("Wat zijn uw wensen rond nabestaandenvoorziening?")}
                {listItemDga("Wat zijn de plannen voor uw onderneming — voortzetting, overdracht of verkoop?")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mt-4">
                Bij bedrijfsoverdracht of verkoop van de BV kan uw pensioenstructuur invloed hebben op de fiscale afrekening. Het is daarom belangrijk om pensioenplanning te koppelen aan uw bedrijfsstrategie.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Aandachtspunten voor bestaande situaties</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Heeft u vóór 2017 pensioen in eigen beheer opgebouwd? Dan ziet u vaak één van deze drie uitwerkingen in de praktijk:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemDga("De regeling is bevroren: de voorziening staat nog op de balans, maar er vindt geen verdere opbouw plaats. Controleer of de waarde en verplichtingen nog kloppen en of de BV voldoende liquiditeit heeft voor toekomstige uitkeringen.")}
                {listItemDga("De regeling is omgezet naar een ODV: de ODV groeit jaarlijks mee. Controleer jaarlijks of de balanswaarde aansluit en overweeg (met adviseur) of omzetting naar een lijfrente wenselijk is.")}
                {listItemDga("Er is (nog) geen duidelijke pensioentransitie: veel DGA&apos;s hebben wel vermogen in de BV of privé, maar missen een helder plan voor de omzetting naar inkomen. Dit vraagt om bewuste pensioenfinanciering.")}
              </ul>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Persoonlijk advies voor DGA&apos;s</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u inzicht in uw pensioenmogelijkheden als directeur-grootaandeelhouder? We bekijken samen welke pensioenroute het beste past bij uw BV en persoonlijke situatie, de mogelijkheden voor lijfrente of een verzekerde regeling, en de fiscale en juridische implicaties van uw keuzes.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="pensioen-dga-faq-heading">
              <h2 id="pensioen-dga-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over pensioen als DGA
              </h2>
              <ArticleFaqAccordion items={PENSIOEN_ALS_ONDERNEMER_DGA_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over pensioen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Pensioenadvies, werkgevers, ondernemers en pensionering.
              </p>
              <Link href="/pensioen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar pensioen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Wilt u weten wat dit voor uw situatie betekent? Plan een vrijblijvend adviesgesprek, dan
                kijken we samen wat past.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Pensioen voor werkgevers en werknemers
  if (slug === "pensioen-voor-werkgevers-en-werknemers") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemWg = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const pensioenWerkgeversFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PENSIOEN_VOOR_WERKGEVERS_EN_WERKNEMERS_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pensioenWerkgeversFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Pensioen voor werkgevers en werknemers 2026</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Pensioen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Pensioen voor werkgevers en werknemers 2026 — Wet toekomst pensioenen uitgelegd
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Pensioen is voor veel werknemers de op één na grootste financiële voorziening na de eigen woning. Voor werkgevers is een goede pensioenregeling een belangrijke arbeidsvoorwaarde — en steeds vaker ook een verantwoordelijkheid die nu concrete actie vraagt.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Pensioen voor werkgevers en werknemers"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De Wet toekomst pensioenen (Wtp) is op 1 juli 2023 ingegaan en is de grootste pensioenherziening in decennia. Uiterlijk 1 januari 2028 moeten oude pensioenregelingen zijn omgezet naar het nieuwe stelsel. Voor werkgevers met een regeling bij een verzekeraar of premiepensioeninstelling geldt dat het transitieplan uiterlijk 1 oktober 2026 moet zijn ingediend.
              </p>
              <p>
                Dit artikel legt uit wat de nieuwe regels betekenen, welke collectieve regelingen er zijn en wat werkgevers en werknemers nu moeten weten.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  De Wet toekomst pensioenen: wat verandert er?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wat moet u als werkgever nu doen?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Collectieve pensioenregelingen: flexibele en solidaire premieregeling
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Communicatieplicht richting werknemers
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Fiscale aandachtspunten en impact voor werknemers
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">De Wet toekomst pensioenen — wat verandert er?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                In het nieuwe stelsel bouwen werknemers pensioen op via een premieregeling. Het oude systeem met eindloon- en middelloonregelingen verdwijnt. Het doel is meer transparantie over opbouw, risico&apos;s en verwachte uitkomst.
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemWg("Elke werknemer bouwt een persoonlijk pensioenvermogen op.")}
                {listItemWg("Pensioenen kunnen eerder stijgen bij goede resultaten, maar ook lager uitvallen bij tegenvallers.")}
                {listItemWg("Risico's en kosten blijven in belangrijke mate binnen het collectief gedeeld.")}
                {listItemWg("Nabestaandenpensioen wordt meer gestandaardiseerd tussen uitvoerders.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Volgens de Rijksoverheid zijn inmiddels veel regelingen overgezet, maar vooral bij kleinere werkgevers moeten nog trajecten worden afgerond. Daarom is tijdig starten belangrijk.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat moet u als werkgever nu doen?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De deadline van 1 januari 2028 lijkt ver weg, maar voorbereiding kost tijd. Werkgevers en werknemers leggen in een transitieplan vast hoe en wanneer de overstap plaatsvindt, en welke keuzes daarbij worden gemaakt.
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemWg("Controleer bij uw uitvoerder wanneer uw contract afloopt en wat de geplande overstapdatum is.")}
                {listItemWg("Bespreek de overgang met OR of personeelsvertegenwoordiging; zij hebben vaak instemmingsrecht.")}
                {listItemWg("Informeer werknemers tijdig over de impact op hun pensioenopbouw en verwachtingen.")}
                {listItemWg("Heeft u een regeling bij verzekeraar of PPI? Zorg dat het transitieplan uiterlijk 1 oktober 2026 gereed is.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Uitstel in de planning vergroot het risico op tijdsdruk, fouten in communicatie en ongewenste fiscale gevolgen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Collectieve pensioenregelingen — de twee hoofdvormen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Onder de Wet toekomst pensioenen zijn twee typen premieregeling mogelijk:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemWg("Flexibele premieregeling: deelnemer heeft een persoonlijk vermogen dat meer individueel wordt belegd.")}
                {listItemWg("Solidaire premieregeling: deelnemers hebben persoonlijk vermogen, maar risico's en resultaten worden meer collectief gedeeld.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Welke vorm passend is, hangt af van de grootte van uw organisatie, sectorafspraken en doelen van werkgever en werknemers.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Communicatie — uw wettelijke plicht</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Werkgevers hebben een actieve informatieplicht richting werknemers bij de overgang naar het nieuwe pensioenstelsel.
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemWg("Werknemers moeten tijdig en begrijpelijk worden geïnformeerd over de gevolgen van de overgang.")}
                {listItemWg("Jaarlijkse pensioenoverzichten blijven belangrijk; werknemers volgen opbouw via onder meer mijnpensioenoverzicht.nl.")}
                {listItemWg("Wijzigingen in salaris, uren of dienstverband moeten direct correct in de pensioenadministratie worden verwerkt.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Heldere communicatie verlaagt onzekerheid bij werknemers en helpt klachten of discussies achteraf te voorkomen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Fiscale aspecten en impact voor werknemers</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Pensioenpremies zijn onder voorwaarden fiscaal aftrekbaar voor werkgevers. Binnen het nieuwe stelsel blijven fiscale kaders en maxima van belang bij inrichting van de regeling.
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemWg("Pensioenopbouw levert fiscaal voordeel op doordat premie-inleg anders wordt belast dan directe uitbetaling.")}
                {listItemWg("Er geldt een maximaal pensioengevend salaris waarboven via de werkgever geen aanvullend pensioen wordt opgebouwd.")}
                {listItemWg("Niet tijdig overstappen kan fiscale en juridische risico's vergroten, met name bij verzekerde regelingen.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Voor werknemers betekent het nieuwe stelsel vooral meer inzicht en directere koppeling met beleggingsresultaten.
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemWg("U bouwt een persoonlijk pensioenvermogen op en ziet beter hoe de opbouw verloopt.")}
                {listItemWg("Pensioen kan eerder stijgen bij goede resultaten, maar ook dalen bij tegenvallers.")}
                {listItemWg("Pensioen blijft levenslang uitgekeerd; controleer bij uw uitvoerder wat dit concreet voor u betekent.")}
                {listItemWg("Nabestaandenpensioen wordt gestandaardiseerd; check de gevolgen voor uw partner.")}
              </ul>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Heeft u vragen over uw specifieke situatie?</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Elke pensioenregeling is anders. Bij Haruna kijken we graag met u mee — geen standaardadvies, maar een gesprek over wat in uw organisatie en voor uw werknemers past.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="pensioen-werkgevers-faq-heading">
              <h2 id="pensioen-werkgevers-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over pensioen voor werkgevers en werknemers
              </h2>
              <ArticleFaqAccordion items={PENSIOEN_VOOR_WERKGEVERS_EN_WERKNEMERS_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over pensioen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Pensioenadvies, werkgevers, ondernemers en pensionering.
              </p>
              <Link href="/pensioen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar pensioen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Wilt u weten wat dit voor uw situatie betekent? Plan een vrijblijvend adviesgesprek, dan
                kijken we samen wat past.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Zakelijke financiering
  if (slug === "zakelijke-financiering") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemFin = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const zakelijkeFinancieringFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ZAKELIJKE_FINANCIERING_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(zakelijkeFinancieringFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Zakelijke financiering 2026</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Financiering</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Zakelijke financiering 2026 — Mogelijkheden, voorwaarden en waar financiers naar kijken
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Een onderneming starten, investeren in groei of tijdelijk extra financiële ruimte creëren — veel ondernemers krijgen vroeg of laat te maken met een financieringsvraag. De keuze voor de juiste financieringsvorm heeft grote invloed op uw maandlasten, uw cashflow en de financiële positie van uw bedrijf op de lange termijn.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mt-4">
                In 2026 zijn er meer financieringsmogelijkheden dan ooit — van traditionele bankkredieten tot leasing, factoring en alternatieve financiers. Welke vorm het beste past hangt af van het doel van de financiering, de omvang van uw bedrijf en uw financiële positie.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Zakelijke financiering voor ondernemers"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/80 py-4 px-5 mb-6">
              <p className="text-nbg-blue text-[17px] font-semibold m-0">
                Let op: geld lenen kost geld.
              </p>
            </div>

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in maart 2026. Voor uw persoonlijke of zakelijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over zakelijke financiering, zodat u een weloverwogen keuze kunt maken voordat u een financiële verplichting aangaat.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wanneer heeft een ondernemer zakelijke financiering nodig?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Zakelijke financieringsvormen: banklening, rekening-courant en leasing
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Factoring, bedrijfshypotheek en BMKB
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Waar financiers naar kijken bij een kredietaanvraag
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Rekenvoorbeeld — wat kost een zakelijke lening?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Waar u op moet letten voordat u een financiering afsluit
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Veelgestelde vragen (FAQ)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Afspraak maken met Haruna
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wanneer heeft een ondernemer zakelijke financiering nodig?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Zakelijke financiering kan een rol spelen in verschillende fases van uw onderneming:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemFin("Opstarten van een bedrijf — startkapitaal voor de eerste maanden")}
                {listItemFin("Investeren in bedrijfsmiddelen — machines, apparatuur, voertuigen")}
                {listItemFin("Aankopen of verbouwen van een bedrijfspand")}
                {listItemFin("Overbruggen van tijdelijke liquiditeitstekorten — seizoensschommelingen of late betalingen van debiteuren")}
                {listItemFin("Financieren van groei — uitbreiding van personeel, nieuwe vestigingen, technologie")}
                {listItemFin("Bedrijfsovername — financiering voor het overnemen van een bestaand bedrijf")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mt-4 m-0">
                Elke situatie vraagt om een andere aanpak. De financieringsvorm die past bij een eenmalige investering in een machine verschilt van de financiering die u nodig heeft voor werkkapitaal.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">1. Zakelijke banklening</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De meest bekende vorm van zakelijke financiering. U leent een vast bedrag bij een bank en betaalt dit in termijnen terug met rente.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">Kenmerken:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemFin("Vaste looptijd — doorgaans 5 tot 10 jaar voor investeringen, korter voor werkkapitaal")}
                {listItemFin("Vaste of variabele rente — in 2026 liggen de rentes bij traditionele banken globaal tussen 4% en 9% per jaar afhankelijk van uw risicoprofiel en het type lening")}
                {listItemFin("Maandelijkse aflossing — lineair of annuïtair")}
                {listItemFin("Zekerheden — banken vragen regelmatig om onderpand zoals pandrecht op bedrijfsmiddelen, een persoonlijke borgstelling of hypotheek op bedrijfsvastgoed")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Banken stellen in de regel striktere eisen dan alternatieve financiers maar bieden doorgaans lagere rentes. De beoordeling kan weken duren.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">2. Rekening-courant krediet</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een rekening-courant krediet geeft uw onderneming financiële flexibiliteit. U spreekt met de bank een kredietlimiet af waarbinnen u tijdelijk rood kunt staan op uw zakelijke rekening.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">Kenmerken:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemFin("U betaalt alleen rente over het bedrag dat u daadwerkelijk gebruikt")}
                {listItemFin("Flexibel opnemen en terugbetalen binnen de afgesproken limiet")}
                {listItemFin("Geschikt voor het opvangen van tijdelijke cashflowtekorten, voorraadfinanciering of seizoensschommelingen")}
                {listItemFin("Kan duurder zijn dan een reguliere lening wanneer het langdurig en structureel wordt gebruikt")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                U betaalt dus alleen voor het deel dat u op dat moment gebruikt — maar houd rekening met de kosten wanneer u het krediet langere tijd nodig heeft.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">3. Financial lease en operational lease</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Voor bedrijfsmiddelen zoals voertuigen, machines of apparatuur kiezen veel ondernemers voor leasing in plaats van een directe aankoop.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij financial lease betaalt u het object in termijnen af en wordt u aan het einde van de looptijd eigenaar. De investering staat op uw balans en u kunt afschrijven.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij operational lease blijft de leasemaatschappij eigenaar. U betaalt een vast maandbedrag voor gebruik — onderhoud, verzekering en soms vervanging zijn daarin inbegrepen. U wordt geen eigenaar maar heeft geen risico op restwaarde.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Leasing kan aantrekkelijk zijn wanneer u wilt investeren zonder direct een groot bedrag uit eigen middelen te gebruiken en wanneer voorspelbare maandlasten belangrijk zijn.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">4. Factoring en debiteurenfinanciering</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij factoring verkoopt u uw openstaande facturen aan een factoringmaatschappij. U ontvangt direct een groot deel van het factuurbedrag — de factoringmaatschappij int vervolgens de vordering bij uw klant.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">Factoring is met name geschikt voor:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemFin("Bedrijven met lange betalingstermijnen van debiteuren")}
                {listItemFin("Ondernemingen die snel liquide middelen nodig hebben zonder een lening af te sluiten")}
                {listItemFin("Bedrijven met een grote debiteurenportefeuille")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De kosten van factoring — een percentage van de factuurwaarde — zijn doorgaans hoger dan een reguliere lening, maar de snelheid en liquiditeitsverbetering kunnen dit rechtvaardigen.
              </p>

              <h3 className="text-nbg-blue text-lg font-bold mt-6 mb-2">5. Bedrijfshypotheek</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-4">
                Wilt u een bedrijfspand kopen of verbouwen? Dan is een bedrijfshypotheek de meest gangbare financieringsvorm. De looptijd van een zakelijke hypotheek ligt doorgaans tussen de 10 en 25 jaar. De rente is vaak lager dan bij een zakelijke lening, maar u stelt het pand als onderpand.
              </p>

              <h3 className="text-nbg-blue text-lg font-bold m-0 mb-2">6. BMKB — Borgstelling MKB Kredieten</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De BMKB is een overheidsregeling waarbij de overheid borg staat voor een deel van uw zakelijk krediet bij de bank. Dit verlaagt het risico voor de bank waardoor u in aanmerking kunt komen voor financiering die u anders misschien niet zou krijgen — of tegen betere voorwaarden. De BMKB wordt aangevraagd via uw bank en is bedoeld voor ondernemers in het midden- en kleinbedrijf die niet voldoende onderpand hebben voor een reguliere banklening.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Waar financiers naar kijken bij een kredietaanvraag</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Elke financier hanteert zijn eigen acceptatiecriteria, maar de volgende factoren spelen vrijwel altijd een rol:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemFin("Financiële cijfers — Omzet, winst, bestaande schulden en solvabiliteit. Een actuele en overzichtelijke administratie versnelt de beoordeling aanzienlijk. Zorg dat uw jaarrekeningen bijgewerkt zijn en dat u recente bankafschriften kunt overleggen.")}
                {listItemFin("Cashflow en liquiditeit — Kan uw onderneming de rente en aflossing betalen vanuit de lopende bedrijfsactiviteiten? Dit is voor de meeste financiers de belangrijkste vraag. Een realistische cashflowprognose is essentieel bij elke financieringsaanvraag.")}
                {listItemFin("Ondernemingsplan — Een duidelijke beschrijving van uw activiteiten, de investering waarvoor u financiering zoekt en realistische financiële prognoses. Banken willen in de meeste gevallen ook een worst-case scenario kunnen doorrekenen.")}
                {listItemFin("Zekerheden — Pandrecht op bedrijfsmiddelen, een persoonlijke borgstelling of een hypotheek op bedrijfsvastgoed. Hoe meer zekerheid u kunt bieden, hoe gunstiger de voorwaarden doorgaans zijn.")}
                {listItemFin("Ervaring van de ondernemer — Uw achtergrond, sectorervaring en track record spelen mee, zeker bij startende ondernemers of bij grote investeringen.")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Rekenvoorbeeld — wat kost een zakelijke lening?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dit is een vereenvoudigd rekenvoorbeeld ter illustratie. Werkelijke rentes en voorwaarden verschillen per financier en situatie.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een lening van €250.000 tegen 5% rente over een looptijd van 5 jaar betaalt u circa €32.000 aan totale rentelasten. Bij dezelfde lening tegen 10% rente stijgen de rentelasten naar circa €73.000. Het verschil van €41.000 laat zien waarom het vergelijken van financieringsvormen en rentes zo belangrijk is.
              </p>

              <h3 className="text-nbg-blue text-lg font-bold mt-6 mb-3">Waar u op moet letten voordat u een financiering afsluit:</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemFin("Totale kosten — kijk niet alleen naar de rente maar ook naar afsluitkosten, provisies en eventuele boetes bij vervroegd aflossen")}
                {listItemFin("Looptijd en maandlasten — passen de maandelijkse verplichtingen bij uw verwachte cashflow?")}
                {listItemFin("Flexibiliteit — kunt u extra aflossen of de lening aanpassen als uw situatie verandert?")}
                {listItemFin("Zekerheden — welke risico's gaat u aan als de onderneming tegenvalt?")}
                {listItemFin("Vergelijk minimaal drie aanbieders — voorwaarden en rentes kunnen aanzienlijk verschillen voor identieke aanvragen")}
                {listItemFin("Vergunning AFM — controleer of uw financier beschikt over een vergunning van de Autoriteit Financiële Markten")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mt-4 m-0">
                Dien uw aanvraag bij voorkeur in tijdens een stabiele fase van uw onderneming. Financiële druk tijdens de aanvraag beperkt uw onderhandelingsruimte.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Afspraak maken</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Heeft u een financieringsvraag voor uw onderneming en wilt u weten welke mogelijkheden bij uw situatie passen? Bij Haruna bespreken we graag uw plannen en brengen we de opties in beeld.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Plan een adviesgesprek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="zakelijke-financiering-faq-heading">
              <h2 id="zakelijke-financiering-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over zakelijke financiering
              </h2>
              <ArticleFaqAccordion items={ZAKELIJKE_FINANCIERING_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over financiering</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Zakelijke financiering, krediet en financieringsmogelijkheden voor ondernemers.
              </p>
              <Link href="/nieuws/financiering" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar alle artikelen Financiering
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Heeft u een financieringsvraag voor uw onderneming en wilt u weten welke mogelijkheden bij uw situatie passen? Bij Haruna bespreken we graag uw plannen en brengen we de opties in beeld.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Particuliere lening
  if (slug === "particuliere-lening") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemFin = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const particuliereLeningFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PARTICULIERE_LENING_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(particuliereLeningFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Particuliere lening 2026</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Financiering</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Particuliere lening 2026 — Rente, looptijd, APR en waar u op moet letten
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Een lening kan helpen bij een grote eenmalige uitgave — een verbouwing, een auto, een studie of onverwachte kosten. Tegelijk gaat u met een lening een financiële verplichting aan voor een langere periode. Een weloverwogen keuze voorkomt dat de lening u meer kost dan nodig — of dat u later in betaalproblemen komt.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mt-4">
                In dit artikel leest u waar u op moet letten voordat u een particuliere lening afsluit.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Particuliere lening: waar op letten"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/80 py-4 px-5 mb-6">
              <p className="text-nbg-blue text-[17px] font-semibold m-0">
                Let op: geld lenen kost geld.
              </p>
            </div>

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over particuliere financiering, zodat u een weloverwogen keuze kunt maken voordat u een financiële verplichting aangaat.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Rente en looptijd + rekenvoorbeeld
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Het effectieve jaarpercentage (APR)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Maandlasten en betaalbaarheid
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Kredietvormen: persoonlijke lening, doorlopend krediet, afbetaling
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  BKR-registratie en risico&apos;s van te veel lenen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Checklist voordat u een lening afsluit
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">1. Rente en looptijd — de twee belangrijkste variabelen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De rente bepaalt hoeveel u extra betaalt bovenop het geleende bedrag. Een hogere rente betekent hogere totale kosten. De looptijd bepaalt hoe lang u aflost en daarmee ook hoe hoog uw maandlasten zijn.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De combinatie van rente en looptijd bepaalt wat een lening u werkelijk kost:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-5">
                {listItemFin("Een langere looptijd geeft lagere maandlasten maar hogere totale rentekosten")}
                {listItemFin("Een kortere looptijd geeft hogere maandlasten maar lagere totale rentekosten")}
              </ul>

              <h3 className="text-nbg-blue text-lg font-bold m-0 mb-3">Rekenvoorbeeld ter illustratie</h3>
              <div className="rounded-xl border border-nbg-light-gray/60 bg-white p-5">
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-3">
                  Een lening van <strong>€15.000</strong> tegen <strong>7%</strong> rente:
                </p>
                <ul className="space-y-1 list-disc pl-6 text-nbg-blue/85 text-[16px] leading-relaxed m-0 mb-4">
                  <li>Bij 36 maanden: maandlast circa €463 — totale rente circa €1.668</li>
                  <li>Bij 60 maanden: maandlast circa €297 — totale rente circa €2.820</li>
                </ul>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                  Het verschil in totale rentekosten is ruim €1.150 — puur door de keuze voor een langere looptijd. Kijk daarom nooit alleen naar de maandlast maar altijd naar de totale kosten over de gehele looptijd.
                </p>
              </div>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">2. Het effectieve jaarpercentage (APR) — de eerlijke vergelijking</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Naast de nominale rente kunnen kredietverstrekkers andere kosten in rekening brengen — afsluitprovisie, administratiekosten of verplichte verzekeringen. Kredietverstrekkers zijn wettelijk verplicht het effectieve jaarpercentage — ook wel APR of jaarlijks kostenpercentage — te vermelden. Dit percentage verwerkt alle verplichte kosten en geeft daarmee een eerlijk beeld van wat de lening werkelijk kost.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Vergelijk leningen altijd op basis van het APR — niet alleen op de nominale rente of de maandlast. Een lening met een lagere nominale rente maar hoge afsluitkosten kan via het APR duurder uitvallen dan een lening met een iets hogere rente zonder extra kosten.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">3. Betaalbaarheid — leen alleen wat u kunt terugbetalen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Voordat u een lening afsluit is het verstandig om uw financiële situatie realistisch in kaart te brengen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-5">
                {listItemFin("Wat zijn uw vaste maandlasten — huur of hypotheek, verzekeringen, abonnementen?")}
                {listItemFin("Wat is uw netto maandinkomen?")}
                {listItemFin("Hoeveel ruimte blijft er over voor de nieuwe maandlast?")}
                {listItemFin("Wat als uw situatie verandert — door ziekte, werkloosheid of een andere grote uitgave?")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Leen alleen wat u nodig heeft en wat u redelijkerwijs kunt terugbetalen, ook bij een tegenvallende situatie. Betaalproblemen leiden tot extra kosten, oplopende schulden en kunnen langdurig negatieve gevolgen hebben voor uw kredietwaardigheid bij het BKR.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">4. Kredietvormen — welke past bij uw situatie?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Er zijn verschillende vormen van particulier krediet. Welke het beste past hangt af van uw doel en hoe zeker u bent over het bedrag dat u nodig heeft.
              </p>

              <h3 className="text-nbg-blue text-lg font-bold mt-2 mb-3">Persoonlijke lening</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een vast bedrag, vaste looptijd en vaste maandlasten. U weet van tevoren precies wat u elke maand betaalt en wanneer de lening is afgelost. Geschikt voor een concrete eenmalige uitgave zoals een auto, verbouwing of studie waarbij u het exacte bedrag kent.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">Kenmerken:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-6">
                {listItemFin("Vaste rente gedurende de looptijd")}
                {listItemFin("Vaste maandlast — geen verrassingen")}
                {listItemFin("Vervroegd aflossen kan soms leiden tot extra kosten — controleer de voorwaarden")}
              </ul>

              <h3 className="text-nbg-blue text-lg font-bold m-0 mb-3">Doorlopend krediet</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een kredietlimiet waarbinnen u geld kunt opnemen en terugbetalen naar behoefte. U betaalt alleen rente over het bedrag dat u daadwerkelijk heeft opgenomen. Meer flexibiliteit dan een persoonlijke lening — maar ook meer risico op oplopende kosten als u de limiet langdurig benut.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">Kenmerken:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-6">
                {listItemFin("Variabele rente — kan gedurende de looptijd worden aangepast door de kredietverstrekker")}
                {listItemFin("Flexibel opnemen en terugbetalen")}
                {listItemFin("Geschikt voor uitgaven waarvan het bedrag vooraf niet precies bekend is")}
                {listItemFin("Discipline vereist — het is verleidelijk om de kredietruimte volledig te benutten")}
              </ul>

              <h3 className="text-nbg-blue text-lg font-bold m-0 mb-3">Verkoop op afbetaling</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Krediet gekoppeld aan een specifieke aankoop — bijvoorbeeld bij een winkel of webshop. Soms aangeboden als &quot;0% rente&quot; of &quot;betaal later&quot;. Lees altijd de volledige voorwaarden — aanvullende kosten of hoge rente na een proefperiode kunnen de totale kosten significant verhogen. Vergelijk altijd het APR met alternatieven.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">5. BKR-registratie</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Elke lening boven een bepaalde drempel wordt geregistreerd bij het Bureau Kredietregistratie (BKR). Een lopende lening telt mee bij toekomstige kredietaanvragen — ook bij een hypotheekaanvraag. Betalingsachterstanden worden als negatieve notering geregistreerd en kunnen het afsluiten van een hypotheek of andere financiering bemoeilijken.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Controleer uw eigen BKR-registratie via mijnbkr.nl voordat u een lening afsluit — zo weet u waar u staat.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">6. Risico&apos;s van te veel lenen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Te veel lenen of te veel leningen tegelijk hebben kan leiden tot:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemFin("Betalingsproblemen en oplopende schulden")}
                {listItemFin("Extra kosten door boetes of verhoogde rente bij betalingsachterstand")}
                {listItemFin("Negatieve BKR-registratie die toekomstige financiering bemoeilijkt")}
                {listItemFin("Verminderde financiële ruimte voor onvoorziene uitgaven")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Schulden lossen niet vanzelf op. Als u merkt dat u moeite heeft om uw maandlasten te betalen is het verstandig om tijdig hulp te zoeken — via een adviseur of via de gemeentelijke schuldhulpverlening.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-6 sm:p-8">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Checklist voordat u een lening afsluit</h2>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemFin("Heeft u het geld echt nu nodig of kunt u sparen voor de uitgave?")}
                {listItemFin("Heeft u leningen van minimaal drie aanbieders vergeleken op APR?")}
                {listItemFin("Weet u wat de totale kosten zijn over de gehele looptijd — niet alleen de maandlast?")}
                {listItemFin("Past de maandlast ook bij een tegenvallende situatie?")}
                {listItemFin("Heeft u de voorwaarden voor vervroegd aflossen gelezen?")}
                {listItemFin("Heeft u uw BKR-registratie gecontroleerd via mijnbkr.nl?")}
              </ul>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Afspraak maken</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Overweegt u een persoonlijke lening of doorlopend krediet? Bij Haruna helpen we u de opties, totale kosten (APR) en betaalbaarheid in uw situatie in kaart te brengen — voordat u een financiële verplichting aangaat.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Plan een adviesgesprek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="particuliere-lening-faq-heading">
              <h2 id="particuliere-lening-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over particuliere leningen
              </h2>
              <ArticleFaqAccordion items={PARTICULIERE_LENING_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over financiering</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Zakelijke en particuliere financiering, krediet en waar u op moet letten.
              </p>
              <Link href="/nieuws/financiering" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar alle artikelen Financiering
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Wilt u weten wat dit voor uw situatie betekent? Plan een vrijblijvend adviesgesprek, dan
                kijken we samen wat past.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Bedrijfsauto financieren of leasen
  if (slug === "bedrijfsauto-financieren-leasen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemFin = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const bedrijfsautoFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: BEDRIJFSAUTO_FINANCIERING_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bedrijfsautoFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(article, slug)) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Bedrijfsauto financieren of leasen 2026</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Financiering</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Bedrijfsauto financieren of leasen 2026 — Bijtelling, lease en fiscale gevolgen
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Veel ondernemers hebben een bedrijfsauto nodig. De vraag is niet alleen welke auto — maar ook hoe u die financiert. Kopen, financieren via een lening, of leasen (financial of operational lease) heeft gevolgen voor uw cashflow, balans en belastingpositie.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Bedrijfsauto financieren of leasen"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/80 py-4 px-5 mb-6">
              <p className="text-nbg-blue text-[17px] font-semibold m-0">
                Let op: geld lenen kost geld.
              </p>
            </div>

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. In 2026 zijn vooral de fiscale gevolgen rondom bijtelling van elektrische auto&apos;s relevant. Daarom is het verstandig om uw financierings- of leasekeuze af te stemmen op uw situatie en de fiscale uitkomst.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Optie 1 t/m 4: kopen, financieren en leasen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Bijtelling 2026: elektrisch en fossiel (met rekenvoorbeeld)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Motorrijtuigenbelasting (MRB) 2026
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Zakelijke aftrek en vergelijking op hoofdlijnen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wanneer past welke optie bij uw situatie?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Advies over bedrijfsauto
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Optie 1 — Kopen uit eigen middelen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                U koopt de auto in één keer en wordt direct eigenaar. Er zijn geen maandelijkse financieringslasten. U kunt de auto zakelijk afschrijven, waardoor u de kosten (onder voorwaarden) fiscaal mee kunt nemen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                Voordelen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-5">
                {listItemFin("Geen rente of leasetermijnen")}
                {listItemFin("Volledige controle over de auto")}
                {listItemFin("U kunt de auto zakelijk afschrijven")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                Aandachtspunten:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemFin("Grote eenmalige uitgave die uw liquiditeit vermindert")}
                {listItemFin("U draagt zelf het risico van waardevermindering en onderhoud")}
                {listItemFin("Minder cashflow beschikbaar voor andere investeringen")}
              </ul>

              <h3 className="text-nbg-blue text-lg lg:text-xl font-bold mt-7 mb-3">Optie 2 — Financieren via een zakelijke lening</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                U leent het aankoopbedrag en betaalt dit in maandelijkse termijnen terug met rente. Na volledige aflossing wordt u eigenaar. U spreidt de investering, waardoor u vaak meer cashflow overhoudt voor andere uitgaven.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                Voordelen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-5">
                {listItemFin("U spreidt de investering over de looptijd")}
                {listItemFin("U behoudt meer cashflow voor andere uitgaven")}
                {listItemFin("De auto staat op uw balans en u kunt afschrijven")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                Aandachtspunten:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemFin("U betaalt rente over het geleende bedrag — totale kosten zijn hoger dan bij direct kopen")}
                {listItemFin("U draagt zelf het risico van waardevermindering")}
                {listItemFin("Onderhoud en verzekering zijn voor uw eigen rekening")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Optie 3 — Financial lease</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij financial lease betaalt u de auto in maandelijkse termijnen aan een leasemaatschappij. Aan het einde van de looptijd koopt u de auto doorgaans voor een vooraf afgesproken restwaarde of wordt u automatisch eigenaar.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                Kenmerken:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-6">
                {listItemFin("U draagt het economische risico — waardevermindering, onderhoud en verzekering zijn voor uw rekening")}
                {listItemFin("Maandelijkse termijnen zijn voorspelbaar")}
                {listItemFin("De fiscale verwerking hangt af van de specifieke leaseconstructie en uw situatie")}
              </ul>

              <h3 className="text-nbg-blue text-lg lg:text-xl font-bold mt-2 mb-3">Optie 4 — Operational lease</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij operational lease blijft de leasemaatschappij eigenaar van de auto. U betaalt een vast maandbedrag voor gebruik gedurende een afgesproken periode en levert de auto aan het einde in.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2">
                Kenmerken:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemFin("De leasemaatschappij blijft eigenaar")}
                {listItemFin("Onderhoud, reparaties en verzekering zijn doorgaans inbegrepen in het leasebedrag")}
                {listItemFin("Voorspelbare vaste maandlasten")}
                {listItemFin("U wordt geen eigenaar en heeft geen risico op restwaarde")}
                {listItemFin("Kilometerbegrenzing en gebruiksvoorwaarden gelden doorgaans")}
                {listItemFin("De administratieve en fiscale verwerking verschilt per situatie en rechtsvorm")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Bijtelling 2026 — actuele percentages</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Als u de bedrijfsauto ook privé gebruikt geldt een fiscale bijtelling. Dit bedrag wordt bij uw bruto inkomen opgeteld en is belast als loon in natura. De bijtelling wordt berekend over de cataloguswaarde van de auto.
              </p>

              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3">
                Fossiele brandstof (benzine, diesel, hybride): <strong>22%</strong> bijtelling over de volledige cataloguswaarde. Ongewijzigd ten opzichte van 2025.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3">
                Volledig elektrisch: <strong>18%</strong> bijtelling over de eerste <strong>€30.000</strong> van de cataloguswaarde. Over het deel boven de <strong>€30.000</strong> geldt <strong>22%</strong>. Het bijtellingspercentage dat geldt bij de eerste kentekenstelling staat <strong>60 maanden</strong> vast.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                In 2027 stijgt het tarief voor nieuwe elektrische auto&apos;s naar <strong>20%</strong> over de eerste <strong>€30.000</strong>. Vanaf 2028 geldt voor alle auto&apos;s — elektrisch en fossiel — een uniform tarief van <strong>22%</strong> over de volledige cataloguswaarde.
              </p>

              <h3 className="text-nbg-blue text-lg font-bold mt-7 mb-3">Rekenvoorbeeld bijtelling 2026</h3>
              <div className="rounded-xl border border-nbg-light-gray/60 bg-white p-5 mb-6">
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-3">
                  Elektrische auto met cataloguswaarde <strong>€38.000</strong>:
                </p>
                <ul className="space-y-1 list-disc pl-6 text-nbg-blue/85 text-[16px] leading-relaxed m-0 mb-4">
                  <li>
                    Over €30.000: 18% = €5.400 bijtelling per jaar
                  </li>
                  <li>
                    Over €8.000: 22% = €1.760 bijtelling per jaar
                  </li>
                </ul>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-3">
                  Fossiele auto met cataloguswaarde <strong>€38.000</strong>:
                </p>
                <ul className="space-y-1 list-disc pl-6 text-nbg-blue/85 text-[16px] leading-relaxed m-0 mb-4">
                  <li>
                    22% over €38.000 = €8.360 bijtelling per jaar
                  </li>
                </ul>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                  Het verschil in bijtelling bedraagt in dit voorbeeld €1.200 bruto per jaar. Wat dit netto voor u betekent hangt af van uw belastingschijf en persoonlijke situatie.
                </p>
              </div>

              <h3 className="text-nbg-blue text-lg font-bold mb-3">Motorrijtuigenbelasting (MRB) 2026</h3>
              <ul className="space-y-2 list-none p-0 m-0 mb-6">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                  <span className="text-nbg-blue/85 text-[17px] leading-relaxed">
                    Elektrische personenauto&apos;s: <strong>70%</strong> van het normale MRB-tarief — de korting wordt kleiner maar bestaat nog.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                  <span className="text-nbg-blue/85 text-[17px] leading-relaxed">
                    Bedrijfswagens: <strong>100%</strong> van het normale MRB-tarief — alle korting is vervallen per 1 januari 2026.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                  <span className="text-nbg-blue/85 text-[17px] leading-relaxed">
                    Plug-in hybride personenauto&apos;s: <strong>100%</strong> van het normale MRB-tarief.
                  </span>
                </li>
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-6">
                De exacte MRB voor uw specifieke voertuig hangt af van het gewicht en de provincie van eerste tenaamstelling.
              </p>

              <h3 className="text-nbg-blue text-lg font-bold mb-3">Zakelijke aftrek</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                De kosten van een bedrijfsauto kunnen onder voorwaarden zakelijk worden afgetrokken. Dit geldt voor afschrijving, rente, onderhoud en verzekering. Of u hiervoor in aanmerking komt hangt af van:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-6">
                {listItemFin("Uw rechtsvorm — IB-ondernemer, BV of DGA")}
                {listItemFin("De gekozen financieringsvorm")}
                {listItemFin("Het aandeel zakelijk versus privégebruik")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-6">
                Omdat fiscale regels per situatie sterk kunnen verschillen, is het verstandig uw keuze voor kopen, financieren of leasen vooraf te bespreken met een adviseur.
              </p>

              <h3 className="text-nbg-blue text-lg font-bold mb-3">Vergelijking op hoofdlijnen</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-4">
                  <p className="text-nbg-blue font-bold mb-2">Kopen</p>
                  <ul className="space-y-1 text-nbg-blue/85 text-[15px] leading-relaxed m-0">
                    <li>Initiële uitgave: hoog</li>
                    <li>Maandlasten: geen rente of leasetermijnen</li>
                    <li>Eigendom: direct</li>
                    <li>Onderhoud: eigen rekening</li>
                    <li>Restwaarde-risico: u zelf</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-4">
                  <p className="text-nbg-blue font-bold mb-2">Financieren</p>
                  <ul className="space-y-1 text-nbg-blue/85 text-[15px] leading-relaxed m-0">
                    <li>Initiële uitgave: laag tot geen</li>
                    <li>Maandlasten: rente + aflossing</li>
                    <li>Eigendom: na aflossing</li>
                    <li>Onderhoud: eigen rekening</li>
                    <li>Restwaarde-risico: u zelf</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-4">
                  <p className="text-nbg-blue font-bold mb-2">Financial lease</p>
                  <ul className="space-y-1 text-nbg-blue/85 text-[15px] leading-relaxed m-0">
                    <li>Initiële uitgave: laag tot geen</li>
                    <li>Maandlasten: vaste termijn</li>
                    <li>Eigendom: doorgaans na afloop</li>
                    <li>Onderhoud: eigen rekening</li>
                    <li>Restwaarde-risico: u zelf</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-4">
                  <p className="text-nbg-blue font-bold mb-2">Operational lease</p>
                  <ul className="space-y-1 text-nbg-blue/85 text-[15px] leading-relaxed m-0">
                    <li>Initiële uitgave: laag tot geen</li>
                    <li>Maandlasten: all-in vast</li>
                    <li>Eigendom: nooit</li>
                    <li>Onderhoud: vaak inbegrepen</li>
                    <li>Restwaarde-risico: leasemaatschappij</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Impact op cashflow</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een bedrijfsauto heeft direct invloed op uw cashflow. Kopen vraagt een grote eenmalige uitgave (of aanbetaling) en vermindert uw liquiditeit. Financieren of financial lease brengt vaste maandtermijnen met zich mee: u betaalt elke periode rente en aflossing (of de lease). Operational lease geeft doorgaans de meest voorspelbare cashflowlasten, omdat u een vast all-in maandbedrag betaalt voor gebruik, onderhoud en verzekering.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Voor een gezonde cashflow is het vooral belangrijk dat de totale maandlasten passen bij uw omzet en overige verplichtingen. Houd daarnaast rekening met brandstof, verzekering en (eventueel) onderhoud dat niet in het leasebedrag is inbegrepen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wanneer welke optie passend kan zijn</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Geen enkele optie is voor iedereen de beste. Het hangt af van uw situatie, uw liquiditeit en uw fiscale uitkomst:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemFin("Kopen uit eigen middelen — passend als u voldoende liquiditeit heeft, geen financieringslasten wilt en de auto meerdere jaren wilt gebruiken.")}
                {listItemFin("Financieren of financial lease — passend als u eigenaar wilt worden, de investering wilt spreiden en de maandlasten kunt dragen vanuit uw cashflow.")}
                {listItemFin("Operational lease — passend als u voorspelbare vaste lasten wilt, geen eigenaar hoeft te zijn en geen gedoe wilt met onderhoud en restwaarde.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De timing van aanschaf kan in 2026 fiscaal relevant zijn, met name voor elektrische auto&apos;s waarbij het bijtellingspercentage bij de eerste kentekenstelling wordt vastgesteld en 60 maanden vaststaat.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Afspraak maken</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Bij Haruna brengen we uw opties voor kopen, financieren of leasen in beeld en vertalen dit naar de fiscale gevolgen voor uw situatie, waaronder bijtelling en (onder voorwaarden) zakelijke aftrek.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Plan een adviesgesprek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="bedrijfsauto-faq-heading">
              <h2 id="bedrijfsauto-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over bedrijfsauto financieren of leasen
              </h2>
              <ArticleFaqAccordion items={BEDRIJFSAUTO_FINANCIERING_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over financiering</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Zakelijke en particuliere financiering, krediet en waar u op moet letten.
              </p>
              <Link href="/nieuws/financiering" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar alle artikelen Financiering
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <ArticleAuthorDisclaimer className="mt-8" />
            <div className="mt-4">
              <p className="m-0 mb-3 text-nbg-blue/75 text-[14px]">
                Wilt u weten wat dit voor uw situatie betekent? Plan een vrijblijvend adviesgesprek, dan
                kijken we samen wat past.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Plan een adviesgesprek
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-nbg-blue">Artikel</h1>
        <p className="mt-4 text-nbg-blue/80">
          Dit artikel wordt binnenkort toegevoegd.
        </p>
        <Link href="/nieuws" className="mt-6 inline-block text-nbg-green font-semibold hover:underline">
          ← Naar nieuws
        </Link>
      </main>
      <Footer />
    </>
  );
}
