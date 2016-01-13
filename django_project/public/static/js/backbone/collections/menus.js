/*global define*/

define([
    'underscore',
    'backbone',
    '../models/menu'
], function (_, Backbone, MenuModel) {
    'use strict';

    var MenuCollection = Backbone.Collection.extend({
        url: '/api/cmsweb/menus/',
        
        model: MenuModel,
    });

    return MenuCollection;
});
