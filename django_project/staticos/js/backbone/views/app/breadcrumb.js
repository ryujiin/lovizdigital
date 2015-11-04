/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/app/breadcrumbLink',
    '../../collections/breadcrumb',
], function ($, _, Backbone, swig,BreadLink,BreadCollection) {
    'use strict';

    var BreadcrumbView = Backbone.View.extend({
        
        template: swig.compile($('#breadcrumb_tlp').html()),        


        id: '',

        className: '',

        events: {},

        collection: new BreadCollection(),

        initialize: function () {
            this.collection.reset();
        },

        render: function () {
            this.$el.html(this.template());
            this.$('ol').empty()
            this.collection.forEach(this.addLink,this);
        },

        addLink:function(modelo){
            var link = new BreadLink({model:modelo});
            this.$('ol').append(link.$el);

        },
        desaparecer:function () {
            this.$el.hide();
        }
    });

    return BreadcrumbView;
});
