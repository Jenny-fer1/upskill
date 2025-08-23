const canvas = document.getElementById('barChart');
const ctx = canvas.getContext('2d');

const data = [
  { day: "Sun", watched: 5 },
  { day: "Mon", watched: 2 },
  { day: "Tue", watched: 3 },
  { day: "Wed", watched: 4 },
  { day: "Thu", watched: 5 },
  { day: "Fri", watched: 7 },
  { day: "Sat", watched: 14 } // max
];

const chartHeight = canvas.height - 40;
const chartWidth = canvas.width;
const paddingLeft = 40;
const paddingBottom = 30;
const barWidth = 26;
const maxWatched = Math.max(...data.map(d => d.watched));
const barGap = (chartWidth - paddingLeft) / data.length;

ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw X axis line
ctx.strokeStyle = "#dedede";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(paddingLeft - 10, chartHeight);
ctx.lineTo(chartWidth, chartHeight);
ctx.stroke();

// Draw X axis labels & bars
ctx.font = "14px Arial";
ctx.fillStyle = "#dedede";
ctx.textBaseline = "top";

data.forEach((entry, i) => {
  // Label
  ctx.fillText(entry.day, paddingLeft + barGap * i + (barGap - barWidth) / 2, chartHeight + 6);

  // Bar height proportional to watched number
  const barHeight = (entry.watched / maxWatched) * (chartHeight - 20);

  // Bar color (pink for highest, else default)
  ctx.fillStyle = entry.watched === maxWatched ? "#ff2954" : "#af183f";

  // Draw rounded bar
  const x = paddingLeft + barGap * i + (barGap - barWidth) / 2;
  const y = chartHeight - barHeight;

  roundRect(ctx, x, y, barWidth, barHeight, 6);
  ctx.fill();

  // Tooltip hover region (optional for improvements)
});

// Helper: rounded rectangle
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
