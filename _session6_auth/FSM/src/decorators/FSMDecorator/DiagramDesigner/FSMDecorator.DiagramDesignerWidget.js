/*globals define, _, WebGMEGlobal*/
/*jshint browser: true, camelcase: false*/
/**
 * This decorator inherits from the ModelDecorator.DiagramDesignerWidget.
 * With no changes to the methods - it will functions just like the ModelDecorator.
 *
 * For more methods see the ModelDecorator.DiagramDesignerWidget.js in the webgme repository.
 *
 * @author pmeijer / https://github.com/pmeijer
 */

define([
    'js/RegistryKeys',
    'js/Constants',
    'decorators/ModelDecorator/DiagramDesigner/ModelDecorator.DiagramDesignerWidget',
    'jquery',
    'underscore'
], function (
    REGISTRY_KEYS,
    CONSTANTS,
    ModelDecoratorDiagramDesignerWidget) {

    'use strict';

    var FSMDecorator,
        DECORATOR_ID = 'FSMDecorator';

    FSMDecorator = function (options) {
        var opts = _.extend({}, options);

        ModelDecoratorDiagramDesignerWidget.apply(this, [opts]);

        this.logger.debug('FSMDecorator ctor');
        this.$resultIndicator = $('<span/>', {
            text: 'Will indicate result'
        });

        //http://bootstrapdocs.com/v3.3.6/docs/javascript/#buttons
        this.$runPluginBtn = $('<button/>', {
            type: 'button',
            class: 'btn btn-primary',
            text: 'Run Plugin'
        });
    };

    FSMDecorator.prototype = Object.create(ModelDecoratorDiagramDesignerWidget.prototype);
    FSMDecorator.prototype.constructor = FSMDecorator;
    FSMDecorator.prototype.DECORATORID = DECORATOR_ID;

    FSMDecorator.prototype.on_addTo = function () {
        var client = this._control._client,
            nodeObj = client.getNode(this._metaInfo[CONSTANTS.GME_ID]);

        this.logger.debug('This node was added to the canvas', nodeObj);

        // Call the base-class method..
        ModelDecoratorDiagramDesignerWidget.prototype.on_addTo.apply(this, arguments);

        this.$el.append(this.$resultIndicator);
        this.$el.append(this.$runPluginBtn);

        this._checkForResult(client, nodeObj);
    };

    FSMDecorator.prototype.destroy = function () {
        this.$runPluginBtn.off('click');
        ModelDecoratorDiagramDesignerWidget.prototype.destroy.apply(this, arguments);
    };

    FSMDecorator.prototype.update = function () {
        var client = this._control._client,
            nodeObj = client.getNode(this._metaInfo[CONSTANTS.GME_ID]);

        this.logger.debug('This node is on the canvas and received an update event', nodeObj);

        ModelDecoratorDiagramDesignerWidget.prototype.update.apply(this, arguments);

        this._checkForResult(client, nodeObj);
    };

    FSMDecorator.prototype._checkForResult = function (client, nodeObj) {
        var self = this,
            assetHash = nodeObj.getAttribute('simulator'),
            originHash = nodeObj.getAttribute('simulatorOrigin'),
            project = client.getProjectObject();

        this.$runPluginBtn.off('click');
        this.$runPluginBtn.css('display', 'none');
        if (assetHash) {
            this.$resultIndicator.text('Code is attached!');
            project.loadObject(client.getActiveCommitHash(), function (err, commitObj) {
                if (err) {
                    self.logger.error(err);
                } else {
                    self.logger.debug('commitObj', commitObj);
                    if (commitObj.parents && commitObj.parents.indexOf(originHash) > -1) {
                        self.$resultIndicator.text('Has new code');
                        self.$resultIndicator.css('color', 'green');
                    } else {
                        self.$resultIndicator.text('Has older code');
                        self.$resultIndicator.css('color', 'orange');
                    }
                }
            });
        } else {
            this.$resultIndicator.text('');
            this.$runPluginBtn.css('display', 'inline-block');
            this.$runPluginBtn.on('click', function () {
                self.logger.debug('Clicked node', nodeObj.getAttribute('name'));
                // See client API webgme/src/client/pluginmanager.js
                // By default the activeNode is the "opened" node, in our case we want the node with the btn defined.
                var pluginContext = client.getCurrentPluginContext('FSMCodeGenerator', nodeObj.getId());

                client.runBrowserPlugin('FSMCodeGenerator', pluginContext, function (err, pluginResult) {
                    if (err) {
                        self.logger.error(err);
                    }

                    self.logger.info('Plugin finished', pluginResult);
                });
            });
        }
    };

    return FSMDecorator;
});