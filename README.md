# Cinema Finder App - Bug Fix Solution

## Overview
This project contains fixes for a cinema mapping application as part of a Forage job simulation. The main bug resolved was the inability to click on cinema markers to view information and snap the map to location.

## Bug Fixed
- **Problem**: Clicking cinema markers did nothing
- **Root Cause**: Missing event handlers and state management
- **Solution**: Implemented click handlers and cinema info display

## Technologies
- React.js, Material-UI, Leaflet/MapLibre maps

## How to Run
```bash
yarn install
yarn start
