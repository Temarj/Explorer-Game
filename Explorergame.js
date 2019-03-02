$(function(){
	/*Aquí se muestra la pantalla de inicio*/ 
	$("#fondo").css("background-image", "url('background2.png')");
	$("body").append("<h1>");
	$("h1").html("EXPLORER");
	$("body").append("<p>");
	$("p").html("PLAY");
	$("#nave").hide();
	inicio();

	function inicio(){
	$("#alien").show();
	$("#gameover").hide();
	$("#niveles img").hide();
	$("#niveles").hide();
	$("h1").show();
	$("p").show();
	$("p").click(start);
	$("#fondo").css({"filter":"brightness(1)"});
	}
	
	/*Cuando haces click en cualquier sitio, se abre el menú con los niveles*/
	function start(){
		$("#alien").css("top", "70vh");
		$("button").hide();
		$("h1").hide();
		$("p").hide();
		$("#fondo").css({"filter":"brightness(0.2)"});
		$("#niveles").show();
		$("#niveles img").show();
		$("#img0").click(lvl0);
		$("#img1").click(lvl1);
	}

	/*Niveles (si fueran mas se podría hacer un switch, pero solo van a estar programados dos niveles)*/
	let lvlactual=0;
	function lvl0(){
		 lvl();
		//$(".meteorito").css("background-color", "blue");
		lvlactual=0;
	}

	function lvl1(){
		lvl();
		$(".meteorito").css("background-color", "white");
		lvlactual=1;
	}

	//Todo este código va a ser común en todos los niveles
	function lvl(){
		$("#alien").hide();
		$("#gameover").hide();
		$("#fondo").css({"filter":"brightness(0.2)"});
		$("button").hide();
		$("#niveles img").hide();
		$("#niveles").hide();
		$("#nave").show();
		$("#nave").css({"top":"40vh"});
		$("#nave").css({"left":"10vh"});
		meteoritos();
		/*Detectar las teclas de movimiento*/

		$("body").on("keydown", function(e) {
			if (e.which !== 0) {
				switch(e.which){
					case 37:
						$("#nave").css("left", "-=1vh")
						break;

					case 39:
						$("#nave").css("left", "+=1vh")
						break;
					case 38:
				//	if(limita>10000){
						$("#nave").css("top", "-=1vh")
					//}
					//else{alert("EEEH");}
						break;
					case 40:
						$("#nave").css("top", "+=1vh")
						break;
					default:
						break;
	
				}
			}
			//Detectar si se choca
			for(i=0;i<$(".meteorito").length;i++){
				if(collision($("#nave"), $(".meteorito").eq(i))){
					break;
				}
		}});
	}

	/*Crear meteoritos aleatorios*/
	let met;
	function meteoritos(){
		$(".meteorito").remove();
		for(i=0;i<3;i++){
			met = $("<div class='meteorito'></div>").css({top: getRandomArbitrary(0,window.innerHeight),left: getRandomArbitrary(0,window.innerWidth)});
			$("body").append(met);
		}	
	}
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
 	/*Detectar choques*/
	 function collision($div1, $div2) {
		var x1 = $div1.offset().left; //punto izquierda del parametro 1
		var y1 = $div1.offset().top; //punto arriba 
		var h1 = $div1.outerHeight(true); //altura
		var w1 = $div1.outerWidth(true); //anchura
		var b1 = y1 + h1; //punto abajo
		var r1 = x1 + w1; //punto derecha
		
		var x2 = $div2.offset().left; //punto izquierda del parametro 2
		var y2 = $div2.offset().top; //punto arriba
		var h2 = $div2.outerHeight(true); //altura
		var w2 = $div2.outerWidth(true); //anchura
		var b2 = y2 + h2; //punto abajo
		var r2 = x2 + w2; //punto derecha

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
				else{ gameover();	}
	 }	

	 function gameover(){
		$(".meteorito").remove();
		$("#gameover").show();
		$("#nave").hide();
		$("#RESTART").html("Volver a intentarlo");
		$("#INICIO").html("Salir");
		$("button").show();
		$("#RESTART").click(function(){
			//Si se programaran todos los niveles se usaria un switch
			if(lvlactual==0){lvl0()}
			else if(lvlactual==1){lvl1()}
		});
		$("#INICIO").click(inicio);
	 }
});