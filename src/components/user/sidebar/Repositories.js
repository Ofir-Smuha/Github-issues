import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import book from 'assets/images/book.svg';

type Props = {
  repositories: Object[],
  history: Object
};

const Repositories = (props: Props) => {
  return (
    <div>
      <Header>
        <HeaderTitle>Repositories</HeaderTitle>
        <NewRepoButton>New repository</NewRepoButton>
      </Header>
      <SearchAndReposContainer>
        <SearchRepositories type="text" placeholder="Find a repository..." />
        {props.repositories &&
          props.repositories.map(repository => (
            <LinkContainer key={repository.id}>
              <LinkIcon />
              <Link
                onClick={() =>
                  props.history.push(
                    `/${repository.owner.login}/${repository.name}/issues`
                  )
                }>
                {repository.full_name}
              </Link>
            </LinkContainer>
          ))}
      </SearchAndReposContainer>
    </div>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  padding: 8px 16px;
  margin-bottom: 16px;
`;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #24292e;
`;

const NewRepoButton = styled.button`
  color: #fff;
  background: ${({ theme }) => theme.greenGradient};
  border: 1px solid #279644;
  border-radius: 3px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
`;

const SearchAndReposContainer = styled.div`
  padding: 8px 16px;
`;

const SearchRepositories = styled.input`
  width: 100%;
  color: #24292e;
  padding: 6px 8px;
  margin-bottom: 16px;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  font-size: 15px;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const LinkIcon = styled.div`
  background: url(${book}) no-repeat center;
  background-size: contain;
  width: 21px;
  height: 21px;
  margin-right: 3px;
`;

const Link = styled.div`
  color: #1f68da;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

export default withRouter(Repositories);
