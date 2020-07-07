const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./database.json');

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';

const expiresIn = '1h';

// Create a token from a payload 
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}) {
  fs.readFile("./users.json", (err, data) => {
    data = JSON.parse(data.toString());
    return data.users.findIndex(user => user.email === email && user.password === password) !== -1
  });
}

// Register New User
server.post('/auth/register', (req, res) => {
  const {email, password} = req.body;

  if (isAuthenticated({email, password}) === true) {
    const status = 401;
    const message = 'Email and Password already exist';
    res.status(status).json({status, message});
    return
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }
    ;

    // Get current users data
    data = JSON.parse(data.toString());

    // Get the id of last user
    const last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({id: last_item_id + 1, email: email, password: password}); //add some data
    fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({status, message});
        return;
      }
    });
  });

// Create token for new user
  const access_token = createToken({email, password});
  const tokenData = verifyToken(access_token);
  res.status(200).json({access_token, exp: tokenData.exp});
});

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password});
  const tokenData = verifyToken(access_token);
  res.status(200).json({access_token, exp: tokenData.exp});
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({status, message});
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided';
      res.status(status).json({status, message});
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked';
    res.status(status).json({status, message})
  }
});

server.get('/lists', (req, res) => {
  const TokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
  if (TokenResult instanceof Error) {
    const status = 401;
    const message = 'Access token not provided';
    res.status(status).json({status, message});
    return
  } else {
    fs.readFile("./users.json", (err, data) => {
      const email = TokenResult.email;
      const password = TokenResult.password;
      data = JSON.parse(data.toString());
      const user = data.users.find(user => user.email === email && user.password === password);
      if (!user) {
        const status = 401;
        const message = "user doesn't exist";
        res.status(status).json({status, message});
        return
      }
      ;
      const userId = user.id;
      fs.readFile("./database.json", (err, data) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({status, message});
          return
        };

        // Get current users data
        data = JSON.parse(data.toString());

        const list = data.lists.filter(item => item.userIdOwner === userId);
        res.status(200).json(list);
      });
    })
  }
});

server.patch('/lists', (req, res) => {
  const TokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
  if (TokenResult instanceof Error) {
    const status = 401;
    const message = 'Access token not provided';
    res.status(status).json({status, message});
    return;
  } else {
    fs.readFile("./users.json", (err, data) => {
      const email = TokenResult.email;
      const password = TokenResult.password;
      data = JSON.parse(data.toString());
      const user = data.users.find(user => user.email === email && user.password === password);
      if (!user) {
        const status = 401;
        const message = "user can't be found";
        res.status(status).json({status, message});
        return;
      }
      const userId = user.id;
      if (!req.body.name) {
        const status = 401;
        const message = "name should be passed.";
        res.status(status).json({status, message});
        return;
      }
      if (!req.body.phone) {
        const status = 401;
        const message = "phone should be passed.";
        res.status(status).json({status, message});
        return;
      }
      const itemId = req.body.itemId;
      fs.readFile("./database.json", (err, data) => {
        if (err) {
          const status = 401;
          res.status(status).json({status, err});
          return
        }

        // Get current users data
        data = JSON.parse(data.toString());

        if (itemId) {
          const listItem = data.lists.find(item => item.userIdOwner === userId && item.id === itemId);

          if (!listItem) {
            const status = 401;
            const message = "item can't be found for the current user";
            res.status(status).json({status, message});
            return
          } else {
            listItem.name = req.body.name;
            listItem.phone = req.body.phone;
          }
        } else {
          const lastElement = data.lists.reduce(function (prev, current) {
            if (+current.id > +prev.id) {
              return current;
            } else {
              return prev;
            }
          });
          let maxId;
          if (lastElement) {
            maxId = lastElement.id + 1;
          } else {
            maxId = 1;
          }
          data.lists.push(
            {
              "id": maxId,
              "name": req.body.name,
              "phone": req.body.phone,
              "userIdOwner": userId
            }
          )
        }

        fs.writeFile("./database.json", JSON.stringify(data), (err, result) => {  // WRITE
          if (err) {
            const status = 401;
            res.status(status).json({status, err});
            return;
          }
        });
        const list = data.lists.filter(item => item.userIdOwner === userId);
        res.status(200).json({list});
      });
    });
  }
});

server.delete('/lists', (req, res) => {
  const TokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
  if (TokenResult instanceof Error) {
    const status = 401;
    const message = 'Access token not provided';
    res.status(status).json({status, message});
    return;
  } else {
    fs.readFile("./users.json", (err, data) => {
      data = JSON.parse(data.toString());
      const email = TokenResult.email;
      const password = TokenResult.password;
      const user = data.users.find(user => user.email === email && user.password === password);
      if (!user) {
        const status = 401;
        const message = "user can't be found";
        res.status(status).json({status, message});
        return;
      }
      ;
      const userId = user.id;
      if (!req.headers.id) {
        const status = 401;
        const message = "item can't be found.";
        res.status(status).json({status, message});
        return;
      }
      const itemId = +req.headers.id;
      fs.readFile("./database.json", (err, data) => {
        if (err) {
          const status = 401;
          res.status(status).json({status, err});
          return
        }

        // Get current users data
        data = JSON.parse(data.toString());

        if (itemId) {
          const listItem = data.lists.find(item => item.userIdOwner === userId && item.id === itemId);

          if (!listItem) {
            const status = 401;
            const message = "item can't be found for the current user";
            res.status(status).json({status, message});
            return
          } else {
            const listItemIndex = data.lists.findIndex(item => item.userIdOwner === userId && item.id === itemId);
            if (listItemIndex === -1) {
              const status = 401;
              const message = "item can't be found for the current user";
              res.status(status).json({status, message});
              return
            } else {
              data.lists.splice(listItemIndex, 1);
            }
          }
        }

        fs.writeFile("./database.json", JSON.stringify(data), (err, result) => {  // WRITE
          if (err) {
            const status = 401;
            res.status(status).json({status, err});
            return;
          }
        });
        const list = data.lists.filter(item => item.userIdOwner === userId);
        res.status(200).json({list});
      });
    });
  }
});

server.use(router)

server.listen(3001, () => {
  console.log('Run Auth API Server')
})