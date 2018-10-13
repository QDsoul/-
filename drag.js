define(function(){
	function drag(node, parent, progracess, text, next){
		var offsetX = 0;
		node.mousedown(function(e){
			offsetX = e.clientX - node.position().left;
			$(document).mousemove(function(e){
				var l = e.clientX - offsetX;
				if(l <= 0){
					l = 0;
				}else if(l >= parent.width() - node.width()){
					l = parent.width() - node.width();
				}
				node.css({
					left : l
				})
				progracess.width(l);
			})
			$(document).mouseup(function(){
				$(document).off("mousemove");
				var blockLeft = node.width() + node.position().left;
				if(blockLeft != parent.width()){
					node.stop().animate({"left" : 0});
					progracess.stop().animate({"width" : 0});
				}else{
					text.html("验证通过");
					text.css("color", "white");
					next.removeAttr("disabled");
					next.attr("class", "active")
					$("#validate .block").off("mousedown");
				}
			})
		})
	}
	return {
		drag: drag
	}
})