# Visualizing United States Geological Survey Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

The United States Geological Survey(USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes via APIs.

Visualize USGS earthquake data in a meaningful way. Being able to visualize the data will allow for the better education of the public and other government organizations on issues facing our planet.

### Technologies

1. **Leaflet**
2. **HTML**
3. **Javascript**
4. **CSS**
5. **D3** 
6. URL: [https://evansvillewy.github.io/leaflet-challenge/](https://evansvillewy.github.io/leaflet-challenge/) 


## Visualizations

### Level 1: Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

Visualize an earthquake data set from USGS.

1. **The data set was pulled from the USGS API**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

   ![4-JSON](Images/4-JSON.png)

2. **Imported & Visualized the Data**

   Created a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

   * Includes popups that provide additional information about the earthquake when a marker is clicked.

   * The legend provides context for the map data.

- - -

### Level 2: More Data

![5-Advanced](Images/5-Advanced.png)

A plot of a secondary data set on the map illustrates the relationship between tectonic plates and seismic activity. 

* There are a number of base maps to choose from:
	* Satellite
	* Grayscale
	* Outdoors
	
* There are well as two different overlays that can be turned on and off independently
	* Fault Lines
	* Earthquakes

* There are layer controls for the map.


