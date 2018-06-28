var TProject;
(function (TProject) {
    var Point = (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    TProject.Point = Point;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Point3D = (function () {
        function Point3D(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 1; }
            this._2dProjection = new TProject.Point();
            this._originalY = y;
            this.set(x, y, z);
        }
        Point3D.prototype.rotate = function (rotX, rotY) {
            var ct = Math.cos(rotX != null ? rotX : TProject.Test.WORLD.rotX);
            var st = Math.sin(rotX != null ? rotX : TProject.Test.WORLD.rotX);
            var cp = Math.cos(rotY != null ? rotY : TProject.Test.WORLD.rotY);
            var sp = Math.sin(rotY != null ? rotY : TProject.Test.WORLD.rotY);
            var x = this._x;
            var y = this._y;
            var z = this._z;
            this._x = ct * x - st * cp * y + st * sp * z;
            this._y = st * x + ct * cp * y - ct * sp * z;
            this._z = sp * y + cp * z;
            this.project();
        };
        Point3D.prototype.project = function () {
            var perspective = (this.y - this._originalY) / (TProject.Test.MAX_DEPTH * 2);
            var psCoef = 0.6;
            var r = 1 + perspective * psCoef;
            this._2dProjection.x = TProject.Test.WORLD.cx + this.x * r;
            this._2dProjection.y = TProject.Test.WORLD.cy + this.z * r;
        };
        Point3D.prototype.set = function (x, y, z) {
            this._x = x;
            this._y = y;
            this._z = z;
            this.project();
        };
        Object.defineProperty(Point3D.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point3D.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point3D.prototype, "z", {
            get: function () {
                return this._z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point3D.prototype, "x2d", {
            get: function () {
                return this._2dProjection.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point3D.prototype, "y2d", {
            get: function () {
                return this._2dProjection.y;
            },
            enumerable: true,
            configurable: true
        });
        return Point3D;
    }());
    TProject.Point3D = Point3D;
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
    var Sprite = Phaser.Sprite;
    var Popup = (function (_super) {
        __extends(Popup, _super);
        function Popup(game, cb) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this._black = _this.game.make.graphics(0, 0);
            _this._black.beginFill(0x000000, 0.4);
            _this._black.drawRect(0, 0, game.width, game.height);
            _this._black.endFill();
            _this._black.inputEnabled = true;
            _this._popbg = game.make.image(_this.game.world.centerX, _this.game.world.centerY, "ui", "plahaEndScreen");
            _this._popbg.anchor.set(0.5);
            _this._avatar = game.make.image(-160 * TProject.Main.SCALE, 2.35 * 2 * TProject.Main.SCALE, "ui", "avatarpopup0002");
            _this._avatar.anchor.set(0.5);
            _this._caption = _this.game.add.text(0, -140 * 2 * TProject.Main.SCALE, TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng]["result"], {
                font: "BubbleboddyNeue-Regular",
                fontSize: 72 * TProject.Main.SCALE + "px",
                fontWeight: "normal",
                fill: "#ffffff",
            });
            _this._caption.wordWrap = true;
            _this._caption.align = "center";
            _this._caption.anchor.set(0.5);
            _this._score = _this.game.add.text(100 * TProject.Main.SCALE, -50 * TProject.Main.SCALE, "10", {
                font: "BubbleboddyNeue-Regular",
                fontSize: 150 * TProject.Main.SCALE + "px",
                fontWeight: "normal",
                fill: "#ffffff",
            });
            _this._score.wordWrap = true;
            _this._score.align = "center";
            _this._score.anchor.set(0.5);
            _this._home = new TProject.OButton(_this.game, "ui", ["btnHomeEndScreen", "btnHomeEndScreen"], function () {
                TProject.SoundMixer.bgStop();
                _this.game.state.start("MainMenu", true);
            });
            _this._home.position.set(-60 * TProject.Main.SCALE, 330 * TProject.Main.SCALE);
            _this._replay = new TProject.OButton(_this.game, "ui", ["playpopup", "playpopup"], function () {
                if (cb)
                    cb();
            });
            _this._replay.position.set((132 - 10) * TProject.Main.SCALE, (325) * TProject.Main.SCALE);
            _this._soc = [];
            var _loop_1 = function (i) {
                this_1._soc[i] = new TProject.OButton(this_1.game, "ui", ["social000" + (i + 1)], function () {
                    _this.showSocialShare(i);
                });
                this_1._soc[i].position.set(350 * TProject.Main.SCALE, -290 * TProject.Main.SCALE + 140 * TProject.Main.SCALE * i);
                this_1._popbg.addChild(this_1._soc[i]);
            };
            var this_1 = this;
            for (var i = 0; i < 4; i++) {
                _loop_1(i);
            }
            _this._gameUrl = window["game-share-url"];
            _this._imgUrl = window["game-share-img-url " + TProject.Boot.CURRENT_LANGUAGE.curLng];
            _this._imgUrl = _this._imgUrl ? _this._imgUrl : window["game-share-img-url"];
            _this.addChild(_this._black);
            _this.addChild(_this._popbg);
            _this._popbg.addChild(_this._avatar);
            _this._popbg.addChild(_this._caption);
            _this._popbg.addChild(_this._score);
            _this._popbg.addChild(_this._home);
            _this._popbg.addChild(_this._replay);
            _this.exists = false;
            return _this;
        }
        Popup.prototype.showSocialShare = function (ssNumb) {
            var realScore = this._currentScore;
            var ballEndString = "";
            var finalText = "";
            var shareScoreA = "shareScore";
            var shareScoreB = "shareScore";
            var shareScoreC = "shareScore";
            var shareBegin = "shareBegin";
            var shareEnd = "shareEnd";
            var shareBadScore = "shareBadScore";
            shareScoreA += "ShaibaA";
            shareScoreB += "ShaibaB";
            shareScoreC += "ShaibaC";
            shareBegin += "Shaiba";
            shareEnd += "Shaiba";
            shareBadScore += "Shaiba";
            if (realScore > 0) {
                var stringOut = (realScore + "").substr(-1);
                if (TProject.Boot.CURRENT_LANGUAGE.curLng == "ru") {
                    if (realScore > 0 && realScore < 11) {
                        if (stringOut == "1") {
                            ballEndString = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareScoreA];
                        }
                        else if (stringOut == "2" || stringOut == "3" || stringOut == "4") {
                            ballEndString = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareScoreB];
                        }
                        else {
                            ballEndString = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareScoreC];
                        }
                    }
                    if (realScore > 20) {
                        if (stringOut == "1") {
                            ballEndString = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareScoreA];
                        }
                        else if (stringOut == "2" || stringOut == "3" || stringOut == "4") {
                            ballEndString = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareScoreB];
                        }
                        else {
                            ballEndString = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareScoreC];
                        }
                    }
                    else if (realScore > 10 && realScore < 21) {
                        ballEndString = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareScoreC];
                    }
                }
                else {
                    if (realScore == 1) {
                        ballEndString = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareScoreA];
                    }
                    else {
                        ballEndString = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareScoreB];
                    }
                }
                finalText = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareBegin] + realScore + " " + ballEndString + TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareEnd];
            }
            else {
                finalText = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng][shareBadScore];
            }
            switch (ssNumb) {
                case 0:
                    Share.vk(this._gameUrl, finalText, this._imgUrl);
                    break;
                case 1:
                    Share.ok(this._gameUrl, finalText, this._imgUrl);
                    break;
                case 2:
                    Share.fb(this._gameUrl, finalText, this._imgUrl);
                    break;
                case 3:
                    Share.tw(this._gameUrl, finalText, this._imgUrl);
                    break;
                default:
                    break;
            }
        };
        Popup.prototype.show = function (score, avatar, win) {
            if (win === void 0) { win = false; }
            this.exists = true;
            this._currentScore = score;
            this._score.fontSize = 250 * TProject.Main.SCALE + "px";
            if (score >= 100) {
                this._score.fontSize = 180 * TProject.Main.SCALE + "px";
            }
            this._avatar.frameName = "avatarpopup000" + avatar;
            this._score.text = "" + score;
            if (win) {
            }
            else {
            }
            for (var i = 0; i < 4; i++) {
                this._soc[i].alpha = 0;
                this._soc[i].scale.set(0.2, 0.2);
                this.game.add.tween(this._soc[i]).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 600);
                this.game.add.tween(this._soc[i].scale).to({ x: 1, y: 1 }, 250 + i * 80, Phaser.Easing.Back.Out, true, 600);
            }
            this._popbg.y = -this._popbg.height * 0.5;
            this._popbg.alpha = 0;
            this.game.add.tween(this._popbg).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this._popbg).to({ y: this.game.world.centerY }, 500, Phaser.Easing.Back.Out, true);
            this._black.alpha = 0;
            this.game.add.tween(this._black).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true);
        };
        Popup.prototype.hide = function () {
            var _this = this;
            this.game.add.tween(this._black).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this._popbg).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this._popbg).to({ y: -this._popbg.height * 0.5 }, 200, Phaser.Easing.Back.In, true).onComplete.addOnce(function () {
                _this.exists = false;
            });
        };
        Object.defineProperty(Popup.prototype, "isShowed", {
            get: function () {
                return this.exists;
            },
            enumerable: true,
            configurable: true
        });
        return Popup;
    }(Sprite));
    TProject.Popup = Popup;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Segment = (function () {
        function Segment(bx, by, bz, ex, ey, ez) {
            if (bx === void 0) { bx = 0; }
            if (by === void 0) { by = 0; }
            if (bz === void 0) { bz = 1; }
            if (ex === void 0) { ex = 0; }
            if (ey === void 0) { ey = 0; }
            if (ez === void 0) { ez = 1; }
            this._begin = new TProject.Point3D(bx, by, bz);
            this._end = new TProject.Point3D(ex, ey, ez);
        }
        Segment.prototype.draw = function (g) {
            g.lineStyle(1, 0xffffff);
            g.moveTo(this._begin.x2d, this._begin.y2d);
            g.lineTo(this._end.x2d, this._end.y2d);
            g.lineStyle();
            g.beginFill(0xffffff);
            g.drawCircle(this._begin.x2d, this._begin.y2d, 4);
            g.drawCircle(this._end.x2d, this._end.y2d, 4);
            g.endFill();
        };
        Segment.prototype.rotate = function (rotX, rotY) {
            this._begin.rotate(rotX, rotY);
            this._end.rotate(rotX, rotY);
        };
        Object.defineProperty(Segment.prototype, "begin", {
            get: function () {
                return this._begin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Segment.prototype, "end", {
            get: function () {
                return this._end;
            },
            enumerable: true,
            configurable: true
        });
        return Segment;
    }());
    TProject.Segment = Segment;
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
            this.add.image(0, 0, "preload", "bg");
            this._mm = this.add.image(this.world.centerX, this.world.centerY, "preload", "mashaPreloader");
            this._mm.x -= Math.round(this._mm.width * 0.5);
            this._mm.y -= Math.round(this._mm.height * 0.5);
            var copyright = this.add.image(Math.round(this.world.centerX), Math.round((540 * 2 - 30) * TProject.Main.SCALE), "preload", "copyright000" + (TProject.Boot.CURRENT_LANGUAGE.curLng == "ru" ? 1 : 2));
            copyright.x -= Math.round(copyright.width * 0.5);
            copyright.y -= Math.round(copyright.height * 0.5);
            this._logo = this.add.image(this.world.centerX, (155 - 20) * TProject.Main.SCALE, "preload", "mmLogo000" + (TProject.Boot.CURRENT_LANGUAGE.curLng == "ru" ? 1 : 2));
            this._logo.anchor.set(0.5);
            this._footer = this.add.image(this.world.centerX, this.world.centerY + 350 * TProject.Main.SCALE, "preload", "pbg");
            this._footer.anchor.set(0.5);
            this._loading = this.add.image(this._footer.x, this._footer.y, "preload", "pfg");
            this._loading.anchor.set(0.5);
            this._loadingMask = this.add.graphics(-this._loading.width * 0.5 - 2 * TProject.Main.SCALE, -this._loading.height * 0.5 - 2 * TProject.Main.SCALE);
            this._loadingMask.beginFill(0xff0000, 0.5);
            this._loadingMask.drawRect(0, 0, this._footer.width - 5 * TProject.Main.SCALE, this._footer.height - 5 * TProject.Main.SCALE);
            this._loadingMask.endFill();
            this._loading.addChild(this._loadingMask);
            this._loading.mask = this._loadingMask;
            this._loadingMask.scale.x = 0;
            this._loadedAssets = true;
            this._loadedFont = true;
            this._logo.y = 0;
            this._logo.alpha = 0;
            this.add.tween(this._logo).to({ alpha: 1, y: (155 - 20) * TProject.Main.SCALE }, 400, Phaser.Easing.Quadratic.Out, true);
            this.loading();
        };
        BasePreloader.prototype.loading = function () {
        };
        BasePreloader.prototype.end = function () {
        };
        BasePreloader.prototype.loadSounds = function (names, format) {
            if (format === void 0) { format = "mp3"; }
            if (names == null || names.length == 0) {
                return;
            }
            for (var i = 0; i < names.length; i++) {
                this.game.load.audio(name, TProject.Boot.PATH_SOUNDS + name + "." + format, true);
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
                var namepath = (TProject.Main.SCALE == 1 ? TProject.Boot.PATH_IMAGES : TProject.Boot.PATH_IMAGES1X) + names[i];
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
                var namepath = (TProject.Main.SCALE == 1 ? TProject.Boot.PATH_IMAGES : TProject.Boot.PATH_IMAGES1X) + names[i];
                this.game.load.image(name_2, namepath + "." + format);
            }
            this._loadedAssets = false;
        };
        BasePreloader.prototype.loadAtlas = function (name, path) {
            path = path ? (TProject.Main.SCALE == 1 ? TProject.Boot.PATH_IMAGES : TProject.Boot.PATH_IMAGES1X) + path : (TProject.Main.SCALE == 1 ? TProject.Boot.PATH_IMAGES : TProject.Boot.PATH_IMAGES1X);
            var namepath = path + name;
            this.game.load.atlas(name, namepath + ".png", namepath + ".json");
            this._loadedAssets = false;
        };
        BasePreloader.prototype.loadImage = function (name, path) {
            path = path ? (TProject.Main.SCALE == 1 ? TProject.Boot.PATH_IMAGES : TProject.Boot.PATH_IMAGES1X) + path : (TProject.Main.SCALE == 1 ? TProject.Boot.PATH_IMAGES : TProject.Boot.PATH_IMAGES1X);
            var namepath = path + name;
            this.game.load.atlas(name, namepath + ".png", namepath + ".json");
            this._loadedAssets = false;
        };
        BasePreloader.prototype.shutdown = function () {
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
            }
        };
        BasePreloader.prototype.update = function () {
            var _this = this;
            if (this._loadedAssets && this._loadedFont) {
                this._loadedAssets = false;
                this.end();
                setTimeout(function () {
                    _this.game.state.start(TProject.LocalConfig.CURRENT_STATE, true);
                }, 400);
                this.add.tween(this._logo).to({ alpha: 0 }, 350, Phaser.Easing.Quadratic.In, true);
                this.add.tween(this._mm).to({ alpha: 0 }, 350, Phaser.Easing.Quadratic.In, true);
                this.add.tween(this._footer).to({ alpha: 0 }, 350, Phaser.Easing.Quadratic.In, true);
                this.add.tween(this._loading).to({ alpha: 0 }, 350, Phaser.Easing.Quadratic.In, true);
                this.add.tween(this._logo.scale).to({ x: 1.02, y: 1.02 }, 350, Phaser.Easing.Quadratic.In, true);
            }
        };
        return BasePreloader;
    }(Phaser.State));
    TProject.BasePreloader = BasePreloader;
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
    var CookieSave = (function () {
        function CookieSave() {
        }
        CookieSave.setProperty = function (name, value) {
            document.cookie = (name + "=" + value);
        };
        CookieSave.setData = function (name, value) {
            document.cookie = (name + "=" + JSON.stringify(value));
        };
        CookieSave.getProperty = function (name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : null;
        };
        CookieSave.getData = function (name) {
            var data = this.getProperty(name);
            return data == null ? null : JSON.parse(data);
        };
        return CookieSave;
    }());
    TProject.CookieSave = CookieSave;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var GAME_LANGUAGE;
    (function (GAME_LANGUAGE) {
        GAME_LANGUAGE["RUSSIAN"] = "ru";
        GAME_LANGUAGE["ENGLISH"] = "en";
        GAME_LANGUAGE["DEUTSCH"] = "de";
        GAME_LANGUAGE["FRENCH"] = "fr";
        GAME_LANGUAGE["ITALIAN"] = "it";
        GAME_LANGUAGE["PORTUG"] = "pt";
        GAME_LANGUAGE["SPANISH"] = "es";
        GAME_LANGUAGE["POLISH"] = "pl";
    })(GAME_LANGUAGE = TProject.GAME_LANGUAGE || (TProject.GAME_LANGUAGE = {}));
    ;
    var LngSelector = (function () {
        function LngSelector(setLanguage) {
            this.DEFAULT_LNG = GAME_LANGUAGE.ENGLISH;
            if (setLanguage != null && this.inLanguage(setLanguage)) {
                this._lng = setLanguage;
            }
            else {
                this._lng = TProject.CookieSave.getProperty("game_language");
                if (this._lng == null) {
                    this._lng = this.brouserLng;
                }
            }
            if (!this.inLanguage(this._lng)) {
                this._lng = this.DEFAULT_LNG;
            }
            console.log("Current lng:", this._lng);
        }
        LngSelector.prototype.inLanguage = function (value) {
            for (var e in GAME_LANGUAGE) {
                if (GAME_LANGUAGE[e] == value)
                    return true;
            }
            return false;
        };
        LngSelector.prototype.getIndexLanguage = function (value) {
            var ind = 0;
            for (var e in GAME_LANGUAGE) {
                if (GAME_LANGUAGE[e] == value)
                    return ind;
                ind++;
            }
            return 0;
        };
        LngSelector.prototype.getNameLanguage = function (index) {
            var ind = 0;
            for (var e in GAME_LANGUAGE) {
                if (ind == index)
                    return GAME_LANGUAGE[e];
                ind++;
            }
            return this.DEFAULT_LNG;
        };
        LngSelector.prototype.setLng = function (lng) {
            this._lng = lng;
            TProject.CookieSave.setProperty("game_language", this._lng);
            console.log("Current lng:", this._lng);
        };
        Object.defineProperty(LngSelector.prototype, "curLng", {
            get: function () {
                return this._lng;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LngSelector.prototype, "currentIndex", {
            get: function () {
                return this.getIndexLanguage(this._lng);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LngSelector.prototype, "brouserLng", {
            get: function () {
                var lng = navigator.language || navigator["browserLanguage"];
                if (lng == null) {
                    return this.DEFAULT_LNG;
                }
                if (lng.length == 2) {
                    return lng;
                }
                else {
                    return lng.substr(0, 2);
                }
            },
            enumerable: true,
            configurable: true
        });
        return LngSelector;
    }());
    TProject.LngSelector = LngSelector;
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
            _this.soundOver = "Over";
            _this.soundDown = "Click";
            _this.anchor.setTo(0.5);
            _this._cb = cb;
            _this._deltaScale = 0.05;
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
                this.scale.set(this._defaultScale + this._deltaScale);
            }
            this._isOver = true;
            TProject.SoundMixer.play(this.soundOver, 1.2);
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
                TProject.SoundMixer.play(this.soundDown, 1.0);
                if (this._cntxt)
                    this._cb.bind(this._cntxt)(this);
                else
                    this._cb(this);
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
        OButton.prototype.createStableContainer = function () {
            this.stableContainer = this.game.make.sprite(0, 0);
            this.addChild(this.stableContainer);
        };
        OButton.prototype.update = function () {
            if (this.stableContainer) {
                this.stableContainer.angle = -this.angle;
            }
        };
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
    var ObuttonAngle = (function (_super) {
        __extends(ObuttonAngle, _super);
        function ObuttonAngle(game, key, frame, cb, angleOver) {
            if (cb === void 0) { cb = null; }
            if (angleOver === void 0) { angleOver = 0; }
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
            _this.soundOver = "Over";
            _this.soundDown = "Click";
            _this.anchor.setTo(0.5);
            _this._cb = cb;
            _this._deltaScale = 0.1;
            _this._defaultScale = 1.0;
            _this._isDown = false;
            _this._isOver = false;
            _this._defaultAngle = 0;
            _this._angleNew = angleOver;
            _this.scale.set(_this._defaultScale);
            _this.onInputOver.add(_this.over, _this);
            _this.onInputOut.add(_this.out, _this);
            _this.onInputDown.add(_this.down, _this);
            _this.onInputUp.add(_this.up, _this);
            return _this;
        }
        ObuttonAngle.prototype.setDefaultAngle = function (value) {
            this._defaultAngle = value;
            this.angle = this._defaultAngle;
        };
        ObuttonAngle.prototype.setCBContext = function (cntx) {
            this._cntxt = cntx;
        };
        ObuttonAngle.prototype.setAnimationScale = function (delta, defaultScale) {
            if (delta === void 0) { delta = 0; }
            if (defaultScale === void 0) { defaultScale = 1; }
            this._deltaScale = delta;
            this._defaultScale = defaultScale;
        };
        ObuttonAngle.prototype.setNewFrames = function (frame) {
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
        ObuttonAngle.prototype.over = function () {
            if (!this._isDown) {
                this.angle = this._angleNew;
            }
            this._isOver = true;
            TProject.SoundMixer.play(this.soundOver, 1.2);
        };
        ObuttonAngle.prototype.out = function () {
            if (!this._isDown) {
                this.angle = this._defaultAngle;
            }
            this._isOver = false;
        };
        ObuttonAngle.prototype.up = function () {
            var _this = this;
            if (!this._isDown) {
                return;
            }
            this.angle = this._defaultAngle;
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
                TProject.SoundMixer.play(this.soundDown, 1.0);
                if (this._cntxt)
                    this._cb.bind(this._cntxt)();
                else
                    this._cb();
                this.frameName = this._framesString[0];
            }
            else {
                if (tap == false) {
                    this.angle = this._defaultAngle;
                }
            }
        };
        ObuttonAngle.prototype.down = function () {
            if (this._isDown) {
                return;
            }
            this.angle = this._angleNew;
            this._isDown = true;
        };
        ObuttonAngle.prototype.deleteFromParent = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.onInputOver.remove(this.over, this);
            this.onInputOut.remove(this.out, this);
            this.onInputDown.remove(this.down, this);
            this.onInputUp.remove(this.up, this);
        };
        Object.defineProperty(ObuttonAngle.prototype, "enabled", {
            set: function (value) {
                this.inputEnabled = value;
                if (!value) {
                    this.frameName = this._framesString[0];
                    this.angle = this._defaultAngle;
                }
            },
            enumerable: true,
            configurable: true
        });
        return ObuttonAngle;
    }(Phaser.Button));
    TProject.ObuttonAngle = ObuttonAngle;
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
    var OButtonCheck = (function (_super) {
        __extends(OButtonCheck, _super);
        function OButtonCheck(game, key, frameOn, frameOff, cb) {
            if (cb === void 0) { cb = null; }
            var _this = this;
            var upOn = null;
            var overOn = null;
            var downOn = null;
            var upOff = null;
            var overOff = null;
            var downOff = null;
            if (frameOn.length > 0) {
                upOn = frameOn[0];
                if (frameOn.length > 1) {
                    overOn = frameOn[1];
                    if (frameOn.length > 2)
                        downOn = frameOn[2];
                    else
                        downOn = frameOn[0];
                }
                else {
                    overOn = frameOn[0];
                    downOn = frameOn[0];
                }
            }
            if (frameOff.length > 0) {
                upOff = frameOff[0];
                if (frameOff.length > 1) {
                    overOff = frameOff[1];
                    if (frameOff.length > 2)
                        downOff = frameOff[2];
                    else
                        downOff = frameOff[0];
                }
                else {
                    overOff = frameOff[0];
                    downOff = frameOff[0];
                }
            }
            _this = _super.call(this, game, 0, 0, key, null, null, overOn, upOn, downOn, null) || this;
            _this._framesString = [upOn, overOn, downOn, upOff, overOff, downOff];
            _this._check = true;
            _this.soundOver = "Over";
            _this.soundDown = "Click";
            _this.anchor.setTo(0.5);
            _this._cb = cb;
            _this._deltaScale = 0.05;
            _this._defaultScale = 1.0;
            _this._isDown = false;
            _this._isOver = false;
            _this.onInputOver.add(_this.over, _this);
            _this.onInputOut.add(_this.out, _this);
            _this.onInputDown.add(_this.down, _this);
            _this.onInputUp.add(_this.up, _this);
            return _this;
        }
        OButtonCheck.prototype.setCheck = function (value) {
            if (this._check == value) {
                return;
            }
            this._check = value;
            var delta = 0;
            if (!value) {
                delta = 3;
            }
            this.setFrames(this._framesString[delta + 1], this._framesString[delta], this._framesString[delta + 2], this._framesString[delta]);
        };
        Object.defineProperty(OButtonCheck.prototype, "check", {
            get: function () {
                return this._check;
            },
            enumerable: true,
            configurable: true
        });
        OButtonCheck.prototype.setCBContext = function (cntx) {
            this._cntxt = cntx;
        };
        OButtonCheck.prototype.setAnimationScale = function (delta, defaultScale) {
            if (delta === void 0) { delta = 0; }
            if (defaultScale === void 0) { defaultScale = 1; }
            this._deltaScale = delta;
            this._defaultScale = defaultScale;
        };
        OButtonCheck.prototype.over = function () {
            if (!this._isDown) {
                this.scale.set(this._defaultScale + this._deltaScale);
            }
            this._isOver = true;
            TProject.SoundMixer.play(this.soundOver, 1.2);
        };
        OButtonCheck.prototype.out = function () {
            if (!this._isDown) {
                this.scale.set(this._defaultScale);
            }
            this._isOver = false;
        };
        OButtonCheck.prototype.up = function () {
            var _this = this;
            if (!this._isDown) {
                return;
            }
            this.scale.set(this._defaultScale);
            var tap = (this.game.device.desktop ? this._isOver : this.input.pointerOver());
            if (this._isOver) {
                this.frameName = this._framesString[1 + (this._check ? 0 : 3)];
            }
            else {
                if (tap) {
                    setTimeout(function () {
                        _this.frameName = _this._framesString[(_this._check ? 0 : 3)];
                    }, 5);
                }
            }
            this._isDown = false;
            if (tap && this._cb != null) {
                TProject.SoundMixer.play(this.soundDown, 1.0);
                this.setCheck(!this.check);
                if (this._cntxt)
                    this._cb.bind(this._cntxt)();
                else
                    this._cb();
                this.frameName = this._framesString[(this._check ? 0 : 3)];
            }
            else {
                if (tap == false)
                    this.scale.set(this._defaultScale);
            }
        };
        OButtonCheck.prototype.down = function () {
            if (this._isDown) {
                return;
            }
            this.scale.set(this._defaultScale - this._deltaScale);
            this._isDown = true;
        };
        OButtonCheck.prototype.deleteFromParent = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.onInputOver.remove(this.over, this);
            this.onInputOut.remove(this.out, this);
            this.onInputDown.remove(this.down, this);
            this.onInputUp.remove(this.up, this);
        };
        Object.defineProperty(OButtonCheck.prototype, "enabled", {
            set: function (value) {
                var _this = this;
                this.inputEnabled = value;
                if (!value) {
                    setTimeout(function () {
                        _this.frameName = _this._framesString[(_this._check ? 0 : 3)];
                        _this.scale.set(_this._defaultScale);
                    }, 5);
                }
            },
            enumerable: true,
            configurable: true
        });
        return OButtonCheck;
    }(Phaser.Button));
    TProject.OButtonCheck = OButtonCheck;
})(TProject || (TProject = {}));
;

var TProject;
(function (TProject) {
    var ScrollOverlay = (function () {
        function ScrollOverlay(game) {
            this._overlayVisible = false;
            this._game = game;
            if (this.isIphone) {
                this.setupScrollOverlay();
            }
            else {
            }
        }
        Object.defineProperty(ScrollOverlay.prototype, "checkFullScreen", {
            get: function () {
                return screenfull.enabled;
            },
            enumerable: true,
            configurable: true
        });
        ScrollOverlay.prototype.toggleFullScreen = function () {
            screenfull.toggle(this._game.canvas);
        };
        ScrollOverlay.prototype.start = function () {
            var _this = this;
            if (this.isIphone == false) {
                return;
            }
            if (window["iphone-scroll-overlay"] != true) {
                return;
            }
            setTimeout(function () {
                _this.toggleOverlay();
            }, 500);
            window.addEventListener("resize", this.checkScreenStatus.bind(this), false);
            this._game.scale.onOrientationChange.add(this.checkScreenStatus, this);
            document.body.addEventListener("touchend", this.checkScreenStatus.bind(this), false);
        };
        ScrollOverlay.prototype.checkScreenStatus = function () {
            this.toggleOverlay();
        };
        ScrollOverlay.prototype.setupScrollOverlay = function () {
            this._scrollOverlay = document.createElement("div");
            this._scrollOverlay.className = "scrollup";
            this._scrollOverlay.setAttribute("id", "scrollup");
            this._scrollOverlay.style.height = "1000000px";
            this._scrollOverlay.style.display = "none";
            this._animationContainer = document.createElement("div");
            if (this._game.scale.isLandscape && this.isIphone6PlusStandardMode) {
                this._animationContainer.style.position = "absolute";
            }
            this._animationContainer.className = "scrollAnimationContainer iOS_scrollup_uri";
            this._animationContainer.style.visibility = "hidden";
            document.body.appendChild(this._animationContainer);
            document.body.appendChild(this._scrollOverlay);
        };
        ScrollOverlay.prototype.resetGamePosition = function () {
            if (this._removeOverlayTimeout)
                window.clearTimeout(this._removeOverlayTimeout);
            this._removeOverlayTimeout = window.setTimeout(function () {
                window.scrollTo(0, 0);
                document.getElementById("scrollup").scrollTo(0, 0);
            }, 300);
        };
        ScrollOverlay.prototype.removeOverlay = function () {
            this.resetGamePosition();
            if (this._overlayVisible) {
                this._scrollOverlay.style.display = "none";
                this._animationContainer.style.visibility = "hidden";
                this._overlayVisible = false;
                if (this._game.scale.isLandscape && !this.isIphone5Or5sOr5c) {
                }
                window["needPreventDefault"] = true;
            }
        };
        ScrollOverlay.prototype.eventPreventDefault = function (event) {
            event.preventDefault();
        };
        ScrollOverlay.prototype.showOverlay = function () {
            if (!this._overlayVisible) {
                window["needPreventDefault"] = false;
                this._scrollOverlay.style.display = "block";
                this._animationContainer.style.visibility = "visible";
                this._overlayVisible = true;
            }
        };
        ScrollOverlay.prototype.isFullscreen = function () {
            var a = this.getRealScreenSize();
            return a.height === window.innerHeight || window.innerHeight / a.height >= 0.9;
        };
        ScrollOverlay.prototype.getRealScreenSize = function () {
            var d;
            var f;
            if (this._game.device.desktop) {
                return this.getInnerScreenSize();
            }
            if (this._game.scale.isPortrait) {
                d = Math.min(window.screen.width, window.screen.height);
                f = Math.max(window.screen.width, window.screen.height);
            }
            else {
                d = Math.max(window.screen.width, window.screen.height);
                f = Math.min(window.screen.width, window.screen.height);
            }
            return {
                width: d,
                height: f
            };
        };
        ScrollOverlay.prototype.getInnerScreenSize = function () {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        };
        ScrollOverlay.prototype.toggleOverlay = function () {
            document.documentElement.style.paddingBottom = "79px";
            if (this._game.scale.isLandscape && this.isIphone6PlusStandardMode) {
                document.documentElement.style.paddingBottom = "";
            }
            if (this.isFullscreen()) {
                this.removeOverlay();
            }
            else {
                this.showOverlay();
            }
        };
        Object.defineProperty(ScrollOverlay.prototype, "isIphone6PlusStandardMode", {
            get: function () {
                if (this.isIphone) {
                    return this.iPhoneVersion() == "6+";
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollOverlay.prototype, "isIphone5Or5sOr5c", {
            get: function () {
                if (this.isIphone) {
                    return this.iPhoneVersion() == "5";
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ScrollOverlay.prototype.iPhoneVersion = function () {
            var iHeight = window.screen.height;
            var iWidth = window.screen.width;
            if (iWidth === 320 && iHeight === 480) {
                return "4";
            }
            else if (iWidth === 375 && iHeight === 667) {
                return "6";
            }
            else if (iWidth === 414 && iHeight === 736) {
                return "6+";
            }
            else if (iWidth === 320 && iHeight === 568) {
                return "5";
            }
            else if (iHeight <= 480) {
                return "2-3";
            }
            return "none";
        };
        Object.defineProperty(ScrollOverlay.prototype, "isIphone", {
            get: function () {
                return (!!navigator.userAgent.match(/iPhone/i) || this._game.device.iPhone);
            },
            enumerable: true,
            configurable: true
        });
        return ScrollOverlay;
    }());
    TProject.ScrollOverlay = ScrollOverlay;
})(TProject || (TProject = {}));

var Share;
(function (Share) {
    function vk(shareUrl, description, imgUrl) {
        var url = "http://vkontakte.ru/share.php?";
        url += "url=" + encodeURIComponent(shareUrl);
        url += "&title=" + encodeURIComponent(description);
        url += "&image=" + encodeURIComponent(imgUrl);
        url += "&noparse=true";
        Share.openUrl(url);
    }
    Share.vk = vk;
    function ok(shareUrl, description, imgUrl) {
        var url = "https://connect.ok.ru/offer?";
        url += "url=" + encodeURIComponent(shareUrl);
        url += "&title=&description=" + encodeURIComponent(description);
        url += "&imageUrl=" + encodeURIComponent(imgUrl);
        Share.openUrl(url);
    }
    Share.ok = ok;
    function fb(shareUrl, description, imgUrl) {
        if (window["use-share-api"] != false) {
            window["facebookShare"](shareUrl, description);
        }
        else {
            var url = "https://www.facebook.com/sharer.php?u=";
            url += "&p[quote]=" + encodeURIComponent(description);
            url += "&p[url]=" + encodeURIComponent(shareUrl);
            url += ("&p[images][0]=" + imgUrl);
            Share.openUrl(url);
        }
    }
    Share.fb = fb;
    function tw(shareUrl, description, imgUrl) {
        var url = "http://twitter.com/share?";
        url += "text=" + encodeURIComponent(description);
        url += "&url=" + encodeURIComponent(shareUrl);
        Share.openUrl(url);
    }
    Share.tw = tw;
    function openUrl(url) {
        window.open(url, "", "toolbar=0,status=0,width=626,height=436");
    }
    Share.openUrl = openUrl;
})(Share || (Share = {}));

var TProject;
(function (TProject) {
    var SoundMixer = (function () {
        function SoundMixer() {
        }
        SoundMixer.init = function (game) {
            SoundMixer._audio = game.add.audioSprite("sfx");
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
                if (SoundMixer._bg && SoundMixer._bg.isPlaying && SoundMixer._bgKey == key)
                    return;
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
            if (SoundMixer._bg)
                SoundMixer._bg.stop();
        };
        SoundMixer.on = function () {
            if (SoundMixer._bgKey) {
                SoundMixer.play(SoundMixer._bgKey, SoundMixer._bgVolume, true, true);
            }
        };
        SoundMixer.off = function () {
            SoundMixer._audio.stop(null);
        };
        SoundMixer._playMusic = true;
        return SoundMixer;
    }());
    TProject.SoundMixer = SoundMixer;
})(TProject || (TProject = {}));

var Utils;
(function (Utils) {
    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }
    Utils.randomRange = randomRange;
    function enableDrag(s) {
        s.inputEnabled = true;
        s.input.enableDrag();
        s.events.onDragUpdate.add(function () {
            console.log(s.x + "," + s.y);
        }, this);
    }
    Utils.enableDrag = enableDrag;
    function degreesToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    Utils.degreesToRad = degreesToRad;
    function sign(x) {
        x = +x;
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    }
    Utils.sign = sign;
    function clearTimeoutsAndTweens(game) {
        var id = window.setTimeout(function () { }, 0);
        while (id--) {
            window.clearTimeout(id);
        }
        game.tweens.removeAll();
    }
    Utils.clearTimeoutsAndTweens = clearTimeoutsAndTweens;
})(Utils || (Utils = {}));

var TProject;
(function (TProject) {
    var LocalConfig = (function () {
        function LocalConfig() {
        }
        LocalConfig.CURRENT_STATE = "Test";
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
            if (Main.getParentDomain(document.domain) == false) {
                window["use-share-api"] = false;
                window["use-lock-screen"] = false;
                window["mobile-redirect"] = false;
            }
            Main.SCALE = 0.5;
            if (window["use-hd-for-pc"] != false && Main.isMobile == false)
                Main.SCALE = 1;
            this.game = new Phaser.Game({
                width: 960 * 2 * Main.SCALE,
                height: 540 * 2 * Main.SCALE,
                renderer: Phaser.AUTO,
                parent: "game_container",
                transparent: false,
                antialias: true,
                physicsConfig: null,
                preserveDrawingBuffer: true
            });
            this.game.state.add("Boot", TProject.Boot, true);
            this.game.state.add("Preloader", TProject.Preloader);
            this.game.state.add("MainMenu", TProject.MainMenu);
            this.game.state.add("TestGame", TProject.TestGame);
            this.game.state.add("Test", TProject.Test);
        }
        Main.getParentDomain = function (domain) {
            if (window["parent-domain"]) {
                return domain == window["parent-domain"];
            }
            else {
                return domain == this.DEF_PARENT_DOMAIN;
            }
        };
        Object.defineProperty(Main, "isMobile", {
            get: function () {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Main.DEF_PARENT_DOMAIN = "mashabear.ru";
        return Main;
    }());
    TProject.Main = Main;
})(TProject || (TProject = {}));
window.onload = function () {
    var game = new TProject.Main();
    window["needPreventDefault"] = true;
    setTimeout("window.scrollTo(0, 1)", 10);
    document.addEventListener("touchmove", function (event) {
        if (window["needPreventDefault"] == true) {
            event.preventDefault();
        }
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
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            var param = this.getUrlParam();
            if (window["mobile-redirect"] == true && this.game.device.desktop == false) {
                if (window.top.location.pathname.split("game.html").length < 2) {
                    var url = window.top.location.protocol + '//' + window.top.location.host +
                        window.top.location.pathname.split("index.html")[0] + "game.html" + window.top.location.search;
                    window.top.location.href = url;
                    return;
                }
            }
            Boot.SCROLL_OVERLAY = new TProject.ScrollOverlay(this.game);
            if (window["use-lock-screen"] != false && this.game.device.desktop == false)
                this.initLockScreen(true, true);
            var lngParam = null;
            if (param["lng"]) {
                lngParam = param["lng"];
            }
            else if (window["language"]) {
                lngParam = window["language"];
            }
            Boot.CURRENT_LANGUAGE = new TProject.LngSelector(lngParam);
        };
        Boot.prototype.getUrlParam = function () {
            var params;
            if (TProject.Main.getParentDomain(document.domain)) {
                params = window.top;
            }
            else {
                params = window;
            }
            params = params.location
                .search
                .replace('?', '')
                .split('&')
                .reduce(function (p, e) {
                var a = e.split('=');
                p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            }, {});
            return params;
        };
        Boot.prototype.preload = function () {
            this.game.load.onFileComplete.add(this.loadingUpdate, this);
            this.game.load.atlas("preload", (TProject.Main.SCALE == 1 ? Boot.PATH_IMAGES : Boot.PATH_IMAGES1X) + "preloader/npreloader.png", (TProject.Main.SCALE == 1 ? Boot.PATH_IMAGES : Boot.PATH_IMAGES1X) + "preloader/npreloader.json");
        };
        Boot.prototype.create = function () {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.enabledMultitouch(true);
            this.game.stage.backgroundColor = 0x1A2241;
            this.game.stage.smoothed = true;
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
        Boot.prototype.initLockScreen = function (portrait, paused) {
            if (paused === void 0) { paused = false; }
            window.addEventListener("resize", this.checkScreenStatus.bind(this), false);
            this.game.scale.onOrientationChange.add(this.checkScreenStatus, this);
            var lock = document.createElement("div");
            lock.className = "lockscren";
            lock.setAttribute("id", "lockscren");
            lock.style.height = "1000000px";
            lock.style.display = "none";
            var lockIcon = document.createElement("div");
            lockIcon.className = portrait ? "lockIconContainer PORT_lock_uri" : "lockIconContainer LAND_lock_uri";
            lockIcon.style.visibility = "hidden";
            lockIcon.style.top = portrait ? "30%" : "15%";
            window["-lockscreen"] = { portrait: portrait, lock: lock, icon: lockIcon, paused: paused };
            document.body.appendChild(lock);
            document.body.appendChild(lockIcon);
            this.checkScreenStatus();
        };
        Boot.prototype.checkScreenStatus = function () {
            var isPort = this.game.scale.isPortrait;
            if (!!window["-lockscreen"] && isPort == window["-lockscreen"].portrait) {
                window["-lockscreen"].lock.style.display = "block";
                window["-lockscreen"].icon.style.visibility = "visible";
            }
            else {
                window["-lockscreen"].lock.style.display = "none";
                window["-lockscreen"].icon.style.visibility = "hidden";
            }
        };
        Boot.PATH_IMAGES = "./assets/images_hd/";
        Boot.PATH_IMAGES1X = "./assets/images_sd/";
        Boot.PATH_FONTS = "./assets/fonts/";
        Boot.PATH_SOUNDS = "./assets/sounds/";
        Boot.PATH_SETTINGS = "./assets/settings/";
        Boot.TEST_GAME_TIPS = false;
        Boot.PLAY_MUSIC = true;
        Boot.CURRENT_GAME_MOD = 1;
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
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            var _this = this;
            this.add.image(0, 0, "preload", "bg");
            this._copyright = this.add.image(Math.round(this.world.centerX), Math.round((540 * 2 - 30) * TProject.Main.SCALE), "preload", "copyright000" + (TProject.Boot.CURRENT_LANGUAGE.curLng == "ru" ? 1 : 2));
            this._copyright.x -= Math.round(this._copyright.width * 0.5);
            this._copyright.y -= Math.round(this._copyright.height * 0.5);
            TProject.SoundMixer.play("Robot_Theme", 0.3, true, true);
            this._textArrays = [];
            this._logo = this.add.image(this.world.centerX, (155 - 20) * TProject.Main.SCALE, "preload", "mmLogo0001");
            this._logo.anchor.set(0.5);
            this._animLogo = -1;
            this._logo.y = 0;
            this._logo.alpha = 0;
            this.add.tween(this._logo).to({ alpha: 1, y: 155 * TProject.Main.SCALE }, 400, Phaser.Easing.Quadratic.Out, true).onComplete.addOnce(function () {
                _this._animLogo = 0;
            });
            this._capBg = this.add.image(this.world.centerX, 365 * TProject.Main.SCALE, "mmui", "captionBg");
            this._capBg.anchor.set(0.5);
            this._capBg.alpha = 0;
            this._capBg.scale.set(1.1, 1.1);
            this.add.tween(this._capBg).to({ alpha: 1 }, 400, Phaser.Easing.Quadratic.Out, true);
            this.add.tween(this._capBg.scale).to({ x: 1, y: 1 }, 600, Phaser.Easing.Elastic.Out, true, 200);
            this._caption = this.add.image(0, 0, "mmui", "caption0001");
            this._caption.alpha = 0;
            this._caption.anchor.set(0.5);
            this._capBg.addChild(this._caption);
            this.add.tween(this._caption).to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.Out, true, 500);
            this._maska = this.add.image(462 * TProject.Main.SCALE, 575 * TProject.Main.SCALE, "mmui", "mashkaInMenu");
            this._maska.anchor.set(1, 0.5);
            this._maska.alpha = 0;
            this._maska.x = 200 * TProject.Main.SCALE;
            this._maska.scale.x = 1.25;
            this.add.tween(this._maska).to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.Out, true, 300);
            this.add.tween(this._maska).to({ x: 462 * TProject.Main.SCALE + 1516 * 0.5 * TProject.Main.SCALE }, 400, Phaser.Easing.Back.Out, true, 300);
            this.add.tween(this._maska.scale).to({ x: 1 }, 400, Phaser.Easing.Quadratic.Out, true, 400);
            this._crc1 = this.add.image(1432 * TProject.Main.SCALE, 698 * TProject.Main.SCALE);
            this._shaiba = this.add.image(1234 * TProject.Main.SCALE, 830 * TProject.Main.SCALE, "mmui", "shaibaInMenu");
            this._crc2 = this.add.image(1508 * TProject.Main.SCALE, 742 * TProject.Main.SCALE, "mmui", "circlesFg");
            this._crc1.anchor.set(0.5);
            this._shaiba.anchor.set(0.5);
            this._crc2.anchor.set(0.5);
            this._circ1x = this._crc1.x;
            this._circ2x = this._crc2.x;
            this._circ3x = this._shaiba.x;
            this._crc1.alpha = 0;
            this._crc2.alpha = 0;
            this._shaiba.alpha = 0;
            this._shaiba.x = 1234 * TProject.Main.SCALE - 30 * TProject.Main.SCALE;
            this._shaiba.y = 830 * TProject.Main.SCALE + 20 * TProject.Main.SCALE;
            this._shaiba.angle = -2;
            this._shaiba.scale.set(0.8, 0.8);
            this.add.tween(this._crc1).to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.Out, true, 600);
            this.add.tween(this._crc2).to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.Out, true, 600);
            this.add.tween(this._shaiba).to({ alpha: 1 }, 200, Phaser.Easing.Quadratic.Out, true, 600);
            this.add.tween(this._shaiba).to({ x: 1234 * TProject.Main.SCALE, y: 830 * TProject.Main.SCALE, angle: 0 }, 200, Phaser.Easing.Back.Out, true, 600);
            this.add.tween(this._shaiba.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Back.Out, true, 600);
            this._play = new TProject.OButton(this.game, "mmui", ["playBtn", "playBtn2"], function () {
                _this.add.tween(_this._play).to({ alpha: 0 }, 200, Phaser.Easing.Quadratic.Out, true);
                _this.showSelectLevel();
                _this.game.sound.context.resume().then(function () {
                    console.log("Звук приди");
                });
            });
            this._play.position.set(this.world.centerX, 702 * TProject.Main.SCALE);
            this.game.add.existing(this._play);
            this._play.enabled = false;
            this._play.alpha = 0;
            this._play.scale.set(1.2, 1.2);
            this.add.tween(this._play).to({ alpha: 1 }, 200, Phaser.Easing.Quadratic.Out, true, 800);
            this.add.tween(this._play.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Back.Out, true, 800).onComplete.addOnce(function () {
                _this._play.enabled = true;
            });
            this._sound = new TProject.OButtonCheck(this.game, "mmui", ["btnSound0001"], ["btnSound0004"], function () {
                TProject.Boot.PLAY_MUSIC = !TProject.Boot.PLAY_MUSIC;
                if (TProject.Boot.PLAY_MUSIC) {
                    _this.game.sound.volume = 1;
                }
                else {
                    _this.game.sound.volume = 0;
                }
            });
            this._sound.setCheck(TProject.Boot.PLAY_MUSIC);
            this._sound.x = 1818 * TProject.Main.SCALE;
            this._sound.y = 115 * TProject.Main.SCALE;
            this.world.addChild(this._sound);
            this._sound.alpha = 0;
            this.add.tween(this._sound).to({ alpha: 1 }, 200, Phaser.Easing.Quadratic.Out, true, 400);
            if (window["fullscreen-btn"] != false && TProject.Boot.SCROLL_OVERLAY.checkFullScreen) {
                this._fullScreen = new TProject.OButton(this.game, "mmui", ["fullscreen"], function () {
                    TProject.Boot.SCROLL_OVERLAY.toggleFullScreen();
                });
                this._fullScreen.x = this.game.width - (1818 - 40) * TProject.Main.SCALE;
                this._fullScreen.y = 115 * TProject.Main.SCALE;
                this.world.addChild(this._fullScreen);
                this._fullScreen.alpha = 0;
                this.add.tween(this._fullScreen).to({ alpha: 1 }, 200, Phaser.Easing.Quadratic.Out, true, 400);
            }
            this.initLngPanel();
            this.updateLanguage(TProject.Boot.CURRENT_LANGUAGE.currentIndex, TProject.Boot.CURRENT_LANGUAGE.curLng);
            this.createSelectLevel();
            this.input.addMoveCallback(this.moveCallback, this);
        };
        MainMenu.prototype.shutdown = function () {
            this.input.deleteMoveCallback(this.moveCallback, this);
            TProject.SoundMixer.bgStop();
        };
        MainMenu.prototype.update = function () {
            this._crc1.x += (this._circ1x - this._crc1.x) * 0.02;
            this._crc2.x += (this._circ2x - this._crc2.x) * 0.02;
            this._shaiba.x += (this._circ3x - this._shaiba.x) * 0.02;
            if (this._animLogo != -1) {
                this._logo.y = (155 - 20) * TProject.Main.SCALE + Math.sin(this._animLogo += 0.03) * 16 * TProject.Main.SCALE;
            }
            if (this._btns) {
                for (var i = 0; i < this._btns.length; i++) {
                    this._btns[i].update();
                }
            }
        };
        MainMenu.prototype.createSelectLevel = function () {
            var _this = this;
            this._black = this.add.graphics(0, 0);
            this._black.beginFill(0, 0.4);
            this._black.drawRect(0, 0, this.game.width, this.game.height);
            this._black.endFill();
            this._black.inputEnabled = true;
            this._btns = [
                new TProject.OButton(this.game, "mmui", ["selectBtn", "selectBtn2"], function () { TProject.SoundMixer.bgStop(); _this.game.state.start("Test", true); console.log("STATE 1"); MainMenu.CURRENT_GAME_START = 1; }),
                new TProject.OButton(this.game, "mmui", ["selectBtn", "selectBtn2"], function () { TProject.SoundMixer.bgStop(); _this.game.state.start("TestGame", true); MainMenu.CURRENT_GAME_START = 2; }),
                new TProject.OButton(this.game, "mmui", ["selectBtn", "selectBtn2"], function () { TProject.SoundMixer.bgStop(); _this.game.state.start("TestGame", true); MainMenu.CURRENT_GAME_START = 3; }),
            ];
            this._btns[0].position.set(this.world.centerX, 572 * TProject.Main.SCALE);
            this._btns[1].position.set(this.world.centerX, 728 * TProject.Main.SCALE);
            this._btns[2].position.set(this.world.centerX, 886 * TProject.Main.SCALE);
            this._btns[0]["bangle"] = 1.2;
            this._btns[1]["bangle"] = -1;
            this._btns[2]["bangle"] = 1;
            this._btns[0].enabled = false;
            this._btns[1].enabled = false;
            this._btns[2].enabled = false;
            this._black.addChild(this._btns[0]);
            this._black.addChild(this._btns[1]);
            this._black.addChild(this._btns[2]);
            var textBtn1 = this.game.make.text(0, -4 * TProject.Main.SCALE, TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng]["game-training"], {
                font: "BubbleboddyNeue-Regular",
                fontSize: 50 * TProject.Main.SCALE + "px",
                fill: "#FFFFFF",
                align: "center",
                fontWeight: "bold"
            });
            textBtn1.anchor.setTo(0.5);
            this._textArrays.push(textBtn1);
            this._btns[0].createStableContainer();
            this._btns[0].stableContainer.addChild(textBtn1);
            var textBtn2 = this.game.make.text(0, -4 * TProject.Main.SCALE, TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng]["game-championship"], {
                font: "BubbleboddyNeue-Regular",
                fontSize: 50 * TProject.Main.SCALE + "px",
                fill: "#FFFFFF",
                align: "center",
                fontWeight: "bold"
            });
            textBtn2.anchor.setTo(0.5);
            this._textArrays.push(textBtn2);
            this._btns[1].createStableContainer();
            this._btns[1].stableContainer.addChild(textBtn2);
            var textBtn3 = this.game.make.text(0, -4 * TProject.Main.SCALE, TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng]["game-duel"], {
                font: "BubbleboddyNeue-Regular",
                fontSize: 50 * TProject.Main.SCALE + "px",
                fill: "#FFFFFF",
                align: "center",
                fontWeight: "bold"
            });
            textBtn3.anchor.setTo(0.5);
            this._textArrays.push(textBtn3);
            this._btns[2].createStableContainer();
            this._btns[2].stableContainer.addChild(textBtn3);
            this._black.exists = false;
        };
        MainMenu.prototype.showSelectLevel = function () {
            this._black.exists = true;
            this._black.alpha = 0;
            this.add.tween(this._black).to({ alpha: 1 }, 200, Phaser.Easing.Quadratic.Out, true);
            this._btns[0].angle = -1.2 * 10;
            this._btns[1].angle = 1.7 * 10;
            this._btns[2].angle = -1.5 * 10;
            var _loop_1 = function (i) {
                this_1._btns[i].y = this_1.game.height;
                this_1._btns[i].alpha = 0;
                this_1._btns[i]["idd"] = i;
                var y = 572 * TProject.Main.SCALE;
                if (i == 1)
                    y = 728 * TProject.Main.SCALE;
                if (i == 2)
                    y = 886 * TProject.Main.SCALE;
                this_1.add.tween(this_1._btns[i]).to({ angle: this_1._btns[i]["bangle"], y: y }, 400, Phaser.Easing.Back.Out, true, 100 + 150 * i).onStart.addOnce(function () {
                    TProject.SoundMixer.play("swishSnd", 1 + 0.1 * i);
                });
                this_1.add.tween(this_1._btns[i]).to({ alpha: 1 }, 400, Phaser.Easing.Quadratic.Out, true, 100 + 150 * i).onComplete.addOnce(function (self) {
                    self.enabled = true;
                });
            };
            var this_1 = this;
            for (var i = 0; i < 3; i++) {
                _loop_1(i);
            }
        };
        MainMenu.prototype.moveCallback = function (p) {
            var x = p.position.x;
            var y = p.position.y;
            var dx = (this.game.world.centerX - x) / this.game.world.centerX;
            this._circ1x = 1432 * TProject.Main.SCALE - dx * 50 * TProject.Main.SCALE;
            this._circ2x = 1508 * TProject.Main.SCALE - dx * 20 * TProject.Main.SCALE;
            this._circ3x = 1234 * TProject.Main.SCALE - dx * 10 * TProject.Main.SCALE;
        };
        MainMenu.prototype.initLngPanel = function () {
            var _this = this;
            if (window["language-menu"] == true) {
                this._lang = new TProject.OButton(this.game, "lng", ["btnLng"], function () {
                    _this.showLngPanel();
                });
                this._lang.x = 1818 * TProject.Main.SCALE - 150 * TProject.Main.SCALE;
                this._lang.y = 115 * TProject.Main.SCALE;
                this.world.addChild(this._lang);
                this._langIcon = this.make.image(0, -3 * TProject.Main.SCALE, "lng", "miniBtnLng0001");
                this._langIcon.anchor.set(0.5);
                this._lang.addChild(this._langIcon);
                this._lang.alpha = 0;
                this.add.tween(this._lang).to({ alpha: 1 }, 200, Phaser.Easing.Quadratic.Out, true, 400);
                this.createLngPanel();
            }
        };
        MainMenu.prototype.updateLanguage = function (indx, lang) {
            if (this._langIcon) {
                this._langIcon.frameName = "miniBtnLng000" + (indx + 1);
            }
            this._logo.frameName = "mmLogo000" + (indx == 0 ? "1" : "2");
            this._caption.frameName = "caption000" + (indx == 0 ? "1" : "2");
            this._copyright.frameName = "copyright000" + (TProject.Boot.CURRENT_LANGUAGE.curLng == "ru" ? 1 : 2);
            if (this._textArrays[0]) {
                this._textArrays[0].text = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng]["game-training"];
                this._textArrays[1].text = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng]["game-championship"];
                this._textArrays[2].text = TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng]["game-duel"];
            }
        };
        MainMenu.prototype.showLngPanel = function () {
            this._exitBtn.enabled = true;
            this._bglp.exists = true;
            this.add.tween(this._bglp).to({ alpha: 1 }, 300, Phaser.Easing.Circular.Out, true);
            this.add.tween(this._panel).to({ y: this.world.centerY }, 300, Phaser.Easing.Circular.Out, true);
            var ind = TProject.Boot.CURRENT_LANGUAGE.currentIndex;
            this._selector.x = this._lngBtns[ind].x;
            this._selector.y = this._lngBtns[ind].y;
        };
        MainMenu.prototype.hideLngPanel = function () {
            var _this = this;
            this.add.tween(this._bglp).to({ alpha: 0 }, 300, Phaser.Easing.Circular.Out, true);
            this.add.tween(this._panel).to({ y: this.world.centerY - 500 * TProject.Main.SCALE }, 300, Phaser.Easing.Circular.Out, true).onComplete.addOnce(function () {
                _this._bglp.exists = false;
            });
        };
        MainMenu.prototype.createLngPanel = function () {
            var _this = this;
            this._bglp = this.add.graphics(0, 0);
            this._bglp.beginFill(0, 0.4);
            this._bglp.drawRect(0, 0, this.game.width, this.game.height);
            this._bglp.endFill();
            this._bglp.alpha = 0;
            this._bglp.exists = false;
            this._bglp.inputEnabled = true;
            this._panel = this.make.sprite(this.world.centerX, this.world.centerY - 500 * TProject.Main.SCALE, "lng", "lngPanel");
            this._panel.anchor.set(0.5);
            this._bglp.addChild(this._panel);
            this._exitBtn = new TProject.OButton(this.game, "lng", ["close", "close2"], function () {
                _this._exitBtn.enabled = false;
                _this.hideLngPanel();
            });
            this._exitBtn.enabled = false;
            this._exitBtn.position.set(0, 350 * TProject.Main.SCALE);
            this._panel.addChild(this._exitBtn);
            this._selector = this.make.image(0, 0, "lng", "lngSelected");
            this._selector.anchor.set(0.5);
            this._panel.addChild(this._selector);
            this._lngBtns = [];
            for (var i = 0; i < 4; i++) {
                var b = new TProject.OButton(this.game, "lng", ["LNG000" + (i + 1)], function (self) {
                    TProject.Boot.CURRENT_LANGUAGE.setLng(self.lng);
                    _this.updateLanguage(self.lngind, self.lng);
                    _this._selector.x = self.x;
                    _this._selector.y = self.y;
                });
                b["lngind"] = i;
                b["lng"] = TProject.Boot.CURRENT_LANGUAGE.getNameLanguage(i);
                var xOffcet = 5 + i > 0 ? 5 : 0;
                b.position.set(-214.7 * TProject.Main.SCALE + 210 * TProject.Main.SCALE * i - (198 * 0.5 + xOffcet) * TProject.Main.SCALE, -241.1 * TProject.Main.SCALE + 144 * TProject.Main.SCALE);
                b.setAnimationScale(0);
                this._panel.addChild(b);
                this._lngBtns.push(b);
            }
            for (var i = 0; i < 4; i++) {
                var b = new TProject.OButton(this.game, "lng", ["LNG000" + (i + 1 + 4)], function (self) {
                    TProject.Boot.CURRENT_LANGUAGE.setLng(self.lng);
                    _this.updateLanguage(self.lngind, self.lng);
                    _this._selector.x = self.x;
                    _this._selector.y = self.y;
                });
                b["lngind"] = i + 4;
                b["lng"] = TProject.Boot.CURRENT_LANGUAGE.getNameLanguage(i + 4);
                var xOffcet = 5 + i > 0 ? 5 : 0;
                b.position.set(-214.7 * TProject.Main.SCALE + 210 * TProject.Main.SCALE * i - (198 * 0.5 + xOffcet) * TProject.Main.SCALE, (-241.1 + 144 + 180 + 10) * TProject.Main.SCALE);
                b.setAnimationScale(0);
                this._panel.addChild(b);
                this._lngBtns.push(b);
            }
        };
        MainMenu.prototype.setEnbldLngBtns = function (value) {
            for (var i = 0; i < this._lngBtns.length; i++) {
                this._lngBtns[i].enabled = value;
            }
        };
        MainMenu.CURRENT_GAME_START = 1;
        MainMenu.FIRST_TIME = true;
        return MainMenu;
    }(Phaser.State));
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
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.loading = function () {
            this.loadAtlases([
                "ui/mmui",
                "ui/lng",
                "ui/ui",
            ]);
            this.loadImages([]);
            this.loadFonts([
                "GinzaNarrow-Heavy", "GinzaNarrow-Light", "BubbleboddyNeue-Regular"
            ]);
            this.loadSounds([]);
            this.loadAudiosprite("sfx");
            this.game.load.json("msgs", TProject.Boot.PATH_SETTINGS + "msgs.json");
            this.game.load.json("lev1", TProject.Boot.PATH_SETTINGS + "lev1.json");
            TProject.Boot.SCROLL_OVERLAY.start();
        };
        Preloader.prototype.end = function () {
            TProject.Main.DATA = this.game.cache.getJSON("msgs");
            TProject.SoundMixer.play("Robot_Theme", 0.3, true, true);
        };
        return Preloader;
    }(TProject.BasePreloader));
    TProject.Preloader = Preloader;
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
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.THRESHOLD = 1;
            return _this;
        }
        Test.prototype.create = function () {
            var _this = this;
            Test.WORLD.cx = this.game.width * 0.5;
            Test.WORLD.cy = this.game.height * 0.5;
            Test.WORLD.cz = Test.MAX_DEPTH;
            this.json_var = this.game.cache.getJSON("lev1");
            this.lev1ar = [];
            for (var i = 0; i < this.json_var.length; i++) {
                this.lev1ar.push(new TProject.Segment(this.json_var[i]["x1"], this.game.rnd.integerInRange(-Test.MAX_DEPTH, Test.MAX_DEPTH), this.json_var[i]["y1"], this.json_var[i]["x2"], this.game.rnd.integerInRange(-Test.MAX_DEPTH, Test.MAX_DEPTH), this.json_var[i]["y2"]));
            }
            this._g = this.add.graphics(0, 0);
            this.newLevel();
            this._nodePoints = [
                this._testSegment[0].begin, this._testSegment[3].end
            ];
            this.drawAndRotate();
            this.game.input.onDown.add(function (e) {
                _this._mouseDown = true;
                _this._downX = e.position.x;
                _this._downY = e.position.y;
            });
            this.game.input.onUp.add(function (e) {
                _this._mouseDown = false;
            });
            this.game.input.addMoveCallback(this.moveMouse, this);
            this.c1_button = new TProject.OButton(this.game, "mmui", ["playBtn", "playBtn2"], function () {
                _this.newLevel();
                console.log("ADA");
            });
            this.c1_button.position.set(0, 0 * TProject.Main.SCALE);
            this.game.add.existing(this.c1_button);
            this.c1_button.enabled = true;
            this.c1_button.scale.set(0.2, 0.2);
        };
        Test.prototype.newLevel = function () {
            this._testSegment = [];
            this._testSegment = this.lev1ar;
            this.drawAndRotate();
            console.log(this._testSegment);
        };
        Test.prototype.nodeDelta = function () {
            var dx = this._nodePoints[0].x2d - this._nodePoints[1].x2d;
            var dy = this._nodePoints[0].y2d - this._nodePoints[1].y2d;
            return Math.floor(Math.max(Math.abs(dx), Math.abs(dy)));
        };
        Test.prototype.moveMouse = function (e) {
            if (this._mouseDown) {
                var x = e.position.x;
                var y = e.position.y;
                var rotX = (x - this._downX) * Math.PI / 360;
                var rotY = (y - this._downY) * Math.PI / 360;
                this._downX = x;
                this._downY = y;
                var coef = 0.5;
                this.drawAndRotate(rotX * coef, -rotY * coef);
                console.clear();
                if (this.nodeDelta() <= this.THRESHOLD) {
                    console.log("В данный момент фигура похожа на исходную");
                }
                else {
                    console.log("мессиво точек");
                }
            }
        };
        Test.prototype.drawAndRotate = function (rotX, rotY) {
            this._g.clear();
            for (var i = 0; i < this._testSegment.length; i++) {
                if (rotX != null) {
                    this._testSegment[i].rotate(rotX, rotY);
                }
                this._testSegment[i].draw(this._g);
            }
        };
        Test.prototype.update = function () {
        };
        Test.WORLD = {
            cx: 960 * 0.5,
            cy: 540 * 0.5,
            cz: 100,
            rotX: -Math.PI / 720,
            rotY: Math.PI / 720
        };
        Test.MAX_DEPTH = 200;
        return Test;
    }(Phaser.State));
    TProject.Test = Test;
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
    var TestGame = (function (_super) {
        __extends(TestGame, _super);
        function TestGame() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestGame.prototype.create = function () {
            this.initGameVars();
            this.createUI();
            this.startGame();
        };
        TestGame.prototype.initGameVars = function () {
            this._testWaitingTime = 850;
        };
        TestGame.prototype.createUI = function () {
            var _this = this;
            this._uiLayer = this.game.add.sprite(0, 0);
            this._uiLayer.alpha = 0;
            this._homeBtn = new TProject.OButton(this.game, "ui", ["btnHome", "btnHome"], function () {
                TProject.SoundMixer.bgStop();
                Utils.clearTimeoutsAndTweens(_this.game);
                _this.game.state.start("MainMenu", true);
            });
            this._homeBtn.x = 110 * TProject.Main.SCALE;
            this._homeBtn.y = 110 * TProject.Main.SCALE;
            this._uiLayer.addChild(this._homeBtn);
            this._homeBtn.enabled = false;
            this._popup = new TProject.Popup(this.game, function () {
                TProject.SoundMixer.bgStop();
                _this.game.state.start("TestGame", true);
            });
            this.game.add.existing(this._popup);
        };
        TestGame.prototype.startGame = function () {
            if (TProject.Boot.TEST_GAME_TIPS) {
                this.showUIAndStartLevel();
            }
            else {
                this.showTips();
            }
        };
        TestGame.prototype.showTips = function () {
            var _this = this;
            var g = this.game.add.graphics(0, 0);
            g.beginFill(0x000000);
            g.drawRect(0, 0, this.game.width, this.game.height);
            g.endFill();
            g.alpha = 0;
            this.game.add.tween(g).to({ alpha: 0.4 }, 300, Phaser.Easing.Sinusoidal.Out, true).onComplete.addOnce(function () {
                var back = _this.game.add.sprite(_this.game.width / 2, 0, "ui", "bgpopup");
                back.anchor.set(0.5);
                _this.game.add.tween(back).to({ y: _this.game.height / 2 }, 400, Phaser.Easing.Back.Out, true).onStart.addOnce(function () {
                    TProject.SoundMixer.play("swishSnd", 1);
                });
                var title = _this.game.add.text(0, -320 * TProject.Main.SCALE, TProject.Main.DATA[TProject.Boot.CURRENT_LANGUAGE.curLng]["how-to-play"], {
                    font: "BubbleboddyNeue-Regular",
                    fontSize: 60 * TProject.Main.SCALE + "px",
                    fontWeight: "normal",
                    fill: "#ffffff"
                });
                title.align = "center";
                title.anchor.set(0.5, 0);
                back.addChild(title);
                var tipsImage = _this.game.make.sprite(0, 86 * TProject.Main.SCALE, "ui", "help1_medal_10001");
                tipsImage.animations.add("idle", Phaser.Animation.generateFrameNames("help1_medal_1", 1, 30, "", 4), 15, true);
                tipsImage.anchor.set(0.5);
                back.addChild(tipsImage);
                tipsImage.play("idle");
                var exitBtn = new TProject.OButton(_this.game, "lng", ["close", "close2"], function () {
                    exitBtn.enabled = false;
                    _this.game.add.tween(back).to({ y: _this.game.height * 2 }, 300, Phaser.Easing.Sinusoidal.Out, true).onStart.addOnce(function () {
                        TProject.SoundMixer.play("swishSnd", 0.8);
                    });
                    _this.game.add.tween(g).to({ alpha: 0 }, 300, Phaser.Easing.Sinusoidal.Out, true).onComplete.addOnce(function () {
                        _this.showUIAndStartLevel();
                        TProject.Boot.TEST_GAME_TIPS = true;
                    });
                });
                exitBtn.position.set(0, 350 * TProject.Main.SCALE);
                back.addChild(exitBtn);
            });
        };
        TestGame.prototype.showUIAndStartLevel = function () {
            var _this = this;
            this.game.add.tween(this._uiLayer).to({ alpha: 1 }, 350, Phaser.Easing.Sinusoidal.Out, true).onComplete.addOnce(function () {
                _this._homeBtn.enabled = true;
            });
            setTimeout(function () {
                _this.endGame(19, true);
            }, this._testWaitingTime);
        };
        TestGame.prototype.update = function () {
        };
        TestGame.prototype.endGame = function (score, win) {
            this._uiLayer.alpha = 0;
            this._homeBtn.enabled = false;
            this._popup.show(score, win ? 2 : 1, win);
        };
        return TestGame;
    }(Phaser.State));
    TProject.TestGame = TestGame;
})(TProject || (TProject = {}));
