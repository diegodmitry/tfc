import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/users';

import { Response } from 'superagent';

import { generateToken } from '../services/loginService'

chai.use(chaiHttp);

const { expect } = chai;

describe('(TDD) Desenvolva testes da rota login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UsersModel, "findOne")
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as UsersModel);
  });

  after(()=>{
    (UsersModel.findOne as sinon.SinonStub).restore();
  })

  it('Espera o status 200, na rota login', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': 'admin@admin.com',
      'password': 'secret_admin',
    });
    expect(response).to.have.status(200);
  });

  it('Espera que o retorno tenha a chave token, , na rota login', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': 'admin@admin.com',
      'password': 'secret_admin',
    });
    expect(response.body).to.have.key('token');
  });

  it('Testa se o login não tiver o campo "email" preenchido, com status 400, na rota login', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': '',
      'password': 'secret_admin',
    });
    expect(response).to.have.status(400);
  });

  it('Verifica se o campo login não tiver o campo "email" preenchido, retorna a mensagem: { "message": "All fields must be filled" }, na rota login', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': '',
      'password': 'secret_admin',
    });
    expect(response.text).to.be.eq('{"message":"All fields must be filled"}');
  });

  it('Verifica se o campo password tem uma "senha" inválida, com status 401, na rota login', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': 'admin@admin.com',
      'password': '123',
    });
    expect(response).to.have.status(401);
  });

  it('Verifica se o campo password não tem "senha", com status 400, na rota login', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': 'admin@admin.com',
      'password': '',
    });
    expect(response).to.have.status(400);
  });

  it('Verifica na rota /login/validate, o status 200', async () => {
    const email = 'admin@admin.com';
    const token = generateToken(email)
    const response = await chai.request(app).get('/login/validate').set('authorization', token)
    expect(response).to.have.status(200);
  });

  it('Verifica na rota /login/validate, a mensagem {"role":"admin"}', async () => {
    const email = 'admin@admin.com';
    const token = generateToken(email)
    const response = await chai.request(app).get('/login/validate').set('authorization', token)
    expect(response.text).to.be.eq('{"role":"admin"}')
  });
  
  // De acordo com conversa com Felipe, o Req2 é visando o Req3 e sucessivamente.
  // Entretanto percebi que ao digitar apenas as linhas passo no requisito.  
});

