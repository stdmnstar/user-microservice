import jwk from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import request from 'request';

import {
  APIGatewayAuthorizerCallback,
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
  Context,
  PolicyDocument,
  Statement,
} from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

// For Auth0:       https://<project>.auth0.com/
// refer to:        http://bit.ly/2hoeRXk
// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>
// refer to:        http://amzn.to/2fo77UI
const iss = 'https://<url>.com/';

const generatePolicy = (principalId: string, effect: string, resource: string): APIGatewayAuthorizerResult => {
  const authResponse: APIGatewayAuthorizerResult = {} as APIGatewayAuthorizerResult;
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {} as PolicyDocument;
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {} as Statement & { Action: string; Resource: string };
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

const authorize = (
  event: APIGatewayTokenAuthorizerEvent,
  _context: Context,
  cb: APIGatewayAuthorizerCallback
): void => {
  console.log('Auth function invoked');
  if (!event.authorizationToken) {
    console.log('No authorizationToken found in the header.');
    cb('Unauthorized');
  }

  const token = event.authorizationToken.substring(7);

  request({ url: `${iss}/.well-known/jwks.json`, json: true }, (error, response, body) => {
    if (error || response.statusCode !== StatusCodes.OK) {
      console.log('Request error:', error);
      cb('Unauthorized');
    }
    const keys = body;
    const k = keys.keys[0];
    const jwkArray = {
      kty: k.kty,
      n: k.n,
      e: k.e,
    };
    const pem = jwkToPem(jwkArray);

    jwk.verify(token, pem, { issuer: iss }, (err, decoded) => {
      if (err) {
        console.log('Unauthorized user:', err.message);
        cb('Unauthorized');
      } else {
        cb(null, generatePolicy(decoded?.sub as string, 'Allow', event.methodArn));
      }
    });
  });
};

export default authorize;
