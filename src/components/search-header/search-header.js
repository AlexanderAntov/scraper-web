(function () {
    'use strict';

    angular.module('app.components.searchHeader', []).component('searchHeader', {
        templateUrl: 'src/components/search-header/search-header.html',
        bindings: {
            onSearch: '<?'
        },
        controller: () => {},
        controllerAs: 'searchHeader'
    });
})();
