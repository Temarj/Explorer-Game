$(function(){
	/*Aquí se muestra la pantalla de inicio*/ 
	$("#alien").draggable();
	$("body").append("<h1>");
	$("h1").html("EXPLORER");
	$("body").append("<h2>");
	$("h2").html("PLAY");
	$("h2").attr("id", "#play");
	$("#nave").hide();

	inicio();

	function inicio(){
	$("#win").hide();
	$("#infoplanetas").hide();
	$("#alien").show();
	$("#gameover").hide();
	$("#niveles img").hide();
	$("#niveles").hide();
	$("h1").show();
	$("h2").show();
	$("h2").click(start);
	$("#fondo").css({"filter":"brightness(1)"});
	}
	
	/*Cuando haces click en cualquier sitio, se abre el menú con los niveles*/
	function start(){
		$("#win").hide();
		$("button").hide();
		$("h1").hide();
		$("h2").hide();
		$("#fondo").css({"filter":"brightness(0.2)"});
		$("#niveles").show();
		$("#niveles img").show();
		$("#img0").click(lvl0);
		$("#img1").click(lvl1);
	}

	/*Niveles (si fueran mas se podría hacer un switch, pero solo van a estar programados dos niveles)*/
	let lvlactual=0;
	function lvl0(){
		lvlactual=0;
		 lvl();
	}

	function lvl1(){
		lvlactual=1;
		lvl();
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
		$("#nave").css({"top" : "40vh"});
		$("#nave").css({"left":"10vh"});
		meteoritos();
		/*Detectar las teclas de movimiento*/

		$("body").on("keydown", function(e) {
			if (e.which !== 0) {
				var x3 = $("#nave").offset().left; //punto izquierda de la nave
				var y3 = $("#nave").offset().top; //punto arriba 
				var h3 = $("#nave").outerHeight(true); //altura
				var w3 = $("#nave").outerWidth(true); //anchura
				var b3 = y3 + h3; //punto abajo
				var r3 = x3 + w3; //punto derecha

				var x4 = $("body").offset().left; //punto izquierda del body
				var y4 = $("body").offset().top; //punto arriba 
				var h4 = $("body").outerHeight(true); //altura
				var w4 = $("body").outerWidth(true); //anchura
				var b4 = y4 + h4; //punto abajo
				var r4 = x4 + w4; //punto derecha
				switch(e.which){

					case 37:
					if(x3>x4){
						$("#nave").css("left", "-=1vh");}
						else{}
						break;

					case 39:
					if(r3<r4){
						$("#nave").css("left", "+=1vh");}
						else{win();}
						break;

					case 38:
					if(y3>y4){
						$("#nave").css("top", "-=1vh");
					}
					else{}
						break;

					case 40:
					if(b3<b4){
						$("#nave").css("top", "+=1vh");}
						else{}
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
		if(lvlactual==0){
			for(i=0;i<6;i++){
				met = $("<div class='meteorito'></div>").css({top: getRandomArbitrary(0,window.innerHeight),left: getRandomArbitrary(0,window.innerWidth)});
				$("body").append(met);
			}
		}
		else if(lvlactual==1){
			for(i=0;i<8;i++){
				met = $("<div class='meteorito'></div>").css({top: getRandomArbitrary(0,window.innerHeight),left: getRandomArbitrary(0,window.innerWidth)});
				$("body").append(met);
			}
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
				else{	gameover();	}
	 }	

	 /*Cuando pierdes*/
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

	/*Cuando ganas*/
	 let planeta= [
    {
      "id": 0,
      "nombre": "EL SOL<br><br>",
      "info": "El sol es una estrella que se encuentra en el centro del sistema solar y constituye la mayor fuente de radiación electromagnética de este sistema planetario. <br> Está compuesto principalmente por hidrógeno y helio y se creó hace aproximadamente 4600 millones de años."
    },
    {
      "id": 1,
      "imagen": "1.png",
      "nombre": "MERCURIO<br><br>",
      "info": "Mercurio es el planeta del sistema solar más próximo al Sol y el más pequeño.<br>Forma parte de los denominados planetas interiores o terrestres y carece de satélites naturales al igual que Venus. Se conocía muy poco sobre su superficie hasta que fue enviada la sonda planetaria Mariner 10 y se hicieron observaciones con radar y radiotelescopios.<br>Está formado por sodio y potasio principalmente, además de oxígeno, argón, helio, nitrógeno, dióxido de carbono, agua e hidrógeno."
    }
	 ];

	function win(){
		$("#infoplanetas").show();
		$(".meteorito").remove();
		$("#win").show();
		$("#nave").hide();
		$("#infoplanetas").html("Has llegado a: <br><br>" + planeta[lvlactual].nombre + planeta[lvlactual].info);
		$("#infoplanetas").show();
		$("#win").click(start);
	}
});