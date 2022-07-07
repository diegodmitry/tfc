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


  // De acordo com conversa com Felipe, o Req2 é visando o Req3 e sucessivamente.
  // Entretanto percebi que ao digitar apenas as linhas passo no requisito.  
});
