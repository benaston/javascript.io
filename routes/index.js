exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.syllabus = function(req, res){
  res.render('syllabus', { title: 'Express' });
};
exports.logo = function(req, res){
  res.render('logo', { title: 'Express' });
};
