import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('(TDD) Desenvolva testes que cubram no mínimo 5% dos arquivos back-end', () => {
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

  it('Espera o status 200', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': 'admin@admin.com',
      'password': 'secret_admin',
    });
    expect(response).to.have.status(200);
  });

  it('Espera que o retorno tenha a chave token', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': 'admin@admin.com',
      'password': 'secret_admin',
    });
    expect(response.body).to.have.key('token');
  });

  it('Testa se o login não tiver o campo "email" preenchido, com status 400', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': '',
      'password': 'secret_admin',
    });
    expect(response).to.have.status(400);
  });

  it('Verifica se o campo login não tiver o campo "email" preenchido, retorna a mensagem: { "message": "All fields must be filled" }', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': '',
      'password': 'secret_admin',
    });
    expect(response.text).to.be.eq('{"message":"All fields must be filled"}');
  });

  it('Verifica se o campo password tem uma "senha" inválida, com status 401', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': 'admin@admin.com',
      'password': '123',
    });
    expect(response).to.have.status(401);
  });

  it('Verifica se o campo password não tem "senha", com status 400', async () => {
    const response = await chai.request(app).post('/login').send({
      'email': 'admin@admin.com',
      'password': '',
    });
    expect(response).to.have.status(400);
  });

  // it('Verifica se o campo login não estiver na requisição, retorna com o status 401 { "message": "All fields must be filled" }', async () => {
  //   const response = await chai.request(app).post('/login').send({
  //     'password': 'secret_admin',
  //   });
  //   expect(response).to.have.status(401);
  // });

  // it('Espera o status 200', async () => {
  //   const request = await chai.request(app).post('/login').send({
  //     'email': 'admin@admin.com',
  //     'password': 'secret_admin',
  //   });
  //   // const token = JSON.stringify({ token: "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.E07agDjMTf4ZyVcKgcSE3RSBxD1QqGtNGNUd8xrppL4" })
  //   expect(request).to.have.status(200);
  //   expect(request.body).to.have.property('email').to.be.equal('admin@admin.com');
  //   // expect(request).to.be.eq(token);
  // });

  // it('Se o login for bem sucedido, retorna uma status 200 com informações do usuário e senha', async () => {
  //   res = await chai.request(app).post('/login').send(validLogin);
  //   const resolve = JSON.stringify(returnLoginMock)
  //   expect(res.text).to.be.eq(resolve);
  //   expect(res).to.have.status(StatusCodes.OK);
  // });

  // De acordo com conversa com Felipe, o Req2 é visando o Req3 e sucessivamente.
  // Entretanto percebi que ao digitar apenas as linhas passo no requisito.  
});

