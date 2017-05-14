'use strict';
// alert('inside service out')
console.log('inside service out')
angular.module('services.PostsFactory', ['ngResource'])
angular.module('services.PostsFactory')
.constant("baseURL", 'http://localhost:3000/')
.factory('PostsFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        console.log(document.URL)
        var parts = document.URL.split('/')
        console.log('parts ', parts);
        var Id = parts[4]
        console.log(baseURL);
        return $resource(baseURL + "posts", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

