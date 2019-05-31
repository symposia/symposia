import React, { Component } from 'react';
import {InteractiveForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';
import { withState } from 'recompose';


class ConceptGraph extends Component {
    state = {
        graphHeight: null
    }

    selectAction(node) {
        let links = this.props.data.links;
        let concepts = [node.id];
        Object.values(links).forEach(link => {
            if (link.source === node.id) {
                concepts.push(link.target);
            } else if (link.target === node.id) {
                concepts.push(link.source);
            }
        })
        this.props.setConcepts(concepts);
    }

    deSelectAction(node) {
        this.props.setConcepts([]);
    }

    getColor(type) {
        if (type === "wiki") {
            return "red"
        } else if (type === "loc") {
            return "blue"
        } else if (type === "person") {
            return "green"
        } else {
            return "purple"
        }
    }

    // componentWillMount() {
    //     let columnGraph = document.getElementsByClassName("column-graph")
    //     console.log(columnGraph)
    // }

    render() {

        if (!this.props.data) { 
            console.log('broken')
            return null; 
        }
        // const columnGraph = document.getElementsByClassName("column-graph")
        // if (columnGraph[0]) {
        //     console.log(columnGraph[0].offsetHeight)
        // }

        const ids = [
            'first-node',
            'second-node',
            'third-node',
            'fourth-node',
            'fifth-node',
            'sixth-node',
            'seventh-node',
            'eighth-node',
            'ninth-node',
            'tenth-node',
          ];

          const tenChildren = [
            <ForceGraphNode node={{ id: 'first-node', radius: 5 }} fill="#11939A" />,
            <ForceGraphNode node={{ id: 'second-node', radius: 10 }} fill="#47d3d9" />,
            <ForceGraphNode node={{ id: 'third-node', radius: 15 }} fill="#11939A" />,
            <ForceGraphNode node={{ id: 'fourth-node', radius: 15 }} fill="#47d3d9" />,
            <ForceGraphNode node={{ id: 'fifth-node', radius: 5 }} fill="#11939A" />,
            <ForceGraphNode node={{ id: 'sixth-node', radius: 15 }} fill="#47d3d9" />,
            <ForceGraphNode node={{ id: 'seventh-node', radius: 10 }} fill="#11939A" />,
            <ForceGraphNode node={{ id: 'eighth-node', radius: 5 }} fill="#47d3d9" />,
            <ForceGraphNode node={{ id: 'ninth-node', radius: 5 }} fill="#11939A" />,
            <ForceGraphNode node={{ id: 'tenth-node', radius: 5 }} fill="#47d3d9" />,
            <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />,
            <ForceGraphLink link={{ source: 'third-node', target: 'second-node' }} />,
            <ForceGraphLink link={{ source: 'third-node', target: 'fourth-node' }} />,
            <ForceGraphLink link={{ source: 'fifth-node', target: 'fourth-node' }} />,
            <ForceGraphLink link={{ source: 'fifth-node', target: 'fourth-node' }} />,
            <ForceGraphLink link={{ source: 'sixth-node', target: 'fourth-node' }} />,
            <ForceGraphLink link={{ source: 'seventh-node', target: 'fourth-node' }} />,
            <ForceGraphLink link={{ source: 'eighth-node', target: 'fourth-node' }} />,
            <ForceGraphLink link={{ source: 'ninth-node', target: 'tenth-node' }} />,
            <ForceGraphLink link={{ source: 'tenth-node', target: 'fifth-node' }} />,
        ]

        // const ManagedForceGraph = withState('selection', 'updateSelection', null) (
        //     ({ selection, updateSelection }) => (
        //       <div>
        //         <div style={{position: 'absolute', top: '10em', left: '1em'}}>
        //             <button type="button" onClick={(ev, node) => {
        //                 this.deSelectAction(node);
        //                 updateSelection(null);
        //                 console.log(selection);
        //                 // console.log('trying to clear selection');
        //                 // updateSelection(null);
        //             }}>
        //             {'Clear selection'}
        //           </button>
        //         </div>
        //         <InteractiveForceGraph
        //             selectedNode={selection}
        //             highlightDependencies
        //             zoom
        //             zoomOptions = {{
        //                 minScale: 10
        //             }}
        //             // labelAttr={fontSize:20}
        //             showLabels
        //             onSelectNode={(ev, node) => {
        //                 console.log(selection);
        //                 this.selectAction(node);
        //             }}
        //             onDeselectNode={(ev, node) => {
        //                 console.log(selection);
        //                 this.deSelectAction(node);
        //             }}
        //             simulationOptions={{
        //                 // height: {},
        //                 // width: 1500,
        //                 strength: {
        //                 //   x: ({ radius }) => 20 / radius,
        //                 //   y: ({ radius }) => 20 / radius,
        //                     collide: 95,
        //                     charge: 100
        //                 }
        //             }}
        //             >
        //             {this.props.data.nodes.map(node => (
        //             <ForceGraphNode
        //                 key={node.id}
        //                 fill={this.getColor(node.type)}
        //                 node={{ ...node, radius: 7}}
        //             />
        //             ))}
        //             {this.props.data.links.map(link => (
        //             <ForceGraphLink
        //                 key={`${link.source}=>${link.target}`}
        //                 link={{ ...link, value: 10 }}
        //             />
        //             ))}
        //         </InteractiveForceGraph>
        //         {/* <InteractiveForceGraph
        //           selectedNode={selection}
        //           onSelectNode={(ev, newValue) => {
        //             console.log(newValue);
        //             updateSelection(newValue);
        //             console.log(selection);
        //           }}
        //           onDeselectNode={(ev, newValue) => {
        //             console.log(newValue);
        //             updateSelection(null);
        //             console.log(selection);
        //           }}
        //         >
        //           {tenChildren}
        //         </InteractiveForceGraph> */}
        //       </div>
        //      )
        // );

        // return <ManagedForceGraph />
    
        
        return(
            // <InteractiveForceGraph
            //     simulationOptions={{ height: 300, width: 300 }}
            //     labelAttr="label"
            //     onSelectNode={(node) => console.log(node)}
            //     highlightDependencies
            //     >
            //     <ForceGraphNode node={{ id: 'first-node', label: 'First node' }} fill="red" />
            //     <ForceGraphNode node={{ id: 'second-node', label: 'Second node' }} fill="blue" />
            //     <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />
            // </InteractiveForceGraph>

            <InteractiveForceGraph
                highlightDependencies
                zoom
                zoomOptions= {{
                    minScale: 10,
                    maxScale: 3
                }}
                // labelAttr={fontSize:20}
                showLabels
                onSelectNode={(ev, node) => this.selectAction(node)}
                onDeselectNode={(ev, node) => this.deSelectAction(node)}
                simulationOptions={{
                    height: window.innerHeight,
                    // width: 1500,
                    radiusMargin: 7,
                    strength: {
                    //   x: ({ radius }) => 20 / radius,
                    //   y: ({ radius }) => 50 / radius,
                      collide: -50,
                      charge: 300
                    }
                }}
                >
                {this.props.data.nodes.map(node => (
                <ForceGraphNode
                    key={node.id}
                    fill={this.getColor(node.type)}
                    node={{ ...node, radius: 7}}
                />
                ))}
                {this.props.data.links.map(link => (
                <ForceGraphLink
                    key={`${link.source}=>${link.target}`}
                    link={{ ...link, value: 2}}
                />
                ))}
            </InteractiveForceGraph>
        )
    }
}

export default ConceptGraph;
