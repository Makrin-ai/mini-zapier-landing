from collections import defaultdict, deque


class GraphValidationError(ValueError):
    pass


def validate_and_sort(graph: dict) -> list[dict]:

    nodes = graph.get("nodes", [])
    edges = graph.get("edges", [])

    if not isinstance(nodes, list) or not isinstance(edges, list):
        raise GraphValidationError(
            "Graph must contain nodes and edges arrays."
        )

    node_map = {}

    # Проверка узлов

    for node in nodes:

        node_id = node.get("id")
        node_type = node.get("type")

        if not node_id or node_id in node_map:

            raise GraphValidationError(
                "Every node must have a unique id."
            )

        if node_type not in {
            "trigger",
            "condition",
            "action"
        }:

            raise GraphValidationError(
                f"Unsupported node type: {node_type}"
            )

        node_map[node_id] = node

    indegree = {
        node_id: 0
        for node_id in node_map
    }

    adjacency = defaultdict(list)

    # Проверка связей

    for edge in edges:

        source = edge.get("source")
        target = edge.get("target")

        if source not in node_map or target not in node_map:

            raise GraphValidationError(
                "An edge references a node that does not exist."
            )

        if source == target:

            raise GraphValidationError(
                "A node cannot connect to itself."
            )

        adjacency[source].append(target)

        indegree[target] += 1

    # Топологическая сортировка Кана

    queue = deque(
        node_id
        for node_id, degree in indegree.items()
        if degree == 0
    )

    ordered = []

    while queue:

        current = queue.popleft()

        ordered.append(node_map[current])

        for neighbor in adjacency[current]:

            indegree[neighbor] -= 1

            if indegree[neighbor] == 0:

                queue.append(neighbor)

    # Проверка циклов

    if len(ordered) != len(node_map):

        raise GraphValidationError(
            "Cycle detected: workflow must be a DAG."
        )

    return ordered