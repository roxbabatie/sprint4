$.fn.confirm = function(options) {
    var defaults = {
        message: '',
        onConfirm: function() {},
        onReject: function() {}
    };

    var methods = {};

    return this.each(function () {
        if (!options || typeof options == 'object') {
            options = $.extend(defaults, options);

            //si ascult evenimente
            var $this = $(this);

            $this.click(function() {
                if (confirm(options.message)) {
                    options.onConfirm.call(this);
                } else {
                    options.onReject.call(this);
                }

                return false;
            });
        } else {
            if (methods.hasOwnProperty(options)) {
                methods[options].call(this);
            }
        }
    });
};
