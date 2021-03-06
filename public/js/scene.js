class Scene {
    constructor(canvas,src) {
        this.canvas = document.getElementById(canvas);
        this.devWidth = window.innerWidth;
        this.devHeight = window.innerHeight;
        this.ctx = null;
        this.src = src;
        this.img = [];
        this.fps = 60;// refresh rate
        this.count = 10;// default amount of maple leaf
        this.texture = [];// render texture
    }
    // initialize
    init() {
        // check canvas supported on this broswer
        if(this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
        }else {
            return
        }
        // set amount of maple leaf
        this.setAmount();
        // init canvas
        this.canvas.width = this.devWidth;
        this.canvas.height = this.devHeight;
        this.canvas.style = `position: fixed;top: 0;left: 0;`;
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // run after loaded
        let length = this.src.length;
        let $i = 0;
        for(let url of this.src) {
            let img = new Image();
            img.src = url;
            img.onload = () => {
                this.img.push(img);
                $i ++;
                if($i==length) {
                    this.start();
                }
            }
        }
        // window resize
        window.onresize = ()=>{
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
    // start scene
    start() {
        for(let i=0;i<this.count;i++) {
            let type = Math.floor(Math.random()*this.img.length);
            let maple = new Maple(this.canvas,this.img[type],60/this.fps);
            this.texture.push(maple);
        }
        this.run();
    }
    // run loop
    run() {
        this.ctx.restore();
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(let i=0;i<this.count;i++) {
            this.ctx.restore();
            this.ctx.save();
            this.texture[i].draw();
        }
        setTimeout( ()=> {
            this.run();
        },1000/this.fps);
    }
    // set amount
    setAmount() {
        if(this.devWidth>=1600) {
            this.count = 15;
        }else if(this.devWidth>=1024) {
            this.count = 9;
        }else if(this.devWidth>=768) {
            this.count = 5;
        }
    }
}