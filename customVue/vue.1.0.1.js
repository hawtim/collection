(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.Vue = factory());
}(this, (function () {
    var ASSET_TYPES = [
        'component',
        'directive',
        'filter'
    ];
    var config = ({
        /**
         * Option merge strategies (used in core/util/options)
         */
        // 自定义策略
        optionMergeStrategies: Object.create(null),
    });

    var strats = config.optionMergeStrategies;
    strats.el = strats.propsData = function (parent, child, vm, key) {
        if (!vm) {
            warn(
                "option \"" + key + "\" can only be used during instance " +
                'creation with the `new` keyword.'
            );
        }
        return defaultStrat(parent, child)
    };

    function extend(to, _from) {
        for (var key in _from) {
            to[key] = _from[key];
        }
        return to
    }

    var defaultStrat = function (parentVal, childVal) {
        return childVal === undefined ?
            parentVal :
            childVal
    };

    function mergeOptions(
        parent,
        child,
        vm
    ) {
        {
            checkComponents(child);
        }

        if (typeof child === 'function') {
            child = child.options;
        }

        normalizeProps(child, vm);
        normalizeInject(child, vm);
        normalizeDirectives(child);
        var extendsFrom = child.extends;
        if (extendsFrom) {
            parent = mergeOptions(parent, extendsFrom, vm);
        }
        if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
            }
        }
        var options = {};
        var key;
        for (key in parent) {
            mergeField(key);
        }
        for (key in child) {
            if (!hasOwn(parent, key)) {
                mergeField(key);
            }
        }
        // 确定最终的选项，策略处理
        function mergeField(key) {
            var strat = strats[key] || defaultStrat;
            options[key] = strat(parent[key], child[key], vm, key);
        }
        return options
    }

    function resolveConstructorOptions(Ctor) { // Vue
        var options = Ctor.options;
        console.log(options)
        if (Ctor.super) { // Vue.super => 在子类里才有 super 属性 Vue.extend 创建子类
            var superOptions = resolveConstructorOptions(Ctor.super);
            var cachedSuperOptions = Ctor.superOptions;
            if (superOptions !== cachedSuperOptions) {
                // super option changed,
                // need to resolve new options.
                Ctor.superOptions = superOptions;
                // check if there are any late-modified/attached options (#4976)
                var modifiedOptions = resolveModifiedOptions(Ctor);
                // update base extend options
                if (modifiedOptions) {
                    extend(Ctor.extendOptions, modifiedOptions);
                }
                options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
                if (options.name) {
                    options.components[options.name] = Ctor;
                }
            }
        }
        return options
    }

    function mergeOptions() {

    }

    function initMixin(Vue) {

    }

    function Vue$3(options) {
        if ("development" !== 'production' &&
            !(this instanceof Vue$3)
        ) {
            warn('Vue is a constructor and should be called with the `new` keyword');
        }
        this._init(options);
    }
    Vue.options = Object.create(null)
    var builtInComponents = {
        KeepAlive: KeepAlive
    };
    var platformComponents = {
        Transition: Transition,
        TransitionGroup: TransitionGroup
    };

    ASSET_TYPES.forEach(function (type) {
        Vue.options[type + 's'] = Object.create(null);
    });
    extend(Vue.options.components, builtInComponents);
    return Vue
})))
