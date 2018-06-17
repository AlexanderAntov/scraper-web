(function () {
    'use strict';

    angular.module('app.components.searchHeader', []).component('searchHeader', {
        templateUrl: 'components/search-header/search-header.html',
        bindings: {
            onSearch: '<?'
        },
        controller: function () {},
        controllerAs: 'searchHeader'
    });
})();
