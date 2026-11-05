from datetime import datetime, timezone

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    JSON,
    String,
    Text
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.database import Base


def utcnow():
    return datetime.now(timezone.utc)


class Workflow(Base):

    __tablename__ = "workflows"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(160),
        default="Untitled workflow"
    )

    graph: Mapped[dict] = mapped_column(JSON)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utcnow
    )

    executions: Mapped[list["Execution"]] = relationship(
        back_populates="workflow",
        cascade="all, delete-orphan"
    )


class Execution(Base):

    __tablename__ = "executions"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    workflow_id: Mapped[int] = mapped_column(
        ForeignKey("workflows.id", ondelete="CASCADE")
    )

    status: Mapped[str] = mapped_column(
        String(24),
        default="queued"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utcnow
    )

    finished_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    error: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    workflow: Mapped["Workflow"] = relationship(
        back_populates="executions"
    )

    steps: Mapped[list["ExecutionStep"]] = relationship(
        back_populates="execution",
        cascade="all, delete-orphan"
    )


class ExecutionStep(Base):

    __tablename__ = "execution_steps"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    execution_id: Mapped[int] = mapped_column(
        ForeignKey("executions.id", ondelete="CASCADE")
    )

    node_id: Mapped[str] = mapped_column(
        String(120)
    )

    node_type: Mapped[str] = mapped_column(
        String(40)
    )

    status: Mapped[str] = mapped_column(
        String(24)
    )

    message: Mapped[str] = mapped_column(
        Text,
        default=""
    )

    started_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utcnow
    )

    finished_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    execution: Mapped["Execution"] = relationship(
        back_populates="steps"
    )