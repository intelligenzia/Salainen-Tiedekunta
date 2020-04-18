import * as React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage: React.FC = ({ location }: any) => (
  <Layout>
    <SEO
      title="Suloinen Tiedekunta"
      description="Suloisella tiedekunnalla on nukkehallitus, ja improvisoituja kokouksia voi pitää toimiston leikkinurkassa. Kokouksissa tehtyjä päätöksiä ei kenenkään tarvitse totella, sillä tarkoitus on vain pitää iloisia kokouksia."
      pathname={location.pathname}
    />
    <h1>Suloinen Tiedekunta</h1>

    <p>
      Meidän tiede on paju ja sen juuret ovat yliopiston kasvitieteellisessä
      puutarhassa.
    </p>

    <h3>Tiedekunnan hallinto ja asema Helsingin yliopistossa</h3>
    <p>
      Suloisella tiedekunnalla on nukkehallitus, ja improvisoituja kokouksia voi
      pitää toimiston leikkinurkassa. Kokouksissa tehtyjä päätöksiä ei kenenkään
      tarvitse totella, sillä tarkoitus on vain pitää iloisia kokouksia.
    </p>

    <h3>Tiedekunnan tilat</h3>
    <p>
      Suurin osa tiedekunnan tiloista sijoittuu yliopiston kasvitieteelliseen
      puutarhaan. Tieteen Pajun lähistöllä on tavattavissa toimistohenkilöitä ja
      ruusupensaan alla olevasta kaninkolosta pääsee Suloisen tiedekunnan
      ihanaan maailmaan. Lisäksi Naantalin Muumimaailmassa annetaan Suloisen
      tiedekunnan opetusta.
    </p>

    <h3>Opiskeluoikeus</h3>
    <p>
      Kaikilla on oikeus suorittaa mielin määrin kursseja ja tutkintoja
      suloisessa tiedekunnassa. Suloisen tieteen tohtorintutkinnon jälkeen voi
      vielä edetä suloisen tieteen huipputohtoriksi tai huippusuloisen tieteen
      tohtoriksi ja lopulta huippusuloisen tieteen huipputohtoriksi.
    </p>

    <h3>Opiskelijan velvollisuudet</h3>
    <p>Opiskelijalla ei ole velvollisuuksia.</p>

    <h3>Muualla suoritettujen opintojen hyväksilukeminen</h3>
    <p>
      Kaikki muualla suoritetut opinnot luetaan opiskelijan hyväksi kiitettävin
      arvosanoin ja niistä saa paljon kukkia.
    </p>

    <h3>Opintoneuvonta</h3>
    <p>
      Opintoneuvontaa ei tarvita, koska opinnot edistyvät aivan itsestään ja
      kaikista kursseista pääsee aina kiitettävästi läpi.
    </p>

    <h3>Kurssien suorittaminen</h3>
    <p>
      Kurssien suorittamisesta saa kukkia, laji ja väri jääköön yllätykseksi.
      Kukkia voi suloisen tiedekunnan toimistossa vaihtaa
      yliopisto-yhteensopiviin opintoviikkoihin tai haleihin ja pusuihin.
      Opiskelijat voivat myös lahjoittaa kukkia toisilleen tai vaihtaa niitä.
    </p>
    <h3>Tentit</h3>
    <p>
      Minkä tahansa kurssin tentissä voi helpon tenttikysymyksen sijaan vastata
      kysymykseen ”Mitä kuuluu?” tai piirtää jotakin.
    </p>
  </Layout>
);

export default IndexPage;
