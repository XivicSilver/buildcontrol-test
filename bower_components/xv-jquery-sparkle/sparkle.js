(function($) {
    $.fn.sparkle = function(settings) {
        var frame = window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame        || 
            window.mozRequestAnimationFrame            || 
            window.oRequestAnimationFrame            || 
            window.msRequestAnimationFrame            || 
            function(callback,element){
                window.setTimeout(callback, 16);
            };

        var sparkles = [], positions=[], config=[], i=0, frameWidth=-24, bgImage="url('data:image/png;base64,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')";

        var animate = function(){
            for(i=0;i<sparkles.length;i++){
                sparkles[i].css("background-position", positions[i]*frameWidth+"px center");
                positions[i]++;
                if(positions[i]>20) {
                    var e = sparkles.splice(i,1)[0];
                    var s = config.splice(i,1)[0];
                    
                    positions.splice(i,1);

                    setTimeout(function(){
                        add(e, s);
                    }, s.timeout);
                };
            }
            frame(animate);
        };

        var add = function(element, settings){
            $(element).css({
                'background-image':bgImage,
                'background-repeat':'no-repeat',
                'background-position':'0px top',
                'width':'24px',
                'height':'24px',
                'display': 'block'
            });
            sparkles.push($(element));
            positions.push(0);
            config.push(settings);
        }

        animate();

        return this.each(function(index, element){
            add(element, settings);
        });
    }
}(jQuery));
