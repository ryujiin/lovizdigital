define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/catalogo/categorias_link',    
    '../../collections/tallas',
    '../../collections/catalogo/filtros',
    
], function ($, _, Backbone, swig,CateLink,TallasCollection,FiltrosCollection) {
    'use strict';

    var BloqueTallaView = Backbone.View.extend({

        template: swig.compile($('#categoria_bloque_tlp').html()),                        

        id: '',

        className: 'refinement Talla',

        events: {
            'click a.no_activo':'filtrar_talla',
            'click a.activo':'rm_filtrar_talla',
        },

        collection:TallasCollection,

        initialize: function () {
        },

        render: function () {
            var dato = {nombre:'Tallas'}
            this.$el.html(this.template(dato));

            this.addTallas();
        },
        addTallas:function () {
            var self = this;
            if (this.collection.length!==0) {
                this.collection.forEach(self.addTalla,self);
            }else{
                this.collection.fetch().done(function () {
                    self.collection.forEach(self.addTalla,self);
                })
            }
        },
        addTalla:function (modelo) {
            modelo.set({valor:'talla'});
            var vista = new CateLink({model:modelo});
            this.$('.lista').append(vista.render().el);
        },


        filtrar_talla:function (e) {
            var talla = e.target.dataset.valor;
            $(e.target).addClass('activo').removeClass('no_activo');
            FiltrosCollection.add([
                {tipo:'talla',valor:talla}
            ]);
        },
        rm_filtrar_talla:function(e){
            var talla = e.target.dataset.valor;
            $(e.target).addClass('no_activo').removeClass('activo');            
            var modelo = FiltrosCollection.findWhere({tipo:'talla',valor:talla});
            FiltrosCollection.remove(modelo);
        },
    });

    return BloqueTallaView;
});
