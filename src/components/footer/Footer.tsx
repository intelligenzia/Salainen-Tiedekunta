import React, { FC } from 'react';
import styled from 'styled-components';

export const Footer: FC = () => {
  return (
    <FooterContainer>
      © {new Date().getFullYear()} Intelligenzia
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  text-align: center;
`;
