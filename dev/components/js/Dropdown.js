;!function (global, factory) {
    typeof exports === 'object' && module !== 'undefined'
        ? module.exports = factory(global) : typeof define === 'function' && define.amd
        ? define([global], factory) : global.Dropdown = factory(global);
}(this, function (global) {
    const {
        jQuery: $,
        ClassName: {
            DROPDOWN_CONTAINER_CLASS, DROPDOWN_ITEM_CLASS, DROPDOWN_ACTIVE_ITEM_CLASS
        },
        util: {
            propsChecker, extend, appendClass
        }
    } = global;

    const defaultProps = {
        dataSource: []
    };

    function Dropdown(props) {
        propsChecker({
            dataSource: 'array',
            defaultActiveKey: 'string'
        });

        this.props = extend({}, defaultProps, props);
        this.html = this.render();
    }

    extend(Dropdown.prototype, {
        render() {
            const { dataSource, defaultActiveKey } = this.props;
            const defaultKey = defaultActiveKey == null
                ? dataSource[0] && dataSource[0].key
                : defaultActiveKey;

            const inner = dataSource.map(item => {
                const { key, label } = item;
                const className = appendClass(
                    DROPDOWN_ITEM_CLASS,
                    key === defaultKey ? DROPDOWN_ACTIVE_ITEM_CLASS : ''
                );

                return $.node('li', label, className, {
                    dataKey: key
                });
            });

            return $.node('ul', inner, DROPDOWN_CONTAINER_CLASS);
        }
    });

    return Dropdown;
});