function GridCtrl($scope, $http) {
  $scope.highestItem = -1;
  $scope.loaded = false;
  $scope.list = { name: '' };
  $scope.qualities = [];
  $scope.items = [];
 
  $scope.addQuality = function () {
    if (!$scope.qualityText.length) { return; }
    $scope.qualities.push($scope.qualityText);
    $scope.items.forEach(function (item) {
      item.qualities.push(0);
    });
    $scope.qualityText = '';
    $scope.$apply();
  };
  $scope.addItem = function () {
    if (!$scope.itemText.length) { return; }
    var newItem = { "name": $scope.itemText, "qualities": [] }
    for (var i = $scope.qualities.length; i > 0; i--) { newItem.qualities.push(0); }
    $scope.items.push(newItem);
    $scope.itemText = '';
    //$scope.$apply();
  };
  $scope.removeQuality = function (index) {
    $scope.qualities.splice(index, 1);
    $scope.items.forEach(function (item) {
      item.qualities.splice(index, 1);
    });
  };
  $scope.removeItem = function (index) {
    $scope.items.splice(index, 1);
  };
  $scope.lowerValue = function (item, quality) {
    $scope.items[item].qualities[quality] > -3 && $scope.items[item].qualities[quality]--;
  };
  $scope.increaseValue = function (item, quality) {
    $scope.items[item].qualities[quality] < 3 && $scope.items[item].qualities[quality]++;
  };
  $scope.qualityTotal = function (qualities) {
    var total = 0;
    qualities.forEach(function (quality) {
      total += quality;
    });

    return total;
  };
  $scope.$watch("items", function () {
  var highest = -1;
    $scope.items.forEach(function (item, index) {
      var myValue = $scope.qualityTotal(item.qualities);
      if (myValue > highest) {
        highest = myValue;
        $scope.highestItem = index;
      }
    });
  }, true);

  $http.defaults.useXDomain = true;

  $scope.saveList = function () {
  };

  $scope.generateList = function (listName) {
    $http.post('http://projects.jessekeane.me/list', { name: listName })
      .success(function (data, status) {
        $location.replace().hash('!/' + data.id);
      })
      .error(function (data, status) {
        alert('there was an error.');
        console.log(data);
      });
  };

  $scope.getList = function (listId) {
  };

  $scope.removeList = function () {
  };
}
