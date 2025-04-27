#!/bin/bash

# 필요한 디렉토리 생성
mkdir -p public/icons

# 기본 아이콘 생성 (16x16, 32x32, 48x48, 64x64)
convert -size 16x16 xc:white -fill '#4299e1' -draw 'circle 8,8 8,0' public/favicon-16x16.png
convert -size 32x32 xc:white -fill '#4299e1' -draw 'circle 16,16 16,0' public/favicon-32x32.png
convert -size 48x48 xc:white -fill '#4299e1' -draw 'circle 24,24 24,0' public/favicon-48x48.png
convert -size 64x64 xc:white -fill '#4299e1' -draw 'circle 32,32 32,0' public/favicon-64x64.png

# ICO 파일 생성
convert public/favicon-16x16.png public/favicon-32x32.png public/favicon-48x48.png public/favicon-64x64.png public/favicon.ico

# Apple Touch Icon 생성
convert -size 180x180 xc:white -fill '#4299e1' -draw 'circle 90,90 90,0' public/apple-touch-icon.png

# Android Chrome Icons 생성
convert -size 192x192 xc:white -fill '#4299e1' -draw 'circle 96,96 96,0' public/android-chrome-192x192.png
convert -size 512x512 xc:white -fill '#4299e1' -draw 'circle 256,256 256,0' public/android-chrome-512x512.png

echo "Favicon files generated successfully!" 