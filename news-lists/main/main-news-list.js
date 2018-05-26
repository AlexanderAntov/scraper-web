(function () {
    'use strict';

    angular.module('app.mainNewsList', [
        'app.newsListsService'
    ])
    .controller('mainNewsListCtrl', MainNewsListCtrl);

    function MainNewsListCtrl($http, $scope, $sce, appConst, newsListsService) {
        $scope.summarize = summarize;
        $scope.filterTopStories = filterTopStories;
        $scope.readTopStories = readTopStories;
        $scope.readBriefing = readBriefing;
        newsListsService.init($scope);

        $http.get('{0}/news?images="true"'.replace('{0}', appConst.backendUrl)).then(function (response) {
            if (response && response.data && response.data.length > 0) {
                response.data.forEach(function (newsModel, index) {
                    if (index === 0 || index === 1) {
                        newsModel.info = newsModel.info.replace(/\n/g, '<br/>');
                    }
                    newsModel.infoHtml = $sce.trustAsHtml(newsModel.info);
                });
                $scope.newsList = response.data;
                $scope.pristineNewsList = response.data;
            }
        });

        function summarize(model) {
            window.open('{0}/scrape/{1}'
                .replace('{0}', appConst.backendUrl)
                .replace('{1}', model.id));
        }

        function filterTopStories() {
            var providerMap = {},
                topStoriesNewsList = [];
            $scope.newsList.forEach(function (newsModel) {
                if (!providerMap[newsModel.provider]) {
                    providerMap[newsModel.provider] = 1;
                }
                if (providerMap[newsModel.provider] <= 3 && (newsModel.provider === 4 || newsModel.provider === 6 || newsModel.provider === 7)) {
                    topStoriesNewsList.push(newsModel);
                }
                providerMap[newsModel.provider]++;
            });
            $scope.newsList = topStoriesNewsList;
        }

        function readTopStories() {
            filterTopStories();
            readNewsPiece(0);

            function readNewsPiece(index) {
                window.utterances = [];

                var message = new SpeechSynthesisUtterance($scope.newsList[index].title);
                message.onend = function () {
                    index++;
                    if ($scope.newsList.length > index) {
                        readNewsPiece(index);
                    } else {
                        window.utterances = null;
                    }
                };
                message.onerror = function (event) {
                    console.log('An error has occurred with the speech synthesis: ', event.error);
                };

                window.utterances.push(message);
                window.speechSynthesis.speak(message);
            }
        }

        function readBriefing() {
            window.utterances = [];

            var messageText = '';
            $http.get('{0}/weather-raw'.replace('{0}', appConst.backendUrl)).then(function (response) {
                if (response && response.data) {
                    createWeatherSummary(response.data)
                } else {
                    readTopStories();
                }
            });

            function createWeatherSummary(weatherData) {
                messageText += 'Today\'s forecast is: ' + weatherData.list[0].weather[0].description + '.';
                messageText += 'The minimum temperature will be: ' + Math.round(weatherData.list[0].temp.min) + ',';
                messageText += 'and maximum will be: ' + Math.round(weatherData.list[0].temp.max) + '.';
                messageText += 'Today\'s top news are: ';
                var message = new SpeechSynthesisUtterance(messageText);
                message.onend = function () {
                    $scope.$evalAsync(readTopStories);
                };
                message.onerror = function (event) {
                    console.log('An error has occurred with the speech synthesis: ', event.error);
                };

                window.utterances.push(message);
                window.speechSynthesis.speak(message);
            }
        }
    }
})();
