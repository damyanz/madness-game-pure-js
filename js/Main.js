function Main() {
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d");


    var floor_patern = new Image();
    floor_patern.src = "gfx/playfield/floor_pat.png";

    var wall_patern = new Image();
    wall_patern.src = "gfx/playfield/wall.png";

    var ladder_patern = new Image();
    ladder_patern.src = "gfx/playfield/ladder.png";

    var long_ladder_patern = new Image();
    long_ladder_patern.src = "gfx/playfield/long_ladder.png";

    var blink_patern = new Image();
    blink_patern.src = "gfx/playfield/blink.png";

    var rope_patern = new Image();
    rope_patern.src = "gfx/playfield/rope.png";

    var track_patern = new Image();
    track_patern.src = "gfx/playfield/track.png";

    var long_track_patern = new Image();
    long_track_patern.src = "gfx/playfield/long_track.png";

    var in_patern = new Image();
    in_patern.src = "gfx/playfield/in.png";

    var out_patern = new Image();
    out_patern.src = "gfx/playfield/out.png";

    function Wall(x, y, tr_x, tr_y) {
        this.height = 117;
        this.width = 48;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var wall_pat = ctx.createPattern(wall_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = wall_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }
    function Ladder(x, y, tr_x, tr_y) {
        this.height = 195;
        this.width = 24;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var ladder_pat = ctx.createPattern(ladder_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = ladder_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }
    function LongLadder(x, y, tr_x, tr_y) {
        this.height = 243;
        this.width = 24;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var long_ladder_pat = ctx.createPattern(long_ladder_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = long_ladder_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }

    function Floor(width, x, y, tr_x, tr_y) {
        this.height = 21;
        this.width = width;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var floor_pat = ctx.createPattern(floor_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = floor_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }
    function Track(x, y, tr_x, tr_y) {
        this.height = 12;
        this.width = 156;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var track_pat = ctx.createPattern(track_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = track_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }
    function LongTrack(x, y, tr_x, tr_y) {
        this.height = 12;
        this.width = 204;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var long_track_pat = ctx.createPattern(long_track_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = long_track_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }
    function Blink(x, y, tr_x, tr_y) {
        this.height = 19;
        this.width = 18;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var blink_pat = ctx.createPattern(blink_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = blink_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }
    function Rope(x, y, tr_x, tr_y) {
        this.height = 96;
        this.width = 6;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var rope_pat = ctx.createPattern(rope_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = rope_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }

    function In(x, y, tr_x, tr_y) {
        this.height = 24;
        this.width = 96;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var in_pat = ctx.createPattern(in_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = in_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }

    function Out(x, y, tr_x, tr_y) {
        this.height = 24;
        this.width = 96;
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y)
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            var out_pat = ctx.createPattern(out_patern, "repeat");
            ctx.translate(tr_x, tr_y)
            ctx.fillStyle = out_pat;
            ctx.fill()
            ctx.translate(-tr_x, -tr_y)
        }
    }

    function Playfield() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    Playfield();

    floor_patern.onload = function () {
        var platform1 = new Floor(720, 216, 630);
        platform1.draw();
        var platform2 = new Floor(240, 144, 438, 0, -3);
        platform2.draw();
        var platform3 = new Floor(240, 768, 438, 0, -3);
        platform3.draw();

        var platform3 = new Floor(336, 408, 342, 0, 6);
        platform3.draw();
        var platform4 = new Floor(336, 408, 198, 0, 9);
        platform4.draw();
        var platform5 = new Floor(126, 120, 198, 0, 9);
        platform5.draw();
        var platform6 = new Floor(126, 906, 198, -6, 9);
        platform6.draw();

        var ladder1 = new Ladder(336, 435, 0, 45)
        ladder1.draw();
        var ladder2 = new Ladder(792, 435, 0, 45)
        ladder2.draw();
        var ladder3 = new LongLadder(168, 195, 0, -48)
        ladder3.draw();
        var ladder4 = new LongLadder(960, 195, 0, -48)
        ladder4.draw();

        
        var in1 = new In(528,627,-50,3)
        in1.draw();

        var out1 = new Out(528,195,-50,0)
        out1.draw();

    }
    wall_patern.onload = function () {
        var wall1 = new Wall(552, 219, -6,-15)
        wall1.draw();
    }
    blink_patern.onload = function(){
        var blink1 = new Blink(264,585,-6,-5)
        blink1.draw();
        var blink2 = new Blink(864,585,0,-5)
        blink2.draw();
        var blink3 = new Blink(504,297,0,-8)
        blink3.draw();
        var blink4 = new Blink(624,297,-6,-8)
        blink4.draw();
        var blink5 = new Blink(456,152,6,0)
        blink5.draw();
        var blink6 = new Blink(672,152,6,0)
        blink6.draw();
    }
    rope_patern.onload = function(){
        var rope1 = new Rope(513,363,0,3)
        rope1.draw();
        var rope2 = new Rope(633,363,0,0)
        rope2.draw();
    }

    track_patern.onload = function(){
        var track1 = new Track(246,345,-66,-3)
        track1.draw();
        var track2 = new Track(750,345,-30,-3)
        track2.draw();
    }

    long_track_patern.onload = function(){
        var long_track1 = new LongTrack(366,513,-42,-3)
        long_track1.draw();
        var long_track2 = new LongTrack(582,513,-30,-3)
        long_track2.draw();
    }

    

}