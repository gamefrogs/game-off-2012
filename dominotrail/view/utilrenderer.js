"use strict";

var dt = dt || {};

dt.draw_hex = function(ctx, centerI, centerJ, side, edges, paths, center, progress) {
	
	// Computation of center's coordinates according to its I,J position.
	//var centerX = centerI%2 ? (2*centerJ+2)*side*Math.sqrt(3)/2 : (2*centerJ+1)*side*Math.sqrt(3)/2;
	//var centerY = (3*centerI/2+1)*side;
	var centerX = 0;
	var centerY = 0;

	// A few geometry constants to help drawing the hexagon.
	var H = side * Math.sqrt(3) / 2;	// hauteur d'un triangle equilateral de côté side.
	var dH = side * Math.sqrt(3) / 4;	// demi hauteur du triangle.
	var dC = side / 2;					// demi côté d'un triangle de côté side.
	var qC = side * 3 / 4;				// trois quart de côté du triangle.

	// Coordinates of edges middle points.
	var baseX = [centerX-dH, centerX+dH, centerX+H, centerX+dH, centerX-dH, centerX-H];
	var baseY = [centerY-qC, centerY-qC, centerY, centerY+qC, centerY+qC, centerY];
	
	// Coordinates of summit points.
	var summitX = [centerX, centerX+H, centerX+H, centerX, centerX-H, centerX-H];
	var summitY = [centerY-side, centerY-dC, centerY+dC, centerY+side, centerY+dC, centerY-dC];
	
	// Coordinates of barycenter points.
	var ratio = 1;
	var baryX = [centerX-dH*ratio, centerX+dH*ratio, centerX+H*ratio, centerX+dH*ratio, centerX-dH*ratio, centerX-H*ratio];
	var baryY = [centerY-qC*ratio, centerY-qC*ratio, centerY, centerY+qC*ratio, centerY+qC*ratio, centerY];
	
	// Rotation angles for IN and OUT paths
	var angleIn = [(-165+0*60)*Math.PI/180, (-165+1*60)*Math.PI/180, (-165+2*60)*Math.PI/180, (-165+3*60)*Math.PI/180, (-165+4*60)*Math.PI/180, (-165+5*60)*Math.PI/180];
	var angleOut = [(-165+0*60+180)*Math.PI/180, (-165+1*60+180)*Math.PI/180, (-165+2*60+180)*Math.PI/180, (-165+3*60+180)*Math.PI/180, (-165+4*60+180)*Math.PI/180, (-165+5*60+180)*Math.PI/180];
	
	// A few constants to help drawing one path.
	/*var normal_line_width = side / 8;
	var thick_line_width = side / 5;
	var chevron_width = side / 15;
	var chevron_length = side / 5;*/
	var normal_line_width = 5;
	var thick_line_width = side / 5;
	var chevron_width = 2;
	var chevron_length = 15;
	
	
	/////
	// draw paths
	ctx.save();
	ctx.fillStyle = "white";
	ctx.strokeStyle = "blue";
	ctx.lineCap="butt";
	ctx.lineJoin="bevel";
	ctx.lineWidth = normal_line_width;
	if (!center && (paths[1] == 2)) {
		ctx.beginPath();
		ctx.lineWidth = normal_line_width;
		ctx.arc(centerX-H, centerY-side-dH, side+dH, Math.PI/2, Math.PI/6, true);
		ctx.stroke();
		ctx.lineWidth = chevron_width;
		ctx.lineTo(baseX[1]-dH, baseY[1]+dH/2);
		ctx.stroke();
	}
	if (!center && (paths[2] == 2)) {
		ctx.beginPath();
		ctx.lineWidth = normal_line_width;
		ctx.moveTo(baseX[5], baseY[5]);
		ctx.lineTo(baseX[2], baseY[2]);
		ctx.stroke();
		ctx.lineWidth = chevron_width;
		ctx.lineTo(baseX[2]-dH, baseY[2]-dH/2);
		ctx.moveTo(baseX[2], baseY[2]);
		ctx.lineTo(baseX[2]-dH, baseY[2]+dH/2);
		ctx.stroke();
	}
	if (!center && (paths[3] == 2)) {
		ctx.beginPath();
		ctx.lineWidth = normal_line_width;
		ctx.arc(centerX-H, centerY+side+dH, side+dH, -Math.PI/2, -Math.PI/6, false);
		ctx.stroke();
		ctx.lineWidth = chevron_width;
		ctx.lineTo(baseX[3]-dH, baseY[3]-dH/2);
		ctx.stroke();
	}
	ctx.restore();
	

	/////
	// draw center
	ctx.save();
	if (0) {
		var grd=ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, ctx.lineWidth);
		grd.addColorStop(0,"orange");
		grd.addColorStop(0.5,"orange");
		grd.addColorStop(0.8,"white");
		//grd.addColorStop(1,"blue");
		ctx.fillStyle=grd;
		ctx.strokeStyle = "blue";
	}
	else {
		ctx.fillStyle = "blue";
		ctx.strokeStyle = "blue";
	}
	switch (center) {
		case 0:
			break;
		case 1:
			ctx.beginPath();
			ctx.lineWidth = normal_line_width;
			ctx.arc(centerX, centerY, 1.5*ctx.lineWidth, 0, 2*Math.PI);
			ctx.stroke();
			ctx.fill();
			break;
		case 2:
			ctx.beginPath();
			ctx.lineWidth = normal_line_width;
			ctx.moveTo(centerX, centerY);
			ctx.lineTo(baseX[2], baseY[2]);
			ctx.stroke();
			ctx.lineWidth = chevron_width;
			ctx.lineTo(baseX[2]-dH, baseY[2]-dH/2);
			ctx.moveTo(baseX[2], baseY[2]);
			ctx.lineTo(baseX[2]-dH, baseY[2]+dH/2);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = thick_line_width;
			ctx.arc(centerX, centerY, 1.5*ctx.lineWidth, 0, 2*Math.PI);
			ctx.stroke();
			ctx.fill();
			break;
		case 3:
			ctx.beginPath();
			ctx.lineWidth = normal_line_width;
			ctx.moveTo(centerX, centerY);
			ctx.lineTo(baseX[5], baseY[5]),
			ctx.stroke();
			ctx.lineWidth = thick_line_width;
			ctx.arc(centerX, centerY, 1.5*ctx.lineWidth, 0, 2*Math.PI);
			ctx.stroke();
			ctx.fill();
			break;
	}
	ctx.restore();

	/////
	// Draw progress
	ctx.save();
	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	//ctx.lineCap="round";
	//ctx.lineJoin="round";
	ctx.lineWidth = 2;
	if (!center && (paths[1] == 2)) {
		ctx.beginPath();
		ctx.arc(centerX-H, centerY-side-dH, side+dH, Math.PI/2, Math.PI/2-progress*Math.PI/3, true);
		ctx.stroke();
	}
	if (!center && (paths[2] == 2)) {
		ctx.beginPath();
		ctx.moveTo(baseX[5], baseY[5]);
		ctx.lineTo(baseX[5]+progress*(baseX[2]-baseX[5]), baseY[5]+progress*(baseY[2]-baseY[5]));
		ctx.stroke();
	}
	if (!center && (paths[3] == 2)) {
		ctx.beginPath();
		ctx.arc(centerX-H, centerY+side+dH, side+dH, -Math.PI/2, -Math.PI/2+progress*Math.PI/3, false);
		ctx.stroke();
	}
	
	switch (center) {
		case 0:
			break;
		case 1:
			ctx.beginPath();
			ctx.lineWidth = normal_line_width;
			ctx.arc(centerX, centerY, 1.5*ctx.lineWidth, 0, 2*Math.PI);
			ctx.stroke();
			ctx.fill();
			break;
		case 2:
			ctx.beginPath();
			if (progress > 0.5) {
				ctx.moveTo(centerX, centerY);
				ctx.lineTo(centerX+2*(progress-0.5)*(baseX[2]-centerX), centerY+2*(progress-0.5)*(baseY[2]-centerY));
				ctx.stroke();
			}
			ctx.arc(centerX, centerY, Math.min(0.8, progress)*4*ctx.lineWidth, 0, 2*Math.PI);
			ctx.stroke();
			ctx.fill();
			break;
		case 3:
			ctx.beginPath();
			ctx.moveTo(baseX[5], baseY[5]);
			ctx.lineTo(baseX[5]+2*Math.min(progress, 0.5)*(centerX-baseX[5]), baseY[5]+2*Math.min(progress, 0.5)*(centerY-baseY[5]));
			ctx.stroke();
			if (progress > 0.5) {
				ctx.arc(centerX, centerY, 1.5*(progress-0.5)*4*ctx.lineWidth, 0, 2*Math.PI);
				ctx.stroke();
				ctx.fill();
			}
			break;
	}
	ctx.restore();
	
	
};

dt.draw_hex1 = function(ctx, centerI, centerJ, side, edges, paths, center, progress) {
	
	// Computation of center's coordinates according to its I,J position.
	//var centerX = centerI%2 ? (2*centerJ+2)*side*Math.sqrt(3)/2 : (2*centerJ+1)*side*Math.sqrt(3)/2;
	//var centerY = (3*centerI/2+1)*side;
	var centerX = 0;
	var centerY = 0;

	// A few geometry constants to help drawing the hexagon.
	var H = side * Math.sqrt(3) / 2;	// hauteur d'un triangle equilateral de côté side.
	var dH = side * Math.sqrt(3) / 4;	// demi hauteur du triangle.
	var dC = side / 2;					// demi côté d'un triangle de côté side.
	var qC = side * 3 / 4;				// trois quart de côté du triangle.

	// Coordinates of edges middle points.
	var baseX = [centerX-dH, centerX+dH, centerX+H, centerX+dH, centerX-dH, centerX-H];
	var baseY = [centerY-qC, centerY-qC, centerY, centerY+qC, centerY+qC, centerY];
	
	// Coordinates of summit points.
	var summitX = [centerX, centerX+H, centerX+H, centerX, centerX-H, centerX-H];
	var summitY = [centerY-side, centerY-dC, centerY+dC, centerY+side, centerY+dC, centerY-dC];
	
	// Coordinates of barycenter points.
	var ratio = 2/3;
	var baryX = [centerX-dH*ratio, centerX+dH*ratio, centerX+H*ratio, centerX+dH*ratio, centerX-dH*ratio, centerX-H*ratio];
	var baryY = [centerY-qC*ratio, centerY-qC*ratio, centerY, centerY+qC*ratio, centerY+qC*ratio, centerY];
	
	// Rotation angles for IN and OUT paths
	var angleIn = [(-165+0*60)*Math.PI/180, (-165+1*60)*Math.PI/180, (-165+2*60)*Math.PI/180, (-165+3*60)*Math.PI/180, (-165+4*60)*Math.PI/180, (-165+5*60)*Math.PI/180];
	var angleOut = [(-165+0*60+180)*Math.PI/180, (-165+1*60+180)*Math.PI/180, (-165+2*60+180)*Math.PI/180, (-165+3*60+180)*Math.PI/180, (-165+4*60+180)*Math.PI/180, (-165+5*60+180)*Math.PI/180];
	
	// A few constants to help drawing one path.
	/*var normal_line_width = side / 8;
	var thick_line_width = side / 5;
	var chevron_width = side / 15;
	var chevron_length = side / 5;*/
	var normal_line_width = side / 5;
	var thick_line_width = side / 5;
	var chevron_width = side / 10;
	var chevron_length = side / 3;
	
	
	/////
	// draw edges
	ctx.save();
	ctx.strokeStyle="grey";
	ctx.lineWidh=1;
	for (var i=0 ; i<edges.length ; ++i) {
		if (edges[i]) {
			ctx.beginPath();
			ctx.moveTo(summitX[(i+5)%6], summitY[(i+5)%6]);
			ctx.lineTo(summitX[i%6], summitY[i%6]);
			ctx.stroke();
		}
	}
	ctx.restore();
	
	
	/////
	// draw paths
	ctx.save();
	ctx.fillStyle = "white";
	ctx.strokeStyle = "blue";
	ctx.lineCap="round";
	ctx.lineJoin="round";
	ctx.lineWidth = normal_line_width;
	for (var i=0 ; i<paths.length ; ++i) {
			if (paths[i]) {
				ctx.beginPath();
				ctx.moveTo(centerX, centerY);
				ctx.lineTo(baseX[i], baseY[i]);
				ctx.stroke();
			}
	}
	ctx.restore();
	

	/////
	// draw center
	ctx.save();
	
	if (center == 1)
		ctx.lineWidth = normal_line_width;
	else
		ctx.lineWidth = thick_line_width;
		
	if (progress) {
		var grd=ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, ctx.lineWidth);
		grd.addColorStop(0,"orange");
		grd.addColorStop(0.5,"orange");
		grd.addColorStop(0.8,"white");
		//grd.addColorStop(1,"blue");
		ctx.fillStyle=grd;
		ctx.strokeStyle = "blue";
	}
	else {
		ctx.fillStyle = "white";
		ctx.strokeStyle = "blue";
	}
	switch (center) {
		case 0:
			break;
		case 1:
			ctx.lineWidth = normal_line_width;
			ctx.beginPath();
			ctx.arc(centerX, centerY, 1.5*ctx.lineWidth, 0, 2*Math.PI);
			ctx.fill();
			ctx.stroke();
			break;
		case 2:
			ctx.lineWidth = thick_line_width;
			ctx.beginPath();
			ctx.arc(centerX, centerY, 1.5*ctx.lineWidth, 0, 2*Math.PI);
			ctx.fill();
			ctx.stroke();
			break;
		case 3:
			ctx.lineWidth = thick_line_width;
			ctx.beginPath();
			ctx.arc(centerX, centerY, 1.5*ctx.lineWidth, 0, 2*Math.PI);
			ctx.fill();
			ctx.stroke();
			break;
	}
	ctx.restore();

	//////
	// Draw chevrons
	ctx.save();
	if (progress) {
		ctx.strokeStyle = "orange";
		ctx.shadowColor="white";
		ctx.shadowBlur=10;
	}
	else {
		ctx.strokeStyle = "blue";
	}
	ctx.lineCap="round";
	ctx.lineWidth = chevron_width;
	for (var i=0 ; i<paths.length ; ++i) {
			switch (paths[i]) {
				case 1: // IN path
					ctx.save();
					ctx.beginPath();
					ctx.translate(baryX[i], baryY[i]);
					ctx.rotate(angleIn[i]);
					ctx.moveTo(-chevron_length/2, chevron_length/2); ctx.lineTo(-chevron_length/2, -chevron_length/2); ctx.stroke();
					ctx.lineTo(chevron_length/2, -chevron_length/2); ctx.stroke();
					ctx.restore();
					break;
				case 2: // OUT path
					ctx.save();
					ctx.beginPath();
					ctx.translate(baryX[i], baryY[i]);
					ctx.rotate(angleOut[i]);
					ctx.moveTo(-chevron_length/2, chevron_length/2); ctx.lineTo(-chevron_length/2, -chevron_length/2); ctx.stroke();
					ctx.lineTo(chevron_length/2, -chevron_length/2); ctx.stroke();
					//ctx.moveTo(0, chevron_length); ctx.lineTo(0, 0); ctx.stroke();
					//ctx.lineTo(chevron_length, 0); ctx.stroke();
					ctx.restore();
					break;
			}
	}
	ctx.restore();
		
};

dt.obi_start = function(nbLines, nbColumns, side, progress) {
	var edges = [1, 1, 1, 1, 1, 1];
	var no_path = [0, 0, 0, 0, 0, 0];
	var no_edges = no_path;
	
	// Init and background
	var can = document.getElementById("viewport1");
	var ctx = can.getContext("2d");
	ctx.globalAlpha = 1.0;
	var grd=ctx.createRadialGradient(0.10*can.width,0.90*can.height,5,0.10*can.width,0.90*can.height,can.height);
	grd.addColorStop(0,"white");
	grd.addColorStop(0.02,"white");
	grd.addColorStop(0.03,"orange");
	grd.addColorStop(0.5,"lightblue");
	grd.addColorStop(1,"lightblue");
	ctx.fillStyle=grd;
	ctx.fillRect(0,0,can.width,can.height);
	ctx.strokeRect(0, 0, can.width, can.height);
	
	// Draw grid with nbLines lines and J columns
	for (var i=0 ; i<nbLines ; ++i) {
		for (var j=0 ; j<nbColumns ; ++j) {
			if (i%2) { // lignes impaires
				draw_hex(ctx, i, j, side, edges, no_path, 0, 0);
			}
			else { // lignes paires
				draw_hex(ctx, i, j, side, edges, no_path, 0, 0);
			}
		}
	}
	
	// Draw some path
	draw_hex(ctx, 0, 0, side, no_edges, [0, 0, 0, 2, 0, 0], 2, progress);
	draw_hex(ctx, 1, 0, side, no_edges, [1, 0, 2, 0, 0, 0], 1, progress);
	draw_hex(ctx, 1, 1, side, no_edges, [0, 0, 2, 0, 0, 1], 1, progress);
	draw_hex(ctx, 1, 2, side, no_edges, [0, 0, 2, 2, 0, 1], 1, progress);
	draw_hex(ctx, 1, 3, side, no_edges, [0, 0, 2, 0, 0, 1], 1, progress);
	draw_hex(ctx, 1, 4, side, no_edges, [0, 0, 0, 0, 0, 1], 3, progress);
	draw_hex(ctx, 2, 3, side, no_edges, [1, 0, 0, 2, 2, 0], 1, progress);
	draw_hex(ctx, 3, 3, side, no_edges, [1, 0, 0, 0, 0, 0], 3, progress);
	draw_hex(ctx, 3, 2, side, no_edges, [0, 1, 0, 0, 0, 0], 3, progress);
};

dt.obi_update = function(elem) {
	var elem = document.getElementById("inputform");
	start(parseInt(elem[0].value), parseInt(elem[1].value), parseInt(elem[2].value), parseInt(elem[3].value));
};
