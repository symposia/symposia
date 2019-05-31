import React, { Component } from 'react';
import {InteractiveForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';

class ConceptGraph extends Component {

    selectAction(node) {
        let links = this.props.data.links;
        let concepts = [node.id];
        Object.values(links).forEach(link => {
            if (link.source === node.id) {
                concepts.push(link.target);
            }
        })
        console.log(concepts);
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


    render() {

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
                // labelAttr={fontSize:20}
                showLabels
                onSelectNode={(ev, node) => this.selectAction(node)}
                onDeselectNode={(ev, node) => this.deSelectAction(node)}
                simulationOptions={{
                    // height: 800,
                    // width: 1500,
                    strength: {
                      x: ({ radius }) => 10 / radius,
                      y: ({ radius }) => 20 / radius,
                      collide: 80
                    }
                }}
                >
                {this.props.data.nodes.map(node => (
                <ForceGraphNode
                    key={node.id}
                    fill={this.getColor(node.type)}
                    node={{ ...node, radius: 5}}
                />
                ))}
                {this.props.data.links.map(link => (
                <ForceGraphLink
                    key={`${link.source}=>${link.target}`}
                    link={{ ...link, value: 10 }}
                />
                ))}
            </InteractiveForceGraph>
        )
    }
}

export default ConceptGraph;
