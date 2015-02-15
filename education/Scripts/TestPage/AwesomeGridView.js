; (function ($, window, document, undefined) {
    var pluginName = 'awesomeGridView';

    var gridDefaultOptions = {
        ajaxOptions: {
            dataType: 'json'
        },
        callbackUrl: '',
        callbackType: 'GET'
    };
    
    function AwesomeGridView(container, options) {
        this.data = {};
        this.columns = [];
        this.$container = $(container);
        this.options = $.extend(true, gridDefaultOptions, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    AwesomeGridView.prototype = {
        init: function () {
            console.log('init');
        },

        refreshOptions: function (options) {
            this.options = $.extend(true, options, this.options);
            console.log('refresh options');
        },

        printOptions: function () {
            console.log(this.options)
        },

        refreshData: function (options) {
            //clone
            var tempAjaxOptions = $.extend({}, this.options.ajaxOptions);

            if (options)
                tempAjaxOptions = $.extend(tempAjaxOptions, options);            

            tempAjaxOptions.success = this.onDataQuerySucces;
            tempAjaxOptions.error = this.onDataQueryError;

            $.ajax(tempAjaxOptions);
        },

        refreshView: function () {
    
        },

        onDataQuerySucces: function (data) {
            this.data = data;
        },

        onDataQueryError: function () {
    
        }
    };
    $.fn[pluginName] = function (methodOrOptions, options) {
        return this.each(function () {
            var awesomeGridView = $.data(this, pluginName + this.selector);
            if (!awesomeGridView) {
                if (!methodOrOptions) {
                    awesomeGridView = new AwesomeGridView(this, null);
                }
                else if (typeof methodOrOptions === 'object') {
                    awesomeGridView = new AwesomeGridView(this, methodOrOptions);
                }
                else if (typeof methodOrOptions === 'string') {
                    awesomeGridView = new AwesomeGridView(this, options);
                    awesomeGridView[methodOrOptions](options);
                }
            }
            else {
                if (typeof methodOrOptions === 'object') {
                    awesomeGridView.refreshOptions(methodOrOptions);
                }
                else if (typeof methodOrOptions === 'string') {
                    awesomeGridView[methodOrOptions](options);
                }
            }

            $.data(this, pluginName + this.selector, awesomeGridView);
        });
    };

    //subclasses
    function Column() {

    }

})(jQuery, window, document);
