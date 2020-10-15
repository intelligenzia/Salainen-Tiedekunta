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
    <Container to={`/teacher/${slug}`}>
      <Name>{name}</Name>
    </Container>
  );
};

export default TeacherCard;

const Container = styled(Link)`
  display: block;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.bgSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.textSecondary};

  display: flex;
  flex-direction: row;
  align-items: center;

  &:first-of-type {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-of-type {
    border: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Name = styled.h4`
  margin: 0;
`;
