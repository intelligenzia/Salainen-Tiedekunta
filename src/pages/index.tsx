import * as React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Salainen Tiedekunta</h1>

    <p>
      Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu
      kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä
      organisaatio. Muutaman aktiivisen opiskelijan alullepanema hanke on
      muutamassa vuodessa kasvanut useita laitoksia sisältäväksi
      täysimittaiseksi tiedekunnaksi.
    </p>
  </Layout>
);

export default IndexPage;
