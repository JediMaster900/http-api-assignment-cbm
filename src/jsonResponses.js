// function to send a json object
const respondJSON = (request, response, status, object, contentType) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': contentType });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(object);
  // Send the response to the client
  response.end();
};

// function to show a success status code
const success = (request, response, acceptedTypes) => {
  const message = 'This is a successful response';
  const id = 'success';

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message}</message>`;
    responseXML = `${responseXML} <id>${id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respondJSON(request, response, 200, responseXML, 'text/xml');
  }

  // message to send
  const responseJSON = {
    message,
    id,
  };

  const successString = JSON.stringify(responseJSON);

  // send our json with a success status code
  return respondJSON(request, response, 200, successString, 'application/json');
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, acceptedTypes, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';

    if (!params.valid || params.valid !== 'true') {
      responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
      responseXML = `${responseXML} <id>badRequest</id>`;
      responseXML = `${responseXML} </response>`;

      return respondJSON(request, response, 400, responseXML, 'text/xml');
    }

    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>badRequest</id>`;
    responseXML = `${responseXML} </response>`;

    return respondJSON(request, response, 200, responseXML, 'text/xml');
  }

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    const badRequestString = JSON.stringify(responseJSON);
    return respondJSON(request, response, 400, badRequestString, 'application/json');
  }

  const badRequestString = JSON.stringify(responseJSON);
  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, badRequestString, 'application/json');
};

// function to show not found error
const notFound = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';

    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respondJSON(request, response, 404, responseXML, 'text/xml');
  }

  const notFoundString = JSON.stringify(responseJSON);

  // return our json with a 404 not found error code
  return respondJSON(request, response, 404, notFoundString, 'application/json');
};

// function to show unauthorized status code
const unauthorized = (request, response, acceptedTypes, params) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'unauthorized',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';

    if (!params.loggedIn || params.loggedIn !== 'true') {
      responseXML = `${responseXML} <message>Missing loggedIn query parameter set to true</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respondJSON(request, response, 401, responseXML, 'text/xml');
    }

    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respondJSON(request, response, 200, responseXML, 'text/xml');
  }

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'true') {
    // set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'unauthorized';
    // return our json with a 400 bad request code

    const unauthorizedString = JSON.stringify(responseJSON);

    return respondJSON(request, response, 401, unauthorizedString, 'application/json');
  }

  const unauthorizedString = JSON.stringify(responseJSON);

  return respondJSON(request, response, 200, unauthorizedString, 'application/json');
};

// function to show forbidden error
const forbidden = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';

    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respondJSON(request, response, 403, responseXML, 'text/xml');
  }

  const forbiddenString = JSON.stringify(responseJSON);

  // return our json with a 403 forbidden error code
  return respondJSON(request, response, 403, forbiddenString, 'application/json');
};

// function to show internal error
const internal = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';

    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respondJSON(request, response, 500, responseXML, 'text/xml');
  }

  const internalString = JSON.stringify(responseJSON);
  // return our json with a 500 internal error code
  return respondJSON(request, response, 500, internalString, 'application/json');
};

// function to show not implemented error
const notImplemented = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';

    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respondJSON(request, response, 501, responseXML, 'text/xml');
  }

  const notImplementedString = JSON.stringify(responseJSON);
  // return our json with a 501 internal error code
  return respondJSON(request, response, 501, notImplementedString, 'application/json');
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
