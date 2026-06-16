import { writeFileSync } from 'fs'

function svgIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bg)"/>
  <text x="${size/2}" y="${size/2}" text-anchor="middle" dominant-baseline="central"
    font-family="system-ui,PingFang SC,Microsoft YaHei,sans-serif"
    font-weight="bold" font-size="${size * 0.38}" fill="white">来</text>
</svg>`
}

writeFileSync('public/icon-192.svg', svgIcon(192))
writeFileSync('public/icon-512.svg', svgIcon(512))
writeFileSync('public/favicon.svg', svgIcon(32))
console.log('✅ Icons generated')
