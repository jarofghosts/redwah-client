function GridCtrl($scope, $http, $location) {

  $scope.remote = {
    id: null,
    rev: null
  };

  $scope.highestItem = -1;
  $scope.loaded = false;
  $scope.finished = false;
  $scope.listName = '';
  $scope.qualities = [];
  $scope.items = [];

  $scope.addQuality = function () {
    if (!$scope.qualityText.length) { return; }
    $scope.qualities.push($scope.qualityText);
    $scope.items.forEach(function (item) {
      item.qualities.push(0);
    });
    $scope.qualityText = '';
  };
  $scope.finishList = function () {
    $scope.finished = true;
    saveList();
  };
  $scope.addItem = function () {
    if (!$scope.itemText.length) { return; }
    var newItem = { "name": $scope.itemText, "qualities": [], "description": $scope.itemDescription }
    for (var i = $scope.qualities.length; i > 0; i--) { newItem.qualities.push(0); }
    $scope.items.push(newItem);
    $scope.itemText = '';
    $scope.itemDescription = '';
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
    if ($scope.items.length && $scope.loaded) {
      saveList();
    }
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

  $scope.createList = function () {
    if (!$scope.listName.length) {
      return false;
    }

    var newId = $scope.listName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    $http.get('http://projects.jessekeane.me/list?id=' + newId)
      .success(function (data, status) {
        if (data.error && data.error == 'not_found') {
          generateList(newId, newName);
        } else {
          alert('there was an error, try a different name');
        }
      })
      .error(function (data, status) {
        alert('there was an error');
      });

  };
  
  var saveList = function () {
    if (!$scope.loaded) { return false; }
    $http.put('http://projects.jessekeane.me/list',
      { id: $scope.remote.id,
        rev: $scope.remote.rev,
        name: $scope.listName,
        qualities: $scope.qualities,
        items: $scope.items,
        finished: $scope.finished })
          .success(function (data, status) {
            $scope.remote.rev = data.rev;
            $location.path('/' + $scope.remote.id);
            console.log(data);
          })
          .error(function (data, status) {
            alert('there was an error');
            console.log(data);
          });
  };

  var generateList = function (newId, newListName) {
    $http.post('http://projects.jessekeane.me/list', { id: newId, name: newListName })
      .success(function (data, status) {
        $location.path("/" + data.id);
        $scope.remote.id = data.id;
        $scope.remote.rev = data.rev;
        $scope.loaded = true;
      })
      .error(function (data, status) {
        alert('there was an error.');
        console.log(data);
      });
  };

  var loadList = function (listId) {
    $http.get('http://projects.jessekeane.me/list?id=' + listId)
      .success(function (data, status) {
        if (data.error && data.error == 'not_found') {
          return generateList(listId, listId);
        }
        $scope.remote.id = data._id;
        $scope.remote.rev = data._rev;
        $scope.items = data.items || [];
        $scope.qualities = data.qualities || [];
        $scope.listName = data.name;
        $scope.finished = data.finished;
        $scope.loaded = true;
      })
      .error(function (data, status) {
        alert('there was an error');
      });
  };

  var removeList = function (listId) {
    $http.del('http://projects.jessekeane.me', { id: listId })
      .success(function (data, status) {
        
      })
      .error(function (data, status) {
        alert('there was an error');
        console.log(data);
      });
  };

  if ($location.path().length) {
    var getDoc = $location.path().substring(1);
    loadList(getDoc);
  }

}
