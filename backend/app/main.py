import os

from fastapi import (
    FastAPI,
    Depends,
    HTTPException
)

from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app.database import (
    Base,
    engine,
    get_db
)

from app.models.workflow import (
    Workflow,
    Execution,
    ExecutionStep
)

from app.schemas.workflow import WorkflowCreate

from app.services.dag_engine import (
    validate_and_sort,
    GraphValidationError
)

from app.workers.tasks import execute_workflow


# Создание таблиц

Base.metadata.create_all(bind=engine)


# Инициализация приложения

app = FastAPI(
    title="MNTN FLOW API",
    version="0.1.0"
)


# CORS

origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173"
).split(",")


app.add_middleware(
    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# HEALTH CHECK

@app.get("/health")
def health():

    return {
        "status": "ok",
        "service": "mntn-flow-api"
    }


# CREATE WORKFLOW

@app.post("/api/workflows")
def create_workflow(
    payload: WorkflowCreate,
    db: Session = Depends(get_db)
):

    try:

        validate_and_sort(payload.graph)

    except GraphValidationError as exc:

        raise HTTPException(
            status_code=422,
            detail=str(exc)
        )

    workflow = Workflow(
        name=payload.name,
        graph=payload.graph
    )

    db.add(workflow)

    db.commit()

    db.refresh(workflow)

    return {
        "id": workflow.id,
        "name": workflow.name,
        "graph": workflow.graph
    }


# LIST WORKFLOWS

@app.get("/api/workflows")
def list_workflows(
    db: Session = Depends(get_db)
):

    items = (
        db.query(Workflow)
        .order_by(Workflow.created_at.desc())
        .all()
    )

    return [
        {
            "id": x.id,
            "name": x.name,
            "created_at": x.created_at
        }
        for x in items
    ]


# GET WORKFLOW

@app.get("/api/workflows/{workflow_id}")
def get_workflow(
    workflow_id: int,
    db: Session = Depends(get_db)
):

    workflow = db.get(
        Workflow,
        workflow_id
    )

    if not workflow:

        raise HTTPException(
            status_code=404,
            detail="Workflow not found"
        )

    return {
        "id": workflow.id,
        "name": workflow.name,
        "graph": workflow.graph
    }


# RUN WORKFLOW

@app.post("/api/workflows/{workflow_id}/run")
def run_workflow(
    workflow_id: int,
    db: Session = Depends(get_db)
):

    workflow = db.get(
        Workflow,
        workflow_id
    )

    if not workflow:

        raise HTTPException(
            status_code=404,
            detail="Workflow not found"
        )

    try:

        validate_and_sort(workflow.graph)

    except GraphValidationError as exc:

        raise HTTPException(
            status_code=422,
            detail=str(exc)
        )

    execution = Execution(
        workflow_id=workflow.id,
        status="queued"
    )

    db.add(execution)

    db.commit()

    db.refresh(execution)

    task = execute_workflow.delay(
        execution.id
    )

    return {
        "id": execution.id,
        "status": "queued",
        "task_id": task.id
    }


# LIST EXECUTIONS

@app.get("/api/executions")
def list_executions(
    db: Session = Depends(get_db)
):

    items = (
        db.query(Execution)
        .order_by(Execution.created_at.desc())
        .limit(100)
        .all()
    )

    return [

        {
            "id": x.id,
            "workflow_id": x.workflow_id,
            "status": x.status,
            "created_at": x.created_at,
            "finished_at": x.finished_at,
            "error": x.error
        }

        for x in items

    ]


# EXECUTION STEPS

@app.get("/api/executions/{execution_id}/steps")
def execution_steps(
    execution_id: int,
    db: Session = Depends(get_db)
):

    execution = db.get(
        Execution,
        execution_id
    )

    if not execution:

        raise HTTPException(
            status_code=404,
            detail="Execution not found"
        )

    return [

        {
            "id": step.id,
            "node_id": step.node_id,
            "node_type": step.node_type,
            "status": step.status,
            "message": step.message,
            "started_at": step.started_at,
            "finished_at": step.finished_at
        }

        for step in execution.steps

    ]