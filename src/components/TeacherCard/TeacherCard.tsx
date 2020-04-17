import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

interface Props {
  name: string;
  slug: string;
}

const TeacherCard = (props: Props) => {
  const { name, slug } = props;

  return (
    <Container>
      <Link to={`teacher/${slug}`}>
        <Name>{name}</Name>
      </Link>
    </Container>
  );
};

export default TeacherCard;

const Container = styled.div``;
const Name = styled.h4``;
