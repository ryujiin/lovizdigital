define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/catalogo/categorias_link',    
    '../../collections/colores',
], function ($, _, Backbone, swig,CateLink,ColoresCollection) {
    'use strict';

    var CatalogoBloqueColorView = Backbone.View.extend({

        template: swig.compile($('#categoria_bloque_tlp').html()),                        

        id: '',

        className: '',

        events: {
            'click a.no_activo':'filtrar_color',
            'click a.activo':'rm_filtrar_color',
        },

        collection:ColoresCollection,

        initialize: function () {
            this.render();
        },

        render: function () {
            var dato = {nombre:'Colores'}
            this.$el.html(this.template(dato));
            this.addColores();
        },
        addColores:function () {
            var self = this;
            if (this.collection.length!==0) {
                this.collection.forEach(self.addColor,self);
            }else{
                this.collection.fetch().done(function () {
                    self.collection.forEach(self.addColor,self);
                })
            }
            //this.addFiltros();
        },
        addColor:function(modelo){
            modelo.set({valor:'color'});
            var vista = new CateLink({model:modelo});
            this.$('.lista').append(vista.render().el);
        },
        addFiltros:function () {
            this.collection.forEach(function (data) {
                debugger;
            })
        },
        filtrar_color:function (e) {
            $(e.target).removeClass('no_activo').addClass('activo');            
            var color = e.target.dataset.valor;
            this.collection.add([
                {tipo:'color',valor:color}
            ]);
        },
        rm_filtrar_color:function(e){
            debugger;
            $(e.target).removeClass('activo').addClass('no_activo');            
            var color = e.target.dataset.valor;
            var modelo = this.collection.findWhere({tipo:'color',valor:color});
            this.collection.remove(modelo);
            debugger;
        }
    });

    return CatalogoBloqueColorView;
});
