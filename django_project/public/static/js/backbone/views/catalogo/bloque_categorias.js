/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/catalogo/categorias_link',
], function ($, _, Backbone, swig,CateLink) {
    'use strict';

    var CategoriaBloqueView = Backbone.View.extend({

        template: swig.compile($('#categoria_bloque_tlp').html()),                

        id: '',

        className: 'refinement',

        events: {},

        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.addlista();
        },
        addlista:function () {           
            this.collection.where({padre:this.model.toJSON().slug}).forEach(this.addlink,this);
        },
        addlink:function (modelo) {
            var vista = new CateLink({model:modelo});
            this.$('.lista').append(vista.render().el);
        }
    });

    return CategoriaBloqueView;
});
