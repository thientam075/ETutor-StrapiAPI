module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/tin-quang-bas/getAdByTeacherId/:id',
        handler: 'shortinfo.getAdByTeacherId',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/tin-quang-bas/searchTutor',
        handler: 'shortinfo.searchTeacher',
      },
      { // Path defined with a regular expression
        method: 'GET',
        path: '/tin-quang-bas/rankTutor', // Only match when the first parameter contains 2 or 3 digits.
        handler: 'shortinfo.rankTutor',
      },
      {
        method: 'GET',
        path: '/tin-quang-bas/fullInfo/:id', // Only match when the first parameter contains 2 or 3 digits.
        handler: 'shortinfo.fullInfoTeacher',
      },
      {
        method: 'GET',
        path: '/tin-quang-bas/findAllInfo', // Only match when the first parameter contains 2 or 3 digits.
        handler: 'shortinfo.findAllTutor',
      },
      {
        method: 'GET',
        path: '/tin-quang-bas/updateIndex', // Only match when the first parameter contains 2 or 3 digits.
        handler: 'shortinfo.updateIndex',
      },
    ]
  }
   