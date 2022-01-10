module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/danh-gia/listComments/:id',
        handler: 'comments.listComments',
      },
    ]
  }
   