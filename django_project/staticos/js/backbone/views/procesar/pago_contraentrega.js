/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var LineasResumenView = Backbone.View.extend({

        //template: swig.compile($('#pago_tarjeta_tlp').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {

        },

        initialize: function () {
            console.log('inicio has algo')
        },

        render: function () {
            
        },
    });

    return LineasResumenView;
});
