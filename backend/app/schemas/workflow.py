from pydantic import BaseModel, Field
from typing import Any


class WorkflowCreate(BaseModel):

    name: str = Field(
        default="Untitled workflow",
        max_length=160
    )

    graph: dict[str, Any]


class WorkflowRead(BaseModel):

    id: int
    name: str
    graph: dict[str, Any]

    class Config:
        from_attributes = True