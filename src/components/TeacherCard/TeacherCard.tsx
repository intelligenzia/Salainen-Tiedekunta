import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import Image from 'gatsby-image';

type Props = {
  name: string;
  slug: string;
  avatar: FluidObject;
};

const TeacherCard: FC<Props> = ({ name, slug, avatar }) => {
  return (
    <Container>
      <Link to={`/teacher/${slug}`}>
        {avatar && <Avatar fluid={avatar} />}
        <Name>{name}</Name>
      </Link>
    </Container>
  );
};

export default TeacherCard;

const Container = styled.div`
  padding-left: 1rem;
  a  {
    color: currentColor;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  margin-bottom: 1rem;
`;

const Name = styled.h4`
  margin: 0;
`;

const Avatar = styled(Image)`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 1rem;
  margin-right: 1rem;
`;
