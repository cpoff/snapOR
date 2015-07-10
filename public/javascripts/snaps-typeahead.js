console.log('hello');
var substringMatcher = function(strs){
	return function findMatches(q, cb){
		var matches, substringRegex;
		matches = [];
		substrRegex = new RegExp(q, 'i');
		$.each(strs, function(i, str){
			if(substrRegex.test(str)){
				matches.push(str);
			}
		});
		cb(matches);
	};
};
//this function will need to run after the map has been loaded
//parkNameArray

$('#the-basics .typeahead').typeahead({
	hint: true,
	highlight: true,
	minLength: 1
},
{
	name: 'parkNameArray',
	source: substringMatcher(parkNameArray)
});