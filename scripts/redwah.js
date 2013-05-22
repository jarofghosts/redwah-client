function GridCtrl($scope) {
  $scope.qualities = [ "Good Kitchen",  "Cold Fridge", "Outlets", "W/D", "Neighborhood" ];
  $scope.items = [
    { "name": "House 1",
      "qualities": [0, 0, 0, 0, 0]
    },
    { "name": "House 2",
      "qualities": [0, 0, 0, 0, 0]
    },
    { "name": "House 3",
      "qualities": [0, 0, 0, 0, 0]
    },
    { "name": "House 4",
      "qualities": [1, 0, 0, 0, 0]
    },
    { "name": "House 5",
      "qualities": [0, 0, 0, 0, 0]
    }
  ];
  $scope.addQuality = function () {
    $scope.qualities.push($scope.qualityText);
    $scope.items.forEach(function (item) {
      item.qualities.push(0);
    });
    $scope.qualityText = '';
    $scope.$apply();
  };
  $scope.addItem = function () {
    var newItem = { "name": $scope.itemText, "qualities": [] }
    for (var i = $scope.qualities.length; i > 0; i--) { newItem.qualities.push(0); }
    $scope.items.push(newItem);
    $scope.itemText = '';
    $scope.$apply();
  }
}
