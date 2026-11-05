from datetime import datetime, timezone

from app.database import SessionLocal

from app.models.workflow import (
    Workflow,
    Execution,
    ExecutionStep
)

from app.services.dag_engine import validate_and_sort

from app.workers.celery_app import celery_app


@celery_app.task(name="app.workers.tasks.execute_workflow")
def execute_workflow(execution_id: int):

    db = SessionLocal()

    try:

        execution = db.get(
            Execution,
            execution_id
        )

        if execution is None:

            return {
                "error": "Execution not found"
            }

        workflow = db.get(
            Workflow,
            execution.workflow_id
        )

        execution.status = "running"

        db.commit()

        ordered_nodes = validate_and_sort(
            workflow.graph
        )

        for node in ordered_nodes:

            data = node.get("data") or {}

            node_type = node["type"]

            # Демонстрационные обработчики

            if node_type == "trigger":

                message = (
                    f"Trigger accepted: "
                    f"{data.get('label', node['id'])}"
                )

            elif node_type == "condition":

                message = (
                    f"Condition evaluated (demo): "
                    f"{data.get('label', node['id'])}"
                )

            else:

                message = (
                    f"Action simulated (demo): "
                    f"{data.get('label', node['id'])}"
                )

            step = ExecutionStep(

                execution_id=execution.id,

                node_id=node["id"],

                node_type=node_type,

                status="completed",

                message=message,

                finished_at=datetime.now(timezone.utc)

            )

            db.add(step)

            db.commit()

        execution.status = "completed"

        execution.finished_at = datetime.now(timezone.utc)

        db.commit()

        return {
            "execution_id": execution.id,
            "status": execution.status
        }

    except Exception as exc:

        db.rollback()

        execution = db.get(
            Execution,
            execution_id
        )

        if execution:

            execution.status = "failed"

            execution.error = str(exc)

            execution.finished_at = datetime.now(timezone.utc)

            db.commit()

        raise

    finally:

        db.close()