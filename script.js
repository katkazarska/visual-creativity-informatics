
let scale = 0.5;
let import_json = false;

const menu = document.querySelector("#menu");
const main = document.querySelector(".main");

const color = document.querySelector("#color");
const size = document.querySelector("#shape");
const zoomin = document.querySelector("#zoomin");
const zoomout = document.querySelector("#zoomout");
const imp = document.querySelector("#import");
const exp = document.querySelector("#export");
const info = document.querySelector("#info");

const view_tab = document.querySelector("#view_tab");
const design_tab = document.querySelector("#design_tab");

let file = document.querySelector("#json_file");
let selected_size = document.querySelector('input[name="shape_group"]:checked').id;
let color_input = document.querySelector("#choose_color");
let selected_color = "#f9fbe7";

let size_form = document.querySelector("#size_picker");

let export_buttton = document.querySelector("#export_button");

class Triangle {
    constructor (x, y, color) {
        this.color = color;
        this.x = x;
        this.y = y;
    }
}

let s1 = [43, 129];
let s2 = [0, 86, 172];
let s3 = s1;
let hexagon_s = [s1, s2, s3];
let s_x_shift = 129;
let s_y_shift = 75;

let r1 = [86, 172, 258];
let r2 = [43, 129, 215, 301];
let r3 = [0, 86, 172, 258, 344];
let r4 = r2;
let r5 = r1;
let hexagon_m = [r1, r2, r3, r4, r5];
let m_x_shift = 258;
let m_y_shift = 150;

let l1 = [129, 215, 301, 387];
let l2 = [86, 172, 258, 344, 430];
let l3 = [43, 129, 215, 301, 387, 473];
let l4 = [0, 86, 172, 258, 344, 430, 516];
let l5 = l3;
let l6 = l2;
let l7 = l1;
let hexagon_l = [l1, l2, l3, l4, l5, l6 , l7];
let l_x_shift = 387;
let l_y_shift = 225;

let Hexagon = [];
initialize_hex(hexagon_s, 1, 2);



function initialize_hex(hex, a, b) {
    Hexagon = [];
    let i = 0;
    let j = 0;
    while (i < a) {
        while ((j+1) < hex[i].length) {
            Hexagon.push(new Triangle([hex[i][j], hex[i][1+j], hex[i+1][1+j]], [i * 75, i * 75, (i + 1) * 75], "#dbdbdb"));
            j += 1;
        }
        j = 0;
        while ((j+1) < hex[i+1].length) {
            Hexagon.push(new Triangle([hex[i+1][j], hex[i+1][1+j], hex[i][j]], [(i + 1) * 75, (i + 1) * 75, i * 75], "#FFFFFF"));
            j += 1;
        }
        j = 0;
        i += 1;
    }
    i = a;
    j = 0;
    while (i < b) {
        while ((j+1) < hex[i].length) {
            Hexagon.push(new Triangle([hex[i][j], hex[i][1+j], hex[i+1][j]], [i * 75, i * 75, (i + 1) * 75], "#dbdbdb"));
            j += 1;
        }
        j = 0;
        while ((j+1) < hex[i+1].length) {
            Hexagon.push(new Triangle([hex[i+1][j], hex[i+1][1+j], hex[i][1+j]], [(i + 1) * 75, (i + 1) * 75, i * 75], "#FFFFFF"));
            j += 1;
        }
        j = 0;
        i += 1;
    }
}



design_tab.classList.add("toggled");
design_tab.style.backgroundColor = "#e6ee9c"; //light green


let previousToggled = null;
let currentToggled = null;
let toHide = null;

let previousToggledTab = design_tab;
let currentToggledTab = null;

color.addEventListener("click", (e) => {
  toggleMenu(color);
  toHide = color_section;
  color_section.style.display = "block";
})

color_input.addEventListener("change", (e) => {
    selected_color = color_input.value;
    design.redraw();
    view.redraw();
})

size.addEventListener("click", (e) => {
  toggleMenu(size);
  toHide = size_section;
  size_section.style.display = "block";
})

size_form.addEventListener("change", (e) => {
    selected_size = document.querySelector('input[name="shape_group"]:checked').id;
    if (selected_size == "small") {
        selected_color = "#f9fbe7";
        initialize_hex(hexagon_s, 1, 2);
        design.redraw();
        view.redraw();
    } else if (selected_size == "medium") {
        selected_color = "#f9fbe7";
        initialize_hex(hexagon_m, 2, 4);
        design.redraw();
        view.redraw();
    } else {
        selected_color = "#f9fbe7";
        initialize_hex(hexagon_l, 3, 6);
        design.redraw();
        view.redraw();
    }
})

zoomin.addEventListener("click", (e) => {
  toggleMenu(zoomin);
  scale += 0.1;
  view.redraw();
})

zoomout.addEventListener("click", (e) => {
  toggleMenu(zoomout);
  if (scale > 0.2) {
    scale -= 0.1;
    view.redraw();
  }
})


imp.addEventListener("click", (e) => {
  toggleMenu(imp);
  /*toHide = import_section;
  import_section.style.display = "block";*/
});

/*file.addEventListener("change", (e) => {
    import_json = "true";
    design.redraw();
    view.redraw();
})*/

exp.addEventListener("click", (e) => {
  toggleMenu(exp);
  toHide = export_section;
  export_section.style.display = "block";
});

export_buttton.addEventListener("click", (e) => {
    let export_input = document.querySelector('input[name="export_group"]:checked').id;
    if (export_input == "svg") {
        view.saveSVG('view.svg');
    } else if (export_input == "png") {
        view.saveSVG('view.png');
    } else if (export_input == "json"){
        let json = {};
        json.size = selected_size;
        json.object = Hexagon;
        design.saveJSON(json, 'settings.json');
    }
})

info.addEventListener("click", (e) =>{
  toggleMenu(info);
  toHide = info_section;
  info_section.style.display = "block";
})

view_tab.addEventListener("click", (e) => {
    toggleTab(view_tab);
    design_canvas.style.display = "none";
    view_canvas.style.display = "block";
    view.redraw();
});

design_tab.addEventListener("click", (e) => {
    toggleTab(design_tab);
    design_canvas.style.display = "block";
    view_canvas.style.display = "none";
});

const toggleTab = (button) => {
    if (previousToggledTab !== button) {
        untoggleTab(previousToggledTab);

        button.classList.add("toggled");
        button.style.backgroundColor = "#e6ee9c"; //green

        previousToggledTab = button;
    }
}

const untoggleTab = (button) => {
    button.classList.remove("toggled");
    button.style.backgroundColor = "#afb42b"; //light green
}

const toggleMenu = (button) => {
  if (previousToggled && button !== menu) {
    untoggleMenu(previousToggled);
  }

  button.classList.add("toggled");
  button.style.backgroundColor = "#e6ee9c"; //light green

  if (button !== menu) {
    previousToggled = button;
  }
};

const untoggleMenu = (button) => {
  button.classList.remove("toggled");
  button.style.backgroundColor = "#afb42b"; //green
  if (toHide !== null) {
    toHide.style.display = "none";
    toHide = null;
  }
};

let p_color = document.createElement("p");
p_color.id = "p-color";
p_color.innerHTML = "Color";
color.style.width = "240px";
color.style.justifyContent = "left";
color.appendChild(p_color);

let p_size = document.createElement("p");
p_size.id = "p-size";
p_size.innerHTML = "Size";
size.style.width = "240px";
size.style.justifyContent = "left";
size.appendChild(p_size);

let p_zoomin = document.createElement("p");
p_zoomin.id = "p-zoomin";
p_zoomin.innerHTML = "Zoom in view";
zoomin.style.width = "240px";
zoomin.style.justifyContent = "left";
zoomin.appendChild(p_zoomin);

let p_zoomout = document.createElement("p");
p_zoomout.id = "p-zoomout";
p_zoomout.innerHTML = "Zoom out view";
zoomout.style.width = "240px";
zoomout.style.justifyContent = "left";
zoomout.appendChild(p_zoomout);

let p_import = document.createElement("p");
p_import.id = "p-import";
p_import.innerHTML = "Import";
imp.style.width = "240px";
imp.style.justifyContent = "left";
imp.appendChild(p_import);

let p_export = document.createElement("p");
p_export.id = "p-export";
p_export.innerHTML = "Export";
exp.style.width = "240px";
exp.style.justifyContent = "left";
exp.appendChild(p_export);

let p_info = document.createElement("p");
p_info.id = "p-info";
p_info.innerHTML = "About";
info.style.width = "240px";
info.style.justifyContent = "left";
info.appendChild(p_info);

let p_view = document.createElement("p");
p_view.id = "p-view";
p_view.innerHTML = "View mode";
view_tab.style.width = "240px";
view_tab.style.justifyContent = "left";
view_tab.appendChild(p_view);

let p_design = document.createElement("p");
p_design.id = "p-design";
p_design.innerHTML = "Design mode";
design_tab.style.width = "240px";
design_tab.style.justifyContent = "left";
design_tab.appendChild(p_design);




const v = ( sketch ) => {
    let w = sketch.windowWidth - 500;
    let h = (w/16)*9

    sketch.setup = () => {
        sketch.createCanvas(w, h, sketch.SVG);
    };

    sketch.draw = () => {
        sketch.noLoop();
        sketch.background("#f9fbe7");
        sketch.fill("#f9fbe7");
        sketch.noStroke();
        if (selected_size == "small") {
            draw_hex(s_x_shift, s_y_shift, -43, -75);
        } else if (selected_size == "medium") {
            draw_hex(m_x_shift, m_y_shift, -86, -150);
        } else {
            draw_hex(l_x_shift, l_y_shift, -129, -225)
        }
    };

    function draw_hex (w_shift, h_shift, a, b) {
        let i = a;
        let j = b;
        let f = 1;
        do {
            do {
                Hexagon.forEach(item => {
                    sketch.fill(item.color);
                    let x1 = (item.x[0] + i) * scale;
                    let y1 = (item.y[0] + j) * scale;
                    let x2 = (item.x[1] + i) * scale;
                    let y2 = (item.y[1] + j) * scale;
                    let x3 = (item.x[2] + i) * scale;
                    let y3 = (item.y[2] + j) * scale;
                    sketch.triangle(x1, y1, x2, y2, x3, y3);
                });
                i += (w_shift * 2);
            } while ((i*scale) < w);
            if (f % 2 == 0) {
                i = a;
            } else {
                i = a + w_shift;
            }
            j += h_shift;
            f += 1;
        } while ((j*scale) < h);
    }

};

let view_canvas = document.getElementById("view");
let view = new p5(v, view_canvas);
view_canvas.style.display = "none";


const d = ( sketch ) => {

    sketch.setup = () => {
        sketch.createCanvas(600, 600, sketch.SVG);
    };

    sketch.draw = () => {
        sketch.noLoop();
        sketch.background("#f9fbe7");
        sketch.fill("#f9fbe7");
        sketch.noStroke();

        if (import_json) {
            let hex = sketch.loadJSON(file.name);
            handleInput(hex);
        }

        Hexagon.forEach(item => {
            sketch.fill(item.color);
            sketch.triangle(item.x[0], item.y[0], item.x[1], item.y[1], item.x[2], item.y[2]);
        });
    };

    sketch.mousePressed = () => {
        let m_x = sketch.mouseX;
        let m_y = sketch.mouseY;

        let distance = 75;
        let i = 0;

        while (i < Hexagon.length) {
            d1 = sketch.dist(m_x, m_y, Hexagon[i].x[0], Hexagon[i].y[0]);
            d2 = sketch.dist(m_x, m_y, Hexagon[i].x[1], Hexagon[i].y[1]);
            d3 = sketch.dist(m_x, m_y, Hexagon[i].x[2], Hexagon[i].y[2]);
            if (d1 < distance && d2 < distance && d3 < distance) {
                Hexagon[i].color = selected_color;
                sketch.redraw();
            }
            i += 1;
        }
    };

    function handleInput(hex) {
        Hexagon = [];
        let s = 0;
        if (hex.size == "small") {
            s = 6;
        } else if (hex.size == "medium") {
            s = 24;
        } else if (hex.size == "large") {
            s = 54;
        }

        for (i=0; i < s; i++) {
            Hexagon.push(new Triangle(hex.object[i].x, hex.object[i].y, hex.object.color));
        }
    }

};

let design_canvas = document.getElementById("design");
let design = new p5(d, design_canvas);


