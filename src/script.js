let trashItems = [];
let bins = [];
let binLabels = ["일반쓰레기", "음식물쓰레기", "비닐류", "캔 및 병류", "플라스틱", "건전지"];
let binImages = [];
let trashImages = {};
let selectedTrash = null;

function preload() {
  // โหลดภาพถังขยะแต่ละประเภท
  for (let i = 0; i < binLabels.length; i++) {
    binImages[i] = loadImage(`images/bin_${i}.png`);
  }
  
  // โหลดภาพขยะ
  trashImages["일반쓰레기"] = loadImage("images/general.jpg");
  trashImages["음식물쓰레기"] = loadImage("images/food.jpg");
  trashImages["비닐류"] = loadImage("images/vinyl.jpeg");
  trashImages["캔 및 병류"] = loadImage("images/can_bottle.jpeg");
  trashImages["플라스틱"] = loadImage("images/plastic.jpeg");
  trashImages["건전지"] = loadImage("images/battery.png");
}

function setup() {
  createCanvas(800, 600);

  // ตั้งค่าถังขยะ
  let binX = 100;
  for (let i = 0; i < 6; i++) {
    bins.push({
      x: binX,
      y: height - 150,
      label: binLabels[i],
      img: binImages[i],
      width: 100,
      height: 100
    });
    binX += 120;
  }

  // ตั้งค่าขยะที่สามารถลากได้
  trashItems.push(createTrash(50, 50, "일반쓰레기"));
  trashItems.push(createTrash(200, 50, "음식물쓰레기"));
  trashItems.push(createTrash(350, 50, "비닐류"));
  trashItems.push(createTrash(500, 50, "캔 및 병류"));
  trashItems.push(createTrash(650, 50, "플라스틱"));
  trashItems.push(createTrash(750, 50, "건전지"));
}

function draw() {
  background(220);

  // วาดถังขยะพร้อมรูปภาพ
  for (let bin of bins) {
    image(bin.img, bin.x, bin.y, bin.width, bin.height);
  }

  // วาดขยะพร้อมรูปภาพ
  for (let trash of trashItems) {
    if (trash === selectedTrash) {
      fill(200, 0, 0);
    }
    image(trashImages[trash.label], trash.x, trash.y, trash.size, trash.size);
  }
}

// ฟังก์ชันสร้างขยะ
function createTrash(x, y, label) {
  return { x: x, y: y, label: label, size: 50 };
}

function mousePressed() {
  for (let trash of trashItems) {
    let d = dist(mouseX, mouseY, trash.x, trash.y);
    if (d < trash.size / 2) {
      selectedTrash = trash;
      break;
    }
  }
}

function mouseDragged() {
  if (selectedTrash) {
    selectedTrash.x = mouseX;
    selectedTrash.y = mouseY;
  }
}

function mouseReleased() {
  if (selectedTrash) {
    for (let bin of bins) {
      if (
        selectedTrash.x > bin.x &&
        selectedTrash.x < bin.x + bin.width &&
        selectedTrash.y > bin.y &&
        selectedTrash.y < bin.y + bin.height
      ) {
        if (selectedTrash.label === bin.label) {
          alert("ถูกต้อง!");
        } else {
          alert("ลองใหม่!");
        }
      }
    }
    selectedTrash = null;
  }
}
