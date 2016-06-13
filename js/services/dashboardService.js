angular.module('giphastrator')
.service('dashboardService', function(writeService) {

  var ref = new Firebase("https://giphastrators.firebaseio.com");
  ref.removeUser({
    email    : "bobtony@firebase.com",
    password : "correcthorsebatterystaple"
  }, function(error) {
    if (error === null) {
      console.log("User removed successfully");
    } else {
      console.log("Error removing user:", error);
    }
  });

});
