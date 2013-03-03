
(function(j5g3) {
var
	LW = 8,
	NUM = 50,
	STEP = 10,

	i=0,
	
	on_emit = function(clip)
	{
		clip.radius = 1;
		clip.stroke= j5g3.hsla(i<255 ? i+=STEP : i=0, 80, 50);
		clip.line_width = LW;

		this.add(j5g3.tween({
			target: clip, duration: NUM,
			auto_remove: true, to: {
				alpha: 0,
				radius: NUM*LW
			}
		}));
	},
	emitter = j5g3.emitter({
		container_class: j5g3.Circle,
		count: 1,
		life: NUM,
		x: this.stage.width/2,
		y: this.stage.height/2,
		on_emit: on_emit
	})
;

	this.stage.add(emitter);
	this.fps(60).run();
})