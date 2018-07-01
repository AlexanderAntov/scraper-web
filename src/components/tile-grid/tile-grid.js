angular.module('app.components.tileGrid', []).component('tileGrid', {
    templateUrl: 'src/components/tile-grid/tile-grid.html',
    bindings: {
        itemsList: '<?',
        summarize: '<?'
    },
    controller: class TileGridCtrl {
        $onChanges(changes) {
            if (changes && changes.itemsList) {
                const itemWidth = this._getItemWidth() + 'px',
                    tilesList = document.getElementsByClassName('item-container'),
                    tilesListLength = tilesList.length;
                let iter;

                for (iter = 0; iter < tilesListLength; iter++) {
                    tilesList[iter].style.width = itemWidth;
                }
            }
        };

        _getItemWidth() {
            const pixels = window.innerWidth;
            let columnCount = 1;

            if (pixels > 1750) {
                columnCount = 4;
            } else if (pixels < 1750 && pixels > 1200) {
                columnCount = 3;
            } else if (pixels < 1200 && pixels > 900) {
                columnCount = 2;
            }

            return (window.innerWidth - (columnCount + 2) * 20) / columnCount;
        };
    },
    controllerAs: 'tileGrid'
});