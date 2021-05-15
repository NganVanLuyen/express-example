var db = require('../db');
const { nanoid } = require("nanoid");
const idlength = 8;

module.exports.index = function (req, res) {
   res.render('users/index', {
      users: db.get('users').value()
   });
}

module.exports.search = function (req, res) {
   var q = req.query.q;
   var matchedUsers = db.get('users').value().filter(function (user) {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      // q nằm trong string name thì >-1, không thuộc = -1
   });

   res.render('users/index', {
      users: matchedUsers
   });
}

module.exports.create = function (req, res) {
   console.log(req.cookies);
   res.render('users/create');
}

module.exports.get = function (req, res) {
   var id = req.params.id; //router parameter

   var user = db.get('users').find({ id: id }).value();

   res.render('users/view', {
      user: user
   });
}

module.exports.postCreate = function (req, res) {
   req.body.id = nanoid(idlength);
   
   console.log(res.locals);
   //có thể lưu biến để gửi cho middleware tiếp

   db.get('users').push(req.body).write();
   res.redirect('/users');
}