new Vue({
    el: "#app",
    data() {
        let url = window.location.href
        let info = url.split('!')[1]   //artist=周杰伦&album=叶惠美  截取到参数部分
        let qys = new URLSearchParams('!' + info)  //将参数放在URLSearchParams函数中
        let artist = qys.get('artist')   //周杰伦
        let album = qys.get('album')  //叶惠美
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                {
                    name: "以父之名",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/以父之名.mp3",
                    favorited: false
                },
                {
                    name: "懦夫",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/懦夫.mp3",
                    favorited: false
                },
                {
                    name: "晴天",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/晴天.mp3",
                    favorited: false
                },
                {
                    name: "三年二班",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/三年二班.mp3",
                    favorited: false
                },
                {
                    name: "东风破",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/东风破.mp3",
                    favorited: false
                },
                {
                    name: "你听得到",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/你听得到.mp3",
                    favorited: false
                },
                {
                    name: "同一种调调",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/同一种调调.mp3",
                    favorited: false
                },
                {
                    name: "她的睫毛",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/她的睫毛.mp3",
                    favorited: false
                },
                {
                    name: "爱情悬崖",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/爱情悬崖.mp3",
                    favorited: false
                },
                {
                    name: "梯田",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/梯田.mp3",
                    favorited: false
                },
                {
                    name: "双刀",
                    artist: artist,
                    cover:
                        "../img/" + artist + "/" + album + ".png",
                    source:
                        "../music/" + album + "/双刀.mp3",
                    favorited: false
                },
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
                ].favorited;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function () {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function () {
            vm.generateTime();
        };
        this.audio.onended = function () {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});


//渐变背景颜色
var colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.005;

function updateGradient() {

    if ($ === undefined) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    $('#gradient').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}

setInterval(updateGradient, 10);
