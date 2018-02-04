(function () {
    'use strict';

    angular.module('app.keywordsBarChart', [])
        .controller('keywordsBarChartCtrl', KeywordsBarChartCtrl);

    function KeywordsBarChartCtrl($http, appConst) {
        $http.get('{0}/news-keywords'.replace('{0}', appConst.backendUrl)).then(function (response) {
            var keywordData = [];
            response.data.slice(0, 50).forEach(function (model) {
                keywordData.push([model.word, model.score]);
            });

            Highcharts.chart('keywords-chart-container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'News top keywords'
                },
                subtitle: {
                    text: 'top 50 keywords'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'score'
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'News score',
                    data: keywordData,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        y: 10,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        });
    }
})();
