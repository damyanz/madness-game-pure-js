document.addEventListener("DOMContentLoaded", function(event) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var ctix = ctx;
  var won = false;
  var clearinit = function() {
    init = "";
  };
  menu = function(ctx) {
    var color = 0;
    var colorinterval = setInterval(function() {
      color++;
      if (color > 2) {
        color = 0;
      }
    }, 300);

    var wanted = 0;

    var wantedinterval = setInterval(function() {
      if (won) {
        wanted = 4;
      } else {
        wanted++;
        if (wanted > 3) {
          wanted = 0;
        }
      }
    }, 3000);

    var buttonsTab = [];

    var menu_patern = new Image();
    var menu1_patern = new Image();
    var menu2_patern = new Image();
    var menu3_patern = new Image();
    var menu4_patern = new Image();
    var wanted_patern = new Image();
    var menubg = new MenuBG();
    var menubt1 = new MenuBt1();
    var menubt2 = new MenuBt2();
    var menubt3 = new MenuBt3();
    var menubt4 = new MenuBt4();
    var wanted1 = new Wanted();

    function MenuBG() {
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(0, 0, 1152, 846);

        menu_patern.src = "gfx/menu.png";

        var menu_pat = ctx.createPattern(menu_patern, "repeat");
        ctx.fillStyle = menu_pat;
        ctx.fill();
      };
    }

    function MenuBt1() {
      this.selected = true;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(126, 462, 90, 18);

        if (this.selected) menu1_patern.src = "gfx/menu/demo/" + color + ".png";
        else menu1_patern.src = "gfx/menu/demo/0.png";

        var menu1_pat = ctx.createPattern(menu1_patern, "repeat");
        ctx.fillStyle = menu1_pat;
        ctx.translate(-54, -6);
        ctx.fill();
        ctx.translate(54, 6);
      };
      buttonsTab.push(this);
    }
    function MenuBt2() {
      this.selected = false;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(126, 510, 258, 18);

        if (this.selected) menu2_patern.src = "gfx/menu/high/" + color + ".png";
        else menu2_patern.src = "gfx/menu/high/0.png";

        var menu2_pat = ctx.createPattern(menu2_patern, "repeat");
        ctx.fillStyle = menu2_pat;
        ctx.translate(-132, 6);
        ctx.fill();
        ctx.translate(132, -6);
      };
      buttonsTab.push(this);
    }
    function MenuBt3() {
      this.selected = false;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(126, 558, 402, 18);

        if (this.selected)
          menu3_patern.src = "gfx/menu/start/" + color + ".png";
        else menu3_patern.src = "gfx/menu/start/0.png";

        var menu3_pat = ctx.createPattern(menu3_patern, "repeat");
        ctx.fillStyle = menu3_pat;
        ctx.translate(126, 0);
        ctx.fill();
        ctx.translate(-126, 0);
      };
      buttonsTab.push(this);
    }
    function MenuBt4() {
      this.selected = false;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(126, 606, 282, 18);
        if (this.selected)
          menu4_patern.src = "gfx/menu/filter/" + color + ".png";
        else menu4_patern.src = "gfx/menu/filter/0.png";

        var menu4_pat = ctx.createPattern(menu4_patern, "repeat");
        ctx.fillStyle = menu4_pat;
        ctx.translate(-42, -6);
        ctx.fill();
        ctx.translate(42, 6);
      };
      buttonsTab.push(this);
    }
    function Wanted() {
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(588, 423, 450, 234);
        wanted_patern.src = "gfx/menu/wanter/" + wanted + ".png";
        var wanted_pat = ctx.createPattern(wanted_patern, "repeat");
        ctx.fillStyle = wanted_pat;
        ctx.translate(130, -45);
        ctx.fill();
        ctx.translate(-130, 45);
      };
    }
    window.addEventListener("keydown", function(e) {
      if (e.key == "ArrowDown") {
        var ktory;
        for (let i = 0; i < buttonsTab.length; i++) {
          if (buttonsTab[i].selected) ktory = i;
        }
        buttonsTab[ktory].selected = false;
        if (buttonsTab[ktory + 1] === undefined) buttonsTab[0].selected = true;
        else buttonsTab[ktory + 1].selected = true;
      }
      if (e.key == "ArrowUp") {
        var ktory;
        for (let i = 0; i < buttonsTab.length; i++) {
          if (buttonsTab[i].selected) ktory = i;
        }
        buttonsTab[ktory].selected = false;
        if (buttonsTab[ktory - 1] === undefined) buttonsTab[3].selected = true;
        else buttonsTab[ktory - 1].selected = true;
      }
      if (e.key == "Enter") {
        if (buttonsTab[2].selected) {
          init(ctx);
        }
      }
    });

    function menuloop() {
      menubg.draw();

      menubt2.draw();
      menubt3.draw();
      menubt4.draw();
      menubt1.draw();
      wanted1.draw();

      window.requestAnimationFrame(menuloop);
    }
    menuloop();
  };
  menu(ctx);

  init = function(ctx) {
    function Playfield() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    var req;
    var patern_counter = 1;
    var trap_height = 15;
    var arm_height = 0;
    var worm_counter = 1;
    var health_width = 270;
    let jump_counter = 0;
    var counter = 0;
    var kierunek = true;
    var kierunek_arm = true;
    var image_counter = 1;
    var run_r;
    var run_l;
    var blink_counter = 0;
    var climbing_counter = 1;
    var ladderTab = [];
    var platformTab = [];
    var blinkTab = [];
    var trackLTab = [];
    var trackRTab = [];
    var longtrackLTab = [];
    var longtrackRTab = [];
    var hammerTab = [];
    var firedBlinks = [];
    var ropeTab = [];
    var manTab = [];
    var ladd = false;
    var stop = true;
    var already_dead = false;
    var wygrana = false;
    var enter = false;

    var left = false;
    var right = false;
    var up = false;
    var down = false;
    var fired = false;
    var blinkcol = false;
    var fired_blink = false;
    var trackl_patern = new Image();

    var lifeinterval = setInterval(function() {}, 2000);

    var trapinterval = setInterval(function() {
      if (trap_height <= 0) {
        kierunek = false;
      } else if (trap_height >= 15) {
        kierunek = true;
      }
      if (kierunek) {
        trap_height -= 3;
      } else {
        trap_height += 3;
      }
    }, 200);

    var healthinterval = setInterval(function() {
      health_width -= 2;
      if (health_width <= 0) {
        dead();
        player.setCoors(558, 566);
        this.colliding = true;
        health_width = 270;
      }
    }, 500);

    var arminterval = setInterval(function() {
      if (arm_height <= 0) {
        kierunek_arm = false;
      } else if (arm_height >= 85) {
        kierunek_arm = true;
      }
      if (kierunek_arm) {
        arm_height -= 2;
      } else {
        arm_height += 2;
      }
    }, 10);

    var blink_interval = setInterval(function() {
      if (blink_counter >= 4) {
        blink_counter = 1;
      }
      blink_counter++;
    }, 80);

    var patern_interval = setInterval(function() {
      trackl_patern = new Image();
      if (patern_counter >= 4) {
        patern_counter = 0;
      }
      patern_counter++;
    }, 80);

    var chrobok_interval = setInterval(function() {
      if (worm_counter >= 4) {
        worm_counter = 0;
      }
      worm_counter++;
    }, 200);

    window.addEventListener("keydown", function(e) {
      if (e.key == "ArrowRight") {
        right = true;
        if (!fired) {
          fired = true;
          run_r = setInterval(function() {
            image_counter++;
            if (image_counter >= 7) {
              image_counter = 1;
            }
          }, 50);
        }
        clearInterval(run_l);
      }
      if (e.key == "f") {
        player.jump(function() {
          fired = false;
        });
        enter = true;
      }

      if (e.key == "ArrowLeft") {
        left = true;
        if (!fired) {
          fired = true;
          run_l = setInterval(function() {
            image_counter++;
            if (image_counter >= 7) {
              image_counter = 1;
            }
          }, 50);
        }
        clearInterval(run_r);
      }
      if (e.key == "ArrowUp") {
        up = true;
        if (!fired) {
          fired = true;
          climb = setInterval(function() {
            climbing_counter++;
            if (climbing_counter > 4) {
              climbing_counter = 1;
            }
          }, 80);
        }
        clearInterval(run_r);
        clearInterval(run_l);
      }
      if (e.key == "ArrowDown") {
        down = true;
        if (!fired) {
          fired = true;
          climb = setInterval(function() {
            climbing_counter++;
            if (climbing_counter > 4) {
              climbing_counter = 1;
            }
          }, 80);
        }
        clearInterval(run_r);
        clearInterval(run_l);
      }
    });
    window.addEventListener("keyup", function(e) {
      if (e.key == "ArrowRight") {
        right = false;
        fired = false;
        clearInterval(run_r);
        clearInterval(run_l);
      }
      if (e.key == "ArrowLeft") {
        left = false;
        fired = false;
        clearInterval(run_l);
        clearInterval(run_r);
      }
      if (e.key == "ArrowUp") {
        up = false;
        fired = false;
        clearInterval(climb);
        clearInterval(run_l);
        clearInterval(run_r);
      }
      if (e.key == "f") {
        enter = false;
      }
      if (e.key == "ArrowDown") {
        down = false;
        fired = false;
        clearInterval(climb);
        clearInterval(run_l);
        clearInterval(run_r);
      }
    });

    //floor_patern.onload = function () {
    var platform1 = new Floor(720, 216, 630);
    var platform2 = new Floor(240, 144, 438, 0, -3);
    var platform3 = new Floor(240, 768, 438, 0, -3);
    var platform4 = new Floor(336, 408, 342, 0, 6);
    var platform5 = new Floor(336, 408, 198, 0, 9);
    var platform6 = new Floor(126, 120, 198, 0, 9);
    var platform7 = new Floor(126, 906, 198, -6, 9);

    var block1 = new Block(408, 195, 0, 15);
    var block2 = new Block(720, 195, 0, 15);

    var ladder1 = new Ladder(336, 435, 0, 45);
    var ladder2 = new Ladder(792, 435, 0, 45);
    var ladder3 = new LongLadder(168, 195, 0, -48);
    var ladder4 = new LongLadder(960, 195, 0, -48);

    var in1 = new In(528, 627, -50, 3);
    var out1 = new Out(528, 195, -50, 3);

    var wall1 = new Wall(552, 219, -6, -15);
    var status = new Status(102, 657, 102, 9);
    var health = new Health(264, 681);

    var blink1 = new Blink(264, 585, 0, 9);
    var blink2 = new Blink(864, 585, 0, 9);
    var blink3 = new Blink(504, 297, 0, 9);
    var blink4 = new Blink(624, 297, 0, 9);
    var blink5 = new Blink(456, 152, 0, 8);
    var blink6 = new Blink(672, 152, 0, 8);

    var player = new Player();
    var worm = new Worm();
    var hammer1 = new Hammer(408, 222);
    var hammer2 = new Hammer(720, 222);

    var man1 = new Man(672, 675, 6, 3);
    var man2 = new Man(696, 675, 12, 3);
    var man3 = new Man(720, 675, 0, 3);

    var hammerarm1 = new HammerArm(414, 240, 6, 0);
    var hammerarm2 = new HammerArm(726, 240, -6, 0);

    var rope1 = new Rope(513, 342, 0, -9);
    var rope2 = new Rope(633, 342, 0, -9);

    var track1 = new TrackL(240, 339, 72, 3);
    var track2 = new TrackR(744, 339, 72, 3);

    var long_track1 = new LongTrackL(360, 507, -72, 3);
    var long_track2 = new LongTrackR(576, 507, -72, 3);

    var trap1 = new Trap(240, 198, 0, 3);
    var trap2 = new Trap(744, 198, 0, 3);

    var floor_patern = new Image();

    var block_patern = new Image();

    var wall_patern = new Image();
    var status_patern = new Image();

    var ladder_patern = new Image();
    var long_ladder_patern = new Image();

    var trap_patern = new Image();

    var playerGfx = new Image();
    playerGfx.src = "gfx/player/stand.png";

    var rope_patern = new Image();

    var in_patern = new Image();
    var out_patern = new Image();

    function Player() {
      var x = 558;
      var y = 566;
      var speed = 3;
      var height = 57;
      var width = 27;

      this.update = () => {
        if (right && this.colliding && !this.colliding_wall) {
          x += speed;
          playerGfx.src = "gfx/player/run_r/" + image_counter + ".png";
        } else if (left && this.colliding && !this.colliding_wall) {
          x -= speed;
          playerGfx.src = "gfx/player/run_l/" + image_counter + ".png";
        } else if (
          (up && ladd && y <= 580 && y > 380 && x >= 330 && x < 818) ||
          (up && ladd && y <= 383 && y > 141 && x > 158 && x < 188) ||
          (up && ladd && y <= 383 && y > 141 && x > 954 && x < 972) ||
          up & this.colliding_rope
        ) {
          y -= speed;
          playerGfx.src = "gfx/player/clibing/" + climbing_counter + ".png";
          //playerGfx.src = "gfx/player/run_l/" + image_counter + ".png";
        } else if (
          (down && ladd && y >= 375 && y < 570 && x >= 330 && x < 818) ||
          (down && ladd && y >= 130 && y < 382)
        ) {
          y += speed;
          playerGfx.src = "gfx/player/clibing/" + climbing_counter + ".png";
        } else if (this.colliding_track && !right && !left) {
          x -= speed;
          playerGfx.src = "gfx/player/run_l/" + image_counter + ".png";
        } else if (this.colliding_trackr && !right && !left) {
          x += speed;
          playerGfx.src = "gfx/player/run_r/" + image_counter + ".png";
        } else if (this.colliding_track && right && !left) {
          x += 0.6 * speed;
          playerGfx.src = "gfx/player/run_r/" + image_counter + ".png";
        } else if (this.colliding_trackr && right && !left) {
          x += 3 * speed;
          playerGfx.src = "gfx/player/run_r/" + image_counter + ".png";
        } else if (this.colliding_track && !right && left) {
          x -= 3 * speed;
          playerGfx.src = "gfx/player/run_l/" + image_counter + ".png";
        } else if (this.colliding_trackr && !right && left) {
          x -= 0.6 * speed;
          playerGfx.src = "gfx/player/run_l/" + image_counter + ".png";
        } else if (
          !this.colliding &&
          !this.colliding_track &&
          !this.colliding_trackr
        ) {
          y += speed * 2;
        } else if (!this.colliding) {
          y += speed * 2;
        } else if (this.colliding_wall) {
          x += speed * 0;

          if (left) {
            x += 3;
          } else {
            x -= 3;
          }
        } else {
          playerGfx.src = "gfx/player/stand.png";
        }

        if (this.colliding_hammer || y > 846 || this.checkCollision(worm)) {
          dead();
          x = 558;
          y = 566;
          this.colliding = true;
        }
        if (wygrana && enter && x > 534 && x < 618 && y < 150) {
          won = true;
          window.requestAnimationFrame(menuloop);
        }

        ctx.save();
        //ctx.translate(x, y)
        ctx.drawImage(playerGfx, x, y);
        ctx.restore();
        for (var i = 0; i < platformTab.length; i++) {
          if (
            x < platformTab[i].x + platformTab[i].width &&
            x + width > platformTab[i].x &&
            y < platformTab[i].y - 10 + platformTab[i].height &&
            height + y > platformTab[i].y - 10
          ) {
            this.colliding = true;

            break;
          } else {
            this.colliding = false;
          }
        }
        for (var i = 0; i < trackLTab.length; i++) {
          if (
            x < trackLTab[i].x + trackLTab[i].width &&
            x + width > trackLTab[i].x &&
            y < trackLTab[i].y - 2 + trackLTab[i].height &&
            height + y > trackLTab[i].y - 2
          ) {
            this.colliding_track = true;

            break;
          } else {
            this.colliding_track = false;
          }
        }
        for (var i = 0; i < trackRTab.length; i++) {
          if (
            x < trackRTab[i].x + trackRTab[i].width &&
            x + width > trackRTab[i].x &&
            y < trackRTab[i].y - 2 + trackRTab[i].height &&
            height + y > trackRTab[i].y - 2
          ) {
            this.colliding_trackr = true;

            break;
          } else {
            this.colliding_trackr = false;
          }
        }
        for (var i = 0; i < hammerTab.length; i++) {
          if (
            x < hammerTab[i].x + hammerTab[i].width &&
            x + width > hammerTab[i].x &&
            y < hammerTab[i].y - 2 + hammerTab[i].height &&
            height + y > hammerTab[i].y - 2
          ) {
            this.colliding_hammer = true;

            break;
          } else {
            this.colliding_hammer = false;
          }
        }
        for (var i = 0; i < ropeTab.length; i++) {
          if (
            x < ropeTab[i].x + ropeTab[i].width &&
            x + width > ropeTab[i].x &&
            y < ropeTab[i].y - 2 + ropeTab[i].height &&
            height + y > ropeTab[i].y - 2
          ) {
            this.colliding_rope = true;

            break;
          } else {
            this.colliding_rope = false;
          }
        }
        if (
          x < wall1.x + wall1.width &&
          x + width > wall1.x &&
          y < wall1.y + wall1.height &&
          height + y > wall1.y
        ) {
          this.colliding_wall = true;
        } else {
          this.colliding_wall = false;
        }
        /* for (var i = 0; i < platformTab.length; i++) {
                         if (x < platformTab[i].x + platformTab[i].width &&
                             x + width > platformTab[i].x &&
                             y < platformTab[i].y - 2 + platformTab[i].height &&
                             height + y > platformTab[i].y - 2) {
                             this.colliding = true

                             break;
                         } else {
                             this.colliding = false;
                         }
                     }*/

        for (var i = 0; i < ladderTab.length; i++) {
          if (this.checkCollision(ladderTab[i])) {
            ladd = true;
            this.colliding = true;
            break;
          } else {
            ladd = false;
          }
        }

        for (var i = 0; i < blinkTab.length; i++) {
          if (this.checkCollision(blinkTab[i])) {
            blinkTab[i].fired = true;
            if (firedBlinks.indexOf(blinkTab[i]) == -1)
              firedBlinks.push(blinkTab[i]);
            if (firedBlinks.length == 6) {
              wygrana = true;
            }
            break;
          } else {
          }
        }
      };

      this.checkCollision = function(entity) {
        return (
          x < entity.x + entity.width &&
          x + width > entity.x &&
          y < entity.y + entity.height &&
          height + y > entity.y
        );
      };
      this.jump = function(callback) {
        if (!fired) {
          fired = true;
          jump = setInterval(function() {
            jump_counter++;
            if (jump_counter >= 10) {
              jump_counter = 0;

              clearInterval(jump);
              callback("skoczylem");
            }
            y -= jump_counter;
          }, 10);
        }
      };
      this.setCoors = function(cx, cy) {
        x = cx;
        y = cy;
      };
    }
    function Worm() {
      var x = 576;
      var y = 170;
      this.x = x;
      this.y = y;

      var speed = 0.8;
      var height = 28;
      var width = 60;
      this.width = width;
      this.height = height;
      var right = true;
      var left = false;
      var up = false;
      var down = false;

      this.update = () => {
        if (right) {
          x += speed;
          this.x += speed;
        }
        if (left) {
          x -= speed;
          this.x -= speed;
        }

        if (up) {
          y -= speed;
          this.y -= speed;
        }

        if (down) {
          y += speed;
          this.y += speed;
        }

        if (x <= 410) {
          left = false;
          right = true;
        }
        if (x >= 685) {
          right = false;
          left = true;
        }
        var wormGfx = new Image();
        wormGfx.src = "gfx/chrobok/" + worm_counter + ".png";
        ctx.drawImage(wormGfx, x, y);
      };
    }
    function Hammer(x, y) {
      this.x = x;
      this.y = y;

      var speed = 2;
      var height = 21;
      var width = 24;
      this.width = width;
      this.height = height;
      var up = false;
      var down = true;

      this.update = () => {
        if (up) {
          y -= speed;
          this.y -= speed;
        }

        if (down) {
          y += speed;
          this.y += speed;
        }

        if (y >= 320) {
          down = false;
          up = true;
        }
        if (y <= 222) {
          down = true;
          up = false;
        }
        var hammerGfx = new Image();
        hammerGfx.src = "gfx/playfield/hammer.png";
        ctx.drawImage(hammerGfx, x, y);
      };
      this.getHeight = () => {
        return this.y;
      };
      hammerTab.push(this);
    }

    function Wall(x, y, tr_x, tr_y) {
      this.height = 117;
      this.width = 48;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        wall_patern.src = "gfx/playfield/wall.png";
        var wall_pat = ctx.createPattern(wall_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = wall_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
    }
    function Status(x, y, tr_x, tr_y) {
      this.height = 54;
      this.width = 942;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        status_patern.src = "gfx/playfield/status.png";
        var status_pat = ctx.createPattern(status_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = status_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
    }
    function Ladder(x, y, tr_x, tr_y) {
      this.height = 195;
      this.width = 24;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ladder_patern.src = "gfx/playfield/ladder.png";
        var ladder_pat = ctx.createPattern(ladder_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = ladder_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      ladderTab.push(this);
    }
    function LongLadder(x, y, tr_x, tr_y) {
      this.height = 243;
      this.width = 24;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        long_ladder_patern.src = "gfx/playfield/long_ladder.png";
        var long_ladder_pat = ctx.createPattern(long_ladder_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = long_ladder_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      ladderTab.push(this);
    }

    function Floor(width, x, y, tr_x, tr_y) {
      this.height = 21;
      this.width = width;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        floor_patern.src = "gfx/playfield/floor_pat.png";
        var floor_pat = ctx.createPattern(floor_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = floor_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      platformTab.push(this);
    }
    function Trap(x, y, tr_x, tr_y) {
      this.width = 168;
      this.x = x;
      this.y = y;
      this.changeHeight = function() {
        this.height = trap_height;
        if (this.height <= 0) {
          var index = platformTab.indexOf(this);
          if (index > -1) {
            platformTab.splice(index, 1);
          }
        } else {
          if (platformTab.indexOf(this) == -1) {
            platformTab.push(this);
          } else {
          }
        }
      };
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        var trap_patern = new Image();
        trap_patern.src = "gfx/playfield/trap.png";
        var trap_pat = ctx.createPattern(trap_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = trap_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      platformTab.push(this);
    }
    function HammerArm(x, y, tr_x, tr_y) {
      this.width = 12;
      this.x = x;
      this.y = y;
      this.changeHeight = function(what) {
        this.height = what - this.y + 2;
      };
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        var hammerarm_patern = new Image();
        hammerarm_patern.src = "gfx/playfield/hammerarm.png";
        var hammerarm_pat = ctx.createPattern(hammerarm_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = hammerarm_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
    }
    function Man(x, y, tr_x, tr_y) {
      this.width = 18;
      this.height = 24;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        var man_patern = new Image();
        man_patern.src = "gfx/man.png";
        var man_pat = ctx.createPattern(man_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = man_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      manTab.push(this);
    }
    function Health(x, y) {
      this.width = 270;
      this.height = 12;
      this.x = x;
      this.y = y;
      this.changeWidth = function() {
        this.width = health_width;
      };
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#92394c";
        ctx.fill();
      };
    }
    function TrackL(x, y, tr_x, tr_y) {
      this.height = 24;
      this.width = 168;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);

        trackl_patern.src = "gfx/playfield/trackl/" + patern_counter + ".png";
        var trackl_pat = ctx.createPattern(trackl_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = trackl_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      trackLTab.push(this);
    }

    function TrackR(x, y, tr_x, tr_y) {
      this.height = 24;
      this.width = 168;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        var trackr_patern = new Image();
        trackr_patern.src = "gfx/playfield/trackr/" + patern_counter + ".png";
        var trackr_pat = ctx.createPattern(trackr_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = trackr_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      trackRTab.push(this);
    }
    function LongTrackL(x, y, tr_x, tr_y) {
      this.height = 24;
      this.width = 216;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        var long_trackl_patern = new Image();
        long_trackl_patern.src =
          "gfx/playfield/long_trackl/" + patern_counter + ".png";
        var long_trackl_pat = ctx.createPattern(long_trackl_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = long_trackl_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      trackRTab.push(this);
    }

    function LongTrackR(x, y, tr_x, tr_y) {
      this.height = 24;
      this.width = 216;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        var long_trackr_patern = new Image();
        long_trackr_patern.src =
          "gfx/playfield/long_trackr/" + patern_counter + ".png";
        var long_trackr_pat = ctx.createPattern(long_trackr_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = long_trackr_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      trackLTab.push(this);
    }
    function Blink(x, y, tr_x, tr_y) {
      this.height = 24;
      this.width = 24;
      this.x = x;
      this.y = y;
      this.fired = false;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        var blink_patern = new Image();
        if (this.fired) {
          blink_patern.src =
            "gfx/playfield/swiatleko/" + blink_counter + ".png";
        } else {
          blink_patern.src = "gfx/playfield/blink/0.png";
        }
        var blink_pat = ctx.createPattern(blink_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = blink_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      blinkTab.push(this);
    }
    function Rope(x, y, tr_x, tr_y) {
      this.height = 117;
      this.width = 6;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        rope_patern.src = "gfx/playfield/rope.png";
        var rope_pat = ctx.createPattern(rope_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = rope_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
      ropeTab.push(this);
    }
    function Block(x, y, tr_x, tr_y) {
      this.height = 48;
      this.width = 24;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        block_patern.src = "gfx/playfield/block.png";
        var block_pat = ctx.createPattern(block_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = block_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
    }

    function In(x, y, tr_x, tr_y) {
      this.height = 24;
      this.width = 96;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        in_patern.src = "gfx/playfield/in.png";
        var in_pat = ctx.createPattern(in_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = in_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
    }

    function Out(x, y, tr_x, tr_y) {
      this.height = 24;
      this.width = 96;
      this.x = x;
      this.y = y;
      this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        out_patern.src = "gfx/playfield/out.png";
        var out_pat = ctx.createPattern(out_patern, "repeat");
        ctx.translate(tr_x, tr_y);
        ctx.fillStyle = out_pat;
        ctx.fill();
        ctx.translate(-tr_x, -tr_y);
      };
    }

    function loop() {
      Playfield();

      platform1.draw();
      platform2.draw();
      platform3.draw();
      platform3.draw();
      platform4.draw();
      platform5.draw();
      platform6.draw();
      platform7.draw();

      trap1.changeHeight();
      trap1.draw();
      trap2.changeHeight();
      trap2.draw();

      ladder1.draw();
      ladder2.draw();
      ladder3.draw();
      ladder4.draw();

      in1.draw();
      out1.draw();

      wall1.draw();

      blink1.draw();
      blink2.draw();
      blink3.draw();
      blink4.draw();
      blink5.draw();
      blink6.draw();

      rope1.draw();
      rope2.draw();

      track1.draw();
      track2.draw();

      long_track1.draw();
      long_track2.draw();

      worm.update();

      hammerarm1.changeHeight(hammer1.getHeight());
      hammerarm1.draw();
      hammerarm2.changeHeight(hammer2.getHeight());
      hammerarm2.draw();

      hammer1.update();
      hammer2.update();

      block1.draw();
      block2.draw();

      player.update();
      status.draw();
      health.changeWidth();
      health.draw();

      for (var i = 0; i < manTab.length; i++) {
        manTab[i].draw();
      }

      req = window.requestAnimationFrame(loop);
    }
    loop();

    function dead() {
      manTab.pop();
      if (manTab.length == 0) {
        menu(ctx);
        window.requestAnimationFrame(menuloop);
        for (var i = 0; i < blinkTab.length; i++) blinkTab[i].fired = false;
        firedBlinks = [];
      } else {
        console.log("init");
        health_width = 270;
        for (var i = 0; i < blinkTab.length; i++) blinkTab[i].fired = false;
      }
      firedBlinks = [];
      wygrana = false;
      enter = false;
    }
  };
});
