define(["underscore","backbone","../models/nueva_imagen_comentario"],function(e,n,o){"use strict";var i=n.Collection.extend({url:"/api/comentarioimgs/",model:o});return i});