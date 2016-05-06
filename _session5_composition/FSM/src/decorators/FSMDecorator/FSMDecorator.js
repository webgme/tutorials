/*globals define, _*/
/*jshint browser: true, camelcase: false*/
/**
 * @author pmeijer / https://github.com/pmeijer
 */

define([
    'js/Decorators/DecoratorBase',
    './DiagramDesigner/FSMDecorator.DiagramDesignerWidget',
    './PartBrowser/FSMDecorator.PartBrowserWidget'
], function (DecoratorBase, FSMDecoratorDiagramDesignerWidget, FSMDecoratorPartBrowserWidget) {

    'use strict';

    var FSMDecorator,
        DECORATOR_ID = 'FSMDecorator';

    FSMDecorator = function (params) {
        var opts = _.extend({loggerName: this.DECORATORID}, params);

        DecoratorBase.apply(this, [opts]);

        this.logger.debug('FSMDecorator ctor');
    };

    _.extend(FSMDecorator.prototype, DecoratorBase.prototype);
    FSMDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    FSMDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {
            DiagramDesigner: FSMDecoratorDiagramDesignerWidget,
            PartBrowser: FSMDecoratorPartBrowserWidget
        };
    };

    return FSMDecorator;
});