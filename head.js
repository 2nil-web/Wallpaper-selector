var img_divs = null;

async function sleep(nsec) {
  await new Promise(r => setTimeout(r, nsec * 1000));
}

async function next_wallpaper_infos() {
  var owi = await win.wallpapers_info();
  //console.log(owi);
  var nw = await win.next_wallpaper();

  if (nw) {
    var no_wp_change = true;

    var to = setTimeout(() => {
      //console.log("Time out while trying to change wallpaper");
      no_wp_change = false;
    }, 6000);

    while (no_wp_change) {
      var nwi = await win.wallpapers_info();
      i = 0;
      //console.log("loop on wallpaper files per monitor");
      for (k in owi) {
        if (owi[k]["file"] !== nwi[k]["file"]) {
          clearTimeout(to);
          //console.log(`On monitor number ${i+1}, coordinates (${nwi[k]["rect"]}), wallpaper has change from file ${owi[k]["file"]} to file ${nwi[k]["file"]}`)
          no_wp_change = false;

        }
        i++;
      }
      await sleep(0.1);
    }
  } else {
    //console.log("Unable to advance to next wallpaper");
  }
}

var cnf_svg = '<circle cx="12" cy="12" r="11.322" fill="#ff8600" stroke="#000" stroke-width=".95614"/><path class="cls-1" d="m14.316 3.2288c0.77147 0.23166 1.5084 0.56569 2.1912 0.99318l1.1793-1.1857c0.57037-0.56768 1.492-0.56768 2.0623 0l1.2082 1.2145c0.5674 0.57065 0.5674 1.4927 0 2.0634l-1.2697 1.2703c0.36599 0.66317 0.64654 1.3701 0.83494 2.1038h1.8315c0.809-0.0022 1.466 0.65342 1.466 1.4628v1.713c-0.0021 0.80489-0.65376 1.4569-1.4583 1.459h-1.8488c-0.19251 0.72589-0.47493 1.4249-0.84071 2.0807l1.2851 1.2915c0.5674 0.57065 0.5674 1.4927 0 2.0634l-1.2062 1.2088c-0.57102 0.5679-1.4932 0.5679-2.0643 0l-1.2197-1.2222c-0.67275 0.413-1.3964 0.73652-2.1528 0.96238v1.6534c-0.0021 0.80489-0.65376 1.4569-1.4583 1.459h-1.7103c-0.8045-0.0021-1.4561-0.65408-1.4583-1.459v-1.4936c-0.83012-0.18784-1.6299-0.49105-2.3759-0.90079l-1.0004 1.0009c-0.57123 0.56558-1.4911 0.56558-2.0623 0l-1.2139-1.2145c-0.56635-0.57108-0.56635-1.4923 0-2.0634l0.90805-0.90849c-0.47562-0.76212-0.83607-1.5904-1.0696-2.4579h-1.2351c-0.8045-0.0021-1.4561-0.65408-1.4583-1.459v-1.713c-3e-6 -0.80639 0.65226-1.4607 1.4583-1.4628h1.2216c0.22704-0.87852 0.58434-1.7181 1.06-2.4907l-0.88496-0.88347c-0.56531-0.57151-0.56531-1.4918 0-2.0634l1.2139-1.2145c0.57037-0.56768 1.492-0.56768 2.0623 0l0.96192 0.96238c0.75433-0.42537 1.5663-0.73916 2.4106-0.93159v-1.4282c0.0022-0.80639 0.65611-1.459 1.4621-1.459h1.7122c0.8045 0.002116 1.4561 0.65408 1.4583 1.459zm-2.4529 3.0357c5.2349 2e-7 7.8551 6.3324 4.1531 10.035-3.7019 3.7022-10.03 1.0782-10.028-4.1592 0-3.2458 2.6307-5.8767 5.8749-5.8754z" fill="#fff" fill-rule="evenodd" stroke-width=".19243"/>';

var next_svg = '<ellipse cx="12" cy="12" rx="11.034" ry="11.034" fill="#ff8600" stroke="#000" stroke-width=".93181"/><path d="m23.108 10.658c-1.8145-1.8132-3.6288-3.6265-5.4433-5.4397-1.7171-1.7161-4.3719 0.9572-2.6505 2.6773 0.73955 0.73903 1.4792 1.4781 2.2187 2.2174h-14.99c-2.4335 0-2.4549 3.7666-0.02714 3.7666h15.017l-2.2338 2.2322c-1.7173 1.7158 0.95788 4.3688 2.6792 2.6487 1.8145-1.813 3.6288-3.6259 5.4433-5.4392 0.72847-0.72829 0.70865-1.9411-0.01442-2.6633z" fill="#fff" stroke-width=".067154"/>';

var hidden_svg = '<circle cx="12" cy="12" r="10.655" fill="#ff8600" stroke="#000" stroke-linecap="round" stroke-width=".68969"/><g transform="matrix(.93258 0 0 .93258 .81627 .80692)" fill="#fff"><g stroke-width=".042213"><path d="m12 16.072c2.5996 0 4.7068-2.1338 4.7068-4.7658 0-0.23736-0.02286-0.46872-0.05601-0.69668l-5.339 5.4059c0.2252 0.03352 0.45366 0.05641 0.68809 0.05641z"/><path d="m4.161 16.884 1.8599-1.883c-1.0442-0.6387-1.9928-1.4435-2.8008-2.3947 1.2244-1.4417 2.771-2.5492 4.4866-3.2462-0.26341 0.59474-0.41335 1.2524-0.41335 1.9465 0 0.70496 0.15505 1.372 0.42644 1.9741l1.502-1.5204c-0.23904-0.23761-0.38797-0.56747-0.38797-0.93348 0-0.72293 0.57897-1.3091 1.2929-1.3091 0.36124 0 0.68729 0.15079 0.92172 0.39282l1.3649-1.3819 1.537-1.5558 0.77048-0.7804c-0.88962-0.1778-1.7996-0.27478-2.7204-0.27478-4.5166 0-8.7986 2.2153-11.454 5.9261l-0.54579 0.76264 0.54583 0.76272c0.99924 1.3962 2.2293 2.5805 3.6152 3.5151z"/><path d="m19.264 7.9639-1.8817 1.9051c1.2812 0.68263 2.4381 1.6076 3.3975 2.737-2.1885 2.5766-5.4045 4.0892-8.7802 4.0892-0.4321 0-0.86139-0.02549-1.2863-0.07407l-2.1973 2.2247c1.1286 0.29252 2.2974 0.44896 3.4835 0.44896 4.5166 0 8.7989-2.2153 11.454-5.9263l0.54583-0.76274-0.54583-0.76268c-1.1353-1.5857-2.5693-2.8959-4.19-3.8792z"/></g><path d="m10.687 15.079 6.7203-6.8042 3.0092-3.047c0.4697-0.47557 0.4697-1.2467 0-1.7222-0.2348-0.23769-0.54276-0.35674-0.85053-0.35674s-0.61575 0.11883-0.85048 0.35674l-3.7572 3.8043-7.3443 7.4361-1.5627 1.5821-2.435 2.4652c-0.4697 0.47557-0.4697 1.2467 0 1.7222 0.23476 0.23774 0.54276 0.35678 0.85053 0.35678s0.61575-0.11886 0.85053-0.35678l4.8204-4.8806z" stroke-width=".034898"/><\/g>';

var size_svg = '<g transform="matrix(1.0567 0 0 1.0577 -.68002 -.6816)"><circle cx="12" cy="12" r="11" fill="#ff8600" stroke="#000" stroke-linecap="round" stroke-width=".712"/><g transform="matrix(1.1233 0 0 1.1233 -.175 -1.8975)" fill="#fff" stroke-width=".046574"><path d="m17.092 4.8009c-1.7791 6.307e-4 -3.5581 0.0011-5.3372 0.0018-1.6837 4.648e-4 -1.6746 2.6135 0.01314 2.6129 0.72512-2.569e-4 1.4503-5.138e-4 2.1756-6.39e-4l-4.2848 4.2848c-1.1934 1.1934 0.64329 3.0511 1.8339 1.8605l4.2983-4.2983-7.77e-4 2.1902c-7.29e-4 1.6837 2.6123 1.6728 2.6129-0.01499 7.62e-4 -1.779 0.0014-3.5578 2e-3 -5.3369 8.8e-5 -0.71442-0.60439-1.2995-1.3132-1.2991z"/><path d="m4.5845 19.943c1.7791-6.31e-4 3.5581-0.0011 5.3372-0.0018 1.6837-4.65e-4 1.6746-2.6135-0.01314-2.6129-0.72512 2.57e-4 -1.4503 5.13e-4 -2.1756 6.39e-4l4.2848-4.2848c1.1934-1.1934-0.64329-3.0511-1.8339-1.8605l-4.2983 4.2983 7.77e-4 -2.1902c7.29e-4 -1.6837-2.6123-1.6728-2.6129 0.01499-7.62e-4 1.779-0.0014 3.5578-2e-3 5.3369-8.8e-5 0.71442 0.60439 1.2995 1.3132 1.2991z"/><\/g><\/g>';


var del_svg = '<ellipse cx="12" cy="12" rx="10.542" ry="10.542" fill="#f44336" stroke="#2c2c2c" stroke-width=".91667"/><rect transform="matrix(.70766 -.70655 .70766 .70655 0 0)" x="-2.0831" y="5.7288" width="4.5832" height="22.358" ry="2.2916" fill="#fff" stroke-width=".048223"/><rect transform="matrix(.70766 .70655 -.70766 .70655 0 0)" x="14.356" y="-11.083" width="4.0304" height="22.17" ry="2.0152" fill="#fff" stroke-width=".048223"/>';

function compute_gcd(a, b) {
  return b ? compute_gcd(b, a % b) : a;
}
// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
function reduce(numerator, denominator) {
  var gcd = compute_gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}

var prev_page_w = -1,
  prev_page_h = -1;
var page_w = -1,
  page_h = -1;

function clientPageDimension() {
  var html = document.documentElement;
  prev_page_w = page_w;
  prev_page_h = page_h;

  page_w = Math.max(html.clientWidth || 0, window.innerWidth || 0);
  page_h = Math.max(html.clientHeight || 0, window.innerHeight || 0);
  return [page_w, page_h];
}

function clientPageDimensionChanges() {
  if ((prev_page_w < 0 && prev_page_h < 0) || (prev_page_w === page_w && prev_page_h === page_h)) return false;
  return true;
}

var wpi = null;
var vwidth, vheight;

// Get biggest of the width or height of the body and return the corresponding scaled coordinates
// rc[] is always left, top, right, bottom
function biggest_dim(rc) {
  var bodyWidth, bodyHeight;
  [bodyWidth, bodyHeight] = clientPageDimension();
  //var k, kw = bodyWidth / vwidth, kh = 95 * (bodyHeight / vheight) / 100;
  var k, kw = bodyWidth / vwidth,
    kh = bodyHeight / vheight;
  if (kw > kh) k = kw;
  else k = kh;
  return [rc[0] * k, rc[1] * k, rc[2] * k, rc[3] * k];
}

function coord(div) {
  var rc = biggest_dim(div.wallpaper_rect);
  var imarg = parseInt(img_margin.value);
  div.style.left = parseInt(rc[0]) + imarg + "px";
  div.style.top = parseInt(rc[1]) + imarg + "px";
  div.style.width = parseInt(rc[2]) - parseInt(rc[0]) - 2 * imarg + "px";
  div.style.height = parseInt(rc[3]) - parseInt(rc[1]) - 2 * imarg + "px";
  //div.wallpaper_rect=rc;
}

const array_equal = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

function trace_image(div) {
  console.log(`Thumbnail image parameters - name:${div.name}, filename:${div.filename}, wallpaper_rect:${div.wallpaper_rect}`);

  var ri = parseInt(div.style.left) + parseInt(div.style.width) + app.left_border + app.right_border;
  var bo = parseInt(div.style.top) + parseInt(div.style.height) + app.top_border + app.bottom_border;
  console.log(`div x, y, w, h, (right,bottom):${div.style.left}, ${div.style.top}, ${div.style.width}, ${div.style.height}, (${ri},${bo})`);
}

function move_image(div, wallpaper_rect) {
  var tb_rc = biggest_dim(wallpaper_rect);
  //console.log(`tb_rc:${tb_rc} - wallpaper_rect:${wallpaper_rect}`);
  var [bodyWidth, bodyHeight] = clientPageDimension();
  if (array_equal(div.wallpaper_rect, wallpaper_rect)) return;
  var tb_w = tb_rc[2] - tb_rc[0],
    tb_h = tb_rc[3] - tb_rc[1];

  if (tb_rc[0] === parseInt(div.style.left) && tb_rc[1] === parseInt(div.style.top) && tb_rc[2] < bodyWidth && tb_rc[3] < bodyHeight) return;
  //console.log("tb_rc[0]:", tb_rc[0], " != div.style.left:", parseInt(div.style.left), "|| tb_rc[1]:", tb_rc[1], " !== div.style.top:", parseInt(div.style.top), " || tb_rc[2]:", tb_rc[2], " >= bodyWidth:", bodyWidth, " || tb_rc[3]:", tb_rc[3], " >= bodyHeight:", bodyHeight);
  //trace_image(div);
  var ol = div.style.left,
    ot = div.style.top,
    or = div.style.right,
    ob = div.style.bottom;
  var imarg = parseInt(img_margin.value);
  div.style.left = parseInt(tb_rc[0] + imarg) + "px";
  div.style.top = parseInt(tb_rc[1] + imarg) + "px";
  div.style.width = parseInt(tb_w - 2 * imarg) + "px";
  div.style.height = parseInt(tb_h - 2 * imarg) + "px";
  div.wallpaper_rect = wallpaper_rect;
  //trace_image(div);
  //console.log(" ");
  if (ol == div.style.left && ot == div.style.top && or == div.style.right && ob == div.style.bottom) return false;
  return true;
}

// Recenter images if necessary to avoid negatives coordinates in the body
function recenter() {
  //if (!clientPageDimensionChanges()) return;
  var max_right = 0,
    max_bottom = 0;
  var hor_push = 0,
    vert_push = 0;

  // Look for negative offset
  for (var i = 0; i < img_divs.length; i++) {
    var ll = parseInt(img_divs[i].style.left);
    var lt = parseInt(img_divs[i].style.top);
    if (ll < 0) hor_push += -ll;
    if (lt < 0) vert_push += -lt;
  }

  // Force negative offsets to positive
  for (var i = 0; i < img_divs.length; i++) {
    var div = img_divs[i];
    var ll = parseInt(div.style.left) + hor_push,
      lt = parseInt(div.style.top) + vert_push;
    div.style.left = parseInt(ll) + "px";
    div.style.top = parseInt(lt) + "px";

    lr = ll + parseInt(div.style.width);
    if (max_right < lr) max_right = lr;
    lb = lt + parseInt(div.style.height);
    if (max_bottom < lb) max_bottom = lb;
  }

  return [max_right, max_bottom];
}

var resizing = false;

function resize_images(p_moved_image = false) {

  if (wpi !== null || !resizing) {
    resizing = true;
    //console.log("Resizing");

    for (var i = 0; i < img_divs.length; i++) {
      var div = img_divs[i];
      if (!p_moved_image)
        coord(div);
    }

    // Recenter images if necessary
    /* var [max_right, max_bottom] = */
    if (!p_moved_image) recenter();
    //console.log("End resizing");
    resizing = false;
  }

  var [bodyWidth, bodyHeight] = clientPageDimension();
}

function filename(path) {
  return path.split('\\').pop().split('/').pop();
}

async function reject_wallpaper(div) {
  if (rempic.checked) {
    console.log(`Not Deleting '${div.filename}'`);
  } else {
    //console.log(`Moving '${div.filename}' to the folder '${rejectfolder.value}'`);

    if (!(await fs.exists(rejectfolder.value))) fs.mkdir(rejectfolder.value);
    if (!(await fs.rename(div.filename, rejectfolder.value + '/' + filename(div.filename)))) {
      console.log(`Something went wrong moving ${div.filename} to ${rejectfolder.value}, error: ${fs.last_error}`);
    }
  }

  // Cycle pour retrouver le papier peint suivant
  for (var i = 0; i < img_divs.length; i++) {
    //console.log(`Cycle ${i} pour retrouver le papier peint suivant`);
    await next_wallpaper_infos();
  }

  await update_images();
}

async function update_image(div, name, file, wallpaper_rect) {
  if (darkmode.checked) {
    div.style.backgroundColor = darken_rgb(bgcolor.value);
  } else {
    div.style.backgroundColor = bgcolor.value;
  }

  div.name = name;
  div.filename = file;
  div.wallpaper_rect = wallpaper_rect;

  coord(div);
  //  get jpeg image file in base64 text
  var data = "data:image/jpeg;base64," + (await fs.read_to_base64(file));
  div.children[0].setAttribute('src', data);
  //console.log(`name: ${name}, file: ${file}`);
  div.children[1].innerHTML = name.substr(7);
  div.children[3].innerHTML = "&nbsp;" + file.replace(/^.*[\\/]/, '') + "&nbsp;";
}

async function create_image(name, file, wallpaper_rect) {
  var div = document.createElement('div');
  //  div.style.border = "1px solid black";
  //div.style.backgroundColor = "#0078d4"; // "#0078d4" : main screen background,  "#dadada" : secondart screen background
  div.style.zIndex = 2;
  div.style.position = "absolute";
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";
  div.style.borderRadius = "4px";

  div.classList.add("bg_container");

  var img = document.createElement('img');
  div.appendChild(img);
  img.style.maxWidth = "98%";
  img.style.maxHeight = "98%";

  var m_num = document.createElement('p');
  div.appendChild(m_num);
  m_num.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
  m_num.style.color = "white";
  m_num.style.position = "absolute";
  m_num.style.bottom = "-10px";
  m_num.style.left = "10%";
  m_num.style.width = "22px";
  m_num.style.textAlign = "center";
  m_num.style.border = "1px solid LightGreen";
  m_num.classList.add("switch_vis");
  m_num.style.visibility = "hidden";

  var delb = add_svg_button(div, "", reject_wallpaper, "Reject this background file and cycle until next one for this screen.", del_svg);
  delb.style.position = "absolute";
  delb.style.bottom = "0px";
  delb.style.right = "10%";
  delb.classList.add("switch_vis");
  delb.style.visibility = "hidden";

  var bg_file = document.createElement('p');
  div.appendChild(bg_file);
  bg_file.style.backgroundColor = "rgba(0, 0, 80, 0.9)";
  bg_file.style.color = "white";
  bg_file.style.position = "absolute";
  bg_file.style.bottom = "10%";
  //bg_file.style.width = "90%";
  bg_file.style.textAlign = "center";
  bg_file.style.border = "1px solid yellow";
  bg_file.classList.add("switch_vis");
  bg_file.style.visibility = "hidden";

  await update_image(div, name, file, wallpaper_rect);
  m_num.innerHTML = div.name.substr(7);
  bg_file.innerHTML = "&nbsp;" + div.filename.replace(/^.*[\\/]/, '') + "&nbsp;";
  document.body.appendChild(div);
}

var last_vwidth = 0,
  last_vheight = -1;
var vwidth = 0,
  vheight = 0;
var tbw = app.w,
  tbh = app.h,
  last_tbw, last_tbh;
// Check aspect ratio changes and recompute "virtual screen" dimensions if necessary
// Return true if aspect ratio has not changed else false
async function same_aspect_ratio() {
  var out_x_or_y = 100000;

  // Try to compute virtual screen coordinate if more than 1 monitor with wallpaper
  var vleft = out_x_or_y,
    vtop = out_x_or_y,
    vright = -out_x_or_y,
    vbottom = -out_x_or_y;

  for (var k in wpi) {
    var cwi = wpi[k];
    var rc = cwi["rect"];
    // Does not consider monitor with empty rect
    if (rc.length !== 4) continue;
    if (rc[0] < vleft) vleft = rc[0];
    if (rc[1] < vtop) vtop = rc[1];
    if (rc[2] > vright) vright = rc[2];
    if (rc[3] > vbottom) vbottom = rc[3];
  }

  vwidth = vright - vleft;
  vheight = vbottom - vtop;

  if (last_vwidth !== vwidth || last_vheight !== vheight) {
    var [last_arn, last_ard] = reduce(last_vwidth, last_vheight);
    var [arn, ard] = reduce(vwidth, vheight);

    if (last_arn !== 0 && last_ard != 1) {
      //console.log(`Virtual desktop resolution has changed from (${last_vwidth}, ${last_vheight}) to (${vwidth}, ${vheight})`);
      last_ar = last_vwidth / last_vheight;
      ar = vwidth / vheight;

      var kw = parseFloat(vwidth) / parseFloat(last_vwidth);
      var kh = parseFloat(vheight) / parseFloat(last_vheight);
      var tbw = Math.ceil(kw * parseFloat(app.w)); //+(app.left_border+app.right_border);
      var tbh = Math.ceil(kh * parseFloat(app.h)); //+(app.top_border+app.bottom_border);
      //console.log(`Aspect ratio has changed from ${last_arn}/${last_ard} to ${arn}/${ard} (multiplier coefficients x:${kw} and y:${kh}) and then app size changes from (${app.w},${app.h}) to (${tbw},${tbh}))`);
      await app.set_size(tbw, tbh);
      //console.log(`client size is (${clientPageDimension()})`);
    }

    if (vwidth !== last_vwidth) last_vwidth = vwidth;
    if (vheight !== last_vheight) last_vheight = vheight;

    return false;
  }

  return true;
}

async function history_update(filename) {
  await fs.append("slidehow.history.txt", filename + '\n');
}

var first_move = true,
  showingConfig = false;
var upto_id;
async function update_images() {
  if (showingConfig) return;

  // Check if new wallpaper images have appeared
  wpi = await win.wallpapers_info();
  var n_monitors = Object.keys(wpi).length;

  var moved_image = false;

  if (n_monitors > 0) {
    // 1st pass to compute new virtual screen dimensions and check aspect ratio
    await same_aspect_ratio();

    // 2nd pass to update and display the images scaled to the body dimensions, if necessary
    for (var k in wpi) {
      var cwi = wpi[k];
      var new_filename = cwi["file"];
      var actual_div = get_image_by_name(k);
      if (actual_div == null) continue; // Should not happen ...
      var wp_rc = cwi["rect"];
      // Remove wallpaper thumbnail if its monitor has empty rect
      if (wp_rc.length !== 4) {
        actual_div.remove();
        continue;
      }

      // If same filename for monitor and image k then only check if we have to move the image
      if (actual_div.filename === new_filename) {
        if (move_image(actual_div, wp_rc)) moved_image = true;
      } else {
        // Finally update the image
        //console.log(`Updating [${k.substr(7)}]`);
        await update_image(actual_div, k, new_filename, wp_rc);
        // Update the image history
        await history_update(new_filename);
      }
    }
  }

  resize_images(moved_image);

  // bottom, right side adjustment ...
  if (moved_image || first_move) {
    var biggest_ri = 0,
      biggest_bo = 0;
    for (i = 0; i < img_divs.length; i++) {
      var ri = parseInt(img_divs[i].style.left) + parseInt(img_divs[i].style.width) + app.left_border + app.right_border;
      var bo = parseInt(img_divs[i].style.top) + parseInt(img_divs[i].style.height) + app.top_border + app.bottom_border;
      if (ri > biggest_ri) biggest_ri = ri;
      if (bo > biggest_bo) biggest_bo = bo;
    }

    if (biggest_ri > app.w) new_app_w = biggest_ri;
    else new_app_w = app.w;

    if (biggest_bo > app.h) new_app_h = biggest_bo;
    else new_app_h = app.h;

    first_move = false;
    await app.set_size(new_app_w, new_app_h);
  }

  upto_id = setTimeout(update_images, 200);
}

function tools_visibility(showing) {
  if (showing) document.querySelectorAll('.switch_vis').forEach(function(node) {
    node.style.visibility = 'visible';
  });
  else document.querySelectorAll('.switch_vis').forEach(function(node) {
    node.style.visibility = 'hidden';
  });
}

function on_mouse(event) {
  //console.log(`event type '${event.type}' -- page (${event.pageX},${event.pageY}), client (${event.clientX},${event.clientY}), movement (${event.movementX},${event.movementY})`);
  if (event.type === 'mouseleave') {
    tools_visibility(false);
  } else {
    tools_visibility(true);
  }
}

var toogle_click = true;

function on_click(PointerEvent) {
  //  console.log(`Click (${PointerEvent.pageX},${PointerEvent.pageY})`);
  tools_visibility(toogle_click);
  toogle_click = !toogle_click;
}

function setToolsDisplayMode(on = true) {
  var showtools = document.querySelector('input[name="showtools"]:checked').id;

  switch (showtools) {
    case "toolallways":
      if (on) {
        tools_visibility(true);
      } else {
        tools_visibility(false);
      }
      break;
    case "toolonclick":
      if (on) {
        document.addEventListener("click", on_click);
        toogle_click = true;
        on_click();
      } else {
        document.removeEventListener("click", on_click);
      }
      break;
    case "toolonover":
    default:
      if (on) {
        document.addEventListener("mouseenter", on_mouse);
        document.addEventListener("mouseover", on_mouse);
        document.addEventListener("mouseleave", on_mouse);
        tools_visibility(true);
      } else {
        document.removeEventListener("mouseenter", on_mouse);
        document.removeEventListener("mouseover", on_mouse);
        document.removeEventListener("mouseleave", on_mouse);
      }
      break;
  }
}

function setImgEvents(add = true) {

  setToolsDisplayMode(add);

  if (add) {
    document.body.addEventListener("resize", resize_images);
    document.addEventListener("keyup", exit_on_esc);
  } else {
    tools_visibility(false);
    document.body.removeEventListener("resize", resize_images);
    document.removeEventListener("keyup", exit_on_esc);
  }
}

function add_svg_button(par, initStyle, click, title, svg) {
  var b = document.createElement('button');
  b.style = initStyle;
  b.addEventListener('mouseover', () => {
    b.style.filter = 'brightness(1.5)';
  });
  b.addEventListener('mouseleave', () => {
    b.style.filter = 'brightness(1.0)';
  });

  b.addEventListener('click', () => {
    click(par);
  }, true);

  b.title = title;
  //b.style.opacity = 0.5;
  b.style.background = "none";
  b.style.border = "none";
  b.innerHTML = '<svg width="24" height="24">' + svg + '<\/svg>';
  par.appendChild(b);
  return b;
}

function do_hide() {
  app.hide();
}

function do_reload() {
  window.location.reload();
}

async function set_img_divs(on = true) {
  if (on) {
    await app.set_size(250, 200, 1);
    upto_id = setTimeout(update_images, 200);
  } else {
    clearTimeout(upto_id);
  }

  setImgEvents(on);
}

var bc;

function clean_exit() {
  bc.close();
  app.exit();
}

function exit_on_esc() {
  if (event.keyCode === 27) clean_exit();
}

async function runConfig() {
  setImgEvents(false);
  await showConfig();
}

async function create_images() {
  wpi = await win.wallpapers_info();
  var n_monitors = Object.keys(wpi).length;

  if (n_monitors > 0) {
    // 1st pass to compute virtual screen dimensions and check aspect ratio
    await same_aspect_ratio();

    // 2nd pass to create and display the images scaled to the body dimensions
    for (var k in wpi) {
      var cwi = wpi[k];
      var wp_rc = cwi["rect"];
      // Does not create wallpaper thumbnail if its monitor has an empty rect
      if (wp_rc.length !== 4) continue;
      var file = cwi["file"];
      await create_image(k, file, wp_rc);
    }
  }

  var tool_div = document.createElement('div');
  tool_div.style.zIndex = 8;
  img_divs = document.getElementsByClassName('bg_container');
  tool_div.style.position = "absolute";
  tool_div.style.left = "40px";
  tool_div.style.top = "10px";
  tool_div.classList.add("switch_vis");
  tool_div.style.visibility = "hidden";

  tool_div.classList.add("switch_vis");
  add_svg_button(tool_div, "20px", runConfig, "Configuration", cnf_svg);
  add_svg_button(tool_div, "140px", next_wallpaper_infos, "Next background", next_svg);
  add_svg_button(tool_div, "260px", do_hide, "Hide the app so that it only logs the background filenames\nYou may bring it back by double clicking on its icon. ", hidden_svg);
  add_svg_button(tool_div, "380px", do_reload, "Size adjustment", size_svg);
  document.body.appendChild(tool_div);
  set_img_divs();
}

function remove_images() {
  if (wpi !== null) {
    for (var i = 0; i < img_divs.length; i++) {
      var div = img_divs[i];
      div.remove();
    }
  }
}

function get_image_by_name(name) {
  for (var i in img_divs) {
    if (img_divs[i].name === name) {
      return img_divs[i];
    }
  }

  return null;
}

async function loadConfig() {
  var l_dmod = localStorage.getItem("darkmode");
  if (l_dmod === null || l_dmod === "false") darkmode.checked = false;
  else darkmode.checked = true;

  var l_imarg = localStorage.getItem("img_margin");
  if (l_imarg === null) img_margin.value = 2;
  else {
    if (l_imarg < 1) img_margin.value = 1;
    else if (l_imarg > 20) img_margin.value = 20;
    else img_margin.value = l_imarg;
  }

  var l_pege = localStorage.getItem("persist_geom");
  if (l_pege === null || l_pege === "true") persist_geom.checked = true;
  else persist_geom.checked = false;
  setPersGeo();

  // Should be one of toolallways, toolonclick or toolonover (default)
  var l_shtoo = localStorage.getItem("showtools");
  if (l_shtoo === null) document.getElementById("toolonover").checked = true;
  else document.getElementById(l_shtoo).checked = true;

  var l_wbgco = localStorage.getItem("winbgcolor");
  if (l_wbgco === null) wbgcolor.value = "#ffffff";
  else wbgcolor.value = l_wbgco;

  var l_bgco = localStorage.getItem("bgcolor");
  if (l_bgco === null) bgcolor.value = "#0078d4";
  else bgcolor.value = l_bgco;

  var l_rejmet = localStorage.getItem("rejectmethod");
  if (l_rejmet === null) l_rejmet = "move";
  setRejMet(l_rejmet);


  var l_fld = localStorage.getItem("rejectfolder");
  if (l_fld === null) {
    var l_usrp = await env.get("USERPROFILE");
    if (l_usrp === "No value found for USERPROFILE") l_usrp = "C:\\Users\\Public"; // Should not happen ...
    rejectfolder.value = l_usrp + "\\Pictures\\RejectedWallpapers";
  } else rejectfolder.value = l_fld;

  console.log(`loadConfig -- darkmode: ${darkmode.checked}, img_margin: ${img_margin.value}, showtools: ${l_shtoo}, wbgcolor: ${wbgcolor.value}, bgcolor: ${bgcolor.value}, l_rejmet: ${l_rejmet}, rejectfolder: ${rejectfolder.value}`);
}

async function saveConfig() {
  if (darkmode.checked) localStorage.setItem("darkmode", "true");
  else localStorage.setItem("darkmode", "false");

  if (img_margin.value < 1) localStorage.setItem("img_margin", 1);
  else if (img_margin.value > 20) localStorage.setItem("img_margin", 20);
  else localStorage.setItem("img_margin", img_margin.value);

  if (persist_geom.checked) localStorage.setItem("persist_geom", "true");
  else localStorage.setItem("persist_geom", "false");

  var l_shtoo = document.querySelector('input[name="showtools"]:checked');
  localStorage.setItem("showtools", l_shtoo.id);

  localStorage.setItem("winbgcolor", wbgcolor.value);
  localStorage.setItem("bgcolor", bgcolor.value);

  localStorage.setItem("rejectfolder", rejectfolder.value);

  var l_rejmet;
  if (rempic.checked) l_rejmet = "delete";
  else l_rejmet = "move";
  localStorage.setItem("rejectmethod", l_rejmet);

  console.log(`saveConfig -- darkmode: ${darkmode.checked}, img_margin: ${img_margin.value}, showtools: ${l_shtoo.id}, wbgcolor: ${wbgcolor.value}, bgcolor: ${bgcolor.value}, rejectmethod: ${l_rejmet}, rejectfolder: ${rejectfolder.value}`);
  localStorage.clear();
}

if (typeof app.sysname !== "undefined") {
  app.set_icon("app.ico");
  app.set_title(document.title);
  window.addEventListener("load", do_load);

  async function do_load() {
    // Prevent the app to load multiple times
    bc = new BroadcastChannel(document.title);
    bc.postMessage(document.title);
    bc.onmessage = (event) => {
      if (event.data === document.title) {
        console.log(`app.state: ${app.state}`);
        (async () => {
          //          if (app.state !== "normal") {
          await app.restore();
          //          }
          await app.bring_to_top();
          //await app.show();
          bc.postMessage("already_loaded " + app.window_id);
        })();
      } else if (event.data.startsWith("already_loaded")) {
        (async () => {
          var win_id = event.data.substr(15);
          await app.bring_to_top(win_id);
          app.exit();
        })();
      }
    }

    document.addEventListener("keyup", exit_on_esc);


    // Only run under Windows
    if (app.sysname === "Windows") {
      await app.set_size(250, 200, 1);
      await app.show();
      loadConfig();
      await create_images();
      setDarkMode(darkmode.checked);
    } else(async () => {
      await app.set_size(300, 120);
      await app.set_size(300, 120, 3);
      await app.center();
      document.body.innerHTML = "<center>Sorry, this app only run under Windows<br /><br /><button style='width:6em' onclick='app.exit()'>  OK  </button></center>";
      await app.show();
    })();
  }
}