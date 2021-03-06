var db = require('../lib/db');

function index(v, cbk)
{
  let data = {};

  let sql = `select * from Backups where uid = ${v.json.prv.user.id}`;

  db.exec (sql, (e, results) => {
    if (e)
    {
      cbk(e);
    }
    else
    {
      data.backups = results;

      sql = `select * from Agents where uid = ${v.json.prv.user.id}`;

      db.exec (sql, (e, results) => {
        if (e)
        {
          cbk(e);
        }
        else
        {
          data.agents = results;
          cbk(null, data);
        }
      });
    }
  });
}

module.exports = { index }