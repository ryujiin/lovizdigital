define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/cliente/mayorista_list',    
], function ($, _, Backbone, swig,MayoristaList) {
    'use strict';

    var MayoristaPanelViews = Backbone.View.extend({
        
        template: swig.compile($('#mayoristas_panel_tlp').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            //this.listenTo(this.collection, 'add', this.addOne);
            this.render();
        },
        render:function () {
            var self = this;
            this.collection.fetch().done(function (data) {
                self.$el.html(self.template({num:data.length}));
                self.collection.forEach(self.addOne,self)
            });
            
        },
        addOne:function (modelo) {
            var mayorista_list = new MayoristaList({model:modelo});
            this.$('.lista_mayoristas').append(mayorista_list.$el);
        }
    });

    return MayoristaPanelViews;
});