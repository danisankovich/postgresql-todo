var app = angular.module('psqlTodo', []);
app.controller('mainCtrl', function($scope, $http) {
  $scope.formData = {};
  $scope.todoData = {};
  $scope.editing = false;
  var editId = '';

  $http.get('/api/v1/todos').success(function(data) {
    $scope.todoData = data;
    console.log(data);
  }).error(function(error) {
    console.log("Error: " + error);
  });
$scope.createTodo = function(todoID) {
  $http.post('/api/v1/todos', $scope.formData).success(function(data) {
    $scope.formData = {};
    $scope.todoData = data;
    console.log(data);
  }).error(function(error) {
    console.log("Error: " + error);
  });
};

$scope.showEdit = function() {
  $scope.editing = true;
  editId = this.todo.id;
};

$scope.updateTodo = function() {
  $http.put('/api/v1/todos/' + editId, $scope.formData).success(function(data) {
    $scope.formData = data;
    $scope.todoData = data;
  }).error(function(error) {
    console.log("Error: " + error);
  });
  $scope.editing = false;
  location.reload();
};

$scope.deleteTodo = function(todoID) {
  $http.delete('/api/v1/todos/' + todoID).success(function(data) {
    $scope.todoData = data;
    console.log(data);
  }).error(function(error) {
    console.log("Error: " + error);
  });
};


});
