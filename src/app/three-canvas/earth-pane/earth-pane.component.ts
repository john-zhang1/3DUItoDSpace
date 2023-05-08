import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ItemResourceData, ResourceData } from '../three-models';
import * as d3 from 'd3';

@Component({
  selector: 'ds-earth-pane',
  templateUrl: './earth-pane.component.html',
  styleUrls: ['./earth-pane.component.scss']
})
export class EarthPaneComponent implements OnInit, AfterViewInit {

  active = 1;

  @Input() paneInfo = {} as ResourceData;

  ngOnInit(): void {}
  ngAfterViewInit(): void {}

  private views = [
    {"Views": "2014", "Total": 220},
    {"Views": "2015", "Total": 320},
    {"Views": "2016", "Total": 420},
    {"Views": "2017", "Total": 520},
    {"Views": "2018", "Total": 620},
    {"Views": "2019", "Total": 720},
    {"Views": "2020", "Total": 910},
    {"Views": "2021", "Total": 985},
    {"Views": "2022", "Total": 1100},
    {"Views": "2023", "Total": 620},
  ];

  private downloads = [
    {"Downloads": "2014", "Total": 320},
    {"Downloads": "2015", "Total": 420},
    {"Downloads": "2016", "Total": 520},
    {"Downloads": "2017", "Total": 620},
    {"Downloads": "2018", "Total": 720},
    {"Downloads": "2019", "Total": 820},
    {"Downloads": "2020", "Total": 910},
    {"Downloads": "2021", "Total": 985},
    {"Downloads": "2022", "Total": 1206},
    {"Downloads": "2023", "Total": 621},
  ];

  public svg_views: any;
  public svg_downloads: any;

public createViewBar() {
  const margin = {top: 20, right: 20, bottom: 40, left: 40};
  const width = 220 - margin.left - margin.right;
  const height = 220 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
   let svg = d3.select("svg#id_view")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    let x = d3.scaleBand()
      .range([ 0, width ])
      .domain(this.views.map(function(d) { return d.Views; }))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
  
    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, 1500])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
  
    // Bars
    svg.selectAll("bars")
      .data(this.views)
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.Views) as number; })
      .attr("y", function(d) { return y(d.Total); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.Total); })
      .attr("fill", "#d04a35")

    svg.append("text")
      .attr("transform", "translate(" + (width/2) + " ," + 20 + ")")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#d04a35")
      .text("Views");
  }

  public createDownloadBar() {
    const margin = {top: 20, right: 20, bottom: 40, left: 40};
    const width = 220 - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
     let svg = d3.select("svg#id_download")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      // X axis
      let x = d3.scaleBand()
        .range([ 0, width ])
        .domain(this.views.map(function(d) { return d.Views; }))
        .padding(0.2);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
      // Add Y axis
      let y = d3.scaleLinear()
        .domain([0, 1500])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));
    
      // Bars
      svg.selectAll("bars")
        .data(this.downloads)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.Downloads) as number; })
        .attr("y", function(d) { return y(d.Total); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Total); })
        .attr("fill", "#69b3a2")
  
      svg.append("text")
        .attr("transform", "translate(" + (width/2) + " ," + 20 + ")")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#69b3a2")
        .text("Downloads");
    }
}
