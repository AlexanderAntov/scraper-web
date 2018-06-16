(function () {
    'use strict';

    angular.module('app.components.tileGrid', []).component('tileGrid', {
        templateUrl: 'components/tile-grid/tile-grid.html',
        bindings: {
            itemsList: '<?',
            summarize: '<?'
        },
        controller: function () {
            this.$onChanges = function (changes) {
                if (changes && changes.itemsList) {
                    var itemWidth = getItemWidth() + 'px',
                        tilesList = document.getElementsByClassName('item-container'),
                        tilesListLength = tilesList.length,
                        iter;

                    for (iter = 0; iter < tilesListLength; iter++) {
                        tilesList[iter].style.width = itemWidth;
                    }
                }
            };

            function getItemWidth() {
                var columnCount = 1,
                    pixels = window.innerWidth;

                if (pixels > 1750) {
                    columnCount = 4;
                } else if (pixels < 1750 && pixels > 1200) {
                    columnCount = 3;
                } else if (pixels < 1200 && pixels > 900) {
                    columnCount = 2;
                }

                return (window.innerWidth - (columnCount + 2) * 20) / columnCount;
            }
        },
        controllerAs: 'tileGrid'
    });
})();
