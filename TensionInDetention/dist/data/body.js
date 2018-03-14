var TProject;
(function (TProject) {
    var array_dif = (function () {
        function array_dif() {
        }
        array_dif.greet = function () {
            console.log("HALOOOOOOO");
            return "Hello";
        };
        return array_dif;
    }());
    TProject.array_dif = array_dif;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var ArrayOperat = (function () {
        function ArrayOperat() {
        }
        ArrayOperat.greet = function () {
            console.log("HALOOOOOOO");
            return "Hello";
        };
        ArrayOperat.GetArraysDiff = function (a, b) {
            var result = [];
            for (var i = 0; i < a.length; i++) {
                var have = 0;
                for (var j = 0; j < b.length; j++) {
                    if (a[i] == b[j]) {
                        have += 1;
                    }
                    if (j == b.length - 1 && have == 0) {
                        result.push(a[i]);
                    }
                }
            }
            return result;
        };
        return ArrayOperat;
    }());
    TProject.ArrayOperat = ArrayOperat;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var camClass = (function (_super) {
        __extends(camClass, _super);
        function camClass(game, x, y, spr, num) {
            var _this = _super.call(this, game, x, y) || this;
            _this.startX = -10;
            _this.startY = -10;
            _this.startNoiseX = 0;
            _this.startNoiseY = 0;
            _this._activeCam = false;
            _this.shakeEffect = false;
            _this.anchor.set(0.0);
            _this._spr = _this.game.add.sprite(0, 0, spr);
            _this._spr.anchor.set(0.0);
            _this._spr.position.x = -300 * num;
            _this.addChild(_this._spr);
            _this._numCam = num;
            _this._numRoom = num + 1;
            _this.origX = x;
            _this.origY = y;
            _this._mask = _this.game.add.graphics(0, 0);
            _this._mask.beginFill(0xffffff);
            _this._mask.drawRect(0, 0, 300, 200);
            _this._spr.mask = _this._mask;
            _this.addChild(_this._mask);
            _this._noise = _this.game.add.sprite(0, 0, "cameras", "cam_noise0001");
            _this._noise.animations.add("cam_noise", Phaser.Animation.generateFrameNames("cam_noise", 1, 3, "", 4));
            _this._noise.play("cam_noise", 20, true);
            _this._noise.anchor.set(0, 0);
            _this._noise.x = 13;
            _this._noise.y = 13;
            _this._noise.tint = 0xD4D4D4;
            _this.addChild(_this._noise);
            _this.startNoiseX = _this._noise.x;
            _this.startNoiseY = _this._noise.y;
            _this._black = _this.game.add.sprite(0, 0, "blocks", "black_cam");
            _this.addChild(_this._black);
            _this._black.visible = false;
            game.time.events.loop(30, _this.shakeEffectEvent, _this);
            return _this;
        }
        camClass.prototype.timeShakeOn = function () {
            var _this = this;
            this.shakeOn();
            this.game.time.events.add(300, function (e) { _this.shakeOff(false); });
            TProject.SoundMixer.play("sound 9", TProject.BaseGame.soundVolume);
        };
        camClass.prototype.blackScreenOn = function () {
            var _this = this;
            this._black.visible = true;
            this.game.time.events.add(50, function (e) { _this._black.visible = false; });
            TProject.SoundMixer.play("sound 10", TProject.BaseGame.soundVolume);
        };
        camClass.prototype.shakeOn = function () {
            if (this.startX == -10 && this.startY == -10) {
                this.startX = this.x;
                this.startY = this.y;
            }
            this.shakeEffect = true;
            this._noise.visible = true;
            this._noise.alpha = 0.6;
        };
        camClass.prototype.shakeOff = function (sound) {
            if (sound === void 0) { sound = true; }
            if (sound == true) {
                TProject.SoundMixer.play("sound 10", TProject.BaseGame.soundVolume);
            }
            this.shakeEffect = false;
            this.x = this.startX;
            this.y = this.startY;
            this._noise.x = this.startNoiseX;
            this._noise.y = this.startNoiseY;
            this._noise.alpha = 1;
            this._noise.visible = false;
        };
        camClass.prototype.shakeEffectEvent = function () {
            if (this.shakeEffect == true) {
                var shakeX = this.game.rnd.integerInRange(-10, 10);
                var shakeY = this.game.rnd.integerInRange(-10, 10);
                this.position.set(this.startX + shakeX, this.startY + shakeY);
                if (this.scale.x == -1) {
                    this._noise.position.x = this.startNoiseX + shakeX;
                }
                else {
                    this._noise.position.x = this.startNoiseX - shakeX;
                }
                if (this.scale.y == -1) {
                    this._noise.position.y = this.startNoiseY + shakeY;
                }
                else {
                    this._noise.position.y = this.startNoiseY - shakeY;
                }
            }
        };
        camClass.prototype.updMask = function () {
        };
        camClass.prototype.noiseOn = function () {
            this._noise.visible = true;
        };
        camClass.prototype.noiseOff = function () {
            this._noise.visible = false;
        };
        camClass.prototype.update = function () {
        };
        return camClass;
    }(Phaser.Sprite));
    TProject.camClass = camClass;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Comix1 = (function (_super) {
        __extends(Comix1, _super);
        function Comix1(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this.act = 0;
            _this.allowClick = false;
            _this._manager = manager;
            _this.anchor.set(0.0, 0.0);
            _this.bg = _this.game.add.sprite(0, 0, "c1_bg");
            _this.bg.anchor.set(0, 0);
            _this.addChild(_this.bg);
            _this.c1_cams = _this.game.add.sprite(546, 112, "comix_atlas", "comix_cams0001");
            _this.c1_cams.anchor.set(0.5, 0.5);
            _this.bg.addChild(_this.c1_cams);
            _this.c1_p2 = _this.game.add.sprite(195, 114, "comix_other", "c1_p2");
            _this.c1_p2.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p2);
            _this.c1_p1 = _this.game.add.sprite(108, 64, "comix_other", "c1_p1");
            _this.c1_p1.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p1);
            _this.c1_glaza3 = _this.game.add.sprite(100, 120, "comix_other", "c1_glaza3");
            _this.c1_glaza3.anchor.set(0.5, 0.5);
            _this.c1_p1.addChild(_this.c1_glaza3);
            _this.c1_button = _this.game.add.sprite(297, 284, "comix_other", "c1_button");
            _this.c1_button.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_button);
            _this.c1_p1_hand = _this.game.add.sprite(34, 190, "comix_other", "c1_p1_hand");
            _this.c1_p1_hand.anchor.set(0, 0);
            _this.c1_p1_hand.pivot.set(11, 8);
            _this.c1_p1.addChild(_this.c1_p1_hand);
            _this.c1_p3 = _this.game.add.sprite(590, 263, "comix_other", "c1_p3");
            _this.c1_p3.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p3);
            _this.c1_p2dop = _this.game.add.sprite(584, 110, "comix_other", "c1_p2dop");
            _this.c1_p2dop.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p2dop);
            _this.c1_glaza2 = _this.game.add.sprite(88, 53, "comix_other", "c1_glaza2");
            _this.c1_glaza2.anchor.set(0.5, 0.5);
            _this.c1_p2dop.addChild(_this.c1_glaza2);
            _this.bg2 = _this.game.add.sprite(0, 0, "c1_bg2");
            _this.bg2.anchor.set(0, 0);
            _this.addChild(_this.bg2);
            _this.c1_p3dop = _this.game.add.sprite(300, 300, "comix_other", "c1_p3dop");
            _this.c1_p3dop.anchor.set(0, 0);
            _this.bg2.addChild(_this.c1_p3dop);
            _this.c1_glaza1 = _this.game.add.sprite(173, 85, "comix_other", "c1_glaza1");
            _this.c1_glaza1.anchor.set(0.5, 0.5);
            _this.c1_p3dop.addChild(_this.c1_glaza1);
            _this.c1_dino = _this.game.add.sprite(-150, 300, "comix_other", "c1_dino");
            _this.c1_dino.anchor.set(0.5, 0.5);
            _this.bg2.addChild(_this.c1_dino);
            _this.c1_jamie = _this.game.add.sprite(1050, 415, "comix_other", "c1_jamie");
            _this.c1_jamie.anchor.set(0.5, 0.5);
            _this.bg2.addChild(_this.c1_jamie);
            _this.bg2.visible = false;
            _this.c_dialog_panel = _this.game.add.sprite(460, 560, "comix_other", "c_dialog_panel");
            _this.c_dialog_panel.anchor.set(0.5, 0.5);
            _this.addChild(_this.c_dialog_panel);
            var myText = _this.game.add.text(-315, -35, "text", { font: "24px HelveticaRounded-Black", fill: "#666666", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.align = "center";
            myText.text = TProject.Locale.comix1_1;
            myText.anchor.set(0, 0);
            myText.wordWrap = true;
            myText.wordWrapWidth = 740;
            myText.setTextBounds(0, 0, 740, 70);
            _this.c_dialog_panel.addChild(myText);
            _this.c_dialog_panel.data.dialogText = myText;
            _this.p1_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p1_avatar");
            _this.p1_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p1_avatar);
            _this.p2_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p2_avatar");
            _this.p2_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p2_avatar);
            _this.p3_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p3_avatar");
            _this.p3_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p3_avatar);
            _this.skipBtn = _this.game.add.button(885, 35, "menu_atlas", function (e) { _this.skipBtnClick(); }, _this, "skipBtn", "skipBtn", "skipBtn");
            _this.skipBtn.anchor.set(0.5, 0.5);
            _this.addChild(_this.skipBtn);
            _this.startComix(1);
            _this.skipTimer = _this.game.time.events.add(3000, function (e) { _this.onClickEvent(); });
            _this.inputEnabled = true;
            _this.events.onInputDown.add(function (e) { _this.onClickEvent(); });
            return _this;
        }
        Comix1.prototype.skipBtnClick = function () {
            var _this = this;
            this.hideDialog();
            this._manager.fadeSprite.goFade(function (e) {
                if (TProject.BaseGame.isSoundOn)
                    TProject.SoundMixer.play("sound 2", TProject.BaseGame.musicVolume, true);
                _this._manager.currentLevel = 1;
                _this._manager.restartLevel();
                _this._manager.comixSprite.removeComix();
            }, 500, 500);
        };
        Comix1.prototype.showDialog = function (num, str) {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 27", TProject.BaseGame.soundVolume);
            this.c_dialog_panel.data.dialogText.text = str;
            this.c_dialog_panel.visible = true;
            this.p1_avatar.visible = false;
            this.p2_avatar.visible = false;
            this.p3_avatar.visible = false;
            this["p" + num + "_avatar"].visible = true;
        };
        Comix1.prototype.hideDialog = function () {
            this.c_dialog_panel.visible = false;
        };
        Comix1.prototype.startComix = function (num) {
            if (num == 1) {
                this.hideDialog();
                this.act = 0;
                this.allowClick = true;
                this.c1_dino.x = -150;
                this.c1_dino.y = 300;
                this.c1_jamie.x = 1050;
                this.c1_jamie.y = 415;
                this.c1_glaza1.x = 173;
                this.c1_glaza1.y = 85;
                this.c1_glaza2.x = 88;
                this.c1_glaza2.y = 53;
                this.c1_glaza2.visible = false;
                this.bg2.visible = false;
                this.bg.visible = true;
                this.c1_p3.x = 590;
                this.c1_p3.y = 263;
                this.c1_p3.visible = true;
                this.c1_p2.visible = true;
                this.c1_glaza3.x = 100;
                this.c1_glaza3.y = 120;
                this.c1_glaza3.visible = false;
                this.c1_p2dop.visible = false;
                this.c1_cams.y = -150;
                this.c1_p1_hand.x = 34;
                this.c1_p1_hand.y = 190;
            }
        };
        Comix1.prototype.onClickEvent = function () {
            var _this = this;
            console.log("DIALOG CLICK " + this.act);
            if (this.allowClick == true) {
                this.game.time.events.remove(this.skipTimer);
                this.skipTimer = this.game.time.events.add(3000, function (e) { _this.onClickEvent(); });
                this.allowClick = false;
                if (this.act == 0) {
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(1, TProject.Locale.comix1_1);
                        _this.c1_p1.loadTexture("comix_other", "c1_p1a");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 1) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(3, TProject.Locale.comix1_2);
                        _this.c1_p3.loadTexture("comix_other", "c1_p3a");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 2) {
                    this.hideDialog();
                    this.c1_p3.loadTexture("comix_other", "c1_p3");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(2, TProject.Locale.comix1_3);
                        _this.c1_p2.loadTexture("comix_other", "c1_p2a");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 3) {
                    this.hideDialog();
                    this.c1_p2.loadTexture("comix_other", "c1_p2");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(3, TProject.Locale.comix1_4);
                        _this.c1_p3.loadTexture("comix_other", "c1_p3b");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 4) {
                    this.hideDialog();
                    this.c1_p3.loadTexture("comix_other", "c1_p3");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(1, TProject.Locale.comix1_5);
                        _this.c1_p1.loadTexture("comix_other", "c1_p1a");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 5) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(3, TProject.Locale.comix1_6);
                        _this.c1_p3.loadTexture("comix_other", "c1_p3a");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 6) {
                    this.hideDialog();
                    this.c1_p3.loadTexture("comix_other", "c1_p3");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(2, TProject.Locale.comix1_7);
                        _this.c1_p2.loadTexture("comix_other", "c1_p2a");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 7) {
                    this.hideDialog();
                    this.c1_p2.loadTexture("comix_other", "c1_p2");
                    this.game.time.events.add(300, function (e) {
                        _this._manager.fadeSprite.goFade(function (e) {
                            _this.bg2.visible = true;
                            _this.allowClick = true;
                        }, 500, 500);
                    });
                }
                if (this.act == 8) {
                    this.hideDialog();
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(3, TProject.Locale.comix1_8);
                        _this.c1_p3dop.loadTexture("comix_other", "c1_p3dopa");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 9) {
                    this.hideDialog();
                    this.c1_p3dop.loadTexture("comix_other", "c1_p3dop");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(3, TProject.Locale.comix1_9);
                        _this.c1_p3dop.loadTexture("comix_other", "c1_p3dopa");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 10) {
                    this.hideDialog();
                    this.c1_p3dop.loadTexture("comix_other", "c1_p3dop");
                    this.game.time.events.add(300, function (e) {
                        var tween = _this.game.add.tween(_this.c1_dino).to({ x: 145, y: 300 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                        var tween = _this.game.add.tween(_this.c1_jamie).to({ x: 825, y: 415 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                        var tween = _this.game.add.tween(_this.c1_glaza1).to({ x: 161, y: 78 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                        _this.allowClick = true;
                    });
                }
                if (this.act == 11) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.c1_glaza3.visible = true;
                    this.c1_p2.visible = false;
                    this.c1_p2dop.visible = true;
                    this.c1_p3.visible = false;
                    this.game.time.events.add(300, function (e) {
                        _this._manager.fadeSprite.goFade(function (e) {
                            _this.bg2.visible = false;
                            _this.allowClick = true;
                        }, 500, 500);
                    });
                }
                if (this.act == 12) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(1, TProject.Locale.comix1_10);
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 13) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(2, TProject.Locale.comix1_11);
                        _this.c1_p2dop.loadTexture("comix_other", "c1_p2dopa");
                        _this.c1_glaza2.visible = true;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 14) {
                    this.hideDialog();
                    this.c1_p2.loadTexture("comix_other", "c1_p2dop");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(1, TProject.Locale.comix1_12);
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 15) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.game.time.events.add(300, function (e) {
                        var tween = _this.game.add.tween(_this.c1_glaza2).to({ x: 87, y: 47 }, 600, Phaser.Easing.Linear.None, true, 400, 0, false);
                        var tween = _this.game.add.tween(_this.c1_glaza3).to({ x: 102, y: 115 }, 600, Phaser.Easing.Linear.None, true, 400, 0, false);
                        var tween = _this.game.add.tween(_this.c1_cams).to({ x: 546, y: 112 }, 1000, Phaser.Easing.Linear.None, true, 400, 0, false);
                        var tween = _this.game.add.tween(_this.c1_p1_hand).to({ x: 45, y: 188 }, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                        _this.game.time.events.add(200, function (e) {
                            _this.c1_p1_hand.loadTexture("comix_other", "c1_p1_hand2");
                        });
                        _this.allowClick = true;
                    });
                }
                if (this.act == 16) {
                    this._manager.fadeSprite.goFade(function (e) {
                        if (TProject.BaseGame.isSoundOn)
                            TProject.SoundMixer.play("sound 2", TProject.BaseGame.musicVolume, true);
                        _this._manager.currentLevel = 1;
                        _this._manager.restartLevel();
                        _this._manager.comixSprite.removeComix();
                    }, 500, 500);
                }
                this.act += 1;
            }
        };
        return Comix1;
    }(Phaser.Sprite));
    TProject.Comix1 = Comix1;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Comix2 = (function (_super) {
        __extends(Comix2, _super);
        function Comix2(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this.act = 0;
            _this.allowClick = true;
            _this._manager = manager;
            _this.anchor.set(0.0, 0.0);
            _this.bg = _this.game.add.sprite(0, 0, "c1_bg");
            _this.bg.anchor.set(0, 0);
            _this.addChild(_this.bg);
            _this.c1_button = _this.game.add.sprite(297, 284, "comix_other", "c1_button");
            _this.c1_button.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_button);
            _this.c1_cams = _this.game.add.sprite(546, 112, "comix_atlas", "comix_cams0001");
            _this.c1_cams.animations.add("cams_on", Phaser.Animation.generateFrameNames("comix_cams", 1, 1, "", 4));
            _this.c1_cams.animations.add("cams_off", Phaser.Animation.generateFrameNames("comix_cams", 2, 4, "", 4));
            _this.c1_cams.play("cams_on", 30, true);
            _this.c1_cams.anchor.set(0.5, 0.5);
            _this.bg.addChild(_this.c1_cams);
            _this.c1_p1 = _this.game.add.sprite(108, 64, "comix_other", "c1_p1dop");
            _this.c1_p1.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p1);
            _this.c1_p2dop = _this.game.add.sprite(584, 110, "comix_other", "c1_p2dop");
            _this.c1_p2dop.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p2dop);
            _this.c1_glaza2 = _this.game.add.sprite(88, 53, "comix_other", "c1_glaza2");
            _this.c1_glaza2.anchor.set(0.5, 0.5);
            _this.c1_p2dop.addChild(_this.c1_glaza2);
            _this.c1_glaza2.visible = false;
            _this.c2_p1dir = _this.game.add.sprite(24, 96, "c2_p1dir", "c1_p1dir0001");
            _this.c2_p1dir.animations.add("c2_p1dir_play", Phaser.Animation.generateFrameNames("c1_p1dir", 1, 37, "", 4));
            _this.c2_p1dir.anchor.set(0, 0);
            _this.c1_p1.addChild(_this.c2_p1dir);
            _this.c2_glass = _this.game.add.sprite(46, 91, "comix_other", "c2_glass");
            _this.c2_glass.anchor.set(0, 0);
            _this.c1_p1.addChild(_this.c2_glass);
            _this.c2_glass.visible = false;
            _this.c_dialog_panel = _this.game.add.sprite(460, 560, "comix_other", "c_dialog_panel");
            _this.c_dialog_panel.anchor.set(0.5, 0.5);
            _this.addChild(_this.c_dialog_panel);
            var myText = _this.game.add.text(-315, -35, "text", { font: "24px HelveticaRounded-Black", fill: "#666666", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.align = "center";
            myText.text = TProject.Locale.comix1_1;
            myText.anchor.set(0, 0);
            myText.wordWrap = true;
            myText.wordWrapWidth = 740;
            myText.setTextBounds(0, 0, 740, 70);
            _this.c_dialog_panel.addChild(myText);
            _this.c_dialog_panel.data.dialogText = myText;
            _this.p1_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p1_avatar");
            _this.p1_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p1_avatar);
            _this.p2_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p2_avatar");
            _this.p2_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p2_avatar);
            _this.p3_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p3_avatar");
            _this.p3_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p3_avatar);
            _this.skipBtn = _this.game.add.button(885, 35, "menu_atlas", function (e) { _this.skipBtnClick(); }, _this, "skipBtn", "skipBtn", "skipBtn");
            _this.skipBtn.anchor.set(0.5, 0.5);
            _this.addChild(_this.skipBtn);
            _this.hideDialog();
            _this.inputEnabled = true;
            _this.events.onInputDown.add(function (e) { _this.onClickEvent(); });
            _this.skipTimer = _this.game.time.events.add(3000, function (e) { _this.onClickEvent(); });
            return _this;
        }
        Comix2.prototype.skipBtnClick = function () {
            var _this = this;
            this.hideDialog();
            this.c1_p1.loadTexture("comix_other", "c1_p1dop");
            this._manager.fadeSprite.goFade(function (e) {
                if (TProject.BaseGame.isSoundOn)
                    TProject.SoundMixer.play("sound 2", TProject.BaseGame.musicVolume, true);
                _this._manager.currentLevel = 12;
                _this._manager.restartLevel();
                _this._manager.comixSprite.removeComix();
            }, 500, 500);
        };
        Comix2.prototype.showDialog = function (num, str) {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 27", TProject.BaseGame.soundVolume);
            this.c_dialog_panel.data.dialogText.text = str;
            this.c_dialog_panel.visible = true;
            this.p1_avatar.visible = false;
            this.p2_avatar.visible = false;
            this.p3_avatar.visible = false;
            this["p" + num + "_avatar"].visible = true;
        };
        Comix2.prototype.hideDialog = function () {
            this.c_dialog_panel.visible = false;
        };
        Comix2.prototype.onClickEvent = function () {
            var _this = this;
            console.log("DIALOG CLICK " + this.act);
            if (this.allowClick == true) {
                this.game.time.events.remove(this.skipTimer);
                this.skipTimer = this.game.time.events.add(3000, function (e) { _this.onClickEvent(); });
                this.allowClick = false;
                if (this.act == 0) {
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(2, TProject.Locale.comix2_1);
                        _this.c1_p2dop.loadTexture("comix_other", "c1_p2dopa");
                        _this.c1_glaza2.visible = true;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 1) {
                    this.hideDialog();
                    this.c1_p2dop.loadTexture("comix_other", "c1_p2dop");
                    this.c1_glaza2.visible = false;
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(1, TProject.Locale.comix2_2);
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 2) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(2, TProject.Locale.comix2_3);
                        _this.c1_p2dop.loadTexture("comix_other", "c1_p2dopa");
                        _this.c1_glaza2.visible = true;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 3) {
                    this.hideDialog();
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(1, TProject.Locale.comix2_4);
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.c2_glass.visible = true;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 4) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.c2_glass.visible = false;
                    this.game.time.events.add(300, function (e) {
                        _this.c2_p1dir.play("c2_p1dir_play", 30, false);
                        _this.game.time.events.add(800, function (e) {
                            _this.showDialog(1, TProject.Locale.comix2_5);
                            var tween = _this.game.add.tween(_this.c1_glaza2).to({ x: 88, y: 45 }, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                            _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                            _this.c1_cams.play("cams_off", 30, true);
                            _this.allowClick = true;
                        });
                    });
                }
                if (this.act == 5) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this._manager.fadeSprite.goFade(function (e) {
                        if (TProject.BaseGame.isSoundOn)
                            TProject.SoundMixer.play("sound 2", TProject.BaseGame.musicVolume, true);
                        _this._manager.currentLevel = 12;
                        _this._manager.restartLevel();
                        _this._manager.comixSprite.removeComix();
                    }, 500, 500);
                }
                this.act += 1;
            }
        };
        return Comix2;
    }(Phaser.Sprite));
    TProject.Comix2 = Comix2;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Comix3 = (function (_super) {
        __extends(Comix3, _super);
        function Comix3(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this.act = 0;
            _this.allowClick = true;
            _this._manager = manager;
            _this.anchor.set(0.0, 0.0);
            _this.bg = _this.game.add.sprite(0, 0, "c1_bg");
            _this.bg.anchor.set(0, 0);
            _this.addChild(_this.bg);
            _this.c1_button = _this.game.add.sprite(297, 284, "comix_other", "c1_button");
            _this.c1_button.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_button);
            _this.c1_cams = _this.game.add.sprite(546, 112, "comix_atlas", "comix_cams0001");
            _this.c1_cams.animations.add("cams_2", Phaser.Animation.generateFrameNames("comix_cams", 5, 7, "", 4));
            _this.c1_cams.play("cams_2", 30, true);
            _this.c1_cams.anchor.set(0.5, 0.5);
            _this.bg.addChild(_this.c1_cams);
            _this.c2_robot = _this.game.add.sprite(590, 430, "comix_atlas", "comix_robot0001");
            _this.c2_robot.animations.add("robot_anim", Phaser.Animation.generateFrameNames("comix_robot", 1, 60, "", 4));
            _this.c2_robot.anchor.set(0.5, 0.5);
            _this.bg.addChild(_this.c2_robot);
            _this.c1_p1 = _this.game.add.sprite(108, 64, "comix_other", "c1_p1dop");
            _this.c1_p1.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p1);
            _this.c1_p2dop = _this.game.add.sprite(633, 110, "comix_other", "c1_p2dop");
            _this.c1_p2dop.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p2dop);
            _this.c1_glaza2 = _this.game.add.sprite(88, 53, "comix_other", "c1_glaza2");
            _this.c1_glaza2.anchor.set(0.5, 0.5);
            _this.c1_p2dop.addChild(_this.c1_glaza2);
            _this.c1_glaza2.visible = false;
            _this.c1_glaza3 = _this.game.add.sprite(100, 120, "comix_other", "c1_glaza3");
            _this.c1_glaza3.anchor.set(0.5, 0.5);
            _this.c1_p1.addChild(_this.c1_glaza3);
            _this.c1_p1_hand = _this.game.add.sprite(34, 190, "comix_other", "c1_p1_hand");
            _this.c1_p1_hand.anchor.set(0, 0);
            _this.c1_p1_hand.pivot.set(11, 8);
            _this.c1_p1.addChild(_this.c1_p1_hand);
            _this.c2_glass = _this.game.add.sprite(46, 91, "comix_other", "c2_glass");
            _this.c2_glass.anchor.set(0, 0);
            _this.c1_p1.addChild(_this.c2_glass);
            _this.c2_glass.visible = false;
            _this.c_dialog_panel = _this.game.add.sprite(460, 560, "comix_other", "c_dialog_panel");
            _this.c_dialog_panel.anchor.set(0.5, 0.5);
            _this.addChild(_this.c_dialog_panel);
            var myText = _this.game.add.text(-315, -35, "text", { font: "24px HelveticaRounded-Black", fill: "#666666", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.align = "center";
            myText.text = TProject.Locale.comix1_1;
            myText.anchor.set(0, 0);
            myText.wordWrap = true;
            myText.wordWrapWidth = 740;
            myText.setTextBounds(0, 0, 740, 70);
            _this.c_dialog_panel.addChild(myText);
            _this.c_dialog_panel.data.dialogText = myText;
            _this.p1_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p1_avatar");
            _this.p1_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p1_avatar);
            _this.p2_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p2_avatar");
            _this.p2_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p2_avatar);
            _this.p3_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p3_avatar");
            _this.p3_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p3_avatar);
            _this.skipBtn = _this.game.add.button(885, 35, "menu_atlas", function (e) { _this.skipBtnClick(); }, _this, "skipBtn", "skipBtn", "skipBtn");
            _this.skipBtn.anchor.set(0.5, 0.5);
            _this.addChild(_this.skipBtn);
            _this.hideDialog();
            _this.inputEnabled = true;
            _this.events.onInputDown.add(function (e) { _this.onClickEvent(); });
            _this.skipTimer = _this.game.time.events.add(3000, function (e) { _this.onClickEvent(); });
            return _this;
        }
        Comix3.prototype.skipBtnClick = function () {
            var _this = this;
            this.hideDialog();
            this.c1_p2dop.loadTexture("comix_other", "c1_p2dop");
            this.c1_glaza2.visible = false;
            this._manager.fadeSprite.goFade(function (e) {
                if (TProject.BaseGame.isSoundOn)
                    TProject.SoundMixer.play("sound 2", TProject.BaseGame.musicVolume, true);
                _this._manager.currentLevel = 26;
                _this._manager.restartLevel();
                _this._manager.comixSprite.removeComix();
            }, 500, 500);
        };
        Comix3.prototype.showDialog = function (num, str) {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 27", TProject.BaseGame.soundVolume);
            this.c_dialog_panel.data.dialogText.text = str;
            this.c_dialog_panel.visible = true;
            this.p1_avatar.visible = false;
            this.p2_avatar.visible = false;
            this.p3_avatar.visible = false;
            this["p" + num + "_avatar"].visible = true;
        };
        Comix3.prototype.hideDialog = function () {
            this.c_dialog_panel.visible = false;
        };
        Comix3.prototype.onClickEvent = function () {
            var _this = this;
            console.log("DIALOG CLICK " + this.act);
            if (this.allowClick == true) {
                this.game.time.events.remove(this.skipTimer);
                this.skipTimer = this.game.time.events.add(3000, function (e) { _this.onClickEvent(); });
                this.allowClick = false;
                if (this.act == 0) {
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(2, TProject.Locale.comix3_1);
                        _this.c1_p2dop.loadTexture("comix_other", "c1_p2dopa");
                        _this.c1_glaza2.visible = true;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 1) {
                    this.hideDialog();
                    this.c1_p2dop.loadTexture("comix_other", "c1_p2dop");
                    this.c1_glaza2.visible = false;
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(1, TProject.Locale.comix3_2);
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.c2_glass.visible = true;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 2) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.c2_glass.visible = false;
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(2, TProject.Locale.comix3_3);
                        _this.c1_p2dop.loadTexture("comix_other", "c1_p2dopa");
                        _this.c1_glaza2.visible = true;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 3) {
                    this.hideDialog();
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(1, TProject.Locale.comix3_4);
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.c2_glass.visible = true;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 4) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.game.time.events.add(300, function (e) {
                        var tween = _this.game.add.tween(_this.c1_p1_hand).to({ x: 45, y: 188 }, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                        var tween = _this.game.add.tween(_this.c1_glaza2).to({ x: 88, y: 58 }, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                        _this.game.time.events.add(200, function (e) {
                            _this.c1_p1_hand.loadTexture("comix_other", "c1_p1_hand2");
                            _this.c2_glass.visible = false;
                            _this.c2_robot.play("robot_anim", 30, false);
                            _this.allowClick = true;
                        });
                    });
                }
                if (this.act == 5) {
                    this.hideDialog();
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(1, TProject.Locale.comix3_5);
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.allowClick = true;
                    });
                }
                if (this.act == 6) {
                    this.hideDialog();
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.c1_p2dop.loadTexture("comix_other", "c1_p2dop");
                    this.c1_glaza2.visible = false;
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(2, TProject.Locale.comix3_6);
                        _this.c1_p2dop.loadTexture("comix_other", "c1_p2dopa");
                        _this.c1_glaza2.visible = true;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 7) {
                    this.hideDialog();
                    this.c1_p2dop.loadTexture("comix_other", "c1_p2dop");
                    this.c1_glaza2.visible = false;
                    this._manager.fadeSprite.goFade(function (e) {
                        if (TProject.BaseGame.isSoundOn)
                            TProject.SoundMixer.play("sound 2", TProject.BaseGame.musicVolume, true);
                        _this._manager.currentLevel = 26;
                        _this._manager.restartLevel();
                        _this._manager.comixSprite.removeComix();
                    }, 500, 500);
                }
                this.act += 1;
            }
        };
        return Comix3;
    }(Phaser.Sprite));
    TProject.Comix3 = Comix3;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Comix4 = (function (_super) {
        __extends(Comix4, _super);
        function Comix4(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this.shake = false;
            _this.act = 0;
            _this.allowClick = true;
            _this._manager = manager;
            _this.anchor.set(0.0, 0.0);
            _this.bg = _this.game.add.sprite(0, 0, "c1_bg");
            _this.bg.anchor.set(0, 0);
            _this.addChild(_this.bg);
            _this.c4_bg = _this.game.add.sprite(0, 0, "c4_bg");
            _this.c4_bg.anchor.set(0, 0);
            _this.addChild(_this.c4_bg);
            _this.c4_bg.visible = false;
            _this.c4_shadow2 = _this.game.add.sprite(426, 404, 'c4_shadow2');
            _this.c4_shadow2.anchor.set(0.5, 0.5);
            _this.c4_bg.addChild(_this.c4_shadow2);
            _this.c4_shadow1 = _this.game.add.sprite(428, 543, 'c4_shadow1');
            _this.c4_shadow1.anchor.set(0.5, 0.5);
            _this.c4_bg.addChild(_this.c4_shadow1);
            _this.c4_shadow1.visible = false;
            _this.bmd = game.make.bitmapData(920, 620);
            _this.bmd.alphaMask(_this.c4_shadow1, 'c4_bg_mask');
            _this.shadow = game.add.sprite(0, 0, _this.bmd);
            _this.shadow.anchor.set(0, 0);
            _this.c4_bg.addChild(_this.shadow);
            _this.shadow.visible = false;
            _this.c4_glaz1 = _this.game.add.sprite(404, 212, "comix_other", "c4_glaz");
            _this.c4_glaz1.anchor.set(0.5, 0.5);
            _this.c4_bg.addChild(_this.c4_glaz1);
            _this.c4_glaz2 = _this.game.add.sprite(509, 212, "comix_other", "c4_glaz");
            _this.c4_glaz2.anchor.set(0.5, 0.5);
            _this.c4_bg.addChild(_this.c4_glaz2);
            _this.c1_cams = _this.game.add.sprite(546, 112, "comix_atlas", "comix_cams0001");
            _this.c1_cams.animations.add("cams_3", Phaser.Animation.generateFrameNames("comix_cams", 8, 10, "", 4));
            _this.c1_cams.play("cams_3", 30, true);
            _this.c1_cams.anchor.set(0.5, 0.5);
            _this.bg.addChild(_this.c1_cams);
            _this.c1_p1 = _this.game.add.sprite(108, 64, "comix_other", "c1_p1dop");
            _this.c1_p1.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p1);
            _this.c4_tort = _this.game.add.sprite(69, 160, "comix_other", "c4_tort");
            _this.c4_tort.anchor.set(0, 0);
            _this.c4_tort.pivot.set(11, 8);
            _this.c1_p1.addChild(_this.c4_tort);
            _this.c1_p2dop = _this.game.add.sprite(584, 110, "comix_other", "c1_p2dopa");
            _this.c1_p2dop.anchor.set(0, 0);
            _this.bg.addChild(_this.c1_p2dop);
            _this.c1_glaza2 = _this.game.add.sprite(88, 45, "comix_other", "c1_glaza2");
            _this.c1_glaza2.anchor.set(0.5, 0.5);
            _this.c1_p2dop.addChild(_this.c1_glaza2);
            _this.c1_glaza2.visible = true;
            _this.c1_glaza3 = _this.game.add.sprite(101, 114, "comix_other", "c1_glaza3");
            _this.c1_glaza3.anchor.set(0.5, 0.5);
            _this.c1_p1.addChild(_this.c1_glaza3);
            _this.c1_p1_hand = _this.game.add.sprite(34, 190, "comix_other", "c1_p1_hand");
            _this.c1_p1_hand.anchor.set(0, 0);
            _this.c1_p1_hand.pivot.set(11, 8);
            _this.c1_p1.addChild(_this.c1_p1_hand);
            _this.c4_bg2 = _this.game.add.sprite(0, 0, "c4_bg2");
            _this.c4_bg2.anchor.set(0, 0);
            _this.addChild(_this.c4_bg2);
            _this.c4_bg2.visible = false;
            _this.c4_p5 = _this.game.add.sprite(460, 310, "comix_other", "c4_p5");
            _this.c4_p5.anchor.set(0.5, 0.5);
            _this.c4_p5.pivot.set(11, 8);
            _this.c4_bg2.addChild(_this.c4_p5);
            _this.startX = _this.c4_p5.x;
            _this.startY = _this.c4_p5.y;
            _this.c_dialog_panel = _this.game.add.sprite(460, 560, "comix_other", "c_dialog_panel");
            _this.c_dialog_panel.anchor.set(0.5, 0.5);
            _this.addChild(_this.c_dialog_panel);
            var myText = _this.game.add.text(-315, -35, "text", { font: "24px HelveticaRounded-Black", fill: "#666666", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.align = "center";
            myText.text = TProject.Locale.comix1_1;
            myText.anchor.set(0, 0);
            myText.wordWrap = true;
            myText.wordWrapWidth = 740;
            myText.setTextBounds(0, 0, 740, 70);
            _this.c_dialog_panel.addChild(myText);
            _this.c_dialog_panel.data.dialogText = myText;
            _this.p1_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p1_avatar");
            _this.p1_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p1_avatar);
            _this.p2_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p2_avatar");
            _this.p2_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p2_avatar);
            _this.p3_avatar = _this.game.add.sprite(-430, -70, "comix_other", "p3_avatar");
            _this.p3_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p3_avatar);
            _this.skipBtn = _this.game.add.button(885, 35, "menu_atlas", function (e) { _this.skipBtnClick(); }, _this, "skipBtn", "skipBtn", "skipBtn");
            _this.skipBtn.anchor.set(0.5, 0.5);
            _this.addChild(_this.skipBtn);
            _this.hideDialog();
            _this.inputEnabled = true;
            _this.events.onInputDown.add(function (e) { _this.onClickEvent(); });
            _this.skipTimer = _this.game.time.events.add(3000, function (e) { _this.onClickEvent(); });
            return _this;
        }
        Comix4.prototype.skipBtnClick = function () {
            var _this = this;
            this.hideDialog();
            this._manager.fadeSprite.goFade(function (e) {
                if (TProject.BaseGame.isSoundOn)
                    TProject.SoundMixer.play("sound 1", TProject.BaseGame.musicVolume, true);
                _this._manager.group4.visible = true;
                _this._manager.mainMenuSprite.createOrUpdateSelectButtons();
                _this._manager.mainMenuSprite.speedHome();
                _this._manager.comixSprite.removeComix();
            }, 500, 500);
        };
        Comix4.prototype.update = function () {
            if (this.c4_bg.visible == true) {
                this.bmd.alphaMask(this.c4_shadow1, 'c4_bg_mask');
                this.shadow.loadTexture(this.bmd);
            }
            if (this.c4_p5 != undefined && this.c4_p5.visible == true && this.shake == true) {
                this.c4_p5.x = this.startX + this.game.rnd.integerInRange(-15, 15);
                this.c4_p5.y = this.startY + this.game.rnd.integerInRange(-15, 15);
            }
        };
        Comix4.prototype.showDialog = function (num, str) {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 27", TProject.BaseGame.soundVolume);
            this.c_dialog_panel.data.dialogText.text = str;
            this.c_dialog_panel.visible = true;
            this.p1_avatar.visible = false;
            this.p2_avatar.visible = false;
            this.p3_avatar.visible = false;
            this["p" + num + "_avatar"].visible = true;
        };
        Comix4.prototype.hideDialog = function () {
            this.c_dialog_panel.visible = false;
        };
        Comix4.prototype.onClickEvent = function () {
            var _this = this;
            this.shadow.loadTexture(this.bmd);
            console.log("DIALOG CLICK " + this.act);
            if (this.allowClick == true) {
                this.game.time.events.remove(this.skipTimer);
                this.skipTimer = this.game.time.events.add(3000, function (e) { _this.onClickEvent(); });
                this.allowClick = false;
                if (this.act == 0) {
                    this.game.time.events.add(300, function (e) {
                        _this.showDialog(2, TProject.Locale.comix4_1);
                        _this.allowClick = true;
                    });
                }
                if (this.act == 1) {
                    var tween = this.game.add.tween(this.c1_glaza2).to({ x: 88, y: 52 }, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
                    this.hideDialog();
                    this.game.time.events.add(600, function (e) {
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.c1_p2dop.loadTexture("comix_other", "c1_p2dop");
                        _this.showDialog(1, TProject.Locale.comix4_2);
                        _this.c1_glaza2.visible = false;
                        _this.allowClick = true;
                    });
                }
                if (this.act == 2) {
                    var tween = this.game.add.tween(this.c1_glaza3).to({ x: 101, y: 118 }, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
                    this.hideDialog();
                    this.game.time.events.add(600, function (e) {
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                        _this.c1_p2dop.loadTexture("comix_other", "c1_p2dopb");
                        _this.showDialog(2, TProject.Locale.comix4_3);
                        _this.allowClick = true;
                    });
                }
                if (this.act == 3) {
                    this.c1_p2dop.loadTexture("comix_other", "c1_p2dop");
                    this.hideDialog();
                    this.game.time.events.add(600, function (e) {
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.showDialog(2, TProject.Locale.comix4_4);
                        _this.allowClick = true;
                    });
                }
                if (this.act == 4) {
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.hideDialog();
                    this.game.time.events.add(300, function (e) {
                        _this.c1_p1.loadTexture("comix_other", "c1_p1dopa");
                        _this.showDialog(2, TProject.Locale.comix4_5);
                        _this.allowClick = true;
                    });
                }
                if (this.act == 5) {
                    this.c1_p1.loadTexture("comix_other", "c1_p1dop");
                    this.hideDialog();
                    this.game.time.events.add(300, function (e) {
                        _this.c4_bg.visible = true;
                        _this.shadow.visible = true;
                        var tween = _this.game.add.tween(_this.c4_glaz1.scale).to({ x: 0.3, y: 0.3 }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
                        var tween = _this.game.add.tween(_this.c4_glaz2.scale).to({ x: 0.3, y: 0.3 }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
                        var tween = _this.game.add.tween(_this.c4_glaz1).to({ x: 404, y: 210 }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
                        var tween = _this.game.add.tween(_this.c4_glaz2).to({ x: 509, y: 210 }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
                        var tween = _this.game.add.tween(_this.c4_shadow1).to({ x: 428, y: 295 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                        var tween = _this.game.add.tween(_this.c4_shadow2).to({ x: 425, y: 180 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                    });
                    this.game.time.events.add(2000, function (e) {
                        console.log("BAM");
                        _this.c4_bg.visible = false;
                        _this.c4_bg2.visible = true;
                    });
                    this.game.time.events.add(3500, function (e) {
                        _this.c4_p5.loadTexture("comix_other", "c4_p5a");
                        _this.shake = true;
                        _this.showDialog(2, TProject.Locale.comix4_6);
                    });
                    this.game.time.events.add(6000, function (e) {
                        _this._manager.fadeSprite.goFade(function (e) {
                            if (TProject.BaseGame.isSoundOn)
                                TProject.SoundMixer.play("sound 1", TProject.BaseGame.musicVolume, true);
                            _this._manager.group4.visible = true;
                            _this._manager.mainMenuSprite.createOrUpdateSelectButtons();
                            _this._manager.mainMenuSprite.speedHome();
                            _this._manager.comixSprite.removeComix();
                        }, 500, 500);
                    });
                }
                this.act += 1;
            }
        };
        return Comix4;
    }(Phaser.Sprite));
    TProject.Comix4 = Comix4;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var ComixClass = (function (_super) {
        __extends(ComixClass, _super);
        function ComixClass(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this._manager = manager;
            _this.anchor.set(0.0, 0.0);
            _this.container = _this.game.add.group();
            return _this;
        }
        ComixClass.prototype.update = function () {
            if (this.comixSpr != undefined) {
                this.comixSpr.update();
            }
        };
        ComixClass.prototype.showComix = function (num) {
            if (num == 1) {
                this.comixSpr = new TProject.Comix1(this.game, 0, 0, this._manager);
                this.addChild(this.comixSpr);
                console.log("START COMIX " + num);
            }
            else if (num == 2) {
                this.comixSpr = new TProject.Comix2(this.game, 0, 0, this._manager);
                this.addChild(this.comixSpr);
                console.log("START COMIX " + num);
            }
            else if (num == 3) {
                this.comixSpr = new TProject.Comix3(this.game, 0, 0, this._manager);
                this.addChild(this.comixSpr);
                console.log("START COMIX " + num);
            }
            else if (num == 4) {
                this.comixSpr = new TProject.Comix4(this.game, 0, 0, this._manager);
                this.addChild(this.comixSpr);
                console.log("START COMIX " + num);
            }
        };
        ComixClass.prototype.removeComix = function () {
            this.comixSpr.destroy();
        };
        return ComixClass;
    }(Phaser.Sprite));
    TProject.ComixClass = ComixClass;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Dust = (function () {
        function Dust(game, manager, d) {
            this.circularIndex = 0;
            this.enableUpdate = false;
            this.emitB = false;
            this.display = d;
            this.hasListener = false;
            this.poolArray = new Array(Dust.POOL_SIZE);
            for (var i = 0; i < Dust.POOL_SIZE; i++) {
                this.poolArray[i] = new TProject.DustParticle(game, manager);
            }
            manager.arrayParticles.push(this);
        }
        Dust.prototype.emit = function (px, py) {
            this.emitB = true;
            this.px = px;
            this.py = py;
            if (!this.hasListener) {
                this.enableUpdate = true;
                this.hasListener = true;
            }
        };
        Dust.prototype.updateDa = function () {
            var anyActive = false;
            if (this.enableUpdate) {
                if (this.emitB) {
                    this.circularIndex = (this.circularIndex + 1) % Dust.POOL_SIZE;
                    this.poolArray[this.circularIndex].initDa();
                    this.display.addChild(this.poolArray[this.circularIndex]);
                    this.poolArray[this.circularIndex].active = true;
                    this.poolArray[this.circularIndex].x = this.px;
                    this.poolArray[this.circularIndex].y = this.py;
                    this.emitB = false;
                }
                for (var i = 0; i < Dust.POOL_SIZE; i++) {
                    if (this.poolArray[i].active) {
                        this.poolArray[i].updateDa();
                        anyActive = true;
                    }
                }
                if (!anyActive) {
                    this.enableUpdate = false;
                    this.hasListener = false;
                }
            }
        };
        Dust.POOL_SIZE = 15;
        return Dust;
    }());
    TProject.Dust = Dust;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var DustParticle = (function (_super) {
        __extends(DustParticle, _super);
        function DustParticle(game, manager) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this._manager = manager;
            _this.speed = 0;
            _this.active = false;
            _this.createPart();
            return _this;
        }
        DustParticle.prototype.createPart = function () {
            this.graphics = this.game.add.graphics(0, 0);
            this.graphics.clear();
            this.graphics.beginFill(DustParticle.COLOR);
            this.graphics.drawCircle(-DustParticle.FINAL_RADIOUS / 2, -DustParticle.FINAL_RADIOUS / 2, DustParticle.FINAL_RADIOUS);
            this.graphics.endFill();
            this.addChild(this.graphics);
        };
        DustParticle.prototype.updateDa = function () {
            this.y -= this.speed;
            this.x += this.xVar * this.speed;
            this.speed *= DustParticle.ACCELERATION;
            this.alpha = DustParticle.INITIAL_ALPHA - (this.speed / DustParticle.MAX_SPEED) * DustParticle.INITIAL_ALPHA;
            this.scale.x = this.scale.y = DustParticle.INITIAL_SCALE + (this.speed / DustParticle.MAX_SPEED) * (1 - DustParticle.INITIAL_SCALE);
            if (this.speed > DustParticle.MAX_SPEED) {
                this.active = false;
                this.parent.removeChild(this);
            }
        };
        DustParticle.prototype.initDa = function () {
            if (this.graphics == null) {
            }
            this.xVar = Math.random() * 2 - 1;
            this.speed = DustParticle.MAX_SPEED * DustParticle.INITIAL_SPEED + (Math.random() * (1 - DustParticle.INITIAL_SPEED)) * DustParticle.MAX_SPEED;
        };
        DustParticle.MAX_SPEED = .5;
        DustParticle.ACCELERATION = 1.03;
        DustParticle.INITIAL_ALPHA = .2;
        DustParticle.INITIAL_SCALE = 0.1;
        DustParticle.INITIAL_SPEED = 0.01;
        DustParticle.FINAL_RADIOUS = 16;
        DustParticle.COLOR = 0xFFFFFF;
        return DustParticle;
    }(Phaser.Graphics));
    TProject.DustParticle = DustParticle;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var EditorClass = (function (_super) {
        __extends(EditorClass, _super);
        function EditorClass(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this.markTextStyle = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            _this._manager = manager;
            return _this;
        }
        EditorClass.prototype.addWall = function (x, y, type, noise, letterType) {
            if (noise === void 0) { noise = false; }
            if (letterType === void 0) { letterType = ""; }
            if (type == "solidinmovil") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_solid");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblockx12") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_x12");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblockx4") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_x4");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblockx2") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_x2");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblockx3") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_x3");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblockx6") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_x6");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblockx8") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_x8");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblockx24") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_x24");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblockx36") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_x36");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblocky2") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_y2");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblocky3") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_y3");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblocky4") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_y4");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblocky5") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_y5");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblocky6") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_y6");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "wallblocky8") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_y8");
                wall.anchor.set(0.0, 1.0);
            }
            if (type == "solidinmovilA1" || type == "solidinmovilA" || type == "solidinmovilB" || type == "solidinmovilD" || type == "solidinmovilE" || type == "solidinmovilC") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_solid");
                wall.anchor.set(0.0, 1.0);
                var noiseClip = this.game.add.sprite(0, 0, "blocks", "solid_noise0001");
                noiseClip.animations.add("noise_clip", Phaser.Animation.generateFrameNames("solid_noise", 1, 3, "", 4));
                noiseClip.play("noise_clip", 30, true);
                noiseClip.anchor.set(0, 1.0);
                wall.addChild(noiseClip);
            }
            if (type == "solidinmovilE2x2") {
                var wall = this.game.add.sprite(x, y, "blocks", "wall_2x2");
                wall.anchor.set(0.0, 1.0);
                var noiseClip = this.game.add.sprite(0, 0, "blocks", "wall_2x2_noise0001");
                noiseClip.animations.add("noise_clip", Phaser.Animation.generateFrameNames("wall_2x2_noise", 1, 3, "", 4));
                noiseClip.play("noise_clip", 30, true);
                noiseClip.anchor.set(0, 1.0);
                wall.addChild(noiseClip);
            }
            wall.data.onNoise = noise;
            if (letterType != "") {
                wall.data.myName = type;
                wall.data.letterType = letterType;
                if (noiseClip != undefined) {
                    wall.data.noiseClip = noiseClip;
                }
                this.setArray(wall, letterType);
                this._manager.setNoise(noise, wall);
            }
            var colider = this.game.add.sprite(0, 0, "darwin", "colider");
            colider.anchor.set(wall.anchor.x, wall.anchor.y);
            colider.width = wall.width;
            colider.height = wall.height;
            colider.alpha = 0;
            wall.addChild(colider);
            wall.data.colider = colider;
            this._manager.wallGroup.addChild(wall);
        };
        EditorClass.prototype.addSpike = function (x, y, type, noise, rot, letterType) {
            if (rot === void 0) { rot = 0; }
            if (letterType === void 0) { letterType = ""; }
            if (type == "spike") {
                var spike = this.game.add.sprite(x, y, "blocks", "spike");
                spike.anchor.set(0.0, 1.0);
            }
            if (type == "spikeX3") {
                var spike = this.game.add.sprite(x, y, "blocks", "spike_x3");
                spike.anchor.set(0.0, 1.0);
            }
            if (type == "spikeX4") {
                var spike = this.game.add.sprite(x, y, "blocks", "spike_x4");
                spike.anchor.set(0.0, 1.0);
            }
            if (type == "spikeX8") {
                var spike = this.game.add.sprite(x, y, "blocks", "spike_x8");
                spike.anchor.set(0.0, 1.0);
            }
            if (type == "spikeE" || type == "spikeD" || type == "spikeA" || type == "spikeB" || type == "spikeC") {
                var spike = this.game.add.sprite(x, y, "blocks", "spike");
                spike.anchor.set(0.0, 1.0);
                var noiseClip = this.game.add.sprite(0, 0, "blocks", "spike_noise0001");
                noiseClip.animations.add("noise_clip", Phaser.Animation.generateFrameNames("spike_noise", 1, 3, "", 4));
                noiseClip.play("noise_clip", 30, true);
                noiseClip.anchor.set(0, 1.0);
                spike.addChild(noiseClip);
            }
            spike.data.onNoise = noise;
            if (letterType != "") {
                spike.data.myName = type;
                spike.data.letterType = letterType;
                if (noiseClip != undefined) {
                    spike.data.noiseClip = noiseClip;
                }
                this.setArray(spike, letterType);
                this._manager.setNoise(noise, spike);
            }
            spike.angle = rot;
            var colider = this.game.add.sprite(0, 0, "darwin", "colider");
            colider.anchor.set(spike.anchor.x, spike.anchor.y);
            colider.width = spike.width - 10;
            colider.height = spike.height;
            colider.x = 5;
            colider.alpha = 0;
            spike.addChild(colider);
            spike.data.colider = colider;
            this._manager.arraySpike.addChild(spike);
        };
        EditorClass.prototype.addTv = function (x, y, type, noise, letterType) {
            if (letterType === void 0) { letterType = ""; }
            if (type == "tvNoiseA" || type == "tvNoiseB") {
                var tv = this.game.add.sprite(x, y, "blocks", "tv");
                tv.anchor.set(0.0, 1.0);
                var noiseClip = this.game.add.sprite(0, 0, "blocks", "tv_noise0001");
                noiseClip.animations.add("noise_clip", Phaser.Animation.generateFrameNames("tv_noise", 1, 3, "", 4));
                noiseClip.play("noise_clip", 30, true);
                noiseClip.anchor.set(0.5, 0.5);
                noiseClip.x = 150;
                noiseClip.y = -100;
                noiseClip.alpha = 0.4;
                tv.addChild(noiseClip);
            }
            tv.data.onNoise = noise;
            if (letterType != "") {
                tv.data.myName = type;
                tv.data.letterType = letterType;
                if (noiseClip != undefined) {
                    tv.data.noiseClip = noiseClip;
                }
                this.setArray(tv, letterType);
                this._manager.setNoise(noise, tv);
            }
            var colider = this.game.add.sprite(0, 0, "darwin", "colider");
            colider.anchor.set(0, 1);
            colider.width = 250;
            colider.height = 200;
            colider.x = 25;
            colider.alpha = 0;
            tv.addChild(colider);
            var coliderLeft = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            coliderLeft.anchor.set(0, 1);
            coliderLeft.width = 10;
            coliderLeft.height = 150;
            coliderLeft.x = 25;
            coliderLeft.y = -25;
            coliderLeft.alpha = 0;
            tv.addChild(coliderLeft);
            var coliderRight = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            coliderRight.anchor.set(0, 1);
            coliderRight.width = 10;
            coliderRight.height = 150;
            coliderRight.x = 265;
            coliderRight.y = -25;
            coliderRight.alpha = 0;
            tv.addChild(coliderRight);
            var coliderBot = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            coliderBot.anchor.set(0, 1);
            coliderBot.width = 250;
            coliderBot.height = 10;
            coliderBot.x = 25;
            coliderBot.y = -15;
            coliderBot.alpha = 0;
            tv.addChild(coliderBot);
            var coliderTop = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            coliderTop.anchor.set(0, 1);
            coliderTop.width = 250;
            coliderTop.height = 10;
            coliderTop.x = 25;
            coliderTop.y = -175;
            coliderTop.alpha = 0;
            tv.addChild(coliderTop);
            tv.data.colider = colider;
            tv.data.coliderLeft = coliderLeft;
            tv.data.coliderRight = coliderRight;
            tv.data.coliderBot = coliderBot;
            tv.data.coliderTop = coliderTop;
            this._manager.arrayTvNoise.addChild(tv);
        };
        EditorClass.prototype.addDejavu = function (x, y, type, noise) {
            if (type == "dejavu") {
                var dejavu = this.game.add.sprite(x, y);
                dejavu.anchor.set(0.0, 1.0);
            }
            dejavu.data.myName = type;
            var colider = this.game.add.sprite(0, 0, "darwin", "colider");
            colider.anchor.set(0, 1);
            colider.width = 250;
            colider.height = 150;
            colider.x = 25;
            colider.alpha = 0;
            dejavu.addChild(colider);
            var respawn = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            respawn.anchor.set(0, 1);
            respawn.width = 10;
            respawn.height = 200;
            respawn.x = -15;
            respawn.y = 25;
            respawn.alpha = 0;
            dejavu.addChild(respawn);
            var vortex = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            vortex.anchor.set(0, 1);
            vortex.width = 10;
            vortex.height = 200;
            vortex.x = 305;
            vortex.y = 25;
            vortex.alpha = 0;
            dejavu.addChild(vortex);
            var coliderBot = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            coliderBot.anchor.set(0, 1);
            coliderBot.width = 300;
            coliderBot.height = 10;
            coliderBot.x = 0;
            coliderBot.y = 50;
            coliderBot.alpha = 0;
            dejavu.addChild(coliderBot);
            var coliderTop = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            coliderTop.anchor.set(0, 1);
            coliderTop.width = 300;
            coliderTop.height = 10;
            coliderTop.x = 0;
            coliderTop.y = -190;
            coliderTop.alpha = 0;
            dejavu.addChild(coliderTop);
            dejavu.data.colider = colider;
            dejavu.data.respawn = respawn;
            dejavu.data.vortex = vortex;
            dejavu.data.coliderBot = coliderBot;
            dejavu.data.coliderTop = coliderTop;
            dejavu.data.available = false;
            this._manager.arrayDejavu.addChild(dejavu);
        };
        EditorClass.prototype.addButton = function (x, y, type, noise, letterType) {
            if (letterType === void 0) { letterType = ""; }
            var button = this.game.add.sprite(x, y, "blocks", "button0001");
            button.anchor.set(0.0, 1.0);
            button.data.letterType = letterType;
            var colider = this.game.add.sprite(0, 0, "darwin", "colider");
            colider.anchor.set(button.anchor.x, button.anchor.y);
            colider.width = 20;
            colider.height = 10;
            colider.x = 2.5;
            colider.alpha = 0;
            button.addChild(colider);
            button.data.used = false;
            button.data.colider = colider;
            this._manager.arrayButton.addChild(button);
        };
        EditorClass.prototype.addCrank = function (x, y, type, noise, letterType) {
            if (letterType === void 0) { letterType = ""; }
            var crank = this.game.add.sprite(x, y, "blocks", "crank0011");
            crank.anchor.set(0.0, 1.0);
            crank.data.letterType = letterType;
            crank.animations.add("crank_on", Phaser.Animation.generateFrameNames("crank", 1, 6, "", 4));
            crank.animations.add("crank_off", Phaser.Animation.generateFrameNames("crank", 6, 11, "", 4));
            var snap = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            snap.anchor.set(0.5, 0.5);
            snap.width = 25;
            snap.height = 25;
            snap.x = 12.5;
            snap.y = -12.5;
            snap.alpha = 0;
            crank.addChild(snap);
            var colider = this.game.add.sprite(0, 0, "darwin", "colider");
            colider.anchor.set(crank.anchor.x, crank.anchor.y);
            colider.width = 10;
            colider.height = 10;
            colider.x = 7.5;
            colider.alpha = 0;
            crank.addChild(colider);
            crank.data.state = "off";
            crank.data.colider = colider;
            crank.data.snap = snap;
            this._manager.arrayCrank.addChild(crank);
        };
        EditorClass.prototype.addDecor = function (x, y, type, onNoise) {
            if (onNoise === void 0) { onNoise = false; }
            var decor = this.game.add.sprite(x, y, "blocks", type);
            decor.anchor.set(0.5, 0.5);
            this._manager.arrayDecor.addChild(decor);
        };
        EditorClass.prototype.addStar = function (x, y, type, noise, letterType) {
            if (letterType === void 0) { letterType = ""; }
            var star = this.game.add.sprite(x, y);
            star.anchor.set(0.5, 0.5);
            if (type == "star") {
                var clip = this.game.add.sprite(0, 0, "blocks", "star0001");
                clip.animations.add("star_stay", Phaser.Animation.generateFrameNames("star", 1, 1, "", 4));
                clip.animations.add("star_play", Phaser.Animation.generateFrameNames("star", 2, 31, "", 4));
                clip.animations.add("star_hit", Phaser.Animation.generateFrameNames("star", 32, 46, "", 4));
                clip.play("star_play", 30, true);
                clip.anchor.set(0.5, 0.5);
                star.addChild(clip);
            }
            if (type == "starE" || type == "starD" || type == "starB" || type == "starC" || type == "starF" || type == "starG" || type == "starA") {
                var clip = this.game.add.sprite(0, 0, "blocks", "star0001");
                clip.animations.add("star_stay", Phaser.Animation.generateFrameNames("star", 1, 1, "", 4));
                clip.animations.add("star_play", Phaser.Animation.generateFrameNames("star", 2, 31, "", 4));
                clip.animations.add("star_hit", Phaser.Animation.generateFrameNames("star", 32, 46, "", 4));
                clip.play("star_play", 30, true);
                clip.anchor.set(0.5, 0.5);
                star.addChild(clip);
                var noiseClip = this.game.add.sprite(0, 0, "blocks", "star_noise0001");
                noiseClip.animations.add("noise_clip", Phaser.Animation.generateFrameNames("star_noise", 1, 3, "", 4));
                noiseClip.play("noise_clip", 30, true);
                noiseClip.anchor.set(0.5, 0.5);
                star.addChild(noiseClip);
            }
            star.data.clip = clip;
            star.data.used = false;
            star.data.actualAlpha = 1;
            star.data.unic = "level" + this._manager.currentLevel + "_" + this._manager.starInt;
            this._manager.starInt += 1;
            if (this._manager.localStorageGetNumber(star.data.unic) == 1) {
                star.data.clip.alpha = 0.4;
                star.data.actualAlpha = 0.4;
                this._manager.player.actualStarCollected += 1;
            }
            star.data.onNoise = noise;
            if (letterType != "") {
                star.data.myName = type;
                star.data.letterType = letterType;
                if (noiseClip != undefined) {
                    star.data.noiseClip = noiseClip;
                }
                this.setArray(star, letterType);
                this._manager.setNoise(noise, star);
            }
            var colider = this.game.add.sprite(0, 0, "darwin", "colider");
            colider.anchor.set(star.anchor.x, star.anchor.y);
            colider.width = 5;
            colider.height = 5;
            colider.alpha = 0;
            star.addChild(colider);
            var snap = this.game.add.sprite(0, 0, "darwin", "colider");
            snap.anchor.set(star.anchor.x, star.anchor.y);
            snap.width = 25;
            snap.height = 25;
            snap.alpha = 0;
            star.addChild(snap);
            star.data.colider = colider;
            star.data.snap = snap;
            this._manager.arrayStar.addChild(star);
            console.log(star.data.unic + ", " + this._manager.localStorageGetNumber(star.data.unic));
        };
        EditorClass.prototype.addEnemy = function (x, y, type, noise, letterType) {
            if (letterType === void 0) { letterType = ""; }
            var enemy = this.game.add.sprite(x, y);
            enemy.anchor.set(0, 1);
            if (type == "enemy") {
                var clip = this.game.add.sprite(x, y, "blocks", "enemy0001");
                clip.animations.add("enemy_stay", Phaser.Animation.generateFrameNames("enemy", 1, 1, "", 4));
                clip.animations.add("enemy_play", Phaser.Animation.generateFrameNames("enemy", 1, 20, "", 4));
                clip.play("enemy_play", 30, true);
                clip.anchor.set(0.5, 1);
            }
            if (type == "enemyB" || type == "enemyD" || type == "enemyA") {
                var clip = this.game.add.sprite(x, y, "blocks", "enemy0001");
                clip.animations.add("enemy_stay", Phaser.Animation.generateFrameNames("enemy", 1, 1, "", 4));
                clip.animations.add("enemy_play", Phaser.Animation.generateFrameNames("enemy", 1, 20, "", 4));
                clip.play("enemy_play", 30, true);
                clip.anchor.set(0.5, 1);
                var noiseClip = this.game.add.sprite(0, 0, "blocks", "enemy_noise0001");
                noiseClip.animations.add("noise_clip", Phaser.Animation.generateFrameNames("enemy_noise", 1, 3, "", 4));
                noiseClip.play("noise_clip", 30, true);
                noiseClip.anchor.set(0.5, 1);
                clip.addChild(noiseClip);
            }
            clip.x = 12.5;
            clip.y = 0;
            enemy.addChild(clip);
            enemy.data.onNoise = noise;
            enemy.data.clip = clip;
            if (letterType != "") {
                enemy.data.myName = type;
                enemy.data.letterType = letterType;
                if (noiseClip != undefined) {
                    enemy.data.noiseClip = noiseClip;
                }
                this.setArray(enemy, letterType);
                this._manager.setNoise(noise, enemy);
            }
            var colider = this.game.add.sprite(0, 0, "darwin", "colider");
            colider.anchor.set(0, 1);
            colider.width = 25;
            colider.height = 25;
            colider.alpha = 0;
            enemy.addChild(colider);
            var coliderLeft = this.game.add.sprite(0, 0, "darwin", "colider");
            coliderLeft.anchor.set(0.5, 0.5);
            coliderLeft.width = 2;
            coliderLeft.height = 2;
            coliderLeft.x = 1;
            coliderLeft.y = -12.5;
            coliderLeft.alpha = 0;
            enemy.addChild(coliderLeft);
            var coliderRight = this.game.add.sprite(0, 0, "darwin", "colider");
            coliderRight.anchor.set(0.5, 0.5);
            coliderRight.width = 2;
            coliderRight.height = 2;
            coliderRight.x = 24;
            coliderRight.y = -12.5;
            coliderRight.alpha = 0;
            enemy.addChild(coliderRight);
            var coliderLeftFoot = this.game.add.sprite(0, 0, "darwin", "colider");
            coliderLeftFoot.anchor.set(0.5, 0.5);
            coliderLeftFoot.width = 2;
            coliderLeftFoot.height = 2;
            coliderLeftFoot.x = -1;
            coliderLeftFoot.y = 0;
            coliderLeftFoot.alpha = 0;
            enemy.addChild(coliderLeftFoot);
            var coliderRightFoot = this.game.add.sprite(0, 0, "darwin", "colider");
            coliderRightFoot.anchor.set(0.5, 0.5);
            coliderRightFoot.width = 2;
            coliderRightFoot.height = 2;
            coliderRightFoot.x = 26;
            coliderRightFoot.y = 0;
            coliderRightFoot.alpha = 0;
            enemy.addChild(coliderRightFoot);
            enemy.data.colider = colider;
            enemy.data.coliderLeft = coliderLeft;
            enemy.data.coliderRight = coliderRight;
            enemy.data.coliderLeftFoot = coliderLeftFoot;
            enemy.data.coliderRightFoot = coliderRightFoot;
            enemy.data.speedX = 50;
            enemy.data.spdX = 200;
            enemy.data.speedY = 200;
            enemy.data.spdY = 200;
            this._manager.arrayEnemy.addChild(enemy);
        };
        EditorClass.prototype.addLadder = function (x, y, type, noise, letterType) {
            if (letterType === void 0) { letterType = ""; }
            if (type == "ladderX3") {
                var ladder = this.game.add.sprite(x, y, "blocks", "ladder_x3");
                ladder.anchor.set(0.5, 1.0);
            }
            if (type == "ladderX4") {
                var ladder = this.game.add.sprite(x, y, "blocks", "ladder_x4");
                ladder.anchor.set(0.5, 1.0);
            }
            if (type == "ladderDX4") {
                var ladder = this.game.add.sprite(x, y, "blocks", "ladder_x4");
                ladder.anchor.set(0.5, 1.0);
                var noiseClip = this.game.add.sprite(0, 0, "blocks", "ladder_y4_noise0001");
                noiseClip.animations.add("noise_clip", Phaser.Animation.generateFrameNames("ladder_y4_noise", 1, 3, "", 4));
                noiseClip.play("noise_clip", 30, true);
                noiseClip.anchor.set(0.5, 1.0);
                ladder.addChild(noiseClip);
            }
            if (type == "ladderDX5") {
                var ladder = this.game.add.sprite(x, y, "blocks", "ladder_x5");
                ladder.anchor.set(0.5, 1.0);
                var noiseClip = this.game.add.sprite(0, 0, "blocks", "ladder_y5_noise0001");
                noiseClip.animations.add("noise_clip", Phaser.Animation.generateFrameNames("ladder_y5_noise", 1, 3, "", 4));
                noiseClip.play("noise_clip", 30, true);
                noiseClip.anchor.set(0.5, 1.0);
                ladder.addChild(noiseClip);
            }
            ladder.data.onNoise = noise;
            if (letterType != "") {
                ladder.data.myName = type;
                ladder.data.letterType = letterType;
                if (noiseClip != undefined) {
                    ladder.data.noiseClip = noiseClip;
                }
                this.setArray(ladder, letterType);
                this._manager.setNoise(noise, ladder);
            }
            var ladderColider = this.game.add.sprite(0, 0, "darwin", "colider");
            ladderColider.anchor.set(ladder.anchor.x, ladder.anchor.y);
            ladderColider.width = 20;
            ladderColider.height = ladder.height;
            ladderColider.alpha = 0;
            ladder.addChild(ladderColider);
            var colider = this.game.add.sprite(0, 0, "darwin", "semisolidColider");
            colider.anchor.set(0.5, 0);
            colider.width = 25;
            colider.height = 5;
            colider.y = -ladder.height;
            colider.alpha = 0;
            ladder.addChild(colider);
            var coliderBot = this.game.add.sprite(0, -5, "darwin", "semisolidColider");
            coliderBot.anchor.set(0.5, 0);
            coliderBot.width = 25;
            coliderBot.height = 5;
            coliderBot.alpha = 0;
            ladder.addChild(coliderBot);
            ladder.data.ladderColider = ladderColider;
            ladder.data.colider = colider;
            ladder.data.coliderBot = coliderBot;
            this._manager.arrayLadder.addChild(ladder);
        };
        EditorClass.prototype.addExitDoor = function (x, y, type, noise, letterType) {
            if (letterType === void 0) { letterType = ""; }
            if (type == "door") {
                var door = this.game.add.sprite(x, y, "blocks", "exitDoor");
                door.anchor.set(0, 1.0);
            }
            if (type == "exitLevelEnd") {
                var door = this.game.add.sprite(x, y, "blocks", "exitDoorEnd");
                door.anchor.set(0, 1.0);
            }
            if (type == "exitLevelE" || type == "exitLevelA" || type == "exitLevelD") {
                var door = this.game.add.sprite(x, y, "blocks", "exitDoor");
                door.anchor.set(0.0, 1.0);
                var noiseClip = this.game.add.sprite(0, 0, "blocks", "exit_noise0001");
                noiseClip.animations.add("noise_clip", Phaser.Animation.generateFrameNames("exit_noise", 1, 3, "", 4));
                noiseClip.play("noise_clip", 30, true);
                noiseClip.anchor.set(0.5, 1.0);
                noiseClip.x = 37.5;
                door.addChild(noiseClip);
            }
            door.data.onNoise = noise;
            if (letterType != "") {
                door.data.myName = type;
                door.data.letterType = letterType;
                if (noiseClip != undefined) {
                    door.data.noiseClip = noiseClip;
                }
                this.setArray(door, letterType);
                this._manager.setNoise(noise, door);
            }
            var colider = this.game.add.sprite(37.5, -12.5, "darwin", "colider");
            colider.anchor.set(0.5, 0.5);
            colider.width = 5;
            colider.height = 25;
            colider.alpha = 0;
            door.addChild(colider);
            var coliderBoxLeft = this.game.add.sprite(0, -12.5, "darwin", "colider");
            coliderBoxLeft.anchor.set(0.5, 0.5);
            coliderBoxLeft.width = 50;
            coliderBoxLeft.height = 25;
            coliderBoxLeft.alpha = 0;
            door.addChild(coliderBoxLeft);
            var coliderBoxRight = this.game.add.sprite(75, -12.5, "darwin", "colider");
            coliderBoxRight.anchor.set(0.5);
            coliderBoxRight.width = 50;
            coliderBoxRight.height = 25;
            coliderBoxRight.alpha = 0;
            door.addChild(coliderBoxRight);
            door.data.colider = colider;
            door.data.coliderBoxLeft = coliderBoxLeft;
            door.data.coliderBoxRight = coliderBoxRight;
            this._manager.exitDoorGroup.addChild(door);
            this._manager.theExit = door;
        };
        EditorClass.prototype.addExitDoorEnd = function (x, y, type) {
            var door = this.game.add.sprite(x, y);
            door.anchor.set(0, 1);
            if (type == "exitLevelEnd") {
                var clip = this.game.add.sprite(0, 0, "blocks", "exitDoorEnd");
                clip.x = 62.5;
                clip.y = 0;
                clip.anchor.set(0.5, 1.0);
                door.addChild(clip);
            }
            door.data.clip = clip;
            var colider = this.game.add.sprite(62.5, -12.5, "darwin", "colider");
            colider.anchor.set(0.5, 0.5);
            colider.width = 5;
            colider.height = 25;
            colider.alpha = 0;
            door.addChild(colider);
            var coliderBoxLeft = this.game.add.sprite(0, -12.5, "darwin", "colider");
            coliderBoxLeft.anchor.set(0.5, 0.5);
            coliderBoxLeft.width = 50;
            coliderBoxLeft.height = 25;
            coliderBoxLeft.alpha = 0;
            door.addChild(coliderBoxLeft);
            var coliderBoxRight = this.game.add.sprite(75, -12.5, "darwin", "colider");
            coliderBoxRight.anchor.set(0.5);
            coliderBoxRight.width = 50;
            coliderBoxRight.height = 25;
            coliderBoxRight.alpha = 0;
            door.addChild(coliderBoxRight);
            door.data.colider = colider;
            door.data.coliderBoxLeft = coliderBoxLeft;
            door.data.coliderBoxRight = coliderBoxRight;
            this._manager.exitDoorGroup.addChild(door);
            this._manager.theExit = door;
        };
        EditorClass.prototype.addTeleportDoor = function (x, y, type, noise) {
            var tp_door = this.game.add.sprite(x, y, "tp_door", "tp_door0001");
            tp_door.animations.add("stay_gumball", Phaser.Animation.generateFrameNames("tp_door", 1, 1, "", 4));
            tp_door.animations.add("in_gumball", Phaser.Animation.generateFrameNames("tp_door", 2, 11, "", 4));
            tp_door.animations.add("out_gumball", Phaser.Animation.generateFrameNames("tp_door", 12, 31, "", 4));
            tp_door.animations.add("stay_darwin", Phaser.Animation.generateFrameNames("tp_door", 32, 32, "", 4));
            tp_door.animations.add("in_darwin", Phaser.Animation.generateFrameNames("tp_door", 33, 42, "", 4));
            tp_door.animations.add("out_darwin", Phaser.Animation.generateFrameNames("tp_door", 43, 62, "", 4));
            tp_door.play("stay_darwin", 30, true);
            tp_door.anchor.set(0.5, 1.0);
            tp_door.data.myName = type;
            tp_door.data.onNoise = noise;
            var coliderCenter = this.game.add.sprite(0, -2, "darwin", "colider");
            coliderCenter.anchor.set(0.5, 0.5);
            coliderCenter.width = 2;
            coliderCenter.height = 2;
            coliderCenter.alpha = 0;
            tp_door.addChild(coliderCenter);
            var markText = this.game.add.text(0, 0, "A1", this.markTextStyle);
            tp_door.addChild(markText);
            markText.anchor.set(0.5, 0.5);
            markText.text = type;
            markText.visible = false;
            this._manager.arrayDoor.addChild(tp_door);
        };
        EditorClass.prototype.addTeleport = function (x, y, type, noise) {
            var teleport = this.game.add.sprite(x, y, "blocks", "teleport");
            if (type == "holeTeleport1" || type == "holeTeleport3" || type == "holeTeleport5" || type == "holeTeleport7") {
                teleport.anchor.set(0, 0);
            }
            else {
                teleport.anchor.set(0, 1);
            }
            teleport.data.onNoise = noise;
            teleport.data.myName = type;
            var xx = 0;
            for (var i = 1; i < 11; i++) {
                var vortex = this.game.add.sprite(0, 0, "blocks", "box");
                vortex.anchor.set(0, 0);
                vortex.x = xx;
                xx += 25;
                if (type == "holeTeleport1" || type == "holeTeleport3" || type == "holeTeleport5" || type == "holeTeleport7") {
                    vortex.y = 0;
                }
                else {
                    vortex.y = -25;
                }
                vortex.width = 25;
                vortex.height = 25;
                vortex.alpha = 0.4;
                teleport.addChild(vortex);
                if (i < 10) {
                    teleport.data['vortex0' + i] = vortex;
                }
                else {
                    teleport.data['vortex' + i] = vortex;
                }
            }
            var markText = this.game.add.text(0, 0, "text", this.markTextStyle);
            teleport.addChild(markText);
            markText.anchor.set(0.5, 0.5);
            markText.text = type + " (" + type + ")";
            markText.visible = false;
            this._manager.arrayTeleport.addChild(teleport);
        };
        EditorClass.prototype.addTutor = function (x, y, type) {
            var tutor = this.game.add.sprite(x, y);
            var colider = this.game.add.sprite(-50, 10, "blocks", "tutor_colider");
            colider.anchor.set(0, 1);
            colider.alpha = 0;
            tutor.addChild(colider);
            if (type == "1") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor1_1");
                clip.x = -22;
                clip.y = -69;
                clip.anchor.set(0, 0);
                tutor.data.img1 = "tutor1_1";
                tutor.data.img2 = "tutor1_2";
                tutor.data.textNum = 9;
            }
            if (type == "2") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor2_1");
                clip.x = 0;
                clip.y = -32;
                clip.anchor.set(0.5, 0.5);
                tutor.data.img1 = "tutor2_1";
                tutor.data.img2 = "tutor2_2";
                tutor.data.textNum = 3;
                var tween = this.game.add.tween(clip).to({ y: -28 }, 300, Phaser.Easing.Linear.None, true, 0, -1, true);
            }
            if (type == "3") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor3_1");
                clip.x = -20;
                clip.y = -50;
                clip.anchor.set(0, 0);
                tutor.data.img1 = "tutor3_1";
                tutor.data.img2 = "tutor3_2";
                tutor.data.textNum = 8;
            }
            if (type == "4") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor4_1");
                clip.x = -12;
                clip.y = -24;
                clip.anchor.set(0, 0);
                tutor.data.img1 = "tutor4_1";
                tutor.data.img2 = "tutor4_2";
                tutor.data.textNum = 1;
            }
            if (type == "5") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor5_1");
                clip.x = 0;
                clip.y = -38;
                clip.anchor.set(0.5, 0.5);
                tutor.data.img1 = "tutor5_1";
                tutor.data.img2 = "tutor5_2";
                tutor.data.textNum = 5;
                var tween = this.game.add.tween(clip).to({ y: -34 }, 300, Phaser.Easing.Linear.None, true, 0, -1, true);
            }
            if (type == "6") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor6_1");
                clip.x = -15;
                clip.y = -42;
                clip.anchor.set(0, 0);
                tutor.data.img1 = "tutor6_1";
                tutor.data.img2 = "tutor6_2";
                tutor.data.textNum = 7;
            }
            if (type == "7") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor7_1");
                clip.x = -25.5;
                clip.y = -72;
                clip.anchor.set(0, 0);
                tutor.data.img1 = "tutor7_1";
                tutor.data.img2 = "tutor7_2";
                tutor.data.textNum = 6;
            }
            if (type == "8") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor8_1");
                clip.x = -20;
                clip.y = -55;
                clip.anchor.set(0, 0);
                tutor.data.img1 = "tutor8_1";
                tutor.data.img2 = "tutor8_2";
                tutor.data.textNum = 1;
            }
            if (type == "9") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor9_1");
                clip.x = -20;
                clip.y = -85;
                clip.anchor.set(0, 0);
                tutor.data.img1 = "tutor9_1";
                tutor.data.img2 = "tutor9_2";
                tutor.data.textNum = 4;
            }
            if (type == "10") {
                var clip = this.game.add.sprite(0, 0, "blocks", "tutor10_1");
                clip.x = -22.5;
                clip.y = -63;
                clip.anchor.set(0, 0);
                tutor.data.img1 = "tutor10_1";
                tutor.data.img2 = "tutor10_2";
                tutor.data.textNum = 2;
            }
            tutor.addChild(clip);
            clip.data.curFrame = 1;
            tutor.data.type = type;
            tutor.data.clip = clip;
            tutor.data.colider = colider;
            this._manager.arrayTutorial.addChild(tutor);
        };
        EditorClass.prototype.addBox = function (x, y, type, noise) {
            if (type == "box") {
                var box = this.game.add.sprite(x, y, "blocks", "box");
                box.anchor.set(0.5, 1.0);
            }
            box.data.onNoise = noise;
            box.data.falling = false;
            box.data.grabbed = false;
            box.data.particleFlag = false;
            box.data.bounceLeft = false;
            box.data.bounceRight = false;
            box.data.speedX = 50;
            box.data.spdX = 200;
            box.data.speedY = 200;
            box.data.spdY = 200;
            var coliderBox = this.game.add.sprite(0, 0, "darwin", "colider");
            coliderBox.anchor.set(box.anchor.x, box.anchor.y);
            coliderBox.width = box.width;
            coliderBox.height = box.height;
            coliderBox.alpha = 0;
            box.addChild(coliderBox);
            var colider = this.game.add.sprite(0, -25, "darwin", "semisolidColider");
            colider.anchor.set(0.5, 0);
            colider.width = 25;
            colider.height = 12;
            colider.alpha = 0;
            box.addChild(colider);
            var coliderCenter = this.game.add.sprite(0, -11.5, "darwin", "hit_point");
            coliderCenter.anchor.set(0.5, 0.5);
            coliderCenter.width = 2;
            coliderCenter.height = 2;
            coliderCenter.alpha = 0;
            box.addChild(coliderCenter);
            var coliderFoot = this.game.add.sprite(0, 1, "darwin", "hit_point");
            coliderFoot.anchor.set(0.5, 0.5);
            coliderFoot.width = 2;
            coliderFoot.height = 2;
            coliderFoot.alpha = 0;
            box.addChild(coliderFoot);
            var markText = this.game.add.text(0, 0, "A1", this.markTextStyle);
            box.addChild(markText);
            markText.anchor.set(0.5, 0.5);
            markText.visible = false;
            box.data.coliderFoot = coliderFoot;
            box.data.coliderCenter = coliderCenter;
            box.data.colider = colider;
            box.data.coliderBox = coliderBox;
            this._manager.arraySemisolid.addChild(box);
        };
        EditorClass.prototype.addHole = function (x, y, type, arg) {
            if (arg === void 0) { arg = false; }
            if (type == "pit") {
                var hole = this.game.add.sprite(x, y, "blocks", "hole");
                hole.anchor.set(0, 1);
            }
            var colider = this.game.add.sprite(0, 75, "darwin", "colider");
            colider.anchor.set(hole.anchor.x, hole.anchor.y);
            colider.width = 25;
            colider.height = 75;
            colider.alpha = 0;
            hole.addChild(colider);
            hole.data.myName = type;
            this._manager.arrayPit.addChild(hole);
        };
        EditorClass.prototype.enableDrag = function (s) {
            var _this = this;
            var pivot_spr = this.game.add.sprite(s.pivot.x, s.pivot.y, "darwin", "grap_hit");
            pivot_spr.anchor.set(0.5, 0.5);
            s.addChild(pivot_spr);
            pivot_spr.inputEnabled = true;
            pivot_spr.input.enableDrag();
            pivot_spr.events.onDragUpdate.add(function () {
                console.log("pivot: " + pivot_spr.x + "," + pivot_spr.y);
            }, this);
            s.events.onInputDown.add(function () {
                if (_this.game.input.activePointer.middleButton.isDown) {
                }
            }, this);
            s.inputEnabled = true;
            s.input.enableDrag();
            s.events.onDragUpdate.add(function () {
                console.log(s.x + "," + s.y);
            }, this);
        };
        EditorClass.prototype.setArray = function (spr, letter) {
            switch (letter) {
                case "A":
                    this._manager.arrayA.push(spr);
                    break;
                case "A1":
                    this._manager.arrayA1.push(spr);
                    break;
                case "B":
                    this._manager.arrayB.push(spr);
                    break;
                case "C":
                    this._manager.arrayC.push(spr);
                    break;
                case "D":
                    this._manager.arrayD.push(spr);
                    break;
                case "E":
                    this._manager.arrayE.push(spr);
                    break;
                case "F":
                    this._manager.arrayF.push(spr);
                    break;
                case "G":
                    this._manager.arrayG.push(spr);
                    break;
            }
        };
        return EditorClass;
    }(Phaser.Sprite));
    TProject.EditorClass = EditorClass;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var FadeClass = (function (_super) {
        __extends(FadeClass, _super);
        function FadeClass(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this._manager = manager;
            _this.fadeScreen = _this.game.add.sprite(0, 0, "black_screen");
            _this.fadeScreen.anchor.set(0.0, 0.0);
            _this.addChild(_this.fadeScreen);
            _this.fadeScreen.alpha = 0;
            return _this;
        }
        FadeClass.prototype.goFade = function (func, fadein, fadeout) {
            this.fadein = fadein;
            this.fadeout = fadeout;
            var tween = this.game.add.tween(this.fadeScreen).to({ alpha: 1 }, fadein, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.onComplete.add(this.enterFunc, this);
            tween.onComplete.add(func, this);
        };
        FadeClass.prototype.enterFunc = function () {
            var tween = this.game.add.tween(this.fadeScreen).to({ alpha: 0 }, this.fadeout, Phaser.Easing.Linear.None, true, 0, 0, false);
        };
        return FadeClass;
    }(Phaser.Sprite));
    TProject.FadeClass = FadeClass;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Fall = (function () {
        function Fall(game, manager, d) {
            this.updEnable = false;
            this.display = d;
            this.hasListener = false;
            this.poolArray = new Array(Fall.POOL_SIZE);
            for (var i = 0; i < Fall.POOL_SIZE; i++) {
                this.poolArray[i] = new TProject.FallParticle(game, manager);
            }
            manager.arrayParticles.push(this);
        }
        Fall.prototype.shoot = function (px, py) {
            for (var i = 0; i < Fall.POOL_SIZE; i++) {
                this.poolArray[i].initDa();
                this.display.addChild(this.poolArray[i]);
                this.poolArray[i].active = true;
                this.poolArray[i].x = px;
                this.poolArray[i].y = py;
            }
            if (!this.hasListener) {
                this.updEnable = true;
                this.hasListener = true;
            }
        };
        Fall.prototype.updateDa = function () {
            var anyActive = false;
            if (this.updEnable) {
                for (var i = 0; i < Fall.POOL_SIZE; i++) {
                    if (this.poolArray[i].active) {
                        this.poolArray[i].updateDa();
                        anyActive = true;
                    }
                }
                if (!anyActive) {
                    this.updEnable = false;
                    this.hasListener = false;
                }
            }
        };
        Fall.POOL_SIZE = 15;
        return Fall;
    }());
    TProject.Fall = Fall;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var FallParticle = (function (_super) {
        __extends(FallParticle, _super);
        function FallParticle(game, manager) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this._manager = manager;
            _this.direction = 0;
            _this.speed = 0;
            _this.active = false;
            _this.createPart();
            return _this;
        }
        FallParticle.prototype.createPart = function () {
            this.graphics = this.game.add.graphics(0, 0);
            this.graphics.clear();
            this.graphics.beginFill(FallParticle.COLOR, .1);
            this.graphics.drawCircle(FallParticle.SIZE / -2, FallParticle.SIZE / -2, FallParticle.SIZE);
            this.graphics.endFill();
            this.addChild(this.graphics);
        };
        FallParticle.prototype.updateDa = function () {
            this.x += this._cos * this.speed;
            this.y += this._sin * this.speed;
            this.rotation += this.speed;
            this.speed *= FallParticle.FRICTION;
            if (this.speed < 1) {
                this.speed = 0;
                this.active = false;
                this.parent.removeChild(this);
            }
        };
        FallParticle.prototype.initDa = function () {
            if (this.graphics == null) {
            }
            this.direction = Math.random() * Math.PI * -1;
            this.speed = Math.random() * FallParticle.MAX_SPEED;
        };
        Object.defineProperty(FallParticle.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (d) {
                this._direction = d;
                this._cos = Math.cos(this._direction);
                this._sin = Math.sin(this._direction);
            },
            enumerable: true,
            configurable: true
        });
        FallParticle.MAX_SPEED = 4.5;
        FallParticle.FRICTION = 0.8;
        FallParticle.COLOR = 0xFFFFFF;
        FallParticle.SIZE = 5;
        return FallParticle;
    }(Phaser.Graphics));
    TProject.FallParticle = FallParticle;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var GameplayTablesUI = (function (_super) {
        __extends(GameplayTablesUI, _super);
        function GameplayTablesUI(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this._manager = manager;
            _this.anchor.set(0.0, 0.0);
            _this.screen_bg = _this.game.add.group();
            _this.addChild(_this.screen_bg);
            _this.screen1 = _this.game.add.group();
            _this.screen2 = _this.game.add.group();
            _this.screen_bg.addChild(_this.screen1);
            _this.screen_bg.addChild(_this.screen2);
            _this.blackScreen = _this.game.add.sprite(0, 0, "black_screen");
            _this.blackScreen.anchor.set(0.0, 0.0);
            _this.screen1.addChild(_this.blackScreen);
            _this.blackScreen.alpha = 0;
            _this.pausePanel = _this.game.add.sprite(0, 0, "menu_atlas", "table_pause_panel");
            _this.pausePanel.anchor.set(0.5, 0.5);
            _this.pausePanel.x = window.innerWidth / 2;
            _this.pausePanel.y = window.innerHeight / 2;
            _this.screen1.addChild(_this.pausePanel);
            var myText = _this.game.add.text(0, -50, TProject.Locale.pauseBtnText, { font: "28px HelveticaRounded-Black", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.anchor.set(0.5, 0.5);
            _this.pausePanel.addChild(myText);
            _this.pausePanel_backBtn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this.hidePausePanel(); }, _this, "table_pause_panel_but1", "table_pause_panel_but1", "table_pause_panel_but1");
            _this.pausePanel_backBtn.x = -75;
            _this.pausePanel_backBtn.y = 0;
            _this.pausePanel_backBtn.anchor.set(0.5, 0.5);
            _this.pausePanel_backBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.pausePanel_backBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.pausePanel.addChild(_this.pausePanel_backBtn);
            var myText = _this.game.add.text(0, 0, TProject.Locale.continueBtnText, { font: "18px HelveticaRounded-Black", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.anchor.set(0.5, 0.5);
            _this.pausePanel_backBtn.addChild(myText);
            _this.pausePanel_exitBtn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this.exitPausePanel(); }, _this, "table_pause_panel_but2", "table_pause_panel_but2", "table_pause_panel_but2");
            _this.pausePanel_exitBtn.x = 100;
            _this.pausePanel_exitBtn.y = 0;
            _this.pausePanel_exitBtn.anchor.set(0.5, 0.5);
            _this.pausePanel_exitBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.pausePanel_exitBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.pausePanel.addChild(_this.pausePanel_exitBtn);
            var myText = _this.game.add.text(0, 0, TProject.Locale.exitBtnText, { font: "18px HelveticaRounded-Black", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.anchor.set(0.5, 0.5);
            _this.pausePanel_exitBtn.addChild(myText);
            _this.pausePanel.y = -150;
            _this.endPanel = _this.game.add.sprite(0, 0, "menu_atlas", "endLevelPanel");
            _this.endPanel.anchor.set(0.5, 0.5);
            _this.endPanel.x = window.innerWidth / 2;
            _this.endPanel.y = window.innerHeight / 2;
            _this.screen1.addChild(_this.endPanel);
            _this.endPanelPers = _this.game.add.sprite(0, 0, "menu_atlas", "endPanel_pers1");
            _this.endPanelPers.anchor.set(0.5, 1);
            _this.endPanelPers.x = -147;
            _this.endPanelPers.y = 111;
            _this.endPanel.addChild(_this.endPanelPers);
            _this.star2 = _this.game.add.sprite(0, 0, "menu_atlas", "endPanel_star");
            _this.star2.x = 0;
            _this.star2.y = -40;
            _this.star2.anchor.set(0.5, 0.5);
            _this.endPanel.addChild(_this.star2);
            _this.star1 = _this.game.add.sprite(0, 0, "menu_atlas", "endPanel_star");
            _this.star1.x = _this.star2.x - 50;
            _this.star1.y = _this.star2.y;
            _this.star1.anchor.set(0.5, 0.5);
            _this.endPanel.addChild(_this.star1);
            _this.star3 = _this.game.add.sprite(0, 0, "menu_atlas", "endPanel_star");
            _this.star3.x = _this.star2.x + 50;
            _this.star3.y = _this.star2.y;
            _this.star3.anchor.set(0.5, 0.5);
            _this.endPanel.addChild(_this.star3);
            var myText = _this.game.add.text(0, -75, TProject.Locale.winText1, { font: "34px HelveticaRounded-Black", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.anchor.set(0.5, 0.5);
            _this.endPanel.addChild(myText);
            _this.endPanel.data.text1 = myText;
            var myText = _this.game.add.text(30, 20, TProject.Locale.winText2_1, { font: "22px HelveticaRounded-Black", fill: "#A2E3ED", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.anchor.set(0.5, 0.5);
            myText.align = "center";
            myText.wordWrap = true;
            myText.wordWrapWidth = 210;
            _this.endPanel.addChild(myText);
            _this.endPanel.data.text2 = myText;
            _this.endPanel_nextBtn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this.nextBtn(e); }, _this, "endPanel_nextBtn", "endPanel_nextBtn", "endPanel_nextBtn");
            _this.endPanel_nextBtn.x = 30;
            _this.endPanel_nextBtn.y = 100;
            _this.endPanel_nextBtn.anchor.set(0.5, 0.5);
            _this.endPanel_nextBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.endPanel_nextBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.endPanel.addChild(_this.endPanel_nextBtn);
            _this.endPanel_restartBtn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this.restartWinBtn(e); }, _this, "endPanel_restartBtn", "endPanel_restartBtn", "endPanel_restartBtn");
            _this.endPanel_restartBtn.x = _this.endPanel_nextBtn.x - 85;
            _this.endPanel_restartBtn.y = _this.endPanel_nextBtn.y;
            _this.endPanel_restartBtn.anchor.set(0.5, 0.5);
            _this.endPanel_restartBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.endPanel_restartBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.endPanel.addChild(_this.endPanel_restartBtn);
            _this.endPanel_exitBtn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this.exitWinBtn(e); }, _this, "endPanel_exitBtn", "endPanel_exitBtn", "endPanel_exitBtn");
            _this.endPanel_exitBtn.x = _this.endPanel_nextBtn.x + 85;
            _this.endPanel_exitBtn.y = _this.endPanel_nextBtn.y;
            _this.endPanel_exitBtn.anchor.set(0.5, 0.5);
            _this.endPanel_exitBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.endPanel_exitBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.endPanel.addChild(_this.endPanel_exitBtn);
            _this.endPanel.y = -150;
            _this.failPanel = _this.game.add.sprite(0, 0, "menu_atlas", "failPanel");
            _this.failPanel.anchor.set(0.5, 0.5);
            _this.failPanel.x = window.innerWidth / 2;
            _this.failPanel.y = window.innerHeight / 2;
            _this.screen1.addChild(_this.failPanel);
            var myText = _this.game.add.text(0, 0, TProject.Locale.failtext, { font: "34px HelveticaRounded-Black", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.align = "center";
            myText.anchor.set(0.5, 0.5);
            myText.wordWrap = true;
            myText.wordWrapWidth = 350;
            _this.failPanel.addChild(myText);
            _this.failPanel_pers = _this.game.add.sprite(0, 0, "menu_atlas", "failPanel_pers");
            _this.failPanel_pers.anchor.set(0.5, 1);
            _this.failPanel_pers.x = -183;
            _this.failPanel_pers.y = 116;
            _this.failPanel.addChild(_this.failPanel_pers);
            _this.failPanel_restartBtn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this.restartFailBtn(e); }, _this, "failPanel_restartBtn", "failPanel_restartBtn", "failPanel_restartBtn");
            _this.failPanel_restartBtn.x = -40;
            _this.failPanel_restartBtn.y = _this.endPanel_nextBtn.y;
            _this.failPanel_restartBtn.anchor.set(0.5, 0.5);
            _this.failPanel.addChild(_this.failPanel_restartBtn);
            _this.failPanel_exitBtn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this.exitFailBtn(e); }, _this, "endPanel_exitBtn", "endPanel_exitBtn", "endPanel_exitBtn");
            _this.failPanel_exitBtn.x = _this.failPanel_restartBtn.x + 85;
            _this.failPanel_exitBtn.y = _this.failPanel_restartBtn.y;
            _this.failPanel_exitBtn.anchor.set(0.5, 0.5);
            _this.failPanel.addChild(_this.failPanel_exitBtn);
            _this.failPanel.y = -150;
            return _this;
        }
        GameplayTablesUI.prototype.showPausePanel = function () {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            this.pausePanel.y = 0;
            this.blackScreen.alpha = 0;
            var tween = this.game.add.tween(this.pausePanel).to({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.blackScreen).to({ alpha: 0.5 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            this._manager.gamePause = true;
        };
        GameplayTablesUI.prototype.hidePausePanel = function () {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            var tween = this.game.add.tween(this.pausePanel).to({ y: 720 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.blackScreen).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            this._manager.gamePause = false;
            this._manager.gameplay = true;
        };
        GameplayTablesUI.prototype.exitPausePanel = function () {
            var _this = this;
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            var tween = this.game.add.tween(this.pausePanel).to({ y: 720 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.blackScreen).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            this._manager.fadeSprite.goFade(function (e) {
                TProject.SoundMixer.play("sound 1", TProject.BaseGame.musicVolume, true);
                _this._manager.group4.visible = true;
            }, 200, 400);
            this._manager.mainMenuSprite.createOrUpdateSelectButtons();
        };
        GameplayTablesUI.prototype.showWinPanel = function (stars) {
            this.endPanelPers.x = -147;
            this.endPanelPers.y = 111;
            if (stars == 0) {
                this.endPanelPers.loadTexture("menu_atlas", "endPanel_pers1");
                this.endPanel.data.text2.text = TProject.Locale.winText2_1;
                this.star1.loadTexture("menu_atlas", "endPanel_star");
                this.star2.loadTexture("menu_atlas", "endPanel_star");
                this.star3.loadTexture("menu_atlas", "endPanel_star");
            }
            else if (stars == 1) {
                this.endPanelPers.loadTexture("menu_atlas", "endPanel_pers2");
                this.endPanel.data.text2.text = TProject.Locale.winText2_2;
                this.star1.loadTexture("menu_atlas", "endPanel_star2");
                this.star2.loadTexture("menu_atlas", "endPanel_star");
                this.star3.loadTexture("menu_atlas", "endPanel_star");
            }
            else if (stars == 2) {
                this.endPanelPers.loadTexture("menu_atlas", "endPanel_pers3");
                this.endPanel.data.text2.text = TProject.Locale.winText2_3;
                this.star1.loadTexture("menu_atlas", "endPanel_star2");
                this.star2.loadTexture("menu_atlas", "endPanel_star2");
                this.star3.loadTexture("menu_atlas", "endPanel_star");
            }
            else if (stars == 3) {
                this.endPanelPers.loadTexture("menu_atlas", "endPanel_pers4");
                this.endPanel.data.text2.text = TProject.Locale.winText2_4;
                this.star1.loadTexture("menu_atlas", "endPanel_star2");
                this.star2.loadTexture("menu_atlas", "endPanel_star2");
                this.star3.loadTexture("menu_atlas", "endPanel_star2");
                this.endPanelPers.x = -147;
                this.endPanelPers.y = 107;
            }
            this.endPanel.y = -150;
            this.blackScreen.alpha = 0;
            var tween = this.game.add.tween(this.endPanel).to({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.blackScreen).to({ alpha: 0.5 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        };
        GameplayTablesUI.prototype.hideWinPanel = function () {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            var tween = this.game.add.tween(this.endPanel).to({ y: 750 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.blackScreen).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        };
        GameplayTablesUI.prototype.nextBtn = function (e) {
            var _this = this;
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            this._manager.currentLevel += 1;
            this.hideWinPanel();
            if (this._manager.currentLevel - 1 == 11) {
                this._manager.mainMenuSprite.showComix(2);
            }
            else if (this._manager.currentLevel - 1 == 25) {
                this._manager.mainMenuSprite.showComix(3);
            }
            else if (this._manager.currentLevel - 1 == 36) {
                this._manager.mainMenuSprite.showComix(4);
            }
            else {
                this._manager.fadeSprite.goFade(function (e) { _this._manager.restartLevel(); }, 200, 800);
            }
        };
        GameplayTablesUI.prototype.restartWinBtn = function (e) {
            var _this = this;
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            this.hideWinPanel();
            this._manager.fadeSprite.goFade(function (e) { _this._manager.restartLevel(); }, 200, 800);
        };
        GameplayTablesUI.prototype.exitWinBtn = function (e) {
            var _this = this;
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            this.hideWinPanel();
            this._manager.mainMenuSprite.createOrUpdateSelectButtons();
            this._manager.fadeSprite.goFade(function (e) {
                if (TProject.BaseGame.isSoundOn)
                    TProject.SoundMixer.play("sound 1", TProject.BaseGame.musicVolume, true);
                _this._manager.group4.visible = true;
            }, 200, 400);
        };
        GameplayTablesUI.prototype.showFailPanel = function () {
            this.failPanel.y = -150;
            this.blackScreen.alpha = 0;
            var tween = this.game.add.tween(this.failPanel).to({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.blackScreen).to({ alpha: 0.5 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        };
        GameplayTablesUI.prototype.hideFailPanel = function () {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            var tween = this.game.add.tween(this.failPanel).to({ y: 750 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.blackScreen).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        };
        GameplayTablesUI.prototype.restartFailBtn = function (e) {
            var _this = this;
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            this.hideFailPanel();
            this._manager.fadeSprite.goFade(function (e) { _this._manager.restartLevel(); }, 200, 800);
        };
        GameplayTablesUI.prototype.exitFailBtn = function (e) {
            var _this = this;
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            this.hideFailPanel();
            this._manager.mainMenuSprite.createOrUpdateSelectButtons();
            this._manager.fadeSprite.goFade(function (e) {
                if (TProject.BaseGame.isSoundOn)
                    TProject.SoundMixer.play("sound 1", TProject.BaseGame.musicVolume, true);
                _this._manager.group4.visible = true;
            }, 200, 400);
        };
        GameplayTablesUI.prototype.inputOver = function (e) {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 6", TProject.BaseGame.soundVolume);
            e.scale.set(1.1, 1.1);
        };
        GameplayTablesUI.prototype.inputOut = function (e) {
            e.scale.set(1.0, 1.0);
        };
        return GameplayTablesUI;
    }(Phaser.Sprite));
    TProject.GameplayTablesUI = GameplayTablesUI;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var GameplayUI = (function (_super) {
        __extends(GameplayUI, _super);
        function GameplayUI(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this._manager = manager;
            _this.anchor.set(0.0, 0.0);
            _this.levelPanel = _this.game.add.sprite(0, 18, "menu_atlas", "gameplay_level");
            _this.levelPanel.x = window.innerWidth / 2 - 54;
            _this.levelPanel.anchor.set(0.5, 0.5);
            _this.addChild(_this.levelPanel);
            _this.levelText = _this.game.add.text(0, 3, _this._manager.currentLevel + "", { font: "18px HelveticaRounded-Black", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" });
            _this.updateLevelText();
            _this.levelText.anchor.set(0.5, 0.5);
            _this.levelPanel.addChild(_this.levelText);
            _this.restartBtn = _this.game.add.button(0, 18, "menu_atlas", function (e) { _this.restartBtnClick(); }, _this, "gameplay_restartBtn", "gameplay_restartBtn", "gameplay_restartBtn");
            _this.restartBtn.x = window.innerWidth / 2 - 18;
            _this.restartBtn.anchor.set(0.5, 0.5);
            _this.addChild(_this.restartBtn);
            _this.restartBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.restartBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.restartBtn.onInputDown.add(function (e) { _this.inputOut(e); });
            _this.pauseBtn = _this.game.add.button(0, 18, "menu_atlas", function (e) { _this.pauseBtnClick(); }, _this, "gameplay_pauseBtn", "gameplay_pauseBtn", "gameplay_pauseBtn");
            _this.pauseBtn.x = window.innerWidth / 2 + 18;
            _this.pauseBtn.anchor.set(0.5, 0.5);
            _this.addChild(_this.pauseBtn);
            _this.pauseBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.pauseBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.pauseBtn.onInputDown.add(function (e) { _this.inputOut(e); });
            _this.soundBtn = _this.game.add.button(0, 18, "menu_atlas", function (e) { _this.soundBtnClick(_this.soundBtn, _this._manager.mainMenuSprite.soundBtn); }, _this, "soundBtn_on", "soundBtn_on", "soundBtn_on");
            _this.soundBtn.x = window.innerWidth / 2 + 54;
            _this.soundBtn.anchor.set(0.5, 0.5);
            _this.addChild(_this.soundBtn);
            _this.soundBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.soundBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.soundBtn.onInputDown.add(function (e) { _this.inputOut(e); });
            _this.star2 = _this.game.add.sprite(0, 0, "menu_atlas", "gameplay_star");
            _this.star2.x = window.innerWidth / 2;
            _this.star2.y = window.innerHeight - 10;
            _this.star2.anchor.set(0.5, 0.5);
            _this.addChild(_this.star2);
            _this.star1 = _this.game.add.sprite(0, 0, "menu_atlas", "gameplay_star");
            _this.star1.x = _this.star2.x - 25;
            _this.star1.y = window.innerHeight - 10;
            _this.star1.anchor.set(0.5, 0.5);
            _this.addChild(_this.star1);
            _this.star3 = _this.game.add.sprite(0, 0, "menu_atlas", "gameplay_star");
            _this.star3.x = _this.star2.x + 25;
            _this.star3.y = window.innerHeight - 10;
            _this.star3.anchor.set(0.5, 0.5);
            _this.addChild(_this.star3);
            _this.updateStart();
            _this.c_dialog_panel = _this.game.add.sprite(460, 560, "comix_other", "c_dialog_panel");
            _this.c_dialog_panel.anchor.set(0.5, 0.5);
            _this.addChild(_this.c_dialog_panel);
            var myText = _this.game.add.text(-315, -35, "text", { font: "22px HelveticaRounded-Black", fill: "#666666", boundsAlignH: "center", boundsAlignV: "middle" });
            myText.align = "center";
            myText.text = TProject.Locale.comix1_1;
            myText.anchor.set(0, 0);
            myText.wordWrap = true;
            myText.wordWrapWidth = 740;
            myText.setTextBounds(0, 0, 740, 70);
            _this.c_dialog_panel.addChild(myText);
            _this.c_dialog_panel.data.dialogText = myText;
            _this.p_avatar = _this.game.add.sprite(-430, -70, "blocks", "tutor_ava1");
            _this.p_avatar.anchor.set(0, 0);
            _this.c_dialog_panel.addChild(_this.p_avatar);
            _this.hideTutorTable();
            return _this;
        }
        GameplayUI.prototype.createMobiles = function () {
            var _this = this;
            this.mobLeft = this.game.add.sprite(0, 0, "menu_atlas", "mb0001");
            this.mobLeft.x = 40;
            this.mobLeft.y = 580;
            this.mobLeft.anchor.set(0.5, 0.5);
            this.addChild(this.mobLeft);
            this.mobLeft.inputEnabled = true;
            this.mobLeft.events.onInputDown.add(function (e) { _this._manager.player.downLeft(); });
            this.mobLeft.events.onInputUp.add(function (e) { _this._manager.player.upLeft(); });
            this.mobRight = this.game.add.sprite(0, 0, "menu_atlas", "mb0003");
            this.mobRight.x = 128;
            this.mobRight.y = 580;
            this.mobRight.anchor.set(0.5, 0.5);
            this.addChild(this.mobRight);
            this.mobRight.inputEnabled = true;
            this.mobRight.events.onInputDown.add(function (e) { _this._manager.player.downRight(); });
            this.mobRight.events.onInputUp.add(function (e) { _this._manager.player.upRight(); });
            this.mobUp = this.game.add.sprite(0, 0, "menu_atlas", "mb0002");
            this.mobUp.x = 216;
            this.mobUp.y = 580;
            this.mobUp.anchor.set(0.5, 0.5);
            this.addChild(this.mobUp);
            this.mobUp.inputEnabled = true;
            this.mobUp.events.onInputDown.add(function (e) { _this._manager.player.downUp(); });
            this.mobUp.events.onInputUp.add(function (e) { _this._manager.player.upUp(); });
            this.mobDown = this.game.add.sprite(0, 0, "menu_atlas", "mb0003");
            this.mobDown.angle = 90;
            this.mobDown.x = 304;
            this.mobDown.y = 580;
            this.mobDown.anchor.set(0.5, 0.5);
            this.addChild(this.mobDown);
            this.mobDown.inputEnabled = true;
            this.mobDown.events.onInputDown.add(function (e) { _this._manager.player.downDown(); });
            this.mobDown.events.onInputUp.add(function (e) { _this._manager.player.upDown(); });
            this.mobAct = this.game.add.sprite(0, 0, "menu_atlas", "mb0005");
            this.mobAct.x = window.innerWidth - 34 - 10;
            this.mobAct.y = 580;
            this.mobAct.anchor.set(0.5, 0.5);
            this.addChild(this.mobAct);
            this.mobAct.inputEnabled = true;
            this.mobAct.events.onInputDown.add(function (e) { _this._manager.player.downAct(); });
            this.mobAct.events.onInputUp.add(function (e) { _this._manager.player.upAct(); });
        };
        GameplayUI.prototype.showTutorTable = function (type, textNum) {
            console.log("showTutorTable");
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 27", TProject.BaseGame.soundVolume);
            this.c_dialog_panel.visible = true;
            this.p_avatar.loadTexture("blocks", "tutor_ava" + type);
            switch (textNum) {
                case 1:
                    this.c_dialog_panel.data.dialogText.text = TProject.Locale.help_1;
                    break;
                case 2:
                    this.c_dialog_panel.data.dialogText.text = TProject.Locale.help_2;
                    break;
                case 3:
                    this.c_dialog_panel.data.dialogText.text = TProject.Locale.help_3;
                    break;
                case 4:
                    this.c_dialog_panel.data.dialogText.text = TProject.Locale.help_4;
                    break;
                case 5:
                    this.c_dialog_panel.data.dialogText.text = TProject.Locale.help_5;
                    break;
                case 6:
                    this.c_dialog_panel.data.dialogText.text = TProject.Locale.help_6;
                    break;
                case 7:
                    this.c_dialog_panel.data.dialogText.text = TProject.Locale.help_7;
                    break;
                case 8:
                    this.c_dialog_panel.data.dialogText.text = TProject.Locale.help_8;
                    break;
                case 9:
                    this.c_dialog_panel.data.dialogText.text = TProject.Locale.help_9;
                    break;
            }
        };
        GameplayUI.prototype.hideTutorTable = function () {
            this.c_dialog_panel.visible = false;
        };
        GameplayUI.prototype.updateLevelText = function () {
            if (this._manager.currentLevel < 10) {
                this.levelText.text = "0" + this._manager.currentLevel;
            }
            else {
                this.levelText.text = "" + this._manager.currentLevel;
            }
        };
        GameplayUI.prototype.updateStart = function () {
            if (this._manager.player != undefined) {
                var num = this._manager.player.actualStarCollected + 1;
            }
            else {
                var num = this._manager.localStorageGetNumber("level" + this._manager.currentLevel);
            }
            var spr = "gameplay_star";
            var spr2 = "gameplay_star2";
            if (num == 0) {
                this.star1.loadTexture("menu_atlas", spr);
                this.star2.loadTexture("menu_atlas", spr);
                this.star3.loadTexture("menu_atlas", spr);
            }
            else if (num == 1) {
                this.star1.loadTexture("menu_atlas", spr);
                this.star2.loadTexture("menu_atlas", spr);
                this.star3.loadTexture("menu_atlas", spr);
            }
            else if (num == 2) {
                this.star1.loadTexture("menu_atlas", spr2);
                this.star2.loadTexture("menu_atlas", spr);
                this.star3.loadTexture("menu_atlas", spr);
            }
            else if (num == 3) {
                this.star1.loadTexture("menu_atlas", spr2);
                this.star2.loadTexture("menu_atlas", spr2);
                this.star3.loadTexture("menu_atlas", spr);
            }
            else if (num == 4) {
                this.star1.loadTexture("menu_atlas", spr2);
                this.star2.loadTexture("menu_atlas", spr2);
                this.star3.loadTexture("menu_atlas", spr2);
            }
        };
        GameplayUI.prototype.soundBtnClick = function (btn, btn2) {
            if (TProject.BaseGame.isSoundOn == true) {
                TProject.BaseGame.isSoundOn = false;
                btn.setFrames("soundBtn_off", "soundBtn_off", "soundBtn_off");
                btn2.setFrames("soundBtn_off", "soundBtn_off", "soundBtn_off");
                TProject.SoundMixer.off();
            }
            else if (TProject.BaseGame.isSoundOn == false) {
                TProject.BaseGame.isSoundOn = true;
                btn.setFrames("soundBtn_on", "soundBtn_on", "soundBtn_on");
                btn2.setFrames("soundBtn_on", "soundBtn_on", "soundBtn_on");
                TProject.SoundMixer.on();
            }
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
        };
        GameplayUI.prototype.restartBtnClick = function () {
            var _this = this;
            this._manager.fadeSprite.goFade(function (e) { _this._manager.restartLevel(); }, 100, 800);
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
        };
        GameplayUI.prototype.pauseBtnClick = function () {
            this._manager.gameplayTableUI.showPausePanel();
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            this._manager.gameplay = false;
        };
        GameplayUI.prototype.inputOver = function (e) {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 6", TProject.BaseGame.soundVolume);
            e.scale.set(1.1, 1.1);
        };
        GameplayUI.prototype.inputOut = function (e) {
            e.scale.set(1.0, 1.0);
        };
        return GameplayUI;
    }(Phaser.Sprite));
    TProject.GameplayUI = GameplayUI;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var LevelsData = (function () {
        function LevelsData() {
        }
        LevelsData.LevelFromDataBase = function (level, myEditor, manager) {
            console.log("building level...");
            if (level == 1) {
                manager.arrayNeedNum = [4, 5, 6];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(62.25, 175);
                myEditor.addTutor(374.5, 175, "8");
                myEditor.addTutor(725, 175, "10");
                myEditor.addDecor(87, 112.5, "bebedero", false);
                myEditor.addDecor(300, 112.5, "casilleros", false);
                myEditor.addDecor(600, 112.5, "casilleros", false);
                myEditor.addDecor(450, 87.5, "cuadro1", false);
                myEditor.addDecor(150, 25, "elmore2", false);
                myEditor.addExitDoor(775, 175, "door", false);
                myEditor.addStar(450, 37, "star", false);
                myEditor.addStar(675, 137, "star", false);
                myEditor.addStar(225, 137, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(500, 200, "wallblockx4", false);
                myEditor.addWall(600, 200, "wallblockx12", false);
                myEditor.addWall(300, 200, "wallblockx4", false);
                myEditor.addWall(425, 150, "wallblockx2", false);
                myEditor.addHole(400, 200, "pit", false);
                myEditor.addHole(425, 200, "pit", false);
                myEditor.addHole(450, 200, "pit", false);
                myEditor.addHole(475, 200, "pit", false);
            }
            if (level == 2) {
                manager.arrayNeedNum = [5, 4, 6];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(37.25, 150);
                myEditor.addTutor(100, 165, "2");
                myEditor.addDecor(450, 112.5, "casilleros", false);
                myEditor.addDecor(150, 87.5, "cuadro2", false);
                myEditor.addDecor(475, 140, "calcomania2", false);
                myEditor.addDecor(685, 112.5, "bebedero", false);
                myEditor.addDecor(816.05, 112.5, "bebedero", false);
                myEditor.addStar(450, 25, "star", false);
                myEditor.addStar(675, 75, "star", false);
                myEditor.addStar(225, 75, "star", false);
                myEditor.addExitDoor(712.5, 175, "door", false);
                myEditor.addWall(0, 175, "wallblockx2", false);
                myEditor.addWall(0, 200, "wallblockx36", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(425, 75, "wallblockx2", false);
                myEditor.addWall(850, 175, "wallblockx2", false);
                myEditor.addWall(250, 175, "wallblockx4", false);
                myEditor.addWall(550, 175, "wallblockx4", false);
                myEditor.addWall(0, 200, "wallblocky2", false);
                myEditor.addWall(25, 200, "wallblocky2", false);
                myEditor.addWall(250, 200, "wallblocky2", false);
                myEditor.addWall(275, 200, "wallblocky2", false);
                myEditor.addWall(300, 200, "wallblocky2", false);
                myEditor.addWall(325, 200, "wallblocky2", false);
                myEditor.addWall(550, 200, "wallblocky2", false);
                myEditor.addWall(575, 200, "wallblocky2", false);
                myEditor.addWall(600, 200, "wallblocky2", false);
                myEditor.addWall(625, 200, "wallblocky2", false);
                myEditor.addWall(850, 200, "wallblocky2", false);
                myEditor.addWall(875, 200, "wallblocky2", false);
                myEditor.addWall(375, 125, "wallblockx2", false);
                myEditor.addWall(475, 125, "wallblockx2", false);
                myEditor.addSpike(137.5, 175, "spike", false);
                myEditor.addSpike(400, 175, "spikeX4", false);
            }
            if (level == 3) {
                manager.arrayNeedNum = [6, 5, 4];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(450, 175);
                myEditor.addDecor(750, 112.5, "bebedero", false);
                myEditor.addDecor(275, 112.5, "casilleros", false);
                myEditor.addDecor(850, 87.5, "cuadro3", false);
                myEditor.addDecor(625, 112.5, "casilleros", false);
                myEditor.addDecor(450, 25, "elmore1", false);
                myEditor.addDecor(50, 87.5, "cuadro2", false);
                myEditor.addExitDoor(112.5, 175, "door", false);
                myEditor.addStar(450, 37, "star", false);
                myEditor.addStar(855, 125, "star", false);
                myEditor.addStar(45, 125, "star", false);
                myEditor.addWall(275, 200, "wallblockx4", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(425, 200, "wallblockx2", false);
                myEditor.addWall(525, 200, "wallblockx4", false);
                myEditor.addWall(600, 200, "wallblockx12", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(375, 150.05, "solidinmovil", false);
                myEditor.addWall(500, 150.05, "solidinmovil", false);
                myEditor.addWall(425, 100, "wallblockx2", false);
                myEditor.addSpike(800, 175, "spike", false);
                myEditor.addSpike(75, 175, "spike", false);
                myEditor.addHole(375, 200, "pit", false);
                myEditor.addHole(475, 200, "pit", false);
                myEditor.addHole(400, 200, "pit", false);
                myEditor.addHole(500, 200, "pit", false);
            }
            if (level == 4) {
                manager.arrayNeedNum = [7, 5, 3];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(850, 175);
                myEditor.addTutor(700, 175, "9");
                myEditor.addDecor(825, 112.5, "bebedero", false);
                myEditor.addDecor(600, 112.5, "casilleros", false);
                myEditor.addDecor(300, 112.5, "casilleros", false);
                myEditor.addDecor(537.3, 110, "calcomania2", false);
                myEditor.addDecor(117, 88.35, "cartel salida", false);
                myEditor.addDecor(600.95, 25, "elmore2", false);
                myEditor.addDecor(162.5, 87.5, "cuadro1", false);
                myEditor.addDecor(737.6, 87.5, "cuadro2", false);
                myEditor.addExitDoor(37.5, 175, "door", false);
                myEditor.addStar(450, 50, "star", false);
                myEditor.addStar(737.6, 50, "star", false);
                myEditor.addStar(162.5, 50, "star", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(600, 200, "wallblockx12", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(300, 200, "wallblockx12", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(400, 125, "wallblockx4", false);
                myEditor.addWall(475, 200, "wallblocky4", false);
                myEditor.addWall(400, 200, "wallblocky4", false);
                myEditor.addWall(450, 200, "wallblocky4", false);
                myEditor.addWall(425, 200, "wallblocky4", false);
                myEditor.addBox(737.5, 175, "box", false);
                myEditor.addBox(387.5, 175, "box", false);
            }
            if (level == 5) {
                manager.arrayNeedNum = [8, 5, 2];
                manager.ArrayFlipCamX = [2];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(750, 175);
                myEditor.addTutor(550, 173, "5");
                myEditor.addDecor(750, 112.5, "casilleros", false);
                myEditor.addDecor(450, 49.35, "elmore1", false);
                myEditor.addDecor(233.7, 87.5, "cuadro3", false);
                myEditor.addDecor(66.35, 87.5, "cuadro1", false);
                myEditor.addExitDoor(112.5, 175, "door", false);
                myEditor.addStar(450, 62, "star", false);
                myEditor.addStar(850, 125, "star", false);
                myEditor.addStar(50, 125, "star", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(600, 200, "wallblockx12", false);
                myEditor.addWall(0, 24.85, "wallblockx4", false);
                myEditor.addWall(200, 25, "wallblockx4", false);
                myEditor.addWall(300, 200, "wallblockx4", false);
                myEditor.addWall(300, 25, "wallblockx12", false);
                myEditor.addWall(600, 25, "wallblockx12", false);
                myEditor.addWall(500, 200, "wallblockx4", false);
                myEditor.addWall(400, 125, "wallblockx4", false);
                myEditor.addLadder(512.5, 175, "ladderX3", false);
                myEditor.addLadder(387.5, 175, "ladderX3", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addDecor(350, 135.35, "calcomania2", false);
                myEditor.addHole(400, 200, "pit", false);
                myEditor.addHole(425, 200, "pit", false);
                myEditor.addHole(450, 200, "pit", false);
                myEditor.addHole(475, 200, "pit", false);
            }
            if (level == 6) {
                manager.arrayNeedNum = [4, 5, 6];
                manager.ArrayFlipCamX = [3];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(31.75, 175);
                myEditor.addTutor(105, 177.5, "7");
                myEditor.addTutor(525, 76, "6");
                myEditor.addDecor(299.95, 119, "elmore2", false);
                myEditor.addDecor(778.95, 112.5, "bebedero", false);
                myEditor.addDecor(350, 50, "calcomania2", false);
                myEditor.addDecor(637.35, 87.5, "cuadro2", false);
                myEditor.addExitDoor(662.5, 175, "door", false);
                myEditor.addStar(400, 150, "star", false);
                myEditor.addStar(778.95, 150, "star", false);
                myEditor.addWall(-75, 200, "wallblockx12", false);
                myEditor.addStar(200, 150, "star", false);
                myEditor.addWall(50, 100, "wallblockx12", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(375, 200, "wallblockx6", false);
                myEditor.addWall(250, 100, "wallblockx12", false);
                myEditor.addWall(625, 200, "wallblockx8", false);
                myEditor.addTeleportDoor(450, 75, "puerta2", false);
                myEditor.addTeleportDoor(150, 175, "puerta1", false);
                myEditor.addTeleportDoor(450, 175, "puerta3", false);
                myEditor.addTeleportDoor(150, 75, "puerta4", false);
                myEditor.addHole(225, 200, "pit", false);
                myEditor.addHole(250, 200, "pit", false);
                myEditor.addHole(275, 200, "pit", false);
                myEditor.addHole(300, 200, "pit", false);
                myEditor.addHole(325, 200, "pit", false);
                myEditor.addHole(350, 200, "pit", false);
                myEditor.addHole(525, 200, "pit", false);
                myEditor.addHole(550, 200, "pit", false);
                myEditor.addHole(575, 200, "pit", false);
                myEditor.addHole(600, 200, "pit", false);
                myEditor.addHole(825, 200, "pit", false);
                myEditor.addHole(850, 200, "pit", false);
                myEditor.addHole(875, 200, "pit", false);
                myEditor.addHole(900, 200, "pit", false);
            }
            if (level == 7) {
                manager.arrayNeedNum = [1, 9, 4, 5, 6];
                manager.ArrayFlipCamX = [4];
                manager.ArrayFlipCamY = [4];
                manager.createPlayer(50, 175);
                myEditor.addDecor(50, 112, "bebedero", false);
                myEditor.addDecor(250, 112, "bebedero", false);
                myEditor.addDecor(1050, 87.5, "cuadro2", false);
                myEditor.addDecor(750.35, 87, "cuadro1", false);
                myEditor.addDecor(1350, 87, "cuadro3", false);
                myEditor.addDecor(261, 45, "elmore1", false);
                myEditor.addWall(475, 200, "wallblockx6", false);
                myEditor.addExitDoor(413, 175, "door", false);
                myEditor.addWall(200, 250, "wallblocky3", false);
                myEditor.addWall(75, 250, "wallblocky3", false);
                myEditor.addWall(0, 200, "wallblockx4", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(200, 200, "wallblockx12", false);
                myEditor.addWall(500, 25, "wallblocky3", false);
                myEditor.addWall(500, 25, "wallblockx4", false);
                myEditor.addWall(600, 200, "wallblocky8", false);
                myEditor.addWall(375, 25, "wallblocky3", false);
                myEditor.addWall(300, 25, "wallblockx4", false);
                myEditor.addWall(800, 250, "wallblocky3", false);
                myEditor.addWall(675, 250, "wallblocky3", false);
                myEditor.addWall(1100, 250, "wallblocky3", false);
                myEditor.addWall(975, 250, "wallblocky3", false);
                myEditor.addWall(1400, 250, "wallblocky3", false);
                myEditor.addWall(1275, 250, "wallblocky3", false);
                myEditor.addStar(1375, 100, "star", false);
                myEditor.addStar(1075, 100, "star", false);
                myEditor.addWall(900, 25, "wallblockx4", false);
                myEditor.addWall(600, 200, "wallblockx4", false);
                myEditor.addStar(775, 100, "star", false);
                myEditor.addWall(1400, 200, "wallblockx4", false);
                myEditor.addWall(1200, 200, "wallblockx4", false);
                myEditor.addWall(1100, 200, "wallblockx4", false);
                myEditor.addWall(600, 25, "wallblockx4", false);
                myEditor.addWall(0, 25, "wallblockx12", false);
                myEditor.addWall(800, 200, "wallblockx4", false);
                myEditor.addWall(900, 200, "wallblockx4", false);
                myEditor.addWall(800, 25, "wallblocky3", false);
                myEditor.addWall(675, 25, "wallblocky3", false);
                myEditor.addWall(675, 200, "wallblocky8", false);
                myEditor.addWall(1400, 25, "wallblocky3", false);
                myEditor.addWall(1275, 25, "wallblocky3", false);
                myEditor.addWall(1200, 25, "wallblockx4", false);
                myEditor.addWall(1275, 200, "wallblocky8", false);
                myEditor.addWall(1100, 25, "wallblockx4", false);
                myEditor.addWall(1100, 200, "wallblocky8", false);
                myEditor.addWall(1400, 25, "wallblockx4", false);
                myEditor.addWall(800, 25, "wallblockx4", false);
                myEditor.addWall(1100, 25, "wallblocky3", false);
                myEditor.addWall(975, 25, "wallblocky3", false);
                myEditor.addWall(975, 200, "wallblocky8", false);
                myEditor.addWall(1400, 200, "wallblocky8", false);
                myEditor.addWall(800, 200, "wallblocky8", false);
                myEditor.addWall(850, 200, "wallblocky8", false);
                myEditor.addWall(825, 200, "wallblocky8", false);
                myEditor.addWall(875, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(925, 200, "wallblocky8", false);
                myEditor.addWall(950, 200, "wallblocky8", false);
                myEditor.addWall(1150, 200, "wallblocky8", false);
                myEditor.addWall(1125, 200, "wallblocky8", false);
                myEditor.addWall(1175, 200, "wallblocky8", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addWall(1225, 200, "wallblocky8", false);
                myEditor.addWall(1250, 200, "wallblocky8", false);
                myEditor.addWall(600, 200, "wallblocky8", false);
                myEditor.addWall(625, 200, "wallblocky8", false);
                myEditor.addWall(650, 200, "wallblocky8", false);
                myEditor.addWall(1425, 200, "wallblocky8", false);
                myEditor.addWall(1450, 200, "wallblocky8", false);
                myEditor.addWall(1475, 200, "wallblocky8", false);
                myEditor.addSpike(700, 0, "spikeX8", false, 90);
                myEditor.addSpike(800, 200, "spikeX8", false, -90);
                myEditor.addSpike(200, 204.35, "spike", false, -90);
                myEditor.addSpike(100, 179.35, "spike", false, 90);
                myEditor.addSpike(500, 20.65, "spike", false, -90);
                myEditor.addSpike(400, -4.35, "spike", false, 90);
                myEditor.addSpike(1000, 0, "spikeX8", false, 90);
                myEditor.addSpike(1100, 200, "spikeX8", false, -90);
                myEditor.addSpike(1300, 0, "spikeX8", false, 90);
                myEditor.addSpike(1400, 200, "spikeX8", false, -90);
                myEditor.addTeleport(325, 0, "holeTeleport6", false);
                myEditor.addTeleport(25, 225, "holeTeleport7", false);
                myEditor.addTeleport(1225, 0, "holeTeleport4", false);
                myEditor.addTeleport(925, 225, "holeTeleport3", false);
                myEditor.addTeleport(925, 0, "holeTeleport2", false);
                myEditor.addTeleport(625, 225, "holeTeleport1", false);
                myEditor.addTeleport(1225, 225, "holeTeleport5", false);
                myEditor.addTeleport(625, 0, "holeTeleport8", false);
            }
            if (level == 8) {
                manager.arrayNeedNum = [1, 2, 3, 7, 8, 9];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [4, 5, 6];
                manager.createPlayer(37.75, 150.25);
                myEditor.addDecor(525, 25, "elmore1", false);
                myEditor.addDecor(1425, 25, "elmore1", false);
                myEditor.addDecor(337.5, 62.5, "bebedero", false);
                myEditor.addDecor(950, 87.5, "cuadro2", false);
                myEditor.addDecor(50, 87.5, "cuadro2", false);
                myEditor.addDecor(425, 87.5, "cuadro3", false);
                myEditor.addDecor(1325, 87.5, "cuadro3", false);
                myEditor.addDecor(850, 87.5, "bebedero", false);
                myEditor.addDecor(1237.5, 62.5, "bebedero", false);
                myEditor.addExitDoor(1712.5, 150, "door", false);
                myEditor.addStar(1050, 50, "star", false);
                myEditor.addStar(1650, 50, "star", false);
                myEditor.addStar(450, 50.05, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(800, 200, "wallblocky2", false);
                myEditor.addWall(675, 200, "wallblocky3", false);
                myEditor.addWall(200, 225, "wallblocky5", false);
                myEditor.addWall(550, 100, "wallblockx4", false);
                myEditor.addWall(550, 200, "wallblocky5", false);
                myEditor.addWall(575, 200, "wallblocky5", false);
                myEditor.addWall(600, 200, "wallblocky5", false);
                myEditor.addWall(625, 200, "wallblocky5", false);
                myEditor.addWall(725, 125, "wallblockx2", false);
                myEditor.addWall(725, 200, "wallblocky4", false);
                myEditor.addWall(25, 225, "wallblocky3", false);
                myEditor.addWall(50, 225, "wallblocky3", false);
                myEditor.addWall(0, 225, "wallblocky3", false);
                myEditor.addWall(125, 200, "wallblocky3", false);
                myEditor.addWall(150, 200, "wallblocky3", false);
                myEditor.addWall(100, 200, "wallblocky3", false);
                myEditor.addWall(275, 200, "wallblocky3", false);
                myEditor.addWall(300, 200, "wallblocky3", false);
                myEditor.addWall(250, 200, "wallblocky3", false);
                myEditor.addWall(325, 200, "wallblocky3", false);
                myEditor.addWall(350, 200, "wallblocky3", false);
                myEditor.addWall(400, 175, "wallblockx2", false);
                myEditor.addWall(400, 225, "wallblocky3", false);
                myEditor.addWall(425, 225, "wallblocky3", false);
                myEditor.addWall(475, 125, "wallblockx2", false);
                myEditor.addWall(475, 225, "wallblocky5", false);
                myEditor.addWall(500, 225, "wallblocky5", false);
                myEditor.addWall(750, 200, "wallblocky4", false);
                myEditor.addWall(825, 200, "wallblocky2", false);
                myEditor.addWall(850, 200, "wallblocky2", false);
                myEditor.addWall(875, 200, "wallblocky2", false);
                myEditor.addWall(900, 200, "wallblocky2", false);
                myEditor.addWall(925, 200, "wallblocky2", false);
                myEditor.addWall(950, 200, "wallblocky2", false);
                myEditor.addWall(1000, 200, "wallblocky3", false);
                myEditor.addWall(1025, 200, "wallblocky3", false);
                myEditor.addWall(1050, 200, "wallblocky3", false);
                myEditor.addWall(1100, 200, "wallblocky4", false);
                myEditor.addWall(1150, 225, "wallblocky4", false);
                myEditor.addWall(1175, 225, "wallblocky4", false);
                myEditor.addWall(1200, 225, "wallblocky4", false);
                myEditor.addWall(1225, 225, "wallblocky4", false);
                myEditor.addWall(1250, 225, "wallblocky4", false);
                myEditor.addWall(1300, 175, "wallblockx2", false);
                myEditor.addWall(1300, 200, "wallblocky2", false);
                myEditor.addWall(1325, 200, "wallblocky2", false);
                myEditor.addWall(1375, 125, "wallblockx2", false);
                myEditor.addWall(1375, 225, "wallblocky5", false);
                myEditor.addWall(1400, 225, "wallblocky5", false);
                myEditor.addWall(1450, 100, "wallblockx4", false);
                myEditor.addWall(1450, 200, "wallblocky5", false);
                myEditor.addWall(1475, 200, "wallblocky5", false);
                myEditor.addWall(1500, 200, "wallblocky5", false);
                myEditor.addWall(1525, 200, "wallblocky5", false);
                myEditor.addWall(1625, 125, "wallblockx2", false);
                myEditor.addWall(1625, 225, "wallblocky5", false);
                myEditor.addWall(1650, 225, "wallblocky5", false);
                myEditor.addWall(1575, 250, "wallblocky5", false);
                myEditor.addWall(1700, 175, "wallblockx4", false);
                myEditor.addWall(1800, 200, "wallblocky8", false);
                myEditor.addWall(1700, 200, "wallblocky2", false);
                myEditor.addWall(1725, 200, "wallblocky2", false);
                myEditor.addWall(1750, 200, "wallblocky2", false);
                myEditor.addWall(1775, 200, "wallblocky2", false);
                myEditor.addHole(75.25, 200, "pit", false);
                myEditor.addHole(175, 199.75, "pit", false);
                myEditor.addHole(225.25, 200, "pit", false);
                myEditor.addHole(375, 200, "pit", false);
                myEditor.addHole(450.25, 199.75, "pit", false);
                myEditor.addHole(525, 200, "pit", false);
                myEditor.addHole(650, 200, "pit", false);
                myEditor.addHole(700, 200.25, "pit", false);
                myEditor.addHole(775, 200, "pit", false);
                myEditor.addHole(975, 200, "pit", false);
                myEditor.addHole(1075, 200, "pit", false);
                myEditor.addHole(1125, 200, "pit", false);
                myEditor.addHole(1275, 200, "pit", false);
                myEditor.addHole(1350, 200, "pit", false);
                myEditor.addHole(1425, 200, "pit", false);
                myEditor.addHole(1550, 200, "pit", false);
                myEditor.addHole(1600, 200, "pit", false);
                myEditor.addHole(1675, 200, "pit", false);
            }
            if (level == 9) {
                manager.arrayNeedNum = [1, 7, 6];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(25, 175);
                myEditor.addDecor(305, 112.5, "casilleros", false);
                myEditor.addDecor(591.05, 112.5, "casilleros", false);
                myEditor.addDecor(837.3, 87.5, "cuadro1", false);
                myEditor.addDecor(707.3, 88.35, "cartel salida", false);
                myEditor.addDecor(38, 112.5, "bebedero", false);
                myEditor.addDecor(263.3, 150, "calcomania1", false);
                myEditor.addDecor(550, 100, "calcomania2", false);
                myEditor.addDecor(150, 125, "cuadro2", false);
                myEditor.addStar(350, 50, "star", false);
                myEditor.addStar(837.75, 25, "star", false);
                myEditor.addExitDoor(712.5, 175, "door", false);
                myEditor.addWall(0, 200, "wallblockx4", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(200, 200, "wallblockx4", false);
                myEditor.addWall(100, 100, "wallblockx4", false);
                myEditor.addWall(300, 200, "wallblockx24", false);
                myEditor.addWall(400, 100, "wallblockx4", false);
                myEditor.addLadder(212.5, 175, "ladderX4", false);
                myEditor.addStar(450, 136, "star", false);
                myEditor.addLadder(87.5, 175, "ladderX4", false);
                myEditor.addTeleportDoor(150, 75, "puerta1", false);
                myEditor.addTeleportDoor(450, 75, "puerta2", false);
                myEditor.addSpike(350, 175, "spikeX3", false, 0);
                myEditor.addSpike(475, 175, "spikeX3", false, 0);
                myEditor.addHole(100, 200, "pit", false);
                myEditor.addHole(125, 200, "pit", false);
                myEditor.addHole(150, 200, "pit", false);
                myEditor.addHole(175, 200, "pit", false);
                myEditor.addBox(487.5, 75, "box", false);
                myEditor.addBox(662.5, 175, "box", false);
                myEditor.addBox(837.5, 175, "box", false);
            }
            if (level == 10) {
                manager.arrayNeedNum = [3, 2, 5, 8, 1];
                manager.ArrayFlipCamX = [3];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(150, 100);
                myEditor.addDecor(1475, 112.5, "casilleros", false);
                myEditor.addDecor(1050, 112.5, "casilleros", false);
                myEditor.addDecor(200, 150, "calcomania2", false);
                myEditor.addDecor(450, 121, "cuadro1", false);
                myEditor.addDecor(700.3, 88, "cuadro2", false);
                myEditor.addDecor(1425, 100, "calcomania2", false);
                myEditor.addDecor(25, 112.5, "casilleros", false);
                myEditor.addWall(750, 175, "wallblockx4", false);
                myEditor.addExitDoor(1312.5, 175, "door", false);
                myEditor.addStar(1100, 50, "star", false);
                myEditor.addStar(800, 50, "star", false);
                myEditor.addWall(525, 200, "wallblockx4", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(275, 200, "wallblockx4", false);
                myEditor.addStar(450, 150, "star", false);
                myEditor.addWall(1200, 200, "wallblockx12", false);
                myEditor.addWall(750, 150, "wallblockx4", false);
                myEditor.addWall(875, 25, "wallblockx4", false);
                myEditor.addWall(1500, 200, "wallblocky8", false);
                myEditor.addWall(725, 200, "wallblocky8", false);
                myEditor.addTeleportDoor(800, 125, "puerta1", false);
                myEditor.addTeleportDoor(450, 74.5, "puerta2", false);
                myEditor.addWall(600, 200, "wallblocky8", false);
                myEditor.addWall(625, 200, "wallblocky8", false);
                myEditor.addWall(650, 200, "wallblocky8", false);
                myEditor.addWall(850, 200, "wallblocky8", false);
                myEditor.addWall(825, 200, "wallblocky8", false);
                myEditor.addWall(875, 200, "wallblocky8", false);
                myEditor.addWall(125, 125, "wallblockx2", false);
                myEditor.addWall(125, 200, "wallblocky4", false);
                myEditor.addWall(150, 200, "wallblocky4", false);
                myEditor.addWall(425, 200, "wallblockx2", false);
                myEditor.addWall(375, 100, "wallblockx6", false);
                myEditor.addWall(750, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblockx12", false);
                myEditor.addWall(1025, 25, "wallblockx2", false);
                myEditor.addWall(775, 175, "wallblocky2", false);
                myEditor.addWall(800, 175, "wallblocky2", false);
                myEditor.addSpike(1075, 175, "spike", false, 0);
                myEditor.addSpike(1100, 175, "spike", false, 0);
                myEditor.addBox(62.5, 175.5, "box", false);
                myEditor.addBox(1012.5, 175, "box", false);
                myEditor.addBox(1437.5, 175, "box", false);
                myEditor.addTeleport(325, 200, "holeTeleport1", false);
                myEditor.addTeleport(625, 0, "holeTeleport2", false);
                myEditor.addTeleport(625, 200, "holeTeleport3", false);
                myEditor.addTeleport(925, 0, "holeTeleport4", false);
            }
            if (level == 11) {
                manager.arrayNeedNum = [4, 5, 6, 2];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [2];
                manager.createPlayer(29.4, 175);
                myEditor.addTeleportDoor(1050, 125, "puerta2", false);
                myEditor.addTeleportDoor(750, 50, "puerta1", false);
                myEditor.addDecor(50, 112.5, "bebedero", false);
                myEditor.addDecor(786.3, 175, "calcomania2", false);
                myEditor.addDecor(808.3, 87.35, "cartel salida", false);
                myEditor.addDecor(672.3, 87.5, "cuadro2", false);
                myEditor.addDecor(225.35, 87.5, "cuadro3", false);
                myEditor.addDecor(1191.1, 112.5, "casilleros", false);
                myEditor.addDecor(950, 112.5, "bebedero", false);
                myEditor.addDecor(450, 92, "elmore2", false);
                myEditor.addWall(175, 25, "wallblockx6", false);
                myEditor.addWall(-25, 25, "wallblockx6", false);
                myEditor.addStar(150, 25, "star", false);
                myEditor.addWall(850, 25, "wallblockx2", false);
                myEditor.addExitDoor(812.5, 175, "door", false);
                myEditor.addWall(200, 200, "wallblockx4", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addStar(450, 25, "star", false);
                myEditor.addStar(450, 175, "star", false);
                myEditor.addWall(1025, 150, "wallblockx2", false);
                myEditor.addWall(900, 200, "wallblockx4", false);
                myEditor.addWall(125, 150, "wallblockx2", false);
                myEditor.addWall(125, 75, "wallblockx2", false);
                myEditor.addWall(75, 225, "wallblockx2", false);
                myEditor.addWall(175, 225, "wallblockx2", false);
                myEditor.addWall(0, 200, "wallblockx4", false);
                myEditor.addWall(275, 200, "wallblocky3", false);
                myEditor.addWall(275, 75, "wallblocky3", false);
                myEditor.addWall(300, 75, "wallblockx12", false);
                myEditor.addWall(300, 150, "wallblockx12", false);
                myEditor.addWall(300, 200, "wallblocky3", false);
                myEditor.addWall(325, 200, "wallblocky3", false);
                myEditor.addWall(350, 200, "wallblocky3", false);
                myEditor.addWall(375, 200, "wallblocky3", false);
                myEditor.addWall(400, 200, "wallblocky3", false);
                myEditor.addWall(475, 200, "wallblocky3", false);
                myEditor.addWall(500, 200, "wallblocky3", false);
                myEditor.addWall(525, 200, "wallblocky3", false);
                myEditor.addWall(550, 200, "wallblocky3", false);
                myEditor.addWall(575, 200, "wallblocky3", false);
                myEditor.addWall(275, 75, "wallblocky3", false);
                myEditor.addWall(300, 75, "wallblocky3", false);
                myEditor.addWall(325, 75, "wallblocky3", false);
                myEditor.addWall(350, 75, "wallblocky3", false);
                myEditor.addWall(375, 75, "wallblocky3", false);
                myEditor.addWall(400, 75, "wallblocky3", false);
                myEditor.addWall(475, 75, "wallblocky3", false);
                myEditor.addWall(500, 75, "wallblocky3", false);
                myEditor.addWall(525, 75, "wallblocky3", false);
                myEditor.addWall(575, 25, "wallblockx6", false);
                myEditor.addWall(550, 75, "wallblocky3", false);
                myEditor.addWall(575, 75, "wallblocky3", false);
                myEditor.addWall(600, 200, "wallblockx4", false);
                myEditor.addWall(600, 75, "wallblocky3", false);
                myEditor.addWall(600, 200, "wallblocky3", false);
                myEditor.addWall(725, 150, "wallblockx2", false);
                myEditor.addWall(725, 75, "wallblockx2", false);
                myEditor.addWall(775, 25, "wallblockx4", false);
                myEditor.addWall(800, 200, "wallblockx4", false);
                myEditor.addWall(1100, 200, "wallblockx4", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addWall(700, 0, "wallblocky3", false);
                myEditor.addWall(775, 0, "wallblocky3", false);
                myEditor.addWall(400, 275, "wallblocky3", false);
                myEditor.addWall(475, 275, "wallblocky3", false);
                myEditor.addWall(400, 0, "wallblocky3", false);
                myEditor.addWall(475, 0, "wallblocky3", false);
                myEditor.addWall(675, 225, "wallblockx2", false);
                myEditor.addWall(775, 225, "wallblockx2", false);
                myEditor.addWall(100, 0, "wallblocky3", false);
                myEditor.addWall(175, 0, "wallblocky3", false);
                myEditor.addWall(900, 25, "wallblockx12", false);
                myEditor.addHole(1000, 200, "pit", false);
                myEditor.addHole(1025, 200, "pit", false);
                myEditor.addHole(1050, 200, "pit", false);
                myEditor.addHole(1075, 200, "pit", false);
                myEditor.addTeleport(25, 225, "holeTeleport1", false);
                myEditor.addTeleport(325, 0, "holeTeleport2", false);
                myEditor.addTeleport(325, 225, "holeTeleport3", false);
                myEditor.addTeleport(625, 0, "holeTeleport4", false);
                myEditor.addTeleport(625, 225, "holeTeleport5", false);
                myEditor.addTeleport(25, 0, "holeTeleport6", false);
            }
            if (level == 12) {
                manager.arrayNeedNum = [4, 5, 6, 2];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(150, 75);
                myEditor.addTutor(450, 177, "3");
                myEditor.addDecor(300, 112.5, "casilleros", false);
                myEditor.addDecor(600, 112.5, "casilleros", false);
                myEditor.addDecor(900, 112.5, "casilleros", false);
                myEditor.addDecor(1200, 112.5, "casilleros", false);
                myEditor.addDecor(0, 112.5, "casilleros", false);
                myEditor.addDecor(150, 119, "cuadro3", false);
                myEditor.addExitDoor(1012.5, 175, "door", false);
                myEditor.addStar(1137.5, 62.5, "star", false);
                myEditor.addStar(662.5, 25, "star", false);
                myEditor.addStar(237.5, 25, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblockx12", false);
                myEditor.addLadder(187.5, 175, "ladderX4", false);
                myEditor.addLadder(112.5, 175, "ladderX4", false);
                myEditor.addWall(125, 100, "wallblockx2", false);
                myEditor.addWall(0, 200, "wallblockx36", false);
                myEditor.addWall(425, 100, "wallblockx2", false);
                myEditor.addLadder(787.5, 175, "ladderX4", false);
                myEditor.addLadder(712.5, 175, "ladderX4", false);
                myEditor.addWall(725, 100, "wallblockx2", false);
                myEditor.addWall(50, 175, "solidinmovilA", false, "A");
                myEditor.addWall(225, 175, "solidinmovilA", false, "A");
                myEditor.addWall(950, 150, "solidinmovilA", false, "A");
                myEditor.addWall(950, 125, "solidinmovilA", false, "A");
                myEditor.addWall(1125, 150, "solidinmovilB", false, "B");
                myEditor.addCrank(437.5, 75, "crankA", true, "A");
                myEditor.addButton(25, 175.05, "pulsadorB", false, "B");
                myEditor.addButton(675, 175.05, "pulsadorD", false, "D");
                myEditor.addWall(1125, 125, "solidinmovilB", false, "B");
                myEditor.addLadder(487.5, 174.95, "ladderDX4", true, "D");
                myEditor.addLadder(412.45, 175, "ladderDX4", true, "D");
                myEditor.addWall(950, 200, "wallblocky2", false);
                myEditor.addWall(1125, 200, "wallblocky2", false);
                myEditor.addWall(825, 200, "wallblocky2", false);
                myEditor.addWall(650, 200, "wallblocky2", false);
                myEditor.addWall(350, 200, "wallblocky2", false);
                myEditor.addWall(525, 200, "wallblocky2", false);
                myEditor.addDecor(750, 119, "cuadro1", false);
                myEditor.addDecor(634.3, 133.35, "calcomania2", false);
                myEditor.addDecor(250, 100, "calcomania1", false);
                myEditor.addBox(762.5, 75, "box", false);
                myEditor.addBox(162.5, 175, "box", false);
            }
            if (level == 13) {
                manager.arrayNeedNum = [2, 5, 8];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(75, 175);
                myEditor.addDecor(87.5, 112.5, "bebedero", false);
                myEditor.addDecor(450, 43.35, "elmore1", false);
                myEditor.addDecor(450, 150, "cuadro2", false);
                myEditor.addWall(25, 25, "wallblockx4", false);
                myEditor.addStar(150, 50, "star", false);
                myEditor.addWall(25, 200, "wallblockx4", false);
                myEditor.addWall(0, 200, "wallblocky8", false);
                myEditor.addStar(525, 150, "star", false);
                myEditor.addStar(375, 150, "star", false);
                myEditor.addWall(400, 125, "wallblockx4", false);
                myEditor.addWall(175, 25, "wallblockx4", false);
                myEditor.addWall(625, 200, "wallblockx4", false);
                myEditor.addWall(775, 200, "wallblockx4", false);
                myEditor.addWall(875, 200, "wallblocky8", false);
                myEditor.addWall(325, 25, "wallblockx4", false);
                myEditor.addWall(25, 200, "wallblocky8", false);
                myEditor.addWall(175, 200, "wallblockx4", false);
                myEditor.addWall(250, 200, "wallblocky8", false);
                myEditor.addWall(275, 200, "wallblocky8", false);
                myEditor.addWall(300, 200, "wallblocky8", false);
                myEditor.addWall(325, 200, "wallblocky8", false);
                myEditor.addWall(475, 25, "wallblockx4", false);
                myEditor.addWall(550, 200, "wallblocky8", false);
                myEditor.addWall(575, 200, "wallblocky8", false);
                myEditor.addWall(600, 200, "wallblocky8", false);
                myEditor.addWall(625, 200, "wallblocky8", false);
                myEditor.addWall(850, 200, "wallblocky8", false);
                myEditor.addWall(875, 200, "wallblocky8", false);
                myEditor.addButton(425, 100, "pulsadorE", false, "E");
                myEditor.addExitDoor(175, 175, "exitLevelE", true, "E");
                myEditor.addDecor(684.3, 156.35, "calcomania2", false);
                myEditor.addDecor(700, 137.35, "calcomania1", false);
                myEditor.addWall(650, 100, "solidinmovilE", true, "E");
                myEditor.addWall(675, 100, "solidinmovilE", true, "E");
                myEditor.addWall(700, 100, "solidinmovilE", true, "E");
                myEditor.addWall(725, 100, "solidinmovilE", true, "E");
                myEditor.addWall(750, 100, "solidinmovilE", true, "E");
                myEditor.addWall(775, 100, "solidinmovilE", true, "E");
                myEditor.addWall(800, 100, "solidinmovilE", true, "E");
                myEditor.addWall(825, 100, "solidinmovilE", true, "E");
                myEditor.addSpike(650, 75, "spikeE", true, 0, "E");
                myEditor.addSpike(675, 75, "spikeE", true, 0, "E");
                myEditor.addSpike(700, 75, "spikeE", true, 0, "E");
                myEditor.addSpike(725, 75, "spikeE", true, 0, "E");
                myEditor.addSpike(750, 75, "spikeE", true, 0, "E");
                myEditor.addSpike(775, 75, "spikeE", true, 0, "E");
                myEditor.addSpike(800, 75, "spikeE", true, 0, "E");
                myEditor.addSpike(825, 75, "spikeE", true, 0, "E");
                myEditor.addBox(812.5, 175, "box", false);
                myEditor.addTeleport(25, 225, "holeTeleport1", false);
                myEditor.addTeleport(325, 0, "holeTeleport2", false);
                myEditor.addTeleport(325, 225, "holeTeleport3", false);
                myEditor.addTeleport(625, 0, "holeTeleport4", false);
                myEditor.addTeleport(625, 225, "holeTeleport5", false);
                myEditor.addTeleport(25, 0, "holeTeleport6", false);
            }
            if (level == 14) {
                manager.arrayNeedNum = [2, 6, 5, 8, 4];
                manager.ArrayFlipCamX = [5];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(29.4, 175);
                myEditor.addDecor(337.5, 112.5, "bebedero", false);
                myEditor.addDecor(1237.5, 112.5, "bebedero", false);
                myEditor.addDecor(1349.95, 25, "elmore2", false);
                myEditor.addStar(150, 50, "star", false);
                myEditor.addWall(875, 25, "wallblockx6", false);
                myEditor.addWall(525, 200, "wallblockx4", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addStar(562.95, 150, "star", false);
                myEditor.addWall(1500, 200, "wallblocky8", false);
                myEditor.addWall(700, 75, "wallblockx2", false);
                myEditor.addWall(700, 200, "wallblocky8", false);
                myEditor.addWall(600, 200, "wallblocky8", false);
                myEditor.addWall(625, 200, "wallblocky8", false);
                myEditor.addWall(650, 200, "wallblocky8", false);
                myEditor.addWall(850, 200, "wallblocky8", false);
                myEditor.addWall(825, 200, "wallblocky8", false);
                myEditor.addWall(875, 200, "wallblocky8", false);
                myEditor.addWall(325, 200, "wallblockx2", false);
                myEditor.addWall(750, 150, "wallblockx2", false);
                myEditor.addWall(800, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblockx12", false);
                myEditor.addWall(50, 100, "solidinmovil", false);
                myEditor.addWall(-25, 200, "wallblockx6", false);
                myEditor.addWall(175, 200, "wallblockx6", false);
                myEditor.addWall(225, 100, "solidinmovil", false);
                myEditor.addWall(375, 150, "wallblockx2", false);
                myEditor.addWall(475, 150, "wallblockx2", false);
                myEditor.addWall(425, 100, "wallblockx2", false);
                myEditor.addWall(675, 200, "wallblocky8", false);
                myEditor.addWall(775, 200, "wallblocky8", false);
                myEditor.addWall(1425, 200, "wallblockx4", false);
                myEditor.addStar(1462.95, 150, "star", false);
                myEditor.addWall(1275, 150, "wallblockx2", false);
                myEditor.addWall(1375, 150, "wallblockx2", false);
                myEditor.addWall(1325, 100, "wallblockx2", false);
                myEditor.addWall(1175, 200, "wallblockx4", false);
                myEditor.addDecor(975, 87.5, "cuadro1", false);
                myEditor.addDecor(1125, 87.5, "cuadro2", false);
                myEditor.addDecor(150, 87.5, "cuadro3", false);
                myEditor.addWall(100, 100, "solidinmovil", false);
                myEditor.addWall(175, 100, "solidinmovil", false);
                myEditor.addDecor(450, 25, "elmore1", false);
                myEditor.addLadder(87.5, 175, "ladderDX4", true, "D");
                myEditor.addLadder(212.5, 175, "ladderDX4", true, "D");
                myEditor.addCrank(1337.5, 75, "crankE", true, "E");
                myEditor.addCrank(437.5, 75, "crankD", true, "D");
                myEditor.addWall(1075, 25, "wallblockx2", false);
                myEditor.addExitDoor(1012.5, 175, "exitLevelE", true, "E");
                myEditor.addWall(175, 250, "wallblocky2", false);
                myEditor.addWall(100, 250, "wallblocky2", false);
                myEditor.addWall(1000, 0, "wallblocky2", false);
                myEditor.addWall(1075, 0, "wallblocky2", false);
                myEditor.addWall(1100, 25, "wallblockx4", false);
                myEditor.addSpike(725, 50, "spike", false, 0);
                myEditor.addSpike(750, 125, "spike", false, 0);
                myEditor.addHole(375, 200, "pit", false);
                myEditor.addHole(400, 200, "pit", false);
                myEditor.addHole(425, 200, "pit", false);
                myEditor.addHole(450, 200, "pit", false);
                myEditor.addHole(475, 200, "pit", false);
                myEditor.addHole(500, 200, "pit", false);
                myEditor.addHole(1275, 200, "pit", false);
                myEditor.addHole(1300, 200, "pit", false);
                myEditor.addHole(1325, 200, "pit", false);
                myEditor.addHole(1350, 200, "pit", false);
                myEditor.addHole(1375, 200, "pit", false);
                myEditor.addHole(1400, 200, "pit", false);
                myEditor.addTeleport(25, 225, "holeTeleport1", false);
                myEditor.addTeleport(925, 0, "holeTeleport2", false);
            }
            if (level == 15) {
                manager.arrayNeedNum = [3, 9, 1, 7];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [2, 4];
                manager.createPlayer(1050, 175);
                myEditor.addDecor(600.05, 25, "elmore1", false);
                myEditor.addDecor(1125, 112.25, "bebedero", false);
                myEditor.addDecor(900, 112.5, "casilleros", false);
                myEditor.addDecor(300, 112.5, "casilleros", false);
                myEditor.addDecor(850, 100, "calcomania2", false);
                myEditor.addStar(625, 50, "star", false);
                myEditor.addExitDoor(37.5, 175, "door", false);
                myEditor.addStar(150, 50, "star", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addWall(275, 200, "wallblockx4", false);
                myEditor.addWall(825, 200, "wallblockx4", false);
                myEditor.addStar(1050, 50, "star", false);
                myEditor.addWall(675, 125, "wallblockx2", false);
                myEditor.addTeleportDoor(700, 100, "puerta1", false);
                myEditor.addWall(475, 125, "wallblockx2", false);
                myEditor.addTeleportDoor(500, 100, "puerta2", false);
                myEditor.addWall(475, 200, "wallblockx6", false);
                myEditor.addWall(500, 200, "wallblocky4", false);
                myEditor.addWall(475, 200, "wallblocky4", false);
                myEditor.addWall(375, 150, "wallblockx2", false);
                myEditor.addWall(375, 200, "wallblocky3", false);
                myEditor.addWall(-25, 0, "wallblocky3", false);
                myEditor.addWall(575, 200, "wallblockx6", false);
                myEditor.addWall(700, 200, "wallblocky4", false);
                myEditor.addWall(675, 200, "wallblocky4", false);
                myEditor.addWall(400, 200, "wallblocky3", false);
                myEditor.addWall(775, 150, "wallblockx2", false);
                myEditor.addWall(775, 200, "wallblocky3", false);
                myEditor.addWall(800, 200, "wallblocky3", false);
                myEditor.addWall(900, 200, "wallblockx12", false);
                myEditor.addWall(125, 100, "wallblockx2", false);
                myEditor.addWall(1025, 100, "wallblockx2", false);
                myEditor.addWall(975, 150, "solidinmovilD", true, "D");
                myEditor.addWall(1100, 150, "solidinmovilD", true, "D");
                myEditor.addCrank(137.5, 175, "crankD", true, "D");
                myEditor.addWall(400, 275, "wallblocky3", false);
                myEditor.addWall(475, 275, "wallblocky3", false);
                myEditor.addWall(100, 0, "wallblocky3", false);
                myEditor.addWall(175, 0, "wallblocky3", false);
                myEditor.addWall(550, 100, "solidinmovilD", true, "D");
                myEditor.addWall(575, 100, "solidinmovilD", true, "D");
                myEditor.addWall(600, 100, "solidinmovilD", true, "D");
                myEditor.addWall(625, 100, "solidinmovilD", true, "D");
                myEditor.addSpike(525, 175, "spikeX3", false, 0);
                myEditor.addSpike(600, 175, "spikeX3", false, 0);
                myEditor.addHole(725, 199.95, "pit", false);
                myEditor.addHole(750, 199.95, "pit", false);
                myEditor.addTeleport(325, 225, "holeTeleport1", false);
                myEditor.addTeleport(25, 0, "holeTeleport2", false);
            }
            if (level == 16) {
                manager.arrayNeedNum = [8, 7, 5, 9, 2];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(150, 175);
                myEditor.addDecor(300, 112.5, "casilleros", false);
                myEditor.addDecor(1200, 112.5, "casilleros", false);
                myEditor.addDecor(350, 100, "calcomania1", false);
                myEditor.addDecor(750, 19.35, "elmore2", false);
                myEditor.addDecor(600, 112.5, "casilleros", false);
                myEditor.addDecor(900, 112.5, "casilleros", false);
                myEditor.addDecor(0, 112.5, "casilleros", false);
                myEditor.addDecor(1500, 112.5, "casilleros", false);
                myEditor.addStar(1350, 25, "star", false);
                myEditor.addStar(1050, 150, "star", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(475, 200, "wallblockx6", false);
                myEditor.addWall(400, 125, "wallblockx4", false);
                myEditor.addStar(450, 150, "star", false);
                myEditor.addWall(1200, 200, "wallblockx12", false);
                myEditor.addWall(800, 200, "wallblockx4", false);
                myEditor.addWall(1500, 200, "wallblocky8", false);
                myEditor.addWall(125, 75, "wallblockx2", false);
                myEditor.addWall(475, 200, "wallblocky4", false);
                myEditor.addWall(50, 125, "wallblockx2", false);
                myEditor.addWall(200, 125, "wallblockx2", false);
                myEditor.addWall(275, 200, "wallblockx6", false);
                myEditor.addWall(400, 200, "wallblocky4", false);
                myEditor.addWall(600, 200, "wallblockx4", false);
                myEditor.addWall(700, 75, "wallblockx4", false);
                myEditor.addWall(1075.25, 200, "wallblockx6", false);
                myEditor.addWall(1000.25, 125, "wallblockx4", false);
                myEditor.addWall(1075.25, 200, "wallblocky4", false);
                myEditor.addWall(875.25, 200, "wallblockx6", false);
                myEditor.addWall(1000.25, 200, "wallblocky4", false);
                myEditor.addWall(1150, 0, "wallblockx6", false);
                myEditor.addWall(1400, 0, "wallblockx6", false);
                myEditor.addWall(575, 5, "wallblockx6", false);
                myEditor.addWall(775, 5, "wallblockx6", false);
                myEditor.addWall(1000, 300, "wallblocky4", false);
                myEditor.addWall(1075, 300, "wallblocky4", false);
                myEditor.addWall(400, 300, "wallblocky4", false);
                myEditor.addWall(475, 300, "wallblocky4", false);
                myEditor.addWall(675, 300, "wallblocky4", false);
                myEditor.addWall(800, 300, "wallblocky4", false);
                myEditor.addWall(700, -25, "wallblocky2", false);
                myEditor.addWall(775, -25, "wallblocky2", false);
                myEditor.addWall(1275, -25, "wallblocky2", false);
                myEditor.addWall(1400, -25, "wallblocky2", false);
                myEditor.addWall(100, -25, "wallblocky2", false);
                myEditor.addWall(175, -25, "wallblocky2", false);
                myEditor.addDecor(750, 103, "cuadro2", false);
                myEditor.addCrank(437.5, 100, "crankD", true, "D");
                myEditor.addCrank(1037.5, 100, "crankE", true, "E");
                myEditor.addExitDoor(1312.5, 175, "exitLevelE", true, "E");
                myEditor.addLadder(687.5, 175, "ladderDX5", true, "D");
                myEditor.addLadder(812.45, 175, "ladderDX5", true, "D");
                myEditor.addWall(-25, 5, "wallblockx6", false);
                myEditor.addWall(175, 5, "wallblockx6", false);
                myEditor.addBox(362.5, 175, "box", false);
                myEditor.addBox(537.5, 175, "box", false);
                myEditor.addBox(962.5, 175, "box", false);
                myEditor.addBox(1137.5, 175, "box", false);
                myEditor.addTeleport(325, 225, "holeTeleport1", false);
                myEditor.addTeleport(25, 0, "holeTeleport2", false);
                myEditor.addTeleport(925, 225, "holeTeleport3", false);
                myEditor.addTeleport(625, 0, "holeTeleport4", false);
                myEditor.addTeleport(625, 225, "holeTeleport5", false);
                myEditor.addTeleport(1225, 0, "holeTeleport6", false);
            }
            if (level == 17) {
                manager.arrayNeedNum = [8, 5, 2, 1, 3];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(662.5, 175);
                myEditor.addDecor(662.5, 112.5, "bebedero", false);
                myEditor.addDecor(837.5, 112.5, "bebedero", false);
                myEditor.addDecor(845.3, 106.35, "calcomania2", false);
                myEditor.addDecor(750, 87.5, "cuadro2", false);
                myEditor.addDecor(151.5, 87.5, "cuadro3", false);
                myEditor.addDecor(237.5, 112.5, "bebedero", false);
                myEditor.addWall(-25, 25, "wallblockx6", false);
                myEditor.addExitDoor(25, 175, "door", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(775, 200, "wallblockx6", false);
                myEditor.addWall(900, 75, "wallblockx12", false);
                myEditor.addWall(900, 150, "wallblockx12", false);
                myEditor.addWall(900, 200, "wallblocky3", false);
                myEditor.addWall(925, 200, "wallblocky3", false);
                myEditor.addWall(950, 200, "wallblocky3", false);
                myEditor.addWall(975, 200, "wallblocky3", false);
                myEditor.addWall(1000, 200, "wallblocky3", false);
                myEditor.addWall(1075, 200, "wallblocky3", false);
                myEditor.addWall(1100, 200, "wallblocky3", false);
                myEditor.addWall(1125, 200, "wallblocky3", false);
                myEditor.addWall(1150, 200, "wallblocky3", false);
                myEditor.addWall(1175, 200, "wallblocky3", false);
                myEditor.addWall(900, 75, "wallblocky3", false);
                myEditor.addWall(925, 75, "wallblocky3", false);
                myEditor.addWall(950, 75, "wallblocky3", false);
                myEditor.addWall(975, 75, "wallblocky3", false);
                myEditor.addWall(1000, 75, "wallblocky3", false);
                myEditor.addWall(1075, 75, "wallblocky3", false);
                myEditor.addWall(1100, 75, "wallblocky3", false);
                myEditor.addWall(1125, 75, "wallblocky3", false);
                myEditor.addWall(1150, 75, "wallblocky3", false);
                myEditor.addWall(1175, 75, "wallblocky3", false);
                myEditor.addWall(1200, 75, "wallblocky3", false);
                myEditor.addWall(1200, 200, "wallblocky3", false);
                myEditor.addWall(100, 0, "wallblocky3", false);
                myEditor.addWall(175, 0, "wallblocky3", false);
                myEditor.addWall(175, 25, "wallblockx6", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(300, 75, "wallblockx4", false);
                myEditor.addWall(300, 75, "wallblocky3", false);
                myEditor.addWall(325, 75, "wallblocky3", false);
                myEditor.addWall(350, 75, "wallblocky3", false);
                myEditor.addWall(375, 75, "wallblocky3", false);
                myEditor.addWall(300, 150, "wallblockx4", false);
                myEditor.addWall(300, 200, "wallblocky3", false);
                myEditor.addWall(325, 200, "wallblocky3", false);
                myEditor.addWall(350, 200, "wallblocky3", false);
                myEditor.addWall(375, 200, "wallblocky3", false);
                myEditor.addWall(500, 75, "wallblockx4", false);
                myEditor.addWall(500, 75, "wallblocky3", false);
                myEditor.addWall(525, 75, "wallblocky3", false);
                myEditor.addWall(550, 75, "wallblocky3", false);
                myEditor.addWall(575, 75, "wallblocky3", false);
                myEditor.addWall(500, 150, "wallblockx4", false);
                myEditor.addWall(500, 200, "wallblocky3", false);
                myEditor.addWall(575, 200, "wallblockx6", false);
                myEditor.addWall(525, 200, "wallblocky3", false);
                myEditor.addWall(550, 200, "wallblocky3", false);
                myEditor.addWall(575, 200, "wallblocky3", false);
                myEditor.addWall(400, 200, "wallblocky8", false);
                myEditor.addWall(475, 200, "wallblocky8", false);
                myEditor.addWall(600, 25, "wallblockx12", false);
                myEditor.addWall(400, 275, "wallblocky3", false);
                myEditor.addWall(475, 275, "wallblocky3", false);
                myEditor.addWall(400, 0, "wallblocky3", false);
                myEditor.addWall(475, 0, "wallblocky3", false);
                myEditor.addWall(700, 275, "wallblocky3", false);
                myEditor.addWall(775, 275, "wallblocky3", false);
                myEditor.addWall(1200, 75, "wallblockx12", false);
                myEditor.addWall(1200, 150, "wallblockx12", false);
                myEditor.addWall(1200, 200, "wallblocky3", false);
                myEditor.addWall(1225, 200, "wallblocky3", false);
                myEditor.addWall(1250, 200, "wallblocky3", false);
                myEditor.addWall(1275, 200, "wallblocky3", false);
                myEditor.addWall(1300, 200, "wallblocky3", false);
                myEditor.addWall(1375, 200, "wallblocky3", false);
                myEditor.addWall(1400, 200, "wallblocky3", false);
                myEditor.addWall(1425, 200, "wallblocky3", false);
                myEditor.addWall(1450, 200, "wallblocky3", false);
                myEditor.addWall(1475, 200, "wallblocky3", false);
                myEditor.addWall(1200, 75, "wallblocky3", false);
                myEditor.addWall(1225, 75, "wallblocky3", false);
                myEditor.addWall(1250, 75, "wallblocky3", false);
                myEditor.addWall(1275, 75, "wallblocky3", false);
                myEditor.addWall(1300, 75, "wallblocky3", false);
                myEditor.addWall(1375, 75, "wallblocky3", false);
                myEditor.addWall(1400, 75, "wallblocky3", false);
                myEditor.addWall(1425, 75, "wallblocky3", false);
                myEditor.addWall(1450, 75, "wallblocky3", false);
                myEditor.addWall(1475, 75, "wallblocky3", false);
                myEditor.addWall(1500, 75, "wallblocky3", false);
                myEditor.addWall(1500, 200, "wallblocky3", false);
                myEditor.addWall(1500, 200, "wallblocky8", false);
                myEditor.addStar(375, 100, "starD", true, "D");
                myEditor.addStar(525, 100, "starD", true, "D");
                myEditor.addStar(1050, 100, "starD", true, "D");
                myEditor.addCrank(1337.5, 125, "crankD", true, "D");
                myEditor.addSpike(125, 175, "spike", false, 0);
                myEditor.addSpike(150, 175, "spike", false, 0);
                myEditor.addBox(237.5, 175, "box", false);
                myEditor.addTeleport(325, 225, "holeTeleport1", false);
                myEditor.addTeleport(25, 0, "holeTeleport2", false);
                myEditor.addTeleport(624.75, 225, "holeTeleport3", false);
                myEditor.addTeleport(325, 0, "holeTeleport4", false);
            }
            if (level == 18) {
                manager.arrayNeedNum = [4, 6, 5];
                manager.ArrayFlipCamX = [3];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(150, 175);
                myEditor.addDecor(850, 87.5, "cuadro3", false);
                myEditor.addDecor(650, 87.5, "cuadro2", false);
                myEditor.addDecor(450, 112.5, "bebedero", false);
                myEditor.addDecor(150, 112.5, "bebedero", false);
                myEditor.addDecor(300, 25, "elmore2", false);
                myEditor.addExitDoor(712.5, 175, "door", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(0, 200, "wallblockx36", false);
                myEditor.addWall(675, 200, "wallblocky3", false);
                myEditor.addWall(50, 150, "wallblockx3", false);
                myEditor.addWall(725, 50, "wallblockx2", false);
                myEditor.addWall(475, 150, "solidinmovilE", true, "E");
                myEditor.addWall(500, 150, "solidinmovilE", true, "E");
                myEditor.addWall(525, 150, "solidinmovilE", true, "E");
                myEditor.addButton(625, 175.05, "pulsadorE", false, "E");
                myEditor.addWall(175, 150, "wallblockx3", false);
                myEditor.addWall(75, 75, "solidinmovil", false);
                myEditor.addWall(350, 150, "wallblockx3", false);
                myEditor.addWall(375, 75, "solidinmovil", false);
                myEditor.addWall(800, 200, "wallblocky3", false);
                myEditor.addButton(75, 125, "pulsadorA", false, "A");
                myEditor.addButton(850, 175.05, "pulsadorB", false, "B");
                myEditor.addWall(500, 75, "solidinmovilA", false, "A");
                myEditor.addButton(500, 175, "pulsadorC", false, "C");
                myEditor.addStar(37.5, 100, "starC", false, "C");
                myEditor.addStar(562.5, 100, "starC", false, "C");
                myEditor.addStar(862.5, 100, "starC", false, "C");
                myEditor.addWall(200, 75, "solidinmovilA", false, "A");
                myEditor.addWall(675, 125, "solidinmovilB", false, "B");
                myEditor.addWall(675, 100, "solidinmovilB", false, "B");
                myEditor.addWall(800, 125, "solidinmovilB", false, "B");
                myEditor.addWall(800, 100, "solidinmovilB", false, "B");
                myEditor.addSpike(475, 175, "spike", false, 0);
                myEditor.addSpike(525, 175, "spike", false, 0);
                myEditor.addSpike(50, 175, "spikeX3", false, 0);
                myEditor.addSpike(175, 175, "spikeX3", false, 0);
                myEditor.addSpike(350, 175, "spikeX3", false, 0);
                myEditor.addBox(87.5, 50.05, "box", false);
                myEditor.addBox(837.5, 175, "box", false);
                myEditor.addBox(664, 175, "box", false);
                myEditor.addBox(512.5, 50, "box", false);
            }
            if (level == 19) {
                manager.arrayNeedNum = [7, 2, 9];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(562.5, 175);
                myEditor.addDecor(150, 112.5, "bebedero", false);
                myEditor.addDecor(489.3, 85.35, "calcomania1", false);
                myEditor.addDecor(508.3, 85.35, "calcomania2", false);
                myEditor.addDecor(600, 112.5, "casilleros", false);
                myEditor.addDecor(300.05, 112.5, "casilleros", false);
                myEditor.addDecor(75, 87.5, "cuadro1", false);
                myEditor.addWall(425, 75, "wallblockx2", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(600, 200, "wallblockx12", false);
                myEditor.addStar(450, 150, "star", false);
                myEditor.addStar(838, 25, "star", false);
                myEditor.addStar(63.25, 25, "star", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(375, 125, "wallblockx6", false);
                myEditor.addWall(425, 125, "wallblocky3", false);
                myEditor.addWall(450, 125, "wallblocky3", false);
                myEditor.addWall(50, 200, "wallblocky2", false);
                myEditor.addWall(825, 200, "wallblocky2", false);
                myEditor.addExitDoor(712.5, 175, "exitLevelE", true, "E");
                myEditor.addButton(850, 175, "pulsadorE", false, "E");
                myEditor.addButton(325, 175, "pulsadorA", false, "A");
                myEditor.addDecor(825, 87.5, "cuadro3", false);
                myEditor.addWall(300, 200, "wallblockx12", false);
                myEditor.addButton(75, 175, "pulsadorB", false, "B");
                myEditor.addSpike(375, 175, "spikeB", false, 0, "B");
                myEditor.addSpike(400, 175, "spikeB", false, 0, "B");
                myEditor.addSpike(425, 175, "spikeB", false, 0, "B");
                myEditor.addSpike(450, 175, "spikeB", false, 0, "B");
                myEditor.addSpike(475, 175, "spikeB", false, 0, "B");
                myEditor.addSpike(500, 175, "spikeB", false, 0, "B");
                myEditor.addBox(662.5, 175, "box", false);
                myEditor.addBox(412.5, 100, "box", false);
                myEditor.addBox(237.5, 175, "box", false);
                myEditor.addTv(0, 200, "tvNoiseA", false, "A");
            }
            if (level == 20) {
                manager.arrayNeedNum = [1, 5, 9];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(450, 175);
                myEditor.addDecor(450, 25, "elmore1", false);
                myEditor.addDecor(150, 87.5, "cuadro1", false);
                myEditor.addDecor(450, 112.5, "casilleros", false);
                myEditor.addDecor(62.5, 112.55, "bebedero", false);
                myEditor.addExitDoor(800, 175, "door", false);
                myEditor.addStar(450, 25, "star", false);
                myEditor.addStar(850, 25, "star", false);
                myEditor.addStar(50, 25, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addDecor(700, 150, "calcomania2", false);
                myEditor.addWall(0, 200, "wallblockx36", false);
                myEditor.addWall(325, 100, "wallblockx3", false);
                myEditor.addWall(425, 100, "wallblockx2", false);
                myEditor.addWall(500, 100, "wallblockx3", false);
                myEditor.addWall(200, 100, "wallblockx3", false);
                myEditor.addWall(725, 75, "wallblockx2", false);
                myEditor.addWall(625, 100, "solidinmovilD", true, "D");
                myEditor.addWall(650, 100, "solidinmovilD", true, "D");
                myEditor.addWall(675, 100, "solidinmovilD", true, "D");
                myEditor.addButton(650, 175.05, "pulsadorE", false, "E");
                myEditor.addButton(50, 175, "pulsadorD", false, "D");
                myEditor.addDecor(704.3, 129.35, "calcomania1", false);
                myEditor.addWall(725, 200, "wallblocky6", false);
                myEditor.addWall(750, 200, "wallblocky6", false);
                myEditor.addWall(125, 175, "solidinmovilE2x2", true, "E");
                myEditor.addBox(362.5, 175, "box", false);
                myEditor.addBox(537.5, 75, "box", false);
            }
            if (level == 21) {
                manager.arrayNeedNum = [6, 2, 5, 8, 4];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(750, 175);
                myEditor.addDecor(622.5, 112.5, "casilleros", false);
                myEditor.addDecor(877.5, 112.5, "casilleros", false);
                myEditor.addDecor(250, 112.5, "bebedero", false);
                myEditor.addDecor(1250, 112.5, "bebedero", false);
                myEditor.addDecor(350, 25, "elmore1", false);
                myEditor.addDecor(857.3, 116.35, "calcomania1", false);
                myEditor.addDecor(708.3, 87.35, "cartel salida", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(1500, 200, "wallblocky8", false);
                myEditor.addLadder(387.5, 175, "ladderX4", false);
                myEditor.addLadder(512.5, 175, "ladderX4", false);
                myEditor.addWall(600, 200, "wallblockx12", false);
                myEditor.addWall(100, 125, "wallblockx2", false);
                myEditor.addWall(1200, 200, "wallblockx6", false);
                myEditor.addWall(150, 200, "wallblocky3", false);
                myEditor.addWall(125, 200, "wallblocky4", false);
                myEditor.addWall(175, 200, "wallblocky2", false);
                myEditor.addWall(200, 200, "wallblockx4", false);
                myEditor.addWall(1350, 125, "wallblockx2", false);
                myEditor.addCrank(1362.5, 100, "crankA", true, "A");
                myEditor.addWall(1325, 200, "wallblocky3", false);
                myEditor.addWall(1350, 200, "wallblocky4", false);
                myEditor.addWall(1300, 200, "wallblocky2", false);
                myEditor.addWall(975, 150, "solidinmovilA", false, "A");
                myEditor.addWall(975, 175, "solidinmovilA", false, "A");
                myEditor.addWall(1100, 150, "solidinmovilA", false, "A");
                myEditor.addWall(1100, 175, "solidinmovilA", false, "A");
                myEditor.addWall(975, 125, "wallblockx6", false);
                myEditor.addButton(1250, 175, "pulsadorE", false, "E");
                myEditor.addCrank(1037.5, 100, "crankF", true, "F");
                myEditor.addExitDoor(712.5, 175, "exitLevelE", true, "E");
                myEditor.addStar(1050, 150, "starF", true, "F");
                myEditor.addStar(450, 50, "starF", true, "F");
                myEditor.addStar(450, 125, "starF", true, "F");
                myEditor.addWall(100, 200, "wallblocky4", false);
                myEditor.addWall(1375, 200, "wallblocky4", false);
                myEditor.addWall(900, 200, "wallblockx12", false);
                myEditor.addWall(300, 200, "wallblockx12", false);
                myEditor.addCrank(112.5, 100, "crankB", true, "B");
                myEditor.addWall(400, 100, "wallblockx4", false);
                myEditor.addSpike(400, 175, "spikeB", false, 0, "B");
                myEditor.addSpike(425, 175, "spikeB", false, 0, "B");
                myEditor.addSpike(450, 175, "spikeB", false, 0, "B");
                myEditor.addSpike(475, 175, "spikeB", false, 0, "B");
                myEditor.addHole(1400, 200, "pit", false);
                myEditor.addHole(1425, 200, "pit", false);
                myEditor.addHole(1450, 200, "pit", false);
                myEditor.addHole(1475, 200, "pit", false);
                myEditor.addHole(0, 200, "pit", false);
                myEditor.addHole(25, 200, "pit", false);
                myEditor.addHole(50, 200, "pit", false);
                myEditor.addHole(75, 200, "pit", false);
                myEditor.addBox(237.5, 175, "box", false);
            }
            if (level == 22) {
                manager.arrayNeedNum = [8, 2, 5];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(450, 175);
                myEditor.addDecor(750, 112.5, "bebedero", false);
                myEditor.addDecor(600, 112.5, "casilleros", false);
                myEditor.addDecor(300, 112.5, "casilleros", false);
                myEditor.addDecor(762.5, 112.45, "calcomania2", false);
                myEditor.addDecor(106, 87.5, "cartel salida", false);
                myEditor.addDecor(850, 87.5, "cuadro2", false);
                myEditor.addDecor(50, 87.5, "cuadro3", false);
                myEditor.addDecor(300, 25, "elmore1", false);
                myEditor.addDecor(600, 25, "elmore2", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addWall(375, 100, "solidinmovil", false);
                myEditor.addWall(0, 200, "wallblockx36", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(225, 175, "wallblockx6", false);
                myEditor.addWall(0, 175, "wallblockx3", false);
                myEditor.addWall(525, 175, "wallblockx6", false);
                myEditor.addWall(825, 175, "wallblockx3", false);
                myEditor.addWall(500, 100, "solidinmovil", false);
                myEditor.addLadder(412.5, 175, "ladderX4", false);
                myEditor.addLadder(487.5, 175, "ladderX4", false);
                myEditor.addButton(550, 150, "pulsadorB", false, "B");
                myEditor.addWall(775, 100, "solidinmovilB", false, "B");
                myEditor.addWall(650, 150, "solidinmovilD", true, "D");
                myEditor.addWall(825, 150, "solidinmovilD", true, "D");
                myEditor.addButton(250, 150, "pulsadorD", false, "D");
                myEditor.addExitDoor(112.5, 175, "door", false);
                myEditor.addStar(325, 25, "starF", true, "F");
                myEditor.addCrank(25, 150, "crankF", true, "F");
                myEditor.addStar(575, 25, "starF", true, "F");
                myEditor.addStar(750, 25, "starF", true, "F");
                myEditor.addCrank(850, 150, "crankA", true, "A");
                myEditor.addButton(325, 150, "pulsadorC", false, "C");
                myEditor.addWall(700, 100, "solidinmovilC", false, "C");
                myEditor.addWall(0, 200, "wallblocky2", false);
                myEditor.addWall(25, 200, "wallblocky2", false);
                myEditor.addWall(50, 200, "wallblocky2", false);
                myEditor.addWall(225, 200, "wallblocky2", false);
                myEditor.addWall(250, 200, "wallblocky2", false);
                myEditor.addWall(275, 200, "wallblocky2", false);
                myEditor.addWall(300, 200, "wallblocky2", false);
                myEditor.addWall(325, 200, "wallblocky2", false);
                myEditor.addWall(350, 200, "wallblocky2", false);
                myEditor.addWall(525, 200, "wallblocky2", false);
                myEditor.addWall(550, 200, "wallblocky2", false);
                myEditor.addWall(575, 200, "wallblocky2", false);
                myEditor.addWall(600, 200, "wallblocky2", false);
                myEditor.addWall(625, 200, "wallblocky2", false);
                myEditor.addWall(650, 200, "wallblocky2", false);
                myEditor.addWall(825, 200, "wallblocky2", false);
                myEditor.addWall(850, 200, "wallblocky2", false);
                myEditor.addWall(875, 200, "wallblocky2", false);
                myEditor.addWall(425, 100, "wallblockx2", false);
                myEditor.addSpike(200, 174.85, "spike", false, 0);
                myEditor.addSpike(75, 175, "spike", false, 0);
                myEditor.addSpike(675, 175, "spikeX3", false, 0);
                myEditor.addSpike(750, 175, "spikeX3", false, 0);
                myEditor.addBox(437.5, 75, "box", false);
                myEditor.addBox(462.5, 75, "box", false);
                myEditor.addBox(787.5, 75, "box", false);
                myEditor.addBox(712.5, 75, "box", false);
                myEditor.addTv(0, 200, "tvNoiseA", false, "A");
            }
            if (level == 23) {
                manager.arrayNeedNum = [1, 2, 8, 9];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [3, 4];
                manager.createPlayer(75, 175);
                myEditor.addDecor(75, 112.5, "bebedero", false);
                myEditor.addDecor(150, 87.5, "cuadro1", false);
                myEditor.addDecor(1050, 87.5, "cuadro2", false);
                myEditor.addDecor(600, 25, "elmore2", false);
                myEditor.addDecor(183.35, 157.3, "calcomania1", false);
                myEditor.addDecor(1016.3, 155.3, "calcomania2", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(300, 200, "wallblockx36", false);
                myEditor.addWall(1800, 200, "wallblocky8", false);
                myEditor.addWall(575, 125, "wallblockx2", false);
                myEditor.addWall(250, 125, "wallblockx3", false);
                myEditor.addButton(775, 175, "pulsadorD", false, "D");
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(200, 200, "wallblocky2", false);
                myEditor.addWall(225, 200, "wallblocky3", false);
                myEditor.addWall(250, 200, "wallblocky4", false);
                myEditor.addWall(275, 200, "wallblocky4", false);
                myEditor.addWall(300, 200, "wallblocky4", false);
                myEditor.addWall(575, 200, "wallblocky4", false);
                myEditor.addWall(600, 200, "wallblocky4", false);
                myEditor.addWall(975, 200, "wallblocky2", false);
                myEditor.addWall(950, 200, "wallblocky3", false);
                myEditor.addWall(900, 200, "wallblocky4", false);
                myEditor.addWall(925, 200, "wallblocky4", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addWall(875, 200, "wallblocky4", false);
                myEditor.addWall(325, 124.85, "solidinmovilA", false, "A");
                myEditor.addWall(350, 125, "solidinmovilA", false, "A");
                myEditor.addWall(375, 125, "solidinmovilA", false, "A");
                myEditor.addWall(400, 125, "solidinmovilA", false, "A");
                myEditor.addWall(425, 125, "solidinmovilA", false, "A");
                myEditor.addWall(450, 125, "solidinmovilA", false, "A");
                myEditor.addWall(475, 125, "solidinmovilA", false, "A");
                myEditor.addWall(500, 125, "solidinmovilA", false, "A");
                myEditor.addWall(525, 125, "solidinmovilA", false, "A");
                myEditor.addWall(550, 125, "solidinmovilA", false, "A");
                myEditor.addWall(625, 125, "solidinmovilA", false, "A");
                myEditor.addWall(650, 125.15, "solidinmovilA", false, "A");
                myEditor.addWall(675, 125.15, "solidinmovilA", false, "A");
                myEditor.addWall(700, 125.15, "solidinmovilA", false, "A");
                myEditor.addWall(725, 125.15, "solidinmovilA", false, "A");
                myEditor.addWall(750, 125.15, "solidinmovilA", false, "A");
                myEditor.addWall(775, 125.15, "solidinmovilA", false, "A");
                myEditor.addWall(800, 125.15, "solidinmovilA", false, "A");
                myEditor.addWall(825, 125.15, "solidinmovilA", false, "A");
                myEditor.addWall(850, 125.15, "solidinmovilA", false, "A");
                myEditor.addButton(1037.5, 175.05, "pulsadorA", false, "A");
                myEditor.addButton(525, 175, "pulsadorE", false, "E");
                myEditor.addButton(400, 175, "pulsadorF", false, "F");
                myEditor.addStar(150, 125, "starD", true, "D");
                myEditor.addStar(450, 50, "starF", true, "F");
                myEditor.addExitDoor(1087.5, 175, "exitLevelE", true, "E");
                myEditor.addStar(750, 50, "starG", true, "G");
                myEditor.addButton(650, 175.05, "pulsadorG", false, "G");
                myEditor.addSpike(550, 175, "spike", false, 0);
                myEditor.addSpike(625, 175.05, "spike", false, 0);
                myEditor.addSpike(325, 175, "spikeX3", false, 0);
                myEditor.addSpike(425, 175, "spikeX4", false);
                myEditor.addSpike(675, 175, "spikeX4", false);
                myEditor.addSpike(800, 175.05, "spikeX3", false, 0);
                myEditor.addBox(387.5, 100, "box", false);
                myEditor.addBox(512.5, 100, "box", false);
                myEditor.addBox(687.5, 100, "box", false);
                myEditor.addBox(812.5, 100, "box", false);
            }
            if (level == 24) {
                manager.arrayNeedNum = [4, 5, 6, 8, 2];
                manager.ArrayFlipCamX = [2];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(100, 175);
                myEditor.addDecor(99, 112.5, "bebedero", false);
                myEditor.addDecor(262.5, 112.5, "casilleros", false);
                myEditor.addDecor(637.5, 112.5, "casilleros", false);
                myEditor.addDecor(450, 20, "elmore2", false);
                myEditor.addDecor(1350, 146, "cuadro1", false);
                myEditor.addExitDoor(762.5, 175, "door", false);
                myEditor.addStar(1050, 25, "star", false);
                myEditor.addStar(1350, 175, "star", false);
                myEditor.addWall(400, 150, "wallblockx4", false);
                myEditor.addWall(400, 75, "wallblockx4", false);
                myEditor.addStar(450, 100, "star", false);
                myEditor.addWall(25, 200, "wallblockx12", false);
                myEditor.addWall(650, 200, "wallblockx12", false);
                myEditor.addWall(0, 200, "wallblocky8", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addWall(25, 25, "wallblockx12", false);
                myEditor.addWall(1025, 175, "wallblockx2", false);
                myEditor.addWall(900, 200, "wallblockx12", false);
                myEditor.addTeleportDoor(1050, 150, "puerta1", false);
                myEditor.addWall(1325, 50, "wallblockx2", false);
                myEditor.addTeleportDoor(1350, 100, "puerta2", false);
                myEditor.addBox(637.5, 150, "box", false);
                myEditor.addWall(175, 200, "wallblocky2", false);
                myEditor.addWall(200, 200, "wallblocky2", false);
                myEditor.addWall(225, 200, "wallblocky2", false);
                myEditor.addWall(250, 200, "wallblocky2", false);
                myEditor.addWall(275, 200, "wallblocky2", false);
                myEditor.addWall(300, 200, "wallblocky2", false);
                myEditor.addWall(175, 50, "wallblocky2", false);
                myEditor.addWall(200, 50, "wallblocky2", false);
                myEditor.addWall(225, 50, "wallblocky2", false);
                myEditor.addWall(250, 50, "wallblocky2", false);
                myEditor.addWall(275, 50, "wallblocky2", false);
                myEditor.addWall(300, 50, "wallblocky2", false);
                myEditor.addWall(575, 50, "wallblocky2", false);
                myEditor.addWall(600, 25, "wallblockx12", false);
                myEditor.addWall(600, 50, "wallblocky2", false);
                myEditor.addWall(625, 50, "wallblocky2", false);
                myEditor.addWall(650, 50, "wallblocky2", false);
                myEditor.addWall(675, 50, "wallblocky2", false);
                myEditor.addWall(700, 50, "wallblocky2", false);
                myEditor.addWall(575, 200, "wallblocky2", false);
                myEditor.addWall(600, 200, "wallblocky2", false);
                myEditor.addWall(625, 200, "wallblocky2", false);
                myEditor.addWall(650, 200, "wallblocky2", false);
                myEditor.addWall(675, 200, "wallblocky2", false);
                myEditor.addWall(700, 200, "wallblocky2", false);
                myEditor.addWall(875, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(1175, 200, "wallblocky8", false);
                myEditor.addWall(1475, 200, "wallblocky8", false);
                myEditor.addWall(1225, 25, "wallblockx12", false);
                myEditor.addWall(1275, 125, "wallblockx6", false);
                myEditor.addWall(400, 150, "wallblocky4", false);
                myEditor.addWall(675, 100, "solidinmovilA", false, "A");
                myEditor.addWall(675, 125, "solidinmovilA", false, "A");
                myEditor.addWall(1025, 200, "wallblocky2", false);
                myEditor.addWall(1050, 200, "wallblocky2", false);
                myEditor.addWall(1325, 50, "wallblocky2", false);
                myEditor.addWall(1350, 50, "wallblocky2", false);
                myEditor.addWall(1225, 275, "wallblocky6", false);
                myEditor.addWall(1450, 275, "wallblocky6", false);
                myEditor.addWall(325, 50, "wallblocky6", false);
                myEditor.addWall(550, 50, "wallblocky6", false);
                myEditor.addWall(925, 75, "wallblocky6", false);
                myEditor.addWall(1150, 75, "wallblocky6", false);
                myEditor.addWall(475, 125, "solidinmovilD", true, "D");
                myEditor.addWall(475, 100, "solidinmovilD", true, "D");
                myEditor.addWall(1000, 100, "solidinmovilD", true, "D");
                myEditor.addWall(975, 100, "solidinmovilD", true, "D");
                myEditor.addWall(1050, 100, "solidinmovilD", true, "D");
                myEditor.addWall(1025, 100, "solidinmovilD", true, "D");
                myEditor.addWall(1100, 100, "solidinmovilD", true, "D");
                myEditor.addWall(1075, 100, "solidinmovilD", true, "D");
                myEditor.addCrank(1451.75, 125, "crankD", true, "D");
                myEditor.addButton(925, 175, "pulsadorA", false, "A");
                myEditor.addWall(325, 300, "wallblocky6", false);
                myEditor.addWall(550, 300, "wallblocky6", false);
                myEditor.addWall(675, 75, "solidinmovilA", false, "A");
                myEditor.addWall(675, 150, "solidinmovilA", false, "A");
                myEditor.addSpike(975, 175, "spike", false, 0);
                myEditor.addSpike(1100, 175, "spike", false, 0);
                myEditor.addSpike(1225, 125, "spike", false, 0);
                myEditor.addTeleport(325, 225, "holeTeleport1", false);
                myEditor.addTeleport(925, 0, "holeTeleport2", false);
                myEditor.addTeleport(1225, 225, "holeTeleport3", false);
                myEditor.addTeleport(325, 0, "holeTeleport4", false);
            }
            if (level == 25) {
                manager.arrayNeedNum = [4, 1, 5, 2];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [2, 4];
                manager.createPlayer(65, 175);
                myEditor.addDecor(62.5, 112.5, "bebedero", false);
                myEditor.addDecor(600, 25, "elmore1", false);
                myEditor.addDecor(218.35, 35.35, "calcomania1", false);
                myEditor.addDecor(233.35, 51.35, "calcomania2", false);
                myEditor.addWall(0, 200, "wallblockx8", false);
                myEditor.addWall(300, 200, "wallblockx8", false);
                myEditor.addWall(400, 125, "wallblockx6", false);
                myEditor.addWall(400, 100, "wallblockx6", false);
                myEditor.addWall(950, 125, "wallblockx6", false);
                myEditor.addWall(950, 100, "wallblockx6", false);
                myEditor.addWall(1050, 125, "wallblocky5", false);
                myEditor.addWall(1075, 125, "wallblocky5", false);
                myEditor.addWall(950, 125, "wallblocky2", false);
                myEditor.addWall(975, 125, "wallblocky2", false);
                myEditor.addWall(1000, 125, "wallblocky2", false);
                myEditor.addWall(1025, 125, "wallblocky2", false);
                myEditor.addWall(400, 125, "wallblocky5", false);
                myEditor.addWall(425, 125, "wallblocky5", false);
                myEditor.addWall(450, 125, "wallblocky2", false);
                myEditor.addWall(475, 125, "wallblocky2", false);
                myEditor.addWall(500, 125, "wallblocky2", false);
                myEditor.addWall(525, 125, "wallblocky2", false);
                myEditor.addWall(600, 125, "wallblockx8", false);
                myEditor.addWall(875, 200, "wallblockx2", false);
                myEditor.addStar(925, 100, "star", false);
                myEditor.addStar(575, 100, "star", false);
                myEditor.addStar(1139, 75, "star", false);
                myEditor.addWall(0, 200, "wallblocky8", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addWall(600, 100, "wallblockx8", false);
                myEditor.addWall(725, 100, "wallblockx2", false);
                myEditor.addWall(100, 125, "wallblockx8", false);
                myEditor.addWall(100, 100, "wallblockx8", false);
                myEditor.addWall(100, 125, "wallblocky5", false);
                myEditor.addWall(125, 125, "wallblocky5", false);
                myEditor.addWall(150, 125, "wallblocky2", false);
                myEditor.addWall(175, 125, "wallblocky2", false);
                myEditor.addWall(225, 125, "wallblocky2", false);
                myEditor.addWall(200, 125, "wallblocky2", false);
                myEditor.addWall(225, 125, "wallblocky2", false);
                myEditor.addWall(250, 125, "wallblocky2", false);
                myEditor.addWall(275, 125, "wallblocky2", false);
                myEditor.addWall(275, 200, "wallblockx2", false);
                myEditor.addWall(575, 200, "wallblockx2", false);
                myEditor.addWall(750, 125, "wallblocky5", false);
                myEditor.addWall(775, 125, "wallblocky5", false);
                myEditor.addWall(625, 125, "wallblocky2", false);
                myEditor.addWall(650, 125, "wallblocky2", false);
                myEditor.addWall(675, 125, "wallblocky2", false);
                myEditor.addWall(700, 125, "wallblocky2", false);
                myEditor.addWall(725, 125, "wallblocky2", false);
                myEditor.addWall(600, 125, "wallblocky2", false);
                myEditor.addWall(700, 200, "wallblockx8", false);
                myEditor.addWall(1000, 200, "wallblockx8", false);
                myEditor.addWall(1175, 200, "wallblocky8", false);
                myEditor.addWall(875, 200, "wallblocky8", false);
                myEditor.addWall(1124.5, 125, "solidinmovil", false);
                myEditor.addWall(350, 125, "solidinmovil", false);
                myEditor.addTeleportDoor(175, 175, "puerta1", false);
                myEditor.addTeleportDoor(475, 175, "puerta2", false);
                myEditor.addTeleportDoor(725, 175, "puerta3", false);
                myEditor.addTeleportDoor(725, 75, "puerta4", false);
                myEditor.addTeleportDoor(175, 75, "puerta7", false);
                myEditor.addTeleportDoor(475, 75, "puerta8", false);
                myEditor.addCrank(350, 100, "crankE", true, "E");
                myEditor.addExitDoor(800, 175, "exitLevelE", true, "E");
                myEditor.addWall(575, 250, "wallblocky2", false);
                myEditor.addWall(475, 250, "wallblocky2", false);
                myEditor.addWall(275, 0, "wallblocky2", false);
                myEditor.addWall(175, 0, "wallblocky2", false);
                myEditor.addWall(300, 0, "wallblocky2", false);
                myEditor.addWall(400, 0, "wallblocky2", false);
                myEditor.addWall(175, 250, "wallblocky2", false);
                myEditor.addWall(275, 250, "wallblocky2", false);
                myEditor.addWall(1075, 0, "wallblocky2", false);
                myEditor.addWall(1175, 0, "wallblocky2", false);
                myEditor.addWall(0, 0, "wallblocky2", false);
                myEditor.addWall(100, 0, "wallblocky2", false);
                myEditor.addWall(600, 250, "wallblocky2", false);
                myEditor.addWall(700, 250, "wallblocky2", false);
                myEditor.addWall(900, 250, "wallblocky2", false);
                myEditor.addWall(1000, 250, "wallblocky2", false);
                myEditor.addWall(300, 200, "wallblocky8", false);
                myEditor.addTeleport(925, 225, "holeTeleport1", false);
                myEditor.addTeleport(325, 0, "holeTeleport2", false);
                myEditor.addTeleport(325, 225, "holeTeleport3", false);
                myEditor.addTeleport(25, 0, "holeTeleport4", false);
                myEditor.addTeleport(25, 225, "holeTeleport5", false);
                myEditor.addTeleport(925, 0, "holeTeleport6", false);
                myEditor.addTeleport(25, 0, "holeTeleport8", false);
                myEditor.addTeleport(625, 225, "holeTeleport7", false);
            }
            if (level == 26) {
                manager.arrayNeedNum = [4, 2, 6, 8, 5];
                manager.ArrayFlipCamX = [3];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(37.5, 175);
                myEditor.addTutor(150, 175, "1");
                myEditor.addDecor(1200, 112.5, "casilleros", false);
                myEditor.addDecor(300, 112.5, "casilleros", false);
                myEditor.addDecor(750, 112.5, "bebedero", false);
                myEditor.addDecor(450, 112.5, "bebedero", false);
                myEditor.addDecor(150, 112.5, "bebedero", false);
                myEditor.addDecor(250, 100, "calcomania1", false);
                myEditor.addDecor(500, 150, "calcomania2", false);
                myEditor.addDecor(600, 112.5, "casilleros", false);
                myEditor.addDecor(0, 112.5, "casilleros", false);
                myEditor.addDecor(900.05, 112.5, "casilleros", false);
                myEditor.addDecor(1350, 87.5, "cuadro3", false);
                myEditor.addDecor(1275, 87.5, "bebedero", false);
                myEditor.addStar(450, 150, "star", false);
                myEditor.addStar(150, 25, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(0, 200, "wallblockx36", false);
                myEditor.addWall(800, 200, "wallblocky2", false);
                myEditor.addWall(674.95, 200, "wallblocky2", false);
                myEditor.addWall(75.05, 199.95, "wallblocky2", false);
                myEditor.addWall(200, 200, "wallblocky2", false);
                myEditor.addTeleportDoor(1050, 100, "puerta1", false);
                myEditor.addTeleportDoor(1050, 175, "puerta2", false);
                myEditor.addWall(350, 200, "wallblocky2", false);
                myEditor.addWall(525, 200, "wallblocky2", false);
                myEditor.addWall(100, 75, "wallblockx4", false);
                myEditor.addWall(400, 125, "wallblockx4", false);
                myEditor.addLadder(687.45, 150, "ladderX4", false);
                myEditor.addLadder(812.5, 150, "ladderX4", false);
                myEditor.addWall(700, 75, "wallblockx4", false);
                myEditor.addWall(1500, 200, "wallblocky8", false);
                myEditor.addLadder(212.5, 150, "ladderDX4", true, "D");
                myEditor.addLadder(87.5, 149.95, "ladderDX4", true, "D");
                myEditor.addWall(1225, 175, "wallblockx4", false);
                myEditor.addWall(1375, 175, "wallblockx4", false);
                myEditor.addWall(900, 200, "wallblockx24", false);
                myEditor.addWall(1375, 200, "wallblocky2", false);
                myEditor.addWall(1400, 200, "wallblocky2", false);
                myEditor.addWall(1425, 200, "wallblocky2", false);
                myEditor.addWall(1450, 200, "wallblocky2", false);
                myEditor.addWall(1225, 200, "wallblocky2", false);
                myEditor.addWall(1250, 200, "wallblocky2", false);
                myEditor.addWall(1275, 200, "wallblocky2", false);
                myEditor.addWall(1300, 200, "wallblocky2", false);
                myEditor.addExitDoor(1387.5, 150, "exitLevelE", true, "E");
                myEditor.addWall(950, 200, "wallblocky2", false);
                myEditor.addStar(1050, 150, "star", false);
                myEditor.addWall(1125, 200, "wallblocky2", false);
                myEditor.addCrank(1262.5, 150, "crankE", true, "E");
                myEditor.addButton(850, 175, "pulsadorD", false, "D");
                myEditor.addBox(787.5, 50, "box", false);
                myEditor.addWall(1000, 125, "wallblockx4", false);
                myEditor.addEnemy(400, 175, "enemy", false);
                myEditor.addEnemy(737.5, 50, "enemy", false);
                myEditor.addEnemy(975, 175, "enemy", false);
                myEditor.addEnemy(1100, 175, "enemy", false);
                myEditor.addEnemy(1225, 150, "enemy", false);
            }
            if (level == 27) {
                manager.arrayNeedNum = [1, 6, 7];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [2];
                manager.createPlayer(150, 100);
                myEditor.addDecor(150, 141, "elmore2", false);
                myEditor.addDecor(214.3, 71.35, "calcomania2", false);
                myEditor.addDecor(237.3, 55.35, "calcomania1", false);
                myEditor.addDecor(675, 114.5, "cuadro1", false);
                myEditor.addDecor(825, 114.5, "cuadro2", false);
                myEditor.addDecor(450, 166, "elmore1", false);
                myEditor.addWall(300, 150, "wallblockx2", false);
                myEditor.addWall(550, 150, "wallblockx2", false);
                myEditor.addWall(0, 125, "wallblockx2", false);
                myEditor.addWall(250, 125, "wallblockx2", false);
                myEditor.addWall(0, 250, "wallblocky3", false);
                myEditor.addWall(275, 250, "wallblocky3", false);
                myEditor.addWall(300, 250, "wallblocky3", false);
                myEditor.addWall(575, 250, "wallblocky3", false);
                myEditor.addWall(600, 250, "wallblocky3", false);
                myEditor.addWall(0, 25, "wallblocky3", false);
                myEditor.addWall(0, 200, "wallblocky8", false);
                myEditor.addWall(875, 250, "wallblocky3", false);
                myEditor.addWall(575, 25, "wallblocky3", false);
                myEditor.addWall(600, 25, "wallblocky3", false);
                myEditor.addWall(875, 25, "wallblocky3", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addStar(450, 50, "star", false);
                myEditor.addButton(475, 125, "pulsadorA", false, "A");
                myEditor.addButton(400, 125, "pulsadorB", false, "B");
                myEditor.addWall(50, 125, "solidinmovilA", false, "A");
                myEditor.addWall(200, 125, "solidinmovilB", false, "B");
                myEditor.addWall(275, 25, "wallblocky3", false);
                myEditor.addWall(300, 25, "wallblocky3", false);
                myEditor.addWall(275, 200, "wallblocky8", false);
                myEditor.addWall(300, 200, "wallblocky8", false);
                myEditor.addWall(575, 200, "wallblocky8", false);
                myEditor.addWall(600, 200, "wallblocky8", false);
                myEditor.addWall(875, 200, "wallblocky8", false);
                myEditor.addWall(75, 125, "solidinmovilA", false, "A");
                myEditor.addWall(500, 150, "solidinmovilA", false, "A");
                myEditor.addWall(525, 150, "solidinmovilA", false, "A");
                myEditor.addWall(225, 125, "solidinmovilB", false, "B");
                myEditor.addWall(350, 150, "solidinmovilB", false, "B");
                myEditor.addWall(375, 150, "solidinmovilB", false, "B");
                myEditor.addExitDoor(712.5, 150, "door", false);
                myEditor.addStar(675, 50, "starA", false, "A");
                myEditor.addStar(825, 50, "starB", false, "B");
                myEditor.addWall(100, 125, "wallblockx4", false);
                myEditor.addWall(400, 150, "wallblockx4", false);
                myEditor.addWall(700, 175, "wallblockx4", false);
                myEditor.addWall(650, 100, "wallblockx2", false);
                myEditor.addWall(800, 100, "wallblockx2", false);
                myEditor.addEnemy(437.5, 125, "enemy", false);
                myEditor.addTeleport(625, 225, "holeTeleport1", false);
                myEditor.addTeleport(25, 0, "holeTeleport2", false);
                myEditor.addTeleport(325, 225, "holeTeleport3", false);
                myEditor.addTeleport(625, 0, "holeTeleport4", false);
                myEditor.addTeleport(25, 225, "holeTeleport5", false);
                myEditor.addTeleport(325, 0, "holeTeleport6", false);
            }
            if (level == 28) {
                manager.arrayNeedNum = [5, 6, 4, 8];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(50, 175);
                myEditor.addDecor(375, 87.5, "cuadro1", false);
                myEditor.addDecor(525, 87.5, "cuadro2", false);
                myEditor.addDecor(675, 87.5, "cuadro3", false);
                myEditor.addDecor(825, 87.5, "cuadro1", false);
                myEditor.addDecor(150, 25, "elmore1", false);
                myEditor.addDecor(1009.3, 87.55, "cartel salida", false);
                myEditor.addDecor(962.5, 112.5, "bebedero", false);
                myEditor.addDecor(1137.5, 112.5, "bebedero", false);
                myEditor.addDecor(1129.3, 98.35, "calcomania2", false);
                myEditor.addDecor(974.3, 116.35, "calcomania1", false);
                myEditor.addWall(825, 250, "wallblocky3", false);
                myEditor.addWall(350, 250, "wallblocky3", false);
                myEditor.addStar(1137.5, 50, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblockx12", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addWall(275, 200, "wallblockx4", false);
                myEditor.addButton(250, 175, "pulsadorE", false, "E");
                myEditor.addWall(75, 175, "wallblockx6", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addStar(150, 50, "star", false);
                myEditor.addStar(150, 125, "star", false);
                myEditor.addWall(350, 0, "wallblocky3", false);
                myEditor.addWall(850, 0, "wallblocky3", false);
                myEditor.addWall(825, 200, "wallblockx4", false);
                myEditor.addExitDoor(1012.5, 175, "exitLevelE", true, "E");
                myEditor.addWall(75, 200, "wallblocky2", false);
                myEditor.addWall(200, 200, "wallblocky2", false);
                myEditor.addWall(350, 270, "wallblockx12", false);
                myEditor.addWall(550, 270, "wallblockx12", false);
                myEditor.addWall(100, 200, "wallblocky2", false);
                myEditor.addWall(125, 200, "wallblocky2", false);
                myEditor.addWall(150, 200, "wallblocky2", false);
                myEditor.addWall(175, 200, "wallblocky2", false);
                myEditor.addWall(75, 100, "wallblockx6", false);
                myEditor.addTeleportDoor(100, 150, "puerta1", false);
                myEditor.addTeleportDoor(200, 150, "puerta2", false);
                myEditor.addWall(25, 150, "solidinmovilE", true, "E");
                myEditor.addEnemy(137.5, 150, "enemy", false);
                myEditor.addBox(962.5, 175, "box", false);
                myEditor.addTeleport(350, 0, "holeTeleport2", false);
                myEditor.addTeleport(600, 0, "holeTeleport4", false);
                myEditor.addTeleport(350, 225, "holeTeleport1", false);
                myEditor.addTeleport(600, 225, "holeTeleport3", false);
            }
            if (level == 29) {
                manager.arrayNeedNum = [6, 4, 5, 8];
                manager.ArrayFlipCamX = [3];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(50, 50);
                myEditor.addDecor(675, 112.5, "bebedero", false);
                myEditor.addDecor(825, 112.5, "bebedero", false);
                myEditor.addDecor(300, 112.5, "casilleros", false);
                myEditor.addDecor(150, 87.5, "cuadro2", false);
                myEditor.addDecor(450, 87.5, "cuadro3", false);
                myEditor.addDecor(300, 17, "elmore1", false);
                myEditor.addDecor(950, 87.5, "cuadro1", false);
                myEditor.addDecor(1150, 87.5, "cuadro2", false);
                myEditor.addStar(50, 125, "star", false);
                myEditor.addWall(-25, 150, "wallblocky8", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addTeleportDoor(550, 150, "puerta1", false);
                myEditor.addTeleportDoor(50, 50, "puerta2", false);
                myEditor.addWall(600, 200, "wallblockx3", false);
                myEditor.addWall(825, 200, "wallblockx3", false);
                myEditor.addStar(975, 175, "star", false);
                myEditor.addStar(1125, 175, "star", false);
                myEditor.addButton(125, 150, "pulsadorA", false, "A");
                myEditor.addWall(25, 175, "wallblockx6", false);
                myEditor.addWall(200, 175, "wallblockx8", false);
                myEditor.addWall(425, 175, "wallblockx8", false);
                myEditor.addWall(0, 75, "wallblockx3", false);
                myEditor.addWall(0, 200, "wallblockx36", false);
                myEditor.addWall(525, 75, "wallblockx6", false);
                myEditor.addWall(575, 200, "wallblocky6", false);
                myEditor.addWall(600, 200, "wallblocky6", false);
                myEditor.addWall(825, 75, "wallblockx3", false);
                myEditor.addWall(875, 200, "wallblocky6", false);
                myEditor.addExitDoor(712.5, 175, "door", false);
                myEditor.addWall(875, 350, "wallblocky6", false);
                myEditor.addWall(100, 75, "solidinmovilD", true, "D");
                myEditor.addWall(125, 75, "solidinmovilD", true, "D");
                myEditor.addWall(150, 75, "solidinmovilD", true, "D");
                myEditor.addWall(200, 75, "solidinmovilD", true, "D");
                myEditor.addWall(225, 75, "solidinmovilD", true, "D");
                myEditor.addWall(250, 75, "solidinmovilD", true, "D");
                myEditor.addWall(1200, 350, "wallblocky6", false);
                myEditor.addWall(0, 200, "wallblocky6", false);
                myEditor.addWall(75, 75, "solidinmovilD", true, "D");
                myEditor.addWall(275, 75, "solidinmovilD", true, "D");
                myEditor.addWall(300, 75, "solidinmovilD", true, "D");
                myEditor.addWall(325, 75, "solidinmovilD", true, "D");
                myEditor.addWall(350, 75, "solidinmovilD", true, "D");
                myEditor.addWall(425, 75, "solidinmovilD", true, "D");
                myEditor.addWall(450, 75, "solidinmovilD", true, "D");
                myEditor.addWall(475, 75, "solidinmovilD", true, "D");
                myEditor.addWall(500, 75, "solidinmovilD", true, "D");
                myEditor.addWall(375, 75, "solidinmovilD", true, "D");
                myEditor.addCrank(1037.5, 125, "crankD", true, "D");
                myEditor.addButton(225, 150, "pulsadorB", false, "B");
                myEditor.addButton(350, 150, "pulsadorC", false, "C");
                myEditor.addWall(25, 200, "wallblocky2", false);
                myEditor.addWall(50, 200, "wallblocky2", false);
                myEditor.addWall(75, 200, "wallblocky2", false);
                myEditor.addWall(100, 200, "wallblocky2", false);
                myEditor.addWall(125, 200, "wallblocky2", false);
                myEditor.addWall(150, 200, "wallblocky2", false);
                myEditor.addWall(200, 200, "wallblocky2", false);
                myEditor.addWall(225, 200, "wallblocky2", false);
                myEditor.addWall(250, 200, "wallblocky2", false);
                myEditor.addWall(275, 200, "wallblocky2", false);
                myEditor.addWall(300, 200, "wallblocky2", false);
                myEditor.addWall(325, 200, "wallblocky2", false);
                myEditor.addWall(350, 200, "wallblocky2", false);
                myEditor.addWall(375, 200, "wallblocky2", false);
                myEditor.addWall(425, 200, "wallblocky2", false);
                myEditor.addWall(450, 200, "wallblocky2", false);
                myEditor.addWall(475, 200, "wallblocky2", false);
                myEditor.addWall(500, 200, "wallblocky2", false);
                myEditor.addWall(525, 200, "wallblocky2", false);
                myEditor.addWall(550, 200, "wallblocky2", false);
                myEditor.addWall(400, 75, "solidinmovilB", false, "B");
                myEditor.addWall(175, 75, "solidinmovilC", false, "C");
                myEditor.addWall(1000, 75, "wallblockx4", false);
                myEditor.addWall(1000, 150, "wallblockx4", false);
                myEditor.addWall(1075, 150, "wallblocky4", false);
                myEditor.addWall(1000, 150, "wallblocky4", false);
                myEditor.addEnemy(1025, 125, "enemyA", false, "A");
                myEditor.addSpike(175, 175, "spike", false, 0);
                myEditor.addSpike(400, 175, "spike", false, 0);
                myEditor.addBox(412.5, 50, "box", false);
                myEditor.addBox(188, 50, "box", false);
                myEditor.addBox(462.5, 150, "box", false);
                myEditor.addTeleport(900, 225, "holeTeleport1", false);
                myEditor.addTeleport(300, 0, "holeTeleport2", false);
                myEditor.addTeleport(950, 225, "holeTeleport3", false);
                myEditor.addTeleport(350, 0, "holeTeleport4", false);
            }
            if (level == 30) {
                manager.arrayNeedNum = [1, 8, 3];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(86, 175);
                myEditor.addDecor(300, 100, "elmore2", false);
                myEditor.addDecor(600, 100, "elmore1", false);
                myEditor.addDecor(62.5, 112.5, "bebedero", false);
                myEditor.addStar(37.5, 50, "star", false);
                myEditor.addWall(-25, 200, "wallblockx6", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblockx12", false);
                myEditor.addWall(175, 200, "wallblockx6", false);
                myEditor.addWall(475, 200, "wallblockx6", false);
                myEditor.addWall(775, 200, "wallblockx6", false);
                myEditor.addWall(700, 75, "wallblockx3", false);
                myEditor.addWall(125, 75, "wallblockx24", false);
                myEditor.addExitDoor(800, 175, "exitLevelE", true, "E");
                myEditor.addCrank(712.5, 50, "crankE", true, "E");
                myEditor.addStar(450, 100, "starE", true, "E");
                myEditor.addButton(225, 175, "pulsadorA", false, "A");
                myEditor.addButton(375, 175, "pulsadorB", false, "B");
                myEditor.addButton(500, 175, "pulsadorC", false, "C");
                myEditor.addWall(375, 50, "solidinmovilA", false, "A");
                myEditor.addWall(650, 50, "solidinmovilB", false, "B");
                myEditor.addWall(500, 50, "solidinmovilC", false, "C");
                myEditor.addWall(25, 175, "solidinmovilE", true, "E");
                myEditor.addWall(225, 50, "solidinmovilA1", false, "A1");
                myEditor.addButton(650, 175, "pulsadorA1", false, "A1");
                myEditor.addWall(275, 200, "wallblockx6", false);
                myEditor.addWall(575, 200, "wallblockx6", false);
                myEditor.addStar(750, 100, "starE", true, "E");
                myEditor.addEnemy(125, 50, "enemy", false);
                myEditor.addHole(125, 200, "pit", false);
                myEditor.addHole(150, 200, "pit", false);
                myEditor.addHole(425, 200, "pit", false);
                myEditor.addHole(450, 200, "pit", false);
                myEditor.addHole(725, 200, "pit", false);
                myEditor.addHole(750, 200, "pit", false);
            }
            if (level == 31) {
                manager.arrayNeedNum = [7, 8, 5, 2, 3];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(50, 175);
                myEditor.addDecor(50, 112.5, "bebedero", false);
                myEditor.addDecor(37.5, 100, "calcomania2", false);
                myEditor.addDecor(250, 112.5, "bebedero", false);
                myEditor.addDecor(1250, 113, "bebedero", false);
                myEditor.addDecor(1236, 112.6, "calcomania1", false);
                myEditor.addDecor(525, 100, "cuadro1", false);
                myEditor.addDecor(975.25, 100, "cuadro2", false);
                myEditor.addDecor(750, 138, "elmore2", false);
                myEditor.addWall(600, 250, "wallblocky3", false);
                myEditor.addStar(425, 50, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(1200, 200, "wallblockx12", false);
                myEditor.addWall(1500, 200, "wallblocky8", false);
                myEditor.addWall(225, 200, "wallblockx4", false);
                myEditor.addWall(1300, 175, "wallblockx4", false);
                myEditor.addWall(1175, 200, "wallblockx4", false);
                myEditor.addExitDoor(1412.5, 175, "door", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addStar(750, 50, "star", false);
                myEditor.addStar(1075, 50, "star", false);
                myEditor.addWall(300, 250, "wallblocky3", false);
                myEditor.addWall(575, 250, "wallblocky3", false);
                myEditor.addWall(300, 0, "wallblocky3", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(0, 25, "wallblockx12", false);
                myEditor.addWall(1300, 50, "wallblockx4", false);
                myEditor.addWall(1200, 25, "wallblockx12", false);
                myEditor.addWall(575, 0, "wallblocky3", false);
                myEditor.addWall(900, 275, "wallblocky3", false);
                myEditor.addWall(900, 0, "wallblocky3", false);
                myEditor.addWall(1175, 0, "wallblocky3", false);
                myEditor.addWall(250, 25, "wallblockx3", false);
                myEditor.addWall(1175, 25, "wallblockx3", false);
                myEditor.addCrank(412.5, 102.5, "crankE", true, "E");
                myEditor.addCrank(1062.5, 100, "crankC", true, "C");
                myEditor.addWall(1300, 50, "wallblocky2", false);
                myEditor.addWall(1325, 50, "wallblocky2", false);
                myEditor.addWall(1350, 50, "wallblocky2", false);
                myEditor.addWall(1375, 50, "wallblocky2", false);
                myEditor.addWall(1300, 200, "wallblocky2", false);
                myEditor.addWall(1325, 200, "wallblocky2", false);
                myEditor.addWall(1350, 200, "wallblocky2", false);
                myEditor.addWall(1375, 200, "wallblocky2", false);
                myEditor.addWall(100, 175, "wallblockx4", false);
                myEditor.addWall(100, 200, "wallblocky2", false);
                myEditor.addWall(125, 200, "wallblocky2", false);
                myEditor.addWall(150, 200, "wallblocky2", false);
                myEditor.addWall(175, 200, "wallblocky2", false);
                myEditor.addWall(100, 50, "wallblockx4", false);
                myEditor.addWall(100, 50, "wallblocky2", false);
                myEditor.addWall(125, 50, "wallblocky2", false);
                myEditor.addWall(150, 50, "wallblocky2", false);
                myEditor.addWall(175, 50, "wallblocky2", false);
                myEditor.addWall(375, 125, "wallblockx4", false);
                myEditor.addWall(1025, 125, "wallblockx4", false);
                myEditor.addWall(1175, 275, "wallblocky3", false);
                myEditor.addWall(575, 200, "wallblocky8", false);
                myEditor.addWall(600, 200, "wallblocky8", false);
                myEditor.addWall(600, 0, "wallblocky3", false);
                myEditor.addWall(700, 125, "wallblockx4", false);
                myEditor.addWall(875, 200, "wallblocky8", false);
                myEditor.addWall(875, 275, "wallblocky3", false);
                myEditor.addWall(875, 0, "wallblocky3", false);
                myEditor.addEnemy(375, 100, "enemy", false);
                myEditor.addSpike(1325, 150, "spikeE", true, 0, "E");
                myEditor.addSpike(125, 150, "spikeC", false, 0, "C");
                myEditor.addSpike(150, 150, "spikeC", false, 0, "C");
                myEditor.addSpike(1350, 150, "spikeE", true, 0, "E");
                myEditor.addSpike(1375, 50, "spikeC", false, 180, "C");
                myEditor.addSpike(1350, 50, "spikeC", false, 180, "C");
                myEditor.addSpike(175, 50, "spikeE", true, 180, "E");
                myEditor.addSpike(150, 50, "spikeE", true, 180, "E");
                myEditor.addEnemy(1025, 100, "enemy", false);
                myEditor.addTeleport(925, 225, "holeTeleport1", false);
                myEditor.addTeleport(325, 0, "holeTeleport2", false);
                myEditor.addTeleport(325, 225, "holeTeleport3", false);
                myEditor.addTeleport(625, 0, "holeTeleport4", false);
                myEditor.addTeleport(625, 225, "holeTeleport5", false);
                myEditor.addTeleport(925, 0, "holeTeleport6", false);
            }
            if (level == 32) {
                manager.arrayNeedNum = [7, 5, 3];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(50, 175);
                myEditor.addDecor(51, 112.5, "bebedero", false);
                myEditor.addDecor(800, 135.3, "calcomania1", false);
                myEditor.addDecor(64.35, 100, "calcomania2", false);
                myEditor.addDecor(450, 87.5, "cuadro1", false);
                myEditor.addDecor(375, 87.5, "cuadro2", false);
                myEditor.addDecor(525, 87.5, "cuadro3", false);
                myEditor.addDecor(275, 112.5, "casilleros", false);
                myEditor.addDecor(625, 112.5, "casilleros", false);
                myEditor.addDecor(300, 25, "elmore2", false);
                myEditor.addDecor(600, 25, "elmore1", false);
                myEditor.addStar(150, 37.5, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(600, 200, "wallblockx12", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(250, 200, "wallblockx4", false);
                myEditor.addWall(550, 200, "wallblockx4", false);
                myEditor.addWall(250, 150, "solidinmovilE", true, "E");
                myEditor.addButton(412.5, 175, "pulsadorD", false, "D");
                myEditor.addWall(400, 200, "wallblockx4", false);
                myEditor.addButton(462.5, 175, "pulsadorE", false, "E");
                myEditor.addExitDoor(812.5, 175, "door", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(100, 175, "wallblockx2", false);
                myEditor.addWall(750, 175, "wallblockx2", false);
                myEditor.addWall(175, 150, "solidinmovilD", true, "D");
                myEditor.addWall(400, 150, "solidinmovilE", true, "E");
                myEditor.addWall(325, 150, "solidinmovilD", true, "D");
                myEditor.addWall(550, 150, "solidinmovilE", true, "E");
                myEditor.addWall(475, 150, "solidinmovilD", true, "D");
                myEditor.addWall(700, 150, "solidinmovilE", true, "E");
                myEditor.addWall(625, 150, "solidinmovilD", true, "D");
                myEditor.addStar(825, 37.5, "star", false);
                myEditor.addStar(675, 37.5, "star", false);
                myEditor.addWall(325, 250, "wallblocky3", false);
                myEditor.addWall(425, 250, "wallblocky3", false);
                myEditor.addWall(475, 250, "wallblocky3", false);
                myEditor.addWall(550, 250, "wallblocky3", false);
                myEditor.addWall(750, 200, "wallblocky2", false);
                myEditor.addWall(775, 200, "wallblocky2", false);
                myEditor.addWall(125, 200, "wallblocky2", false);
                myEditor.addWall(100, 200, "wallblocky2", false);
                myEditor.addWall(400, 250, "wallblocky3", false);
                myEditor.addWall(450, 250, "wallblocky3", false);
                myEditor.addWall(900, 0, "wallblocky2", false);
                myEditor.addEnemy(437.5, 175, "enemy", false);
                myEditor.addSpike(150, 175, "spikeX8", false, 0);
                myEditor.addSpike(550, 175, "spikeX8", false, 0);
                myEditor.addTeleport(325, 225, "holeTeleport1", false);
                myEditor.addTeleport(625, 0, "holeTeleport2", false);
            }
            if (level == 33) {
                manager.arrayNeedNum = [6, 5, 4];
                manager.ArrayFlipCamX = [0];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(64.6, 175);
                myEditor.addDecor(62.5, 112.5, "bebedero", false);
                myEditor.addDecor(450, 25, "elmore1", false);
                myEditor.addDecor(150, 87.5, "cuadro2", false);
                myEditor.addDecor(750, 87.5, "cuadro3", false);
                myEditor.addDecor(788.3, 141.3, "calcomania1", false);
                myEditor.addDecor(120.35, 143.3, "calcomania2", false);
                myEditor.addDecor(250, 112.5, "casilleros", false);
                myEditor.addDecor(650, 112.5, "casilleros", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(175, 200, "wallblockx6", false);
                myEditor.addWall(575, 200, "wallblockx6", false);
                myEditor.addExitDoor(800, 175, "door", false);
                myEditor.addWall(300, 200, "wallblockx12", false);
                myEditor.addWall(400, 125, "wallblockx4", false);
                myEditor.addWall(275, 125, "wallblockx4", false);
                myEditor.addWall(200, 125, "wallblockx4", false);
                myEditor.addWall(525, 125, "wallblockx4", false);
                myEditor.addWall(600, 125, "wallblockx4", false);
                myEditor.addWall(675, 125, "wallblocky8", false);
                myEditor.addWall(-25, 200, "wallblockx6", false);
                myEditor.addWall(775, 200, "wallblockx6", false);
                myEditor.addWall(200, 125, "wallblocky8", false);
                myEditor.addWall(350, 125, "wallblocky2", false);
                myEditor.addWall(525, 125, "wallblocky2", false);
                myEditor.addButton(250, 100, "pulsadorD", false, "D");
                myEditor.addButton(437.5, 100, "pulsadorE", false, "E");
                myEditor.addButton(625, 100, "pulsadorF", false, "F");
                myEditor.addStar(262.5, 25, "starD", true, "D");
                myEditor.addStar(450, 25, "starE", true, "E");
                myEditor.addLadder(387.5, 175, "ladderX3", false);
                myEditor.addLadder(512.5, 175, "ladderX3", false);
                myEditor.addStar(637.45, 25, "starF", true, "F");
                myEditor.addEnemy(500, 100, "enemy", false);
                myEditor.addEnemy(325, 100, "enemy", false);
                myEditor.addEnemy(650, 100, "enemy", false);
                myEditor.addEnemy(437.5, 175, "enemy", false);
                myEditor.addHole(125, 200, "pit", false);
                myEditor.addHole(150, 200, "pit", false);
                myEditor.addHole(725, 200, "pit", false);
                myEditor.addHole(750, 200, "pit", false);
                myEditor.addButton(625, 100, "pulsadorF", false, "F");
                myEditor.addButton(437.5, 100, "pulsadorE", false, "E");
                myEditor.addButton(250, 100, "pulsadorD", false, "D");
                myEditor.addButton(250, 100, "pulsadorD", false, "D");
                myEditor.addButton(625, 100, "pulsadorF", false, "F");
                myEditor.addButton(437.5, 100, "pulsadorE", false, "E");
            }
            if (level == 34) {
                manager.arrayNeedNum = [5, 4, 2, 8, 6];
                manager.ArrayFlipCamX = [4];
                manager.ArrayFlipCamY = [3];
                manager.createPlayer(450, 150);
                myEditor.addDecor(1275, 112.5, "bebedero", false);
                myEditor.addDecor(525, 112.5, "bebedero", false);
                myEditor.addDecor(375, 112.5, "bebedero", false);
                myEditor.addDecor(225, 112.5, "bebedero", false);
                myEditor.addDecor(75, 112.5, "bebedero", false);
                myEditor.addDecor(150, 94, "cuadro1", false);
                myEditor.addDecor(1349.05, 94, "cuadro2", false);
                myEditor.addDecor(150, 23, "elmore1", false);
                myEditor.addDecor(750, 112.5, "casilleros", false);
                myEditor.addDecor(1050, 112.5, "casilleros", false);
                myEditor.addDecor(363.3, 56, "calcomania1", false);
                myEditor.addDecor(385.3, 54.35, "calcomania2", false);
                myEditor.addDecor(450, 94, "cuadro3", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(1500, 200, "wallblocky8", false);
                myEditor.addWall(625, 175, "wallblockx4", false);
                myEditor.addWall(0, 200, "wallblockx36", false);
                myEditor.addWall(900, 200, "wallblockx24", false);
                myEditor.addWall(600, 75, "wallblockx24", false);
                myEditor.addWall(425, 75, "wallblockx8", false);
                myEditor.addWall(1175, 75, "wallblockx8", false);
                myEditor.addWall(125, 175, "wallblockx2", false);
                myEditor.addWall(425, 175, "wallblockx2", false);
                myEditor.addWall(0, 75, "wallblockx12", false);
                myEditor.addWall(650, 150, "wallblockx2", false);
                myEditor.addWall(775, 175, "wallblockx4", false);
                myEditor.addWall(800, 150, "wallblockx2", false);
                myEditor.addWall(925, 175, "wallblockx4", false);
                myEditor.addWall(950, 150, "wallblockx2", false);
                myEditor.addWall(1075, 175, "wallblockx4", false);
                myEditor.addWall(1100, 150, "wallblockx2", false);
                myEditor.addWall(1325, 175, "wallblockx2", false);
                myEditor.addCrank(1337.5, 150, "crankB", true, "B");
                myEditor.addButton(1350, 50, "pulsadorD", false, "D");
                myEditor.addWall(1325, 50, "solidinmovilD", true, "D");
                myEditor.addCrank(137.5, 150, "crankB", true, "B");
                myEditor.addStar(75, 100, "starB", false, "B");
                myEditor.addStar(1050, 100, "starB", false, "B");
                myEditor.addStar(750, 100, "starB", false, "B");
                myEditor.addWall(125, 200, "wallblocky2", false);
                myEditor.addWall(650, 200, "wallblocky3", false);
                myEditor.addWall(150, 200, "wallblocky2", false);
                myEditor.addWall(675, 200, "wallblocky3", false);
                myEditor.addWall(625, 200, "wallblocky2", false);
                myEditor.addWall(700, 200, "wallblocky2", false);
                myEditor.addWall(800, 200, "wallblocky3", false);
                myEditor.addWall(825, 200, "wallblocky3", false);
                myEditor.addWall(775, 200, "wallblocky2", false);
                myEditor.addWall(850, 200, "wallblocky2", false);
                myEditor.addWall(950, 200, "wallblocky3", false);
                myEditor.addWall(975, 200, "wallblocky3", false);
                myEditor.addWall(925, 200, "wallblocky2", false);
                myEditor.addWall(1000, 200, "wallblocky2", false);
                myEditor.addWall(1100, 200, "wallblocky3", false);
                myEditor.addWall(1125, 200, "wallblocky3", false);
                myEditor.addWall(1075, 200, "wallblocky2", false);
                myEditor.addWall(1150, 200, "wallblocky2", false);
                myEditor.addWall(1325, 200, "wallblocky2", false);
                myEditor.addWall(1350, 200, "wallblocky2", false);
                myEditor.addWall(425, 200, "wallblocky2", false);
                myEditor.addWall(450, 200, "wallblocky2", false);
                myEditor.addExitDoor(1387.5, 175, "door", false);
                myEditor.addEnemy(437.5, 50, "enemyB", false, "B");
                myEditor.addSpike(1300, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(1275, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(1250, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(1225, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(1200, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(1175, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(1050, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(1025, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(900, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(875, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(750, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(725, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(575, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(600, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(550, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(525, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(500, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(400, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(475, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(375, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(350, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(325, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(300, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(275, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(250, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(200, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(225, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(175, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(100, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(75, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(50, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(0, 175, "spikeD", true, 0, "D");
                myEditor.addSpike(25, 175, "spikeD", true, 0, "D");
            }
            if (level == 35) {
                manager.arrayNeedNum = [2, 6, 5, 4];
                manager.ArrayFlipCamX = [3];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(150, 175);
                myEditor.addDecor(637.5, 112.5, "bebedero", false);
                myEditor.addDecor(862.5, 112.5, "bebedero", false);
                myEditor.addDecor(350, 87.5, "cuadro2", false);
                myEditor.addDecor(550, 87.5, "cuadro1", false);
                myEditor.addDecor(750, 87.5, "cuadro3", false);
                myEditor.addDecor(871.3, 107.35, "calcomania2", false);
                myEditor.addDecor(979.3, 130.35, "calcomania1", false);
                myEditor.addDecor(1050, 25, "elmore2", false);
                myEditor.addDecor(450, 25, "elmore1", false);
                myEditor.addWall(650, 250, "wallblocky3", false);
                myEditor.addWall(825, 250, "wallblocky3", false);
                myEditor.addWall(750, 250, "wallblocky3", false);
                myEditor.addWall(725, 250, "wallblocky3", false);
                myEditor.addExitDoor(112.5, 175, "exitLevelE", true, "E");
                myEditor.addStar(150, 50, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(1200, 200, "wallblocky8", false);
                myEditor.addDecor(250, 100, "calcomania1", false);
                myEditor.addTeleportDoor(450, 175, "puerta1", false);
                myEditor.addTeleportDoor(450, 100, "puerta2", false);
                myEditor.addWall(0, 200, "wallblockx24", false);
                myEditor.addWall(900, 200, "wallblockx12", false);
                myEditor.addWall(600, 200, "wallblockx3", false);
                myEditor.addWall(825, 200, "wallblockx3", false);
                myEditor.addWall(725, 200, "wallblockx2", false);
                myEditor.addWall(675, 75, "wallblockx2", false);
                myEditor.addWall(775, 75, "wallblockx2", false);
                myEditor.addWall(50, 125, "wallblockx2", false);
                myEditor.addWall(200, 125, "wallblockx2", false);
                myEditor.addWall(400, 125, "wallblockx4", false);
                myEditor.addWall(400, 200, "wallblocky4", false);
                myEditor.addWall(475, 200, "wallblocky4", false);
                myEditor.addStar(450, 150, "star", false);
                myEditor.addWall(1000, 100, "wallblockx4", false);
                myEditor.addStar(1137.5, 50, "star", false);
                myEditor.addButton(1125, 175, "pulsadorE", false, "E");
                myEditor.addTeleport(625, 225, "holeTeleport1", false);
                myEditor.addTeleport(625, 0, "holeTeleport2", false);
                myEditor.addWall(650, 0, "wallblocky3", false);
                myEditor.addWall(825, 0, "wallblocky3", false);
                myEditor.addWall(750, 0, "wallblocky3", false);
                myEditor.addWall(725, 0, "wallblocky3", false);
                myEditor.addButton(800, 50, "pulsadorA", false, "A");
                myEditor.addWall(1000, 200, "wallblocky5", false);
                myEditor.addWall(1075, 200, "wallblocky5", false);
                myEditor.addEnemy(437.5, 175, "enemyA", false, "A");
                myEditor.addEnemy(212.5, 100, "enemyA", false, "A");
                myEditor.addEnemy(62.5, 100, "enemyA", false, "A");
                myEditor.addEnemy(1037.5, 75, "enemyA", false, "A");
                myEditor.addBox(1112.5, 174.95, "box", false);
                myEditor.addBox(512.5, 175, "box", false);
                myEditor.addBox(387.5, 175, "box", false);
                myEditor.addBox(987.5, 175, "box", false);
                myEditor.addBox(1162.5, 175, "box", false);
            }
            if (level == 36) {
                manager.arrayNeedNum = [2, 5, 4, 8, 6];
                manager.ArrayFlipCamX = [5];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(50, 175);
                myEditor.addDecor(150, 112.5, "bebedero", false);
                myEditor.addDecor(450, 112.5, "casilleros", false);
                myEditor.addDecor(1050, 25, "elmore2", false);
                myEditor.addDecor(136.35, 100, "calcomania1", false);
                myEditor.addDecor(162.5, 110, "calcomania2", false);
                myEditor.addDecor(750, 87.5, "cuadro1", false);
                myEditor.addStar(450, 50, "star", false);
                myEditor.addStar(650, 75, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addExitDoorEnd(1287.5, 175, "exitLevelEnd");
                myEditor.addWall(1450, 125, "wallblockx2", false);
                myEditor.addWall(1500, 200, "wallblocky8", false);
                myEditor.addWall(0, 200, "wallblockx36", false);
                myEditor.addWall(825, 200, "wallblocky2", false);
                myEditor.addWall(650, 200, "wallblocky2", false);
                myEditor.addWall(75, 200, "wallblocky2", false);
                myEditor.addWall(200, 200, "wallblocky2", false);
                myEditor.addTeleportDoor(50, 50, "puerta1", false);
                myEditor.addTeleportDoor(350, 50, "puerta2", false);
                myEditor.addTeleportDoor(250, 50, "puerta3", false);
                myEditor.addTeleportDoor(750, 175, "puerta4", false);
                myEditor.addWall(0, 75, "wallblockx3", false);
                myEditor.addWall(275, 100, "wallblockx3", false);
                myEditor.addWall(225, 75, "wallblockx6", false);
                myEditor.addStar(1050, 150, "star", false);
                myEditor.addWall(900, 200, "wallblockx36", false);
                myEditor.addWall(875, 100, "wallblockx2", false);
                myEditor.addWall(1175, 100, "wallblockx2", false);
                myEditor.addWall(900, 125, "wallblockx12", false);
                myEditor.addWall(850, 125, "wallblockx3", false);
                myEditor.addWall(1175, 125, "wallblockx3", false);
                myEditor.addWall(1425, 200, "wallblocky2", false);
                myEditor.addWall(1250, 200, "wallblocky2", false);
                myEditor.addButton(1000, 175, "pulsadorA", false, "A");
                myEditor.addWall(300, 125, "wallblocky3", false);
                myEditor.addWall(550, 100, "wallblockx3", false);
                myEditor.addWall(526, 125, "wallblockx3", false);
                myEditor.addWall(575, 125, "wallblockx3", false);
                myEditor.addWall(575, 125, "wallblocky3", false);
                myEditor.addButton(1075, 175.05, "pulsadorD", false, "D");
                myEditor.addWall(125, 75, "solidinmovilD", true, "D");
                myEditor.addWall(150, 75, "solidinmovilD", true, "D");
                myEditor.addWall(1475, 125, "wallblocky2", false);
                myEditor.addWall(1200, 125, "wallblocky2", false);
                myEditor.addWall(900, 125, "wallblocky2", false);
                myEditor.addWall(875, 125, "wallblocky2", false);
                myEditor.addWall(600, 125, "wallblocky2", false);
                myEditor.addWall(550, 125, "wallblocky2", false);
                myEditor.addWall(275, 100, "wallblocky2", false);
                myEditor.addWall(325, 100, "wallblocky2", false);
                myEditor.addWall(0, 100, "wallblocky2", false);
                myEditor.addWall(1175, 125, "wallblocky2", false);
                myEditor.addWall(-25, 0, "wallblocky2", false);
                myEditor.addEnemy(1150, 175, "enemy", false);
                myEditor.addSpike(425, 175, "spike", false, 0);
                myEditor.addSpike(450, 175, "spike", false, 0);
                myEditor.addSpike(1025.05, 100, "spikeA", false, 0, "A");
                myEditor.addSpike(1000.05, 100, "spikeA", false, 0, "A");
                myEditor.addSpike(1050.05, 100, "spikeA", false, 0, "A");
                myEditor.addSpike(1075.1, 100, "spikeA", false, 0, "A");
                myEditor.addEnemy(137.5, 175, "enemy", false);
                myEditor.addEnemy(737.5, 175, "enemy", false);
                myEditor.addBox(337.5, 174.95, "box", false);
                myEditor.addDejavu(300, 175, "dejavu", false);
            }
            if (level == 55) {
                manager.arrayNeedNum = [4, 6, 5];
                manager.ArrayFlipCamX = [5];
                manager.ArrayFlipCamY = [0];
                manager.createPlayer(60, 150);
                myEditor.addDecor(87, 112.5, "bebedero", false);
                myEditor.addDecor(300, 112.5, "casilleros", false);
                myEditor.addDecor(600, 112.5, "casilleros", false);
                myEditor.addDecor(450, 87.5, "cuadro1", false);
                myEditor.addDecor(150, 25, "elmore2", false);
                myEditor.addExitDoor(775, 175, "exitLevelE", true, "D");
                myEditor.addStar(450, 37, "star", false);
                myEditor.addStar(675, 137, "star", false);
                myEditor.addStar(225, 137, "star", false);
                myEditor.addWall(-25, 200, "wallblocky8", false);
                myEditor.addWall(900, 200, "wallblocky8", false);
                myEditor.addWall(0, 200, "wallblockx12", false);
                myEditor.addWall(500, 200, "wallblockx4", false);
                myEditor.addWall(600, 200, "wallblockx12", false);
                myEditor.addWall(300, 200, "wallblockx4", false);
                myEditor.addWall(425, 150, "wallblockx2", false);
                myEditor.addHole(400, 200, "pit", false);
                myEditor.addHole(425, 200, "pit", false);
                myEditor.addHole(450, 200, "pit", false);
                myEditor.addHole(475, 200, "pit", false);
                myEditor.addBox(130, 175, "box", false);
                myEditor.addCrank(75, 175, "1", false, "D");
                myEditor.addLadder(187.5, 175, "ladderX3", false);
                myEditor.addLadder(287.5, 175, "ladderDX4", true, "D");
                myEditor.addLadder(412.45, 175, "ladderDX4", true, "D");
                myEditor.addButton(10, 175, "1", false, "A");
                myEditor.addWall(70, 125, "solidinmovilA", false, "A");
                myEditor.addSpike(120, 75, "spikeD", false, 0, "D");
                myEditor.addEnemy(350, 175, "enemyA", false, "A");
            }
        };
        return LevelsData;
    }());
    TProject.LevelsData = LevelsData;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Locale = (function () {
        function Locale() {
        }
        Locale.playBtnText = "PLAY";
        Locale.pauseBtnText = "PAUSE";
        Locale.continueBtnText = "CONTINUE";
        Locale.exitBtnText = "EXIT";
        Locale.winText1 = "CONGRATULATIONS!";
        Locale.winText2_1 = "WELL DONE!";
        Locale.winText2_2 = "GREAT!";
        Locale.winText2_3 = "EXCELENT!";
        Locale.winText2_4 = "PERFECT!";
        Locale.failtext = "YOU DIDN'T\nMAKE IT";
        Locale.comix1_1 = "I'm really disappointed in you two.";
        Locale.comix1_2 = "Can you at least tell us what we did this time?";
        Locale.comix1_3 = "You ruffians! You stole my birthday cake!!";
        Locale.comix1_4 = "*I can't believe she still celebrates it at her age.*";
        Locale.comix1_5 = "Sorry kids,\nbut I have no choice but to take you to detention.";
        Locale.comix1_6 = "But... We... Principal Brown... We didn't...";
        Locale.comix1_7 = "Silence!\nI don't want to listen your excuses!";
        Locale.comix1_8 = "Dude, We got to get out of here...\nWe have tickets to Galactic Wars in 2 hours.";
        Locale.comix1_9 = "Also, it's really frightening to be locked here with Tina and Jamie.";
        Locale.comix1_10 = "Great! This is an excelent chance to try out the school's new security system.";
        Locale.comix1_11 = "Security system?";
        Locale.comix1_12 = "Behold the Videotron 9000!\nThe most advanced school survilance system.";
        Locale.comix2_1 = "We must do something Nigel!\nWe can't just simply watch them escape!";
        Locale.comix2_2 = "Oh! But I'm doing more than just watching!";
        Locale.comix2_3 = "Oh yeah?\nAnd can I know what it is you are doing?";
        Locale.comix2_4 = "*I'm drinking coffee*";
        Locale.comix2_5 = "Oh no!\nThe console!";
        Locale.comix3_1 = "Your stupid security system isn't working!\nWe need to call their parents!";
        Locale.comix3_2 = "We can do that...\nOr we can release the hallway robot guardians";
        Locale.comix3_3 = "Hallway robot guardians?";
        Locale.comix3_4 = "Behold Ms. Simian!\n The future of school security!";
        Locale.comix3_5 = "I swear they looked much bigger in the brochure.";
        Locale.comix3_6 = "Did the board include this in the budget?";
        Locale.comix4_1 = "Look at them! They escaped and I'm here without my birthday cake.";
        Locale.comix4_2 = "But Lucy, at least we could check that the Videotron 9000 was ALMOST a complete success.";
        Locale.comix4_3 = "Wait a minute... What do you have there?";
        Locale.comix4_4 = "Oh, this? It's a banana cake I found\nthis morning in the teachers' lounge.";
        Locale.comix4_5 = "Do you want some?";
        Locale.comix4_6 = "NIGEEEEEEEEEEEEEEEEEEEEELLLLLLL!!!";
        Locale.help_1 = "Dude, look out! Don't fall\nUse the [UP ARROW] to jump.";
        Locale.help_2 = "To enter a door use the [SPACE] key.";
        Locale.help_3 = "Hey! Be careful with those spikes\n if you don't want to end up dead like me.";
        Locale.help_4 = "You can grab and drop boxes with [SPACE].\n Use them to reach higher places.";
        Locale.help_5 = "They told me that if you have hands and feet...\nYou can go up and down ladders! Isn't that great?";
        Locale.help_6 = "You can enter these ducts with [SPACE]...\n... but they are filled with germs and bacteria.";
        Locale.help_7 = "Jump! Jump! Jump! Jump!";
        Locale.help_8 = "There's something wrong with these ladders. Do you think those levers and buttons have somthing to do with that?";
        Locale.help_9 = "Oh no! The school is infested with those horrible robots.\nOne of them even detroyed mi pom poms.";
        return Locale;
    }());
    TProject.Locale = Locale;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this.offMenuForDebug = false;
            _this._manager = manager;
            _this.anchor.set(0.0, 0.0);
            _this.screen1 = _this.game.add.group();
            _this.screen2 = _this.game.add.group();
            _this.blackScreen = _this.game.add.sprite(0, 0, "black_screen");
            _this.blackScreen.anchor.set(0.0, 0.0);
            _this.addChild(_this.blackScreen);
            _this.bg = _this.game.add.sprite(0, 0, "menu_atlas", "main_menu_bg");
            _this.bg.y = _this.bg.height;
            _this.bg.anchor.set(0, 0);
            _this.addChild(_this.bg);
            _this.soundBtn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this._manager.gameplayUI.soundBtnClick(_this.soundBtn, _this._manager.gameplayUI.soundBtn); }, _this, "soundBtn_on", "soundBtn_on", "soundBtn_on");
            _this.soundBtn.x = 900;
            _this.soundBtn.y = -20;
            _this.soundBtn.anchor.set(0.5, 0.5);
            _this.soundBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.soundBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.addChild(_this.soundBtn);
            _this.homeBtn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this.homeBtnClick(); }, _this, "homeBtn", "homeBtn", "homeBtn");
            _this.homeBtn.x = 865;
            _this.homeBtn.y = 20;
            _this.homeBtn.anchor.set(0.5, 0.5);
            _this.homeBtn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.homeBtn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.screen2.addChild(_this.homeBtn);
            _this.screen_bg = _this.game.add.group();
            _this.addChild(_this.screen_bg);
            _this.screen_bg.addChild(_this.screen1);
            _this.screen_bg.addChild(_this.screen2);
            _this.logo = _this.game.add.sprite(0, 0, "menu_atlas", "main_menu_logo");
            _this.logo.anchor.set(0.5, 0.5);
            _this.logo.x = window.innerWidth / 2;
            _this.logo.y = window.innerHeight / 2;
            _this.screen1.addChild(_this.logo);
            _this.logo.alpha = 0;
            _this.play_btn = _this.game.add.button(0, 0, "menu_atlas", function (e) { _this.playBtnClick(); }, _this, "play_btn", "play_btn", "play_btn");
            _this.play_btn.x = 460;
            _this.play_btn.y = 520;
            _this.play_btn.anchor.set(0.5, 0.5);
            _this.play_btn.onInputOver.add(function (e) { _this.inputOver(e); });
            _this.play_btn.onInputOut.add(function (e) { _this.inputOut(e); });
            _this.screen1.addChild(_this.play_btn);
            _this.play_btn.visible = false;
            var playBtnText = _this.game.add.text(0, 0, TProject.Locale.playBtnText, { font: "46px HelveticaRounded-Black", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
            playBtnText.anchor.set(0.5, 0.5);
            _this.play_btn.addChild(playBtnText);
            _this.pers = _this.game.add.sprite(0, 0, "menu_atlas", "main_menu_pers");
            _this.pers.x = 460;
            _this.pers.y = 900;
            _this.pers.anchor.set(0.5, 0.5);
            _this.screen1.addChild(_this.pers);
            _this.persLight = _this.game.add.sprite(0, 0, "menu_atlas", "main_menu_pers_light");
            _this.persLight.x = 25;
            _this.persLight.y = -40;
            _this.persLight.anchor.set(0.5, 0.5);
            _this.pers.addChild(_this.persLight);
            _this.menuCamNoise1 = _this.game.add.sprite(0, 0, "menuCamNoise", "menuCamNoise0001");
            _this.menuCamNoise1.animations.add("noise1", Phaser.Animation.generateFrameNames("menuCamNoise", 1, 3, "", 4));
            _this.menuCamNoise1.play("noise1", 30, true);
            _this.menuCamNoise1.x = -320;
            _this.menuCamNoise1.y = 256;
            _this.menuCamNoise1.anchor.set(0.5, 0.5);
            _this.pers.addChild(_this.menuCamNoise1);
            _this.menuCamNoise2 = _this.game.add.sprite(0, 0, "menuCamNoise", "menuCamNoise0004");
            _this.menuCamNoise2.animations.add("noise2", Phaser.Animation.generateFrameNames("menuCamNoise", 4, 6, "", 4));
            _this.menuCamNoise2.play("noise2", 30, true);
            _this.menuCamNoise2.x = 310;
            _this.menuCamNoise2.y = 231;
            _this.menuCamNoise2.anchor.set(0.5, 0.5);
            _this.pers.addChild(_this.menuCamNoise2);
            _this.camLight = _this.game.add.sprite(0, 0, "menu_atlas", "main_menu_cam_light");
            _this.camLight.x = 0;
            _this.camLight.y = 209;
            _this.camLight.anchor.set(0.5, 0.5);
            _this.pers.addChild(_this.camLight);
            _this.selectPanel = _this.game.add.sprite(0, 0, "menu_atlas", "select_level_panel");
            _this.selectPanel.x = 460;
            _this.selectPanel.y = 310;
            _this.selectPanel.anchor.set(0.5, 0.5);
            _this.screen2.addChild(_this.selectPanel);
            console.log("GAME VERSION: 1.03");
            if (_this.offMenuForDebug == false) {
                _this.screen2.y = -620;
                var tween = game.add.tween(_this.logo).to({ alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
                tween.onComplete.add(_this.intro, _this);
                _this.lightTween1 = _this.game.add.tween(_this.persLight).to({ alpha: 0.4 }, 100, Phaser.Easing.Sinusoidal.In, true, 0, -1, true);
                _this.lightTween2 = _this.game.add.tween(_this.camLight).to({ alpha: 0.4 }, 100, Phaser.Easing.Sinusoidal.In, true, 0, -1, true);
                _this.groupButtons = _this.game.add.group();
                _this.selectPanel.addChild(_this.groupButtons);
                if (_this._manager.localStorageGetNumber("level1") < 1) {
                    _this._manager.localStorageSetNumber("level1", 1);
                }
                _this._manager.localStorageSetNumber("film1", 1);
                _this.createOrUpdateSelectButtons();
            }
            else {
                _this.visible = false;
            }
            return _this;
        }
        MainMenu.prototype.intro = function () {
            var tween = this.game.add.tween(this.logo).to({ y: this.logo.y - 200 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.logo.scale).to({ x: 0.7, y: 0.7 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.bg).to({ x: 0, y: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.pers).to({ y: 338 }, 500, Phaser.Easing.Linear.None, true, 500, 0, false);
            tween.onComplete.add(this.intro_showBtn, this);
        };
        MainMenu.prototype.intro_showBtn = function () {
            this.play_btn.visible = true;
            var tween = this.game.add.tween(this.play_btn).to({ x: 460, y: 410 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.soundBtn).to({ y: 20 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        };
        MainMenu.prototype.playBtnClick = function () {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            var tween = this.game.add.tween(this.screen1).to({ y: 620 }, 700, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.screen2).to({ y: 0 }, 700, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.lightTween1.pause();
            this.lightTween2.pause();
        };
        MainMenu.prototype.homeBtnClick = function () {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            var tween = this.game.add.tween(this.screen1).to({ y: 0 }, 700, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = this.game.add.tween(this.screen2).to({ y: -620 }, 700, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.lightTween1.resume();
            this.lightTween2.resume();
        };
        MainMenu.prototype.speedHome = function () {
            this.screen1.position.y = 0;
            this.screen2.position.y = -620;
            this.lightTween1.resume();
            this.lightTween2.resume();
        };
        MainMenu.prototype.createOrUpdateSelectButtons = function () {
            var _this = this;
            this.groupButtons.removeAll();
            var xx = -235;
            var yy = -145;
            var curLev = 1;
            var curFilm = 1;
            for (var i = 1; i < 41; i++) {
                var selectBtn;
                if (i == 1 || i == 13 || i == 28 || i == 40) {
                    var loadInfo;
                    loadInfo = this._manager.localStorageGetNumber("film" + curFilm);
                    var spr;
                    if (loadInfo == 1) {
                        spr = "filmBtn_2";
                    }
                    else {
                        spr = "filmBtn_1";
                    }
                    selectBtn = this.game.add.button(0, 0, "menu_atlas", function (e) { _this.filmClick(e); }, this, spr, spr, spr);
                    selectBtn.data.curFilm = curFilm;
                    selectBtn.data.allowComix = loadInfo;
                    curFilm += 1;
                }
                else {
                    var loadInfo;
                    loadInfo = this._manager.localStorageGetNumber("level" + curLev);
                    var spr;
                    var spr_stars;
                    if (loadInfo == 0) {
                        spr = "selectBtn_1";
                        spr_stars = "menu_stars0";
                    }
                    else if (loadInfo == 1) {
                        spr = "selectBtn_2";
                        spr_stars = "menu_stars0";
                    }
                    else if (loadInfo == 2) {
                        spr = "selectBtn_2";
                        spr_stars = "menu_stars1";
                    }
                    else if (loadInfo == 3) {
                        spr = "selectBtn_2";
                        spr_stars = "menu_stars2";
                    }
                    else if (loadInfo == 4) {
                        spr = "selectBtn_2";
                        spr_stars = "menu_stars3";
                    }
                    selectBtn = this.game.add.button(0, 0, "menu_atlas", function (e) { _this.selectClick(e); }, this, spr, spr, spr);
                    selectBtn.data.curLev = curLev;
                    selectBtn.data.progress = loadInfo;
                    curLev += 1;
                    var stars = this.game.add.sprite(0, 0, "menu_atlas", spr_stars);
                    stars.anchor.set(0.5, 0.5);
                    stars.x = 0;
                    stars.y = 13;
                    selectBtn.addChild(stars);
                    var myText = this.game.add.text(0, -5, "", { font: "28px HelveticaRounded-Black", fill: "#E85E28", boundsAlignH: "center", boundsAlignV: "middle" });
                    var numText = curLev - 1;
                    if (numText < 10) {
                        myText.text = "0" + numText;
                    }
                    else {
                        myText.text = numText + "";
                    }
                    if (selectBtn.data.progress > 0) {
                        myText.fill = "#ffffff";
                    }
                    myText.anchor.set(0.5, 0.5);
                    selectBtn.addChild(myText);
                }
                selectBtn.x = xx;
                selectBtn.y = yy;
                selectBtn.onInputOver.add(function (e) { _this.inputOver(e); });
                selectBtn.onInputOut.add(function (e) { _this.inputOut(e); });
                selectBtn.anchor.set(0.5, 0.5);
                this.groupButtons.addChild(selectBtn);
                xx += 72;
                if (i == 8 || i == 16 || i == 24 || i == 32) {
                    yy += 72;
                    xx = -235;
                }
            }
        };
        MainMenu.prototype.unlockAll = function () {
            for (var i = 1; i < 37; i++) {
                if (this._manager.localStorageGetNumber("level" + i) < 1) {
                    this._manager.localStorageSetNumber("level" + i, 1);
                    console.log("level" + i + " - unlocked");
                }
            }
            this._manager.localStorageSetNumber("film1", 1);
            this._manager.localStorageSetNumber("film2", 1);
            this._manager.localStorageSetNumber("film3", 1);
            this._manager.localStorageSetNumber("film4", 1);
            this.createOrUpdateSelectButtons();
        };
        MainMenu.prototype.inputOver = function (e) {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 6", TProject.BaseGame.soundVolume);
            e.scale.set(1.1, 1.1);
        };
        MainMenu.prototype.inputOut = function (e) {
            e.scale.set(1.0, 1.0);
        };
        MainMenu.prototype.selectClick = function (e) {
            var _this = this;
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            if (e.data.progress > 0) {
                console.log("load level " + e.data.curLev);
                var cur = e.data.curLev;
                this._manager.fadeSprite.goFade(function (e) {
                    if (TProject.BaseGame.isSoundOn)
                        TProject.SoundMixer.play("sound 2", TProject.BaseGame.musicVolume, true);
                    _this._manager.group4.visible = false;
                    _this._manager.currentLevel = cur;
                    _this._manager.restartLevel();
                }, 400, 800);
            }
        };
        MainMenu.prototype.filmClick = function (ef) {
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 7", TProject.BaseGame.soundVolume);
            console.log("film " + ef.data.curFilm);
            if (ef.data.allowComix == 1) {
                this.showComix(ef.data.curFilm);
            }
        };
        MainMenu.prototype.showComix = function (num) {
            var _this = this;
            this._manager.fadeSprite.goFade(function (e) {
                if (TProject.BaseGame.isSoundOn)
                    TProject.SoundMixer.play("sound 3", TProject.BaseGame.musicVolume, true);
                _this._manager.comixSprite.showComix(num);
                _this._manager.group4.visible = false;
            }, 500, 500);
        };
        return MainMenu;
    }(Phaser.Sprite));
    TProject.MainMenu = MainMenu;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var OButton = (function (_super) {
        __extends(OButton, _super);
        function OButton(game, key, frame, cb, invert) {
            if (cb === void 0) { cb = null; }
            if (invert === void 0) { invert = false; }
            var _this = this;
            var up = null;
            var over = null;
            var down = null;
            if (frame.length > 0) {
                up = frame[0];
                if (frame.length > 1) {
                    over = frame[1];
                    if (frame.length > 2)
                        down = frame[2];
                    else
                        down = frame[0];
                }
                else {
                    over = frame[0];
                    down = frame[0];
                }
            }
            _this = _super.call(this, game, 0, 0, key, null, null, over, up, down, null) || this;
            _this._framesString = [up, over, down];
            _this.soundOver = "over";
            _this.soundDown = "click";
            _this.anchor.setTo(0.5);
            _this._cb = cb;
            _this._deltaScale = 0.1;
            _this._defaultScale = 1.0;
            _this._isDown = false;
            _this._isOver = false;
            _this._invert = invert;
            if (_this._invert) {
                _this.scale.set(-_this._defaultScale, _this._defaultScale);
            }
            else {
                _this.scale.set(_this._defaultScale);
            }
            _this.onInputOver.add(_this.over, _this);
            _this.onInputOut.add(_this.out, _this);
            _this.onInputDown.add(_this.down, _this);
            _this.onInputUp.add(_this.up, _this);
            return _this;
        }
        OButton.prototype.setCBContext = function (cntx) {
            this._cntxt = cntx;
        };
        OButton.prototype.setAnimationScale = function (delta, defaultScale) {
            if (delta === void 0) { delta = 0; }
            if (defaultScale === void 0) { defaultScale = 1; }
            this._deltaScale = delta;
            this._defaultScale = defaultScale;
        };
        OButton.prototype.setNewFrames = function (frame) {
            var up = null;
            var over = null;
            var down = null;
            if (frame.length > 0) {
                up = frame[0];
                if (frame.length > 1) {
                    over = frame[1];
                    if (frame.length > 2)
                        down = frame[2];
                    else
                        down = frame[0];
                }
                else {
                    over = frame[0];
                    down = frame[0];
                }
            }
            this._framesString = [up, over, down];
            this.setFrames(over, up, down);
        };
        OButton.prototype.over = function () {
            if (!this._isDown) {
            }
            this._isOver = true;
        };
        OButton.prototype.out = function () {
            if (!this._isDown) {
                if (this._invert) {
                    this.scale.set(-this._defaultScale, this._defaultScale);
                }
                else {
                    this.scale.set(this._defaultScale);
                }
            }
            this._isOver = false;
        };
        OButton.prototype.up = function () {
            var _this = this;
            if (!this._isDown) {
                return;
            }
            if (this._invert) {
                this.scale.set(-this._defaultScale, this._defaultScale);
            }
            else {
                this.scale.set(this._defaultScale);
            }
            var tap = (this.game.device.desktop ? this._isOver : this.input.pointerOver());
            if (this._isOver) {
                this.frameName = this._framesString[1];
            }
            else {
                if (tap) {
                    setTimeout(function () {
                        _this.frameName = _this._framesString[0];
                    }, 5);
                }
            }
            this._isDown = false;
            if (tap && this._cb != null) {
                if (this._cntxt)
                    this._cb.bind(this._cntxt)();
                else
                    this._cb();
                this.frameName = this._framesString[0];
            }
            else {
                if (tap == false) {
                    if (this._invert) {
                        this.scale.set(-this._defaultScale, this._defaultScale);
                    }
                    else {
                        this.scale.set(this._defaultScale);
                    }
                }
            }
        };
        OButton.prototype.down = function () {
            if (this._isDown) {
                return;
            }
            if (this._invert) {
                this.scale.set(-(this._defaultScale - this._deltaScale), this._defaultScale - this._deltaScale);
            }
            else {
                this.scale.set(this._defaultScale - this._deltaScale);
            }
            this._isDown = true;
        };
        OButton.prototype.deleteFromParent = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.onInputOver.remove(this.over, this);
            this.onInputOut.remove(this.out, this);
            this.onInputDown.remove(this.down, this);
            this.onInputUp.remove(this.up, this);
        };
        Object.defineProperty(OButton.prototype, "enabled", {
            set: function (value) {
                this.inputEnabled = value;
                if (!value) {
                    this.frameName = this._framesString[0];
                    if (this._invert) {
                        this.scale.set(-this._defaultScale, this._defaultScale);
                    }
                    else {
                        this.scale.set(this._defaultScale);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OButton.prototype, "DefaultScale", {
            set: function (value) {
                this._defaultScale = value;
                this.scale.set(this._defaultScale);
            },
            enumerable: true,
            configurable: true
        });
        return OButton;
    }(Phaser.Button));
    TProject.OButton = OButton;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(game, manager) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this.index = 0;
            _this._manager = manager;
            _this.direction = 0;
            _this.speed = 0;
            _this.active = false;
            _this.createPart();
            return _this;
        }
        Particle.prototype.createPart = function () {
            this.graphics = this.game.add.sprite(0, 0, "blocks", "star_particle");
            this.addChild(this.graphics);
        };
        Particle.prototype.updateDa = function () {
            this.x += this._cos * this.speed;
            this.y += this._sin * this.speed;
            this.rotation += this.speed;
            this.speed *= Particle.FRICTION;
            this.alpha = (this.speed / Particle.MAX_SPEED) / 2 + .5;
            if (this.speed < 1) {
                this.speed = 0;
                this.active = false;
                this.parent.removeChild(this);
            }
        };
        Particle.prototype.initDa = function () {
            if (this.graphics == null) {
            }
            this.direction = ((Math.PI * 2) / 10) * this.index;
            this.speed = Math.random() * Particle.MAX_SPEED;
        };
        Object.defineProperty(Particle.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (d) {
                this._direction = d;
                this._cos = Math.cos(this._direction);
                this._sin = Math.sin(this._direction);
            },
            enumerable: true,
            configurable: true
        });
        Particle.MAX_SPEED = 8;
        Particle.FRICTION = 0.8;
        Particle.COLOR = 0xFFFFFF;
        Particle.SIZE = 5;
        return Particle;
    }(Phaser.Graphics));
    TProject.Particle = Particle;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Particles = (function () {
        function Particles(game, manager, d) {
            this.updEnable = false;
            this.display = d;
            this.hasListener = false;
            this.poolArray = new Array(Particles.POOL_SIZE);
            for (var i = 0; i < Particles.POOL_SIZE; i++) {
                this.poolArray[i] = new TProject.Particle(game, manager);
                this.poolArray[i].index = i;
            }
            manager.arrayParticles.push(this);
        }
        Particles.prototype.shoot = function (px, py) {
            for (var i = 0; i < Particles.POOL_SIZE; i++) {
                this.poolArray[i].initDa();
                this.display.addChild(this.poolArray[i]);
                this.poolArray[i].active = true;
                this.poolArray[i].x = px;
                this.poolArray[i].y = py;
            }
            if (!this.hasListener) {
                this.updEnable = true;
                this.hasListener = true;
            }
        };
        Particles.prototype.updateDa = function () {
            var anyActive = false;
            if (this.updEnable) {
                for (var i = 0; i < Particles.POOL_SIZE; i++) {
                    if (this.poolArray[i].active) {
                        this.poolArray[i].updateDa();
                        anyActive = true;
                    }
                }
                if (!anyActive) {
                    this.updEnable = false;
                    this.hasListener = false;
                }
            }
        };
        Particles.POOL_SIZE = 15;
        return Particles;
    }());
    TProject.Particles = Particles;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, manager) {
            var _this = _super.call(this, game, x, y) || this;
            _this.speedX = 0;
            _this.speedY = 0;
            _this.acceleration = 350;
            _this.jumpImpulse = 200;
            _this.jumpLimit = 5000;
            _this.fallLimit = 500;
            _this.gravity = 2300;
            _this.jumpGravity = 0;
            _this.topSpeed = 100;
            _this.fallFlag = false;
            _this.slideLimit = 10;
            _this.GOING_UP = 0.8;
            _this.GOING_DOWN = 1.2;
            _this.goingRight = false;
            _this.goingLeft = false;
            _this.goingUp = false;
            _this.goingDown = false;
            _this.actionDown = false;
            _this.changeCharacter = false;
            _this.jumping = false;
            _this.jumpEnabled = true;
            _this.onSlide = false;
            _this.dead = false;
            _this.win = false;
            _this.checkpointActual = 0;
            _this.starCollected = 0;
            _this.stepFlag = false;
            _this.timeStepMax = 250;
            _this.timeStep = _this.timeStepMax / 4;
            _this.onDoor = false;
            _this.actionEnabled = true;
            _this.moveEnabled = true;
            _this.onLadder = false;
            _this.climb = false;
            _this.onLadderTop = false;
            _this.touchingLadder = false;
            _this.wasClimbingUp = false;
            _this.colitionBot = false;
            _this.colitionTop = false;
            _this.colitionLeft = false;
            _this.colitionRight = false;
            _this.onHit = false;
            _this.tvNoise = null;
            _this.bounceSpeed = 150;
            _this.blockGrabbed = null;
            _this.headColition = false;
            _this.hasFloor = false;
            _this.onHole = false;
            _this.teleported = false;
            _this.dejavuPoint = new Phaser.Point();
            _this.dejavu = null;
            _this.actualStarCollected = 0;
            _this.myParam = true;
            _this.playerState = "none";
            _this.lastTime = -1;
            _this.dt = 0;
            _this.zamena = true;
            _this.onHoleTeleport = false;
            _this.visibleHitBox = false;
            _this.checkOverlapDraw = false;
            _this.anchor.set(0.5, 1);
            _this._colider = _this.game.add.sprite(0, -12.5, "darwin", "colider");
            _this._colider.anchor.set(0.5);
            _this.addChild(_this._colider);
            if (_this.visibleHitBox == false) {
                _this._colider.alpha = 0;
            }
            _this._floorColider = _this.game.add.sprite(0, 3.5, "darwin", "floorColider");
            _this._floorColider.anchor.set(0.5);
            _this.addChild(_this._floorColider);
            if (_this.visibleHitBox == false) {
                _this._floorColider.alpha = 0;
            }
            _this._damageColider = _this.game.add.sprite(0, -14.85, "darwin", "damageColider");
            _this._damageColider.anchor.set(0.5);
            _this.addChild(_this._damageColider);
            if (_this.visibleHitBox == false) {
                _this._damageColider.alpha = 0;
            }
            _this._semisolidColider = _this.game.add.sprite(0, -4, "darwin", "semisolidColider");
            _this._semisolidColider.anchor.set(0.5);
            _this.addChild(_this._semisolidColider);
            if (_this.visibleHitBox == false) {
                _this._semisolidColider.alpha = 0;
            }
            _this._headColider = _this.game.add.sprite(0, -37.5, "darwin", "headColider");
            _this._headColider.anchor.set(0.5);
            _this.addChild(_this._headColider);
            if (_this.visibleHitBox == false) {
                _this._headColider.alpha = 0;
            }
            _this.top1 = _this.game.add.sprite(-6, -24.25, "darwin", "hit_point");
            _this.top1.anchor.set(0.5);
            _this.addChild(_this.top1);
            if (_this.visibleHitBox == false) {
                _this.top1.alpha = 0;
            }
            _this.top2 = _this.game.add.sprite(6, -24.25, "darwin", "hit_point");
            _this.top2.anchor.set(0.5);
            _this.addChild(_this.top2);
            if (_this.visibleHitBox == false) {
                _this.top2.alpha = 0;
            }
            _this.left1 = _this.game.add.sprite(-11.75, -16.5, "darwin", "hit_point");
            _this.left1.anchor.set(0.5);
            _this.addChild(_this.left1);
            if (_this.visibleHitBox == false) {
                _this.left1.alpha = 0;
            }
            _this.left2 = _this.game.add.sprite(-11.75, -6.75, "darwin", "hit_point");
            _this.left2.anchor.set(0.5);
            _this.addChild(_this.left2);
            if (_this.visibleHitBox == false) {
                _this.left2.alpha = 0;
            }
            _this.right1 = _this.game.add.sprite(11.75, -16.5, "darwin", "hit_point");
            _this.right1.anchor.set(0.5);
            _this.addChild(_this.right1);
            if (_this.visibleHitBox == false) {
                _this.right1.alpha = 0;
            }
            _this.right2 = _this.game.add.sprite(11.75, -6.75, "darwin", "hit_point");
            _this.right2.anchor.set(0.5);
            _this.addChild(_this.right2);
            if (_this.visibleHitBox == false) {
                _this.right2.alpha = 0;
            }
            _this.down1 = _this.game.add.sprite(-6, 1.25, "darwin", "hit_point");
            _this.down1.anchor.set(0.5);
            _this.down1.width = 3;
            _this.down1.height = 3;
            _this.addChild(_this.down1);
            if (_this.visibleHitBox == false) {
                _this.down1.alpha = 0;
            }
            _this.down2 = _this.game.add.sprite(6, 1.25, "darwin", "hit_point");
            _this.down2.anchor.set(0.5);
            _this.down2.width = 3;
            _this.down2.height = 3;
            _this.addChild(_this.down2);
            if (_this.visibleHitBox == false) {
                _this.down2.alpha = 0;
            }
            _this.grapLeft = _this.game.add.sprite(-7, -12, "darwin", "grap_hit");
            _this.grapLeft.anchor.set(0.5);
            _this.addChild(_this.grapLeft);
            if (_this.visibleHitBox == false) {
                _this.grapLeft.alpha = 0;
            }
            _this.grapRight = _this.game.add.sprite(7, -12, "darwin", "grap_hit");
            _this.grapRight.anchor.set(0.5);
            _this.addChild(_this.grapRight);
            if (_this.visibleHitBox == false) {
                _this.grapRight.alpha = 0;
            }
            _this.darwin_skin = _this.game.add.sprite(0, 2, "darwin", "darwin0001");
            _this.darwin_skin.animations.add("parado", Phaser.Animation.generateFrameNames("darwin", 1, 24, "", 4));
            _this.darwin_skin.animations.add("caminando", Phaser.Animation.generateFrameNames("darwin", 25, 40, "", 4));
            _this.darwin_skin.animations.add("frenando", Phaser.Animation.generateFrameNames("darwin", 41, 48, "", 4));
            _this.darwin_skin.animations.add("saltar", Phaser.Animation.generateFrameNames("darwin", 49, 49, "", 4));
            _this.darwin_skin.animations.add("caer", Phaser.Animation.generateFrameNames("darwin", 50, 50, "", 4));
            _this.darwin_skin.animations.add("parado con caja", Phaser.Animation.generateFrameNames("darwin", 51, 62, "", 4));
            _this.darwin_skin.animations.add("caminando con caja", Phaser.Animation.generateFrameNames("darwin", 63, 78, "", 4));
            _this.darwin_skin.animations.add("salto con caja", Phaser.Animation.generateFrameNames("darwin", 79, 88, "", 4));
            _this.darwin_skin.animations.add("accion", Phaser.Animation.generateFrameNames("darwin", 89, 94, "", 4));
            _this.darwin_skin.animations.add("escalera", Phaser.Animation.generateFrameNames("darwin", 95, 101, "", 4));
            _this.darwin_skin.animations.add("muerte", Phaser.Animation.generateFrameNames("darwin", 103, 117, "", 4));
            _this.darwin_skin.animations.add("golpeado", Phaser.Animation.generateFrameNames("darwin", 118, 131, "", 4));
            _this.darwin_skin.animations.add("caer con caja", Phaser.Animation.generateFrameNames("darwin", 132, 132, "", 4));
            _this.darwin_skin.anchor.set(0.5, 1);
            _this.darwin_skin.alpha = 1;
            _this.addChild(_this.darwin_skin);
            _this.clip = _this.darwin_skin;
            _this.clip.play("parado", 30, true);
            _this._manager = manager;
            _this.V = _this.game.input.keyboard.addKey(Phaser.Keyboard.V);
            _this.W = _this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            _this.A = _this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            _this.S = _this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            _this.D = _this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            _this.T = _this.game.input.keyboard.addKey(Phaser.Keyboard.T);
            _this.SPACE = _this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            _this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            _this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            _this.upKeyVar = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            _this.downKeyVar = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            _this.game.input.keyboard.onDownCallback = function (e) { _this.keyDownHandle(e); };
            _this.game.input.keyboard.onUpCallback = function (e) { _this.keyUpHandle(e); };
            return _this;
        }
        Player.prototype.update = function () {
            this.game.stage.updateTransform();
            this.deltaTime();
            this.timeStep -= this.dt * 1000;
            this.checkWalls();
            this.checkLadders();
            if (this.jumping) {
                this.checkSemisolid();
            }
            this.walk();
            this.checkHole();
            if (this.blockGrabbed != null) {
                this.transportBlock();
            }
            if (!this.dead) {
                this.checkFall();
                this.checkTeleport();
                this.checkSpike();
                this.checkTvNoise();
                this.checkItems();
                this.checkDeJavu();
                this.checkEnemy();
            }
            this.onDead();
            this.onWin();
            this.stateMachineManager();
        };
        Player.prototype.downLeft = function () {
            if (this.clip.animations.name != "golpeado") {
                this.goingLeft = true;
                this.goingRight = false;
                if (this.climb) {
                    this.goingLeft = false;
                }
            }
            if (this.colitionRight) {
                this.colitionRight = false;
                this.x -= 1;
            }
        };
        Player.prototype.downRight = function () {
            if (this.clip.animations.name != "golpeado") {
                this.goingRight = true;
                this.goingLeft = false;
                if (this.climb) {
                    this.goingRight = false;
                }
            }
            if (this.colitionLeft) {
                this.colitionLeft = false;
                this.x += 1;
            }
        };
        Player.prototype.downUp = function () {
            this.goingUp = true;
        };
        Player.prototype.downDown = function () {
            this.goingDown = true;
        };
        Player.prototype.downAct = function () {
            if (!this.actionDown) {
                this.actionDown = true;
                this.doAction();
            }
        };
        Player.prototype.upLeft = function () {
            this.goingLeft = false;
        };
        Player.prototype.upRight = function () {
            this.goingRight = false;
        };
        Player.prototype.upUp = function () {
            this.goingUp = false;
            this.wasClimbingUp = false;
            this.onLadder = false;
        };
        Player.prototype.upDown = function () {
            this.goingDown = false;
            this.onLadder = false;
        };
        Player.prototype.upAct = function () {
            this.actionDown = false;
        };
        Player.prototype.keyDownHandle = function (EKEY) {
            var _this = this;
            if (this._manager.gameplay == false) {
                return;
            }
            if ((!this.dead) && (!this.win)) {
                if (EKEY.keyCode == this.leftKey.keyCode || EKEY.keyCode == this.A.keyCode) {
                    this.downLeft();
                }
                else if (EKEY.keyCode == this.rightKey.keyCode || EKEY.keyCode == this.D.keyCode) {
                    this.downRight();
                }
                if (EKEY.keyCode == this.upKeyVar.keyCode || EKEY.keyCode == this.W.keyCode) {
                    this.downUp();
                }
                if (EKEY.keyCode == this.downKeyVar.keyCode || EKEY.keyCode == this.S.keyCode) {
                    this.downDown();
                }
                if (EKEY.keyCode == this.SPACE.keyCode) {
                    this.downAct();
                }
                if (EKEY.keyCode == this.V.keyCode) {
                    this._manager.mainMenuSprite.unlockAll();
                }
            }
            if (EKEY.keyCode == this.T.keyCode) {
                this._manager.fadeSprite.goFade(function (e) { _this._manager.restartLevel(); }, 100, 800);
            }
        };
        Player.prototype.keyUpHandle = function (EKEY) {
            if (EKEY.keyCode == this.leftKey.keyCode || EKEY.keyCode == this.A.keyCode) {
                this.upLeft();
            }
            else if (EKEY.keyCode == this.rightKey.keyCode || EKEY.keyCode == this.D.keyCode) {
                this.upRight();
            }
            if (EKEY.keyCode == this.upKeyVar.keyCode || EKEY.keyCode == this.W.keyCode) {
                this.upUp();
            }
            if (EKEY.keyCode == this.downKeyVar.keyCode || EKEY.keyCode == this.S.keyCode) {
                this.upDown();
            }
            if (EKEY.keyCode == this.SPACE.keyCode) {
                this.upAct();
            }
        };
        Player.prototype.transportBlock = function () {
            this.blockGrabbed.x = this.x;
            this.blockGrabbed.y = this.y;
        };
        Player.prototype.doAction = function () {
            if (this._manager.gameplay == false) {
                return;
            }
            if (!this.actionEnabled) {
                return;
            }
            if ((this.jumping) || (this.onLadder)) {
                return;
            }
            if (this.speedY < 0) {
                return;
            }
            var actionDone = false;
            this.onDoor = false;
            for (var iter = 0; iter < this._manager.arrayDoor.children.length; iter++) {
                var door = this._manager.arrayDoor.children[iter];
                door;
                if (this.checkOverlap(this._colider, door)) {
                    this.onDoor = true;
                }
            }
            var colider = this._manager.theExit.data.colider;
            var coliderBoxLeft = this._manager.theExit.data.coliderBoxLeft;
            var coliderBoxRight = this._manager.theExit.data.coliderBoxRight;
            if (this.checkOverlap(this._colider, colider)) {
                this.onDoor = true;
            }
            if (this.checkOverlap(this._colider, coliderBoxLeft)) {
                if (this.clip.scale.x > 0) {
                    this.onDoor = true;
                }
            }
            if (this.checkOverlap(this._colider, coliderBoxRight)) {
                if (this.clip.scale.x < 0) {
                    this.onDoor = true;
                }
            }
            if (this.blockGrabbed == null) {
                actionDone = this.grabBlock();
            }
            else if (this.blockGrabbed != null) {
                if (!this.onDoor) {
                    this.releaseBlock();
                    actionDone = true;
                }
            }
            if (actionDone) {
                return;
            }
            if (this.blockGrabbed == null) {
                this.checkCrank();
                this.checkDoor();
                this.checkExitDoor();
                this.changeState("action");
            }
        };
        Player.prototype.grabBlock = function () {
            console.log("GRAB BLOCK");
            if ((this.blockGrabbed == null) && (!this.jumping)) {
                for (var iter = 0; iter < this._manager.arraySemisolid.children.length; iter++) {
                    var box = this._manager.arraySemisolid.children[iter];
                    var coliderBox = this._manager.arraySemisolid.children[iter].children[0];
                    var colider = this._manager.arraySemisolid.children[iter].children[1];
                    if (box.data.onNoise == false) {
                        if (((this.clip.scale.x > 0) && (this.checkOverlap(this.grapRight, coliderBox)))
                            || ((this.clip.scale.x < 0) && (this.checkOverlap(this.grapLeft, coliderBox)))) {
                            if (this.checkOverlap(this._floorColider, colider) == false) {
                                box.data.grabbed = true;
                                this.blockGrabbed = box;
                                this.blockGrabbed.data.falling = false;
                                this.blockGrabbed.visible = false;
                                this.changeState("stay box");
                                this._manager.wakeupBox();
                                return true;
                            }
                            else {
                            }
                        }
                    }
                }
            }
            return false;
        };
        Player.prototype.releaseBlock = function () {
            console.log("RELEASE BLOCK");
            var retorna = false;
            if (this.jumping) {
                return;
            }
            if (this.touchingLadder) {
                var ladderCollider = this.actualLadder.data.ladderColider;
                if (this.checkOverlap(this.right1, ladderCollider)) {
                    if (this.clip.scale.x > 0) {
                        retorna = true;
                    }
                }
                else if (this.checkOverlap(this.left1, ladderCollider)) {
                    if (this.clip.scale.x < 0) {
                        retorna = true;
                    }
                }
            }
            if (retorna) {
                return;
            }
            for (var iter = 0; iter < this._manager.arraySemisolid.children.length; iter++) {
                var box = this._manager.arraySemisolid.children[iter];
                var colider = this._manager.arraySemisolid.children[iter].children[1];
                if (this.checkOverlap(this._colider, colider)) {
                    if (box != this.blockGrabbed) {
                        this.blockGrabbed.y -= 25;
                    }
                }
            }
            this._manager.fixBoxFalling(this.blockGrabbed);
            this._manager.fixBoxBouncing(this.blockGrabbed, this.clip.scale.x);
            this.blockGrabbed.data.particleFlag = true;
            this.blockGrabbed.data.grabbed = false;
            this.blockGrabbed.visible = true;
            this.blockGrabbed = null;
            this._manager.wakeupBox();
        };
        Player.prototype.checkWalls = function () {
            if (this.dead) {
                return;
            }
            this.colitionBot = false;
            this.colitionTop = false;
            this.colitionLeft = false;
            this.colitionRight = false;
            this.jumping = true;
            this.hasFloor = false;
            this.headColition = false;
            for (var iter = 0; iter < this._manager.wallGroup.children.length; iter++) {
                var wallColider = this._manager.wallGroup.children[iter].data.colider;
                if (this._manager.wallGroup.children[iter].data.onNoise == false) {
                    if (this.onHole) {
                        return;
                    }
                    if (!this.headColition) {
                        if (this.checkOverlap(this._headColider, wallColider)) {
                            this.headColition = true;
                        }
                    }
                    if (!this.onHole) {
                        if (!this.hasFloor) {
                            this.checkBotColition(wallColider);
                        }
                        this.checkTopColition(wallColider);
                    }
                    if ((!this.colitionLeft) && (this.clip.scale.x < 0)) {
                        this.checkLeftColition(wallColider);
                    }
                    if ((!this.colitionRight) && (this.clip.scale.x > 0)) {
                        this.checkRightColition(wallColider);
                    }
                }
            }
        };
        Player.prototype.drawRectangles = function (spriteA, spriteB) {
            var boundsA = new Phaser.Rectangle(spriteA.worldPosition.x - spriteA.width * spriteA.anchor.x, spriteA.worldPosition.y - spriteA.height * spriteA.anchor.y, spriteA.width, spriteA.height);
            var boundsB = new Phaser.Rectangle(spriteB.worldPosition.x - spriteB.width * spriteB.anchor.x, spriteB.worldPosition.y - spriteB.height * spriteB.anchor.y, spriteB.width, spriteB.height);
            var draw2 = this.game.add.graphics(0, 0);
            draw2.beginFill(0xffffff, 0.5);
            draw2.drawRect(boundsB.x, boundsB.y, boundsB.width, boundsB.height);
            var draw1 = this.game.add.graphics(0, 0);
            draw1.beginFill(0xffffff);
            draw1.drawRect(boundsA.x, boundsA.y, boundsA.width, boundsA.height);
            console.log("ПЕРЕСЕЧЕНИЕ - " + Phaser.Rectangle.intersects(boundsA, boundsB));
            console.log("boundsA pos - " + boundsA.x + ", " + boundsA.y + ", BoundB pos - " + boundsB.x + ", " + boundsB.y);
        };
        Player.prototype.checkOverlap = function (spriteA, spriteB, draw) {
            if (draw === void 0) { draw = false; }
            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();
            var result = Phaser.Rectangle.intersects(boundsA, boundsB);
            if (draw == true && result == true) {
                console.log("A: " + boundsA.x, boundsA.y + ", B: " + boundsB.x, boundsB.y);
                var draw1 = this.game.add.graphics(0, 0);
                draw1.beginFill(0xffffff);
                draw1.drawRect(boundsA.x, boundsA.y, boundsA.width, boundsA.height);
                var draw2 = this.game.add.graphics(0, 0);
                draw2.beginFill(0x28C9AA);
                draw2.drawRect(boundsB.x, boundsB.y, boundsB.width, boundsB.height);
            }
            return result;
        };
        Player.prototype.checkRightColition = function (wall) {
            this.colitionRight = false;
            if (this.checkOverlap(this.right1, wall) || this.checkOverlap(this.right2, wall)) {
                this.colitionRight = true;
                this.x = wall.worldPosition.x - this._colider.width / 2 + 1;
            }
        };
        Player.prototype.checkLeftColition = function (wall) {
            this.colitionLeft = false;
            if (this.checkOverlap(this.left1, wall) || this.checkOverlap(this.left2, wall)) {
                this.colitionLeft = true;
                this.x = wall.worldPosition.x + wall.width + this._colider.width / 2 - 1;
            }
        };
        Player.prototype.checkBotColition = function (wall) {
            if (this.checkOverlap(this.down1, wall) || this.checkOverlap(this.down2, wall)) {
                if (this.speedY <= 0) {
                    this.y = wall.worldPosition.y - wall.height;
                    this.speedY = 0;
                    this.jumping = false;
                    this.hasFloor = true;
                }
            }
        };
        Player.prototype.checkTopColition = function (wall) {
            if (this.checkOverlap(this.top1, wall) || this.checkOverlap(this.top2, wall)) {
                if (this.speedY > 0) {
                    this.y = wall.worldPosition.y + this._colider.height;
                    this.speedY = 0;
                }
            }
        };
        Player.prototype.checkSemisolid = function () {
            if (this.dead) {
                return;
            }
            for (var iter2 = 0; iter2 < this._manager.arraySemisolid.children.length; iter2++) {
                var box = this._manager.arraySemisolid.children[iter2];
                var coliderBox = this._manager.arraySemisolid.children[iter2].data.coliderBox;
                var colider = this._manager.arraySemisolid.children[iter2].data.colider;
                var coliderCenter = this._manager.arraySemisolid.children[iter2].data.coliderCenter;
                var coliderFoot = this._manager.arraySemisolid.children[iter2].data.coliderFoot;
                if (box.data.onNoise == false) {
                    if (this.checkOverlap(this._floorColider, colider)) {
                        if (this.speedY == 0) {
                            this.jumping = false;
                        }
                        break;
                    }
                }
            }
            for (var L = 0; L < this._manager.arrayLadder.children.length; L++) {
                var ladder = this._manager.arrayLadder.children[L];
                var ladder_colider = this._manager.arrayLadder.children[L].data.colider;
                if (ladder.data.onNoise == false) {
                    if (this.checkOverlap(this._floorColider, ladder_colider)) {
                        if (this.speedY == 0) {
                            this.jumping = false;
                        }
                        break;
                    }
                }
            }
            if (!this.jumping) {
                return;
            }
            for (var iter = 0; iter < this._manager.arraySemisolid.children.length; iter++) {
                var box = this._manager.arraySemisolid.children[iter];
                var coliderBox = this._manager.arraySemisolid.children[iter].data.coliderBox;
                var colider = this._manager.arraySemisolid.children[iter].data.colider;
                var coliderCenter = this._manager.arraySemisolid.children[iter].data.coliderCenter;
                var coliderFoot = this._manager.arraySemisolid.children[iter].data.coliderFoot;
                if (box.data.onNoise == false && box.visible == true) {
                    if (this.checkOverlap(this._semisolidColider, colider)) {
                        if (this.speedY <= 0) {
                            this.speedY = 0;
                            this.jumping = false;
                            this.hasFloor = true;
                            var pt = new Phaser.Point(colider.worldPosition.x, colider.worldPosition.y);
                            this.y = pt.y;
                            break;
                        }
                    }
                }
            }
        };
        Player.prototype.walk = function () {
            if (this.dead) {
                this.goingRight = false;
                this.goingLeft = false;
                this.goingUp = false;
                this.goingDown = false;
            }
            if (this.moveEnabled == false) {
                return;
            }
            if (this.goingUp == false) {
                this.jumpEnabled = true;
            }
            if (this.zamena == true) {
                if (this.goingRight) {
                    this.speedX = this.topSpeed;
                    this.onSlide = false;
                }
                else if (this.goingLeft) {
                    this.speedX = -this.topSpeed;
                    this.onSlide = false;
                }
                else {
                    if (this.speedX < -this.slideLimit) {
                        this.speedX += this.acceleration * this.dt;
                        this.onSlide = true;
                    }
                    else if (this.speedX > this.slideLimit) {
                        this.speedX -= this.acceleration * this.dt;
                        this.onSlide = true;
                    }
                    if ((this.speedX < this.slideLimit) && (this.speedX > -this.slideLimit)) {
                        this.speedX = 0;
                        this.onSlide = false;
                    }
                }
                this.setClipDirection();
            }
            this.doTheJump();
            this.moveOnLadder();
            if ((this.colitionLeft) || (this.colitionRight)) {
                this.speedX = 0;
            }
            var yAlteration = 1;
            if (this.jumping) {
                if (this.speedY > 0) {
                    yAlteration = this.GOING_DOWN;
                }
                else {
                    yAlteration = this.GOING_UP;
                    this.fallFlag = true;
                }
            }
            if (this.onHoleTeleport == false) {
                this.x += this.speedX * this.dt * yAlteration;
            }
            this.y -= this.speedY * this.dt;
            if ((this.hasFloor) && (this.speedX != 0)) {
                this._manager.dust.emit(this.x, this.y);
            }
        };
        Player.prototype.doTheJump = function () {
            if ((!this.onLadder) && (!this.climb)) {
                if (this.goingUp) {
                    if ((!this.jumping) && (this.speedY >= 0) && (this.jumpEnabled) && (!this.headColition)) {
                        if (this.blockGrabbed == null) {
                            this.speedY = this.jumpImpulse;
                            this.jumping = true;
                            this.jumpEnabled = false;
                            this.jumpGravity = 0;
                            if (this.touchingLadder) {
                                this.y -= 5;
                            }
                            else {
                                this.y -= 1;
                            }
                            if (TProject.BaseGame.isSoundOn)
                                TProject.SoundMixer.play("sound 20", TProject.BaseGame.soundVolume);
                        }
                        else {
                            this.changeState("jumping box");
                        }
                    }
                }
                if (this.jumping) {
                    this.jumpGravity += this.gravity * this.dt;
                    this.speedY -= this.jumpGravity * this.dt;
                }
                if (this.speedY < -this.fallLimit) {
                    this.speedY = -this.fallLimit;
                    this.jumping = false;
                }
            }
        };
        Player.prototype.checkFall = function () {
            if (this.checkOverlap(this._colider, this._manager.deadWall)) {
                if (!this._manager.GAMEOVER) {
                    this._manager.GAMEOVER = true;
                    console.log("DEAD WALL DEATH");
                    this.changeState("lose falling");
                }
            }
        };
        Player.prototype.checkHole = function () {
            this.onHole = false;
            for (var iter = 0; iter < this._manager.arrayPit.children.length; iter++) {
                var colider = this._manager.arrayPit.children[iter].children[0];
                if (this.checkOverlap(this._colider, colider)) {
                    this.speedX = 0;
                    this.onHole = true;
                    console.log("HOLE");
                    break;
                }
            }
        };
        Player.prototype.onWin = function () {
            if (this.win) {
                if (this.speedY == 0) {
                    if (this._manager.gameplay) {
                        this.changeState("win");
                        this._manager.gameplay = false;
                    }
                }
            }
        };
        Player.prototype.onDead = function () {
            if (this.dead) {
                this.goingRight = false;
                this.goingLeft = false;
                this.goingUp = false;
                this.goingDown = false;
                this.speedX = 0;
                this._manager.gameplay = false;
            }
        };
        Player.prototype.setClipDirection = function () {
            if (this.speedX < 0) {
                if (this.clip.scale.x > 0) {
                    this.clip.scale.x *= -1;
                }
            }
            else if (this.speedX > 0) {
                if (this.clip.scale.x < 0) {
                    this.clip.scale.x *= -1;
                }
            }
        };
        Player.prototype.checkCrank = function () {
            for (var iter = 0; iter < this._manager.arrayCrank.children.length; iter++) {
                var crank = this._manager.arrayCrank.children[iter];
                if (this.checkOverlap(this._colider, crank.data.colider)) {
                    if (crank.animations.frameName == "crank0006") {
                        crank.animations.play("crank_off", 30, false);
                        this._manager.actionCrank(crank.data.letterType);
                        if (TProject.BaseGame.isSoundOn)
                            TProject.SoundMixer.play("sound 18", TProject.BaseGame.soundVolume);
                    }
                    if (crank.animations.frameName == "crank0011") {
                        crank.animations.play("crank_on", 30, false);
                        this._manager.actionCrank(crank.data.letterType);
                        if (TProject.BaseGame.isSoundOn)
                            TProject.SoundMixer.play("sound 18", TProject.BaseGame.soundVolume);
                    }
                }
            }
        };
        Player.prototype.checkLadders = function () {
            if (this.dead) {
                return;
            }
            this.touchingLadder = false;
            for (var iter = 0; iter < this._manager.arrayLadder.children.length; iter++) {
                var ladder = this._manager.arrayLadder.children[iter];
                var ladderColider = this._manager.arrayLadder.children[iter].data.ladderColider;
                var colider = this._manager.arrayLadder.children[iter].data.colider;
                var coliderBot = this._manager.arrayLadder.children[iter].data.coliderBot;
                if (ladder.data.onNoise == true) {
                    if (this.climb) {
                        if (this.checkOverlap(this._colider, ladderColider)) {
                            this.onLadder = false;
                            this.climb = false;
                            this.goingUp = false;
                            this.goingDown = false;
                        }
                    }
                }
                else if (ladder.data.onNoise == false) {
                    if (this.checkOverlap(this._colider, ladderColider)) {
                        this.touchingLadder = true;
                        if (this.actualLadder == null) {
                            this.goingUp = false;
                            this.actualLadder = ladder;
                        }
                    }
                    if (this.checkOverlap(this._floorColider, colider)) {
                        if (this.actualLadder == null) {
                            this.actualLadder = ladder;
                        }
                        this.snapToLadderTop();
                    }
                    else {
                    }
                    if (this.blockGrabbed == null) {
                        if (this.touchingLadder && !(this.goingRight || this.goingLeft)) {
                            if (this.goingUp) {
                                if (!this.onLadderTop) {
                                    this.onLadder = true;
                                    this.climb = true;
                                    this.wasClimbingUp = true;
                                }
                            }
                            else if (this.goingDown) {
                                if (this.onLadderTop) {
                                    this.onLadder = true;
                                    this.climb = true;
                                    this.y += 5;
                                    this.onLadderTop = false;
                                }
                                else if (this.checkOverlap(this.down1, this.actualLadder.data.coliderBot)
                                    || (this.checkOverlap(this.down2, this.actualLadder.data.coliderBot))) {
                                    if ((this.playerState == "stair") || (this.playerState == "stair")) {
                                        this.snapToLadderBot();
                                        this.jumping = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (this.climb) {
                this.goingRight = false;
                this.goingLeft = false;
                this.changeState("stair");
            }
            if (!this.touchingLadder) {
                this.actualLadder = null;
                this.onLadderTop = false;
                this.climb = false;
                this.onLadder = false;
            }
        };
        Player.prototype.snapToLadderBot = function () {
            console.log("snapToLadderBot");
            if (this.actualLadder == null) {
                return;
            }
            this.y = this.actualLadder.worldPosition.y;
            this.climb = false;
            this.onLadder = false;
        };
        Player.prototype.snapToLadderTop = function () {
            if (this.actualLadder == null) {
                return;
            }
            var pt = new Phaser.Point(this.actualLadder.data.colider.worldPosition.x, this.actualLadder.data.colider.worldPosition.y);
            if (((this.y > pt.y && this.climb) || (this.speedY <= 0)) && !(this.y == pt.y && this.jumping)) {
                if (this.speedY > 0) {
                    this.goingUp = false;
                }
                this.y = pt.y;
            }
            this.climb = false;
            this.onLadderTop = true;
            this.onLadder = false;
            if (this.wasClimbingUp) {
                this.goingUp = false;
            }
            this.jumping = false;
            this.speedY = 0;
            if ((this.playerState != "running") && (this.playerState != "running box")) {
                this.changeState("stay");
            }
        };
        Player.prototype.moveOnLadder = function () {
            if (this.actualLadder == null) {
                return;
            }
            if (this.climb) {
                var pt;
                if (this.goingUp) {
                    this.speedY = this.topSpeed;
                    this.speedX = 0;
                    pt = new Phaser.Point(this.actualLadder.worldPosition.x, this.actualLadder.worldPosition.y);
                    this.x = pt.x;
                }
                else if (this.goingDown) {
                    this.speedY = -this.topSpeed;
                    this.speedX = 0;
                    pt = new Phaser.Point(this.actualLadder.worldPosition.x, this.actualLadder.worldPosition.y);
                    this.x = pt.x;
                }
                else {
                    this.speedY = 0;
                }
            }
            else {
            }
        };
        Player.prototype.changeState = function (newState) {
            if (this.playerState == "lose") {
                return;
            }
            if (newState == "stair stop") {
                this.playerState = newState;
                this.stateMachine();
            }
            if (newState == "action") {
            }
            if (newState == "stay" || newState == "running" || newState == "stay box" || newState == "running box") {
                if (this.playerState == "jumping" || this.playerState == "jumping box" || this.playerState == "falling" || this.playerState == "falling box") {
                }
            }
            if (newState != this.playerState) {
                this.playerState = newState;
                this.stateMachine();
            }
        };
        Player.prototype.stateMachineManager = function () {
            if (this.clip.animations.name == "golpeado") {
                if (this.clip.animations.frameName == "darwin0131") {
                    this.changeState("stay");
                }
                return;
            }
            if (this.climb) {
                if (this.speedY == 0) {
                    if (this.checkOverlap(this._semisolidColider, this.actualLadder.children[2])) {
                        this.changeState("stay");
                    }
                    else {
                        this.changeState("stair stop");
                    }
                }
                else {
                    this.changeState("stair");
                }
                if (this.speedX != 0) {
                    this.changeState("falling");
                }
                return;
            }
            if (this.clip.animations.frameName == "darwin0088") {
                this.changeState("stay box");
            }
            if (this.clip.animations.frameName == "darwin0094") {
                this.changeState("stay");
            }
            if ((this.speedX == 0) && (this.speedY == 0) && (this.clip.animations.name != "accion")) {
                if (this.blockGrabbed == null) {
                    this.changeState("stay");
                }
                else {
                    if (this.clip.animations.name != "salto con caja") {
                        this.changeState("stay box");
                    }
                }
            }
            if ((this.speedX != 0) && (this.speedY == 0) && (this.clip.animations.name != "accion")) {
                this.checkRunning();
            }
            if (this.jumping) {
                if (this.speedY > 0) {
                    if (this.blockGrabbed == null) {
                        this.changeState("jumping");
                    }
                    else {
                    }
                }
                else {
                    if (this.blockGrabbed == null) {
                        this.changeState("falling");
                    }
                    else {
                        this.changeState("falling box");
                    }
                }
            }
        };
        Player.prototype.checkEnemy = function () {
            if (!this.clip.visible) {
                return;
            }
            for (var iter = 0; iter < this._manager.arrayEnemy.children.length; iter++) {
                var enemy = this._manager.arrayEnemy.children[iter];
                if (enemy.data.onNoise == false) {
                    if (this.checkOverlap(this._damageColider, enemy.data.colider)) {
                        this.changeState("lose");
                        iter = 10000;
                    }
                }
            }
        };
        Player.prototype.checkDeJavu = function () {
            if (this.tvNoise != null) {
                return;
            }
            for (var iter = 0; iter < this._manager.arrayDejavu.children.length; iter++) {
                var dejavuTHIS = this._manager.arrayDejavu.children[iter];
                if (dejavuTHIS.data.available == false) {
                    if (this.checkOverlap(this._colider, dejavuTHIS.data.colider)) {
                        this.dejavu = this._manager.arrayDejavu.children[iter];
                        this.dejavu.data.available = true;
                    }
                }
            }
            if (this.dejavu != null) {
                if (this.checkOverlap(this._colider, this.dejavu.data.vortex)) {
                    this.dejavuPoint = new Phaser.Point(this.dejavu.data.respawn.worldPosition.x, this.dejavu.data.respawn.worldPosition.y);
                    this.x = this.dejavuPoint.x + this.dejavu.data.respawn.width + this._colider.width / 2 + 1;
                }
                else if (this.checkOverlap(this._colider, this.dejavu.data.respawn)) {
                    this.dejavuPoint = new Phaser.Point(this.dejavu.data.vortex.worldPosition.x, this.dejavu.data.vortex.worldPosition.y);
                    this.x = this.dejavuPoint.x - this._colider.width / 2 - 1;
                }
            }
        };
        Player.prototype.getOutDejavu = function () {
            if (this.dejavu != null) {
                if (this.checkOverlap(this._colider, this.dejavu.data.colider) == false) {
                    this.dejavu.data.available = false;
                    this.dejavu = null;
                }
            }
        };
        Player.prototype.checkExitDoor = function () {
            var _this = this;
            if (this.dead) {
                return;
            }
            if (this._manager.theExit.data.onNoise) {
                console.log("DOOR NOISE DONT EXIT");
                return;
            }
            if (this.checkOverlap(this._colider, this._manager.theExit.data.colider)) {
                if (this.win == false) {
                    var puerta = this._manager.theExit;
                    if (this._manager.currentLevel != this._manager.totalLevel) {
                        this.exitClip = this.game.add.sprite(0, 0, "blocks", "exitdoorclip0001");
                        this.exitClip.anchor.set(0, 1);
                        this.exitClip.animations.add("exit_door_clip_stay", Phaser.Animation.generateFrameNames("exitdoorclip", 1, 1, "", 4));
                        this.exitClip.animations.add("exit_door_clip_open", Phaser.Animation.generateFrameNames("exitdoorclip", 2, 18, "", 4));
                        this.exitClip.play("exit_door_clip_stay", 30, false);
                        this.x = this._manager.theExit.x + 25 + 12.5;
                    }
                    else {
                        this.exitClip = this.game.add.sprite(-544, 0, "blocks", "door_end0001");
                        this.exitClip.anchor.set(0.5, 1);
                        this.exitClip.animations.add("exit_door_clip_stay", Phaser.Animation.generateFrameNames("door_end", 1, 1, "", 4));
                        this.exitClip.animations.add("exit_door_clip_open", Phaser.Animation.generateFrameNames("door_end", 1, 17, "", 4));
                        this.exitClip.play("exit_door_clip_stay", 30, false);
                    }
                    this._manager.group1.addChild(this.exitClip);
                    this.exitClip.x = puerta.worldPosition.x;
                    if (this._manager.currentLevel == this._manager.totalLevel) {
                        this.exitClip.x = puerta.data.clip.worldPosition.x;
                    }
                    this.exitClip.y = puerta.worldPosition.y;
                    this.exitClip.play("exit_door_clip_open", 30, false);
                    if (TProject.BaseGame.isSoundOn)
                        TProject.SoundMixer.play("sound 12", TProject.BaseGame.soundVolume);
                    for (var iter = 0; iter < this._manager.arrayStar.children.length; iter++) {
                        var star = this._manager.arrayStar.children[iter];
                        if (star.data.used == true) {
                            this._manager.localStorageSetNumber(star.data.unic, 1);
                        }
                    }
                    this.game.time.events.add(500, function (e) { _this.hidePlayer(e); });
                    var tempStar = this.actualStarCollected;
                    if (this._manager.localStorageGetNumber("level" + this._manager.currentLevel) < this.actualStarCollected + 1) {
                        this._manager.localStorageSetNumber("level" + this._manager.currentLevel, this.actualStarCollected + 1);
                    }
                    if (this._manager.localStorageGetNumber("level" + (this._manager.currentLevel + 1)) < 1) {
                        this._manager.localStorageSetNumber("level" + (this._manager.currentLevel + 1), 1);
                    }
                    if (this._manager.currentLevel == 11) {
                        this._manager.localStorageSetNumber("film2", 1);
                    }
                    else if (this._manager.currentLevel == 25) {
                        this._manager.localStorageSetNumber("film3", 1);
                    }
                    else if (this._manager.currentLevel == 36) {
                        this._manager.localStorageSetNumber("film4", 1);
                    }
                    this._manager.gameplayTableUI.showWinPanel(this.actualStarCollected);
                    this.win = true;
                    this.changeState("win");
                }
            }
        };
        Player.prototype.hidePlayer = function (e) {
            this.clip.visible = false;
            if (TProject.BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 14", TProject.BaseGame.soundVolume);
        };
        Player.prototype.checkItems = function () {
            if (this.clip.visible == false) {
                return;
            }
            for (var iter = 0; iter < this._manager.arrayStar.children.length; iter++) {
                var star = this._manager.arrayStar.children[iter];
                if (star.data.onNoise == false) {
                    if ((this.checkOverlap(this._colider, star.data.colider))
                        || (this.checkOverlap(this._headColider, star.data.colider))) {
                        if (star.data.used == false) {
                            star.data.used = true;
                            star.data.clip.play("star_hit", 30, false);
                            console.log("STAR HIT");
                            this._manager.particless.shoot(star.x, star.y);
                            if (TProject.BaseGame.isSoundOn)
                                TProject.SoundMixer.play("sound 24", TProject.BaseGame.soundVolume);
                            if (star.data.clip.alpha == 1) {
                                this.actualStarCollected++;
                                this.starCollected++;
                                this._manager.gameplayUI.updateStart();
                                console.log(star.data.clip.alpha + ", " + this.actualStarCollected);
                            }
                        }
                    }
                }
            }
        };
        Player.prototype.checkSpike = function () {
            for (var iter = 0; iter < this._manager.arraySpike.children.length; iter++) {
                var spike = this._manager.arraySpike.children[iter];
                if (spike.data.onNoise == false) {
                    if (this.checkOverlap(this._damageColider, spike.data.colider)) {
                        this.jumping = true;
                        this.changeState("lose");
                        console.log("SPIKE DEAD");
                        iter = 10000;
                    }
                }
            }
        };
        Player.prototype.checkTeleport = function () {
            var _this = this;
            if (this.teleported) {
                return;
            }
            if (this.dead) {
                return;
            }
            for (var iter = 0; iter < this._manager.arrayTeleport.children.length; iter++) {
                var teleport = this._manager.arrayTeleport.children[iter];
                if (this.checkOverlap(this._colider, teleport)) {
                    this.speedX = 0;
                    this.onHoleTeleport = true;
                    this.game.time.events.add(30, function (e) { _this.onHoleTeleport = false; });
                    var destiny;
                    destiny = this._manager.onHoleTeleport(teleport.data.myName);
                    if (this.checkOverlap(this._floorColider, teleport.data.vortex01)) {
                        destiny = destiny.data.vortex01;
                    }
                    else if (this.checkOverlap(this._floorColider, teleport.data.vortex02)) {
                        destiny = destiny.data.vortex02;
                    }
                    else if (this.checkOverlap(this._floorColider, teleport.data.vortex03)) {
                        destiny = destiny.data.vortex03;
                    }
                    else if (this.checkOverlap(this._floorColider, teleport.data.vortex04)) {
                        destiny = destiny.data.vortex04;
                    }
                    else if (this.checkOverlap(this._floorColider, teleport.data.vortex05)) {
                        destiny = destiny.data.vortex05;
                    }
                    else if (this.checkOverlap(this._floorColider, teleport.data.vortex06)) {
                        destiny = destiny.data.vortex06;
                    }
                    else if (this.checkOverlap(this._floorColider, teleport.data.vortex07)) {
                        destiny = destiny.data.vortex07;
                    }
                    else if (this.checkOverlap(this._floorColider, teleport.data.vortex08)) {
                        destiny = destiny.data.vortex08;
                    }
                    else if (this.checkOverlap(this._floorColider, teleport.data.vortex09)) {
                        destiny = destiny.data.vortex09;
                    }
                    else if (this.checkOverlap(this._floorColider, teleport.data.vortex10)) {
                        destiny = destiny.data.vortex10;
                    }
                    else {
                        destiny = null;
                    }
                }
                if (destiny != null) {
                    iter = 1000;
                }
            }
            if (destiny != null) {
                var pt = new Phaser.Point(destiny.worldPosition.x, destiny.worldPosition.y);
                this.x = pt.x + 12.5;
                this.y = pt.y;
                this.teleported = true;
                destiny = null;
                if (this.speedY > 0) {
                    this.speedY = this.jumpImpulse * 1.25;
                }
                this.game.time.events.add(250, function (e) { _this.teleportEnd(e); });
            }
        };
        Player.prototype.teleportEnd = function (e) {
            this.teleported = false;
        };
        Player.prototype.checkRunning = function () {
            if ((!this.jumping) && (!this.dead)) {
                if (this.blockGrabbed == null) {
                    if (!this.onSlide) {
                        this.changeState("running");
                    }
                    else {
                        this.changeState("stay");
                    }
                }
                else {
                    if (this.clip.animations.name != "salto con caja") {
                        this.changeState("running box");
                    }
                }
                this.doTheStep();
            }
        };
        Player.prototype.doTheStep = function () {
            if (this.onSlide) {
                return;
            }
            if (this.timeStep <= 0) {
                if (this.stepFlag) {
                    if (TProject.BaseGame.isSoundOn)
                        TProject.SoundMixer.play("sound 16", TProject.BaseGame.soundVolume);
                }
                else {
                    if (TProject.BaseGame.isSoundOn)
                        TProject.SoundMixer.play("sound 17", TProject.BaseGame.soundVolume);
                }
                this.stepFlag = !this.stepFlag;
                this.timeStep = this.timeStepMax;
            }
        };
        Player.prototype.checkTvNoise = function () {
            var aux = false;
            for (var iter = 0; iter < this._manager.arrayTvNoise.children.length; iter++) {
                var tv = this._manager.arrayTvNoise.children[iter];
                if (tv.data.onNoise == false) {
                    this.tvNoise = tv;
                    if (this.checkOverlap(this._colider, tv.data.colider)) {
                        aux = true;
                        if (this.checkOverlap(this._colider, tv.data.coliderLeft)) {
                            this.speedX = -this.bounceSpeed;
                            this.speedY = this.bounceSpeed / 2;
                            this.goingRight = false;
                            this.goingLeft = false;
                            this.goingUp = false;
                            this.goingDown = false;
                            this.onHit = true;
                            this.changeState("hit");
                            if (this.blockGrabbed != null) {
                                this.blockGrabbed.data.speedX = -this.blockGrabbed.data.spdX;
                                this.blockGrabbed.data.bounceLeft = true;
                                this.blockGrabbed.data.grabbed = false;
                                this.blockGrabbed.visible = true;
                                this.blockGrabbed = null;
                            }
                        }
                        if (this.checkOverlap(this._colider, tv.data.coliderRight)) {
                            this.speedX = this.bounceSpeed;
                            this.speedY = this.bounceSpeed / 2;
                            this.goingRight = false;
                            this.goingLeft = false;
                            this.goingUp = false;
                            this.goingDown = false;
                            this.onHit = true;
                            this.changeState("hit");
                            if (this.blockGrabbed != null) {
                                this.blockGrabbed.data.speedX = this.blockGrabbed.data.spdX;
                                this.blockGrabbed.data.bounceRight = true;
                                this.blockGrabbed.data.grabbed = false;
                                this.blockGrabbed.visible = true;
                                this.blockGrabbed = null;
                            }
                        }
                        if (this.checkOverlap(this._colider, tv.data.coliderTop)) {
                            this.speedY = this.bounceSpeed;
                            this.goingRight = false;
                            this.goingLeft = false;
                            this.goingUp = false;
                            this.goingDown = false;
                            this.onHit = true;
                            this.changeState("hit");
                        }
                        if (this.checkOverlap(this._colider, tv.data.coliderBot)) {
                            this.speedY = -this.bounceSpeed;
                            this.goingRight = false;
                            this.goingLeft = false;
                            this.goingUp = false;
                            this.goingDown = false;
                            this.onHit = true;
                            this.changeState("hit");
                        }
                    }
                }
            }
            if (!aux) {
                this.tvNoise = null;
            }
        };
        Player.prototype.checkDoor = function () {
            var destiny;
            if (!this.jumping) {
                for (var iter = 0; iter < this._manager.arrayDoor.children.length; iter++) {
                    var door = this._manager.arrayDoor.children[iter];
                    if (this.checkOverlap(this._colider, door.children[0])) {
                        destiny = this._manager.onDoorTeleport(door.data.myName);
                        door.scale.x = this.clip.scale.x;
                        destiny.scale.x = this.clip.scale.x;
                        this.clip.alpha = 0;
                        this.lastPortalDoor = destiny;
                        var anim;
                        if (this.clip == this.gumball_skin) {
                            door.animations.play("in_gumball", 30, false);
                            destiny.animations.play("out_gumball", 30, false);
                        }
                        else if (this.clip == this.darwin_skin) {
                            door.animations.play("in_darwin", 30, false);
                            destiny.animations.play("out_darwin", 30, false);
                        }
                        destiny.animations.currentAnim.onComplete.add(function () {
                            this.lastPortalDoor.animations.play("stay_darwin", 30, false);
                            this.actionEnabled = true;
                            this.moveEnabled = true;
                            this.clip.alpha = 1;
                            this.getOutDejavu();
                            this.changeState("stay");
                        }, this);
                        this.actionEnabled = false;
                        this.moveEnabled = false;
                        if (TProject.BaseGame.isSoundOn)
                            TProject.SoundMixer.play("sound 11", TProject.BaseGame.soundVolume);
                    }
                }
            }
            if (destiny != null) {
                destiny.scale.x = this.clip.scale.x;
                var pt = new Phaser.Point(destiny.worldPosition.x, destiny.worldPosition.y);
                this.x = pt.x;
                this.y = pt.y;
                this.speedX = 0;
                this.speedY = 0;
                destiny = null;
            }
        };
        Player.prototype.doorTeleportEnd = function (e) {
            this.actionEnabled = true;
            this.moveEnabled = true;
            this.getOutDejavu();
        };
        Player.prototype.stateMachine = function () {
            var _this = this;
            switch (this.playerState) {
                case "stay":
                    if (this.clip.animations.name != "parado") {
                        this.clip.play("parado", 30, true);
                    }
                    break;
                case "stay box":
                    if (this.clip.animations.name != "parado con caja") {
                        this.clip.play("parado con caja", 30, true);
                    }
                    break;
                case "running":
                    if (this.clip.animations.name != "caminando") {
                        this.clip.play("caminando", 30, true);
                    }
                    break;
                case "running box":
                    if (this.clip.animations.name != "caminando con caja") {
                        this.clip.play("caminando con caja", 30, true);
                    }
                    break;
                case "jumping":
                    if (this.clip.animations.name != "saltar") {
                        this.clip.play("saltar", 30, true);
                    }
                    break;
                case "jumping box":
                    if (this.clip.animations.name != "salto con caja") {
                        this.clip.play("salto con caja", 30, false);
                    }
                    break;
                case "falling":
                    if (this.clip.animations.name != "caer") {
                        this.clip.play("caer", 30, true);
                    }
                    break;
                case "falling box":
                    if (this.clip.animations.name != "caer con caja") {
                        this.clip.play("caer con caja", 30, true);
                    }
                    break;
                case "slide":
                    if (this.clip.animations.name != "frenando") {
                        this.clip.play("frenando", 30, true);
                    }
                    break;
                case "hit":
                    if (this.clip.animations.name != "golpeado") {
                        this.clip.play("golpeado", 30, true);
                        if (TProject.BaseGame.isSoundOn)
                            TProject.SoundMixer.play("sound 25", TProject.BaseGame.soundVolume);
                    }
                    break;
                case "stair":
                    if (this.clip.animations.name != "escalera") {
                        this.clip.play("escalera", 30, true);
                    }
                    else if (this.clip.animations.name == "escalera") {
                        this.clip.play("escalera", 30, true);
                    }
                    break;
                case "stair stop":
                    if (this.clip.animations.name == "escalera") {
                        this.clip.animations.stop();
                    }
                    else {
                        this.clip.play("escalera", 30, true);
                    }
                    break;
                case "action":
                    if (this.clip.animations.name != "accion") {
                        this.clip.play("accion");
                    }
                    break;
                case "lose":
                    if (this.clip.animations.name != "muerte") {
                        this.clip.play("muerte");
                        if (TProject.BaseGame.isSoundOn)
                            TProject.SoundMixer.play("sound 19", TProject.BaseGame.soundVolume);
                        if (this.blockGrabbed != null) {
                            this.releaseBlock();
                        }
                        this.dead = true;
                        this.goingUp = false;
                        this.onLadder = false;
                        this.game.time.events.add(600, function (e) { _this._manager.gameplayTableUI.showFailPanel(); });
                        this.speedX = 0;
                        if (this.jumping) {
                            this.speedY = this.jumpImpulse;
                        }
                        else {
                            this.speedY = this.jumpImpulse * 2;
                        }
                        this.jumping = true;
                    }
                    break;
                case "lose falling":
                    if (this.clip.animations.name != "muerte") {
                        this.clip.play("muerte");
                        this.game.time.events.add(250, function (e) { _this._manager.gameplayTableUI.showFailPanel(); });
                        if (TProject.BaseGame.isSoundOn)
                            TProject.SoundMixer.play("sound 19", TProject.BaseGame.soundVolume);
                        this.dead = true;
                        this.goingUp = false;
                        this.onLadder = false;
                    }
                    break;
                case "win":
                    if (this.clip.animations.name != "parado") {
                        this.clip.play("parado");
                    }
                    this.goingRight = false;
                    this.goingLeft = false;
                    break;
            }
        };
        Player.prototype.deltaTime = function () {
            if (this.lastTime == -1) {
                this.lastTime = Date.now();
            }
            this.dt = Date.now() - this.lastTime;
            this.lastTime += this.dt;
            this.dt /= 1000;
            if (this.dt > 0.036) {
                this.dt = 0.036;
            }
        };
        Player.prototype.keysFunc = function () {
        };
        return Player;
    }(Phaser.Sprite));
    TProject.Player = Player;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Smoke = (function () {
        function Smoke(game, manager, d) {
            this.enableUpdAll = false;
            this.display = d;
            this.poolArray = new Array(Smoke.POOL_SIZE);
            for (var i = 0; i < Smoke.POOL_SIZE; i++) {
                this.poolArray[i] = new TProject.SmokeParticle(game, manager);
            }
            manager.arrayParticles.push(this);
        }
        Smoke.prototype.start = function (px, py) {
            for (var i = 0; i < Smoke.POOL_SIZE; i++) {
                this.poolArray[i].initialX = px;
                this.poolArray[i].initialY = py;
                this.poolArray[i].initDa();
                this.display.addChild(this.poolArray[i]);
            }
            Smoke.allPoolArrays.push(this);
            if (!Smoke.hasListener) {
                this.enableUpdAll = true;
                Smoke.hasListener = true;
            }
        };
        Smoke.prototype.stop = function () {
            for (var i = 0; i < Smoke.POOL_SIZE; i++) {
                this.display.removeChild(this.poolArray[i]);
            }
        };
        Smoke.stopAll = function () {
            Smoke.allPoolArrays.forEach(function (smoke) {
                smoke.stop();
            });
            this.allPoolArrays = new Array();
        };
        Smoke.updateAll = function (e) {
            if (e === void 0) { e = null; }
            Smoke.allPoolArrays.forEach(function (smoke) {
                smoke.updateDa();
            });
        };
        Smoke.prototype.updateDa = function () {
            for (var i = 0; i < Smoke.POOL_SIZE; i++) {
                this.poolArray[i].updateDa();
            }
        };
        Smoke.POOL_SIZE = 5;
        Smoke.hasListener = false;
        Smoke.allPoolArrays = new Array();
        return Smoke;
    }());
    TProject.Smoke = Smoke;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var SmokeParticle = (function (_super) {
        __extends(SmokeParticle, _super);
        function SmokeParticle(game, manager) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this._manager = manager;
            _this.speed = 0;
            _this.createPart();
            return _this;
        }
        SmokeParticle.prototype.createPart = function () {
            this.graphics = this.game.add.graphics(0, 0);
            this.graphics.clear();
            this.graphics.beginFill(SmokeParticle.COLOR);
            this.graphics.drawCircle(-SmokeParticle.FINAL_RADIOUS / 2, -SmokeParticle.FINAL_RADIOUS / 2, SmokeParticle.FINAL_RADIOUS);
            this.graphics.endFill();
            this.addChild(this.graphics);
        };
        SmokeParticle.prototype.updateDa = function () {
            this.y -= this.speed;
            this.speed *= SmokeParticle.ACCELERATION;
            this.alpha = SmokeParticle.INITIAL_ALPHA - (this.speed / SmokeParticle.MAX_SPEED) * SmokeParticle.INITIAL_ALPHA;
            this.scale.x = this.scale.y = SmokeParticle.INITIAL_SCALE + (this.speed / SmokeParticle.MAX_SPEED) * (1 - SmokeParticle.INITIAL_SCALE);
            if (this.speed > SmokeParticle.MAX_SPEED) {
                this.initDa();
            }
        };
        SmokeParticle.prototype.initDa = function () {
            this.y = this.initialY;
            this.x = (this.initialX + Math.random() * SmokeParticle.PIT_WIDTH) + 2;
            this.speed = SmokeParticle.MAX_SPEED * SmokeParticle.INITIAL_SPEED + (Math.random() * (1 - SmokeParticle.INITIAL_SPEED)) * SmokeParticle.MAX_SPEED;
        };
        SmokeParticle.MAX_SPEED = 2;
        SmokeParticle.ACCELERATION = 1.05;
        SmokeParticle.INITIAL_ALPHA = 1;
        SmokeParticle.INITIAL_SCALE = 0.0;
        SmokeParticle.INITIAL_SPEED = 0.3;
        SmokeParticle.FINAL_RADIOUS = 6;
        SmokeParticle.COLOR = 0x000000;
        SmokeParticle.PIT_WIDTH = 21;
        return SmokeParticle;
    }(Phaser.Graphics));
    TProject.SmokeParticle = SmokeParticle;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var SoundMixer = (function () {
        function SoundMixer() {
        }
        SoundMixer.init = function (game) {
            SoundMixer._audio = game.add.audioSprite("sfx");
            this._playMusic = true;
        };
        SoundMixer.play = function (key, volume, bgMusic, loop) {
            if (volume === void 0) { volume = 0.3; }
            if (bgMusic === void 0) { bgMusic = false; }
            if (loop === void 0) { loop = false; }
            if (this._playMusic == false) {
                if (bgMusic) {
                    SoundMixer._bgKey = key;
                    SoundMixer._bgVolume = volume;
                    return;
                }
            }
            if (bgMusic) {
                if (SoundMixer._bg) {
                    SoundMixer._bg.stop();
                }
                SoundMixer._bgKey = key;
                SoundMixer._bgVolume = volume;
                SoundMixer._bg = SoundMixer._audio.play(key, volume);
                SoundMixer._bg.allowMultiple = true;
                SoundMixer._bg.loop = true;
                return SoundMixer._bg;
            }
            else {
                if (this._playMusic) {
                    var s = SoundMixer._audio.play(key, volume);
                    s.allowMultiple = true;
                    s.loop = loop;
                    return s;
                }
            }
        };
        SoundMixer.bgStop = function () {
            SoundMixer._bg.stop();
        };
        SoundMixer.on = function () {
            if (SoundMixer._bgKey) {
                this._playMusic = true;
                SoundMixer.play(SoundMixer._bgKey, SoundMixer._bgVolume, true, true);
            }
        };
        SoundMixer.off = function () {
            this._playMusic = false;
            SoundMixer._audio.stop(null);
        };
        return SoundMixer;
    }());
    TProject.SoundMixer = SoundMixer;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var testClass = (function (_super) {
        __extends(testClass, _super);
        function testClass(game, x, y, spr, num) {
            var _this = _super.call(this, game, x, y) || this;
            _this.anchor.set(0.0);
            _this._spr = _this.game.add.sprite(0, 0, spr);
            _this._spr.anchor.set(0.0);
            _this._spr.position.x = -300 * num;
            _this.addChild(_this._spr);
            _this._numCam = num;
            _this._numRoom = num + 1;
            _this.origX = x;
            _this.origY = y;
            _this._mask = _this.game.add.graphics(0, 0);
            _this._mask.beginFill(0xffffff);
            _this._mask.drawRect(x, y, 300, 200);
            _this._spr.mask = _this._mask;
            console.log(_this.x + " , " + _this.y + " | " + _this._mask.position.x + ", " + _this._mask.position.y);
            return _this;
        }
        testClass.prototype.updMask = function () {
            var difX = this.x - this.origX;
            var difY = this.y - this.origY;
            this._mask.position.x = difX;
            this._mask.position.y = difY;
            console.log(this.x + " ,,, " + this.y + " | " + this._mask.position.x + ", " + this._mask.position.y);
        };
        testClass.prototype.update = function () {
        };
        return testClass;
    }(Phaser.Sprite));
    TProject.testClass = testClass;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var BasePreloader = (function (_super) {
        __extends(BasePreloader, _super);
        function BasePreloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._loadedAssets = false;
            _this._loadedFont = false;
            return _this;
        }
        BasePreloader.prototype.preload = function () {
            this.game.load.onFileComplete.add(this.loadingUpdate, this);
            this._cnLogo = this.add.image(this.world.centerX - 3, this.world.centerY - 100 + 60, "cn_logo");
            this._cnLogo.scale.set(0.8);
            this._cnLogo.anchor.set(0.5);
            this._loading = new TProject.ParallaxImage(this.game, "preload", 0, "bgProress0000");
            this._loading.anchor.set(0.5);
            this._footer = this.add.image(this.world.centerX, this.world.centerY + 120 - 20, "preload", "preloaderFooter0000");
            this._footer.anchor.set(0.5);
            this._loading.x = this._footer.x - this._footer.width * 0.5 - 2;
            this._loading.y = this._footer.y - 50;
            this._loadingMask = this.add.graphics(4, 24);
            this._loadingMask.beginFill(0xff0000, 0.5);
            this._loadingMask.drawRect(0, 0, this._footer.width - 5, this._footer.height - 5);
            this._loadingMask.endFill();
            this._loading.addChild(this._loadingMask);
            this._loading.mask = this._loadingMask;
            this._loadingMask.scale.x = 0;
            this._loadedAssets = true;
            this._loadedFont = true;
            this.loading();
        };
        BasePreloader.prototype.loading = function () {
        };
        BasePreloader.prototype.loadSounds = function (names, format) {
            if (format === void 0) { format = "mp3"; }
            if (names == null || names.length == 0) {
                return;
            }
            for (var i = 0; i < names.length; i++) {
                this.game.load.audio(names[i], TProject.Boot.PATH_SOUNDS + names[i] + "." + format, true);
            }
        };
        BasePreloader.prototype.loadAudiosprite = function (name) {
            if (name === void 0) { name = "sfx"; }
            this.game.load.audiosprite(name, [TProject.Boot.PATH_SOUNDS + name + ".mp3", TProject.Boot.PATH_SOUNDS + name + ".ogg"], TProject.Boot.PATH_SOUNDS + name + ".json");
        };
        BasePreloader.prototype.loadFonts = function (fonts, stylename, cb) {
            var _this = this;
            if (stylename === void 0) { stylename = "styles"; }
            if (fonts == null || fonts.length == 0) {
                return;
            }
            TProject.System.loadFonts(fonts, stylename + ".css", function () {
                _this._loadedFont = true;
                if (cb) {
                    cb();
                }
            });
        };
        BasePreloader.prototype.loadAtlases = function (names, format) {
            if (format === void 0) { format = "png"; }
            if (names == null || names.length == 0) {
                return;
            }
            var arr;
            for (var i = 0; i < names.length; i++) {
                var name_1 = names[i].split("/").pop();
                var namepath = TProject.Boot.PATH_IMAGES + names[i];
                this.game.load.atlas(name_1, namepath + "." + format, namepath + ".json");
            }
            this._loadedAssets = false;
        };
        BasePreloader.prototype.loadImages = function (names, format) {
            if (format === void 0) { format = "png"; }
            if (names == null || names.length == 0) {
                return;
            }
            var arr;
            for (var i = 0; i < names.length; i++) {
                var name_2 = names[i].split("/").pop();
                var namepath = TProject.Boot.PATH_IMAGES + names[i];
                this.game.load.image(name_2, namepath + "." + format);
            }
            this._loadedAssets = false;
        };
        BasePreloader.prototype.loadAtlas = function (name, path) {
            path = path ? TProject.Boot.PATH_IMAGES + path : TProject.Boot.PATH_IMAGES;
            var namepath = path + name;
            this.game.load.atlas(name, namepath + ".png", namepath + ".json");
            this._loadedAssets = false;
        };
        BasePreloader.prototype.loadImage = function (name, path) {
            path = path ? TProject.Boot.PATH_IMAGES + path : TProject.Boot.PATH_IMAGES;
            var namepath = path + name;
            this.game.load.atlas(name, namepath + ".png", namepath + ".json");
            this._loadedAssets = false;
        };
        BasePreloader.prototype.shutdown = function () {
            this._cnLogo.destroy();
            this._cnLogo = null;
            this._loading.destroy();
            this._loading = null;
            this._footer.destroy();
            this._footer = null;
            this._loadingMask.destroy();
            this._loadingMask = null;
        };
        BasePreloader.prototype.loadingUpdate = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this._loadingMask.scale.x = progress / 100;
            if (progress >= 100.0) {
                this.game.load.onFileComplete.removeAll();
                this._loadedAssets = true;
                TProject.SoundMixer.init(this.game);
                clearInterval(this._intervalId);
            }
        };
        BasePreloader.prototype.update = function () {
            var _this = this;
            if (this._loadedAssets && this._loadedFont) {
                this._loadedAssets = false;
                setTimeout(function () {
                    _this.game.state.start(TProject.LocalConfig.CURRENT_STATE, true);
                }, 1800);
            }
        };
        return BasePreloader;
    }(Phaser.State));
    TProject.BasePreloader = BasePreloader;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var ParallaxImage = (function (_super) {
        __extends(ParallaxImage, _super);
        function ParallaxImage(game, bgPicName, beginOffset, frame) {
            if (beginOffset === void 0) { beginOffset = 0.0; }
            var _this = _super.call(this, game, 0.0, 0.0) || this;
            game.world.add(_this);
            _this._images = [];
            _this._images.push(new Phaser.Image(game, beginOffset, 0.0, bgPicName, frame));
            _this._imgWidth = _this._images[0].width;
            _this._images.push(new Phaser.Image(game, beginOffset + _this._imgWidth - 1.0, 0.0, bgPicName, frame));
            _this.addChild(_this._images[0]);
            _this.addChild(_this._images[1]);
            return _this;
        }
        ParallaxImage.prototype.updateScroll = function (speed) {
            this._images[0].x -= speed;
            this._images[1].x -= speed;
            if (this._images[0].x <= -this._imgWidth) {
                this._images[0].x = this._images[1].x + this._imgWidth - 1;
            }
            if (this._images[1].x <= -this._imgWidth) {
                this._images[1].x = this._images[0].x + this._imgWidth - 1;
            }
        };
        ParallaxImage.prototype.free = function () {
            this.removeChild(this._images[0]);
            this.removeChild(this._images[1]);
            this._images.pop().destroy(true);
            this._images.pop().destroy(true);
            this._images = null;
        };
        ParallaxImage.prototype.setPosition = function (x) {
            this._images[0].x = x;
            this._images[1].x = x + this._imgWidth - 1.0;
        };
        return ParallaxImage;
    }(Phaser.Sprite));
    TProject.ParallaxImage = ParallaxImage;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var System = (function () {
        function System() {
        }
        System.loadFonts = function (fonts, fileName, cb) {
            WebFont.load({
                custom: {
                    families: fonts,
                    urls: [
                        TProject.Boot.PATH_FONTS + fileName
                    ]
                },
                active: function () {
                    window.setTimeout(function () {
                        if (cb != null) {
                            cb();
                        }
                    }, 100);
                }
            });
        };
        return System;
    }());
    TProject.System = System;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var LocalConfig = (function () {
        function LocalConfig() {
        }
        LocalConfig.CURRENT_STATE = "BaseGame";
        LocalConfig.roomName = "kitchenRoom";
        LocalConfig.roomStage = 2;
        return LocalConfig;
    }());
    TProject.LocalConfig = LocalConfig;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Main = (function () {
        function Main() {
            this.game = new Phaser.Game(920, 620, Phaser.AUTO, "game_container", null, false);
            this.game.state.add("Boot", TProject.Boot, true);
            this.game.state.add("Preloader", TProject.Preloader);
            this.game.state.add("BaseGame", TProject.BaseGame);
        }
        Main.DEBUG = true;
        return Main;
    }());
    TProject.Main = Main;
})(TProject || (TProject = {}));
window.onload = function () {
    var game = new TProject.Main();
    setTimeout("window.scrollTo(0, 1)", 10);
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
};

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var BaseGame = (function (_super) {
        __extends(BaseGame, _super);
        function BaseGame() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.arrayA = new Array();
            _this.arrayA1 = new Array();
            _this.arrayB = new Array();
            _this.arrayC = new Array();
            _this.arrayD = new Array();
            _this.arrayE = new Array();
            _this.arrayF = new Array();
            _this.arrayG = new Array();
            _this.arrayActiveCams = new Array();
            _this.arrayParticles = new Array();
            _this.physDebug = true;
            _this.gameplay = false;
            _this.GAMEOVER = false;
            _this.gamePause = false;
            _this.lastTime = -1;
            _this.dt = 0;
            _this.fixFactor = 1;
            _this.currentLevel = 1;
            _this.totalLevel = 36;
            _this.debugPosCamera = false;
            _this.starInt = 0;
            _this.startCamNum = 9;
            _this.startEffectAllow = false;
            return _this;
        }
        BaseGame.prototype.create = function () {
            if (BaseGame.isSoundOn)
                TProject.SoundMixer.play("sound 1", BaseGame.musicVolume, true);
            console.log("Start game");
            this.Editor = new TProject.EditorClass(this.game, 0, 0, this);
            this.mainMenuSprite = new TProject.MainMenu(this.game, 0, 0, this);
            this.fadeSprite = new TProject.FadeClass(this.game, 0, 0, this);
            this.gameplayUI = new TProject.GameplayUI(this.game, 0, 0, this);
            this.gameplayTableUI = new TProject.GameplayTablesUI(this.game, 0, 0, this);
            this.comixSprite = new TProject.ComixClass(this.game, 0, 0, this);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.group1 = this.game.add.group();
            this.group1.position.y = 0;
            if (this.debugPosCamera == true) {
                this.group1.position.y = 0;
            }
            this.group2 = this.game.add.group();
            this.group3 = this.game.add.group();
            this.group4 = this.game.add.group();
            this.groupComix = this.game.add.group();
            this.group5 = this.game.add.group();
            this.group6 = this.game.add.group();
            this.resetAllArray();
            this.rent = this.game.add.renderTexture(2700, 620, 'myTexture');
            this.rent.renderXY(this.group1, 0, 0, true);
            if (this.debugPosCamera == false) {
                this.screenCam = this.game.add.sprite(0, 0, "screen_cam");
                this.screenCam.anchor.set(0, 0);
                this.group3.addChild(this.screenCam);
            }
            this.group3.addChild(this.gameplayUI);
            this.group4.addChild(this.mainMenuSprite);
            this.groupComix.addChild(this.comixSprite);
            this.group5.addChild(this.fadeSprite);
            this.group6.addChild(this.gameplayTableUI);
            this.startLevel();
            this.game.time.events.loop(100, this.startEffectEvent, this);
            this.game.time.events.loop(7000, this.randomSharkEffekt, this);
        };
        BaseGame.prototype.startLevel = function () {
            this.createLevel();
            this.createCamsOrigin();
            this.createCams();
            this.changeCamerasRooms();
            this.emptyCameraSort();
            this.checkFlipCamX();
            this.checkFlipCamY();
            this.setTutos();
            this.InitParticles();
            this.game.stage.updateTransform();
            if (BaseGame.firstStart == true) {
                if (this.game.device.desktop) {
                }
                else {
                    this.gameplayUI.createMobiles();
                }
                BaseGame.firstStart = false;
            }
        };
        BaseGame.prototype.InitParticles = function () {
            this.particless = new TProject.Particles(this.game, this, this.group1);
            this.dust = new TProject.Dust(this.game, this, this.group1);
            this.fall = new TProject.Fall(this.game, this, this.group1);
            for (var iter = 0; iter < this.arrayPit.children.length; iter++) {
                if (this.arrayPit.children[iter].data.myName == "pit") {
                    (new TProject.Smoke(this.game, this, this.group1)).start(this.arrayPit.children[iter].x, this.arrayPit.children[iter].y);
                }
            }
        };
        BaseGame.prototype.restartLevel = function () {
            var _this = this;
            this.gameplayUI.hideTutorTable();
            this.player.actualStarCollected = 0;
            this.starInt = 0;
            this.startCamNum = 9;
            this.startEffectAllow = true;
            this.startEffectEvent();
            this.startEffectAllow = false;
            this.game.time.events.add(400, function (e) { _this.startEffectAllow = true; });
            this.GAMEOVER = false;
            this.gamePause = false;
            this.gameplay = false;
            this.group1.removeAll();
            this.group2.removeAll();
            console.log("remove groups world");
            this.resetAllArray();
            this.startLevel();
            console.log("start update stars, actual stars: " + this.player.actualStarCollected + ", player: " + this.player);
            this.gameplayUI.updateStart();
            this.gameplayUI.updateLevelText();
        };
        BaseGame.prototype.resetAllArray = function () {
            this.camOrigArray = this.game.add.group();
            this.cameraArray = this.game.add.group();
            this.group2.add(this.cameraArray);
            this.arrayA = new Array();
            this.arrayA1 = new Array();
            this.arrayB = new Array();
            this.arrayC = new Array();
            this.arrayD = new Array();
            this.arrayE = new Array();
            this.arrayF = new Array();
            this.arrayG = new Array();
            this.arrayParticles = new Array();
            this.arrayActiveCams = new Array();
            this.exitDoorGroup = this.game.add.group();
            this.playerGroup = this.game.add.group();
            this.wallGroup = this.game.add.group();
            this.arrayPit = this.game.add.group();
            this.arrayLadder = this.game.add.group();
            this.arraySemisolid = this.game.add.group();
            this.arrayDoor = this.game.add.group();
            this.arrayTeleport = this.game.add.group();
            this.arraySpike = this.game.add.group();
            this.arrayStar = this.game.add.group();
            this.arrayDecor = this.game.add.group();
            this.arrayCrank = this.game.add.group();
            this.arrayButton = this.game.add.group();
            this.arrayTvNoise = this.game.add.group();
            this.arrayEnemy = this.game.add.group();
            this.arrayDejavu = this.game.add.group();
            this.arrayTutorial = this.game.add.group();
            this.group1.add(this.camOrigArray);
            this.group1.add(this.arrayDoor);
            this.group1.add(this.arrayDecor);
            this.group1.add(this.arrayTutorial);
            this.group1.add(this.exitDoorGroup);
            this.group1.add(this.arrayCrank);
            this.group1.add(this.arrayButton);
            this.group1.add(this.wallGroup);
            this.group1.add(this.arraySpike);
            this.group1.add(this.arrayStar);
            this.group1.add(this.arrayLadder);
            this.group1.add(this.playerGroup);
            this.group1.add(this.arrayPit);
            this.group1.add(this.arraySemisolid);
            this.group1.add(this.arrayTeleport);
            this.group1.add(this.arrayEnemy);
            this.group1.add(this.arrayTvNoise);
            this.group1.add(this.arrayDejavu);
            this.deadWall = this.game.add.sprite(-200, 350, "darwin", "colider");
            this.deadWall.anchor.set(0, 0);
            this.deadWall.width = 2048;
            this.deadWall.height = 25;
            this.group1.addChild(this.deadWall);
            console.log("ALL CHILD IN WORLD LENGTH: " + this.game.world.children.length + ", rnd:" + this.game.rnd.integerInRange(0, 1114));
        };
        BaseGame.prototype.actionCrank = function (letter) {
            var arrayAux;
            switch (letter) {
                case "A":
                    arrayAux = this.arrayA;
                    break;
                case "A1":
                    arrayAux = this.arrayA1;
                    break;
                case "B":
                    arrayAux = this.arrayB;
                    break;
                case "C":
                    arrayAux = this.arrayC;
                    break;
                case "D":
                    arrayAux = this.arrayD;
                    break;
                case "E":
                    arrayAux = this.arrayE;
                    break;
                case "F":
                    arrayAux = this.arrayF;
                    break;
                case "G":
                    arrayAux = this.arrayG;
                    break;
            }
            for (var iter = 0; iter < arrayAux.length; iter++) {
                if (arrayAux[iter].data.letterType == letter) {
                    if (arrayAux[iter].data.onNoise == true) {
                        this.setNoise(false, arrayAux[iter]);
                    }
                    else if (arrayAux[iter].data.onNoise == false) {
                        this.setNoise(true, arrayAux[iter]);
                    }
                }
            }
            this.wakeupBox();
        };
        BaseGame.prototype.setNoise = function (flag, spr) {
            var onNoise = flag;
            spr.data.onNoise = onNoise;
            if ((spr.data.myName == "tvNoiseA")
                || (spr.data.myName == "tvNoiseB")) {
                if (onNoise) {
                    spr.data.noiseClip.visible = false;
                }
                else {
                    spr.data.noiseClip.visible = true;
                }
            }
            else if ((spr.data.myName == "solidinmovilA")
                || (spr.data.myName == "solidinmovilA1")
                || (spr.data.myName == "solidinmovilB")
                || (spr.data.myName == "solidinmovilC")
                || (spr.data.myName == "solidinmovilD")
                || (spr.data.myName == "solidinmovilE")
                || (spr.data.myName == "solidinmovilEx8")
                || (spr.data.myName == "solidinmovilE2x2")
                || (spr.data.myName == "solidinmovilF")
                || (spr.data.myName == "starA")
                || (spr.data.myName == "starB")
                || (spr.data.myName == "starC")
                || (spr.data.myName == "starD")
                || (spr.data.myName == "starE")
                || (spr.data.myName == "starF")
                || (spr.data.myName == "starG")
                || (spr.data.myName == "boxA")
                || (spr.data.myName == "boxB")
                || (spr.data.myName == "boxC")
                || (spr.data.myName == "boxD")
                || (spr.data.myName == "boxE")
                || (spr.data.myName == "boxF")
                || (spr.data.myName == "ladderDX3")
                || (spr.data.myName == "ladderDX4")
                || (spr.data.myName == "ladderDX5")
                || (spr.data.myName == "spikeA")
                || (spr.data.myName == "spikeB")
                || (spr.data.myName == "spikeC")
                || (spr.data.myName == "spikeD")
                || (spr.data.myName == "spikeE")
                || (spr.data.myName == "spikeF")
                || (spr.data.myName == "enemyA")
                || (spr.data.myName == "enemyB")
                || (spr.data.myName == "enemyC")
                || (spr.data.myName == "enemyD")
                || (spr.data.myName == "enemyE")
                || (spr.data.myName == "enemyF")
                || (spr.data.myName == "semisolidA")
                || (spr.data.myName == "semisolidB")
                || (spr.data.myName == "exitLevelA")
                || (spr.data.myName == "exitLevelE")) {
                if (onNoise == true) {
                    spr.data.noiseClip.visible = true;
                    if ((spr.data.myName != "exitLevelE")
                        && (spr.data.myName != "exitLevelA")) {
                        spr.alpha = 0.5;
                    }
                    if ((spr.data.myName == "enemyA")
                        || (spr.data.myName == "enemyB")
                        || (spr.data.myName == "enemyC")
                        || (spr.data.myName == "enemyD")
                        || (spr.data.myName == "enemyE")
                        || (spr.data.myName == "enemyF")) {
                        spr.data.clip.play("enemy_stay", 30, false);
                    }
                }
                else {
                    spr.data.noiseClip.visible = false;
                    spr.alpha = 1;
                    if ((spr.data.myName == "enemyA")
                        || (spr.data.myName == "enemyB")
                        || (spr.data.myName == "enemyC")
                        || (spr.data.myName == "enemyD")
                        || (spr.data.myName == "enemyE")
                        || (spr.data.myName == "enemyF")) {
                        spr.data.clip.play("enemy_play", 30, true);
                    }
                }
            }
            else {
                if (onNoise) {
                    spr.alpha = 0.5;
                }
                else {
                    spr.alpha = 1;
                }
            }
            if ((spr.data.myName == "starA")
                || (spr.data.myName == "starB")
                || (spr.data.myName == "starC")
                || (spr.data.myName == "starD")
                || (spr.data.myName == "starE")
                || (spr.data.myName == "starF")
                || (spr.data.myName == "starG")) {
                if (onNoise) {
                    if (spr.data.used == false) {
                        spr.data.clip.play("star_stay", 30, true);
                        spr.data.clip.alpha = 0;
                        spr.alpha = spr.data.actualAlpha;
                    }
                    else {
                        spr.visible = false;
                    }
                }
                else {
                    if (spr.data.used == false) {
                        spr.data.clip.play("star_play", 30, true);
                        spr.data.clip.alpha = spr.data.actualAlpha;
                    }
                }
            }
        };
        BaseGame.prototype.createCamsOrigin = function () {
            var arrayNumAllRoom = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (var i = 0; i < 9; i++) {
                var picName = "cam" + (i + 1);
                var camOrigin = this.game.add.sprite(i * 300, 0, picName);
                if (this.debugPosCamera == false) {
                    var _bg_spr = this.game.add.sprite(0, 0, "blocks", "fondo");
                    _bg_spr.anchor.set(0.0);
                    camOrigin.addChild(_bg_spr);
                }
                camOrigin.data.isRoom = true;
                camOrigin.data.numRoom = (i + 1);
                camOrigin.data.numNeedRoom = this.arrayNeedNum[i];
                camOrigin.data.camActive = true;
                if (this.arrayNeedNum[i] == null) {
                    camOrigin.data.camActive = false;
                }
                this.camOrigArray.addChild(camOrigin);
            }
            this.ArrayEmptyRoom = TProject.ArrayOperat.GetArraysDiff(arrayNumAllRoom, this.arrayNeedNum);
        };
        BaseGame.prototype.createLevel = function () {
            console.log("start create level " + this.currentLevel);
            TProject.LevelsData.LevelFromDataBase(this.currentLevel, this.Editor, this);
        };
        BaseGame.prototype.createCams = function () {
            var xx = 10;
            var yy = 10;
            if (this.debugPosCamera == true) {
                yy = 250;
            }
            for (var i = 0; i < 9; i++) {
                if (i == 3 || i == 6) {
                    xx = 10;
                    yy += 200;
                }
                var newCam = new TProject.camClass(this.game, xx, yy, this.rent, i);
                newCam.name = "cam" + (i + 1);
                this.game.stage.addChild(newCam);
                this.cameraArray.add(newCam);
                xx += 300;
            }
        };
        BaseGame.prototype.createPlayer = function (x, y) {
            this.player = new TProject.Player(this.game, x, y, this);
            this.playerGroup.addChild(this.player);
        };
        BaseGame.prototype.wakeupBox = function () {
            for (var iter = 0; iter < this.arraySemisolid.children.length; iter++) {
                var box = this.arraySemisolid.children[iter];
                if (box.data.grabbed == false) {
                    box.data.falling = true;
                }
            }
        };
        BaseGame.prototype.onDoorTeleport = function (doorName) {
            if (doorName === void 0) { doorName = "none"; }
            var iter = 0;
            var destiny = "none";
            switch (doorName) {
                case "puerta1":
                    destiny = "puerta2";
                    break;
                case "puerta2":
                    destiny = "puerta1";
                    break;
                case "puerta3":
                    destiny = "puerta4";
                    break;
                case "puerta4":
                    destiny = "puerta3";
                    break;
                case "puerta5":
                    destiny = "puerta6";
                    break;
                case "puerta6":
                    destiny = "puerta5";
                    break;
                case "puerta7":
                    destiny = "puerta8";
                    break;
                case "puerta8":
                    destiny = "puerta7";
                    break;
            }
            for (iter = 0; iter < this.arrayDoor.children.length; iter++) {
                var tp_door = this.arrayDoor.children[iter];
                if (tp_door.data.myName == destiny) {
                    return tp_door;
                }
            }
            return null;
        };
        BaseGame.prototype.localStorageSetNumber = function (key, num) {
            var str = num + "";
            localStorage.setItem(key, str);
            console.log("key " + key + " set to" + str);
        };
        BaseGame.prototype.localStorageGetNumber = function (key) {
            var str = localStorage.getItem(key);
            var num;
            if (str == undefined) {
                num = 0;
            }
            else {
                num = parseInt(str);
            }
            return num;
        };
        BaseGame.prototype.changeCamerasRooms = function () {
            for (var i = 0, len = this.camOrigArray.children.length; i < len; i++) {
                if (this.camOrigArray.children[i] != null && this.camOrigArray.children[i].data.isRoom != undefined) {
                    for (var i2 = 0, len2 = this.cameraArray.children.length; i2 < len2; i2++) {
                        if (this.cameraArray.children[i2] != null && this.cameraArray.children[i2] instanceof TProject.camClass) {
                            var iii = this.cameraArray.children[i2]._numRoom;
                            if (this.camOrigArray.children[i].data.numRoom == iii) {
                                if (this.camOrigArray.children[i].data.camActive == true) {
                                    var needVal = this.camOrigArray.children[i].data.numNeedRoom;
                                    this.cameraArray.children[i2].position.x = this.cameraArray.getByName("cam" + needVal).origX;
                                    this.cameraArray.children[i2].position.y = this.cameraArray.getByName("cam" + needVal).origY;
                                    this.cameraArray.children[i2]._activeCam = true;
                                    this.cameraArray.children[i2].updMask();
                                    this.cameraArray.children[i2].noiseOff();
                                    this.cameraArray.children[i2].shakeOn();
                                    this.arrayActiveCams.push(this.cameraArray.children[i2]);
                                }
                                else {
                                    this.cameraArray.children[i2]._activeCam = false;
                                }
                            }
                        }
                    }
                }
            }
        };
        BaseGame.prototype.randomSharkEffekt = function () {
            var _this = this;
            if (this.gameplay == true && this.currentLevel >= 12) {
                console.log(this.currentLevel + " - current level");
                var num = this.game.rnd.integerInRange(0, this.arrayActiveCams.length - 1);
                var num2 = this.game.rnd.integerInRange(0, 2);
                console.log(num + " cam, active: " + num2);
                var cam = this.arrayActiveCams[num];
                if (num2 == 0) {
                    cam.timeShakeOn();
                }
                else if (num2 == 1) {
                    cam.timeShakeOn();
                    if (num > 1) {
                        this.game.time.events.add(300, function (e) { _this.arrayActiveCams[num - 1].timeShakeOn(); });
                    }
                }
                else if (num2 == 2) {
                }
            }
        };
        BaseGame.prototype.startEffectEvent = function () {
            if (this.startCamNum > 0 && this.startEffectAllow == true) {
                var cam = this.cameraArray.children[this.startCamNum - 1];
                if (cam._activeCam == true) {
                    cam.shakeOff();
                }
                else {
                    cam.blackScreenOn();
                }
                this.startCamNum -= 1;
                if (this.startCamNum == 1) {
                    this.gameplay = true;
                    console.log("gameplay = true");
                }
            }
        };
        BaseGame.prototype.emptyCameraSort = function () {
            for (var i2 = 0, len2 = this.cameraArray.children.length; i2 < len2; i2++) {
                if (this.cameraArray.children[i2]._activeCam == false) {
                    var emptyCam = this.cameraArray.children[i2];
                    var emptyPosCam = this.cameraArray.getByName("cam" + this.ArrayEmptyRoom[0]);
                    emptyCam.position.x = emptyPosCam.origX;
                    emptyCam.position.y = emptyPosCam.origY;
                    emptyCam.updMask();
                    this.ArrayEmptyRoom.shift();
                }
            }
        };
        BaseGame.prototype.checkFlipCamX = function () {
            for (var i = 0, len = this.ArrayFlipCamX.length; i < len; i++) {
                for (var i2 = 0, len2 = this.cameraArray.children.length; i2 < len2; i2++) {
                    var cam = this.cameraArray.children[i2];
                    if (cam._numRoom == this.ArrayFlipCamX[i]) {
                        cam.scale.x = -1;
                        cam.x += 300;
                        cam.startX += 300;
                    }
                }
            }
        };
        BaseGame.prototype.checkFlipCamY = function () {
            for (var i = 0, len = this.ArrayFlipCamY.length; i < len; i++) {
                for (var i2 = 0, len2 = this.cameraArray.children.length; i2 < len2; i2++) {
                    var cam = this.cameraArray.children[i2];
                    if (cam._numRoom == this.ArrayFlipCamY[i]) {
                        cam.scale.y = -1;
                        cam.y += 200;
                        cam.startY += 200;
                    }
                }
            }
        };
        BaseGame.prototype.testFunc = function () {
            console.log("testFunc");
        };
        BaseGame.prototype.checkFallingBox = function () {
            var myBox;
            var myBox2;
            var wall;
            var ladder;
            for (var iter = 0; iter < this.arraySemisolid.children.length; iter++) {
                myBox = this.arraySemisolid.children[iter];
                var myBox_coliderFoot = myBox.children[3];
                if ((!myBox.data.onNoise) && (!myBox.data.grabbed) && (myBox.data.falling)) {
                    for (var iter2 = 0; iter2 < this.arraySemisolid.children.length; iter2++) {
                        myBox2 = this.arraySemisolid.children[iter2];
                        var myBox2_colider = myBox2.children[1];
                        if (this.player.checkOverlap(myBox_coliderFoot, myBox2_colider)) {
                            if ((!myBox2.data.onNoise) && (!myBox2.data.grabbed)) {
                                myBox.data.falling = false;
                                iter2 = this.arraySemisolid.children.length;
                            }
                        }
                    }
                    for (var iter3 = 0; iter3 < this.wallGroup.children.length; iter3++) {
                        wall = this.wallGroup.children[iter3];
                        var wall_colider = wall.children[0];
                        if (this.player.checkOverlap(myBox_coliderFoot, wall_colider)) {
                            if (!wall.data.onNoise) {
                                myBox.data.falling = false;
                                iter3 = this.wallGroup.children.length;
                            }
                        }
                    }
                    for (var iter4 = 0; iter4 < this.arrayLadder.children.length; iter4++) {
                        ladder = this.arrayLadder.children[iter4];
                        var ladder_colider = ladder.children[1];
                        if (this.player.checkOverlap(myBox_coliderFoot, ladder_colider)) {
                            if (!ladder.data.onNoise) {
                                myBox.data.falling = false;
                                iter4 = this.arrayLadder.children.length;
                            }
                        }
                    }
                    if (myBox.data.falling) {
                        myBox.data.particleFlag = true;
                    }
                    if (!myBox.data.falling) {
                        myBox.data.speedY = myBox.data.spdY;
                        this.fixBoxFalling(myBox);
                    }
                }
            }
        };
        BaseGame.prototype.fixBoxFalling = function (myBox) {
            var fixY = myBox.y % 25;
            if (fixY < 12.5) {
                myBox.y -= fixY;
            }
            else {
                myBox.y += 25 - fixY;
            }
            if (myBox.data.particleFlag) {
                myBox.data.particleFlag = false;
                this.fall.shoot(myBox.x, myBox.y);
                if (BaseGame.isSoundOn)
                    TProject.SoundMixer.play("sound 29", BaseGame.soundVolume);
            }
        };
        BaseGame.prototype.fixBoxBouncing = function (myBox, direction) {
            var fixX = myBox.x % 25;
            if (fixX == 12.5 * this.fixFactor) {
            }
            else if (fixX < 12.5 * this.fixFactor) {
                myBox.x -= fixX * this.fixFactor;
                if (direction < 0) {
                    myBox.x -= (myBox.width / 2);
                }
                else {
                    myBox.x += (myBox.width / 2);
                }
            }
            else if (fixX > 12.5 * this.fixFactor) {
                myBox.x += (25 * this.fixFactor - fixX);
                if (direction < 0) {
                    myBox.x -= (myBox.width / 2);
                }
                else {
                    myBox.x += (myBox.width / 2);
                }
            }
            myBox.visible = true;
            this.game.stage.updateTransform();
            this.checkBoxVsWall(myBox, direction);
        };
        BaseGame.prototype.checkBoxVsWall = function (myBox, direction) {
            for (var iter = 0; iter < this.wallGroup.children.length; iter++) {
                var wall = this.wallGroup.children[iter];
                var wall_colider = wall.data.colider;
                var myBox_coliderCenter = myBox.data.coliderCenter;
                if (wall.data.onNoise == false) {
                    if (this.player.checkOverlap(myBox_coliderCenter, wall_colider)) {
                        if (direction > 0) {
                            myBox.x -= 25;
                        }
                        else if (direction < 0) {
                            myBox.x += 25;
                        }
                    }
                }
            }
        };
        BaseGame.prototype.checkBoxVsLadder = function (myBox, direction) {
            for (var iter = 0; iter < this.arrayLadder.children.length; iter++) {
                var ladder = this.arrayLadder.children[iter];
                var ladder_ladderColider = ladder.data.ladderColider;
                var myBox_coliderCenter = myBox.children[2];
                if (this.player.checkOverlap(myBox_coliderCenter, ladder_ladderColider)) {
                    if (direction > 0) {
                        if (this.player.x < ladder.x) {
                            myBox.x -= 25;
                        }
                        else {
                            myBox.x += 25;
                        }
                    }
                    else if (direction < 0) {
                        if (this.player.x < ladder.x) {
                            myBox.x -= 25;
                        }
                        else {
                            myBox.x += 25;
                        }
                    }
                }
            }
        };
        BaseGame.prototype.boxWalk = function () {
            var myBox;
            for (var iter = 0; iter < this.arraySemisolid.children.length; iter++) {
                if (this.arraySemisolid.children[iter].data.falling) {
                    myBox = this.arraySemisolid.children[iter];
                    myBox.data.speedY += 500 * this.dt;
                    this.checkBoxVsHole(myBox);
                    if (myBox.data.speedY > 400) {
                        myBox.data.speedY = 400;
                    }
                    myBox.y += myBox.data.speedY * this.dt;
                }
                if (this.arraySemisolid.children[iter].data.bounceLeft) {
                    myBox = this.arraySemisolid.children[iter];
                    myBox.x += myBox.data.speedX * this.dt;
                    myBox.data.speedX += 275 * this.dt;
                    if (myBox.data.speedX >= 0) {
                        myBox.data.speedX = 0;
                        myBox.bounceLeft = false;
                        this.fixBoxBouncing(myBox, -1);
                    }
                }
                if (this.arraySemisolid.children[iter].data.bounceRight) {
                    myBox = this.arraySemisolid.children[iter];
                    myBox.x += myBox.data.speedX * this.dt;
                    myBox.data.speedX -= 275 * this.dt;
                    if (myBox.data.speedX <= 0) {
                        myBox.data.speedX = 0;
                        myBox.bounceRight = false;
                        this.fixBoxBouncing(myBox, 1);
                    }
                }
            }
        };
        BaseGame.prototype.checkBoxVsHole = function (myBox) {
            for (var iter = 0; iter < this.arrayTeleport.children.length; iter++) {
                var teleport = this.arrayTeleport.children[iter];
                if (this.player.checkOverlap(myBox, teleport)) {
                    var destiny;
                    destiny = this.onHoleTeleport(teleport.data.myName, true);
                    var myBox_coliderFoot = myBox.children[3];
                    if (destiny != null) {
                        if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex01)) {
                            destiny = destiny.data.vortex01;
                        }
                        else if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex02)) {
                            destiny = destiny.data.vortex02;
                        }
                        else if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex03)) {
                            destiny = destiny.data.vortex03;
                        }
                        else if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex04)) {
                            destiny = destiny.data.vortex04;
                        }
                        else if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex05)) {
                            destiny = destiny.data.vortex05;
                        }
                        else if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex06)) {
                            destiny = destiny.data.vortex06;
                        }
                        else if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex07)) {
                            destiny = destiny.data.vortex07;
                        }
                        else if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex08)) {
                            destiny = destiny.data.vortex08;
                        }
                        else if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex09)) {
                            destiny = destiny.data.vortex09;
                        }
                        else if (this.player.checkOverlap(myBox_coliderFoot, teleport.data.vortex10)) {
                            destiny = destiny.data.vortex10;
                        }
                        else {
                            destiny = null;
                        }
                    }
                }
            }
            if (destiny != null) {
                var pt = new Phaser.Point(destiny.worldPosition.x, destiny.worldPosition.y);
                myBox.x = pt.x + 12.5;
                myBox.y = pt.y - 0;
                destiny = null;
            }
        };
        BaseGame.prototype.enemyWalk = function () {
            for (var iter = 0; iter < this.arrayEnemy.children.length; iter++) {
                var myEnemy = this.arrayEnemy.children[iter];
                if (!myEnemy.data.onNoise) {
                    myEnemy.x += myEnemy.data.speedX * this.dt;
                    if (myEnemy.data.speedX > 0) {
                    }
                    else {
                    }
                }
            }
        };
        BaseGame.prototype.enemyCheckWall = function () {
            var fixX;
            for (var iter = 0; iter < this.arrayEnemy.children.length; iter++) {
                var myEnemy = this.arrayEnemy.children[iter];
                if (!myEnemy.data.onNoise) {
                    for (var iter2 = 0; iter2 < this.wallGroup.children.length; iter2++) {
                        var wall = this.wallGroup.children[iter2];
                        if (!wall.data.onNoise) {
                            if (this.player.checkOverlap(myEnemy.data.coliderRight, wall.data.colider)) {
                                myEnemy.data.speedX = -50;
                                fixX = myEnemy.x % 25;
                                if (fixX < 12) {
                                    myEnemy.x -= fixX;
                                }
                                else {
                                    myEnemy.x -= 25 - fixX;
                                }
                            }
                            else if (this.player.checkOverlap(myEnemy.data.coliderLeft, wall.data.colider)) {
                                myEnemy.data.speedX = +50;
                                fixX = myEnemy.x % 25;
                                if (fixX < 12) {
                                    myEnemy.x += fixX;
                                }
                                else {
                                    myEnemy.x += 25 - fixX;
                                }
                            }
                        }
                    }
                }
            }
        };
        BaseGame.prototype.enemyCheckFoot = function () {
            var fixX;
            for (var iter = 0; iter < this.arrayEnemy.children.length; iter++) {
                var myEnemy = this.arrayEnemy.children[iter];
                if (!myEnemy.data.onNoise) {
                    var touchR = false;
                    var touchL = false;
                    for (var iter2 = 0; iter2 < this.wallGroup.children.length; iter2++) {
                        var wall = this.wallGroup.children[iter2];
                        if (!wall.data.onNoise) {
                            if (!touchR) {
                                if (this.player.checkOverlap(myEnemy.data.coliderRightFoot, wall.data.colider)) {
                                    touchR = true;
                                }
                            }
                            if (!touchL) {
                                if (this.player.checkOverlap(myEnemy.data.coliderLeftFoot, wall.data.colider)) {
                                    touchL = true;
                                }
                            }
                        }
                        if ((touchR) && (touchL)) {
                            iter2 = this.wallGroup.children.length;
                        }
                    }
                    for (var iter3 = 0; iter3 < this.arrayLadder.children.length; iter3++) {
                        var ladder = this.arrayLadder.children[iter3];
                        if (!ladder.data.onNoise) {
                            if (!touchR) {
                                if (this.player.checkOverlap(myEnemy.data.coliderRightFoot, ladder.data.colider)) {
                                    touchR = true;
                                }
                            }
                            if (!touchL) {
                                if (this.player.checkOverlap(myEnemy.data.coliderLeftFoot, ladder.data.colider)) {
                                    touchL = true;
                                }
                            }
                        }
                        if ((touchR) && (touchL)) {
                            iter3 = this.arrayLadder.children.length;
                        }
                    }
                    if (!touchR) {
                        myEnemy.data.speedX = -50;
                        fixX = myEnemy.x % 25;
                        if (fixX < 12) {
                            myEnemy.x -= fixX;
                        }
                        else {
                            myEnemy.x -= 25 - fixX;
                        }
                    }
                    else if (!touchL) {
                        myEnemy.data.speedX = +50;
                        fixX = myEnemy.x % 25;
                        if (fixX < 12) {
                            myEnemy.x += fixX;
                        }
                        else {
                            myEnemy.x += 25 - fixX;
                        }
                    }
                }
            }
        };
        BaseGame.prototype.enemyCheckCrank = function () {
            var theEnemy;
            var theCrank;
            for (var iterE = 0; iterE < this.arrayEnemy.children.length; iterE++) {
                theEnemy = this.arrayEnemy.children[iterE];
                for (var iter = 0; iter < this.arrayCrank.children.length; iter++) {
                    theCrank = this.arrayCrank.children[iter];
                    if (this.player.checkOverlap(theEnemy.data.colider, theCrank.data.colider)) {
                        if (theEnemy.data.speedX > 0) {
                            if (theCrank.animations.frameName == "crank0006" && theCrank.data.state == "on") {
                                theCrank.animations.play("crank_off", 30, false);
                                this.actionCrank(theCrank.data.letterType);
                                theCrank.data.state = "off";
                                console.log("CRANK OFF");
                                if (BaseGame.isSoundOn)
                                    TProject.SoundMixer.play("sound 18", BaseGame.soundVolume);
                            }
                        }
                        else if (theEnemy.data.speedX < 0) {
                            if (theCrank.animations.frameName == "crank0011" && theCrank.data.state == "off") {
                                theCrank.animations.play("crank_on", 30, false);
                                console.log("CRANK ON");
                                this.actionCrank(theCrank.data.letterType);
                                theCrank.data.state = "on";
                                if (BaseGame.isSoundOn)
                                    TProject.SoundMixer.play("sound 18", BaseGame.soundVolume);
                            }
                        }
                    }
                }
            }
        };
        BaseGame.prototype.onHoleTeleport = function (holeName, isBox) {
            if (holeName === void 0) { holeName = "none"; }
            if (isBox === void 0) { isBox = false; }
            var iter = 0;
            var destiny = "none";
            if (!isBox) {
                switch (holeName) {
                    case "holeTeleport1":
                        destiny = "holeTeleport2";
                        break;
                    case "holeTeleport2":
                        destiny = "holeTeleport1";
                        break;
                    case "holeTeleport3":
                        destiny = "holeTeleport4";
                        break;
                    case "holeTeleport4":
                        destiny = "holeTeleport3";
                        break;
                    case "holeTeleport5":
                        destiny = "holeTeleport6";
                        break;
                    case "holeTeleport6":
                        destiny = "holeTeleport5";
                        break;
                    case "holeTeleport7":
                        destiny = "holeTeleport8";
                        break;
                    case "holeTeleport8":
                        destiny = "holeTeleport7";
                        break;
                }
            }
            else {
                switch (holeName) {
                    case "holeTeleport1":
                        destiny = "holeTeleport2";
                        break;
                    case "holeTeleport2":
                        destiny = "none";
                        break;
                    case "holeTeleport3":
                        destiny = "holeTeleport4";
                        break;
                    case "holeTeleport4":
                        destiny = "none";
                        break;
                    case "holeTeleport5":
                        destiny = "holeTeleport6";
                        break;
                    case "holeTeleport6":
                        destiny = "none";
                        break;
                    case "holeTeleport7":
                        destiny = "holeTeleport8";
                        break;
                    case "holeTeleport8":
                        destiny = "none";
                        break;
                }
            }
            if (destiny == "none") {
                return null;
            }
            for (iter = 0; iter < this.arrayTeleport.children.length; iter++) {
                if (this.arrayTeleport.children[iter].data.myName == destiny) {
                    return this.arrayTeleport.children[iter];
                }
            }
            return null;
        };
        BaseGame.prototype.levelUpdate = function () {
            this.deltaTime();
            if (this.gamePause) {
                return;
            }
            if (this.gameplay) {
                this.enemyWalk();
                this.enemyCheckWall();
                this.enemyCheckFoot();
                this.enemyCheckCrank();
                this.checkButton();
                this.checkTutorial();
                this.checkFallingBox();
                this.boxWalk();
            }
        };
        BaseGame.prototype.checkButton = function () {
            var theButton;
            for (var iter = 0; iter < this.arrayButton.children.length; iter++) {
                theButton = this.arrayButton.children[iter];
                theButton.data.used = false;
                if (this.player.checkOverlap(this.player._colider, theButton.data.colider)) {
                    theButton.data.used = true;
                }
                if (!theButton.data.used) {
                    for (var iterE = 0; iterE < this.arrayEnemy.children.length; iterE++) {
                        if (this.player.checkOverlap(this.arrayEnemy.children[iterE].data.colider, theButton.data.colider)) {
                            theButton.data.used = true;
                        }
                    }
                }
                if (theButton.data.used == false) {
                    for (var iter2 = 0; iter2 < this.arraySemisolid.children.length; iter2++) {
                        if (this.player.checkOverlap(this.arraySemisolid.children[iter2], theButton.data.colider)) {
                            if (this.arraySemisolid.children[iter2].visible == true) {
                                theButton.data.used = true;
                            }
                        }
                    }
                }
            }
            for (var iter3 = 0; iter3 < this.arrayButton.children.length; iter3++) {
                theButton = this.arrayButton.children[iter3];
                if ((theButton.data.used) && (theButton.animations.frameName == "button0001")) {
                    theButton.loadTexture("blocks", "button0002");
                    this.actionCrank(theButton.data.letterType);
                    if (BaseGame.isSoundOn)
                        TProject.SoundMixer.play("sound 15", BaseGame.soundVolume);
                }
                if ((theButton.data.used == false) && (theButton.animations.frameName == "button0002")) {
                    theButton.loadTexture("blocks", "button0001");
                    this.actionCrank(theButton.data.letterType);
                    if (BaseGame.isSoundOn)
                        TProject.SoundMixer.play("sound 15", BaseGame.soundVolume);
                }
            }
        };
        BaseGame.prototype.setTutos = function () {
            for (var iter = 0; iter < this.arrayTutorial.children.length; iter++) {
                if (this.player.x < this.arrayTutorial.children[iter].x) {
                    this.arrayTutorial.children[iter].scale.x = -1;
                }
                else {
                    this.arrayTutorial.children[iter].scale.x = 1;
                }
            }
        };
        BaseGame.prototype.checkTutorial = function () {
            for (var iter = 0; iter < this.arrayTutorial.children.length; iter++) {
                var tutor = this.arrayTutorial.children[iter];
                if (this.player.checkOverlap(this.player._colider, tutor.data.colider)) {
                    if (this.player.x < tutor.x) {
                        tutor.scale.x = -1;
                    }
                    else {
                        tutor.scale.x = 1;
                    }
                    if (tutor.data.clip != null) {
                        if (tutor.data.clip.data.curFrame == 1) {
                            tutor.data.clip.loadTexture("blocks", tutor.data.img2);
                            tutor.data.clip.data.curFrame = 2;
                            this.gameplayUI.showTutorTable(tutor.data.type, tutor.data.textNum);
                        }
                    }
                }
                else {
                    if (tutor.data.clip != null) {
                        if (tutor.data.clip.data.curFrame == 2) {
                            tutor.data.clip.loadTexture("blocks", tutor.data.img1);
                            tutor.data.clip.data.curFrame = 1;
                            this.gameplayUI.hideTutorTable();
                        }
                    }
                }
            }
        };
        BaseGame.prototype.update = function () {
            this.levelUpdate();
            this.rent.renderXY(this.group1, 0, 0, true);
            this.arrayParticles.forEach(function (part) {
                part.updateDa();
            });
        };
        BaseGame.prototype.deltaTime = function () {
            if (this.lastTime == -1) {
                this.lastTime = Date.now();
            }
            this.dt = Date.now() - this.lastTime;
            this.lastTime += this.dt;
            this.dt /= 1000;
            if (this.dt > 0.036) {
                this.dt = 0.036;
            }
        };
        BaseGame.firstStart = true;
        BaseGame.soundVolume = 0.3;
        BaseGame.musicVolume = 0.1;
        BaseGame.isSoundOn = true;
        return BaseGame;
    }(Phaser.State));
    TProject.BaseGame = BaseGame;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.game.load.onFileComplete.add(this.loadingUpdate, this);
            this.game.load.image("cn_logo", Boot.PATH_IMAGES + "preloader/cnlogo.jpg");
            this.game.load.atlas("preload", Boot.PATH_IMAGES + "preloader/Preloader.png", Boot.PATH_IMAGES + "preloader/Preloader.json");
        };
        Boot.prototype.create = function () {
            this.enabledMultitouch(true);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();
            this.game.input.touch.preventDefault = false;
            if (this.game.device.desktop) {
                this.game.input.mouse.enabled = true;
            }
            else {
                this.game.input.mouse.enabled = false;
            }
            this.game.stage.disableVisibilityChange = true;
            this.game.stage.backgroundColor = 0x0A58A2;
            this.game.renderer.renderSession.roundPixels = true;
        };
        Boot.prototype.loadingUpdate = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            if (progress >= 100.0) {
                this.game.load.onFileComplete.removeAll();
                this.game.state.start("Preloader", true);
            }
        };
        Boot.prototype.enabledMultitouch = function (value) {
            if (value) {
                this.game.input.maxPointers = 2;
                this.game.input.addPointer();
                this.game.input.addPointer();
            }
            else {
                this.game.input.maxPointers = 1;
            }
        };
        Boot.PATH_IMAGES = "./assets/images/";
        Boot.PATH_FONTS = "./assets/fonts/";
        Boot.PATH_SOUNDS = "./assets/sounds/";
        Boot.PATH_SETTINGS = "./assets/settings/";
        return Boot;
    }(Phaser.State));
    TProject.Boot = Boot;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.loading = function () {
            this.loadAtlases([
                'game/player/darwin',
                'game/other_atlas/tp_door',
                'game/other_atlas/blocks',
                'game/menu/menuCamNoise',
                'game/menu/menu_atlas',
                'game/cameras',
                'game/comix/c2_p1dir',
                'game/comix/comix_atlas',
                'game/comix/comix_other',
            ]);
            this.loadImages([
                'game/screen_cam',
                'game/cam1',
                'game/cam2',
                'game/cam3',
                'game/cam4',
                'game/cam5',
                'game/cam6',
                'game/cam7',
                'game/cam8',
                'game/cam9',
                'game/menu/black_screen',
                'game/comix/c1_bg',
                'game/comix/c1_bg2',
                'game/comix/c4_bg',
                'game/comix/c4_bg_mask',
                'game/comix/c4_bg2',
                'game/comix/c4_shadow1',
                'game/comix/c4_shadow2'
            ]);
            this.loadFonts([
                'HelveticaRounded-Black', 'CoopBold'
            ]);
            this.loadAudiosprite("sfx");
        };
        return Preloader;
    }(TProject.BasePreloader));
    TProject.Preloader = Preloader;
})(TProject || (TProject = {}));
