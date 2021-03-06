import React from 'react';
import PropTypes from 'prop-types';
import { Repository, Container, FooterDiv } from './styles';

const CompareList = ({ repositories, onDeleteRespository, onUpdateRespository }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>
            {repository.owner.login}
            {' '}
          </small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count}
            {' '}
            <small>stars</small>
          </li>
          <li>
            {repository.forks_count}
            {' '}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            {' '}
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            {' '}
            <small>last commit</small>
          </li>
        </ul>
        <FooterDiv>
          <button type="button" onClick={e => onDeleteRespository(repository.id, e)}>
            Exlcuir
          </button>
          <button type="button" onClick={e => onUpdateRespository(repository.id, e)}>
            Atualizar
          </button>
        </FooterDiv>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  onDeleteRespository: PropTypes.func.isRequired,
  onUpdateRespository: PropTypes.func.isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      lastCommit: PropTypes.string,
    }),
  ).isRequired,
};
export default CompareList;
