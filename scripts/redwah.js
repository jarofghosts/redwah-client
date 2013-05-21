function GridCtrl($scope) {
  $scope.qualities = [ "Cold Fridge", "Outlets", "W/D", "Neighborhood" ];
  $scope.items = [
    { "name": "House 1",
      "qualities": [0, 0, 0, 0, 0]
    },
    { "name": "House 2",
      "qualities": [0, 0, 0, 0, 0]
    },
    { "name": "House 3",
      "qualities": [0, 0, 0, 0, 0]
    }
  ];
}
