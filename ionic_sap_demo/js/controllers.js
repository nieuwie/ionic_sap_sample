angular.module('starter.controllers', [])

.controller('TasksCtrl', function($scope, $state, $http, $ionicLoading, Tasks) {
	
	
	$scope.fromCache = function(tasks)
	{
		$scope.tasks = tasks;
		$scope.$broadcast('scroll.refreshComplete');
		$ionicLoading.hide();
	},
	$scope.success = function(data)
	{
		var tasks = data.d.results;
		
		// Map ExtensibleElements to object
		angular.forEach( tasks, function(task, key) {
			angular.forEach( task.ExtensibleElements.results, function(elem, elemkey){
				task[elem.name] = elem.value;
			} );
		});
		
		// Set tasks in $scope
		$scope.tasks = tasks;
		
		// Cache tasks
		Tasks.setTasks(tasks);
		
		// Hide loading indicator
		$ionicLoading.hide();
		
		// Hide pull to refresh
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.error = function(){
		$ionicLoading.hide();
		alert('error while loading tasks');
	}
	
	// Loading indicator
	$ionicLoading.show( {template:'Loading tasks..'} );
	
	// get all tasks
	Tasks.all(false,$scope.success,$scope.error,$scope.fromCache);

	// refresh function
	$scope.doRefresh = function(){
		Tasks.all($http,true,$scope.success,$scope.error);
	}
	
	// mock logout, just go to login screen
	$scope.logout = function(){
		$state.go('login');
	}
	
})

.controller('TaskDetailCtrl', function($scope, $stateParams, Tasks) {
	// Get pressed task
	$scope.task = Tasks.get($stateParams.taskIndex);
})

.controller('LoginCtrl', function($scope,$state,$ionicLoading,Tasks) {
	
	// model
	$scope.loginData = {username:'',password:''};
	
	// login
	$scope.login = function(){
		
		$ionicLoading.show({template:"Logging in.."});
		Tasks.login( $scope.loginData, function()
				{
					$ionicLoading.hide();
					$state.go('tab.tasks');
				}, function()
				{
					$ionicLoading.hide();
					alert('login failed');
				} );
	}
})

.controller('AccountCtrl', function($scope) {});
