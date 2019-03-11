import React, { Component } from 'react';
import moment from 'moment';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount = () => {
    if (localStorage.getItem('repositories')) {
      this.setState({ repositories: JSON.parse(localStorage.getItem('repositories')) });
    } else {
      this.setState({ repositories: [] });
    }
  };

  handleDeleteRepository = (pId, e) => {
    e.preventDefault();

    const { repositories } = this.state;

    const tRepository = repositories.filter(el => el.id !== pId);

    this.setState({ repositories: tRepository });
    localStorage.setItem('repositories', JSON.stringify(tRepository));
  };

  handleUpdateRepository = async (id, e) => {
    e.preventDefault();

    try {
      const { repositories } = this.state;
      const respositoryIndex = repositories.findIndex(el => el.id === id);

      const { data: repositoryUpdate } = await api.get(
        `/repos/${repositories[respositoryIndex].full_name}`,
      );

      repositoryUpdate.lastCommit = moment(repositoryUpdate.pushed_at).fromNow();

      repositories[respositoryIndex] = repositoryUpdate;

      this.setState({ repositories });
      localStorage.setItem('repositories', JSON.stringify(repositories));
    } catch (error) {
      this.setState({ repositoryError: true });
    }
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { repositoryInput, repositories } = this.state;

      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      const listRepositories = [...repositories, repository];

      this.setState({
        repositoryInput: '',
        repositories: listRepositories,
      });

      localStorage.setItem('repositories', JSON.stringify(listRepositories));
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      loading, repositoryInput, repositories, repositoryError,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/respositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          onDeleteRespository={this.handleDeleteRepository}
          onUpdateRespository={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}
