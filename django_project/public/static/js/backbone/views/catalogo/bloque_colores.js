define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/catalogo/categorias_link',    
    '../../collections/colores',
    '../../collections/catalogo/filtros',
], function ($, _, Backbone, swig,CateLink,ColoresCollection,FiltrosCollection) {
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
        },
        addColor:function(modelo){

            modelo.set({'valor':'color',activo:false});
            var vista = new CateLink({model:modelo});
            this.$('.lista').append(vista.render().el);
        },

        filtrar_color:function (e) {
            var color = e.target.dataset.valor;
            var coincidencia = this.collection.findWhere({nombre:color});
            coincidencia.set('activo',true)
            FiltrosCollection.add([
                {tipo:'color',valor:color}
            ]);
        },
        rm_filtrar_color:function(e){
            var color = e.target.dataset.valor;
            var coincidencia = this.collection.findWhere({nombre:color});
            coincidencia.set('activo',false)
            var modelo = FiltrosCollection.findWhere({tipo:'color',valor:color});
            FiltrosCollection.remove(modelo);
        },
    });

    return CatalogoBloqueColorView;
});
