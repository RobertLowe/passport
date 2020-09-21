// import { Injectable, Scope, Inject } from '@nestjs/common';
// import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

import passport from 'fastify-passport';

// @Injectable({ scope: Scope.REQUEST })
export abstract class FastifyPassportSerializer {
  abstract registerUserSerializer(payload: any, request: FastifyRequest);
  abstract registerUserDeserializer(payload: any, request: FastifyRequest);

  // constructor(@Inject(REQUEST) private request: FastifyRequest) {
  constructor() {
    const passportInstance = this.getPassportInstance();
    // passportInstance.registerUserSerialize((user: any, request: FastifyRequest)=>{
    // return Promise.resolve();
    // });
    passportInstance.registerUserSerializer((payload, done) =>
      this.registerUserSerializer(payload, done)
    );
    passportInstance.registerUserDeserializer((payload, done) =>
      this.registerUserDeserializer(payload, done)
    );
  }

  getPassportInstance() {
    return passport;
  }
}
