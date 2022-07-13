import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/teams';

import { Response } from 'superagent';

const teamsMock = [
  {
    id: 0,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 1,
    teamName: "Bahia"
  },
  {
    id: 2,
    teamName: "Botafogo"
  },
  {
    id: 3,
    teamName: "Corinthians"
  },
  {
    id: 4,
    teamName: "Cruzeiro"
  },
  {
    id: 5,
    teamName: "Ferroviária"
  },
  {
    id: 6,
    teamName: "Flamengo"
  },
  {
    id: 7,
    teamName: "Grêmio"
  },
  {
    id: 8,
    teamName: "Internacional"
  },
  {
    id: 9,
    teamName: "Minas Brasília"
  },
  {
    id: 10,
    teamName: "Napoli-SC"
  },
  {
    id: 11,
    teamName: "Palmeiras"
  },
  {
    id: 12,
    teamName: "Real Brasília"
  },
  {
    id: 13,
    teamName: "Santos"
  },
  {
    id: 14,
    teamName: "São José-SP"
  },
  {
    id: 15,
    teamName: "São Paulo"
  }
]

chai.use(chaiHttp);

const { expect } = chai;

describe('Desenvolva testes da rota /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  before(async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves(teamsMock as TeamsModel[]);
  });

  after(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

  it('Espera o status 200', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response).to.have.status(200);
  });

  it('Retorna a lista do tipo array', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.body).to.be.a('array');
  });

  it('Compara o retorno da rota /teams com o mock', async () => {
    const response = await chai.request(app).get('/teams');
    expect(JSON.stringify(response.body)).to.be.eq(JSON.stringify(teamsMock));
  });
});

describe('Desenvolva testes da rota "/teams/:id"', () => {
  let idClubs: number;
  before(async () => {
    sinon
      .stub(TeamsModel, 'findOne')
      .resolves(teamsMock[0] as TeamsModel);
  });

  after(() => {
    (TeamsModel.findOne as sinon.SinonStub).restore();
  })

  it('Retorna um status 200', async () => {
    const response = await chai.request(app).get(`/teams/1`);
    expect(response).to.have.a.status(200);
  });

  it('Retorna o time', async () => {
    const response = await chai.request(app).get(`/teams/1`);
    expect(response.text).to.be.eq('{"id":0,"teamName":"Avaí/Kindermann"}')
  });
});
