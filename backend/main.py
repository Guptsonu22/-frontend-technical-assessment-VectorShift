"""
VectorShift Pipeline Backend — FastAPI
Parses pipelines, counts nodes/edges, and detects DAGs using NetworkX.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict, List
import networkx as nx


app = FastAPI(title="VectorShift Pipeline API")

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    """
    Analyse a React Flow pipeline.

    Returns:
        num_nodes: total number of nodes
        num_edges: total number of edges
        is_dag:    True if the graph is a directed acyclic graph
    """
    nodes = pipeline.nodes
    edges = pipeline.edges

    num_nodes = len(nodes)
    num_edges = len(edges)

    # Build directed graph
    G = nx.DiGraph()

    # Add nodes
    for node in nodes:
        G.add_node(node["id"])

    # Add edges — React Flow stores source/target in each edge object
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source and target:
            G.add_edge(source, target)

    is_dag = nx.is_directed_acyclic_graph(G)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag":    is_dag,
    }
