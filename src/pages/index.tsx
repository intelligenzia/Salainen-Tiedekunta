import * as React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage: React.FC = ({ location }: any) => (
  <Layout>
    <SEO
      title="Salainen Tiedekunta"
      description="Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu
      kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä
      organisaatio. Muutaman aktiivisen opiskelijan alullepanema hanke on
      muutamassa vuodessa kasvanut useita laitoksia sisältäväksi
      täysimittaiseksi tiedekunnaksi."
      pathname={location.pathname}
    />
    <h1>Salainen Tiedekunta</h1>

    <p>
      Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu
      kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä
      organisaatio. Muutaman aktiivisen opiskelijan alullepanema hanke on
      muutamassa vuodessa kasvanut useita laitoksia sisältäväksi
      täysimittaiseksi tiedekunnaksi.
    </p>

    <h3>TIEDEKUNNAN HALLINTO JA ASEMA HELSINGIN YLIOPISTOSSA</h3>
    <p>
      Tiedekunta muodostaa itsenäisen kokonaisuuden, joka on riippumaton
      yliopiston muusta toiminnasta. Hallinto on salamyhkäinen ja kryptinen
      kokonaisuus, jonka ymmärtäminen tuottaa ylivoimaisia vaikeuksia kaikille
      tiedekunnan toimintaa tarkkaileville. Tämän tarkoituksena on tiedekunnan
      toiminnan suojeleminen.
    </p>
    <p>
      Legaalisista syistä tiedekunnan toiminta joudutaan pitämään toistaiseksi
      salaisena, ja pääosa opetuksesta järjestetään suljettujen ovien takana.
      Henkilökunta toivoo yhteiskunnan ja sen myötä yliopiston kehittyvän
      nykyajan tarpeita vastaavaksi siten, että sal. tdk:n toiminta voidaan
      tehdä lopulta täysin julkiseksi.
    </p>

    <p>
      Salainen tiedekunta pyrkii tutkimuksen huippuyksiköksi vuonna 2005. Tämän
      vuoksi myös opettamista kehitetään nyt voimakkaasti ja opiskelijoita
      pyydetään täyttämään kurssien palautelomakkeet, joista osa on myös tämän
      oppaan liitteinä.
    </p>

    <h3>TIEDEKUNNAN TILAT</h3>
    <p>
      Salaisen tiedekunnan tilat vaihtavat olinpaikkaa nopeaan tahtiin.
      Keskeisen elementin muodostaa puhallettava toimisto, joka sijaitsee
      yleensä jossain kaupungin puistossa ellei satu olemaan lainassa tai
      paikattavana. Uusimpana hankintana tiedekunnalla on oma puhallettu (NASA:n
      tahattomasti lahjoittama) avaruusalus.
    </p>

    <h3>MUUALLA SUORITETTUJEN OPINTOJEN HYVÄKSILUKEMINEN</h3>
    <p>
      Muualla suoritettujen opintojen hyväksilukemisesta päätetään
      laitoskohtaisesti. Muissa korkeakouluissa ja tiedekunnissa ei juuri
      tarjota salaisen tiedekunnan kurssivaatimuksia vastaavaa opetusta, mutta
      joitakin taitoja opiskelija on voinut hyvinkin saavuttaa elämässään muuta
      kautta, esimerkiksi harrastusten piirissä.
    </p>

    <h3>OPINTONEUVONTA</h3>
    <p>
      Opintoneuvontaa annetaan pääasiassa telepaattisesti. Mikäli telepatia
      tuottaa ongelmia, kannattaa opiskelijan kääntyä tiedekunnan toimiston
      puoleen.
    </p>

    <h3>OPISKELUOIKEUS</h3>
    <p>
      Opiskeluoikeutta tiedekunnassa ei ole mitenkään rajoitettu. Opetuksesta
      kiinnostuneen on kuitenkin syytä huomioida kohta Opiskelijan
      velvollisuudet.
    </p>

    <h3>OPISKELIJAN VELVOLLISUUDET</h3>
    <p>
      Tiedekuntaan kirjoittautuva joutuu antamaan salassapitolupauksen, joka
      velvoittaa hänet salaamaan tiettyjen kurssien opettajien henkilöllisyydet,
      luento- ja harjoitustyöajat ja -paikat, kurssimateriaalien säilytyspaikat
      sekä kurssien tarkemman sisällön - myös ja eritoten poliisikuulustelussa.
    </p>

    <h3>OPISKELIJAVAIHTO</h3>
    <p>
      Salainen tiedekunta pidättää oikeuden vaihtaa opiskelija milloin tahansa
      mihin tahansa. Vaihtaminen tapahtuu suurella varmuudella erityisesti, jos
      opiskelija epäonnistuu salassapitovelvollisuuden täyttämisessä.
    </p>
  </Layout>
)

export default IndexPage
