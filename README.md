# Smart Village Map

## Introduction
As the [IEEE Smart Village](https://smartvillage.ieee.org/) committee is tracking and supporting the advancement of several micro-grid projects around the world,
this is a map to showcase those projects within the context of existing energy infrastructure.

![](https://github.com/OhioAdam/RemoteMonitorMap/blob/master/Img/smart_village_map.png)

# Map Data
Taking inspiration from the [Open Infrastructure Map](https://openinframap.org/#4/31.99/-40.91/Power-Telecoms), the goal of this map is to 
feature up-to-date information on the existing infrastructure, as well as additional geolocated datasets on specific micro-grid sites.
This is primarily using the [power=lines](https://wiki.openstreetmap.org/wiki/Power) data from OSM at the moment (getting data via the [overpass turbo](http://overpass-turbo.eu/) site). This data by itself doesn't show at full zoom level, so it needs to be run through [Tippecanoe](https://www.mapbox.com/help/adjust-tileset-zoom-extent/), and then loaded into Mapbox.

The project sites are updated in a Google Sheets file, and then converted to geoJSON using [csv2geoJSON](https://github.com/mapbox/csv2geojson)

## Updating the Project Sites
The map pulls in the data for each project site through the `projects.geojson` file that exists in the latest Master branch of this project. This file is produced from the "Smart Village Project Locations" [Google Sheet](https://docs.google.com/spreadsheets/d/1XMTSGbI8A6yrwcfD-uBw8_eZn62BZrWo0-xXFgGbB2E/edit?usp=sharing). Users will need access to the Foundant ["Grant Interface"](https://www.grantinterface.com/Home/Logon?&urlKey=ieeesmartvillage) in order to find the right data to update the map with. 

The following values can be cound in the respective places:
| Value            | Location                                   |
|------------------|--------------------------------------------|
| Sponsor          | PSA                                        |
| Long/Lat         | "LOI" File in FOundant                     |

Once the Google Sheet is updated, complete the following steps to convert it to a `.geojson` file.

1. Select Columns `A`-`O`, including the column headers, and every row you want to include on the map.
1. Paste in Excel, and save as a CSV file.
1. use [csv2geoJSON](https://github.com/mapbox/csv2geojson) to convert the `csv` into a `geojson` file.
1. Replace the existing `projects.geojson` file in this repo with that one.

The map will automatically load in this new data next time it loads. Changes might take a few minutes to go into effect.


# Mapping Tools
The power line data is pulled from OSM using [this site](http://overpass-turbo.eu/), and then uploaded into [Mapbox](https://www.mapbox.com/) Studio as a set of tilesets.
These tilesets are combined into the following Mapbox Style: mapbox://styles/earthadam/cjf0rz4yj6dj32sliavy2l0dg

## Adding Power Line Data to OSM
In order to edit OSM data and add map features, use a client such as JOSM or iD. Once the data is sent back to the OSM database, revert to the Overpass API to re-download that section into Mapbox. Long-term, it was suggested to make a cron job to do this using the [overpass query](https://github.com/perliedman/query-overpass) on a daily basis or something like that.

# Goals
1. Integrate this into the [IEEE Smart Village](http://ieee-smart-village.org/) website.
2. Add data visualizations like [these](http://kw4h.org/dashboard/db/filibaba?refresh=1m&orgId=2) for remote monitoring 
    1. Considering the use of [D3.js](https://d3js.org/) instead of [Grafana](https://grafana.com/) (used in kw4h Dashboard).
3. Determine best methods for editing and adding new power lines into the OSM power layers ([iD?](http://ideditor.com/), [JOSM?](https://josm.openstreetmap.org/))
4. Add telecom data as necessary
5. Determine ways of highlighting areas of need (lack of infrastructure)
