exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.syllabus = function(req, res){
  res.render('syllabus', { title: 'Express' });
};
