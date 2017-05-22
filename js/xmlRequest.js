$(document).ready(function(){
    getDocument().done(function(document){
    	console.log(document);
    }).fail(function(error){
    	console.log(error);
    });
});

function getDocument(){
	var deferred = $.Deferred();
	$.ajax({
		type: "GET",
		url: "XML/Books.xml",
		dataType: "xml",
		success: function(xml) {
    		deferred.resolve(xml);
		},
		error: function() {
			deferred.reject("The XML File could not be processed correctly.");
		}
	});
	return deferred.promise();
}