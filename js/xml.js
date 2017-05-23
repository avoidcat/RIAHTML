$(document).ready(function(){
	$("#btn-xml").click(function(event){
		event.preventDefault();
		$("#text-html").addClass("hidden");
		$("#text-xhtml").addClass("hidden");
		$("#text-xml").removeClass("hidden");
	});
	$("#btn-html").click(function(event){
		event.preventDefault();
		$("#text-xml").addClass("hidden");
		$("#text-xhtml").addClass("hidden");
		$("#text-html").removeClass("hidden");
	});
	$("#btn-xhtml").click(function(event){
		event.preventDefault();
		$("#text-html").addClass("hidden");
		$("#text-xml").addClass("hidden");
		$("#text-xhtml").removeClass("hidden");
	});


	$("#btn-collection-plants").click(function(event){
		event.preventDefault();
		showCollection("plant_catalog.xml","plant");
		removeActive();
		$("#btn-collection-plants").parent().addClass("active");
	});
	$("#btn-collection-books").click(function(event){
		event.preventDefault();
		showCollection("Books.xml","book");
		removeActive();
		$("#btn-collection-books").parent().addClass("active");
	});
	$("#btn-collection-cd").click(function(event){
		event.preventDefault();
		showCollection("cd_catalog.xml","cd");
		removeActive();
		$("#btn-collection-cd").parent().addClass("active");
	});
	$("#btn-collection-food").click(function(event){
		event.preventDefault();
		showCollection("simple.xml","food");
		removeActive();
		$("#btn-collection-food").parent().addClass("active");
	});


});

function showCollection(documentName,collectionType){
	getDocument(documentName,"xml/").done(function(xml){
		switch(collectionType){
			default:
				break;
			case "cd":
				displayCdCollection(xml);
				break;
			case "food":
				
				displayFoodCollection(xml);

				break;
			case "plant":
				displayPlantCollection(xml);
				break;
			case "book":
				displayBookCollection(xml);
				break;
		}
	}).fail(function(error){
		alert(error);
	});
}


function displayCdCollection(data){
	$("#xml-query-results").empty();
	$(data).find("CD").each(function(){
		var node;
		var title = $(this).find("TITLE").text();
		var artist = $(this).find("ARTIST").text();
		var country = $(this).find("COUNTRY").text();
		var company = $(this).find("COMPANY").text();
		var price = $(this).find("PRICE").text();
		var year = $(this).find("YEAR").text();
		node = '<div class="col-xs-12 col-sm-6 col-md-4">'+
				    '<div class="thumbnail">'+
				      '<img src="images/cd-icon.png" alt="cd" class="img-thumbnail">'+
				      '<div class="caption">'+
				        '<h3>'+title+'</h3>'+
				        '<p><span clas="thumnail-text-bold">Arist:</span>'+artist+'</p>'+
				        '<p><span clas="thumnail-text-bold">Country:</span>'+country+'</p>'+
				        '<p><span clas="thumnail-text-bold">Company:</span>'+company+'</p>'+
				        '<p><span clas="thumnail-text-bold">Year:</span>'+year+'</p>'+
				      '</div>'+
				    '</div>'+
				  '</div>';
		
		$(node).hide().appendTo($("#xml-query-results")).fadeIn(500);
		
	});
}
function displayPlantCollection(data){
	$("#xml-query-results").empty();
	$(data).find("PLANT").each(function(){
		var node;
		var common = $(this).find("COMMON").text()
		var botanical = $(this).find("BOTANICAL").text()
		var zone = $(this).find("ZONE").text()
		var light = $(this).find("LIGHT").text()
		var price = $(this).find("PRICE").text()
		var availability = $(this).find("AVAILABILITY").text()
		node = '<div class="col-xs-12 col-sm-6 col-md-4">'+
				    '<div class="thumbnail">'+
				      '<img src="images/plant-icon.png" alt="plant" class="img-thumbnail">'+
				      '<div class="caption">'+
				        '<h3>'+common+'</h3>'+
				        '<p><span clas="thumnail-text-bold">Botanical:</span>'+botanical+'</p>'+
				        '<p><span clas="thumnail-text-bold">Zone:</span>'+zone+'</p>'+
				        '<p><span clas="thumnail-text-bold">Light:</span>'+light+'</p>'+
				        '<p><span clas="thumnail-text-bold">Price:</span>'+price+'</p>'+
				        '<p><span clas="thumnail-text-bold">Availability:</span>'+availability+'</p>'+
				      '</div>'+
				    '</div>'+
				  '</div>';
		$(node).hide().appendTo($("#xml-query-results")).fadeIn(500);
	});
}
function displayBookCollection(data){
	$("#xml-query-results").empty();
	$(data).find("book").each(function(){
		var node;
		var title = $(this).find("title").text();
		var author = $(this).find("author").first().text();
		var year = $(this).find("year").text();
		var price = $(this).find("price").text();
		node = '<div class="col-xs-12 col-sm-6 col-md-4">'+
				    '<div class="thumbnail">'+
				      '<img src="images/book-icon.png" alt="book" class="img-thumbnail">'+
				      '<div class="caption">'+
				        '<h3>'+title+'</h3>'+
				        '<p><span clas="thumnail-text-bold">Author:</span>'+author+'</p>'+
				        '<p><span clas="thumnail-text-bold">Year:</span>'+year+'</p>'+
				        '<p><span clas="thumnail-text-bold">Price:</span>'+price+'</p>'+
				      '</div>'+
				    '</div>'+
				  '</div>';
		
		$(node).hide().appendTo($("#xml-query-results")).fadeIn(500);
		
	});
}
function displayFoodCollection(data){
	$("#xml-query-results").empty();
	$(data).find("food").each(function(){
		var node;
		var name = $(this).find("name").text();
		
		var price = $(this).find("price").text();
		var description = $(this).find("description").text();
		var calories = $(this).find("calories").text();
		node = '<div class="col-xs-12 col-sm-6 col-md-4">'+
				    '<div class="thumbnail">'+
				      '<img src="images/food-icon.png" alt="food" class="img-thumbnail">'+
				      '<div class="caption">'+
				        '<h3>'+name+'</h3>'+
				        '<p><span clas="thumnail-text-bold">Price:</span>'+price+'</p>'+
				        '<p><span clas="thumnail-text-bold">Description:</span>'+description+'</p>'+
				        '<p><span clas="thumnail-text-bold">Calories:</span>'+calories+'</p>'+
				      '</div>'+
				    '</div>'+
				  '</div>';
		
		$(node).hide().appendTo($("#xml-query-results")).fadeIn(500);
		
	});
}
function removeActive(){
	$("#pills>li").each(function(){
		$(this).removeClass("active");
	});
}
function getDocument(documentName,from){
	var deferred = $.Deferred();
	var path;
	if(from === undefined){
		path=documentName;
	} 
	else{
		path=from+documentName;
	}
	$.ajax({
		type: "GET",
		url: path,
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