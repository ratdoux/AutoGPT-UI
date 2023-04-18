import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BubbleForceDirectedTree = ({ data, width, height }) => {
  const ref = useRef();

  const drag = (simulation) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  };

  useEffect(() => {
    if (data) {
      const chart = () => {
        const root = d3.hierarchy(data);
        const links = root.links();
        const nodes = root.descendants();


        const simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id).distance(30).strength(1))
          .force("charge", d3.forceManyBody().strength((d) => d.expanded ? -200 : -50))
          .force("x", d3.forceX())
          .force("y", d3.forceY());

        const svg = d3.select(ref.current)
          .attr("viewBox", [-width / 2, -height / 2, width, height]);

        const link = svg.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line");

        const node = svg
          .append('g')
          .selectAll('g')
          .data(nodes)
          .join('g')
          .attr('cursor', 'pointer')
          .call(drag(simulation));

        node
          .append('circle')
          .attr('fill', (d) => (d.children ? null : '#000'))
          .attr('stroke', (d) => (d.children ? null : '#fff'))
          .attr('r', 3.5)
          .on('click', (event, d) => {
            d.expanded = !d.expanded;
            if (d.expanded) {
              d.fx = d.x;
              d.fy = d.y;
            } else {
              d.fx = null;
              d.fy = null;
            }
            d3.select(event.currentTarget)
              .transition()
              .duration(250)
              .attr('r', d.expanded ? 20 : 3.5);
            simulation.force("charge", d3.forceManyBody().strength((d) => d.expanded ? -200 : -50)).alphaTarget(0.3).restart();
          });


        // Add text as children of the <g> elements
        node
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')
          .attr('dy', '1.5em')
          .text((d) => d.data.name)
          .attr('opacity', 0)
          .attr('pointer-events', 'none');

        // Double-click event listener to expand/collapse the nodes
        node.on('dblclick', (event, d) => {
          d.expanded = !d.expanded;
          d3.select(event.currentTarget)
            .select('text')
            .transition()
            .duration(250)
            .attr('opacity', d.expanded ? 1 : 0);
        });

        node.append("title")
          .text(d => d.data.name);

        simulation.on("tick", () => {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

          node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr('transform', (d) => `translate(${d.x}, ${d.y})`);
        });
        return svg.node();
      }

      chart();
    }
  }, [data, width, height]);

  return (
    <svg
      ref={ref}
      style={{ minWidth: '600px', backgroundColor: 'white', border: '1px solid black' }}
    ></svg>
  );
};

export default BubbleForceDirectedTree;
