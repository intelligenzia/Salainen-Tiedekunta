// Faculty copy shared by the home screen and the clearance gate.
import type { CourseEntry } from '@/lib/contentful';

export const INTRO =
  'Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä organisaatio. Muutaman aktiivisen opiskelijan alullepanema hanke on muutamassa vuodessa kasvanut useita laitoksia sisältäväksi täysimittaiseksi tiedekunnaksi.';

export const facultyInfo = [
  {
    id: 'hallinto',
    title: 'Hallinto ja asema yliopistossa',
    content: `Tiedekunta muodostaa itsenäisen kokonaisuuden, joka on riippumaton yliopiston muusta toiminnasta. Hallinto on salamyhkäinen ja kryptinen kokonaisuus, jonka ymmärtäminen tuottaa ylivoimaisia vaikeuksia kaikille tiedekunnan toimintaa tarkkaileville. Tämän tarkoituksena on tiedekunnan toiminnan suojeleminen.

Legaalisista syistä tiedekunnan toiminta joudutaan pitämään toistaiseksi salaisena, ja pääosa opetuksesta järjestetään suljettujen ovien takana. Henkilökunta toivoo yhteiskunnan ja sen myötä yliopiston kehittyvän nykyajan tarpeita vastaavaksi siten, että sal. tdk:n toiminta voidaan tehdä lopulta täysin julkiseksi.

Salainen tiedekunta pyrkii tutkimuksen huippuyksiköksi vuonna 2005. Tämän vuoksi myös opettamista kehitetään nyt voimakkaasti ja opiskelijoita pyydetään täyttämään kurssien palautelomakkeet, joista osa on myös tämän oppaan liitteinä.`,
  },
  {
    id: 'tilat',
    title: 'Tiedekunnan tilat',
    content: `Salaisen tiedekunnan tilat vaihtavat olinpaikkaa nopeaan tahtiin. Keskeisen elementin muodostaa puhallettava toimisto, joka sijaitsee yleensä jossain kaupungin puistossa ellei satu olemaan lainassa tai paikattavana. Uusimpana hankintana tiedekunnalla on oma puhallettu (NASA:n tahattomasti lahjoittama) avaruusalus.`,
  },
  {
    id: 'hyvaksiluku',
    title: 'Opintojen hyväksilukeminen',
    content: `Muualla suoritettujen opintojen hyväksilukemisesta päätetään laitoskohtaisesti. Muissa korkeakouluissa ja tiedekunnissa ei juuri tarjota salaisen tiedekunnan kurssivaatimuksia vastaavaa opetusta, mutta joitakin taitoja opiskelija on voinut hyvinkin saavuttaa elämässään muuta kautta, esimerkiksi harrastusten piirissä.`,
  },
  {
    id: 'neuvonta',
    title: 'Opintoneuvonta',
    content: `Opintoneuvontaa annetaan pääasiassa telepaattisesti. Mikäli telepatia tuottaa ongelmia, kannattaa opiskelijan kääntyä tiedekunnan toimiston puoleen.`,
  },
  {
    id: 'opiskeluoikeus',
    title: 'Opiskeluoikeus',
    content: `Opiskeluoikeutta tiedekunnassa ei ole mitenkään rajoitettu. Opetuksesta kiinnostuneen on kuitenkin syytä huomioida kohta Opiskelijan velvollisuudet.`,
  },
  {
    id: 'velvollisuudet',
    title: 'Opiskelijan velvollisuudet',
    content: `Tiedekuntaan kirjoittautuva joutuu antamaan salassapitolupauksen, joka velvoittaa hänet salaamaan tiettyjen kurssien opettajien henkilöllisyydet, luento- ja harjoitustyöajat ja -paikat, kurssimateriaalien säilytyspaikat sekä kurssien tarkemman sisällön - myös ja eritoten poliisikuulustelussa.`,
  },
  {
    id: 'vaihto',
    title: 'Opiskelijavaihto',
    content: `Salainen tiedekunta pidättää oikeuden vaihtaa opiskelija milloin tahansa mihin tahansa. Vaihtaminen tapahtuu suurella varmuudella erityisesti, jos opiskelija epäonnistuu salassapitovelvollisuuden täyttämisessä.`,
  },
];

// Same picks for everyone on a given day
export function dailyPicks(courses: CourseEntry[], count: number): CourseEntry[] {
  const today = new Date();
  let seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const shuffled = [...courses];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

// From "Opiskelijan velvollisuudet" above, turned into the first-launch pledge.
export const PLEDGE = {
  lede: 'Olet siirtymässä Salaisen Tiedekunnan arkistoon. Tiedekuntaan kirjoittautuva joutuu antamaan salassapitolupauksen.',
  items: [
    'tiettyjen kurssien opettajien henkilöllisyydet',
    'luento- ja harjoitustyöajat ja -paikat',
    'kurssimateriaalien säilytyspaikat',
    'kurssien tarkemman sisällön – myös ja eritoten poliisikuulustelussa',
  ],
  footer: 'Salainen tiedekunta pidättää oikeuden vaihtaa opiskelija milloin tahansa mihin tahansa.',
};
