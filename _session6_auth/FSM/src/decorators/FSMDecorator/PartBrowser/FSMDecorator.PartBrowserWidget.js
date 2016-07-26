/*globals define, _*/
/*jshint browser: true*/
/**
 * This decorator inherits from the ModelDecorator.PartBrowserWidget.
 * With no changes to the methods - it will functions just like the ModelDecorator.
 *
 * For more methods see the ModelDecorator.PartBrowserWidget.js in the webgme repository.
 *
 * @author pmeijer / https://github.com/pmeijer
 */

define([
    'decorators/ModelDecorator/PartBrowser/ModelDecorator.PartBrowserWidget',
    'jquery',
    'underscore'
], function (ModelDecoratorPartBrowserWidget) {

    'use strict';

    var FSMDecoratorPartBrowserWidget,
        DECORATOR_ID = 'FSMDecoratorPartBrowserWidget';

    FSMDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend({}, options);

        ModelDecoratorPartBrowserWidget.apply(this, [opts]);

        this.logger.debug('FSMDecoratorPartBrowserWidget ctor');
    };

    _.extend(FSMDecoratorPartBrowserWidget.prototype, ModelDecoratorPartBrowserWidget.prototype);
    FSMDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DiagramDesignerWidgetDecoratorBase MEMBERS **************************/

    FSMDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        ModelDecoratorPartBrowserWidget.prototype.beforeAppend.apply(this, arguments);
    };

    FSMDecoratorPartBrowserWidget.prototype.afterAppend = function () {
        ModelDecoratorPartBrowserWidget.prototype.afterAppend.apply(this, arguments);
    };

    FSMDecoratorPartBrowserWidget.prototype.update = function () {
        ModelDecoratorPartBrowserWidget.prototype.afterAppend.apply(this, arguments);
    };

    return FSMDecoratorPartBrowserWidget;
});