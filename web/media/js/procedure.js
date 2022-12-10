export class Procedure {

    constructor() {
        this.c = document.querySelector('canvas#procedure');
        this.ctx = this.c.getContext('2d');
        this.list = [];
        this.circle_radius = 50;
        this.icon_dim = {height: 64, width: (64 * 1.1)}

        // load procedure
        this.loadProcedure();
    }

    draw(element){
        // add element to list
        this.list.push(element);
        // clear canvas
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        // draw all elements in list
        this.list.forEach((el) => {
            if (el.type && el.type === "img") {
                this.ctx.drawImage(el.el, el.x, el.y, el.width, el.height);
            } else if (el.type === "arc") {
                this.ctx.beginPath();
                this.ctx.arc(el.x, el.y, el.radius, el.startAngle, el.endAngle);
                this.ctx.stroke();
                this.ctx.fillStyle = el.fillColor;
                this.ctx.fill();

                if (el.connectTo !== false && this.list[el.connectTo]) {
                    let connectToElement = this.list[el.connectTo];

                    this.ctx.beginPath();
                    this.ctx.moveTo(connectToElement.x, connectToElement.y + this.circle_radius);
                    this.ctx.lineTo(el.x, el.y - this.circle_radius);
                    this.ctx.closePath();
                    this.ctx.stroke();
                }
            }
        });
    }

    loadProcedure() {
        const first_circle_loc = {x: 100, y: 50};
        const first_icon_loc = {x: first_circle_loc.x, y: first_circle_loc.y};

        const second_circle_loc = {x: 300, y: 250};
        const second_icon_loc = {x: second_circle_loc.x, y: second_circle_loc.y};

        const third_circle_loc = {x: 100, y: 420};
        const third_icon_loc = {x: third_circle_loc.x, y: third_circle_loc.y};

        // first icon and circle
        this.draw({
            type: 'arc',
            x: first_circle_loc.x,
            y: first_circle_loc.y,
            radius: this.circle_radius,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            fillColor: "white",
        });
        this.draw({
            type: 'img',
            x: first_icon_loc.x - (this.icon_dim.width / 2),
            y: first_icon_loc.y - (this.icon_dim.height / 2),
            height: this.icon_dim.height,
            width: this.icon_dim.width,
            el: document.querySelector('img#first_step_image')
        });

        // second icon and circle
        this.draw({
                type: 'arc',
                x: second_circle_loc.x,
                y: second_circle_loc.y,
                radius: this.circle_radius,
                startAngle: 0,
                endAngle: 2 * Math.PI,
                fillColor: "white",
                connectTo: 0
            });
        this.draw({
            type: 'img',
            x: second_icon_loc.x - (this.icon_dim.width / 2),
            y: second_icon_loc.y - (this.icon_dim.height / 2),
            height: this.icon_dim.height,
            width: this.icon_dim.width,
            el: document.querySelector('img#first_step_image')
        });

        // third icon and circle
        this.draw({
                type: 'arc',
                x: third_circle_loc.x,
                y: third_circle_loc.y,
                radius: this.circle_radius,
                startAngle: 0,
                endAngle: 2 * Math.PI,
                fillColor: "white",
                connectTo: 2
            });
        this.draw({
            type: 'img',
            x: third_icon_loc.x - (this.icon_dim.width / 2),
            y: third_icon_loc.y - (this.icon_dim.height / 2),
            height: this.icon_dim.height,
            width: this.icon_dim.width,
            el: document.querySelector('img#first_step_image')
        });
    }
}