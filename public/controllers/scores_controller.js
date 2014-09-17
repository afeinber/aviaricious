(function () {

  var ScoresController = function(scoreFactory) {
    scoreFactory.getScores().
      success(function(scores) {
        var data = [];
        scores.forEach(function(score) {
          var arr = [];
          arr.push(score.createdAt);
          arr.push(score.percent);
          data.push(arr);
        });
        initializeGraph(data);
      });



    initializeGraph = function(data) {
      $(function () {
          $('#score-history').highcharts({
              chart: {
                  type: 'line'
              },
              title: {
                  text: 'Your Score History'
              },
              xAxis: {
                  type: 'datetime',

                  title: {
                     text: 'Date'
                  }
              },
              yAxis: {
                  title: {
                      text: 'Percent correct'
                  }
              },
              plotOptions: {
                  line: {
                      dataLabels: {
                          enabled: true
                      },
                      enableMouseTracking: false
                  }
              },
              series: [{
                  name: 'scores',
                  data: data
              }]
          });
      });
    };
  };

  ScoresController.$inject =["scoreFactory"];
  angular.module('aviariciousApp').
    controller('ScoresController', ScoresController);

})();
