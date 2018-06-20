class MainNewsListCtrl {
    constructor($http, $scope, $sce, appConst) {
        this.$http = $http;
        this.$scope = $scope;
        this.$sce = $sce;
        this.appConst = appConst;
    }

    $onInit() {
        this.$scope.summarize = (model) => this.summarize(model);
        this.$scope.filterTopStories = () => this.filterTopStories();
        this.$scope.readTopStories = () => this.readTopStories();
        this.$scope.readBriefing = () => this.readBriefing();
        NewsListsService.init(this.$scope);

        this.$http.get('{0}/news?images="true"'.replace('{0}', this.appConst.backendUrl)).then((response) => {
            if (response && response.data && response.data.length > 0) {
                response.data.forEach((newsModel, index) => {
                    if (index === 0 || index === 1) {
                        newsModel.info = newsModel.info.replace(/\n/g, '<br/>');
                    }
                    newsModel.infoHtml = this.$sce.trustAsHtml(newsModel.info);
                    newsModel.summarizeVisible = newsModel.provider === 4 || newsModel.provider === 6;
                });
                this.$scope.newsList = response.data;
                this.$scope.pristineNewsList = response.data;
            }
        });
    }

    summarize(model) {
        window.open('{0}/scrape/{1}'
            .replace('{0}', this.appConst.backendUrl)
            .replace('{1}', model.id));
    }

    filterTopStories() {
        const providerMap = {},
            topStoriesNewsList = [];

        this.$scope.newsList.forEach((newsModel) => {
            if (!providerMap[newsModel.provider]) {
                providerMap[newsModel.provider] = 1;
            }
            if (providerMap[newsModel.provider] <= 3 && (newsModel.provider === 4 || newsModel.provider === 6 || newsModel.provider === 7)) {
                topStoriesNewsList.push(newsModel);
            }
            providerMap[newsModel.provider]++;
        });

        this.$scope.newsList = topStoriesNewsList;
    }

    readTopStories() {
        const readNewsPiece = (index) => {
            window.utterances = [];

            const message = new SpeechSynthesisUtterance(this.$scope.newsList[index].title);
            message.onend = () => {
                index++;
                if (this.$scope.newsList.length > index) {
                    readNewsPiece(index);
                } else {
                    window.utterances = null;
                }
            };
            message.onerror = (event) => {
                console.log('An error has occurred with the speech synthesis: ', event.error);
            };

            window.utterances.push(message);
            window.speechSynthesis.speak(message);
        };

        this.filterTopStories();
        readNewsPiece(0);
    }

    readBriefing() {
        const createWeatherSummary = (weatherData) => {
            messageText += 'Today\'s forecast is: ' + weatherData.list[0].weather[0].description + '.';
            messageText += 'The minimum temperature will be: ' + Math.round(weatherData.list[0].temp.min) + ',';
            messageText += 'and maximum will be: ' + Math.round(weatherData.list[0].temp.max) + '.';
            messageText += 'Today\'s top news are: ';

            const message = new SpeechSynthesisUtterance(messageText);
            message.onend = () => {
                this.$scope.$evalAsync(() => this.readTopStories());
            };
            message.onerror = (event) => {
                console.log('An error has occurred with the speech synthesis: ', event.error);
            };

            window.utterances.push(message);
            window.speechSynthesis.speak(message);
        };

        window.utterances = [];

        let messageText = '';
        this.$http.get('{0}/weather-raw'.replace('{0}', this.appConst.backendUrl)).then((response) => {
            if (response && response.data) {
                createWeatherSummary(response.data)
            } else {
                this.readTopStories();
            }
        });
    }
}

angular.module('app.mainNewsList', [
    'app.components.tileGrid',
    'app.components.searchHeader'
])
.controller('mainNewsListCtrl', MainNewsListCtrl);
