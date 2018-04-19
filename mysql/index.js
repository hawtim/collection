var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hawtim',
  password: '...',
  database: 'myexpress'
})

connection.connect()

// connection.query('SELECT * FROM websites', function (error, result, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', result);
// })


// var addSql = 'INSERT INTO websites(id, name, url, alexa, country) VALUES (0,?,?,?,?)';
// var addSqlParams = ['菜鸟工具', 'https://c.runoob.com', '23453', 'CN']

// connection.query(addSql, addSqlParams, function (err, result) {
//   if (err) {
//     console.log('[INSERT ERROR] - ', err.message)
//     return
//   }
//   console.log('------------INSERT-------------')
//   console.log('INSERT ID:', result)
//   console.log('-------------------------------\n\n')
// })


// var modSql = 'UPDATE websites SET name = ?, url = ? WHERE id = ?';
// var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com', 6]

// connection.query(modSql, modSqlParams, function (err, result) {
//   if (err) {
//     console.log('[UPDATE ERROR] - ', err.message)
//     return
//   }
//   console.log('------------UPDATE-------------')
//   console.log('UPDATE affectedRows', result.affectedRows)
//   console.log('-------------------------------\n\n')
// })

var id = 6
var delSql = `DELETE FROM websites where id=${id}`

connection.query(delSql, (err, result) => {
  if (err) {
    console.log('[DELETE ERROR] - ', err.message)
    return
  }
  console.log('------------DELETE-------------')
  console.log('DELETE affectedRows', result.affectedRows)
  console.log('-------------------------------\n\n')
})

connection.end()
