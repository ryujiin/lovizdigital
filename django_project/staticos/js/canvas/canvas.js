$(document).ready(function () {
	console.log('canvas ready');
    var lienzo = new fabric.Canvas('lienzo');

    fabric.loadSVGFromURL('../static/imgs/svg/kiwi.svg',function (objects,options) {
    	var obj = fabric.util.groupSVGElements(objects,options);
    	obj.scale(0.5);

    	lienzo.add(obj);

    	fabric.Image.fromURL('../images/vans.jpg', function(img) {
	        img.scale(1);
	        lienzo.centerObject(img);
	        lienzo.add(img);
	        lienzo.clipTo = function (ctx) {
	            obj.render(ctx);
	        }
	        lienzo.renderAll();
	      });
    })
});