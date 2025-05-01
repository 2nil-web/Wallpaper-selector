var old_app_w, old_app_h;
var old_darkmode;
var old_wbgcolor, old_bgcolor;
var old_met, old_rejectfolder;
var old_imargin, old_persgeo, old_showtool;


function hide_imgs(hide = true) {
  showingConfig = hide;

  set_img_divs(!hide);

  if (hide) {
    vis = 'hidden';
    cnfDiv.style.display = 'block';
    document.body.addEventListener("keyup", onKeyUpConfig);
    old_app_w = app.w;
    old_app_h = app.h;
    app.set_size(500, 425, 0)
    app.set_size(500 + app.left_border + app.right_border, 425 + app.top_border + app.bottom_border, 1)
    //console.log(`hide_imgs -- old_met: ${old_met}`);
  } else {
    cnfDiv.style.display = 'none';
    vis = 'visible';
    document.body.removeEventListener("keyup", onKeyUpConfig);
    app.set_size(old_app_w, old_app_h, 0)
  }


  for (i = 0; i < img_divs.length; i++) {
    //console.log(`img_divs[${i}]`);
    img_divs[i].style.visibility = vis;
  }

  //tools_visibility(hide);
}

function srgb2num(srgb) {
  f = srgb.match(/.*\((.*),(.*),(.*)\).*/);
  n = (parseInt(f[1]) << 16) + (parseInt(f[2]) << 8) + parseInt(f[3]);
  return n;
}

function num2srgb(n) {
  return `rgb(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255})`;
}

// Darken a rgb string in the form '#RRGGBB' by n shifts of its corresponding component numbers value
// And return a string of the form "rgb(rr, gg, bb)"
function darken_rgb(s, shift = 1) {
  var f = s.match(/#(..)(..)(..)/);
  var f1 = parseInt(f[1], 16),
    f2 = parseInt(f[2], 16),
    f3 = parseInt(f[3], 16);
  f1 = f1 >> shift;
  f2 = f2 >> shift;
  f3 = f3 >> shift;
  return `rgb(${f1.toString()},${f2.toString()},${f3.toString()})`;
}

function setDarkMode(dm = null) {
  if (dm === null) dm = darkmode.checked;
  else darkmode.checked = dm;

  win.dark_bar(dm);

  if (darkmode.checked) { //Darken the choosen app bg col
    //console.log(`wbgcolor.value: ${wbgcolor.value}`);
    document.body.style.backgroundColor = darken_rgb(wbgcolor.value);
    //console.log(`backgroundColor: ${document.body.style.backgroundColor}`);
  } else {
    document.body.style.backgroundColor = wbgcolor.value;
  }

  /* Traiter le cas ou fgc et bgc sont trop proche */
  var bgc = srgb2num(window.getComputedStyle(document.body).getPropertyValue("background-color"));
  var fgc = srgb2num(window.getComputedStyle(document.body).getPropertyValue("color"));
  var diffc = Math.abs(bgc - fgc);
  if (bgc < 0x888888) {
    document.body.style.color = "#ffffff";
  } else document.body.style.color = "#000000";

  //if (fgc < bgc) document.body.style.color
  //console.log(`setDarkMode -- bgcol: ${bgc.toString(16)}, fgcol: ${fgc.toString(16)}, diffcol: ${diffc.toString(16)}`);
}

async function setRejFold(met) {
  //console.log(`cnfRejFold -- met: ${met}`);

  if (met === "delete") {
    rejectfolder.disabled = true;
    choicefolder.disabled = true;
  } else {
    rejectfolder.disabled = false;
    choicefolder.disabled = false;
  }
}

function setRejMet(met) {
  if (met === "delete") {
    rejectfolder.disabled = true;
    choicefolder.disabled = true;
    rempic.checked = true;
    movpic.checked = false;
  } else {
    rejectfolder.disabled = false;
    choicefolder.disabled = false;
    rempic.checked = false;
    movpic.checked = true;
  }
}

async function setRejFolder() {
  var fld = await gui.folderdlg();
  //console.log(fld);
  rejectfolder.value = fld;
}

async function setPersGeo() {
  if (persist_geom.checked) {
    //console.log("Setting geometry persistence");
    if (!await fs.exists(".config.ini")) await fs.write(".config.ini", "init_state = 0");
  } else {
    //console.log("Unsetting geometry persistence");
    if (await fs.exists(".config.ini")) await fs.remove(".config.ini");
  }
}

function cnfDivCancel() {
  darkmode.checked = old_darkmode;
  setDarkMode(darkmode.checked);
  img_margin.value = old_imargin;
  persist_geom.checked = old_persgeo;

  document.getElementById(old_showtool.id).checked = true;

  bgcolor.value = old_bgcolor;
  wbgcolor.value = old_wbgcolor;

  setRejMet(old_met);
  rejectfolder.value = old_rejectfolder;

  hide_imgs(false);
}

function cnfDivOk() {
  saveConfig();
  //console.log(`img_margin: ${img_margin.value}`);

  if (darkmode.checked) {
    //console.log(`img bg: ${darken_rgb(bgcolor.value)}`);

    for (i = 0; i < img_divs.length; i++)
      img_divs[i].style.backgroundColor = darken_rgb(bgcolor.value);
  } else {
    //console.log(`img bg: ${bgcolor.value}`);

    for (i = 0; i < img_divs.length; i++)
      img_divs[i].style.backgroundColor = bgcolor.value;
  }

  setPersGeo();

  hide_imgs(false);
}

function onKeyUpConfig(evt) {
  evt = evt || window.event;

  switch (evt.keyCode) {
    case 13:
      cnfDivOk();
      break;
    case 27:
      cnfDivCancel();
      break;
  }
}

function only_int(event) {
  //console.log(event);
  //console.log(event.target.min);
  //console.log(this.value);
  if (this.value < 1) this.value = 1;
  else if (this.value > 20) this.value = 20;
  return this.value |= 0;
}

function showConfig() {
  if (rempic.checked) old_met = "delete";
  else old_met = "move";

  old_darkmode = darkmode.checked;
  setDarkMode(darkmode.checked);
  old_imargin = img_margin.value;
  img_margin.addEventListener("input", only_int)
  old_persgeo = persist_geom.checked;

  old_showtool = document.querySelector('input[name="showtools"]:checked');

  old_wbgcolor = wbgcolor.value;
  old_bgcolor = bgcolor.value;

  old_rejectfolder = rejectfolder.value;
  hide_imgs();
}