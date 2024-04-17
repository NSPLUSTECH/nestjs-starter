import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import getTestingAppModule from 'test/TestingAppModule';
import UserDto from 'src/DTOs/User.dto';
import LoginDTO from 'src/DTOs/Login.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const email = "test@example.com"
  const pass = "test@example.com"

  const getUser = () => {
    const user = new UserDto()
    user.email = email
    user.firstName = 'test'
    user.lastName = 'test'
    user.password = pass
    user.isActive = false
    return user;
  }

  const getLogin = (user: UserDto) => {
    const login = new LoginDTO()
    login.email = user.email
    login.pass = user.password
    return login
  }
  const createUser = (user: UserDto) => {
    return request(app.getHttpServer())
      .post('/signup')
      .send(user)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingAppModule()

    app = moduleFixture.createNestApplication();
    return await app.init();
  });

  it('should return unauthorised error', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(401)
      .expect(JSON.stringify({ "message": "Unauthorized", "statusCode": 401 }))
  });
  it('should create user', () => {
    const user = getUser()
    return createUser(user)
      .expect(JSON.stringify(user))
  });
  it('should login user', async () => {
    const user = getUser()
    await createUser(user).then()
    const loginPayload = getLogin(user)
    return request(app.getHttpServer())
      .post('/login')
      .send(loginPayload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .expect((resp => {
        return resp.body.access_token != null
      }))
  });
});
