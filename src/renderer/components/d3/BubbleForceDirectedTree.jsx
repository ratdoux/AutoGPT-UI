import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BubbleForceDirectedTree = ({ data, width, height }) => {
  const ref = useRef();
  const prevDataRef = useRef();

  const zoomed = (event, graph, simulation) => {
    const { transform } = event;
    graph.attr('transform', transform);

    if (transform.k < forceThreshold) {
      simulation.force("link").strength(0);
      simulation.force("charge").strength(0);
    } else {
      simulation.force("link").strength(1);
      simulation.force("charge").strength((d) => (d.expanded ? -200 : -50));
    }

    simulation.alphaTarget(0.3).restart();
  };

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

  const forceThreshold = 0.3;


  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(prevDataRef.current)) {
      prevDataRef.current = data;
      const chart = () => { 
        const root = d3.hierarchy(data);
        const links = root.links();
        const nodes = root.descendants();

        const simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id).distance(30).strength(1))
          .force("charge", d3.forceManyBody().strength((d) => (d.expanded ? -200 : -50)))
          .force("x", d3.forceX())
          .force("y", d3.forceY());

        const svg = d3.select(ref.current)
          .attr("viewBox", [-width / 2, -height / 2, width, height]);

        const graph = svg.append("g");

        const link = graph.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line");

        const node = graph.append("g")
          .attr("stroke", "#000")
          .attr("stroke-width", 1.5)
          .selectAll("g")
          .data(nodes)
          .join("g")
          .attr("cursor", "pointer")
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
              .attr('r', d.expanded ? 30 : 3.5);
            simulation.force("charge",
              d3.forceManyBody().strength((d) => d.expanded ? -200 : -50)).alphaTarget(0.3).restart();

            d3.select(event.currentTarget.parentNode).select('text')
              .attr('display', d.expanded ? 'block' : 'none');
          });

        node
          .append("text")
          .text(d => d.data.name)
          .attr("font-size", "9px")
          .attr("stroke", "#fff")
          .attr("text-anchor", "middle")
          .attr("dy", ".35em")
          .attr('fill', d => d.expanded ? '#fff' : 'none')
          .attr('display', 'none');

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

        svg.call(
          d3.zoom()
            .scaleExtent([0.1, 4])
            .on("zoom", (e) => zoomed(e, graph, simulation))
        );
        return svg.node();
      };

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