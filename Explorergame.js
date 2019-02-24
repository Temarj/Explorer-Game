$(function(){
	$("#fondo").css("background-image", "url('background2.png')");
	$("body").append("<h1>");
	$("h1").html("EXPLORER");
	$("body").append("<p>");
	$("p").html("PLAY");
	$("body").click(function(){
		alert("empezar juego");
	});
});