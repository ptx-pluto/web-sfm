'use strict';

var utils = require('../utils.js'),
    settings = require('../settings.js'),
    RESOURCE = settings.RESOURCE;


module.exports = Ember.ObjectController.extend({

    needs: ['workspace', 'projectResource'],

    resource: Ember.computed.alias('controllers.projectResource'),

    img: null,

    features: null,

    isLoading: true,

    actions: {
        back: function(){
            this.transitionToRoute('workspace.extractor');
        }
    },

    onNewImage: function(){

        this.set('isLoading', true);

        var _self = this,
            resource = this.get('resource');

        return Promise.all([
            resource.promiseResource(RESOURCE.FULLIMAGES, _self.get('model')).then(utils.promiseBufferImage),
            resource.promiseResource(RESOURCE.FEATURE_POINTS, _self.get('model'))
        ]).then(function(results){
            _self.setProperties({
                img: results[0],
                features: results[1],
                isLoading: false
            });
        });

    }.observes('model')

});