module.exports = function (acetate) {
  acetate.layout('**/*', 'layouts/_doc');
  //acetate.layout('page-layouts/*.html', 'layouts/_blank:content');
  acetate.layout('examples/*.html', 'layouts/_blank:content');
  acetate.layout('components/*.html', 'layouts/_blank:content');

  acetate.data('table_of_contents', 'table_of_contents.yml');
  acetate.data('pkg','../../package.json');
  //acetate.data('icons', 'icons-social.json');
  //acetate.data('font', 'icons-font.json');
}
