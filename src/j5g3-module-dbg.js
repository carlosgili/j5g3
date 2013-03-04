/*
 * Debug Module for j5g3
 */

(function(j5g3, undefined)
{
var
	dbg =

	/**
	 * Debug Module for j5g3
	 */
	j5g3.dbg = {

		error: function(msg)
		{
			throw new Error(msg);
		},

		fn: function(Klass, fn_name, pre, post)
		{
		var
			fn = Klass.prototype[fn_name]
		;
			Klass.prototype[fn_name] = function()
			{
			var
				args = arguments,
				result
			;
				if (pre) pre.apply(this, args);
				result = fn.apply(this, args);
				if (post) post.apply(this, args);

				return result;
			};
		}
	},

	loop = function()
	{
	var
		screen = this.stage.screen
	;
		this._oldTime = this._time;
		this._time = (new Date()).getTime();

		screen.save();
		screen.fillStyle = '#009900';
		screen.font = 'bold 18px Arial';
		screen.translate(0, 20);
		screen.fillText(Math.floor(1000/(this._time-this._oldTime)) + " FPS", 0, 0);
		screen.restore();
	}
;
	dbg.fn(j5g3.Engine, '_gameLoop', null, loop);
	dbg.fn(j5g3.Engine, '_rafGameLoop', null, loop);


	dbg.fn(j5g3.DisplayObject, 'remove', function()
	{
		if (this.parent === null)
			dbg.error("Trying to remove object without parent.");
	});

	dbg.fn(j5g3.DisplayObject, 'stretch', function()
	{
		if (!this.width || !this.height)
			dbg.error("Objects without width or height cannot be stretched.");
	});

	j5g3.DisplayObject.prototype.extend = function(props)
	{
		for (var i in props)
		{
			if ((typeof this[i] === 'function') && i.indexOf('on_')!==0)
				j5g3.warn('Overriding function ' + i, this);

			if (i[0]==='_')
				j5g3.warn('Overriding private member ' + i, this);

			this[i] = props[i];
		}
	};

	j5g3.Image.prototype._get_source = function(src)
	{
		var source = (typeof(src)==='string') ? j5g3.id(src) : src;

		if (source===null)
			dbg.error("Could not load Image '" + src + "'");

		return source;
	};

})(this.j5g3);

