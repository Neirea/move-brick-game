// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "*,\r\n*::after,\r\n*::before {\r\n\tbox-sizing: border-box;\r\n}\r\n* > p {\r\n\tuser-select: none;\r\n\tmargin: 0;\r\n}\r\nbody {\r\n\tbackground: rgb(25, 25, 25);\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\twidth: 100%;\r\n\theight: 100vh;\r\n\tfont-size: 1.2rem;\r\n\tfont-family: BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\",\r\n\t\t\"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\r\n}\r\n.invis {\r\n\tposition: relative;\r\n\tfont-size: 4rem;\r\n\ttop: 1%;\r\n\tmargin: 0;\r\n\topacity: 0;\r\n\tcolor: white;\r\n\ttext-align: center;\r\n}\r\n#myCanvas {\r\n\ttouch-action: none;\r\n\tposition: absolute;\r\n\ttop: 50%;\r\n\tleft: 50%;\r\n\r\n\tbox-shadow: 0 0 1rem grey;\r\n\tbackground: rgb(230, 196, 125);\r\n\ttransform: translate(-50%, -50%);\r\n}\r\n#controlPanel {\r\n\tdisplay: flex;\r\n\tjustify-content: space-between;\r\n\talign-items: center;\r\n\tposition: absolute;\r\n\tpadding: 0 1.25rem;\r\n\tleft: 50%;\r\n\ttop: calc(17.5rem + 50%);\r\n\ttransform: translate(-50%, -50%);\r\n\tbackground: rgba(41, 16, 0, 0.8);\r\n\theight: 5rem;\r\n\twidth: 40rem;\r\n\tcolor: rgb(230, 196, 125);\r\n\ttouch-action: none;\r\n}\r\n#movesPanel,\r\n#levelsPanel {\r\n\tdisplay: flex;\r\n\tgap: 0.625rem;\r\n}\r\n#movesText,\r\n#levelsText {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-items: flex-end;\r\n\twhite-space: nowrap;\r\n}\r\n/* level selection */\r\n#loadLevel {\r\n\tposition: absolute;\r\n\tpadding: 0.5rem 1rem;\r\n\ttop: calc(50% - 16.8rem);\r\n\tleft: calc(50% + 16.7rem);\r\n\ttransform: translate(-50%, -50%);\r\n\r\n\tappearance: none;\r\n\tfont-size: 1rem;\r\n\tcolor: rgb(230, 196, 125);\r\n\tbackground-color: rgba(41, 16, 0, 0.8);\r\n\tuser-select: none;\r\n}\r\n#loadLevel:focus {\r\n\toutline: none;\r\n}\r\n#loadLevel > option {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n/* buttons */\r\n.btn {\r\n\tdisplay: inline-block;\r\n\tpadding: 0.75rem 1.5rem;\r\n\tborder: none;\r\n\tborder-radius: 2rem;\r\n\tfont-size: 1.2rem;\r\n\tfont-weight: 550;\r\n\tcolor: rgb(41, 16, 0);\r\n\tbackground-color: rgb(230, 196, 125);\r\n\tbox-shadow: 0 0 1rem rgb(25, 25, 25, 0.5);\r\n\tuser-select: none;\r\n\tcursor: pointer;\r\n}\r\n@media (hover: hover) and (pointer: fine) {\r\n\t.btn:enabled:hover {\r\n\t\tbackground-color: white;\r\n\t}\r\n}\r\n.btn:disabled {\r\n\topacity: 0.5;\r\n}\r\n/* win headings */\r\nh3 {\r\n\tdisplay: none;\r\n\tposition: absolute;\r\n\ttop: calc(50% - 5rem);\r\n\tleft: 50%;\r\n\ttransform: translate(-50%, -50%);\r\n\tfont-size: 3.5rem;\r\n\tcolor: white;\r\n\twhite-space: nowrap;\r\n\tuser-select: none;\r\n}\r\n@media (max-width: 640px) {\r\n\t* {\r\n\t\tfont-size: 2.5vw;\r\n\t}\r\n\tp {\r\n\t\tfont-size: 1.5rem;\r\n\t}\r\n} ;\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}