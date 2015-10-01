#!/usr/bin/env node
// ┌───────────────┐
// │ Deploy Script │
// └───────────────┘
// Builds a json file with all site content

var fs = require('fs')
var jf = require('jsonfile')
var path = require('path')
var yaml = require('js-yaml')
var mark = require('marked')
var now = Date.now()
var version = require('../package.json').version
//var icons = require('../docs/source/icons-social.json')
var response = {
  elements: []
}

// var iconFont = require('../docs/source/icons-font.json').icons.map(function (icon) {
//   return icon.properties.name
// })

function constructItem(content, meta) {
  var item = {
    _id: content.id,
    name: content.title,
    slug: content.link,
    tags: ['calcite-bootstrap', 'web', content.title, meta.group, meta.page, meta.page_slug],
    sort_order: meta.order,
    group: meta.group,
    LastModified: now
  }

  var markdownPath = path.join('docs', 'source', meta.page_slug, '_' + item.slug + '.md')
  var markdown = fs.readFileSync(markdownPath, 'utf8')

  item.description = JSON.stringify(mark(markdown))

  if (content.modifiers && typeof content.modifiers !== 'boolean') {
    item.modifiers = content.modifiers
    var samplePath = path.join('docs', 'source', meta.page_slug, 'sample-code', '_' + item.slug + '.html')
    var sample = fs.readFileSync(samplePath, 'utf8')
    item.sample_code = JSON.stringify(sample)
  }

  if (content.colors) {
    item.color_names = content.colors
  }

  if (meta.page === 'Icons') {
    if (content.title === 'Social Icons') {
      item.icon_names = icons
    }
    if (content.title === 'Icon Font') {
      item.icon_names = iconFont
    }
    if (content.title === 'Calcite Icons') {
      item.icon_names = icons.calcite
    }
  }

  response.elements.push(item)
}

var contents = yaml.safeLoad(fs.readFileSync('docs/source/table_of_contents.yml', 'utf8'))
var pages = Object.keys(contents).map(function (page) {
  return contents[page]
})

pages.forEach(function (page, pageIndex) {
  var meta = {
    page: page.title,
    page_slug: page.base
  }
  page.navigation.forEach(function (group, groupIndex){
    meta.group = group.group
    meta.group_order = groupIndex * 100
    group.pages = group.pages.map(function (section, sectionIndex) {
      meta.order = groupIndex * 100 + sectionIndex
      return constructItem(section, meta)
    })
  })
})

jf.writeFileSync('dist/latest.json', response)
jf.writeFileSync(path.join('dist/', 'v' + version + '.json'), response)

process.exit(0)
