angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Tasks', function($http) {

  var tasks = [];
  
  var serviceURL = '<<INSERT YOUR SERVER URL>>';
  
  return {
	login : function(logindata,successCallback,errorCallback){

		var auth = btoa(logindata.username+":"+logindata.password);
		$http.defaults.headers.common.Authorization = 'Basic ' + auth;
		
		$http.get(serviceURL+'/WorkflowTaskCollection/$count')
			.success(successCallback).error(errorCallback);
		
	},
	all : function(forceRefresh,successCallback,errorCallback,cacheCallback) {
		
		// Get from server if no tasks are found in cache or if refresh triggered
		if( forceRefresh || tasks.length == 0 )
		{
			$http.get(serviceURL+'/WorkflowTaskCollection?$expand=ExtensibleElements',{ headers: {'X-CSRF-TOKEN': 'Fetch'}})
			.success(successCallback).error(errorCallback);
		}
		else{
			cacheCallback(tasks);
		}
	},
    get: function(taskIndex) {
    	// return single task
    	return tasks[taskIndex];
    },
	setTasks: function(newTasks){
		// Cache tasks
		tasks = newTasks
	}
  }
});